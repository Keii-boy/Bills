# Step-by-step learning roadmap

**Status: every build exercise and feature below is planned. These are future learning steps, not work performed by this documentation task.**

Work through one milestone at a time. Move on when you can explain the result and its tests in your own words; there is no fixed schedule. Use fake financial data throughout learning. Bills remains separate from MoneyWise.

## Planned incremental milestones

### 1. PHP fundamentals

Learn variables, arrays, functions, conditionals, loops, exceptions, classes, namespaces, and type declarations. Learn what Composer and autoloading do, plus basic Git status/diffs and secret-file handling. Trace HTTP requests, forms, cookies, and sessions so the browser/server boundary makes sense.

Planned practice: calculate a balance from sample whole-yen values and explain each step. When writing the exercise, add small automated assertions for income, expenses, zero values, and exact totals. These foundations make Laravel's classes and request handling easier to follow.

### 2. PostgreSQL basics and the money decision

Learn tables, primary/foreign keys, SQL queries, joins, constraints, exact number types, and database transactions. Practice with fake records based on the [ERD](04-database-erd.md).

Before application migrations, finalize the [JPY representation and conversion contract](04-database-erd.md#planned-jpy-representation-decision-before-migrations): storage type, allowed range, whole-yen validation, exact PHP calculations, string transport, and display formatting. Multi-currency support is out of scope.

Planned practice checks: verify sums by hand and with SQL, try invalid references, and roll back a multi-record change. Formal database constraint tests will accompany the relevant Laravel features once a test harness exists. Learn database rules before Eloquent makes SQL less visible.

### 3. Laravel setup with the official React starter kit

When implementation is authorized, check compatible stable versions and use **Laravel's official React starter kit** for one Laravel/Inertia.js/React/TypeScript/Tailwind application backed by PostgreSQL. See the official source in the [architecture plan](03-system-architecture.md). No framework version or installation command is prescribed here.

Learn routes, middleware, controllers, Form Requests, migrations, and Eloquent. Learn JavaScript/TypeScript basics, React components/props/state, and Inertia.js forms through the supplied starter pages. Retain the kit's conventions and authentication foundation; add domain folders only as needed.

Planned automated checks: establish the kit's existing test baseline, verify a starter-page response, and configure a dedicated PostgreSQL test database separate from development data. Choose one supported PHP test runner and use it consistently. Keep credentials untracked. This creates a small working foundation before adding finance features.

### 4. Authentication

Use and understand the starter kit's registration, login, logout, password hashing, and session/CSRF protections. Protect Bills' private routes. Do not build custom authentication storage.

Planned automated tests: registration and login success/failure, logout, and guest denial or redirection on private routes. Retain relevant starter-kit tests and add checks for Bills' routes. Authentication comes before storing private financial records; ownership checks continue in every later feature.

### 5. Accounts and categories

Add owner-scoped account creation and an account page showing its opening/current balance. Offer first-time income/expense category creation with a clear skip option; explain that uncategorized transactions remain possible. Introduce Form Requests, policies, and accessible React forms with labels, field errors, and pending states. Add archive behavior as records acquire references.

Planned automated tests: first-time setup, category setup/skip, whole-yen opening balances, type validation, archived-choice restrictions, and blocked cross-user reads/writes. Test protected deletion of referenced accounts/categories when those references exist. Ownership checks must also reject another user's IDs submitted directly to Laravel.

This milestone gives transactions a valid account and optional category without requiring a dashboard.

### 6. Transactions — complete the first functional milestone

Implement expense entry first and show the recalculated balance on the account page. Then extend to income, history/filtering, editing, and a separate confirmed-delete action. Use positive whole-yen amounts, explicit income/expense types, and optional matching categories. Reject future transaction dates; reminders will cover future commitments.

Planned automated tests: the complete first functional path, exact balance changes, invalid/fractional/out-of-range amounts, money round trips, future-date rejection, optional categories, category/type matching, and denied cross-user access and references. Cover edit/delete recalculation, canceled versus confirmed deletion in the UI, and no mutation on failed validation. Use a focused browser test for confirmation behavior when that UI is implemented, alongside server feature tests.

This is the **first functional milestone: log in → create an account → record an expense → view the updated balance**. For example, opening balance ¥10,000 minus expense ¥1,200 must show ¥8,800. Category creation may be skipped. The full dashboard is still planned for the next milestone.

### 7. Dashboard

Add cross-account balances and selected-month income/expense totals. Learn SQL aggregation, Eloquent queries, date ranges, and sending minimal page data through Inertia.js. Monthly totals use transaction dates; account balances use all recorded history. Plan `Asia/Tokyo` as the MVP's timezone for today.

Planned automated tests: empty state, multiple owned accounts, exact totals, inclusive month start/exclusive next month start, and exclusion of another user's records from every summary. For example, ¥10,000 opening + ¥2,000 income − ¥1,200 expense must show ¥10,800, while monthly income excludes the opening balance. Build summaries only after their source transactions are reliable.

### 8. Budgets

Add one budget per owner, expense category, and month. Compare its limit with recorded matching expenses; bill reminders alone do not count. Direct users to expense-category setup if needed.

Planned automated tests: budget uniqueness, first-of-month dates, nonnegative whole-yen limits, type/ownership restrictions, month boundaries, and overspending. A ¥30,000 budget with ¥12,000 of matching expenses must show ¥18,000 remaining. Uncategorized expenses affect balances but not a category budget. This reuses established transaction and summary behavior.

### 9. Bill reminders and payments

Add reminders, derived paid/upcoming/overdue states, and expense-category setup prompts. Implement full payment and confirmed undo-payment together with the ERD's integrity rules. Show progress and disable repeat UI submission; prevent duplicate payments on the server with a database transaction, owned bill row lock, and payment-link recheck. Reload authoritative state after a timeout before retrying.

Planned automated tests: an unpaid ¥8,000 reminder changes no balance; recording payment subtracts ¥8,000 exactly once and updates matching budget usage. Test ownership, payment facts, protected financial edits/deletions, atomic rollback, repeated requests, and genuinely concurrent requests leaving exactly one linked expense. Test confirmed undo restoring the balance and clearing both records atomically, plus safe repeated undo. Exercise row locks and constraints against the dedicated PostgreSQL test database, not an in-memory substitute.

This milestone follows simpler CRUD because it must keep multiple records consistent under failures and concurrent requests.

## Planned testing habit for every feature

Automated tests belong in the same milestone as the implemented behavior. A Laravel feature test exercises a request and its database effects; a unit test checks an isolated calculation when useful. Use fake users and records, including a second user to prove isolation. Manual checks support these tests but do not replace them. Keep application tests aligned with database constraints, not just page-loading success.

No tests or application code are created during this documentation task. Before any future deployment, separately learn HTTPS, production configuration, logging, backups, and restore, and rehearse recovery with fake data. That preparation does not add deployment work to the MVP milestones or authorize installing dependencies, generating code, or publishing to GitHub now.
