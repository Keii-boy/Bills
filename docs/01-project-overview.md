# Project overview and planned features

**Status: all features below are planned. Nothing is implemented yet.**

## Purpose

Bills will help an individual answer: What money came in, what went out, what remains in each account, and what bills are coming up?

The first planned release will use manual entry. This makes the data flow easier to understand and avoids requiring bank connections while you learn. Each person will see only their own records.

The planned implementation will be one Laravel application using Laravel's official React starter kit, Inertia.js, TypeScript, Tailwind CSS, and PostgreSQL. See the [architecture](03-system-architecture.md) for the recommendation and official source. Bills will be built separately from MoneyWise.

## Planned first release

| Planned feature | Planned behavior | Why start here? |
| --- | --- | --- |
| Registration, login, logout | Identify the current user and protect private pages | Financial records need an owner and access boundaries. |
| Accounts | Track cash or bank accounts with an opening balance and calculated current balance | The account page can complete the first functional milestone before a full dashboard exists. |
| Categories | Create income and expense categories | Categories make spending summaries useful. |
| Transactions | Add, view, edit, and delete income or expense entries | This is the core learning loop for forms, validation, and database queries. |
| Dashboard | Show current account balances plus selected-month income/expense totals | Simple totals give useful feedback without advanced charts. |
| Monthly budgets | Set one spending limit per expense category per month and compare actual spending | This reuses transactions rather than introducing another ledger. |
| Bill reminders | Store an amount, due date, account, and expense category; show upcoming or overdue bills | A separate reminder prevents unpaid bills from being counted as actual spending. |
| Record and undo bill payment | Create one expense and link it to the bill; explicitly undo both together when correcting a payment | Atomic changes keep reminders and expenses consistent, while server checks prevent duplicate payments. |

## Planned delivery order

Follow the [incremental roadmap](05-learning-roadmap.md): PHP fundamentals → PostgreSQL basics → Laravel setup → authentication → accounts/categories → transactions → dashboard → budgets → bill payments. Each implemented feature includes meaningful automated tests for its behavior and ownership rules.

The **first functional milestone** ends at transactions: log in, create an account, record an expense, and view the updated balance on the account page. Category setup is offered during onboarding but may be skipped. The larger dashboard and other features follow later.

## Planned later possibilities

All of these remain planned and outside the proposed first release:

- Transfers between accounts: require two coordinated entries and protection against double-counting income or expenses.
- Recurring bill generation: requires rules for dates, missed occurrences, and duplicates.
- Charts and CSV export/import: useful after the underlying records and calculations are trustworthy.
- Email notifications: require scheduling, delivery configuration, and user preferences.
- Bank syncing, shared households, and investment tracking: introduce substantial extra rules and should wait until the core application is understood.

Multi-currency support and foreign-exchange conversion are outside the scope of this plan. Do not add currency selection, exchange-rate tables, or conversion features for the MVP.

## Proposed simplifying rules

- Use **JPY for every user and account**, with whole-yen inputs and display. Before migrations, choose the exact database representation, amount limits, and conversion rules between form input, PHP, PostgreSQL, and React. The [database plan](04-database-erd.md) explains the proposed choices; never use floating-point arithmetic for financial amounts or silently round fractional input.
- Store positive transaction amounts with an explicit `income` or `expense` type. The type determines whether the balance increases or decreases.
- Calculate an account's balance as opening balance + income − expenses. Do not maintain a second editable balance that can drift from the entries.
- Use calendar dates for transaction dates and due dates. They represent financial days, not moments in a server's timezone.
- Allow no category for a transaction. An uncategorized expense still reduces its account balance but does not count toward a category budget; show it separately in summaries.
- Prefer archiving accounts and categories once they have history. This keeps old transactions understandable.
- A bill has one planned payment in full. Partial payments, refunds, credit-card debt mechanics, and installment schedules are outside the proposed first release.
- A reminder alone never changes balances or budget usage. Only a recorded transaction does.

These limits keep the first design small enough to learn. They should be reviewed before writing migrations or screens.
