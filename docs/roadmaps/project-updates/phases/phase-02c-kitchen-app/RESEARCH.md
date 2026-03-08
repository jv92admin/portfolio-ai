# Phase 2c: Kitchen App (Alfred — Pantry) Research

**Date:** 2026-03-08
**Status:** Complete

---

## What It Is

A production kitchen assistant built on Alfred's orchestration framework. Not a demo — used daily for meal planning, recipe management, and live cooking assistance. Deployed at alfredagain-production.up.railway.app.

**Stack:** FastAPI + Vite React frontend, Supabase (Postgres + Auth), OpenAI (GPT-4.1-mini for parsing, text-embedding-3-small for semantic search), Railway deployment.

---

## Three Modes

| Mode | Purpose | Context | Tools |
|------|---------|---------|-------|
| Plan | Full orchestration: meal planning, recipe CRUD, inventory, shopping lists | Full graph (Understand → Think → Act → Reply → Summarize) | All CRUD tools + ingredient lookup |
| Cook | Live cooking session — timing, temps, substitutions | Frozen recipe + user profile, 20-message cap | No tools (single LLM call) |
| Brainstorm | Creative ideation — riff on new meal ideas | Dashboard + profile + inventory + mentioned recipes, 40-message cap | No tools (single LLM call) |

Mode isolation is key: Cook/Brainstorm freeze data at entry, no mutations. On exit, each generates a narrative handoff summary that carries context back to Plan mode.

## Recipe Importer

Multi-stage extraction: URL → recipe-scrapers library (400+ sites) → fallback to JSON-LD → LLM ingredient parsing (GPT-4.1-mini) → ingredient linking against master DB. User previews parsed result, can edit, then confirms to save.

## @ Tagging

Autocomplete endpoint returns entities grouped by type (Recipes, Inventory, Shopping List, Tasks). Solves context bloat: user mentions @RecipeName, full recipe details auto-injected without cluttering main conversation.

## Ingredient Database

2,500+ master ingredients with aliases and categories. 4-tier matching: exact → fuzzy (trigram, 0.85+ for writes) → word-by-word → semantic (embeddings). Handles typos, brand names, regional variations.

## Onboarding

Multi-step interview: dietary restrictions/allergies → favorite cuisines → pantry staples → skill level, equipment, planning rhythm, current vibes. Feeds into UserProfile that's pre-computed and cached.

## Meal Planning Flow

Pantry inventory → Brainstorm ideas → Plan creates meal_plans + recipes → Auto-spawn tasks (thaw, prep, buy) → Cook mode for live session → Log completion with rating → Flavor preferences auto-updated.

## Origin Story

Started as "Pantry" inside a personal assistant with stubs for Coach (fitness) and Cellar (wine). Building Pantry revealed the framework was more abstract than a personal assistant — that abstraction became Alfred.
