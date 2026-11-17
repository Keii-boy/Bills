# Step-by-step learning roadmap

**Status: every build exercise and feature below is planned. These are future learning steps, not work performed by this documentation task.**

Work through one step at a time. Move on when you can explain the result in your own words; there is no fixed schedule.

| Step | Learn | Planned exercise | Ready to continue when… | Why this order? |
| --- | --- | --- | --- | --- |
| 1 | Project scope, Git status, diffs, and ignored files | Read these documents and identify the smallest useful feature set | You can distinguish a proposed feature from existing software and recognize secrets that must stay out of Git | Clear boundaries prevent accidental changes and scope growth. |
| 2 | PHP variables, arrays, functions, conditionals, loops, and exceptions | Practice calculating totals from sample income and expense records | You can explain how each value changes a total | Framework code relies on ordinary PHP fundamentals. |
| 3 | PHP classes, namespaces, type declarations, and Composer's purpose | Sketch an account and transaction as concepts; learn what dependencies and autoloading do | You can explain a class, an object, and a method | These concepts make Laravel models and controllers less mysterious. |
| 4 | HTTP, requests, responses, forms, cookies, and sessions | Trace a form submission on paper | You can distinguish browser state from server state | Laravel and React cooperate across this boundary. |
| 5 | PostgreSQL tables, keys, SQL, joins, constraints, and transactions | Use fake records to reason through the ERD and write sample queries as a learning exercise | You can explain ownership, a foreign key, and rollback | Database rules should be understood before an ORM hides SQL details. |
| 6 | Environment configuration and application setup | When ready for implementation, select compatible versions and set up Laravel, PostgreSQL, React/Inertia, TypeScript, and Tailwind in Bills | A starter page and a development database connection work, and secrets stay untracked | This is a future setup phase; no installation is part of the current task. |
| 7 | Laravel routes, middleware, controllers, migrations, and Eloquent | Trace one request and one database query end to end | You can name the file responsible for each stage | A small complete path is easier to understand than many disconnected features. |
| 8 | Authentication, authorization, and validation | Plan and later build registration/login plus private account/category management | Two test users cannot read or change each other's records | Ownership must work before adding financial history. |
| 9 | React components, props, state, TypeScript types, Inertia forms, and Tailwind | Build an accessible account form with labels, error messages, and a submission state | Invalid input shows helpful errors and server rules still hold if the UI is bypassed | Learn UI fundamentals around one narrow workflow. |
| 10 | CRUD: create, read, update, delete | Add income/expense entry, transaction history, and safe editing/deletion using fake data | Correct changes affect only the owner's records and balances update accurately | Transactions are the source for later summaries. |
| 11 | Aggregation and date ranges | Add dashboard totals and category budgets | You can verify results by hand, including the first and last day of a month | Summary features depend on trustworthy transaction data. |
| 12 | Database transactions, locks, and duplicate prevention | Add bill reminders and record-payment/undo-payment workflows | Failure leaves no partial payment; repeated or concurrent payment does not create duplicate expenses | Multi-record actions introduce consistency problems beyond simple CRUD. |
| 13 | Automated tests and deliberate manual checks | Add meaningful Laravel feature tests as the features above are built | Tests catch cross-user access, invalid money/date input, wrong totals, and payment duplication | Learn tests incrementally, not only after building everything. |
| 14 | Deployment basics, HTTPS, logs, backups, and restore | Prepare a deployment plan and rehearse restoring a fake-data backup | You can recover data and explain how production secrets are supplied | Running a personal finance app includes maintaining its data. |

## Planned first learning milestone

Aim for one complete path: log in → create an account → record an expense → see the updated balance. Budgets, bill reminders, exports, and charts can wait until this path is understandable and correct.

## Planned checks using fake data

- Opening balance 1,000.00 + income 200.00 − expense 50.00 must produce 1,150.00. This example assumes a currency with two fractional digits.
- A category budget of 300.00 with 50.00 of matching expenses must show 250.00 remaining.
- An unpaid bill of 80.00 must not change the balance; recording it as paid must subtract 80.00 once.
- Another user's account ID must be rejected for viewing, editing, transaction creation, and bill payment. Include list and summary endpoints too.
- A payment failure must roll back both the expense and bill link. Repeated and simultaneous submissions must leave one payment expense.
- Month boundaries, uncategorized expenses, archived records, and edits/deletions must produce predictable results.

These checks validate behavior, not just whether a page loads. Use fake financial data while learning. The roadmap does not authorize dependency installation, application generation, deployment, or Git publishing during this documentation task.
