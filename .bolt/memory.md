# Project memory

## Product intent & audience

- Commerce platform for merchants; main product spans products, inventory, orders, customers, conversations, payments, social publishing, and AI workflows.
- Existing public marketing/waitlist landing page already built; main product is a separate signed-in application area.
- Merchants are the primary users of the dashboard.

## Brand personality & voice

- Treated as a serious, production-grade product rather than a demo or scaffold.
- Communication leans collaborative and consultative; surfaces tradeoffs and asks clarifying questions before large builds.

## Visual design & UX direction

- Dashboard shell planned: signed-in layout with sidebar navigation and top bar.
- First feature module: products + inventory, since other modules depend on having products.
- Marketing site intentionally avoided authentication; dashboard introduces auth flows (sign-up/sign-in).
- Stack-implied conventions: Tailwind utility classes, Lucide React icons, `@/` import alias to `src/`, React hooks — no extra UI/icon packages unless explicitly requested.

## Decisions, constraints & rationale

- Recommended starting point: dashboard shell + product/inventory module before orders, conversations, customers, social, or AI workflows.
- Rationale: product data is the foundation other commerce modules build on.
- Auth is a required addition for the main product even though the marketing site omitted it.
- Avoid installing additional packages for UI themes or icons unless absolutely necessary.

## Open questions & assumptions

- Should the waitlist/marketing site remain as the public landing page with the dashboard as a separate signed-in area? (assumed yes)
- Which modules should be prioritized after products/inventory? Candidates: orders, conversations, customers, social publishing.
- Preferred auth method for merchants: email/password or something else? Not yet confirmed.
- No data model, API, or persistence approach chosen yet for the product.