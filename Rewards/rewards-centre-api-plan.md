# Rewards Centre API Plan

## Review Status

Reviewed against Atlassian on 2026-06-17.

Primary source:

- Confluence: https://evokeplc.atlassian.net/wiki/spaces/8CEC/pages/3007283521/Rewards+Centre+A+Unified+Solution+for+Managing+Scattered+Rewards+Across+Casino+Sports+and+Poker

Supporting source:

- Confluence: https://evokeplc.atlassian.net/wiki/spaces/8CEC/pages/3001679927/Creating+a+Unified+Rewards+Experience+Insights+and+Recommendations+for+888

Search notes:

- The primary Confluence page has no child pages and no footer comments.
- Atlassian search found the supporting CX recommendations page above.
- Jira search did not find a directly relevant implementation ticket for this Rewards Centre API work. Results for "Rewards Centre" and "Fragmented Rewards" were mostly unrelated "reward" or support hits.
- The Confluence page references an Excel requirements file at `C:\Users\racheli.vizel\Downloads\Features.xlsx`; that file was not available in this workspace, so this plan is based on the available Atlassian pages and current RewardsHub frontend contract.

## Purpose

Create a .NET Web API for the Rewards Centre MVP.

The API provides mock data for a frontend Rewards Centre experience where a player can see:

- 888 Points balance.
- Progress to the next gift.
- Recommended rewards.
- Ready rewards.
- In-progress rewards.
- Expiring rewards.
- Available offers.
- Reward details and rules.
- Reward history.
- Cashier-eligible rewards.
- Market-aware eligibility messaging.
- Safer gambling and compliance guardrail metadata.

## MVP Scope

In scope:

- Rewards entry point in header, side panel, or equivalent navigation.
- My Account Rewards Centre card.
- Rewards Centre slide-out data.
- Recommended for You section.
- 888 Points balance and progress to next gift.
- Rewards wallet.
- Reward cards.
- Reward states.
- Available offers.
- Expiring rewards.
- Reward details, key rules, and full rules link/content.
- Reward history.
- Cashier eligible rewards.
- Cashier selected/preselected reward metadata.
- Promo-code prefill metadata where applicable.
- Deposit summary preview metadata for applied cashier rewards.
- Mock confirmation messaging after reward application/deposit.
- Market eligibility handled internally by mock data.
- Safer gambling and compliance flags as static mock data.

Out of scope for MVP:

- Real integrations.
- Real cashier apply operation.
- Real persisted reward state changes.
- Recommendation engine.
- AI personalization.
- Full loyalty program rebuild.
- Full rewards marketplace.
- Promo banner redesign.
- Complex cross-product missions.
- Full omnichannel consistency across email, push, mobile apps, and CRM.

## Architecture

```text
React Frontend
   |
   v
.NET Rewards API
   |
   v
Mock JSON Data
```

The API should be read-only for MVP. Cashier reward apply and points increase are represented through mock action metadata returned from the API. The frontend can simulate local state changes, such as marking a reward as `Applied`, without a real `POST` command.

If backend-driven demo mutation is later required, add a separate demo-only API area and revisit the read-only decision.

## Confirmed Decisions

| Decision | Value |
| --- | --- |
| Project name | `Rewards` |
| API player model | Use `playerId` route parameter |
| Cashier apply | Mock data only, no real apply `POST` endpoint |
| Expiring soon threshold | 24 hours |
| Available offers | Included in MVP |
| Recommended for You | Included in Rewards Centre data using mock recommendation flags |
| Market configuration | Used internally by mock data, not exposed as a public endpoint |
| Demo points increase | Frontend/local simulation only unless a future demo endpoint is explicitly approved |

## Requirement Coverage From Atlassian

| Atlassian requirement | API coverage |
| --- | --- |
| Rewards Centre slide-out panel | `overview`, `widget`, `rewards`, `progress`, `history`, and `ui-state` endpoints provide the panel data. |
| Rewards entry point | `GET /api/v1/rewards-centre/entry-point` returns label, points summary, progress, and badge count. |
| My Account Rewards card | `GET /api/v1/rewards-centre/widget` returns display-ready card data without frontend copy hardcoding. |
| Recommended for You | Rewards can include `isRecommended` and `recommendationReason`; UI state exposes the section. |
| Ready now, In progress, Expiring soon, Available offers | `RewardStatus` and `rewards?status=` filtering support these sections. |
| 888 Points balance | `overview`, `widget`, `entry-point`, and `progress` include points fields. |
| Progress to next gift | `progress` includes current balance, target, points remaining, percentage, and explanation text. |
| Explain progress bar | `progress.explanation` and widget progress label provide the text. |
| Simulate points increase if supported | Out of backend MVP because API is read-only; frontend may simulate locally. |
| Rewards wallet | `GET /api/v1/rewards-centre/rewards` returns owned and available rewards with product labels/status. |
| Reward details | `GET /api/v1/rewards-centre/rewards/{rewardId}` returns value, product, expiry, progress, key rules, action, and full rules fields. |
| Reward history | `GET /api/v1/rewards-centre/history` returns claimed, used, expired, cancelled, and missed events. |
| Cashier eligible rewards | `GET /api/v1/cashier/rewards/eligible` returns eligible rewards and cashier action metadata. |
| Open Cashier from a selected reward | Reward actions can use `OpenCashierWithReward` with `selectedRewardId` and `cashierUrl`. |
| Apply reward in Cashier | Read-only MVP returns `MockApply` metadata; frontend can mark reward as `Applied` locally. |
| Deposit summary shows reward details | Cashier response includes `depositSummaryPreview` with reward name, promo code, value, and requirement. |
| Promo-code prefill | Cashier response includes optional `promoCode` and `prefillPromoCode`. |
| Confirmation after deposit | Cashier response includes `postDepositConfirmation`. |
| Remove/change applied reward status | `Applied` is a supported status; real removal is out of scope for read-only MVP. |
| Market-aware rules | Internal `market-config.json` controls eligibility; public API only exposes user-facing eligibility. |
| Safer gambling guardrails | Static mock flags support opt-in, no pressure messaging, clear terms, and suppression decisions. |

## Endpoint Plan

### Player

```http
GET /api/v1/players/{playerId}
```

Returns the mock player for the supplied player id.

Example response:

```json
{
  "playerId": "12345",
  "displayName": "Adrian",
  "market": "EU",
  "currency": "EUR",
  "preferredProduct": "Casino",
  "availableProducts": ["Casino", "Sports", "Poker"],
  "responsibleDesign": {
    "rewardPromptsAllowed": true,
    "saferGamblingToolsUrl": "/responsible-gaming",
    "suppressionReason": null
  }
}
```

### Rewards Overview

```http
GET /api/v1/rewards-centre/overview
```

Returns the business summary for the Rewards entry point and top of the Rewards Centre.

For the exact My Account Rewards Centre card shown in Figma, use `GET /api/v1/rewards-centre/widget`.

Example response:

```json
{
  "pointsBalance": 1250,
  "pointsName": "888 Points",
  "nextGiftTarget": 1563,
  "pointsToNextGift": 313,
  "progressPercentage": 80,
  "recommendedRewardsCount": 1,
  "readyRewardsCount": 2,
  "inProgressRewardsCount": 1,
  "expiringSoonCount": 1,
  "availableOffersCount": 2,
  "badgeCount": 3,
  "primaryMessage": "80% to your next free gift"
}
```

### Rewards Centre Widget

```http
GET /api/v1/rewards-centre/widget
```

Returns the exact display data for the Rewards Centre card inside My Account.

The frontend should be able to render the Figma card from this response without hardcoding copy, badge labels, progress text, or CTA labels.

Example response:

```json
{
  "title": "Rewards Centre",
  "subtitle": "Your rewards, points and progress",
  "leadingIcon": "Gift",
  "points": {
    "balance": 1250,
    "balanceDisplay": "1,250",
    "label": "888 Points",
    "accentIcon": "Star"
  },
  "badges": [
    {
      "key": "readyRewards",
      "count": 2,
      "label": "2 rewards ready",
      "tone": "Success",
      "icon": "CheckCircle"
    },
    {
      "key": "expiringToday",
      "count": 1,
      "label": "1 expiring today",
      "tone": "Warning",
      "icon": "Clock"
    }
  ],
  "progress": {
    "percentage": 80,
    "label": "80% to your next free gift",
    "targetIcon": "Gift",
    "explanation": "You need 313 more points to unlock your next gift."
  },
  "primaryAction": {
    "label": "Open Rewards Centre",
    "type": "OpenRewardsCentre",
    "url": null,
    "enabled": true,
    "confirmationMessage": null
  },
  "secondaryAction": {
    "label": "View all rewards and history",
    "type": "OpenRewardsHistory",
    "url": null,
    "enabled": true,
    "confirmationMessage": null
  }
}
```

### Rewards List

```http
GET /api/v1/rewards-centre/rewards
GET /api/v1/rewards-centre/rewards?status=ReadyNow
GET /api/v1/rewards-centre/rewards?status=AvailableOffer
GET /api/v1/rewards-centre/rewards?product=Casino
GET /api/v1/rewards-centre/rewards?recommended=true
GET /api/v1/rewards-centre/rewards?cashierEligible=true
```

Returns reward cards for wallet, sections, product filtering, recommended rewards, and cashier filtering.

### Reward Details

```http
GET /api/v1/rewards-centre/rewards/{rewardId}
```

Returns full reward details including value, product labels, status, expiry, progress, eligibility, key rules, full rules, and action.

### Progress

```http
GET /api/v1/rewards-centre/progress
```

Returns points progress and next gift details.

Example response:

```json
{
  "pointsBalance": 1250,
  "pointsName": "888 Points",
  "nextGiftTarget": 1563,
  "pointsToNextGift": 313,
  "progressPercentage": 80,
  "message": "80% to your next free gift",
  "explanation": "You need 313 more points to unlock your next gift.",
  "demoCanSimulateIncrease": true
}
```

### History

```http
GET /api/v1/rewards-centre/history
GET /api/v1/rewards-centre/history?eventType=Expired
GET /api/v1/rewards-centre/history?product=Sports
```

Returns claimed, used, expired, cancelled, and missed reward events.

### Entry Point

```http
GET /api/v1/rewards-centre/entry-point
```

Returns compact data for the sidebar/header Rewards entry point.

Example response:

```json
{
  "label": "Rewards",
  "pointsBalance": 1250,
  "pointsDisplay": "1,250 pts",
  "progressPercentage": 80,
  "badgeCount": 3,
  "badgeTone": "Warning",
  "message": "80% to next gift",
  "action": {
    "label": "Open Rewards Centre",
    "type": "OpenRewardsCentre",
    "url": null,
    "enabled": true,
    "confirmationMessage": null
  }
}
```

### UI State

```http
GET /api/v1/rewards-centre/ui-state
```

Returns presentation state for the Rewards Centre widget.

Example response:

```json
{
  "defaultTab": "Wallet",
  "showExpiringSoonAlert": true,
  "showAvailableOffers": true,
  "sections": [
    { "key": "RecommendedForYou", "label": "Recommended for you", "visible": true },
    { "key": "ReadyNow", "label": "Ready now", "visible": true },
    { "key": "InProgress", "label": "In progress", "visible": true },
    { "key": "ExpiringSoon", "label": "Expiring soon", "visible": true },
    { "key": "AvailableOffer", "label": "Available offers", "visible": true },
    { "key": "Points", "label": "888 Points", "visible": true },
    { "key": "History", "label": "History", "visible": true }
  ],
  "tabs": ["Wallet", "Available offers", "History"],
  "productFilters": ["All", "Casino", "Sports", "Poker"]
}
```

### Cashier Eligible Rewards

```http
GET /api/v1/cashier/rewards/eligible
GET /api/v1/cashier/rewards/eligible?playerId=12345
GET /api/v1/cashier/rewards/eligible?selectedRewardId=reward_010
```

Returns rewards that should be shown in Cashier during deposit.

No real `POST` apply endpoint for MVP. The frontend receives mock action metadata and can simulate selection locally.

Example response:

```json
[
  {
    "rewardId": "reward_010",
    "title": "World Cup Reward",
    "status": "AvailableOffer",
    "isCashierEligible": true,
    "selectedByDefault": true,
    "promoCode": "KICKOFF",
    "prefillPromoCode": true,
    "valueDisplay": "EUR 75 Casino Bonus + EUR 30 Free Bets",
    "requirementDisplay": "Minimum deposit EUR 10",
    "depositSummaryPreview": {
      "rewardName": "World Cup Reward",
      "promoCode": "KICKOFF",
      "value": "EUR 75 Casino Bonus + EUR 30 Free Bets",
      "requirement": "Minimum deposit EUR 10",
      "summaryLines": [
        "Casino: EUR 75 bonus",
        "Sports: EUR 30 free bets",
        "Wagering: 35x casino bonus"
      ]
    },
    "cashierAction": {
      "label": "Apply reward",
      "type": "MockApply",
      "url": null,
      "enabled": true,
      "confirmationMessage": "World Cup Reward applied: EUR 75 Casino Bonus + EUR 30 Free Bets."
    },
    "postDepositConfirmation": {
      "title": "Reward added",
      "message": "After deposit, this reward will appear in Rewards Centre."
    }
  }
]
```

## Core Data Objects

### Reward

```json
{
  "rewardId": "reward_001",
  "title": "EUR 5 Casino Bonus",
  "description": "Use your casino bonus today.",
  "rewardType": "ImmediateBonus",
  "sourceRewardTypeId": 1,
  "rewardTypeDisplayName": "Immediate bonus",
  "products": ["Casino"],
  "status": "InProgress",
  "value": {
    "originalAmount": 5,
    "remainingAmount": 5,
    "currency": "EUR",
    "displayText": "EUR 5"
  },
  "expiresAt": "2026-06-30T23:59:59Z",
  "isExpiringSoon": false,
  "expiresInHours": 312,
  "isCashierEligible": true,
  "isRecommended": false,
  "recommendationReason": null,
  "whyAmISeeingThis": "This reward is available for your preferred Casino product.",
  "eligibility": {
    "isEligible": true,
    "reason": null
  },
  "progress": {
    "current": 1,
    "target": 100,
    "percentage": 1,
    "label": "Wagering progress: 1% complete"
  },
  "rules": {
    "minimumDeposit": 10,
    "wageringRequirement": "35x",
    "minimumOdds": null,
    "freeBetExpiryHours": null,
    "eligibleProducts": ["Casino"],
    "eligibleGames": ["Slots"],
    "eligibleMarkets": ["UK", "Ireland"],
    "keyRules": [
      "Minimum deposit EUR 10",
      "Wagering requirement 35x",
      "Withdrawal will cancel this bonus"
    ],
    "restrictions": ["Withdrawal will cancel this bonus"],
    "fullRulesUrl": "/rewards/reward_001/rules",
    "termsAndConditions": "Full mock T&Cs text or a short mock summary."
  },
  "action": {
    "label": "Continue",
    "type": "DeepLink",
    "url": "/casino",
    "enabled": true,
    "confirmationMessage": null
  }
}
```

### Reward Progress

```json
{
  "pointsBalance": 1250,
  "pointsName": "888 Points",
  "nextGiftTarget": 1563,
  "pointsToNextGift": 313,
  "progressPercentage": 80,
  "message": "80% to your next free gift",
  "explanation": "You need 313 more points to unlock your next gift."
}
```

### Reward History Item

```json
{
  "historyId": "history_001",
  "rewardId": "reward_001",
  "title": "EUR 5 Casino Bonus",
  "product": "Casino",
  "status": "Used",
  "eventType": "Used",
  "eventDate": "2026-06-15T10:30:00Z",
  "description": "Reward used successfully."
}
```

## Enums

### RewardStatus

```text
ReadyNow
InProgress
ExpiringSoon
AvailableOffer
Applied
Used
Expired
Cancelled
Missed
NotEligible
```

### Product

```text
Casino
Sports
Poker
CrossProduct
```

### RewardType

```text
FreeBet
FreeSpins
CasinoBonus
PokerTicket
Points
DepositOffer
Gift
TournamentTicket
ImmediateBonus
ThirdPartyFreeSpins
FreePlayFreeSpins
FreePlayVoucher
SpectateFreeBet
LoyaltyPoints
GoldTokens
PendingBonus
```

### RewardActionType

```text
DeepLink
MockApply
ViewDetails
ViewRules
OpenRewardsCentre
OpenRewardsHistory
OpenCashier
OpenCashierWithReward
```

### Source Reward Type Mapping

| Source ID | API value | Display name |
| --- | --- | --- |
| 7 | `TournamentTicket` | Tournament ticket |
| 1 | `ImmediateBonus` | Immediate bonus |
| 16 | `ThirdPartyFreeSpins` | 3rd Party Free Spins |
| 11 | `FreePlayFreeSpins` | Free Play Free Spins |
| 10 | `FreePlayVoucher` | Free Play Voucher |
| 17 | `SpectateFreeBet` | Spectate Free Bet |
| 21 | `LoyaltyPoints` | Loyalty points |
| 20 | `GoldTokens` | Gold tokens |
| 2 | `PendingBonus` | Pending bonus |

## Expiring Soon Rule

`ExpiringSoon` means the reward expires within the next 24 hours.

Recommended API behavior:

```text
isExpiringSoon = expiresAt <= current server time + 24 hours
```

For MVP, the API can calculate `isExpiringSoon` and `expiresInHours` from mock `expiresAt` values.

## Market Handling

Market configuration is internal only for MVP.

There should be no public endpoint like:

```http
GET /api/v1/rewards-centre/market-config
```

Mock data may include market eligibility and safer gambling decisions, but public responses should only expose user-facing eligibility:

```json
{
  "eligibility": {
    "isEligible": false,
    "reason": "This reward is not available in your market."
  }
}
```

Markets to include in mock configuration:

- UK
- Italy
- Spain
- Denmark
- Sweden
- Ireland
- Canada
- International

Compliance/safer gambling guardrails from Atlassian:

- Avoid forced cross-product missions where restricted.
- Do not use aggressive streaks or pressure language.
- Make missions opt-in.
- Show expiry and key terms clearly.
- Separate cash value from bonus value.
- Make safer gambling tools easy to access.
- Allow features to be switched on/off by market.
- Suppress or reduce reward prompts for higher-risk segments where required.

## Mock Data Files

Recommended structure:

```text
MockData/
  player.json
  rewards-overview.json
  rewards-widget.json
  rewards.json
  progress.json
  reward-history.json
  entry-point.json
  ui-state.json
  cashier-eligible-rewards.json
  market-config.json
  safer-gambling-config.json
```

`market-config.json` and `safer-gambling-config.json` are internal input data only. They should not define public API contracts.

## Suggested Implementation Shape

Keep the first implementation simple:

```text
Rewards/
  Models/
  Services/
  MockData/
  Program.cs
```

Suggested service responsibilities:

- Load mock JSON data.
- Return current mock player.
- Return exact Rewards Centre widget display data for the My Account card.
- Return entry point data for header/side panel.
- Filter rewards by status, product, recommended flag, and cashier eligibility.
- Calculate `isExpiringSoon` using the 24-hour rule.
- Return reward details with key rules and full rules metadata.
- Return reward history.
- Return cashier eligible rewards from mock data.
- Apply market eligibility internally.
- Apply safer gambling suppression internally.
- Keep all mutation-like behavior as mock action metadata for MVP.

## MVP Completion Criteria

- API runs locally.
- Swagger/OpenAPI lists all MVP endpoints.
- Each endpoint returns valid mock JSON.
- Rewards Centre widget endpoint can render the My Account/Figma card without frontend copy hardcoding.
- Entry point endpoint supports header/side panel Rewards entry point.
- UI state includes Recommended for You, Ready now, In progress, Expiring soon, Available offers, 888 Points, and History.
- Rewards can be filtered by status and product.
- Recommended rewards are identifiable.
- Available offers are included.
- Expiring soon uses 24-hour logic.
- Reward details include value, product, expiry, progress, action, key rules, and full rules metadata.
- Progress endpoint explains points to the next gift.
- History includes claimed, used, expired, cancelled, and missed events.
- Cashier rewards are read-only mock data.
- Cashier eligible response supports selected/preselected rewards, promo-code prefill, deposit summary preview, mock apply confirmation, and post-deposit confirmation copy.
- Market rules are not exposed as a public endpoint.
- Safer gambling/compliance guardrails are represented in internal mock config and user-facing eligibility/copy.

## Open Decisions / Gaps

| Gap | Recommendation |
| --- | --- |
| Excel requirements file was not available | Attach or copy the Excel requirements into the workspace if it contains additional fields beyond the Confluence pages. |
| API read-only decision conflicts with cashier apply/status-change ACs if interpreted literally | Keep read-only for MVP and satisfy with mock action metadata plus frontend simulation. Add a demo-only command endpoint only if stakeholders require backend state changes. |
| Exact Figma content contract may evolve | Keep `widget` response display-ready so copy/labels can change without frontend hardcoding. |
| Compliance rules need market validation | Use internal market config in mock data and mark final real behavior as compliance-dependent. |
