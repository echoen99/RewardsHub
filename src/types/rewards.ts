export type RewardStatus =
  | 'ReadyNow'
  | 'InProgress'
  | 'ExpiringSoon'
  | 'AvailableOffer'
  | 'Applied'
  | 'Used'
  | 'Expired'
  | 'Cancelled'
  | 'NotEligible';

export type Product = 'Casino' | 'Sports' | 'Poker' | 'CrossProduct';

export type RewardType =
  | 'FreeBet'
  | 'FreeSpins'
  | 'CasinoBonus'
  | 'PokerTicket'
  | 'Points'
  | 'DepositOffer'
  | 'Gift'
  | 'TournamentTicket'
  | 'ImmediateBonus'
  | 'ThirdPartyFreeSpins'
  | 'FreePlayFreeSpins'
  | 'FreePlayVoucher'
  | 'SpectateFreeBet'
  | 'LoyaltyPoints'
  | 'GoldTokens'
  | 'PendingBonus';

export type RewardActionType = 'DeepLink' | 'MockApply' | 'ViewDetails';

export type Player = {
  playerId: string;
  displayName: string;
  market: string;
  currency: string;
  preferredProduct: Product;
  availableProducts: Product[];
};

export type RewardsOverview = {
  pointsBalance: number;
  pointsName: string;
  nextGiftTarget: number;
  pointsToNextGift: number;
  progressPercentage: number;
  readyRewardsCount: number;
  inProgressRewardsCount: number;
  expiringSoonCount: number;
  availableOffersCount: number;
  badgeCount: number;
  primaryMessage: string;
};

export type RewardValue = {
  originalAmount: number | null;
  remainingAmount: number | null;
  currency: string;
  displayText: string;
};

export type Eligibility = {
  isEligible: boolean;
  reason: string | null;
};

export type RewardProgress = {
  current: number;
  target: number;
  percentage: number;
  label: string;
};

export type RewardRules = {
  minimumDeposit: number | null;
  wageringRequirement: string | null;
  eligibleProducts: Product[];
  eligibleGames: string[] | null;
  eligibleMarkets?: string[];
  restrictions: string[];
};

export type RewardAction = {
  label: string;
  type: RewardActionType;
  url: string | null;
  enabled: boolean;
  confirmationMessage: string | null;
};

export type Reward = {
  rewardId: string;
  title: string;
  description: string;
  rewardType: RewardType;
  sourceRewardTypeId: number | null;
  rewardTypeDisplayName: string;
  products: Product[];
  status: RewardStatus;
  value: RewardValue;
  expiresAt: string | null;
  isExpiringSoon: boolean;
  expiresInHours: number | null;
  isCashierEligible?: boolean;
  eligibility: Eligibility;
  progress: RewardProgress | null;
  rules: RewardRules;
  action: RewardAction;
  isRecommended?: boolean;
  recommendationReason?: string;
};

export type CashierEligibleReward = {
  rewardId: string;
  title: string;
  status: RewardStatus;
  isCashierEligible: boolean;
  cashierAction: RewardAction;
};

export type RewardsWidgetBadgeTone = 'Success' | 'Warning' | 'Neutral';

export type RewardsWidget = {
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
    tone: RewardsWidgetBadgeTone;
    icon: string;
  }>;
  progress: {
    percentage: number;
    label: string;
    targetIcon: string;
  };
  primaryAction: RewardAction;
  secondaryAction: RewardAction;
};

export type RewardProgressSummary = {
  pointsBalance: number;
  nextGiftTarget: number;
  pointsToNextGift: number;
  progressPercentage: number;
  message: string;
};

export type RewardHistoryItem = {
  historyId: string;
  rewardId: string;
  title: string;
  status: RewardStatus;
  eventType: string;
  eventDate: string;
  description: string;
};

export type EntryPoint = {
  label: string;
  pointsBalance: number;
  progressPercentage: number;
  badgeCount: number;
  message: string;
};

export type RewardsUiState = {
  defaultTab: string;
  showExpiringSoonAlert: boolean;
  showAvailableOffers: boolean;
  tabs: string[];
  productFilters: string[];
};

export type RewardsHubData = {
  player: Player;
  overview: RewardsOverview;
  widget: RewardsWidget;
  rewards: Reward[];
  cashierRewards: CashierEligibleReward[];
  history: RewardHistoryItem[];
  progress: RewardProgressSummary;
  entryPoint: EntryPoint;
  uiState: RewardsUiState;
};
