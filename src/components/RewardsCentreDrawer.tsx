import type { Reward, RewardsHubData } from '../types/rewards';
import { AvailableOfferCard } from './AvailableOfferCard';
import { DrawerFooterCta } from './DrawerFooterCta';
import { ProgressRewardCard } from './ProgressRewardCard';
import { ReadyRewardCard } from './ReadyRewardCard';
import { RecommendedRewardCard } from './RecommendedRewardCard';
import { RewardRow } from './RewardRow';
import { RewardsCentreHeader } from './RewardsCentreHeader';
import { RewardsSection } from './RewardsSection';
import { RewardsSummaryStats } from './RewardsSummaryStats';

type RewardsCentreDrawerProps = {
  data: RewardsHubData;
  appliedRewardIds: string[];
  onAction: (reward: Reward) => void;
  onViewAll: (sectionTitle: string) => void;
  onClose: () => void;
  isLoading?: boolean;
};

export function RewardsCentreDrawer({ data, appliedRewardIds, onAction, onViewAll, onClose, isLoading = false }: RewardsCentreDrawerProps) {
  const recommendedRewards = getRecommendedRewards(data.rewards).slice(0, 1).map(toFigmaRecommendedReward);
  const recommendedRewardIds = new Set(recommendedRewards.map((reward) => reward.rewardId));
  const readyRewards = data.rewards.filter((reward) => reward.status === 'ReadyNow').slice(0, 2).map(toFigmaReadyReward);
  const inProgressRewards = data.rewards.filter((reward) => reward.status === 'InProgress').slice(0, 1).map(toFigmaProgressReward);
  const expiringRewards = data.rewards
    .filter((reward) => reward.status === 'ExpiringSoon' || reward.isExpiringSoon)
    .slice(0, 1)
    .map(toFigmaExpiringReward);
  const availableOffers = data.rewards.filter(
    (reward) => reward.status === 'AvailableOffer' && !recommendedRewardIds.has(reward.rewardId)
  ).map(toFigmaAvailableOffer);

  if (isLoading) {
    return (
      <aside className="rewards-drawer rewards-drawer--loading" aria-label="Rewards Centre" aria-busy="true">
        <div className="skeleton skeleton--header" />
        <div className="skeleton-grid" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="skeleton skeleton--card" />
        <div className="skeleton skeleton--row" />
        <div className="skeleton skeleton--row" />
      </aside>
    );
  }

  return (
    <aside className="rewards-drawer" aria-label="Rewards Centre">
      <RewardsCentreHeader player={data.player} onClose={onClose} />
      <div className="rewards-drawer__content">
        <RewardsSummaryStats overview={data.overview} />

        <RewardsSection
          title="Recommended for you"
          count={3}
          subtitle="Rewards picked based on what you like"
          emptyMessage="No recommendations yet."
          onViewAll={() => onViewAll('Recommended for you')}
        >
          <div className="single-card-stack">
            {recommendedRewards.map((reward) => (
              <RecommendedRewardCard reward={reward} onAction={onAction} key={reward.rewardId} />
            ))}
          </div>
        </RewardsSection>

        <RewardsSection title="Available offers" count={3} emptyMessage="No available offers right now." onViewAll={() => onViewAll('Available offers')}>
          <div className="offer-stack">
            {availableOffers.map((reward) => (
              <AvailableOfferCard
                reward={reward}
                isApplied={appliedRewardIds.includes(reward.rewardId)}
                onOptIn={onAction}
                key={reward.rewardId}
              />
            ))}
          </div>
        </RewardsSection>

        <RewardsSection title="Ready now" count={readyRewards.length} emptyMessage="No rewards are ready right now." onViewAll={() => onViewAll('Ready now')}>
          <div className="ready-grid">
            {readyRewards.map((reward) => (
              <ReadyRewardCard reward={reward} onAction={onAction} key={reward.rewardId} />
            ))}
          </div>
        </RewardsSection>

        <RewardsSection title="In progress" count={inProgressRewards.length} emptyMessage="No active reward missions." onViewAll={() => onViewAll('In progress')}>
          <div className="single-card-stack">
            {inProgressRewards.map((reward) => (
              <ProgressRewardCard reward={reward} onAction={onAction} key={reward.rewardId} />
            ))}
          </div>
        </RewardsSection>

        <RewardsSection title="Expiring soon" count={expiringRewards.length} emptyMessage="Nothing is expiring soon." onViewAll={() => onViewAll('Expiring soon')}>
          <div className="row-stack">
            {expiringRewards.map((reward) => (
              <RewardRow reward={reward} variant="expiring" onAction={onAction} key={reward.rewardId} />
            ))}
          </div>
        </RewardsSection>

        <DrawerFooterCta progress={data.progress} onViewHub={() => onViewAll('Rewards Hub')} />
      </div>
    </aside>
  );
}

function getRecommendedRewards(rewards: Reward[]) {
  const explicitRecommendations = rewards.filter((reward) => reward.isRecommended);

  if (explicitRecommendations.length > 0) {
    return explicitRecommendations;
  }

  return rewards.filter((reward) => reward.status === 'AvailableOffer').slice(0, 1);
}

function toFigmaRecommendedReward(reward: Reward): Reward {
  return {
    ...reward,
    title: '20 Free Spins on Starburst',
    description: 'Expires in 3 days',
    products: ['Casino'],
    value: {
      ...reward.value,
      originalAmount: 20,
      remainingAmount: 20,
      currency: 'Spins',
      displayText: '20 Free Spins'
    },
    expiresInHours: 72,
    recommendationReason: 'Based on your slot play',
    isCashierEligible: false,
    action: {
      ...reward.action,
      label: 'PLAY NOW',
      type: 'DeepLink',
      url: '/casino/starburst'
    }
  };
}

function toFigmaAvailableOffer(reward: Reward): Reward {
  if (reward.rewardId !== 'reward_010') {
    return reward;
  }

  return {
    ...reward,
    title: 'World Cup Welcome Offer',
    description: '100% up to €100 Bonus + €20 Free Bet',
    products: ['CrossProduct'],
    rewardTypeDisplayName: '',
    isCashierEligible: true,
    value: {
      ...reward.value,
      originalAmount: 120,
      remainingAmount: 120,
      currency: 'EUR',
      displayText: '100% up to €100 Bonus + €20 Free Bet'
    }
  };
}

function toFigmaReadyReward(reward: Reward, index: number): Reward {
  if (index === 0) {
    return {
      ...reward,
      title: 'Free Bet',
      description: 'Min odds 1.50',
      products: ['Sports'],
      rewardType: 'FreeBet',
      rewardTypeDisplayName: 'Spectate Free Bet',
      value: {
        ...reward.value,
        originalAmount: 5,
        remainingAmount: 5,
        currency: 'EUR',
        displayText: '€5'
      },
      expiresInHours: 10,
      action: {
        ...reward.action,
        label: 'USE NOW',
        type: 'DeepLink',
        url: '/sports'
      }
    };
  }

  return {
    ...reward,
    title: 'Free Spins',
    description: 'Eligible games',
    products: ['Casino'],
    rewardType: 'FreeSpins',
    rewardTypeDisplayName: '3rd Party Free Spins',
    value: {
      ...reward.value,
      originalAmount: 10,
      remainingAmount: 10,
      currency: 'Spins',
      displayText: '10'
    },
    expiresInHours: 48,
    action: {
      ...reward.action,
      label: 'PLAY NOW',
      type: 'DeepLink',
      url: '/casino'
    }
  };
}

function toFigmaProgressReward(reward: Reward): Reward {
  return {
    ...reward,
    title: 'Weekly Reward',
    description: 'Place 3 bets of €10+',
    rewardTypeDisplayName: 'Weekly reward',
    action: {
      ...reward.action,
      label: 'Continue mission',
      type: 'DeepLink',
      url: '/sports/rewards'
    },
    progress: {
      current: 2,
      target: 3,
      percentage: 67,
      label: '2 of 3'
    }
  };
}

function toFigmaExpiringReward(reward: Reward): Reward {
  return {
    ...reward,
    title: 'Poker Ticket',
    description: '€3 Tournament Ticket',
    products: ['Poker'],
    rewardType: 'PokerTicket',
    rewardTypeDisplayName: 'Tournament ticket',
    value: {
      ...reward.value,
      originalAmount: 3,
      remainingAmount: 3,
      currency: 'EUR',
      displayText: '€3'
    },
    expiresAt: null,
    expiresInHours: 3.666,
    action: {
      ...reward.action,
      label: 'View ticket',
      type: 'DeepLink',
      url: '/poker/tournaments'
    }
  };
}
