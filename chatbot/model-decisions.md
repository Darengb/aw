# OpenAI Model Decisions

> Last updated: Feb 2026

## Model Selection by Use Case

| Use Case | Model | Input $/1M | Output $/1M | Context | Rationale |
|---|---|---|---|---|---|
| **NLU Parsing** (every message) | **GPT-5 Nano** | $0.05 | $0.40 | 400K | Fastest, cheapest current model. More than capable of extracting structured fields (yes/no, zip, name, phone) from free text. Called on every user message — cost must be near-zero. |
| **AW Classification** (occasional) | **GPT-5 Nano** | $0.05 | $0.40 | 400K | Binary classification ("is this about America Works?") is trivial. No need for a larger model. |
| **Web Search + Answer** (rare, high-stakes) | **GPT-5.2** | $1.75 | $14.00 | 400K | Latest flagship. Users in this branch may be homeless, in crisis, or in danger. Needs nuanced, empathetic, accurate responses with good source selection. Worth the premium for rare but critical calls. |

## Cost Estimates (per conversation)

Assuming ~200 tokens per call (input + output combined):

| Call Type | Frequency | Est. Cost |
|---|---|---|
| NLU parse (GPT-5 Nano) | 3–6 per conversation | ~$0.0003–0.0006 |
| Classification (GPT-5 Nano) | 0–1 per conversation | ~$0.0001 |
| Web search answer (GPT-5.2) | 0–1 per conversation | ~$0.01 |
| **Typical conversation total** | | **< $0.01** |

## Full OpenAI Model Lineup (Feb 2026 reference)

| Model | Input $/1M | Output $/1M | Context | Notes |
|---|---|---|---|---|
| GPT-5 Nano | $0.05 | $0.40 | 400K | Smallest GPT-5 family |
| GPT-4.1 Nano | $0.10 | $0.40 | 1M | |
| GPT-4o-mini | $0.15 | $0.60 | 128K | |
| GPT-5 Mini | $0.25 | $2.00 | 400K | |
| GPT-4.1 Mini | $0.40 | $1.60 | 1M | |
| o4 Mini | $1.10 | $4.40 | 200K | Reasoning model |
| o3 Mini | $1.10 | $4.40 | 200K | Reasoning model |
| GPT-5 | $1.25 | $10.00 | 400K | Standard flagship |
| GPT-5.1 | $1.25 | $10.00 | 400K | |
| GPT-5.2 | $1.75 | $14.00 | 400K | Latest flagship |
| o3 | $2.00 | $8.00 | 200K | Reasoning model |
| GPT-4.1 | $2.00 | $8.00 | 1M | |
| GPT-4o | $2.50 | $10.00 | 128K | |
| GPT-5 Pro | $15.00 | $120.00 | 400K | Deep reasoning |
| GPT-5.2 Pro | $21.00 | $168.00 | 400K | Deepest reasoning |

Source: [pricepertoken.com/pricing-page/provider/openai](https://pricepertoken.com/pricing-page/provider/openai)
