# Figma Discrepancy Review

Source: copied Figma text list supplied on 2026-06-18, compared with current `RewardsHub` implementation.

This file is intentionally review-only. It lists differences to approve before implementation.

## High Priority

1. Recommended card CTA text
   - Figma: Recommended reward has `PLAY NOW`.
   - Current app: CTA comes from API/fallback `reward.action.label`; live API has shown `Claim offer` / `Claim Now` in this slot.
   - Impact: Override CTA label to `PLAY NOW` for recommended casino/free-spins reward while preserving the underlying action URL/type.

2. Recommended section helper copy
   - Figma: Shows `Rewards picked based on what you like` below `RECOMMENDED FOR YOU`.
   - Current app: `RewardsSection` renders only section title and `View all`.
   - Impact: Add optional section subtitle/helper text, at least for Recommended.

3. Recommended card content and hierarchy
   - Figma: Card shows `CASINO`, `20 Free Spins on Starburst`, `Based on your slot play`, expiry `Expires in 3 days`, and `PLAY NOW`.
   - Current app: Similar data exists in fallback, but live API can show `50 Free Spins`; value/description order differs from Figma.
   - Impact: Pin Figma demo fallback content and/or add presentational mapping for the recommended card.

4. Available offer title mismatch
   - Figma: `World Cup Welcome Offer`.
   - Current live/API-facing flow has shown `World Cup Reward`; fallback has `World Cup Welcome Offer`.
   - Impact: Normalize display title for this offer in frontend fallback/presentation mapping or update API mock data later with approval.

5. Available offer value text mismatch
   - Figma: `100% up to €100 Bonus + €20 Free Bet`.
   - Current fallback: `100% up to EUR 100 Bonus + EUR 20 Free Bet`; card sometimes displays compact `100% up to EUR 100 + EUR 20`.
   - Impact: Use Figma display text with `€` symbol in UI where the design uses it.

6. Available Offers count
   - Figma: `View all (3)`.
   - Current app: after excluding recommended from available offers, visible count may be `1` or `2` depending on API/fallback.
   - Impact: Need either three available-offer records or a separate Figma/demo display count for the section.

7. Ready Now card values
   - Figma: Sports card shows `€5` Free Bet; Casino card shows `10` Free Spins.
   - Current app/fallback: Sports is `EUR 5`, Casino is `10`; formatting differs.
   - Impact: UI should format EUR as `€` in reward cards for closer Figma parity.

8. Ready Now expiry copy
   - Figma: Sports shows `Expires today 23:59`; Casino shows `Expires in 2 days`.
   - Current app: generic computed copy like `10h left`, `2d left`.
   - Impact: Add Figma-style expiry formatter for ready cards.

9. Expiring Soon countdown
   - Figma: `Expires in 03:39:58`.
   - Current app: rounded text like `4h left`.
   - Impact: Add countdown-style formatting for expiring rewards.

10. Footer CTA text
    - Figma: `VIEW ALL REWARDS HUB`.
    - Current app: `View rewards hub`.
    - Impact: Change casing/text to match Figma.

## Medium Priority

11. Rewards Centre header greeting punctuation
    - Figma: `Hi Adrian! Here are your rewards`.
    - Current app: `Hi Adrian, here are your rewards`.
    - Impact: Small copy update.

12. Summary tile labels
    - Figma: `Ready now`, `In progress`, `Expiring soon`, `888 Points`.
    - Current app: `Ready`, `Progress`, `Expiring`, `888 Points`.
    - Impact: Update summary labels to exact Figma copy.

13. Summary tile visual treatment
    - Figma: Each tile has distinct tinted border/background and icon: green, blue, amber, yellow.
    - Current app: tiles mostly share one surface style with green icons.
    - Impact: Add per-tile tone classes.

14. Section title casing
    - Figma: Uppercase labels such as `RECOMMENDED FOR YOU`, `AVAILABLE OFFERS`, `READY NOW`.
    - Current app: CSS uppercases visually, but source text is title case.
    - Impact: Visual behavior likely acceptable; verify exact spacing/letter weight.

15. `View all` counts
    - Figma: Recommended `(3)`, Available `(3)`, Ready `(2)`, In Progress `(1)`, Expiring `(1)`.
    - Current app: counts are derived from current arrays; Recommended is sliced to one card but count may be one.
    - Impact: Add section-level display counts if Figma/demo requires fixed counts independent of rendered subset.

16. Available offer card badges
    - Figma: `FEATURED` label and `Eligible` badge are visible.
    - Current app: implemented, but icon/placement may not exactly match.
    - Impact: Fine-tune CSS and content placement against screenshot.

17. Available offer product badge
    - Figma list includes `Poker` near the World Cup offer area, but screenshot shows the offer as featured/cross-product-like.
    - Current app: `CrossProduct` renders as `All products`.
    - Impact: Decide whether World Cup should show no product badge, `Poker`, or cross-product presentation.

18. Ready Now card layout
    - Figma: product badge is outlined at the top edge; cards have strong product-color borders/actions.
    - Current app: badges are filled pills and generic card styling.
    - Impact: Add ready-card variants for Sports/Casino matching green/purple Figma treatments.

19. In Progress card detail icon
    - Figma: `Weekly Reward` includes small info icon near title and gift icon on the right.
    - Current app: no info icon near title; action button is shown rather than right gift icon.
    - Impact: Rework `ProgressRewardCard` to mission-card layout.

20. In Progress text
    - Figma: `Place 3 bets of €10+`, `2 of 3`, `67%`.
    - Current fallback: `Place 3 bets of EUR 10+`, `2 of 3`; percentage may be in progress bar only.
    - Impact: Use `€` symbol and explicit right-side percentage label.

21. Expiring Soon row affordance
    - Figma: poker row has left icon tile, `POKER` badge, countdown in orange, and chevron on the right.
    - Current app: compact row exists but uses generic layout/countdown.
    - Impact: Add expiring-specific styling and countdown.

## Lower Priority / Host Shell

22. Host shell items
    - Figma text list includes `888bet`, search, `Home`, `Featured games`, game tiles, `Settings`, and bottom/side navigation.
    - Current app: host page is a simplified My Account shell with Rewards widget and Cashier panel.
    - Impact: If the demo requires the full surrounding shell, build a more Figma-like host canvas behind the drawer.

23. Entry labels
    - Figma list includes `Rewards Centre`, `Cashier`, `Rewards`, and badge count `3`.
    - Current host uses `RewardsHub`, `My Account`, and widgets.
    - Impact: Add top navigation/header labels if the host shell is in scope.

24. Featured games content
    - Figma list includes `Mega Moolah`, `Lightning Roulette`, `Book of Dead`, `Premier League`, `Gonzo's Quest`, `Blackjack VIP`.
    - Current app does not render a game/sports content grid.
    - Impact: Optional only if host page fidelity matters beyond the drawer/cashier flow.

## Cashier Flow Discrepancies

25. Cashier applied reward title
    - Figma: `World Cup Welcome Offer`.
    - Current app now opens cashier with whichever offer is selected; after grouping fix it should be World Cup, but API title may still be `World Cup Reward`.
    - Impact: Same title normalization as item 4.

26. Cashier benefit values
    - Figma: `Up to €75 Casino Bonus` and `€30 Sports Free Bets`.
    - Current app: `Up to EUR 75 Casino Bonus` and `EUR 30 Sports Free Bets`.
    - Impact: Use Figma currency format.

27. Deposit amount copy
    - Figma: `€30`, `€50`, `€100`, etc.
    - Current app: `EUR 30`, `EUR 50`, etc.
    - Impact: Use `€` display labels while keeping numeric state internally.

28. Confirmation amount copy
    - Figma: `€30`.
    - Current app: `EUR 30`.
    - Impact: Use `€30`.

29. Confirmation message
    - Figma: `Your World Cup Welcome Offer has been applied. Your rewards are waiting in Rewards Centre.`
    - Current app matches mostly, but selected offer title can differ if API differs.
    - Impact: Title normalization again.

## Suggested Implementation Order

1. Copy and formatting pass: exact labels, `€` formatting, CTA text, section helper copy.
2. Data/presentation mapping pass: normalize demo titles and display values without changing `Rewards` API.
3. Layout pass: ready-card product variants, summary tile tones, expiring countdown row.
4. Optional host-shell pass: search/header/nav/featured games if needed for demo framing.
