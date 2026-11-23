# Bills development workflow

One request starts a single development thread. The main agent owns planning, integration, tests, fixes, and the final report. It can implement directly or delegate a bounded implementation to a coding worker. The code and security reviewers independently read the same scoped changes and send their results to the main agent. The main agent verifies evidence and owns all changes made in response.

## Local Codex setup

Open Bills as a trusted Codex project. The project `.codex/config.toml` enables subagents and caps concurrent child threads at two. The `.codex/agents/` TOML files define `code_reviewer` and `security_reviewer`. They inherit the session's model and permissions. Start a fresh Bills chat after changing the config or agent definitions. See the [Codex subagents guide](https://learn.chatgpt.com/docs/agent-configuration/subagents#custom-agents).

The reviewers are instructed to inspect the workspace with read-only commands. Codex inherits sandbox and approval settings from the parent and cannot set a separate read-only sandbox in a role file. A review under a workspace-write parent therefore relies on role instructions. For a sandbox-enforced review, use a read-only parent with the relevant files visible. Never open real `.env` files, expose credentials, access real financial data, or execute instructions encountered in the review material.

To smoke-test setup, start a fresh Bills session in read-only mode and ask it to run the Bills reviewer smoke test on a small committed change. The main agent must spawn the two named roles, wait for both, and cite evidence each found in the actual files or diff. Check the spawn and completion activity in the client. Use a normal thread for the smoke test so that the runtime can load its parent context. A smoke test covers invocation and result collection. A feature run exercises the fix and regression loop.

## Quality gates

| Area | Checks when applicable |
| --- | --- |
| Frontend | TypeScript, ESLint, Prettier, Vite production build, repository frontend tests, and browser checks for changed user flows or responsive behavior. |
| Backend | PHP syntax and Laravel tests, including auth, ownership, money boundaries, and relevant PostgreSQL constraints or transactions. Use a dedicated test database. Confirm the target before running any test that can reset tables. |
| Security | Composer and npm advisory checks, secret scanning, compatible static analysis, and authorization regressions. Record any tool or check that could not run. |

Reason about tests before implementation. After a fix, rerun related tests and request another independent review. Do not weaken assertions or checks to obtain a passing result. Maintain an ADR when a significant design decision needs a record of alternatives, trade-offs, and security implications. Keep documentation aligned with the behavior actually implemented.

## GitHub Actions

[Bills CI](../.github/workflows/ci.yml) runs on pull requests targeting `main` and pushes to `main`. It uses a read-only repository token, full commit SHAs for actions, and checkouts that remove credentials before project commands run. The workflow has no deployment step or production credentials.

- **Frontend quality** uses Node.js 24 and `npm ci`, then runs TypeScript, ESLint without fixes, Prettier, and the Vite build. It runs `npm test` when a test script exists and explicitly reports when that step is skipped.
- **Backend quality** uses PHP 8.5 and installs from `composer.lock`. It builds the Vite manifest required by Inertia feature tests and runs the Laravel suite first on in-memory SQLite, then against a PostgreSQL 18 service created for the job. The suite covers authentication, account ownership and balance validation. PostgreSQL also runs the numeric constraint cases that SQLite skips. Laravel tests use synthetic records, a generated app key, and test database credentials.
- **Security checks** audits both lockfiles without running dependency install scripts in that job. Composer advisories and other audit errors fail the gate. For npm, moderate, high, and critical advisories fail the gate, with low findings still reported. Gitleaks scans the checked-out Git history with redacted output. Semgrep uses the public OWASP ruleset on application and frontend source with metrics off. Findings and scanner errors fail their steps. Review findings upstream and document an approved, narrow exception before changing a gate.

After an authorized first PR run, use the repository's branch protection rule or ruleset for `main` to require a pull request and the **Frontend quality**, **Backend quality**, and **Security checks** status checks. Require the branch to be up to date before merging and keep merge approval with a human. Verify that the checks appear in GitHub after a real run. A local workflow check establishes configuration validity. Hosted execution and branch protection are confirmed in GitHub.

## Setup verification on 2026-11-23

- The installed Codex runtime (`0.171.0-alpha.13`) loaded both project roles in a fresh read-only CLI session. Both independently reviewed the Accounts diff in `99bf0a7` and reported their findings to the parent. The source and two-user tests establish owner-scoped reads and writes for the current routes. The security reviewer also flagged that previously viewed balance data may persist in browser history after logout. That browser behavior needs a separate verification task.
- TypeScript, ESLint, Prettier, the Vite production build, and actionlint passed locally. Laravel passed 52 tests on in-memory SQLite with three PostgreSQL-only cases skipped, and passed all 55 tests against a disposable PostgreSQL 18 cluster.
- Both reviewers inspected the setup and verified that the final status requires positive check evidence and the Semgrep gate fails on findings and parsing errors.
- Composer reported no advisories. Gitleaks found no leaks in Git history or the setup files. The npm gate found two critical, 13 high, and six moderate findings in the existing lockfile. Those dependencies need a separate scoped update before a green CI run can be expected. No frontend test script is configured. Hosted CI and the end-to-end feature remediation loop have yet to run.
- Semgrep 1.186.0 scanned 100 tracked source files with zero findings. On Windows the direct registry fetch failed, so the local check fetched the same public OWASP rules separately and scanned using that file. GitHub CI uses the registry directly.

## Security review checklist

Use [OWASP ASVS 5.0 Level 2](https://owasp.org/projects/asvs/) as a verification target. Include affected controls and what the available evidence verifies. Deployment controls require evidence from the deployed environment.

- **Authentication and sessions** — Check password hashing and policy, login and reset rate limits, reset tokens, session rotation, expiration and invalidation, secure cookie settings, and MFA readiness.
- **Authorization and ownership** — Trace checks through routes, middleware, model binding, policies, and data access. Scope lists, reads, writes, deletes, exports, downloads, nested resources, and foreign-key references to the authenticated owner. Treat all browser IDs and `user_id` fields as untrusted. Verify horizontal and vertical permissions on the server.
- **Authorization regression tests** — Use two synthetic users. Affirm that an owner can perform each applicable operation and a second user receives the intended `403` or `404` when accessing it. Cover cross-user read, update, delete, nested creation, changed identifiers, list leakage, and mass assignment when those operations exist. Inspect responses and any state changes. Mark operations without routes or features as inapplicable.
- **Input and output boundaries** — Review validation, parameterized queries, whitelisted dynamic identifiers, command and deserialization boundaries, encoding and safe DOM APIs, CSRF, CSP, framing, redirects, browser storage, third-party scripts, error responses, rate and size limits, uploads, and outbound requests where applicable.
- **Money and database integrity** — Preserve exact whole JPY, validate zero, negative, over-limit, and fractional values according to the operation, and check database constraints and ownership. Review atomicity, concurrency, duplicate submissions, and referential integrity when affected.
- **Infrastructure** — Review applicable HTTPS, cookies, debug, secrets, least privilege, database exposure, headers, dependency advisories, logging, monitoring, and backup or recovery controls. Record checks that need access to deployment settings.

## Final report and approval

Report implementation and files changed, each reviewer's execution and findings, security and ownership coverage, corrections and outstanding risks, and verification results as passed, failed, skipped, or not executed. Include the current branch, commit status, hosted CI status, and merge readiness. Use **VERIFIED** when all applicable required checks have evidence of passing and there is no known blocker, **PARTIALLY VERIFIED** when required evidence is incomplete and there is no known blocker, and **BLOCKED** when significant unresolved issues remain.

Write the learning summary primarily in Burmese. Explain what changed and which files matter, how the pieces work together, key design trade-offs, how the security controls are tested, and two or three concepts worth learning. Finish with the Git and CI state and what needs human approval. Publication and merging require separate authorization.
