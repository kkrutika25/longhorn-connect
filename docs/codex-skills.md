# Codex Skills

This repo uses Codex skills to make repeated maintenance tasks reusable instead of re-explaining the same workflow every time.

## Skill Used Here

### `$refresh-ask-ai-from-faq`

Purpose:

- refresh the Ask AI experience from an FAQ document
- extract FAQ text from a `.docx`
- choose five strong prompt-chip questions
- update the Ask AI page and FAQ-backed answer source
- verify the app still builds

Skill location:

- `/Users/krutikakurup/.codex/skills/refresh-ask-ai-from-faq/SKILL.md`

Main project files it updates:

- `app/ask/ask-experience.tsx`
- `app/ask/page.tsx`
- `lib/data/mock.ts`

Example usage:

```text
Use $refresh-ask-ai-from-faq to update the Ask AI page from /Users/krutikakurup/Downloads/MSITM FAQ.docx
```

## Why keep this in the repo?

- Documents how the Ask AI FAQ refresh process works
- Makes the maintenance workflow discoverable for collaborators
- Gives future contributors a clear prompt to reuse with Codex
