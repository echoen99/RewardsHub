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
  onClose: () => void;
  isLoading?: boolean;
};

export function RewardsCentreDrawer({ data, appliedRewardIds, onAction, onClose, isLoading = false }: RewardsCentreDrawerProps) {
  const recommendedRewards = getRecommendedRewards(data.rewards);
  const recommendedRewardIds = new Set(recommendedRewards.map((reward) => reward.rewardId));
  const readyRewards = data.rewards.filter((reward) => reward.status === 'ReadyNow');
  const inProgressRewards = data.rewards.filter((reward) => reward.status === 'InProgress');
  const expiringRewards = data.rewards.filter((reward) => reward.status === 'ExpiringSoon' || reward.isExpiringSoon);
  const availableOffers = data.rewards.filter(
    (reward) => reward.status === 'AvailableOffer' && !recommendedRewardIds.has(reward.rewardId)
  );

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

        <RewardsSection title="Recommended for you" count={recommendedRewards.length} emptyMessage="No recommendations yet.">
          <div className="single-card-stack">
            {recommendedRewards.slice(0, 1).map((reward) => (
              <RecommendedRewardCard reward={reward} onAction={onAction} key={reward.rewardId} />
            ))}
          </div>
        </RewardsSection>

        <RewardsSection title="Available offers" count={availableOffers.length} emptyMessage="No available offers right now.">
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

        <RewardsSection title="Ready now" count={readyRewards.length} emptyMessage="No rewards are ready right now.">
          <div className="ready-grid">
            {readyRewards.map((reward) => (
              <ReadyRewardCard reward={reward} onAction={onAction} key={reward.rewardId} />
            ))}
          </div>
        </RewardsSection>

        <RewardsSection title="In progress" count={inProgressRewards.length} emptyMessage="No active reward missions.">
          <div className="single-card-stack">
            {inProgressRewards.map((reward) => (
              <ProgressRewardCard reward={reward} onAction={onAction} key={reward.rewardId} />
            ))}
          </div>
        </RewardsSection>

        <RewardsSection title="Expiring soon" count={expiringRewards.length} emptyMessage="Nothing is expiring soon.">
          <div className="row-stack">
            {expiringRewards.map((reward) => (
              <RewardRow reward={reward} variant="expiring" onAction={onAction} key={reward.rewardId} />
            ))}
          </div>
        </RewardsSection>

        <DrawerFooterCta progress={data.progress} />
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
