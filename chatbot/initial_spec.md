You’re thinking about this the right way: **don’t** build a “doc-bot.” Build a **workflow bot** (a small state machine) where the model is only used for (a) understanding what the user just said, and (b) doing a **web-search fallback** in the few branches where you explicitly want it.

Below is a concrete blueprint you can hand to an engineer.

------

## 1) Architecture: deterministic workflow + LLM only where needed

**Workflow Orchestrator (your code)**

- Owns the **current step/state**
- Decides which question to ask next (your exact sequence)
- Calls small internal functions:
  - `isBusinessHoursET(now)`
  - `lookupZipServiceLevel(zip)` (your coverage table)
  - `sendEmailToStaff(payload)` (handoff + intake)

**LLM**

- **NLU**: convert free text into structured fields (`yes/no`, `zip`, `ssi_ssdi`, `question_text`, `is_america_works_related`)
- **Web search**: only in branches you listed (non–America Works questions, or “not in service area → suggested resources”)

Key win: your flow stays rigid even if the user rambles.

------

## 2) State machine (exact flow you described)

### States (high level)

1. `ASK_SERVED_BEFORE`
2. If YES → `ASK_CURRENTLY_SERVED`
   - If YES → `COLLECT_NAME_PHONE` → `END_OR_ESCALATE` (you can either end or ask their issue next; your script currently stops at name/phone)
   - If NO → `ASK_HELP` → route:
     - AW-related → business hours → live handoff or email message
     - Not AW-related → web-search answer
3. If NO → `ASK_ENROLL`
   - If YES → `ASK_ZIP` → `CHECK_ZIP`
     - If “full services” → send signup link
     - Else → `ASK_SSI_SSDI`
       - If YES → signup link
       - If NO → “we don’t offer services” + web-search resources
   - If NO → `ASK_HELP` (same routing as above)

### Business hours rule

- You said: **9am–5pm ET**. I’ll assume **Mon–Fri** (typical “business hours”). If you actually mean weekends too, just change the predicate.

------

## 3) Tool gating rules (so web search doesn’t “take over”)

- In all intake steps (`ASK_SERVED_BEFORE`, `ASK_CURRENTLY_SERVED`, `ASK_ENROLL`, `ASK_ZIP`, `ASK_SSI_SSDI`, `COLLECT_NAME_PHONE`):
  - **Disable web search**
  - Model is only allowed to parse and ask the next scripted question.
- Only enable web search in:
  1. **Non–America Works question** branch
  2. **Out-of-service-area** branch (suggest resources)

This guarantees you never drift into generic RAG-bot behavior.

------

## 4) Practical implementation pattern (Node-style pseudocode)

```js
// ---- your deterministic workflow states ----
const STATES = {
  ASK_SERVED_BEFORE: "ASK_SERVED_BEFORE",
  ASK_CURRENTLY_SERVED: "ASK_CURRENTLY_SERVED",
  COLLECT_NAME_PHONE: "COLLECT_NAME_PHONE",
  ASK_ENROLL: "ASK_ENROLL",
  ASK_ZIP: "ASK_ZIP",
  ASK_SSI_SSDI: "ASK_SSI_SSDI",
  ASK_HELP: "ASK_HELP",
  DONE: "DONE",
};

function isBusinessHoursET(date) {
  // Assumption: Mon–Fri 9:00–17:00 America/New_York
  // Replace with a proper tz library in real code.
  const day = date.getDay(); // 0=Sun ... 6=Sat (but this is local server tz)
  const hour = date.getHours();
  const isWeekday = day >= 1 && day <= 5;
  return isWeekday && hour >= 9 && hour < 17;
}

async function handleMessage({ state, memory, userText, nowET }) {
  // 1) Always do "parse" with a strict schema (NO web search)
  const parsed = await parseUserInput(userText, state);

  switch (state) {
    case STATES.ASK_SERVED_BEFORE: {
      if (parsed.yesNo === "yes") return { state: STATES.ASK_CURRENTLY_SERVED, memory, reply: "Are you currently being served by America Works?" };
      if (parsed.yesNo === "no")  return { state: STATES.ASK_ENROLL, memory, reply: "Are you looking to enroll in our services?" };
      return { state, memory, reply: "Have you ever been served by America Works before? (Yes/No)" };
    }

    case STATES.ASK_CURRENTLY_SERVED: {
      if (parsed.yesNo === "yes") return { state: STATES.COLLECT_NAME_PHONE, memory, reply: "Please provide your full name and phone number." };
      if (parsed.yesNo === "no")  return { state: STATES.ASK_HELP, memory, reply: "What can I help you with?" };
      return { state, memory, reply: "Are you currently being served by America Works? (Yes/No)" };
    }

    case STATES.COLLECT_NAME_PHONE: {
      if (parsed.fullName && parsed.phone) {
        memory.fullName = parsed.fullName;
        memory.phone = parsed.phone;
        // optional: ask "What can I help you with?" next, or end here.
        return { state: STATES.DONE, memory, reply: "Thanks. Someone will follow up if needed." };
      }
      return { state, memory, reply: "Please share your full name and a phone number we can reach you at." };
    }

    case STATES.ASK_ENROLL: {
      if (parsed.yesNo === "yes") return { state: STATES.ASK_ZIP, memory, reply: "What is your ZIP Code?" };
      if (parsed.yesNo === "no")  return { state: STATES.ASK_HELP, memory, reply: "What can I help you with?" };
      return { state, memory, reply: "Are you looking to enroll in our services? (Yes/No)" };
    }

    case STATES.ASK_ZIP: {
      if (parsed.zip) {
        memory.zip = parsed.zip;
        const serviceLevel = await lookupZipServiceLevel(parsed.zip); // your DB/table
        if (serviceLevel === "FULL") {
          return { state: STATES.DONE, memory, reply: "Great — you can enroll here: <SIGNUP_FORM_LINK>" };
        }
        return { state: STATES.ASK_SSI_SSDI, memory, reply: "Do you currently receive SSI/SSDI? (Yes/No)" };
      }
      return { state, memory, reply: "What is your 5-digit ZIP Code?" };
    }

    case STATES.ASK_SSI_SSDI: {
      if (parsed.yesNo === "yes") return { state: STATES.DONE, memory, reply: "You can enroll here: <SIGNUP_FORM_LINK>" };
      if (parsed.yesNo === "no") {
        // out of area → web-search resources
        const resources = await webSearchResources(memory.zip);
        return { state: STATES.DONE, memory, reply: formatOutOfArea(resources) };
      }
      return { state, memory, reply: "Do you currently receive SSI/SSDI? (Yes/No)" };
    }

    case STATES.ASK_HELP: {
      // Classify AW-related vs not. (NO web search needed to classify.)
      const isAW = await classifyAmericaWorksRelated(userText);

      if (isAW) {
        if (isBusinessHoursET(nowET)) {
          await handoffToLiveAgent({ memory, userText }); // your integration
          return { state: STATES.DONE, memory, reply: "I’m connecting you with a team member now." };
        } else {
          await sendEmailToStaff({ memory, userText });
          return { state: STATES.DONE, memory, reply: "Thank you. We will have someone get in touch with you as soon as possible during our next business hours (9am–5pm ET)." };
        }
      }

      // Not America Works related → answer with web search
      const answer = await webSearchAnswer(userText);
      return { state: STATES.DONE, memory, reply: answer };
    }

    default:
      return { state: STATES.ASK_SERVED_BEFORE, memory, reply: "Have you ever been served by America Works before?" };
  }
}
```

------

## 5) What to prompt the model to do (so it behaves)

### A) “Parse” call (no web search)

Use a strict instruction like:

- “You are an intake parser. Return JSON only.”
- JSON fields vary by state:
  - `yesNo` (“yes” | “no” | null)
  - `zip` (string|null)
  - `fullName` (string|null)
  - `phone` (string|null)

This keeps the model from trying to “help” early.

### B) “Classify America Works related?” call (no web search)

Return `{ "isAmericaWorksRelated": true/false, "confidence": 0-1 }`.

### C) Web-search answer call (web_search enabled)

System rule:

- “Answer succinctly. Prefer authoritative sources (gov, major nonprofits). Include citations. If uncertain, say so.”

Also: put a **domain allowlist** if you want (e.g., SSA.gov, CareerOneStop.org, state workforce sites).

------

## 6) UX details that make this feel “intentional”

- Use quick-reply buttons for Yes/No
- ZIP input validation (5 digits)
- Phone validation + “By providing your number, you agree…” (if you need consent language)
- If user tries to skip ahead: keep them in the state (“First, I need to ask: Have you ever been served…?”)

------

## 7) Two things you’ll need to define internally

1. **Service coverage table**: “ZIP → FULL vs NOT_FULL” (or more granular)
2. **Escalation email target**: who receives it + what payload you include

------

If you tell me what platform you’re deploying this on (Twilio SMS, website chat widget, Intercom, Zendesk, etc.), I can adapt this into a concrete “drop-in” implementation plan (including exact JSON schemas for each state and the minimal set of API calls).