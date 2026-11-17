# Recommended future project folder structure

**Status: the application folders and files below are planned examples. Only the documentation exists today; this tree is not an instruction to generate code now.**

Use **Laravel's official React starter kit** when implementation begins: one repository and one Laravel application, with Inertia.js and React inside Laravel's resources folder. Retain the selected kit's generated conventions and authentication files. Do not generate or move files to match this diagram now.

The documented frontend organization includes `components`, `hooks`, `layouts`, `lib`, `pages`, and `types` under `resources/js`. Sources: [official starter-kit documentation](https://laravel.com/docs/starter-kits#react) and [official React starter-kit repository](https://github.com/laravel/react-starter-kit). Recheck the chosen stable kit at setup time; no framework version is pinned here.

```text
Bills/
├── app/
│   ├── Http/
│   │   ├── Controllers/           # Planned request coordination
│   │   ├── Middleware/            # Planned kit-provided request middleware
│   │   └── Requests/              # Planned form validation
│   ├── Models/                    # Planned User, Account, Category, etc.
│   └── Policies/                  # Planned domain ownership checks, added as needed
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
│   │   ├── hooks/                 # Planned kit-provided React hooks
│   │   ├── layouts/               # Planned shared page frames
│   │   ├── lib/                   # Planned kit-provided utilities
│   │   ├── pages/
│   │   │   ├── auth/              # Planned kit-provided authentication pages
│   │   │   ├── settings/          # Planned kit-provided settings pages
│   │   │   ├── dashboard.tsx      # Planned kit page, adapted at dashboard milestone
│   │   │   ├── accounts/          # Planned account pages
│   │   │   ├── bills/             # Planned reminder pages
│   │   │   ├── budgets/           # Planned monthly budget pages
│   │   │   ├── categories/        # Planned category pages
│   │   │   └── transactions/      # Planned entry/history pages
│   │   ├── types/                 # Planned shared page-data types
│   │   └── app.tsx                # Planned React/Inertia.js entry point
│   └── views/                     # Planned Laravel HTML root view
├── routes/
│   └── web.php                    # Planned browser routes
├── storage/                       # Planned private runtime files and logs
├── tests/
│   ├── Feature/                   # Planned tests added with each feature
│   └── Unit/                      # Planned exact calculation tests when useful
├── .env                           # Planned local secrets; must remain ignored
├── .env.example                   # Planned configuration names/placeholders
├── .gitignore                     # Existing ignore rules
├── README.md                      # Existing project introduction
├── composer.json                  # Planned PHP dependency manifest
├── package.json                   # Planned frontend dependency manifest
└── vite.config.ts                 # Planned frontend build configuration
```

This is a relevant subset of the planned starter-kit application, not a complete skeleton or a list of folders to create. Starter-kit contents can change: keep its actual filenames, capitalization, authentication support, generated helpers, and build configuration. Domain page folders (`accounts`, `categories`, `transactions`, `budgets`, and `bills`) are proposed additions only when their milestone is implemented. Adapt the supplied dashboard page later instead of creating a second dashboard folder. Other kit support files are omitted for readability.

## Why put things here?

- `routes/web.php` maps browser URLs to handlers. Keep financial business rules out of route definitions so the request map stays readable.
- Controllers coordinate a request; Form Requests check input; policies decide permission. Each location has one understandable responsibility.
- Models represent stored records and relationships. Migrations describe how tables change over time; editing a model does not automatically change PostgreSQL.
- Keep record/undo bill-payment operations in the relevant controller initially, with validation, authorization, a database transaction, and bill row locking. Do not pre-create custom Actions, Services, or Repositories. If the kit already supplies authentication-specific action classes, retain them; those are not a reason to add a Bills action layer.
- React pages correspond to screens. Components are smaller reusable pieces, and layouts supply shared navigation and page structure. Start with a few components and extract repetition as it appears.
- `hooks` and `lib` retain the starter kit's supplied code; add to them only for concrete needs. Shared TypeScript types describe allowed page data, including canonical whole-yen strings for JPY amounts. They should not include server-only fields such as password hashes, and they do not replace PHP validation.
- Keep public assets in `public/` and private runtime data in `storage/`. A future server should expose Laravel's public directory, not the whole repository.
- Add feature tests alongside authentication, accounts/categories, transactions, dashboard, budgets, and payments. Cover ownership, validation, exact JPY calculations, and database effects. Use unit tests for isolated rules where useful and focused browser tests for UI-only confirmation/pending behavior. Use the chosen kit's test conventions and a dedicated PostgreSQL test database for integrity and concurrent-payment checks.
- `.env` holds local configuration and secrets. `.env.example` should contain safe placeholders only. The existing `.gitignore` already ignores `.env`, other `.env.*` files except `.env.example`, dependency folders, and logs.

## Planned growth rule

Create an application folder only when an implemented feature needs it, following the chosen starter kit. A separate frontend/backend application, separate API, multi-currency scaffolding, queues, and custom architectural layers are outside the MVP plan. Documentation belongs in `docs/` so design explanations remain easy to find without expanding the root README.
