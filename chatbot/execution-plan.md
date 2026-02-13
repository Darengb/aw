# Chatbot Implementation Plan

## Overview
Build a deterministic workflow chatbot (state machine) embedded as a floating widget on the America Works site. The LLM is used only for (a) AW-related classification and (b) web-search-powered answers in two specific branches. All other flow logic is rigid and code-driven.

## Key References
- `/chatbot/initial_spec.md` — architecture + pseudocode
- `/chatbot/question-flow.md` — exact UX flow, input types, LLM/web-search gating per step (source of truth for flow logic)
- `/chatbot/model-decisions.md` — GPT-5 Nano (classify) + GPT-5.2 (web search)

## Design Decisions (resolved during QA)
- **LLM gating**: Only call LLM for free-text inputs. Button/form clicks map directly to values — no LLM needed. (Follows `question-flow.md` over `initial_spec.md` pseudocode.)
- **`parseUserInput` eliminated**: Not needed as a generic function. Button states map directly; phone/name are validated in code. LLM calls are `parseState` (GPT-5 Nano), `classifyAmericaWorksRelated` (GPT-5 Nano), and `webSearchAnswer`/`webSearchResources` (GPT-5.2).
- **State instead of ZIP**: Ask the user to type their state (free text, parsed by GPT-5 Nano into a 2-letter abbreviation). A user is "full service" if their state is one of the 11 with offices: CA, DC, GA, LA, MD, NJ, NY, PA, TN, VT, WI.
- **Signup link**: `/jobseekers-form` for both enrollment paths.
- **Live handoff**: Placeholder message for now — both business hours and after hours show text only, no actual handoff or email integration.
- **Domain allowlist**: None — let GPT-5.2 search freely.
- **OpenAI failure fallback**: Return friendly error message, don't crash the widget.
- **"Other" in resource needs**: User's free text is passed directly to GPT-5.2 as a category — no GPT-5 Nano parsing needed.

---

## Phase 1: Infrastructure

- [ ] Remove `output: 'export'` from `/web/next.config.ts` (keep `images: { unoptimized: true }` and `experimental`)
- [ ] Install `openai` npm package in `/web`
- [ ] Add `OPENAI_API_KEY` to `.env.local` for local dev (gitignored — already in Vercel prod env)

---

## Phase 2: State Machine + API Route

### 2a) Types & constants

- [ ] Create `/web/app/api/chat/types.ts`:

  ```ts
  // States
  type ChatState =
    | 'ASK_SERVED_BEFORE'
    | 'ASK_CURRENTLY_SERVED'
    | 'COLLECT_NAME_PHONE'
    | 'ASK_ENROLL'
    | 'ASK_STATE'
    | 'ASK_SSI_SSDI'
    | 'OUT_OF_AREA'
    | 'ASK_RESOURCE_NEEDS'
    | 'ASK_HELP'
    | 'DONE'

  // What kind of input the widget should render
  type InputType = 'buttons' | 'text' | 'form' | 'multi-select' | 'none'

  // Conversation memory persisted across turns
  interface ChatMemory {
    fullName?: string
    phone?: string
    state?: string          // US state abbreviation
    resourceNeeds?: string[]
    helpText?: string
  }

  // Client → Server
  interface ChatRequest {
    state: ChatState
    memory: ChatMemory
    userText: string
  }

  // Server → Client
  interface ChatResponse {
    state: ChatState
    memory: ChatMemory
    reply: string
    inputType: InputType
    buttons?: ButtonOption[]
    formFields?: FormField[]
  }

  interface ButtonOption { label: string; value: string }
  interface FormField { name: string; label: string; type: string; required: boolean }

  // Constants
  const SIGNUP_FORM_URL = '/jobseekers-form'
  const SERVICE_STATES = ['CA','DC','GA','LA','MD','NJ','NY','PA','TN','VT','WI']
  ```

### 2b) Utility functions

- [ ] Create `/web/app/api/chat/utils.ts`:
  - `isBusinessHoursET(): boolean` — Mon–Fri 9:00–17:00 America/New_York using `Intl.DateTimeFormat` (no extra deps)
  - `isFullServiceState(stateCode: string): boolean` — checks if `stateCode` is in `SERVICE_STATES`
  - `isValidPhone(phone: string): boolean` — basic US phone regex (10 digits, optional formatting)

### 2c) State machine handler

- [ ] Create `/web/app/api/chat/handleMessage.ts` — the core switch/case state machine.

  **LLM gating rule**: Only call LLM when the input is free text (`ASK_STATE`, `ASK_HELP`, and `ASK_RESOURCE_NEEDS` with "Other"). For button/form states, use the `userText` value directly — no LLM.

  Exact state transitions:

  ---

  **`ASK_SERVED_BEFORE`** (entry point)
  - Input: Buttons — `Yes` / `No` / `Not sure`
  - LLM: No
  - `Yes` → `ASK_CURRENTLY_SERVED`
    - Reply: "Are you currently being served by America Works?"
    - Buttons: `Yes` / `No`
  - `No` or `Not sure` → `ASK_ENROLL`
    - Reply: "Are you looking to enroll in our services?"
    - Buttons: `Yes` / `No` / `Not sure`

  ---

  **`ASK_CURRENTLY_SERVED`**
  - Input: Buttons — `Yes` / `No`
  - LLM: No
  - `Yes` → `COLLECT_NAME_PHONE`
    - Reply: "Please provide your full name and phone number."
    - InputType: `form` with fields: Full Name (text, required), Phone (tel, required)
  - `No` → `ASK_HELP`
    - Reply: "What can I help you with today?"
    - InputType: `text` (multi-line)

  ---

  **`COLLECT_NAME_PHONE`**
  - Input: Form — Full Name (text) + Phone Number (tel) + Submit
  - LLM: No (validate in code with `isValidPhone`)
  - If both provided and phone valid → store in memory → `DONE`
    - Reply: "Thanks, {fullName}. Someone will follow up with you if needed."
    - InputType: `none`
  - If missing or invalid → re-prompt, same state
    - Reply: "Please share your full name and a phone number we can reach you at."
    - InputType: `form` (same fields)

  ---

  **`ASK_ENROLL`**
  - Input: Buttons — `Yes` / `No` / `Not sure`
  - LLM: No
  - `Yes` → `ASK_STATE`
    - Reply: "What state do you live in?"
    - InputType: `text`
  - `No` or `Not sure` → `ASK_HELP`
    - Reply: "What can I help you with today?"
    - InputType: `text` (multi-line)

  ---

  **`ASK_STATE`**
  - Input: Text field
  - LLM: Yes — call `parseState(userText)` (GPT-5 Nano) → returns 2-letter state code or null
  - If LLM returns a valid state code → store in `memory.state`
    - If `isFullServiceState(state)` → `DONE`
      - Reply: "Great — you can enroll here: [Sign Up for Services](/jobseekers-form)"
      - InputType: `none`
    - If not full service → `ASK_SSI_SSDI`
      - Reply: "Do you currently receive SSI and/or SSDI?"
      - Buttons: `Yes` / `No` / `Not sure`
  - If LLM returns null (couldn't parse a US state) → re-prompt, same state
    - Reply: "I didn't recognize that state. Please enter your US state (e.g. \"New York\" or \"NY\")."
    - InputType: `text`

  ---

  **`ASK_SSI_SSDI`**
  - Input: Buttons — `Yes` / `No` / `Not sure`
  - LLM: No
  - `Yes` → `DONE`
    - Reply: "You may still qualify — please enroll here: [Sign Up for Services](/jobseekers-form)"
    - InputType: `none`
  - `No` → `OUT_OF_AREA`
    - Reply: "Unfortunately, we do not currently offer services in your area. We can help you find resources nearby."
    - Buttons: `Find resources near me` / `Try a different state`
  - `Not sure` → stay in `ASK_SSI_SSDI` (re-prompt with explanation)
    - Reply: "SSI/SSDI are federal disability benefits paid to people with qualifying disabilities. If you're not sure whether you receive them, you can check with your local Social Security office or visit ssa.gov.\n\nDo you currently receive SSI and/or SSDI?"
    - Buttons: `Yes` / `No`

  ---

  **`OUT_OF_AREA`**
  - Input: Buttons — `Find resources near me` / `Try a different state`
  - LLM: No
  - `Find resources near me` → `ASK_RESOURCE_NEEDS`
    - Reply: "What kind of help are you looking for?"
    - InputType: `multi-select`
    - Buttons: `Job search & career help` / `Housing & shelter` / `Food & nutrition assistance` / `Benefits & disability (SSA/SSI)` / `Mental health & crisis support` / `Other`
  - `Try a different state` → `ASK_STATE`
    - Reply: "What state do you live in?"
    - InputType: `text`

  ---

  **`ASK_RESOURCE_NEEDS`**
  - Input: Multi-select buttons + "Other" (reveals text input) + Submit
  - LLM: No for button selections. If "Other" is selected with free text, pass the text directly as a category (no LLM parsing needed).
  - On submit → store selected categories in `memory.resourceNeeds`
  - Call `webSearchResources(memory.state, memory.resourceNeeds)` (GPT-5.2 with web search)
  - → `DONE`
    - Reply: formatted resource results from GPT-5.2
    - InputType: `none`
  - If "Mental health & crisis support" is among selections, GPT-5.2 system prompt must lead with:
    - 988 Suicide & Crisis Lifeline (call or text 988)
    - Crisis Text Line (text HOME to 741741)
    - SAMHSA helpline (1-800-662-4357)

  ---

  **`ASK_HELP`**
  - Input: Multi-line text input + Send
  - LLM: Yes — call `classifyAmericaWorksRelated(userText)` (GPT-5 Nano)
  - Store user's message in `memory.helpText`
  - If AW-related + within business hours → `DONE`
    - Reply: "[Placeholder] I'm connecting you with a team member now. A staff member will be in touch shortly."
    - InputType: `none`
  - If AW-related + outside business hours → `DONE`
    - Reply: "[Placeholder] Thank you for reaching out. Our office hours are 9:00 AM – 5:00 PM ET, Monday through Friday. A team member will get in touch with you during the next business day."
    - InputType: `none`
  - If not AW-related → call `webSearchAnswer(userText)` (GPT-5.2 with web search) → `DONE`
    - Reply: web search answer from GPT-5.2
    - InputType: `none`

  ---

  **`DONE`**
  - Terminal state
  - InputType: `buttons`
  - Buttons: `Start over` (resets state to `ASK_SERVED_BEFORE` and clears memory)

### 2d) API route

- [ ] Create `/web/app/api/chat/route.ts` — POST handler:
  - Parse JSON body as `ChatRequest`
  - Call `handleMessage()` with state, memory, userText
  - Return `ChatResponse` as JSON
  - On OpenAI API errors: return 200 with `state: 'DONE'` and friendly reply: "I'm having trouble right now. Please try again, or contact us directly at (212) 252-6900."
  - On other errors: return 500

---

## Phase 3: OpenAI Integration

- [ ] Create `/web/app/api/chat/llm.ts` — OpenAI client + four functions:

  **OpenAI client setup:**
  ```ts
  import OpenAI from 'openai'
  const openai = new OpenAI() // reads OPENAI_API_KEY from env
  ```

  **`parseState(userText: string): Promise<string | null>`**
  - Model: `gpt-5-nano`
  - System prompt: "The user is telling you what US state they live in. Extract the 2-letter US state abbreviation from their message. Return JSON only: { \"state\": \"XX\" } where XX is the 2-letter code, or { \"state\": null } if you cannot determine a valid US state or DC."
  - No web search
  - Used in: `ASK_STATE` state only
  - Handles: full names ("New York"), abbreviations ("NY"), casual ("i live in cali"), misspellings ("massachsetts")

  **`classifyAmericaWorksRelated(userText: string): Promise<boolean>`**
  - Model: `gpt-5-nano`
  - System prompt: "You are a classifier for America Works, a workforce development company that helps people find jobs. Determine if the user's message is related to America Works services (employment programs, job placement, workforce development, their existing case, staff, appointments, benefits through AW, etc.) or is a general question not specifically about America Works. Return JSON only."
  - Response format: `{ "isAmericaWorksRelated": true | false }`
  - No web search tool
  - Used in: `ASK_HELP` state only

  **`webSearchAnswer(userText: string): Promise<string>`**
  - Model: `gpt-5.2`
  - System prompt: "You are a helpful assistant on the America Works website. The user has asked a question that is not directly related to America Works services. Answer with empathy and clarity — the user may be in a difficult situation (unemployed, homeless, in danger, in crisis). Prefer authoritative sources (government sites, major nonprofits). Include links where helpful. If uncertain, say so. Keep your response concise and actionable."
  - Web search tool enabled
  - Used for: D1 — general non-AW help from `ASK_HELP`

  **`webSearchResources(state: string, categories: string[]): Promise<string>`**
  - Model: `gpt-5.2`
  - System prompt: "You are a resource finder for people who need help. The user lives in {state} and is looking for help with: {categories joined}. Find 3–6 relevant resources for their location. For each resource provide: the organization name, what they help with, how to contact them (phone and/or website). If the user needs 'Mental health & crisis support', ALWAYS lead your response with these crisis resources before any others:\n- 988 Suicide & Crisis Lifeline — call or text 988\n- Crisis Text Line — text HOME to 741741\n- SAMHSA National Helpline — 1-800-662-4357\n\nKeep your response concise and well-formatted."
  - Web search tool enabled
  - Used for: D2 — out-of-area resource recommendations from `ASK_RESOURCE_NEEDS`

---

## Phase 4: Chat Widget UI

### 4a) Widget shell

- [ ] Create `/web/components/chat/ChatWidget.tsx` — floating launcher + expandable chat panel:

  **Collapsed state (launcher button):**
  - Fixed `bottom-right` — `bottom: 20px; right: 20px` (desktop + mobile)
  - Bright `aw-red` circular button, 56px diameter, white chat icon (MessageCircle from lucide-react, 28px)
  - Prominent drop shadow (`0 4px 12px rgba(0,0,0,0.15)`) so it floats above page content
  - `z-index: 9999` — above everything
  - Hover: slight scale-up (`transform: scale(1.05)`) + deeper shadow
  - Optional: small unread badge or subtle pulse animation on first visit to draw attention
  - Tooltip on hover (desktop): "Chat with us"

  **Expanded state — Desktop (≥ 640px):**
  - Panel anchored bottom-right, 24px from edge: `position: fixed; bottom: 24px; right: 24px`
  - Size: `380px wide × 560px tall` (standard Intercom/Drift proportions)
  - Rounded corners (`border-radius: 16px`), shadow (`0 8px 32px rgba(0,0,0,0.16)`)
  - Layout (flex column, full height):
    - **Header** (56px): `aw-red` background, white text "America Works", X close button (top-right)
    - **Messages area** (flex-grow, scrollable): `overflow-y: auto`, scrolls to bottom on new messages
    - **Input area** (auto height): renders `<ChatInput />`, sits at bottom with top border separator
  - Opens with slide-up + fade-in animation (`transform: translateY(16px) → 0; opacity: 0 → 1`, 200ms ease-out)
  - Launcher button hides when panel is open

  **Expanded state — Mobile (< 640px):**
  - Full-screen overlay: `position: fixed; inset: 0` (covers entire viewport)
  - No border-radius (flush edges)
  - Same layout: header + messages + input
  - Header gets a back/close arrow instead of X for mobile feel
  - `overscrollBehavior: contain` on messages area to prevent background page scroll
  - `body` overflow hidden while chat is open (prevent scroll-behind)
  - Launcher button hides when panel is open

  **State management (React state):**
  - `chatState: ChatState` — current state machine state (init: `ASK_SERVED_BEFORE`)
  - `memory: ChatMemory` — accumulated data (init: `{}`)
  - `messages: Message[]` — array of `{ role: 'bot' | 'user', text: string }` for display
  - `isOpen: boolean` — widget expanded/collapsed
  - `isLoading: boolean` — waiting for API response
  - `currentInputType: InputType` — what input to render
  - `currentButtons: ButtonOption[]` — button options for current step
  - `currentFormFields: FormField[]` — form fields (for name/phone)

  **sessionStorage persistence:** on every state change, save `{ chatState, memory, messages, currentInputType, currentButtons, currentFormFields }` to `sessionStorage` key `aw-chat`. Restore on mount if present. This preserves chat across page navigations.

  **Initial load:** if no sessionStorage data, show first bot message: "Have you ever been served by America Works before?" with Yes/No/Not sure buttons.

  **API call flow:**
  1. User interacts (clicks button, submits form, sends text)
  2. Add user message to `messages[]`
  3. Set `isLoading = true`, disable inputs
  4. POST to `/api/chat` with `{ state: chatState, memory, userText }`
  5. On response: update `chatState`, `memory`, add bot reply to `messages[]`, set input type/buttons from response
  6. Set `isLoading = false`, re-enable inputs, scroll to bottom

  **Loading indicator:** typing indicator (three animated dots) appears as a bot message bubble while `isLoading`.

### 4b) Message bubbles

- [ ] Create `/web/components/chat/ChatMessage.tsx` — individual message bubble:
  - **Bot messages:** left-aligned, light gray background (`#f3f4f6`), dark text, max-width ~85%
  - **User messages:** right-aligned, `aw-red` background, white text, max-width ~85%
  - Both: rounded corners (16px, with sharp corner on sender's side — `border-bottom-left-radius: 4px` for bot, `border-bottom-right-radius: 4px` for user)
  - Small avatar/icon for bot messages (optional — small AW logo or generic bot icon)
  - Render links in bot messages as clickable `<a>` tags with underline (parse markdown-style `[text](url)` links)
  - Subtle fade-in + slide-up animation on new messages

### 4c) Dynamic input area

- [ ] Create `/web/components/chat/ChatInput.tsx` — renders dynamically based on `inputType` prop:

  **`buttons` mode:**
  - Vertical stack of pill-shaped buttons (full width of input area, 8px gap)
  - Styled: white background, `aw-red` border + text. On hover: `aw-red` fill, white text.
  - Each button sends its `value` as `userText` on click
  - All buttons disabled while loading

  **`multi-select` mode:**
  - Toggle pill buttons (wrapped flex layout, 8px gap). Toggled-on buttons show filled `aw-red` with white text + checkmark.
  - "Other" button: when toggled on, reveals a text input below
  - Submit button at bottom (disabled until at least one option selected)
  - On submit: send selected values as comma-joined string (e.g. `"Housing & shelter,Food & nutrition assistance,Other: childcare"`)

  **`text` mode:**
  - Single-line or auto-expanding textarea (max 3-4 lines) + circular send button (arrow icon)
  - Send on Enter (Shift+Enter for newline on multi-line)
  - Send button disabled while empty or loading
  - Placeholder text contextual: "Type your state..." for ASK_STATE, "Type your message..." for ASK_HELP

  **`form` mode:**
  - Stacked labeled inputs inside the chat panel: Full Name (text), Phone (tel with formatting hint)
  - Submit button at bottom
  - Client-side validation: both fields required, phone 10+ digits. Show inline error if invalid on submit.

  **`none` mode:**
  - "Start over" button centered in input area (for DONE state)

---

## Phase 5: Integrate Widget into Layout

- [ ] Add `<ChatWidget />` to `/web/components/layout/ClientShell.tsx` — render inside the root `<div>` after `<Footer />`, outside `<main>`. Fixed positioning so it doesn't affect layout.
- [ ] Add chat widget styles to `/web/styles/globals.css` (or keep in component with Tailwind — use whichever is cleaner):
  - **Launcher:** `.chat-launcher` — fixed bottom-right, 56px circle, `aw-red`, white icon, shadow, z-9999, scale hover
  - **Panel (desktop):** `.chat-panel` — fixed `bottom: 24px; right: 24px`, 380×560px, rounded-2xl, shadow-xl, flex column, slide-up + fade-in animation on open
  - **Panel (mobile):** `@media (max-width: 639px)` → `.chat-panel` becomes `inset: 0`, no border-radius, full viewport
  - **Header:** `.chat-header` — h-14, `aw-red` bg, white text, flex between title and close button
  - **Messages:** `.chat-messages` — flex-grow, overflow-y-auto, padding, flex column with gap between messages
  - **Message bubbles:** `.chat-bubble-bot` (left, gray bg), `.chat-bubble-user` (right, `aw-red` bg, white text), both max-w-[85%], rounded with sender-side flat corner
  - **Typing indicator:** `.chat-typing` — three dots with staggered bounce animation (`@keyframes bounce`)
  - **Buttons:** `.chat-option-btn` — full-width pills, `aw-red` border/text, filled on hover, transition
  - **Multi-select:** `.chat-toggle-btn` — same as option but stays filled when `.active`, shows checkmark
  - **Text input:** `.chat-text-input` — auto-expanding textarea with send icon button
  - **Form inputs:** standard styled inputs matching the site's form pages
  - **Transitions:** panel open/close 200ms ease-out, message fade-in 150ms, button hover 150ms

---

## Phase 6: Build & Verify

- [ ] Run `npm run build` — confirm all routes compile (static pages + serverless API route)
- [ ] Test locally with `npm run dev`:
  - **Happy path (full service):** New user → enroll → select "New York" → full service → signup link shown
  - **Out-of-area path:** enroll → select "Ohio" → not full → no SSI/SSDI → out of area → find resources → select "Housing & shelter" + "Food" → GPT-5.2 returns Ohio-specific resources
  - **SSI/SSDI "Not sure":** explanation text shown → re-asks Yes/No → "No" proceeds to out of area
  - **SSI/SSDI "Yes":** signup link shown with "may still qualify" message
  - **Try different state:** out of area → "Try a different state" → back to state text input
  - **Prior client (currently served):** served before → yes → currently served → yes → name/phone form → submit → done
  - **Prior client (not currently served):** served before → yes → not currently → "help with my case" → classified AW-related → placeholder handoff
  - **AW help after hours:** same as above but outside 9-5 ET → after-hours placeholder message
  - **General help:** not currently served → "how do I apply for food stamps" → classified not-AW → GPT-5.2 web search answer
  - **Resource "Other":** out of area → find resources → select "Other" + type "childcare" → GPT-5.2 searches for childcare resources
  - **Error handling:** temporarily break API key → verify friendly error message appears
  - **Session persistence:** start conversation → navigate to different page → return → conversation preserved
  - **"Start over":** reach DONE → click "Start over" → resets to beginning
- [ ] Commit all chatbot work

---

## State Machine Quick Reference

```
START → ASK_SERVED_BEFORE
         [Buttons: Yes / No / Not sure]
  │
  ├─ Yes → ASK_CURRENTLY_SERVED
  │         [Buttons: Yes / No]
  │         ├─ Yes → COLLECT_NAME_PHONE → DONE
  │         │         [Form: name + phone]
  │         └─ No → ASK_HELP
  │                   [Text input]
  │                   ├─ AW-related → DONE (placeholder handoff)
  │                   └─ Not AW → GPT-5.2 web search → DONE
  │
  └─ No/Not sure → ASK_ENROLL
                     [Buttons: Yes / No / Not sure]
                     │
                     ├─ Yes → ASK_STATE
                     │         [Text: type state name]
                     │         ├─ Service state → DONE (signup link)
                     │         └─ Non-service state → ASK_SSI_SSDI
                     │                                  [Buttons: Yes / No / Not sure]
                     │                                  ├─ Yes → DONE (signup link)
                     │                                  ├─ Not sure → explain SSI/SSDI → re-ask [Yes / No]
                     │                                  └─ No → OUT_OF_AREA
                     │                                           [Buttons: Find resources / Try different state]
                     │                                           ├─ Try different state → ASK_STATE
                     │                                           └─ Find resources → ASK_RESOURCE_NEEDS
                     │                                                                [Multi-select + Other]
                     │                                                                └─ GPT-5.2 web search → DONE
                     │
                     └─ No/Not sure → ASK_HELP (same routing as above)
```

## Files Created/Modified

| File | Action |
|------|--------|
| `/web/next.config.ts` | Modify — remove `output: 'export'` |
| `/web/package.json` | Modify — add `openai` dep |
| `/web/.env.local` | Create — `OPENAI_API_KEY` (gitignored) |
| `/web/app/api/chat/types.ts` | Create — types, interfaces, constants |
| `/web/app/api/chat/utils.ts` | Create — `isBusinessHoursET`, `isFullServiceState`, `isValidPhone` |
| `/web/app/api/chat/llm.ts` | Create — OpenAI client + 3 functions |
| `/web/app/api/chat/handleMessage.ts` | Create — state machine switch/case |
| `/web/app/api/chat/route.ts` | Create — POST `/api/chat` handler |
| `/web/components/chat/ChatWidget.tsx` | Create — floating widget + panel |
| `/web/components/chat/ChatMessage.tsx` | Create — message bubble component |
| `/web/components/chat/ChatInput.tsx` | Create — dynamic input renderer |
| `/web/components/layout/ClientShell.tsx` | Modify — add `<ChatWidget />` |
| `/web/styles/globals.css` | Modify — chat widget styles |
