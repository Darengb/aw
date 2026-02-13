## America Works Chatbot Intake Flow (Spec + UX + LLM/Tool Gating)

> **Channel:** Web chat widget (rich UI supported)
> **Goal:** Follow a fixed intake tree. Use the LLM for parsing/classification only where needed. Use **web search only in explicitly allowed branches**.

------

# Global Rules

## Input Types

- **Buttons:** for Yes/No and other small-option choices
- **Text input:** for ZIP, name, phone, and open-ended questions

## Models (see model-decisions.md for full details)

| Role | Model | When Used |
|---|---|---|
| NLU parsing | **GPT-5 Nano** | Every free-text user message — extract structured fields |
| AW classification | **GPT-5 Nano** | "What can I help with?" step — binary classify AW-related |
| Web search + answer | **GPT-5.2** | Resource recommendations and general help — high-stakes, empathetic |

## LLM + Web Search Gating

- **LLM (parse/classify) is allowed** when the user types free text or provides name/phone/ZIP. → Use **GPT-5 Nano**
- **Web search is allowed only** in:
  1. **Non–America Works questions** (General Help) → Use **GPT-5.2**
  2. **Out-of-service-area** resources recommendation → Use **GPT-5.2**

## Business Hours

- **9:00 AM – 5:00 PM ET** (assumed **Mon–Fri** unless specified otherwise)

------

# Flow

## Start

### Step 1 — Served Before?

**Prompt:** “Have you ever been served by America Works before?”
**Input type:** Buttons → `Yes` / `No` / `Not sure`
**LLM:** **No** (button values map directly)
**Web search:** **No**

- **If Yes →** go to **A**
- **If No →** go to **B**
- **If Not sure →** (recommended) treat as **No** and proceed to **B**, or show: “No problem — let’s start with enrollment.”

------

## A) Prior Client Path

### Step 2 — Currently Served?

**Prompt:** “Are you currently being served by America Works?”
**Input type:** Buttons → `Yes` / `No`
**LLM:** **No**
**Web search:** **No**

- **If Yes →** go to **A1**
- **If No →** go to **A2**

### A1) Currently Served → Collect Identity

**Prompt:** “Please provide your full name and phone number.”
**Input type:** Structured form fields:

- **Full Name** (text)
- **Phone Number** (phone input with validation/mask)
- Button: `Submit`
  **LLM:** **Optional** (only if you want normalization; otherwise validate in code)
  **Web search:** **No**

**Action:** Store name + phone.
**End state:** **Done** (or optionally proceed to “What can I help you with?” later—out of scope unless you want to add it.)

------

### A2) Not Currently Served → What can I help with?

**Prompt:** “What can I help you with today?”
**Input type:** Text input (multi-line) + `Send`
**LLM:** **Yes (classification only)**
**Web search:** **Conditional** (see below)

**LLM output needed:** `isAmericaWorksRelated: true/false` (and optionally confidence)

- If **America Works–related →** go to **C (America Works Support)**
- If **not America Works–related →** go to **D (General Help via Web Search)**

------

## B) New / Not Previously Served Path

### Step 2 — Enrollment Intent

**Prompt:** “Are you looking to enroll in our services?”
**Input type:** Buttons → `Yes` / `No` / `Not sure`
**LLM:** **No**
**Web search:** **No**

- **If Yes →** go to **B1**
- **If No →** go to **B2**
- **If Not sure →** go to **B2** (or ask a quick clarifier)

------

### B1) Enrollment Intake

#### Step 3 — ZIP Code

**Prompt:** “What is your ZIP Code?”
**Input type:** ZIP field (5-digit numeric mask) + `Continue`
**LLM:** **No** (validate + interpret in code)
**Web search:** **No**

**Action (non-LLM):** Check ZIP against service coverage table.

#### Decision — Service Coverage

**Decision logic:** `ZIP → FULL_SERVICES?`
**Input type:** None (system decision)
**LLM:** **No**
**Web search:** **No**

- **If FULL services →** **Provide enrollment signup link** → **End**
  - Message: “Great — you can enroll here: **[Signup Form Link]**”
- **If NOT full →** go to **Step 4**

#### Step 4 — SSI/SSDI

**Prompt:** “Do you currently receive SSI and/or SSDI?”
**Input type:** Buttons → `Yes` / `No` / `Not sure`
**LLM:** **No**
**Web search:** **No**

- **If Yes →** **Provide enrollment signup link** → **End**
  - Message: “You may still qualify — please enroll here: **[Signup Form Link]**”
- **If No →** go to **B1-OutOfArea**
- **If Not sure →** (recommended) show a short explanation + buttons:
  - “SSI/SSDI are disability benefits. If you’re not sure, you can check with SSA or choose ‘Not sure’ and we’ll suggest resources.”
  - Then treat as **No** for eligibility and proceed to resources.

##### B1-OutOfArea — Not Eligible / Not In Service Area

**Message:** "Unfortunately, we do not currently offer services in your area. We can help you find resources nearby."
**Input type:** Buttons:

- `Find resources near me`
- `Try a different ZIP`
  **LLM:** **No** (buttons only)
  **Web search:** **No**
- If user clicks **Try a different ZIP →** return to ZIP step
- If user clicks **Find resources near me →** go to **D2-Ask (Resource Needs)**

##### D2-Ask — What Kind of Resources?

**Prompt:** "What kind of help are you looking for?"
**Input type:** Buttons (multi-select allowed) + text option:

- `Job search & career help`
- `Housing & shelter`
- `Food & nutrition assistance`
- `Benefits & disability (SSA/SSI)`
- `Mental health & crisis support`
- `Other` (opens text input)

**LLM:** **No** (button values map directly, unless "Other" typed)
**Web search:** **No**

**Action:** Store selected categories + user's ZIP → go to **D2 (Web Search Resources)** with both ZIP and resource categories as context for the search.

------

### B2) Not Enrolling → What can I help with?

**Prompt:** “What can I help you with today?”
**Input type:** Text input (multi-line) + `Send`
**LLM:** **Yes (classification only)**
**Web search:** **Conditional**

- If **America Works–related →** go to **C (America Works Support)**
- If **not America Works–related →** go to **D (General Help via Web Search)**

------

## C) America Works Support (Live Handoff or Callback)

### Decision — Business Hours

**Decision logic:** current time in **ET**, within **9am–5pm**
**Input type:** None
**LLM:** **No**
**Web search:** **No**

#### If within business hours

**Message:** “I can connect you with a team member now.”
**Action:** Route to live person (handoff)

#### If outside business hours

**Message:**
“Thank you. We will have someone get in touch with you as soon as possible during our next business hours (9:00 AM – 5:00 PM ET).”
**Action:** Send email to staff contact with user details + message

**Email payload (if available):**

- Full Name
- Phone Number
- ZIP Code
- User’s message
- Timestamp (ET)

------

## D) General Help (Non–America Works Questions)

### D1) Answer via Web Search

**Entry condition:** LLM classification indicates **not America Works–related**
**Input type:** None
**LLM:** **Yes** (generate answer)
**Web search:** **Yes** (enabled)

**Response requirements:**

- Provide a clear answer + actionable steps
- Prefer reputable sources (government, major nonprofits, state/local agencies)
- Include citations/links shown in the widget UI

------

### D2) Out-of-Area Resources via Web Search

**Entry condition:** User selected resource categories in D2-Ask
**Input:** User's ZIP + selected resource categories (e.g. "housing", "job search", "food assistance")
**LLM:** **Yes — GPT-5.2** (curate + summarize results)
**Web search:** **Yes** (enabled)

**System prompt context:** Include the user's ZIP and selected categories so the model searches for relevant local resources. If the user selected "Mental health & crisis support", prioritize crisis hotlines and immediate-help resources.

**Output format (recommended):**

- 3–6 local/appropriate resources tailored to what the user asked for
- For each: name, what they help with, how to contact, link
- Fallback suggestions if location-based results are weak:
  - **Job search:** State workforce agency, CareerOneStop, local American Job Center
  - **Housing:** HUD local resources, 211.org, local shelters
  - **Food:** Local food banks, SNAP info, Feeding America locator
  - **Benefits/SSA:** SSA.gov, local SSA office, benefits.gov
  - **Mental health/crisis:** 988 Suicide & Crisis Lifeline, Crisis Text Line, SAMHSA helpline
  - **General:** 211.org (covers most categories by ZIP)

------

# Summary Table (Quick Reference)

| Step           | Prompt                  | Input Type      | LLM?                          | Web Search? | Model |
| -------------- | ----------------------- | --------------- | ----------------------------- | ----------- | ----- |
| 1              | Served before?          | Buttons         | No                            | No          | — |
| 2A             | Currently served?       | Buttons         | No                            | No          | — |
| A1             | Name + phone            | Form fields     | Optional                      | No          | GPT-5 Nano |
| A2/B2          | What can I help with?   | Text            | **Yes (classify)**            | No          | GPT-5 Nano |
| 2B             | Looking to enroll?      | Buttons         | No                            | No          | — |
| B1             | ZIP code                | ZIP field       | No                            | No          | — |
| B1             | Service coverage check  | System          | No                            | No          | — |
| B1             | SSI/SSDI?               | Buttons         | No                            | No          | — |
| B1 Out of area | Find resources?         | Buttons         | No                            | No          | — |
| D2-Ask         | What kind of resources? | Buttons (multi) | No (unless "Other")           | No          | GPT-5 Nano (Other only) |
| C              | Business hours decision | System          | No                            | No          | — |
| D1             | General help answer     | System          | **Yes (generate)**            | **Yes**     | **GPT-5.2** |
| D2             | Out-of-area resources   | System          | **Yes (curate + summarize)**  | **Yes**     | **GPT-5.2** |

------

```text
START
  |
  |-- Q1: Served by America Works before?
  |        [Buttons: Yes / No / Not sure]
  |
  |-- YES --> A) PRIOR CLIENT
  |             |
  |             |-- Q2: Currently being served?
  |             |       [Buttons: Yes / No]
  |             |
  |             |-- YES --> A1) CURRENTLY SERVED
  |             |            |
  |             |            |-- Q3: Provide full name + phone
  |             |            |       [Form: Name, Phone]
  |             |            |
  |             |            '-- END
  |             |
  |             '-- NO --> A2) NOT CURRENTLY SERVED
  |                          |
  |                          |-- Q3: What can I help you with?
  |                          |       [Text input -> LLM classify AW-related?]
  |                          |
  |                          |-- AW-RELATED --> C) AMERICA WORKS SUPPORT
  |                          |                  |
  |                          |                  |-- Business hours? (9am–5pm ET)
  |                          |                  |
  |                          |                  |-- YES --> Live handoff to person
  |                          |                  |            '-- END
  |                          |                  |
  |                          |                  '-- NO --> After-hours message
  |                          |                             + Email staff
  |                          |                             '-- END
  |                          |
  |                          '-- NOT AW-RELATED --> D1) GENERAL HELP (WEB SEARCH)
  |                                             [Web search enabled]
  |                                             '-- END
  |
  '-- NO / NOT SURE --> B) NEW / NOT PREVIOUSLY SERVED
                 |
                 |-- Q2: Looking to enroll?
                 |       [Buttons: Yes / No / Not sure]
                 |
                 |-- YES --> B1) ENROLLMENT INTAKE
                 |            |
                 |            |-- Q3: ZIP Code
                 |            |       [ZIP input]
                 |            |
                 |            |-- ZIP has FULL services?
                 |            |       [System lookup]
                 |            |
                 |            |-- YES --> Provide signup link
                 |            |            '-- END
                 |            |
                 |            '-- NO --> Q4: Receive SSI/SSDI?
                 |                     [Buttons: Yes / No / Not sure]
                 |
                 |                     |-- YES --> Provide signup link
                 |                     |            '-- END
                 |                     |
                 |                     '-- NO/NOT SURE --> Out of service area
                 |                                   |
                 |                                   |-- Buttons:
                 |                                   |     - Find resources near me
                 |                                   |     - Try a different ZIP
                 |                                   |
                 |                                   |-- Try different ZIP --> back to Q3: ZIP Code
                 |                                   |
                 |                                   '-- Find resources --> D2-ASK) WHAT KIND OF HELP?
                 |                                                    |    [Buttons: Job search, Housing,
                 |                                                    |     Food, Benefits, Mental health, Other]
                 |                                                    |
                 |                                                    '-- D2) RESOURCES (WEB SEARCH, GPT-5.2)
                 |                                                         [ZIP + selected categories]
                 |                                                         '-- END
                 |
                 '-- NO / NOT SURE --> B2) GENERAL HELP
                              |
                              |-- Q3: What can I help you with?
                              |       [Text input -> LLM classify AW-related?]
                              |
                              |-- AW-RELATED --> C) AMERICA WORKS SUPPORT
                              |                  |
                              |                  |-- Business hours? (9am–5pm ET)
                              |                  |
                              |                  |-- YES --> Live handoff to person
                              |                  |            '-- END
                              |                  |
                              |                  '-- NO --> After-hours message
                              |                             + Email staff
                              |                             '-- END
                              |
                              '-- NOT AW-RELATED --> D1) GENERAL HELP (WEB SEARCH)
                                                 [Web search enabled]
                                                 '-- END
```