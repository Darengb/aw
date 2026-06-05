# America Works SMS + Nondiscrimination Website Updates Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Complete the four personal TaskNotes for the America Works website: restore the SMS policy page, add the SMS opt-in form, route SMS opt-in submissions to the dedicated Formspree endpoint, and restore the SNAP/USDA nondiscrimination statement URL.

**Architecture:** Add three public routes to the existing Next.js App Router site: `/smspolicy`, `/opt-in`, and `/nondiscrimsnap`. Reuse the existing form security pattern (`HoneypotField`, `TurnstileWidget`, `/api/forms/submit`) but add endpoint routing so the SMS opt-in form posts to the dedicated Formspree endpoint without disturbing current generic forms. Add footer/legal links so old referenced URLs are discoverable and crawlable.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS classes, Formspree, Cloudflare Turnstile.

---

## Current context

Relevant repo path: `/home/ubuntu/aw/web`

Current app facts:
- Existing generic Formspree API route: `web/app/api/forms/submit/route.ts`
- Existing generic endpoint hard-coded there: `https://formspree.io/f/xeelalar`
- New SMS opt-in Formspree endpoint from Daren: `https://formspree.io/f/xbdelagr`
- Existing form anti-spam components:
  - `web/components/forms/Honeypot.tsx`
  - `web/components/forms/TurnstileWidget.tsx`
- Existing footer: `web/components/layout/Footer.tsx`
- Existing form patterns:
  - `web/app/jobseekers-form/JobseekersFormClient.tsx`
  - `web/app/employers-form/page.tsx`
- Current build passes with `.env.local` detected.
- Current lint already has unrelated failures; implementation should avoid adding new lint failures.

Email/request facts to preserve:
- `/smspolicy` was the old SMS policy URL and is referenced by SMS campaign forms.
- `/opt-in` was the old SMS opt-in URL.
- SMS opt-in responses should go to Salesforce support; Daren created Formspree endpoint `https://formspree.io/f/xbdelagr` for this.
- `/nondiscrimsnap` was the old nondiscrimination/SNAP PDF URL; Marsha/Sid need it back for SNAP audit requirements.

Attachment cache for reference, not for committing directly unless needed:
- SMS policy HTML: `/home/ubuntu/.hermes/cache/aw-email-attachments/19e4c29e89889af3_SMS_Policy_-_America_Works.html`
- SMS opt-in HTML: `/home/ubuntu/.hermes/cache/aw-email-attachments/19e4c29e89889af3_index.html`
- Nondiscrimination PDF: `/home/ubuntu/.hermes/cache/aw-email-attachments/19e65e8b3f4d9e8b_nondiscrimsnap.pdf`

---

## Progress checkpoint — 2026-06-04 9:00 PM ET

Completed before Claude Code handoff:

- [x] Confirmed `/home/ubuntu/aw` is already cloned from GitHub and up to date before changes.
- [x] Confirmed Next.js app path is `/home/ubuntu/aw/web`.
- [x] Confirmed current build had passed before implementation after `.env.local` was added.
- [x] Identified pre-existing lint failures unrelated to this work; do not assume lint was clean at start.
- [x] Task 1 partial/complete: modified `web/app/api/forms/submit/route.ts` so `form=sms_opt_in` routes to `https://formspree.io/f/xbdelagr` and other forms keep `https://formspree.io/f/xeelalar`.
- [x] Task 2 partial/complete: created `web/app/smspolicy/page.tsx` with SMS policy language and `/opt-in` link.
- [x] Task 3 partial/complete: created `web/app/opt-in/page.tsx` with SMS opt-in form, honeypot, Turnstile, consent copy, and submit to `/api/forms/submit` with `form=sms_opt_in`.
- [x] Task 4 partial: copied PDF asset to `web/public/documents/nondiscrimsnap.pdf`.

Remaining for Claude Code:

- [ ] Finish Task 4: create `web/app/nondiscrimsnap/page.tsx` and verify PDF link.
- [ ] Finish Task 5: add footer/legal links in `web/components/layout/Footer.tsx` for `/smspolicy`, `/opt-in`, `/nondiscrimsnap`.
- [ ] Run `npm run build` from `/home/ubuntu/aw/web`; fix any build/type errors introduced by this work.
- [ ] Run `npm run lint`; identify whether any failures are pre-existing or newly introduced by changed files, and fix new issues in changed files.
- [ ] Launch local server and browser-smoke `/smspolicy`, `/opt-in`, `/nondiscrimsnap`, and `/documents/nondiscrimsnap.pdf`.
- [ ] Attempt one clearly marked test SMS opt-in submission through the UI. If Cloudflare Turnstile blocks localhost, document the exact blocker and do not bypass production security silently.
- [ ] Commit all AW repo changes with a clear message, unless verification finds a blocker.

---

## Proposed implementation shape

### Routes

Create:
- `web/app/smspolicy/page.tsx`
- `web/app/opt-in/page.tsx`
- `web/app/nondiscrimsnap/page.tsx`

Optional static PDF asset:
- `web/public/documents/nondiscrimsnap.pdf`

Recommended:
- Build `/nondiscrimsnap` as an accessible HTML page that also links to the original PDF download/viewer.
- Copy the PDF into `public/documents/` so there is a stable asset URL: `/documents/nondiscrimsnap.pdf`.

### Form submission routing

Modify:
- `web/app/api/forms/submit/route.ts`

Change from one hard-coded endpoint to endpoint selection based on a safe form field, e.g.:
- existing forms append `form: jobseeker_inquiry`, `form: employer_job_order`, etc.
- SMS opt-in form appends `form: sms_opt_in`
- API chooses:
  - `sms_opt_in` → `https://formspree.io/f/xbdelagr`
  - everything else → `https://formspree.io/f/xeelalar`

Keep endpoint constants server-side in the route module or move to env vars. For this pass, constants are acceptable because the existing generic endpoint is already hard-coded, but add a clear comment. If preferring env vars:
- `FORMSPREE_ENDPOINT_DEFAULT=https://formspree.io/f/xeelalar`
- `FORMSPREE_ENDPOINT_SMS_OPT_IN=https://formspree.io/f/xbdelagr`

### Footer links

Modify:
- `web/components/layout/Footer.tsx`

Add a small “Legal” or “Policies” link cluster, or add links under Company:
- `SMS Policy` → `/smspolicy`
- `SMS Opt-In` → `/opt-in`
- `Nondiscrimination Statement` → `/nondiscrimsnap`

Do not overdesign the footer; just make the required pages discoverable.

---

## Implementation tasks

### Task 1: Add Formspree endpoint routing without changing existing form behavior

**Objective:** Keep existing forms posting to the current Formspree endpoint while allowing SMS opt-in submissions to use Daren’s dedicated endpoint.

**Files:**
- Modify: `web/app/api/forms/submit/route.ts`

**Steps:**

1. Open `web/app/api/forms/submit/route.ts`.
2. Replace the single endpoint constant with named constants:

```ts
const DEFAULT_FORMSPREE_ENDPOINT = 'https://formspree.io/f/xeelalar'
const SMS_OPT_IN_FORMSPREE_ENDPOINT = 'https://formspree.io/f/xbdelagr'
```

3. After Turnstile verification and `form.delete('cf-turnstile-response')`, read the form type:

```ts
const formType = form.get('form')?.toString()
const formspreeEndpoint =
  formType === 'sms_opt_in' ? SMS_OPT_IN_FORMSPREE_ENDPOINT : DEFAULT_FORMSPREE_ENDPOINT
```

4. Change the `fetch()` call to use `formspreeEndpoint`.
5. Preserve existing error behavior and status passthrough.
6. Run:

```bash
cd /home/ubuntu/aw/web
npm run build
```

Expected: build passes.

7. Do not test with live Formspree until after the SMS opt-in form exists.
8. Commit after implementation:

```bash
git add web/app/api/forms/submit/route.ts
git commit -m "feat: route SMS opt-in form submissions"
```

---

### Task 2: Create the `/smspolicy` page

**Objective:** Restore the old `/smspolicy` URL with clean SMS Terms & Conditions content.

**Files:**
- Create: `web/app/smspolicy/page.tsx`
- Modify: `web/components/layout/Footer.tsx` later in Task 5, not here unless preferred.

**Content requirements:**

Use this structure:
- Metadata title: `SMS Policy - America Works`
- Main heading: `SMS Policy`
- Subheading: `America Works SMS Terms and Conditions`
- Sections:
  1. Service Description
  2. Opt-In
  3. Opt-Out
  4. Support and Assistance
  5. Carrier Liability
  6. Message and Data Rates

Exact facts to include:
- America Works sends periodic SMS reminders and updates about programs/services.
- Examples: appointment reminders, job fair and employer announcements, wage reporting reminders, office closures, holiday greetings, and relevant program info.
- Opt in by texting `START` to `347-752-5830` or completing the opt-in form at `/opt-in`.
- Consent is not required as a condition of purchasing property, goods, or services.
- Information will not be shared with any 3rd party for affiliate marketing purposes.
- Opt out by replying/texting `STOP` to `347-752-5830`.
- Help by replying `HELP`, emailing `info@americaworks.com`, or calling `(855) 268-1935`.
- Wireless carriers are not liable for delayed/undelivered messages.
- Standard message/data rates may apply.
- Minimum of one message per month, not including conversational messages.

**Implementation notes:**
- Server component is fine; no client state needed.
- Use semantic headings and lists for accessibility.
- Match existing site spacing: e.g. `pt-32 pb-24 bg-white min-h-screen`, `max-w-3xl mx-auto px-8`.
- Use `<Link href="/opt-in">` for the opt-in form.

**Verification:**

```bash
cd /home/ubuntu/aw/web
npm run build
```

Then run dev server and visit `/smspolicy`:

```bash
npm run dev -- --hostname 127.0.0.1 --port 3007
```

Expected:
- Page returns 200.
- No browser console errors.
- `/opt-in` link is visible and points correctly.

**Commit:**

```bash
git add web/app/smspolicy/page.tsx
git commit -m "feat: add SMS policy page"
```

---

### Task 3: Create the `/opt-in` SMS opt-in form page

**Objective:** Restore the old `/opt-in` URL with a working SMS consent form routed as `sms_opt_in`.

**Files:**
- Create: `web/app/opt-in/page.tsx`

**Form fields:**
- Full Name (`name`, required)
- Phone Number (`phone`, required, `type="tel"`)
- Consent checkbox (`consent`, required)

**Hidden/metadata fields to append in submit handler:**
- `form`: `sms_opt_in`
- `_subject`: `SMS opt-in consent`
- `consent_timestamp`: current ISO timestamp at submit time
- `consent_source`: `/opt-in`
- `sms_terms_url`: `/smspolicy`
- `cf-turnstile-response`: Turnstile token

**Visible copy requirements:**

Intro:
> America Works offers the opportunity to send text messages to you as a participant, to provide important information, upcoming training opportunities, job leads, employer-related events, appointment reminders, and check-ins.

Terms:
- Message and data rates may apply.
- Message frequency varies.
- You can opt out at any time by replying `STOP`.
- For help or more information, reply `HELP` or contact customer service at `1-855-268-1935`.
- Privacy/SMS policy link: `/smspolicy`.

Consent text:
> By providing your phone number, you consent to receiving SMS communications from America Works. You can opt out at any time by replying STOP to any of our messages.

Checkbox label:
> I consent to receive SMS communications from America Works

**Implementation pattern:**
- Use `'use client'` because the page handles form state.
- Reuse from existing form pages:
  - `useState`, `useRef`
  - `HoneypotField`, `useHoneypot`
  - `TurnstileWidget`
  - `TurnstileInstance`
  - `CheckCircle`, `Loader2`, optional `ArrowRight`
- Submit to `/api/forms/submit` with `body: FormData`.
- Use `isLikelyBot()` to fake success and avoid submitting bots, consistent with existing forms.
- If no Turnstile token, show the same verification error pattern as existing forms.
- On success, show a clear confirmation page:
  > Thank you! Your SMS opt-in has been submitted.

**Important:** The API routing in Task 1 depends on `form` exactly equaling `sms_opt_in`.

**Verification:**

```bash
cd /home/ubuntu/aw/web
npm run build
```

Local smoke:
- Visit `/opt-in`.
- Confirm the form renders.
- Confirm `/smspolicy` link exists.
- Confirm required fields/consent are marked required.
- Submit should require Turnstile in browser.

**Commit:**

```bash
git add web/app/opt-in/page.tsx
git commit -m "feat: add SMS opt-in form"
```

---

### Task 4: Add the nondiscrimination statement PDF/page at `/nondiscrimsnap`

**Objective:** Restore the old SNAP nondiscrimination URL required for audit-related agreements.

**Files:**
- Create: `web/app/nondiscrimsnap/page.tsx`
- Create: `web/public/documents/nondiscrimsnap.pdf`

**Asset handling:**

Copy the source PDF:

```bash
mkdir -p /home/ubuntu/aw/web/public/documents
cp /home/ubuntu/.hermes/cache/aw-email-attachments/19e65e8b3f4d9e8b_nondiscrimsnap.pdf \
  /home/ubuntu/aw/web/public/documents/nondiscrimsnap.pdf
```

**Page content:**
- Metadata title: `USDA Nondiscrimination Statement - America Works`
- Heading: `USDA Nondiscrimination Statement`
- Brief context:
  > This page provides the USDA nondiscrimination statement for SNAP/FDPIR and related nutrition assistance program materials.
- Primary link/button:
  - `View or download the PDF` → `/documents/nondiscrimsnap.pdf`
- Include accessible text summary or full extracted PDF text.

Recommended: include full text from the PDF as HTML sections for accessibility. Minimum sections:
- SNAP and FDPIR Nondiscrimination Statement
- Other FNS Nutrition Assistance Programs
- Joint Application Form / HHS
- Complaint filing contact information

**Key text facts from PDF:**
- 3 pages, dated October 14, 2015.
- Includes USDA civil rights nondiscrimination language.
- Includes Federal Relay Service `(800) 877-8339`.
- Includes USDA complaint form AD-3027 and complaint submission via:
  - Mail: U.S. Department of Agriculture, Office of the Assistant Secretary for Civil Rights, 1400 Independence Avenue SW, Washington, D.C. 20250-9410
  - Fax: `(202) 690-7442`
  - Email: `program.intake@usda.gov`
- Includes SNAP Hotline `(800) 221-5689`.
- Includes HHS Office for Civil Rights contact.
- Ends with “This institution is an equal opportunity provider.”

**Verification:**

```bash
cd /home/ubuntu/aw/web
npm run build
```

Local smoke:
- Visit `/nondiscrimsnap`.
- Confirm page returns 200.
- Confirm PDF link opens/downloads from `/documents/nondiscrimsnap.pdf`.
- Confirm no console errors.

**Commit:**

```bash
git add web/app/nondiscrimsnap/page.tsx web/public/documents/nondiscrimsnap.pdf
git commit -m "feat: add nondiscrimination statement page"
```

---

### Task 5: Add footer/legal navigation links

**Objective:** Make the restored URLs discoverable from the site footer.

**Files:**
- Modify: `web/components/layout/Footer.tsx`

**Approach:**

Add a small legal/policy section without disrupting the current grid too much. Preferred minimal change: in the existing Company list, add:

```tsx
<li className="mb-3"><Link href="/smspolicy" className="text-gray-400 no-underline text-sm transition-colors duration-200 hover:text-white">SMS Policy</Link></li>
<li className="mb-3"><Link href="/opt-in" className="text-gray-400 no-underline text-sm transition-colors duration-200 hover:text-white">SMS Opt-In</Link></li>
<li className="mb-3"><Link href="/nondiscrimsnap" className="text-gray-400 no-underline text-sm transition-colors duration-200 hover:text-white">Nondiscrimination Statement</Link></li>
```

If the list becomes too long, rename Company to “Company & Policies” or create a fourth/fifth column only if layout still looks good.

**Verification:**

```bash
cd /home/ubuntu/aw/web
npm run build
```

Browser smoke:
- Homepage footer shows links.
- Each link navigates to a 200 page.

**Commit:**

```bash
git add web/components/layout/Footer.tsx
git commit -m "feat: add policy links to footer"
```

---

### Task 6: End-to-end QA and cleanup

**Objective:** Verify the four TaskNotes are satisfied and no new breakage was introduced.

**Commands:**

```bash
cd /home/ubuntu/aw/web
npm run build
npm run lint
```

Expected:
- Build passes.
- Lint may still fail due to pre-existing errors; compare output to the known current lint failures and ensure no new files introduce errors.

Suggested lint strategy if not fixing all existing lint:
- Run `npm run lint` before implementation and save output.
- Run after implementation.
- Confirm no new errors in:
  - `app/smspolicy/page.tsx`
  - `app/opt-in/page.tsx`
  - `app/nondiscrimsnap/page.tsx`
  - `app/api/forms/submit/route.ts`
  - `components/layout/Footer.tsx`

Browser smoke-test checklist:
- `/smspolicy` returns 200 and includes SMS terms.
- `/opt-in` returns 200 and renders form.
- `/opt-in` has required name, phone, consent, honeypot, and Turnstile.
- `/opt-in` submits with `form=sms_opt_in` so API routes to `https://formspree.io/f/xbdelagr`.
- `/nondiscrimsnap` returns 200 and links to `/documents/nondiscrimsnap.pdf`.
- `/documents/nondiscrimsnap.pdf` returns 200.
- Footer links exist and work.
- Browser console has no runtime errors on new pages.

Optional API-level test without sending live Formspree:
- Temporarily unit-test endpoint selection by extracting a pure helper:

```ts
function endpointForFormType(formType: string | undefined) {
  return formType === 'sms_opt_in' ? SMS_OPT_IN_FORMSPREE_ENDPOINT : DEFAULT_FORMSPREE_ENDPOINT
}
```

But do not add a test framework just for this if the repo has none. YAGNI.

Final commit:

```bash
git status --short
git log --oneline -6
```

If all task commits are already done, no final squashing needed.

---

## Risks and mitigations

### Risk: SMS opt-in accidentally posts to generic Formspree endpoint

Mitigation:
- Use exact hidden field `form=sms_opt_in`.
- Route in server code based on `formType === 'sms_opt_in'`.
- Add `_subject: SMS opt-in consent` for easy Formspree/Salesforce identification.

### Risk: Hard-coded endpoints become maintenance debt

Mitigation:
- Accept hard-coded constants for parity with current code, but name them clearly.
- If there is time, move endpoints into env vars and update `.env.local`/deployment env.

### Risk: Nondiscrimination PDF-only page is inaccessible

Mitigation:
- Include accessible HTML text summary or full extracted text on `/nondiscrimsnap`.
- Also link to the PDF.

### Risk: Existing lint failures hide new lint issues

Mitigation:
- Compare lint output before/after.
- Avoid JSX `// Text` patterns that currently trigger `react/jsx-no-comment-textnodes`; use `{'// SMS Policy'}` if using decorative slash labels.
- Avoid `Date.now()` directly during render in any new component.

### Risk: Turnstile blocks local live-submit testing

Mitigation:
- Verify rendering locally.
- For live submit, test in deployed/staging environment with valid Turnstile keys.
- Do not bypass verification in production code.

---

## Definition of done

All four TaskNotes can be marked complete when:

1. `/smspolicy` exists, returns 200, includes complete SMS policy language, and links to `/opt-in`.
2. `/opt-in` exists, returns 200, includes the old required fields and consent language, and submits with `form=sms_opt_in`.
3. `/api/forms/submit` routes `sms_opt_in` submissions to `https://formspree.io/f/xbdelagr` while preserving existing generic form routing.
4. `/nondiscrimsnap` exists, returns 200, provides the nondiscrimination statement and/or links to a hosted PDF.
5. Footer includes links to the restored policy/compliance pages.
6. `npm run build` passes.
7. Browser smoke tests pass with no console errors on the new pages.
8. Changes are committed to the AW repo.

---

## Suggested execution order

1. Formspree endpoint routing.
2. SMS policy page.
3. SMS opt-in form.
4. Nondiscrimination PDF/page.
5. Footer links.
6. Full QA.

This order minimizes rework: the opt-in form can depend on the submission route and policy page, while footer links come after all target routes exist.
