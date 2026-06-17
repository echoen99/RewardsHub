# RewardsHub Frontend Plan

## Goal

Build the `RewardsHub` React + TypeScript frontend as the Rewards Centre slide-out panel shown in the Figma design:

https://www.figma.com/make/tpDca7vs4mk0xjIHL0I2vr/Rewards-Centre-Slide-Out-Panel?p=f&t=mrLkK4dT1XxOzNLL-0&fullscreen=1

The frontend should be a polished, data-driven drawer experience that can run independently during development and consume the existing `Rewards` API once the backend endpoints are ready.

## Source Of Truth

- Primary visual reference: Figma design named `Rewards Centre Slide Out Panel`.
- Backend/API reference: `rewards-centre-api-plan.md`.
- Frontend project: `RewardsHub`.
- Backend project: `Rewards`.

The Figma design is the source of truth for layout, spacing, order, tone, card density, and the dark Rewards Centre visual style. The API plan is the source of truth for data contracts and endpoint shape.

## Figma Plugin Inspection Results

The Figma plugin connection was verified against the Figma Make file:

https://www.figma.com/make/tpDca7vs4mk0xjIHL0I2vr/Rewards-Centre-Slide-Out-Panel?fullscreen=1&t=SLPyMa9Gatx3jC23-1

Because this is a Figma Make file, the plugin exposes generated source resources and image assets instead of ordinary design-node metadata. The exposed source structure confirms the design is not only a drawer mockup; it includes these product surfaces:

- `RewardsCentre.tsx`
- `MyAccount.tsx`
- `Cashier.tsx`
- `WelcomeCashier.tsx`
- `DirectCashier.tsx`
- `Notifications.tsx`

Frontend planning should therefore treat the slide-out Rewards Centre as the MVP implementation target, while preserving data and component boundaries for My Account entry, cashier reward selection, and notification entry points.

Do not update the `Rewards` API project from this plan. If a data gap is discovered while implementing these surfaces, document the requested contract change first and ask for approval before changing `Rewards`.

## Product Scope

The first release is a right-side Rewards Centre drawer, not a marketing page and not a full rewards portal. It should feel like an in-product panel opened from an existing gaming site.

The Figma Make file also includes surrounding entry and integration surfaces. These should be represented in the frontend plan as follows:

- MVP build target: Rewards Centre slide-out drawer.
- MVP supporting entry point: My Account Rewards Centre widget/card, if needed to open the drawer.
- MVP supporting integration: Cashier eligible rewards display using read-only cashier reward data.
- Later/demo-only surfaces: Welcome cashier, direct cashier, and notifications unless specifically requested for the demo.

The drawer should show:

- Header with Rewards Centre identity and close control.
- Player greeting or contextual intro.
- Reward summary stats.
- Recommended reward area.
- Ready rewards.
- In-progress rewards.
- Expiring rewards.
- Available offers.
- Bottom action for the wider rewards hub, if present in the design.

Available offers must include the Figma opt-in flow, not only a generic row action. Each available offer should expose an `Opt in` button, expand into an inline confirmation/details area under the offer, and then remain visible in an applied/success state after confirmation.

## Figma Screenshot Flow Requirements

The implementation should match the three primary Figma screenshots provided by the product/design reference. These screenshots supersede earlier generic drawer assumptions where they conflict.

### Screen 1: Rewards Centre

The Rewards Centre is a dark right-side slide-out panel with dense reward sections.

- Header:
  - Green gift icon in a square/circle mark.
  - Title `Rewards Centre`.
  - Greeting line similar to `Hi Adrian! Here are your rewards`.
  - Close button on the right.
- Summary stat tiles:
  - Four horizontal tiles: `Ready now`, `In progress`, `Expiring soon`, and points.
  - Tiles use distinct icon/accent colors: green ready, blue progress, amber warning, yellow/star points.
  - Counts are large and centered; labels remain compact.
- Recommended section:
  - Section title `Recommended for you`.
  - Helper copy similar to `Rewards picked based on what you like`.
  - Right-aligned `View all (3)`.
  - Featured carousel-style card for `20 Free Spins on Starburst`.
  - Casino badge, recommendation chip such as `Based on your slot play`, expiry text, and primary `PLAY NOW` button.
  - Carousel dots under the recommended card.
- Available Offers section:
  - Appears before `Ready now`, not after `Expiring soon`.
  - Section title `Available offers` with right-aligned `View all (3)`.
  - Featured World Cup offer card with:
    - `FEATURED` label.
    - `Eligible` badge.
    - Title `World Cup Welcome Offer`.
    - Value text `100% up to EUR 100 Bonus + EUR 20 Free Bet`.
    - Primary green `OPT IN` button.
    - Secondary `View rules` action.
- Ready Now section:
  - Two side-by-side cards on desktop/drawer width.
  - Sports card with green styling and `USE NOW`.
  - Casino card with purple styling and `PLAY NOW`.
  - Expiry text is visible and urgent where relevant.
  - Carousel/scroll indicator appears below the card row.
- In Progress section:
  - Mission-style card for `Weekly Reward`.
  - Progress bar and progress text such as `2 of 3` and `67%`.
  - Gift/action icon on the right.
- Expiring Soon section:
  - Compact row/card for `Poker Ticket`.
  - Product badge, value/description, urgent expiry countdown, and chevron affordance.

### Screen 2: Opt In Opens Cashier

Clicking `OPT IN` on the World Cup offer should not complete the reward immediately. It should open the Cashier deposit flow with the reward already applied.

- Cashier is a full slide-out panel or replaces the current drawer in the same right-side overlay position.
- Header:
  - Orange `888` mark.
  - Title `Cashier`.
  - Balance line with cash and bonus amounts.
  - Promo badge such as `KICKOFF`.
  - Close button.
- Tabs:
  - `Deposit` active.
  - `Withdrawal`, `History`, `Limits`, and `Responsible Gaming` shown as inactive tabs.
- Payment method row:
  - Visa / MC selected.
  - Skrill, LuxonPay, Neteller as alternatives.
- Step 1, deposit amount:
  - Deposit amount grid with `EUR 30`, `EUR 50`, `EUR 100`, `EUR 200`, `EUR 500`, `Other`.
  - `EUR 30` selected and labelled as qualifying.
- Step 2, applied reward:
  - Reward applied card with green outline/tone.
  - Title `World Cup Welcome Offer`.
  - Promo code `KICKOFF`, marked as added automatically.
  - Benefit chips such as `Up to EUR 75 Casino Bonus` and `EUR 30 Sports Free Bets`.
  - Qualifying deposit text such as `Deposit EUR 30 or more to qualify`.
  - `View rules` and `Remove reward` actions.
- Step 3, payment information:
  - Card number, security code, and cardholder name fields.
  - Values may be mock/demo-only.
- Sticky cashier footer:
  - Deposit amount, promo code, and reward summary.
  - SSL/encrypted trust indicators.
  - Primary orange `Deposit EUR 30` button.

### Screen 3: Deposit Confirmation

Clicking `Deposit EUR 30` should show a centered confirmation modal over a dimmed cashier background.

- Confirmation modal:
  - Green success/check icon.
  - Title `Deposit Confirmed`.
  - Amount `EUR 30` in large amber text.
  - Message that the World Cup Welcome Offer has been applied and rewards are waiting in Rewards Centre.
  - Primary green `View in Rewards Centre` button with gift icon.
  - Secondary `Close cashier` action.
- `View in Rewards Centre` should return to the Rewards Centre drawer.
- Returning to Rewards Centre should update the visible state:
  - The World Cup offer should no longer look like a fresh available offer.
  - The relevant reward should appear as applied/ready according to the frontend fallback model.
  - Summary counts should reflect the local state where feasible.
  - A success/confirmation state may be shown without adding backend writes.

## Constraints

- Keep `RewardsHub` as a separate frontend project inside this repository.
- Do not modify the `Rewards` API project as part of this frontend plan.
- Use the API contracts from `rewards-centre-api-plan.md`.
- Keep temporary fallback data in the frontend until the API endpoints are implemented.
- Make fallback data match the API model, so removing it later is low-risk.
- Match the Figma drawer first; avoid adding unrelated navigation, hero content, or explanation text.

## Visual Design Direction From Figma

The UI should be implemented as a compact dark slide-out panel.

- The host page behind the drawer is darkened or visually de-emphasized.
- The drawer is anchored to the right on desktop and fills most or all of the viewport on mobile.
- The drawer width should target roughly `420px` to `480px`, with a hard mobile-safe minimum of `320px`.
- The visual language is dark, dense, and gaming-product oriented.
- Cards should use low-radius rounded corners, subtle borders, and layered dark surfaces.
- Accent colors should separate reward types instead of creating a single-color theme.
- Green should be used for positive actions and ready states.
- Amber/yellow should be reserved for featured, recommended, or urgent reward emphasis.
- Purple can be used for Casino, orange for Poker, and green for Sports.
- Text hierarchy should be tight: section labels, reward titles, metadata, and CTA text must remain readable in narrow drawer widths.
- Buttons should use direct action labels such as `Play now`, `Use now`, `Opt in`, or `View`.

## Responsive Behavior

Desktop:

- Drawer sits on the right edge over a dark product shell.
- Drawer keeps a stable fixed width.
- Content scrolls inside the drawer, while the host page remains fixed.
- Header remains visible at the top if the Figma behavior implies a sticky drawer header.

Mobile:

- Drawer becomes full-screen or near full-screen.
- Cards stack vertically unless the Figma shows intentional horizontal scrolling.
- Summary stat tiles remain stable and should not jump when numbers change.
- CTA buttons must not wrap awkwardly or overflow.

## Proposed Folder Structure

```text
RewardsHub/
  package.json
  index.html
  vite.config.js
  tsconfig.json
  .env.example
  src/
    main.tsx
    App.tsx
    api/
      rewardsApi.ts
    components/
      RewardsCentreDrawer.tsx
      RewardsCentreHeader.tsx
      RewardsSummaryStats.tsx
      RewardsSection.tsx
      RecommendedRewardCard.tsx
      ReadyRewardCard.tsx
      ProgressRewardCard.tsx
      RewardRow.tsx
      ProductBadge.tsx
      ProgressBar.tsx
      DrawerFooterCta.tsx
    data/
      fallbackRewards.ts
    types/
      rewards.ts
    styles/
      rewardsHub.css
```

## Technology Choices

| Area | Choice | Reason |
| --- | --- | --- |
| App framework | Vite + React | Fast local development and simple demo flow |
| Language | TypeScript | Keeps the API contract explicit |
| Icons | `lucide-react` | Clean icon set for close, gift, chevron, clock, and action icons |
| Styling | Plain CSS | Current project already uses plain CSS and the drawer can be built cleanly without a UI dependency |
| API base URL | `VITE_REWARDS_API_BASE_URL` | Allows local backend URL changes without code edits |

## API Endpoints To Consume

The frontend should consume these endpoints from the `Rewards` API:

```http
GET /api/v1/players/{PlayerID}
GET /api/v1/rewards-centre/overview
GET /api/v1/rewards-centre/widget
GET /api/v1/rewards-centre/rewards
GET /api/v1/rewards-centre/rewards/{rewardId}
GET /api/v1/rewards-centre/progress
GET /api/v1/rewards-centre/history
GET /api/v1/rewards-centre/entry-point
GET /api/v1/rewards-centre/ui-state
GET /api/v1/cashier/rewards/eligible
```

For the first drawer screen, the minimum required calls are:

```http
GET /api/v1/players/me
GET /api/v1/rewards-centre/overview
GET /api/v1/rewards-centre/rewards
GET /api/v1/rewards-centre/progress
GET /api/v1/rewards-centre/ui-state
```

For the Figma-aligned My Account card or entry point, use:

```http
GET /api/v1/rewards-centre/widget
GET /api/v1/rewards-centre/entry-point
```

For the cashier surfaces exposed in the Figma Make project, use:

```http
GET /api/v1/cashier/rewards/eligible
```

The cashier flow remains read-only in the MVP. Applying a reward should be simulated locally from the returned `MockApply` action metadata.

## Frontend Data Model

The frontend should mirror the planned API model and add only small optional fields needed by the Figma presentation.

```ts
type RewardStatus =
  | 'ReadyNow'
  | 'InProgress'
  | 'ExpiringSoon'
  | 'AvailableOffer'
  | 'Applied'
  | 'Used'
  | 'Expired'
  | 'Cancelled'
  | 'NotEligible';

type Product = 'Casino' | 'Sports' | 'Poker' | 'CrossProduct';

type Reward = {
  rewardId: string;
  title: string;
  description: string;
  rewardType: string;
  rewardTypeDisplayName: string;
  products: Product[];
  status: RewardStatus;
  value: {
    originalAmount: number | null;
    remainingAmount: number | null;
    currency: string;
    displayText: string;
  };
  expiresAt: string;
  isExpiringSoon: boolean;
  expiresInHours: number;
  progress: {
    current: number;
    target: number;
    percentage: number;
    label: string;
  } | null;
  action: {
    label: string;
    type: string;
    url: string | null;
    enabled: boolean;
    confirmationMessage: string | null;
  };
  isRecommended?: boolean;
  recommendationReason?: string;
  visualPriority?: 'featured' | 'standard' | 'compact';
};
```

Add frontend types for the Figma-supported entry and cashier surfaces:

```ts
type RewardsWidget = {
  title: string;
  subtitle: string;
  leadingIcon: string;
  points: {
    balance: number;
    balanceDisplay: string;
    label: string;
    accentIcon: string;
  };
  badges: Array<{
    key: string;
    count: number;
    label: string;
    tone: 'Success' | 'Warning' | 'Neutral';
    icon: string;
  }>;
  progress: {
    percentage: number;
    label: string;
    targetIcon: string;
  };
  primaryAction: Reward['action'];
  secondaryAction: Reward['action'];
};

type CashierEligibleReward = Reward & {
  isCashierEligible: true;
  cashierAction: Reward['action'];
};
```

## Screen Composition

The drawer should be composed in the same order as the Figma design.

```tsx
<RewardsCentreDrawer>
  <RewardsCentreHeader />
  <RewardsSummaryStats />

  <RewardsSection title="Recommended for you">
    <RecommendedRewardCard />
  </RewardsSection>

  <RewardsSection title="Available offers">
    <AvailableOfferCard />
  </RewardsSection>

  <RewardsSection title="Ready now">
    <ReadyRewardCard />
  </RewardsSection>

  <RewardsSection title="In progress">
    <ProgressRewardCard />
  </RewardsSection>

  <RewardsSection title="Expiring soon">
    <RewardRow variant="expiring" />
  </RewardsSection>

  <DrawerFooterCta />
</RewardsCentreDrawer>
```

Opt-in and cashier surfaces should be composed as:

```tsx
<CashierDrawer>
  <CashierHeader />
  <CashierTabs activeTab="Deposit" />
  <PaymentMethodSelector />
  <DepositAmountSelector selectedAmount={30} />
  <AppliedRewardCard reward={worldCupOffer} promoCode="KICKOFF" />
  <PaymentInformationForm />
  <CashierDepositFooter />
  <DepositConfirmationModal />
</CashierDrawer>
```

## Component Responsibilities

| Component | Responsibility |
| --- | --- |
| `RewardsCentreDrawer` | Main shell, overlay, scroll container, loading/error/fallback states, data grouping |
| `RewardsCentreHeader` | Drawer title, reward/gift icon, player greeting if shown, close button |
| `RewardsSummaryStats` | Compact metric tiles for ready, in progress, expiring soon, and points/value |
| `RewardsSection` | Shared section label, count, optional view-all action, empty state |
| `RecommendedRewardCard` | Featured reward card with accent treatment, reason text, expiry, CTA, and optional carousel dots |
| `ReadyRewardCard` | Reward card for immediately usable rewards, value emphasis, product badge, CTA |
| `ProgressRewardCard` | Mission/challenge style card with progress bar and target copy |
| `RewardRow` | Compact row pattern for expiring rewards |
| `AvailableOfferCard` | Figma-aligned available-offer card with `Opt in`, inline terms/details, confirm/cancel actions, and applied state |
| `ProductBadge` | Product label and color treatment for Sports, Casino, Poker, or cross-product |
| `ProgressBar` | Reusable progress visualization |
| `DrawerFooterCta` | Bottom link or button to the full rewards hub if present in Figma |
| `RewardsEntryWidget` | My Account card/entry point that uses `/widget` or `/entry-point` data and opens the drawer |
| `CashierRewardsPanel` | Cashier reward selector/list that uses `/cashier/rewards/eligible` and local mock apply state |
| `CashierDrawer` | Figma-aligned cashier deposit panel opened from offer opt-in |
| `CashierHeader` | Cashier title, balances, promo badge, and close control |
| `CashierTabs` | Deposit/Withdrawal/History/Limits/Responsible Gaming navigation row |
| `PaymentMethodSelector` | Payment method pills with Visa / MC selected |
| `DepositAmountSelector` | Fixed deposit amount grid with qualifying state on EUR 30 |
| `AppliedRewardCard` | Reward applied card for World Cup offer, promo code, benefits, rules/remove actions |
| `PaymentInformationForm` | Mock card input area for the deposit form |
| `CashierDepositFooter` | Sticky footer with summary and orange deposit CTA |
| `DepositConfirmationModal` | Success modal with `View in Rewards Centre` return action |

## Data Grouping Rules

```ts
const recommendedRewards = rewards.filter((reward) => reward.isRecommended);
const readyRewards = rewards.filter((reward) => reward.status === 'ReadyNow');
const inProgressRewards = rewards.filter((reward) => reward.status === 'InProgress');
const expiringRewards = rewards.filter(
  (reward) => reward.status === 'ExpiringSoon' || reward.isExpiringSoon
);
const availableOffers = rewards.filter((reward) => reward.status === 'AvailableOffer');
```

Temporary fallback grouping for recommendations:

```ts
const recommendedRewards = rewards.some((reward) => reward.isRecommended)
  ? rewards.filter((reward) => reward.isRecommended)
  : rewards.filter((reward) => reward.status === 'AvailableOffer').slice(0, 1);
```

## UX States

The first implementation should include:

- Loading state using skeleton blocks that match the drawer card shapes.
- API unavailable state that silently falls back to development data.
- Per-section empty states that are compact and do not dominate the drawer.
- Disabled CTA state when `action.enabled` is false.
- Product-specific badge colors.
- Expiry display derived from `expiresInHours`.
- Progress display derived from `progress.percentage`.
- Recommendation reason text when `recommendationReason` exists.
- Basic local confirmation state for mock opt-in/apply actions.

## Interaction Rules

- Close button should call an `onClose` prop and can log locally during MVP.
- `View all` actions should be placeholders until the full hub route exists.
- Reward CTA handling:
  - `DeepLink`: navigate to `action.url` when available.
  - `MockApply`: show local confirmation and update the card state.
  - `ViewDetails`: open a detail placeholder or log the selected reward.
- Available-offer opt-in handling:
  - The visible primary CTA in the Available Offers section must be `OPT IN`.
  - Selecting `OPT IN` on the World Cup offer opens the Cashier drawer with that reward already applied.
  - The Cashier drawer controls the deposit flow; opt-in is completed only after the user clicks `Deposit EUR 30`.
  - Deposit confirmation presents the success modal from the Figma screenshot.
  - `View in Rewards Centre` closes Cashier, returns to Rewards Centre, and updates local reward state.
  - Applied offers should not be treated as fresh available offers after the deposit confirmation.
- Do not block drawer rendering if one optional section has no data.

## Styling Implementation Notes

Use CSS custom properties for the Figma-aligned design tokens:

```css
:root {
  --color-page: #0d111d;
  --color-drawer: #111726;
  --color-surface: #171e2f;
  --color-surface-raised: #1d263a;
  --color-border: #2a3348;
  --color-text: #f7f8ff;
  --color-muted: #a6adc5;
  --color-green: #35df77;
  --color-amber: #f5c451;
  --color-purple: #9b6dff;
  --color-orange: #ff9f43;
}
```

Keep dimensions stable:

- Drawer width: `min(100vw, 460px)`.
- Card radius: `8px` or less unless the Figma frame clearly uses larger.
- Icon buttons: fixed square size.
- Summary cards: fixed grid tracks.
- Progress bars: fixed height.
- CTA buttons: fixed min-height and no text overflow.

## Local Development Flow

1. Start the backend separately when API endpoints are available.
2. Start the frontend from `RewardsHub`.
3. Frontend reads `VITE_REWARDS_API_BASE_URL`, defaulting to `http://localhost:5136`.
4. Frontend calls the Rewards API endpoints.
5. If endpoints are unavailable, frontend uses `fallbackRewardsHubData`.

Example `.env`:

```text
VITE_REWARDS_API_BASE_URL=http://localhost:5136
```

## Implementation Phases

### Phase 0: Figma Alignment Pass

- Use the Figma Make project as a component and surface inventory.
- Keep the `RewardsCentre` drawer as the first deliverable.
- Capture My Account widget and Cashier surfaces as separate frontend modules, not as mixed drawer logic.
- Avoid importing Figma-generated code wholesale; adapt layout, hierarchy, copy density, colors, and states into the existing `RewardsHub` React structure.

### Phase 1: Replace Placeholder App

- Replace the current placeholder in `App.tsx` with the drawer shell.
- Preserve the existing `getRewardsHubData()` loader.
- Add the host-page backdrop so the drawer feels like an overlay.

### Phase 2: Build Shared UI Primitives

- Add `RewardsCentreHeader`.
- Add `RewardsSummaryStats`.
- Add `RewardsSection`.
- Add `ProductBadge`.
- Add `ProgressBar`.

### Phase 3: Build Reward Card Variants

- Add `RecommendedRewardCard`.
- Add `ReadyRewardCard`.
- Add `ProgressRewardCard`.
- Add compact `RewardRow` variants for expiring rewards.
- Add `AvailableOfferCard` for offers and the Figma opt-in flow.
- Wire cards to the existing reward type model.

### Phase 4: Match Figma Visual Polish

- Tune spacing, colors, typography, borders, and shadows against the Figma frame.
- Ensure section ordering matches Figma.
- Ensure card density matches Figma.
- Verify mobile and desktop drawer widths.

### Phase 5: Interaction Layer

- Add close callback placeholder.
- Add view-all placeholders.
- Add CTA behavior for deep links and mock apply actions.
- Add local confirmation/success state for opt-in style actions.
- Add Figma cashier opt-in flow: `OPT IN` opens Cashier, `Deposit EUR 30` opens confirmation, `View in Rewards Centre` returns with updated local reward state.

### Phase 5B: Cashier Deposit Flow

- Add `CashierDrawer` opened from `AvailableOfferCard`.
- Add cashier header, tabs, payment method selector, deposit amount selector, applied reward card, payment details, sticky footer, and confirmation modal.
- Keep the flow frontend-local for MVP; do not add backend write endpoints.
- Use `GET /api/v1/cashier/rewards/eligible` and existing reward action metadata to populate the applied reward.
- On deposit confirmation, mark the offer as applied locally and update Rewards Centre view/counts where feasible.

### Phase 5A: Figma Supporting Surfaces

- Add or refine a `RewardsEntryWidget` for the My Account Rewards Centre card if the demo needs an entry point before the drawer opens.
- Add or refine a `CashierRewardsPanel` only against `GET /api/v1/cashier/rewards/eligible`.
- Keep cashier apply behavior local and mock-only.
- Keep Welcome Cashier, Direct Cashier, and Notifications as optional follow-up screens unless explicitly pulled into the MVP.

### Phase 6: Verification

- Run `npm run build`.
- Run `npm run dev`.
- Verify the drawer at desktop width.
- Verify the drawer at mobile width.
- Verify fallback mode when the backend is unavailable.
- Verify API mode once the backend endpoints exist.
- Verify the My Account widget uses `/widget` or `/entry-point` data rather than hardcoded labels if implemented.
- Verify the cashier surface uses only read-only eligible reward data if implemented.
- Verify `OPT IN` opens Cashier with the World Cup offer applied.
- Verify `Deposit EUR 30` opens the confirmation modal.
- Verify `View in Rewards Centre` returns to Rewards Centre and updates offer/reward state.

## Open Questions

1. Should the drawer header be sticky while the reward list scrolls?
2. Does Figma require horizontal carousels for any section, or should all cards stack?
3. Should `Recommended for you` show one featured card or multiple swipeable cards?
4. Should `View all` open a full rewards hub page in MVP or remain a placeholder?
5. Which real product routes should `Play now`, `Use now`, and `Opt in` use?
6. Should recommendations become backend-owned through `isRecommended`, or remain frontend-only for the demo?
7. Should the demo start from the My Account widget or show the slide-out drawer open by default?
8. Should cashier eligible rewards be part of the first demo path, or remain a secondary route/component?
9. Are Welcome Cashier, Direct Cashier, and Notifications required for this hackathon demo, or only present as Figma context?

## Approval Checklist

- [ ] Keep `RewardsHub` as the frontend project.
- [ ] Do not change the `Rewards` API project.
- [ ] Use API contracts from `rewards-centre-api-plan.md`.
- [ ] Use the Figma slide-out panel as the visual source of truth.
- [ ] Keep My Account widget and Cashier surfaces separate from drawer internals.
- [ ] Use `/rewards-centre/widget` or `/entry-point` for any My Account entry card.
- [ ] Use `/cashier/rewards/eligible` for any cashier reward display.
- [ ] Replace the placeholder app with the drawer UI.
- [ ] Include temporary fallback data only as a development aid.
- [ ] Implement loading, empty, disabled, and fallback states.
- [ ] Implement the Figma Available Offers opt-in flow.
- [ ] Implement the Figma Cashier deposit and confirmation flow.
- [ ] Keep applied available offers visible after opt-in.
- [ ] Match the Figma drawer closely enough for demo use.
