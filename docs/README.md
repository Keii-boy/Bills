# Bills planning documentation

**Status: planning only. Every feature, screen, table, and folder described here is proposed, not implemented.**

Bills is a personal finance application you will build while learning PHP and Laravel. These documents describe a starting design, not a claim about working software.

Bills is a new project, separate from the old MoneyWise project. The planned stack is PHP, Laravel, PostgreSQL, React, TypeScript, Inertia.js, and Tailwind CSS in **one Laravel application**, starting from Laravel's official React starter kit when implementation begins. The initial MVP (minimum viable product) will use **JPY only**. See the architecture and database documents for the starter-kit source and the monetary decisions required before migrations.

## Start here

1. [Project overview and planned features](01-project-overview.md)
2. [Planned user flow](02-user-flow.md)
3. [Planned system architecture](03-system-architecture.md)
4. [Planned PostgreSQL database](04-database-erd.md)
5. [Step-by-step learning roadmap](05-learning-roadmap.md)
6. [Recommended future folder structure](06-folder-structure.md)

For current development and verification, see the [Bills development workflow](07-development-workflow.md).

Read them in this order: understand the problem, follow a user's journey, see how the pieces connect, then study the data and learning steps.

## Original inspection snapshot (before documentation was added)

On November 17, 2026, the Bills workspace contained:

```text
Bills/
├── .git/
├── .qodo/
│   ├── agents/       (empty)
│   └── workflows/    (empty)
├── .gitignore
└── README.md
```

The existing README names PHP + Laravel, PostgreSQL, React + TypeScript, and Tailwind CSS, and marks the project as Planning. No application source, dependency manifests, migrations, or tests were found. The Git working tree was clean before documentation was added. No applicable AGENTS.md instructions were found in the workspace or its checked parent directories.

The original task created only these planning documents. This refinement changes only existing files in `docs/`. The root README and .gitignore are preserved. No dependencies are installed, application code generated, old MoneyWise project accessed or modified, or commits/pushes performed as part of either documentation task.

## Planned first functional milestone

**Log in → create an account → record an expense → view the updated account balance.** First-time category setup is offered but can be skipped, because transactions may be uncategorized. Showing the balance on the account page completes this milestone; the full dashboard comes later. Automated tests accompany each feature as it is implemented, rather than waiting for a separate testing phase.

## How to read the diagrams

The fenced `mermaid` blocks are text descriptions of diagrams. A Markdown viewer with Mermaid support can render them; the source remains readable without a renderer. Arrows show direction, and ERD crow's-foot symbols show how many records can be related. You do not need to install anything to read these documents.

All design decisions are provisional. Choose framework and dependency versions when implementation begins; these documents intentionally do not prescribe installation commands or versions.
