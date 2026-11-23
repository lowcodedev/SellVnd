# Project memory

## Product intent & audience

- Commerce platform for merchants; main product spans products, inventory, orders, customers, conversations, payments, social publishing, and AI workflows.
- Two separate Bolt projects: current project = marketing/waitlist landing page only; dashboard = a different/new Bolt project.
- Current project scope: keep and maintain the public marketing/waitlist site; remove dashboard code if added.

## Brand personality & voice

- Serious, production-grade product positioning; not a demo or scaffold.
- Collaborative, consultative communication; surfaces tradeoffs and asks clarifying questions before large builds.

## Visual design & UX direction

- Current project: marketing/waitlist site only — no authentication flows in this project.
- Stack-implied conventions: Tailwind utility classes, Lucide React icons, `@/` import alias to `src/`, React hooks — no extra UI/icon packages unless explicitly requested.

## Decisions, constraints & rationale

- Dashboard (auth, products, inventory, orders, etc.) will be built in a separate new Bolt project, not here.
- Rationale: keep the waitlist/marketing site isolated; avoid mixing marketing and signed-in app concerns in one project.
- If dashboard code was added to this project, it should be removed to restore the marketing-only state.
- Avoid installing additional packages for UI themes or icons unless absolutely necessary.

## Open questions & assumptions

- Assumption: the marketing/waitlist site remains the public landing page; the dashboard is a separate signed-in app in a new project.
- Awaiting confirmation on whether to clean up / remove any dashboard code from the current project now.
- Dashboard project priorities (once created): auth, products/inventory first, then orders, conversations, customers, social, AI workflows.
- Preferred auth method for merchants and data model/persistence approach are decisions for the new dashboard project, not this one.