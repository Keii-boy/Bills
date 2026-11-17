# Planned user flow

**Status: every screen and action in these diagrams is planned.**

## Planned login and first-time setup

The first functional milestone is **log in → create an account → record an expense → view the updated account balance**. The account page will show that balance before the full dashboard milestone. Category setup is offered but optional for transactions.

```mermaid
flowchart TD
    Start[Open Bills] --> Session{Logged in?}
    Session -->|No| Auth[Register or log in]
    Auth --> AuthOK{Authentication succeeds?}
    AuthOK -->|No| AuthError[Show helpful errors]
    AuthError --> Auth
    AuthOK -->|Yes| HasAccount{Any active owned accounts?}
    Session -->|Yes| HasAccount
    HasAccount -->|No| CreateAccount[Create first account with JPY opening balance]
    CreateAccount --> AccountOK{Valid account input?}
    AccountOK -->|No| AccountError[Show field errors and retain input]
    AccountError --> CreateAccount
    AccountOK -->|Yes| CategoryChoice{Set up categories now?}
    CategoryChoice -->|Yes| Categories[Create income or expense categories]
    Categories --> CategoryOK{Valid category input?}
    CategoryOK -->|No| Categories
    CategoryOK -->|Yes| AccountPage[Account overview and balance]
    CategoryChoice -->|Skip for now| AccountPage
    HasAccount -->|Yes| AccountPage
    AccountPage --> Manage[Manage owned accounts and categories later]
    Manage --> AccountPage
    AccountPage --> Entry[Record income or expense]
    Entry --> Transactions[Transaction workflow below]
    Transactions --> AccountPage
    AccountPage --> Dashboard[Later milestone: dashboard and monthly totals]
    Dashboard --> Budget[Later milestone: monthly expense-category budgets]
    Budget --> Dashboard
    Dashboard --> Bills[Later milestone: bill reminders and payments]
    Bills --> Dashboard
    AccountPage --> Logout[Log out]
    Logout --> Auth
```

## Planned transaction creation, editing, and deletion

```mermaid
flowchart TD
    Account[Account overview] --> New[New transaction form]
    Account --> History[Browse owned transactions]
    History --> Edit[Edit transaction form]
    New --> Validate{Authorized and valid whole-yen input?}
    Edit --> Validate
    Validate -->|No| Errors[Show field errors or deny access; save nothing]
    Errors --> Return[Return to the appropriate form if allowed]
    Validate -->|Yes| Save[Create or update the owned transaction]
    Save --> Updated[Show updated account balance and history]
    History --> Delete[Request transaction deletion]
    Delete --> Confirm{Confirm deletion and its balance effect?}
    Confirm -->|Cancel| History
    Confirm -->|Confirm| Check{Owned record and no linked bill payment?}
    Check -->|No| Refuse[Deny deletion; linked payments require undo-payment workflow]
    Refuse --> History
    Check -->|Yes| Remove[Delete transaction]
    Remove --> Updated
```

An edit of a linked bill payment's financial fields is also blocked until payment is undone. Neither the browser's confirmation nor a hidden button replaces server authorization. All transaction lists and summaries must be owner-scoped too.

## Planned bill payment and repeat-submission handling

```mermaid
flowchart TD
    List[View owned bill reminders] --> Unpaid{Bill unpaid?}
    Unpaid -->|No| Paid[Show existing payment; payment button unavailable]
    Unpaid -->|Yes| Submit[Submit payment date; disable button while pending]
    Submit --> Validate{Authorized and valid input?}
    Validate -->|No| Errors[Show errors or deny access; create nothing]
    Validate -->|Yes| Lock[Begin database transaction; lock and re-read owned bill]
    Lock --> Linked{Payment already linked?}
    Linked -->|Yes| Existing[End transaction; return existing payment with no new expense]
    Linked -->|No| Recheck[Recheck amount, account, category, and ownership]
    Recheck --> Atomic[Create expense and link bill in the same transaction]
    Atomic --> Result{Commit succeeds?}
    Result -->|Yes| Done[Show paid bill and updated balance]
    Result -->|No| Rollback[Roll back both changes; reload current bill state]
    Existing --> List
    Done --> List
    Rollback --> List
    Errors --> List
```

If rechecking fails after the lock, roll back and show an error without creating an expense. While pending, the UI should show progress; after any response it should refresh the authoritative bill state. A network timeout does not prove payment failed: reload first, and let any retry go through the same server check. This handles double-clicks, retries, and requests from multiple browser tabs without relying on the disabled button.

Undo payment is a separate planned action with explicit confirmation. It must authorize, lock and re-read the bill, clear its payment link, and delete the linked expense in one database transaction. A repeat undo must not remove any unrelated transaction. A paid reminder cannot be deleted until payment has been undone; an unpaid reminder can be deleted after confirmation without changing balances.

## Why this flow?

- Authentication comes before private data. A successful login identifies whose accounts, categories, and transactions may be used.
- A new user is directed to account creation before transaction entry because each transaction needs a place where money moved. Explain the opening balance and offer categories next, with a clear skip option. Do not silently create example financial records.
- If the user has no categories, the transaction form should offer category creation or an uncategorized entry. Budgets and bill reminders require an expense category and should point to setup when none exists. Any workflow requiring an account should similarly point to account setup if no active one exists.
- The account page is the first return point so users can see a balance change immediately. A later dashboard adds cross-account monthly summaries.
- Validation errors should appear beside form fields and preserve entered values. Access denials should not expose another user's record details.
- Editing and deleting have separate paths. Deleting needs explicit confirmation and a server check that the transaction is not a linked bill payment. Referenced accounts and categories are archived instead of deleted, and archived choices cannot be used for new financial entries.
- Recording payment is one database transaction: either the expense and bill link both save, or neither saves. This prevents a reminder appearing paid without a matching expense.
- Ordinary bill reminder creation, budget changes, and account/category changes also require validation and ownership checks; some error branches are omitted to keep the diagrams readable.
- Tests are planned alongside these workflows: first-time setup and skip behavior, denied cross-user actions, confirmed versus canceled deletion, exact JPY balance changes, and one expense after repeated or concurrent payment requests.

The reminder list is planned to derive `paid` from a linked payment, `overdue` from an unpaid due date before today, and `upcoming` from an unpaid due date today or later. Store the underlying facts instead of a status that can become stale overnight.
