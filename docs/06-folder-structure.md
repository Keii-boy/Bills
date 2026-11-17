# Recommended future project folder structure

**Status: the application folders and files below are planned examples. Only the documentation exists today; this tree is not an instruction to generate code now.**

Use one repository and one Laravel application, with React inside Laravel's resources folder. This follows the proposed Inertia architecture and avoids managing two independent applications while learning.

```text
Bills/
├── app/
│   ├── Actions/
│   │   └── Bills/                 # Planned record/undo payment operations
│   ├── Http/
│   │   ├── Controllers/           # Planned request coordination
│   │   ├── Middleware/            # Planned cross-request checks
│   │   └── Requests/              # Planned form validation
│   ├── Models/                    # Planned User, Account, Category, etc.
│   └── Policies/                  # Planned ownership/access decisions
├── bootstrap/                     # Planned framework startup
├── config/                        # Planned server configuration
├── database/
│   ├── factories/                 # Planned fake test record definitions
│   ├── migrations/                # Planned versioned table changes
│   └── seeders/                   # Planned fake development data
├── docs/                          # Existing planning documents
├── public/                        # Planned web entry point and public assets
├── resources/
│   ├── css/                       # Planned CSS and Tailwind entry point
│   ├── js/
│   │   ├── components/            # Planned reusable UI pieces
│   │   ├── layouts/               # Planned shared page frames
│   │   ├── pages/
│   │   │   ├── accounts/          # Planned account pages
│   │   │   ├── bills/             # Planned reminder pages
│   │   │   ├── budgets/           # Planned monthly budget pages
│   │   │   ├── categories/        # Planned category pages
│   │   │   ├── dashboard/         # Planned summary page
│   │   │   └── transactions/      # Planned entry/history pages
│   │   ├── types/                 # Planned shared page-data types
│   │   └── app.tsx                # Planned React/Inertia entry point
│   └── views/                     # Planned Laravel HTML root view
├── routes/
│   └── web.php                    # Planned browser routes
├── storage/                       # Planned private runtime files and logs
├── tests/
│   ├── Feature/                   # Planned request/database behavior tests
│   └── Unit/                      # Planned isolated logic tests when useful
├── .env                           # Planned local secrets; must remain ignored
├── .env.example                   # Planned configuration names/placeholders
├── .gitignore                     # Existing ignore rules
├── README.md                      # Existing project introduction
├── composer.json                  # Planned PHP dependency manifest
├── package.json                   # Planned frontend dependency manifest
└── vite.config.ts                 # Planned frontend build configuration
```

This is a conceptual subset, not a complete Laravel skeleton. A future starter may provide different capitalization, authentication folders, entry points, or build filenames. Keep its conventions unless there is a concrete reason to change them; do not create parallel folders just to match this illustration. Authentication pages and framework support files are omitted for readability.

## Why put things here?

- `routes/web.php` maps browser URLs to handlers. Keep financial business rules out of route definitions so the request map stays readable.
- Controllers coordinate a request; Form Requests check input; policies decide permission. Each location has one understandable responsibility.
- Models represent stored records and relationships. Migrations describe how tables change over time; editing a model does not automatically change PostgreSQL.
- `Actions/Bills` is a proposed small custom folder for payment operations that must update multiple records together. Add it when those operations exist, rather than building an abstract service framework in advance.
- React pages correspond to screens. Components are smaller reusable pieces, and layouts supply shared navigation and page structure. Start with a few components and extract repetition as it appears.
- Shared TypeScript types describe data sent to the browser. They should not include server-only fields such as password hashes, and they do not replace PHP validation.
- Keep public assets in `public/` and private runtime data in `storage/`. A future server should expose Laravel's public directory, not the whole repository.
- Feature tests check complete behaviors such as rejecting another user's transaction. Unit tests are useful when a calculation or rule can be tested independently.
- `.env` holds local configuration and secrets. `.env.example` should contain safe placeholders only. The existing `.gitignore` already ignores `.env`, other `.env.*` files except `.env.example`, dependency folders, and logs.

## Planned growth rule

Create a folder only when it has a clear job. Keep deployment automation, a separate API, queues, and additional architectural layers for later requirements. Documentation belongs in `docs/` so design explanations remain easy to find without expanding the root README.
