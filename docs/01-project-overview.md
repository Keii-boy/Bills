# Project overview and planned features

**Status: all features below are planned. Nothing is implemented yet.**

## Purpose

Bills will help an individual answer: What money came in, what went out, what remains in each account, and what bills are coming up?

The first planned release will use manual entry. This makes the data flow easier to understand and avoids requiring bank connections while you learn. Each person will see only their own records.

## Planned first release

| Planned feature | Planned behavior | Why start here? |
| --- | --- | --- |
| Registration, login, logout | Identify the current user and protect private pages | Financial records need an owner and access boundaries. |
| Accounts | Track cash or bank accounts with an opening balance | Separate accounts make balances understandable. |
| Categories | Create income and expense categories | Categories make spending summaries useful. |
| Transactions | Add, view, edit, and delete income or expense entries | This is the core learning loop for forms, validation, and database queries. |
| Dashboard | Show account balances and income/expense totals for a chosen month | Simple totals give useful feedback without advanced charts. |
| Monthly budgets | Set one spending limit per expense category per month and compare actual spending | This reuses transactions rather than introducing another ledger. |
| Bill reminders | Store an amount, due date, account, and expense category; show upcoming or overdue bills | A separate reminder prevents unpaid bills from being counted as actual spending. |
| Record bill payment | Create one expense transaction and link it to the bill | A single action reduces duplicate entry and makes payment status traceable. |

## Planned later possibilities

All of these remain planned and outside the proposed first release:

- Transfers between accounts: require two coordinated entries and protection against double-counting income or expenses.
- Recurring bill generation: requires rules for dates, missed occurrences, and duplicates.
- Charts and CSV export/import: useful after the underlying records and calculations are trustworthy.
- Email notifications: require scheduling, delivery configuration, and user preferences.
- Multiple currencies, bank syncing, shared households, and investment tracking: introduce substantial extra rules and should wait until the core application is understood.

## Proposed simplifying rules

- Use one currency per user, shared by all their accounts. Choose its code and decimal precision before implementation; do not assume every currency has two decimal places. Currency conversion is outside the planned first release.
- Store positive transaction amounts with an explicit `income` or `expense` type. The type determines whether the balance increases or decreases.
- Calculate an account's balance as opening balance + income − expenses. Do not maintain a second editable balance that can drift from the entries.
- Use calendar dates for transaction dates and due dates. They represent financial days, not moments in a server's timezone.
- Allow no category for a transaction. An uncategorized expense still reduces its account balance but does not count toward a category budget; show it separately in summaries.
- Prefer archiving accounts and categories once they have history. This keeps old transactions understandable.
- A bill has one planned payment in full. Partial payments, refunds, credit-card debt mechanics, and installment schedules are outside the proposed first release.
- A reminder alone never changes balances or budget usage. Only a recorded transaction does.

These limits keep the first design small enough to learn. They should be reviewed before writing migrations or screens.
