---
name: pm
description: Project management lifecycle — roadmap definition and phase execution. Use when starting significant work, defining a new roadmap, or beginning a phase.
---

# PM Workflow

This skill enforces the project management lifecycle for all significant work. Every major feature or initiative follows two stages.

## Stage 1: Roadmap Definition

Before building anything significant, create a roadmap.

### 1.0 Discovery (always do this first)

Before any pre-work or planning, understand what the user actually wants. Ask clarifying questions using the AskUserQuestion tool. Adapt your questions based on what's already clear vs ambiguous.

**Always clarify:**
- What problem are we solving?
- What does "done" look like?
- Are there constraints? (timeline, tech choices, design system compliance, etc.)

**Ask when relevant:**
- Are there existing patterns in the codebase we should follow?
- Does this overlap with any existing roadmap phases? (check `docs/roadmaps/` first)
- What's the priority relative to active work? (check `docs/HANDOFF_SUMMARY.md`)

**Stop asking when:**
- You have enough context to define the goal, scope, and rough phase breakdown
- The user has already provided detailed requirements
- The initiative is straightforward and well-scoped

Output: A shared understanding of scope. No document — just alignment before proceeding.

### 1.1 Pre-work (audits, research)

Investigate the problem space. Output goes to `docs/audits/`:
- Code audits, performance reviews
- Competitive analysis, domain research
- Codebase exploration and gap analysis

### 1.2 Define the Roadmap

Create `docs/roadmaps/{milestone}/ROADMAP.md` using the template at `docs/roadmaps/_templates/ROADMAP_TEMPLATE.md`.

**Every roadmap must include:**

| Section | Required | Description |
|---------|----------|-------------|
| Goal | Yes | 1-2 sentences: what does "done" look like? |
| Phase Summary table | Yes | All planned phases with status |
| Exit Criteria per phase | Yes | Testable assertions (not vague "it works") |
| Dependencies | Yes | What blocks what |
| Key Decisions | Yes | Accumulated as work progresses |

### 1.3 Create Phase Folders

Create empty phase folders with `.gitkeep`:
```
docs/roadmaps/{milestone}/phases/phase-00-{name}/
docs/roadmaps/{milestone}/phases/phase-01-{name}/
```

---

## Stage 2: Phase Execution

Repeat for each phase in the roadmap.

### 2.0 Orient (always do this first)

Before starting any phase work, read `docs/HANDOFF_SUMMARY.md` and all active roadmaps in `docs/roadmaps/` to build a picture of:
- Which phases are complete, in progress, or not started
- The first incomplete + unblocked phase (and its exit criteria)

Also read `docs/BACKLOG.md` to see if there are any parked ideas. Do **not** act on backlog items unless the user explicitly asks.

Then ask the user using AskUserQuestion:

**Option A: "Continue the roadmap (recommended)"**
Present the next unblocked phase with a one-line summary. Proceed to Step 2.1.

**Option B: "I have something else in mind"**
Run the **Impact Analysis** workflow below before doing anything.

**Option C: "Promote something from the backlog"**
Only show if `docs/BACKLOG.md` has entries. When picked, run Impact Analysis to determine where it fits.

**Option D: "Just log an idea for later"**
Ask: What's the idea? Why does it matter? Any context?
Add to `docs/BACKLOG.md` under Ideas table. Loop back to Orient.

#### Impact Analysis (Option B only)

1. **Understand the request** — clarifying questions
2. **Research** — explore codebase for blast radius
3. **Cross-reference** — check existing roadmaps for overlap/conflict
4. **Present impact report** — files affected, overlap, dependencies, recommendation
5. **Route** — existing phase / new phase / quick fix

### 2.05 Load Design Context (always do this before plan/execute)

Before starting any phase work that touches visual code:
- Read `.claude/docs/design-system.md`
- Check `.claude/rules/` for applicable rules
- Review design references in CLAUDE.md

### 2.1 Research (optional)

If the phase needs investigation:
- Write findings to `docs/roadmaps/{milestone}/phases/{phase}/RESEARCH.md`
- Use template: `docs/roadmaps/_templates/RESEARCH_TEMPLATE.md`

### 2.2 Plan

Enter Claude Code **plan mode** to design the implementation:
- Plan mode output becomes `PLAN.md` in the phase folder
- Use template: `docs/roadmaps/_templates/PLAN_TEMPLATE.md`
- Plan must include: tasks, exit criteria, files modified

### 2.3 Execute

Implement the plan:
- Write code, test, commit changes
- Follow CLAUDE.md rules (design tokens, responsive, next/image, etc.)

### 2.4 Summarize

After execution, write `docs/roadmaps/{milestone}/phases/{phase}/SUMMARY.md`:
- Use template: `docs/roadmaps/_templates/SUMMARY_TEMPLATE.md`
- Must include: commits, architectural decisions, open items
- Must include: "Impact on Other Docs" section

### 2.5 Doc Review

Propagate results:
- Update the milestone's `ROADMAP.md` (mark phase complete)
- Update `docs/HANDOFF_SUMMARY.md` (current state)
- Flag specs or domain docs that need updating

---

## Quick Reference

```
Stage 1: Define Roadmap
  Discovery -> Pre-work (audits/) -> ROADMAP.md (goals, phases, dependencies)

Stage 2: Execute Phases (repeat)
  Orient (roadmap or something else?) ->
    A) Continue roadmap -> pick next phase
    B) Something else -> Impact Analysis -> route
    C) Promote from backlog -> Impact Analysis -> new phase
    D) Log an idea -> BACKLOG.md -> loop back
  -> Load Design Context (2.05) -> RESEARCH.md (optional) -> PLAN.md (plan mode) -> Execute -> SUMMARY.md -> Doc Review
```

### Templates
All at `docs/roadmaps/_templates/`:
- `ROADMAP_TEMPLATE.md`
- `RESEARCH_TEMPLATE.md`
- `PLAN_TEMPLATE.md`
- `SUMMARY_TEMPLATE.md`

### Key Paths
- Roadmaps: `docs/roadmaps/{milestone}/`
- Backlog: `docs/BACKLOG.md`
- Audits: `docs/audits/`
- Specs: `docs/specs/`
- Domains: `docs/domains/`
- Handoff: `docs/HANDOFF_SUMMARY.md`
