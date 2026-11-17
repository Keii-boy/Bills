# Planned user flow

**Status: every screen and action in this diagram is planned.**

```mermaid
flowchart TD
    Start[Open Bills] --> Session{Logged in?}
    Session -->|No| Auth[Register or log in]
    Auth --> AuthOK{Authentication succeeds?}
    AuthOK -->|No| AuthError[Show helpful errors]
    AuthError --> Auth
    AuthOK -->|Yes| Dashboard[Dashboard]
    Session -->|Yes| Dashboard
    Dashboard --> Setup[Create accounts and categories]
    Setup --> Dashboard
    Dashboard --> Entry[Enter income or expense]
    Entry --> Valid{Valid input and owned records?}
    Valid -->|No| Errors[Show errors or deny access]
    Errors --> Entry
    Valid -->|Yes| Save[Save transaction]
    Save --> Dashboard
    Dashboard --> History[Browse and filter transactions]
    History --> Edit[Edit or delete a transaction]
    Edit --> Valid
    Dashboard --> Budget[Set a monthly category budget]
    Budget --> Compare[Compare limit with recorded expenses]
    Compare --> Dashboard
    Dashboard --> Bills[Create or view bill reminders]
    Bills --> Pay[Record payment for an unpaid bill]
    Pay --> Atomic[Validate and save expense plus bill link together]
    Atomic --> Result{Saved successfully?}
    Result -->|Yes| Dashboard
    Result -->|No| PaymentError[Show error and keep bill unpaid]
    PaymentError --> Bills
    Dashboard --> Logout[Log out]
    Logout --> Auth
```

## Why this flow?

- Authentication comes before private data. A successful login identifies whose accounts, categories, and transactions may be used.
- Account setup comes before transaction entry because each transaction needs a place where money moved. An empty dashboard should explain this next step.
- The dashboard is the return point so users can see the effect of a change immediately.
- Validation errors should appear beside form fields and preserve entered values. Access denials should not expose another user's record details.
- Editing and deleting need the same ownership checks as creating and viewing. A delete action should explain its effect before confirmation; deleting a paid bill's transaction should be blocked until the payment is deliberately undone.
- Recording payment is one database transaction: either the expense and bill link both save, or neither saves. This prevents a reminder appearing paid without a matching expense.
- Ordinary bill reminder creation, budget changes, and account/category changes also require validation and ownership checks; their error branches are omitted to keep the diagram readable.

The reminder list is planned to derive `paid` from a linked payment, `overdue` from an unpaid due date before today, and `upcoming` from an unpaid due date today or later. Store the underlying facts instead of a status that can become stale overnight.
