Application Name: Website Support - Live Chat

Application Management URL: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/~/Overview/appId/18a17fe4-129b-4682-9868-40de8b6f8d3d/isMSAApp~/false

Tenant ID: 9b2fe9f2-3bf0-46bb-ab42-2256d42b7ec0

Client ID: 18a17fe4-129b-4682-9868-40de8b6f8d3d

Secret Value: LQL8Q~AscD-iwtCPBUxTNJN6Tc43rtRtJnGs9cCX

Secret Expiration: 2/17/2028

Team ID: 54d47795-95e8-445f-88f6-1cb99d94dc48

Channel ID: 19:996302bd8583470c987421d50b56eb60@thread.tacv2

 Username: websitechatbot@americaworks.com

Password: Yub@u886!021

-------

Below is a technical spec for **Teams-channel threaded live support** using **Microsoft Graph + OAuth delegated permissions** (service account), with **one Teams thread per end-user conversation**, and the website continuing the conversation inside your existing Next.js chatbox.

------

## 1. Goals

### Functional

- Each end-user “chat” maps to a **separate Teams thread** in a single Teams support channel.
- Support agent replies in Teams and the user sees responses **in the existing website chatbox**.
- Multiple concurrent user conversations are supported.

### Non-functional

- Uses **delegated OAuth** (signed-in user context) via a **dedicated service account**.
- Uses Microsoft Graph for:
  - creating the thread (root message),
  - posting subsequent messages as replies,
  - receiving change notifications for new messages/replies.

------

## 2. Entities & Identifiers

### Your system

- `conversationId` — your internal conversation identifier
- `endUserId` — your internal user/session identifier

### Teams / Graph

- `tenantId`
- `teamId`
- `channelId`
- `rootMessageId` — Teams root channel message ID (thread root)
- `replyMessageId` — Teams reply message ID

### Mapping table (required)

Persist a mapping for routing:

- `conversationId`
- `teamId`
- `channelId`
- `rootMessageId`
- `createdAt`, `status` (optional)

------

## 3. OAuth Model (Delegated, Service Account)

### Assumptions

- IT creates a dedicated M365 user (service account), e.g. `website-support-bot@...`
- That user is a member of the support channel.
- Your system performs **one-time interactive sign-in** for this user and stores tokens.

### OAuth endpoints (variables)

- Authorization endpoint:
  - `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/authorize`
- Token endpoint:
  - `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token`

### Scopes (conceptual)

Request delegated scopes required by IT policy (names will match Graph permissions they approve). Typically includes:

- message send
- message read
- subscription creation (change notifications)
- `offline_access` (to obtain refresh token)

> Exact permission names / consent will be handled by IT; your implementation should be scope-driven.

### Token handling

- Store:
  - `refresh_token` (secure storage)
  - last `access_token` (in-memory cache)
  - expiry time
- Refresh:
  - If `access_token` expired/near expiry, call token endpoint with refresh token.
- Use `access_token` as:
  - `Authorization: Bearer {access_token}`

------

## 4. Core Graph Endpoints (Threads)

### 4.1 Create a new thread (root message)

Creates a new Teams channel message (thread root).

**HTTP**

- `POST https://graph.microsoft.com/v1.0/teams/{teamId}/channels/{channelId}/messages` ([Microsoft Learn](https://learn.microsoft.com/en-us/graph/api/channel-post-messages?view=graph-rest-1.0&utm_source=chatgpt.com))

**Body (example)**

```json
{
  "body": {
    "contentType": "html",
    "content": "<b>New Live Chat Handoff</b><br/>conversationId: {conversationId}<br/>Location: {geo}<br/><br/>{transcriptOrSummary}"
  }
}
```

**Response**

- `201 Created` with a `chatMessage` object containing:
  - `id` => **rootMessageId**
- Persist mapping: `conversationId -> rootMessageId`

### 4.2 Post a reply into an existing thread

All subsequent messages for that end-user conversation should be replies to the same root message.

**HTTP**

- `POST https://graph.microsoft.com/v1.0/teams/{teamId}/channels/{channelId}/messages/{rootMessageId}/replies` ([Microsoft Learn](https://learn.microsoft.com/en-us/graph/api/chatmessage-post?view=graph-rest-1.0&utm_source=chatgpt.com))

**Body**

```json
{
  "body": {
    "contentType": "html",
    "content": "<b>User</b>: {messageText}"
  }
}
```

### 4.3 Read thread replies (optional pull)

Useful for reconciliation or if webhook delivery fails.

**HTTP**

- `GET https://graph.microsoft.com/v1.0/teams/{teamId}/channels/{channelId}/messages/{rootMessageId}/replies`

(Endpoint documented in Graph/Teams messaging references; also commonly used to locate replies by id. ([Stack Overflow](https://stackoverflow.com/questions/79441718/how-to-get-teams-channel-message-from-reply-message-id-in-ms-graph?utm_source=chatgpt.com)))

------

## 5. Change Notifications (Webhooks)

### 5.1 Subscription scope

Subscribe at the **channel level** so you receive notifications for both:

- new root messages (threads)
- new replies

**Resource**

- `/teams/{teamId}/channels/{channelId}/messages` ([Microsoft Learn](https://learn.microsoft.com/en-us/graph/teams-changenotifications-chatmessage?utm_source=chatgpt.com))

### 5.2 Create subscription

**HTTP**

- `POST https://graph.microsoft.com/v1.0/subscriptions` ([Microsoft Learn](https://learn.microsoft.com/en-us/graph/api/subscription-post-subscriptions?view=graph-rest-1.0&utm_source=chatgpt.com))

**Body (example)**

```json
{
  "changeType": "created",
  "notificationUrl": "https://{your-host}/api/chat/teams-webhook",
  "resource": "/teams/{teamId}/channels/{channelId}/messages",
  "expirationDateTime": "{utcDateTimeWithinAllowedWindow}",
  "clientState": "{randomSharedSecret}"
}
```

Notes:

- `notificationUrl` during testing might be:
  - `https://america-works.vercel.app/api/chat/teams-webhook`
- production:
  - `https://americaworks.com/api/chat/teams-webhook`

### 5.3 Webhook validation requirement

When creating the subscription, Microsoft Graph will call your `notificationUrl` with a `validationToken`. Your endpoint must respond:

- `200 OK`
- Body: the **raw validation token** as plain text ([Microsoft Learn](https://learn.microsoft.com/en-us/graph/change-notifications-overview?utm_source=chatgpt.com))

### 5.4 Notification handling flow

On receiving a notification POST:

1. Verify `clientState` matches what you set (basic tamper check).
2. Extract the message identifier from the notification payload.
3. Fetch message details from Graph (or use “resource data” subscriptions if you choose to implement them later).

> Start simple: fetch message details on-demand after a notification.

------

## 6. Routing Logic (Threading & Fan-out)

### 6.1 When the chatbot escalates to human

If no mapping exists:

- Create root message (Section 4.1) → store `rootMessageId`

If mapping exists:

- Post reply to that thread (Section 4.2)

### 6.2 When agent replies in Teams

When a notification arrives:

- Determine which **thread** it belongs to:
  - If the notification is for a reply, it belongs to a root message thread.
- Route to your internal `conversationId` via mapping table:
  - `rootMessageId -> conversationId`
- Push to your chat UI (WebSocket/SSE) as “agent” message.

### 6.3 Identifying the root thread from notifications

Implementation detail options:

- If notification contains enough context to know the root message id, use it directly.
- Otherwise, call Graph to fetch message / reply details and derive the thread context.

(Practically: you’ll often fetch details anyway to get the actual message body.)

------

## 7. Next.js API Surface

### 7.1 Webhook receiver

- `POST /api/chat/teams-webhook`
  - Handles:
    - validation token echo (GET or POST with query param)
    - notification ingestion (POST JSON)

### 7.2 Escalation endpoint

- `POST /api/chat/escalate`
  - Inputs:
    - `conversationId`, `endUserId`, `messages[]`, `meta`
  - Outputs:
    - `rootMessageId`, `status`

### 7.3 Token maintenance (internal)

- `getAccessToken(): string`
  - refreshes if needed via stored refresh token

------

## 8. Operational Requirements

### Subscription renewal

- Graph subscriptions expire; implement a renewal job to extend before expiration.
- Store:
  - `subscriptionId`
  - `expirationDateTime`
- Renew by re-creating or updating subscription (Graph supports update flows depending on resource).

### Security

- Store refresh tokens in encrypted secret storage.
- Validate webhook `clientState`.
- Avoid sending sensitive PII into Teams; prefer your internal user id + a short context summary.

------

## 9. Graph Calls Summary

**Create thread root**

- `POST /teams/{teamId}/channels/{channelId}/messages` ([Microsoft Learn](https://learn.microsoft.com/en-us/graph/api/channel-post-messages?view=graph-rest-1.0&utm_source=chatgpt.com))

**Reply to thread**

- `POST /teams/{teamId}/channels/{channelId}/messages/{rootMessageId}/replies` ([Microsoft Learn](https://learn.microsoft.com/en-us/graph/api/chatmessage-post?view=graph-rest-1.0&utm_source=chatgpt.com))

**Subscribe to channel messages**

- `POST /subscriptions` with resource `/teams/{teamId}/channels/{channelId}/messages` ([Microsoft Learn](https://learn.microsoft.com/en-us/graph/teams-changenotifications-chatmessage?utm_source=chatgpt.com))

**Webhook validation + notifications**

- Graph change notifications overview ([Microsoft Learn](https://learn.microsoft.com/en-us/graph/change-notifications-overview?utm_source=chatgpt.com))

