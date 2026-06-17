import type { RewardsHubData } from '../types/rewards';

const now = new Date();
const inHours = (hours: number) => new Date(now.getTime() + hours * 60 * 60 * 1000).toISOString();

export const fallbackRewardsHubData: RewardsHubData = {
  player: {
    playerId: '12345',
    displayName: 'Adrian',
    market: 'EU',
    currency: 'EUR',
    preferredProduct: 'Casino',
    availableProducts: ['Casino', 'Sports', 'Poker']
  },
  overview: {
    pointsBalance: 1250,
    pointsName: '888 Points',
    nextGiftTarget: 1500,
    pointsToNextGift: 250,
    progressPercentage: 83,
    readyRewardsCount: 2,
    inProgressRewardsCount: 1,
    expiringSoonCount: 1,
    availableOffersCount: 3,
    badgeCount: 3,
    primaryMessage: '250 points to your next gift'
  },
  widget: {
    title: 'Rewards Centre',
    subtitle: 'Your rewards, points and progress',
    leadingIcon: 'Gift',
    points: {
      balance: 1250,
      balanceDisplay: '1,250',
      label: '888 Points',
      accentIcon: 'Star'
    },
    badges: [
      {
        key: 'readyRewards',
        count: 2,
        label: '2 rewards ready',
        tone: 'Success',
        icon: 'CheckCircle'
      },
      {
        key: 'expiringToday',
        count: 1,
        label: '1 expiring today',
        tone: 'Warning',
        icon: 'Clock'
      }
    ],
    progress: {
      percentage: 83,
      label: '83% to your next free gift',
      targetIcon: 'Gift'
    },
    primaryAction: {
      label: 'Open Rewards Centre',
      type: 'ViewDetails',
      url: null,
      enabled: true,
      confirmationMessage: null
    },
    secondaryAction: {
      label: 'View all rewards & history',
      type: 'ViewDetails',
      url: null,
      enabled: true,
      confirmationMessage: null
    }
  },
  progress: {
    pointsBalance: 1250,
    nextGiftTarget: 1500,
    pointsToNextGift: 250,
    progressPercentage: 83,
    message: '250 points to your next gift'
  },
  entryPoint: {
    label: 'Rewards',
    pointsBalance: 1250,
    progressPercentage: 83,
    badgeCount: 3,
    message: '83% to next gift'
  },
  uiState: {
    defaultTab: 'Wallet',
    showExpiringSoonAlert: true,
    showAvailableOffers: true,
    tabs: ['Wallet', 'Available offers', 'History'],
    productFilters: ['All', 'Casino', 'Sports', 'Poker']
  },
  rewards: [
    {
      rewardId: 'reward_000',
      title: '20 Free Spins on Starburst',
      description: 'Expires in 3 days',
      rewardType: 'FreeSpins',
      sourceRewardTypeId: 16,
      rewardTypeDisplayName: '3rd Party Free Spins',
      products: ['Casino'],
      status: 'AvailableOffer',
      value: {
        originalAmount: 20,
        remainingAmount: 20,
        currency: 'Spins',
        displayText: '20 Free Spins'
      },
      expiresAt: inHours(72),
      isExpiringSoon: false,
      expiresInHours: 72,
      isCashierEligible: false,
      eligibility: {
        isEligible: true,
        reason: null
      },
      progress: null,
      rules: {
        minimumDeposit: null,
        wageringRequirement: null,
        eligibleProducts: ['Casino'],
        eligibleGames: ['Starburst'],
        eligibleMarkets: ['EU'],
        restrictions: ['Opt-in required']
      },
      action: {
        label: 'Play now',
        type: 'DeepLink',
        url: '/casino/starburst',
        enabled: true,
        confirmationMessage: null
      },
      isRecommended: true,
      recommendationReason: 'Based on your slot play'
    },
    {
      rewardId: 'reward_001',
      title: 'Free Bet',
      description: 'Min odds 1.50',
      rewardType: 'FreeBet',
      sourceRewardTypeId: 17,
      rewardTypeDisplayName: 'Spectate Free Bet',
      products: ['Sports'],
      status: 'ReadyNow',
      value: {
        originalAmount: 5,
        remainingAmount: 5,
        currency: 'EUR',
        displayText: '€5'
      },
      expiresAt: inHours(10),
      isExpiringSoon: true,
      expiresInHours: 10,
      isCashierEligible: false,
      eligibility: {
        isEligible: true,
        reason: null
      },
      progress: null,
      rules: {
        minimumDeposit: null,
        wageringRequirement: null,
        eligibleProducts: ['Sports'],
        eligibleGames: null,
        eligibleMarkets: ['EU'],
        restrictions: ['Minimum odds 1.50']
      },
      action: {
        label: 'Use now',
        type: 'DeepLink',
        url: '/sports',
        enabled: true,
        confirmationMessage: null
      }
    },
    {
      rewardId: 'reward_002',
      title: 'Free Spins',
      description: 'Eligible games',
      rewardType: 'FreeSpins',
      sourceRewardTypeId: 16,
      rewardTypeDisplayName: '3rd Party Free Spins',
      products: ['Casino'],
      status: 'ReadyNow',
      value: {
        originalAmount: 10,
        remainingAmount: 10,
        currency: 'Spins',
        displayText: '10'
      },
      expiresAt: inHours(48),
      isExpiringSoon: false,
      expiresInHours: 48,
      isCashierEligible: false,
      eligibility: {
        isEligible: true,
        reason: null
      },
      progress: null,
      rules: {
        minimumDeposit: null,
        wageringRequirement: null,
        eligibleProducts: ['Casino'],
        eligibleGames: ['Selected slots'],
        eligibleMarkets: ['EU'],
        restrictions: []
      },
      action: {
        label: 'Play now',
        type: 'DeepLink',
        url: '/casino',
        enabled: true,
        confirmationMessage: null
      }
    },
    {
      rewardId: 'reward_003',
      title: 'Weekly Reward',
      description: 'Place 3 bets of €10+',
      rewardType: 'Gift',
      sourceRewardTypeId: null,
      rewardTypeDisplayName: 'Weekly reward',
      products: ['Sports'],
      status: 'InProgress',
      value: {
        originalAmount: null,
        remainingAmount: null,
        currency: 'EUR',
        displayText: 'Gift'
      },
      expiresAt: inHours(120),
      isExpiringSoon: false,
      expiresInHours: 120,
      isCashierEligible: false,
      eligibility: {
        isEligible: true,
        reason: null
      },
      progress: {
        current: 2,
        target: 3,
        percentage: 67,
        label: '2 of 3'
      },
      rules: {
        minimumDeposit: null,
        wageringRequirement: null,
        eligibleProducts: ['Sports'],
        eligibleGames: null,
        eligibleMarkets: ['EU'],
        restrictions: ['Qualifying bets must be €10+']
      },
      action: {
        label: 'Continue',
        type: 'DeepLink',
        url: '/sports',
        enabled: true,
        confirmationMessage: null
      }
    },
    {
      rewardId: 'reward_004',
      title: 'Poker Ticket',
      description: '€3 Tournament Ticket',
      rewardType: 'PokerTicket',
      sourceRewardTypeId: 7,
      rewardTypeDisplayName: 'Tournament ticket',
      products: ['Poker'],
      status: 'ExpiringSoon',
      value: {
        originalAmount: 3,
        remainingAmount: 3,
        currency: 'EUR',
        displayText: '€3'
      },
      expiresAt: inHours(3.75),
      isExpiringSoon: true,
      expiresInHours: 4,
      isCashierEligible: false,
      eligibility: {
        isEligible: true,
        reason: null
      },
      progress: null,
      rules: {
        minimumDeposit: null,
        wageringRequirement: null,
        eligibleProducts: ['Poker'],
        eligibleGames: ['Tournament lobby'],
        eligibleMarkets: ['EU'],
        restrictions: []
      },
      action: {
        label: 'View ticket',
        type: 'DeepLink',
        url: '/poker',
        enabled: true,
        confirmationMessage: null
      }
    },
    {
      rewardId: 'reward_010',
      title: 'World Cup Welcome Offer',
      description: '100% up to €100 Bonus + €20 Free Bet',
      rewardType: 'DepositOffer',
      sourceRewardTypeId: null,
      rewardTypeDisplayName: 'Deposit offer',
      products: ['CrossProduct'],
      status: 'AvailableOffer',
      value: {
        originalAmount: 120,
        remainingAmount: 120,
        currency: 'EUR',
        displayText: '100% up to €100 Bonus + €20 Free Bet'
      },
      expiresAt: inHours(336),
      isExpiringSoon: false,
      expiresInHours: 336,
      isCashierEligible: true,
      eligibility: {
        isEligible: true,
        reason: null
      },
      progress: null,
      rules: {
        minimumDeposit: 10,
        wageringRequirement: '35x casino bonus',
        eligibleProducts: ['Casino', 'Sports'],
        eligibleGames: null,
        eligibleMarkets: ['EU'],
        restrictions: ['Opt-in required']
      },
      action: {
        label: 'Opt in',
        type: 'MockApply',
        url: null,
        enabled: true,
        confirmationMessage: 'World Cup Welcome Offer applied: €100 Casino Bonus + €20 Free Bet.'
      }
    },
    {
      rewardId: 'reward_011',
      title: 'Weekend Free Spins',
      description: '20 Free Spins after your next deposit',
      rewardType: 'FreePlayFreeSpins',
      sourceRewardTypeId: 11,
      rewardTypeDisplayName: 'Free Play Free Spins',
      products: ['Casino'],
      status: 'AvailableOffer',
      value: {
        originalAmount: 20,
        remainingAmount: 20,
        currency: 'Spins',
        displayText: '20 Free Spins'
      },
      expiresAt: inHours(168),
      isExpiringSoon: false,
      expiresInHours: 168,
      isCashierEligible: true,
      eligibility: {
        isEligible: true,
        reason: null
      },
      progress: null,
      rules: {
        minimumDeposit: 10,
        wageringRequirement: null,
        eligibleProducts: ['Casino'],
        eligibleGames: ['Selected slots'],
        eligibleMarkets: ['EU'],
        restrictions: ['Opt-in required']
      },
      action: {
        label: 'Opt in',
        type: 'MockApply',
        url: null,
        enabled: true,
        confirmationMessage: 'Weekend Free Spins applied.'
      }
    }
  ],
  cashierRewards: [
    {
      rewardId: 'reward_010',
      title: 'World Cup Welcome Offer',
      status: 'AvailableOffer',
      isCashierEligible: true,
      cashierAction: {
        label: 'Apply reward',
        type: 'MockApply',
        url: null,
        enabled: true,
        confirmationMessage: 'World Cup Welcome Offer applied: €100 Casino Bonus + €20 Free Bet.'
      }
    },
    {
      rewardId: 'reward_011',
      title: 'Weekend Free Spins',
      status: 'AvailableOffer',
      isCashierEligible: true,
      cashierAction: {
        label: 'Apply reward',
        type: 'MockApply',
        url: null,
        enabled: true,
        confirmationMessage: 'Weekend Free Spins applied.'
      }
    }
  ],
  history: [
    {
      historyId: 'history_001',
      rewardId: 'reward_020',
      title: '€5 Casino Bonus',
      status: 'Used',
      eventType: 'Used',
      eventDate: inHours(-48),
      description: 'Reward used successfully.'
    },
    {
      historyId: 'history_002',
      rewardId: 'reward_021',
      title: 'Free Spins',
      status: 'Expired',
      eventType: 'Expired',
      eventDate: inHours(-120),
      description: 'Reward expired before use.'
    }
  ]
};
