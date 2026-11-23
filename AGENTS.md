# Bills — Codex Project Instructions

## Project
Bills is a personal finance management web application.

## Technology Stack
- PHP 8.5
- Laravel 12
- PostgreSQL 18
- React 19 + TypeScript
- Inertia.js 2
- Tailwind CSS

## Development Rules
- Follow the existing Laravel project structure.
- Read the planning documents in docs/.
- Implement one feature at a time.
- Prefer simple, maintainable solutions.
- Follow Laravel conventions.
- Validate inputs on the server.
- Protect all user financial data.
- Write tests for new features.
- Never commit secrets or .env files.
- Never modify the old MoneyWise project.
- Do not commit or push without permission.
- Ask before destructive database operations.

## Learning Instructions
The developer is a beginner in PHP and Laravel.

For every change:
1. Explain what will be changed.
2. Explain why the change is needed.
3. Explain important PHP and Laravel concepts.
4. Make small, reviewable changes.
5. Run relevant tests when possible.
6. Explain any errors and how to fix them.

## Workflow
Plan → Explain → Implement → Test → Independent review → Fix → Verify → Explain → Human approval

- Start with `git status --short --branch` and record the review baseline. Preserve existing changes. Plan requirements, data flow, ownership, failure handling, and tests before significant implementation. The main agent owns the result and may delegate implementation to a worker with a clear file scope. Close any implementation worker before starting both reviewers.
- After nontrivial implementation, run applicable local checks, then automatically spawn `code_reviewer` and `security_reviewer` as separate Codex subagents. Give both the same baseline and scoped files. Ask each to read the actual diff, including relevant new files, and return evidence directly. Wait for both results, then close their threads to free slots for re-review. For an explicit workflow smoke test, run both roles on the requested read-only scope even when there is no new implementation.
- Confirm findings independently. Fix confirmed Critical, High, and Medium issues within scope, add focused regression tests, rerun affected and related checks, and send the updated diff back to both reviewers. Diagnose test failures in the same loop. Allow at most two automatic remediation rounds. Preserve work and report the blocker and attempted fixes if a required check or blocking finding remains unresolved.
- Keep review agents read-only by instruction. They inherit the parent sandbox and must never ask for more permissions. If delegation or a required check is unavailable, record what did not run. Never present the main agent's own review as independent or a local result as a hosted CI result.
- Use [the development workflow](docs/07-development-workflow.md) for quality gates, the security checklist, and reporting. Update relevant documentation and explain meaningful work primarily in Burmese, keeping English technical terms. Report implementation, review evidence, security, verification, CI, learning, and final status.
- Stop for approval before destructive data operations, risky migrations, material architecture changes, paid services, production changes, publishing sensitive information, committing, pushing, or merging.

Do not implement unrelated features.
