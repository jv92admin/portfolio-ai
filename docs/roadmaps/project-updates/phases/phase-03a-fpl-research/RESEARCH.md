# Phase 3a: FPL Content Research

**Date:** 2026-03-08
**Status:** Complete

---

## What It Is

A BI layer on top of Alfred where agents act as data analysts. Built to prove that the orchestration framework works beyond kitchen/CRUD — specifically for analytical workloads where you can't just dump data into LLM context.

## The Core Leap

Problem: 775 players × 38 gameweeks × dozens of stats = too much data for context windows. You can't just stuff it all in and ask questions.

Solution: Open-world tool calling. Agents write and execute Python (pandas, numpy) in a sandboxed environment. Follow-up agents generate matplotlib visualizations at runtime. The LLM reasons about *what* to compute; Python does the actual math.

## Six Domains

| Domain | What it does |
|--------|-------------|
| Squad | Browse your team, formation, captaincy, bench decisions |
| Scouting | Player exploration, comparison, stats, watchlist |
| Market | Transfer market, price tracking, ownership trends |
| League | Mini-league standings, rivalry tracking, differentials |
| Live | Real-time gameweek performance, bonus, auto-subs |
| Fixtures | Schedule, fixture difficulty ratings, blanks/doubles |

## Sandbox Execution

- Restricted builtins (no file I/O, no network, no imports beyond pandas/numpy)
- 30s timeout, 100K row cap
- LLM can retry on soft errors (3 attempts per step)
- Charts rendered headlessly via matplotlib Agg backend

## Data Pipeline

FPL API (unofficial, no auth) → Supabase (14 tables) → DataFrame cache → agents query via Python

## Stack

Python, alfredagain (orchestration), pandas/numpy (analysis), matplotlib (viz), Supabase (data), OpenAI (LLM)

## Status

117 tests passing. Not yet deployed — local development + notebooks. User focused on other projects currently.

## Card Decisions

- Keep "Coming Soon" badge
- No screenshots for now — copy-only update
- Removed jargon (FK bridges, DomainConfig protocol, etc.)
- Story angle: pushing Alfred from CRUD to analytics, then from analytics to viz
- Personal angle: 10+ years of FPL, worked alongside BI teams professionally
