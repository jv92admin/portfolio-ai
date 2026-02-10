# Alfred Page Spec

> Structure and content for the /alfred page on vignesh.ai.
> For diagram rendering: `.claude/docs/technical-illustration-guide.md`

---

## Audience

Engineering leaders and technical recruiters at companies like Anthropic.

## Tone

Builder, not salesman. "I wanted to understand X" not "Alfred is a product that does X." Technical but never academic. Every section earns the reader's next scroll.

---

## Page Header

- **Title:** Alfred
- **Subtitle:** Agentic orchestration for LLMs that read and write real systems
- **Tagline:** *A domain-agnostic execution engine — cooking was just the test case.*
- **GitHub link**

---

## 1. The Graph

**How work actually flows**

**What to convey:**
- Requests route, they don't chain
- Simple reads skip planning entirely (quick mode)
- Complex tasks expand into a plan + execution loop
- Every path converges at a response + persisted state

**Agents (single responsibility):**
- **Understand** — memory + reference resolution
- **Think** — plans what should happen
- **Act** — executes steps, loops tools, enforces limits
- **Reply** — formats outcomes for humans
- **Summarize** — records what happened for the next turn

### Diagram: Pipeline

**Type:** Pipeline / flow, horizontal, left to right

**Nodes:**

| Node | Subtitle |
|------|----------|
| Understand | Memory Manager |
| Think | Planner |
| Act Quick | Fast Path |
| Act | Executor |
| Reply | Formatter |
| Summarize | Historian |

**Paths (show as distinct lanes converging at Reply):**

1. Understand → `[simple read]` → Act Quick → Reply → Summarize
2. Understand → `[needs clarification]` → Reply → Summarize
3. Understand → Think → `[propose/clarify]` → Reply → Summarize
4. Understand → Think → `[plan]` → Act ⟲ → Reply → Summarize

**Visual notes:**
- Act loop: curved arrow back to self, labeled "multi-tool loop"
- Quick mode path visually lighter (thinner line or reduced opacity)
- Routing labels on each branch point
- Reply → Summarize shared across all paths — show convergence

---

## 2. Tools & Database Objects

**Letting an LLM touch a real system safely**

**Core mechanisms:**
- **Deterministic entity refs** — `recipe_1`, `inv_3`, `gen_recipe_1`. LLMs never see UUIDs.
- **Strict CRUD boundary** — Agents operate in ref space. Database operates in UUID space. Translation happens at the boundary, not inside agents.
- **Approval-aware persistence** — Generated content lives in memory (`gen_*`). Nothing writes without explicit user promotion.

**Why it matters:** Prevents identity hallucination, phantom writes, and accidental overwrites.

### Diagram: Ref ↔ UUID Boundary

**Type:** Boundary diagram, horizontal

**Structure:** Two regions separated by a translation layer.

```
LLM Space                    Registry              DB Space
─────────────                ─────────             ──────────
"my pasta recipe"  →   recipe_1   ↔   uuid-abc-123   →  UPDATE recipes...
                       gen_recipe_1 ↔  __pending__
```

**Left region — "Ref Namespace":**
- Contains: agents, user messages, LLM decisions
- Labels use refs: `recipe_1`, `gen_recipe_1`

**Right region — "UUID Namespace":**
- Contains: database tables, CRUD operations
- Labels use UUIDs

**Middle — "SessionIdRegistry":**
- Bidirectional arrows (refs → UUIDs on writes, UUIDs → refs on reads)
- Annotation: "deterministic, persists across turns"

**Visual notes:**
- Visually distinguish left from right (different surface color or accent treatment)
- The registry is the membrane — prominent vertical element
- Keep to 4 nodes max in the flow. The point is the boundary, not the detail.

---

## 3. What "Context" Means

**Why memory is layered, not dumped**

**Three independent layers:**
- **Entity Context (deterministic)** — Refs, labels, lifecycle state. Generated vs saved vs retained. Updated by CRUD operations, not LLM decisions.
- **Conversation Context (compressed)** — Last 3 turns full, older turns summarized. Engagement summary tracks session direction.
- **Reasoning Context (auditable)** — What was planned, executed, and changed. Last 2 execution summaries preserved, older compressed.

**Who sees what:**
- Understand → Entity + Conversation
- Think → All three (full picture for planning)
- Act → Entity deep (actual data, not just refs)
- Reply → All three (with saved vs pending tags)
- Summarize → Writes back into all layers

### Diagram: Three Layers + Agent Consumption

**Type:** Layer stack with agent consumption, vertical layers + side column

**Structure:**

Left side — three stacked full-width bands:

| Layer | Label | Annotation |
|-------|-------|------------|
| 1 | Entity Context | "deterministic — CRUD-driven" |
| 2 | Conversation Context | "3 turns full → older compressed" |
| 3 | Reasoning Context | "2 summaries → older compressed" |

Right side — agent column with connection lines to layers:

| Agent | Connects to | Direction |
|-------|-------------|-----------|
| Understand | L1, L2 | reads ← |
| Think | L1, L2, L3 | reads ← |
| Act | L1 only | reads ← (thicker line — deep access) |
| Reply | L1, L2, L3 | reads ← |
| Summarize | L1, L2, L3 | writes → |

**Visual notes:**
- Asymmetry must be immediately visible — Think connects to all three, Act only to L1
- Summarize arrows point INTO layers (only agent that writes)
- Act's single connection should feel heavier/deeper than the others — it gets real entity data, not just refs

---

## 4. Nifty (but Necessary) Tools

**Features enabled by the architecture**

### @-Mentions
- Users reference exact entities (`@[Butter Chicken]`)
- Resolved before any agent runs
- AI never guesses which object you meant

### Modes
- **Quick** — single read, single tool call
- **Plan** — multi-step execution with checkpoints
- **Bypass modes** — domain-specific flows that skip the graph entirely

### Streaming
- Typed execution events (`plan`, `step`, `step_complete`, `done`)
- UI shows progress, not just answers
- Response returns before state persistence finishes

### Generated Content Lifecycle
- AI-generated content stored in memory (`gen_*`), not in DB
- User reviews → modifies → approves or discards
- On approval: `gen_` ref promoted to real UUID
- If LLM reads unpersisted content, CRUD layer returns in-memory data transparently

**Visual treatment:** Grid of small cards (icon + title + 2-3 lines), or compact list. Keep it scannable — these are proof points, not deep dives.

### Diagram (optional but recommended): Content Lifecycle

**Type:** State machine, compact

```
[Generate] → [In memory: gen_recipe_1] ←── "modify" (loop back)
                      ↓
               [User reviews]
                ├── approve → [Promoted to real UUID] → [Persisted]
                └── discard → [Removed]
```

**Visual notes:**
- State machine feel, not pipeline
- User decision point visually prominent (accent border)
- "Modify" loop visible as curved arrow
- In-memory state: dashed border. Persisted state: solid + accent.

---

## 5. Abstraction (the point)

**Cooking was the test case**

**Abstracted in core:**
- Orchestration graph
- Entity identity + lifecycle
- CRUD execution
- Context construction
- Prompt assembly

**Left to domains:**
- Entities + schemas
- Prompts + personas
- Optional middleware (semantic search, enrichment, etc.)

**The protocol:**
- DomainConfig: 66 methods (24 abstract, 42 with defaults)
- Four extension points: DomainConfig, DatabaseAdapter, CRUDMiddleware, SubdomainCompiler
- Import boundary enforced: core never imports domain
- Core dependencies: LangGraph, OpenAI, Instructor, Pydantic. No Supabase, no FastAPI.

**Hypothetical domains:**
- Fantasy sports — players, teams, transfers
- Personal finance — accounts, transactions, budgets
- Same refs. Same graph. Same approval model.

> You don't trust an abstraction until you build a second implementation.

### Diagram: Core ↔ Domain Boundary

**Type:** Boundary / split, two columns

**Left column — "Alfred Core":**
- Orchestration graph
- Entity identity + lifecycle
- CRUD execution
- Context construction
- Prompt assembly
- Mode system

**Right column — "Domain":**
- Kitchen (current): 10 entities, 7 subdomains
- FPL (next): same protocol, different data
- Show FPL as ghost/future state (lower opacity or dashed border)

**Middle — Protocol interface:**
- Four protocol names stacked: DomainConfig, DatabaseAdapter, CRUDMiddleware, SubdomainCompiler
- Annotation: "24 abstract / 42 default"

**Bottom — Import rule:**
- One-way arrow: Domain → Core (allowed)
- Crossed-out arrow: Core → Domain (forbidden)

**Visual notes:**
- Two distinct visual regions (different surface colors)
- Protocol membrane is the focal point — prominent vertical element
- FPL as ghost state signals this is designed for reuse, not just kitchen

---

## 6. Why This Exists

**What I wanted to understand**

No diagram. Short closing block.

- How to let LLMs act on real systems without lying
- How to manage identity, state, and memory explicitly
- How to move beyond "agent demos" into orchestration that works

This is the result.

---

## Build Priority

1. Text content (all sections)
2. Pipeline diagram (Section 1)
3. Three-layer context diagram (Section 3)
4. Ref ↔ UUID boundary diagram (Section 2)
5. Core ↔ Domain boundary diagram (Section 5)
6. Details section layout (Section 4)
7. Content lifecycle state machine (Section 4, optional)
