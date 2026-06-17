import { ChevronRight, Star } from 'lucide-react';
import type { Reward } from '../types/rewards';
import { formatExpiringCountdown, getActionLabelWithIntent, getRewardDisplayDescription, getRewardDisplayTitle } from '../utils/rewardDisplay';
import { ProductBadge } from './ProductBadge';

type RewardRowProps = {
  reward: Reward;
  variant: 'expiring' | 'offer';
  onAction: (reward: Reward) => void;
};

export function RewardRow({ reward, variant, onAction }: RewardRowProps) {
  return (
    <article className={`reward-row reward-row--${variant}`}>
      <div className="reward-row__icon" aria-hidden="true">
        {variant === 'expiring' ? <Star size={17} /> : <ChevronRight size={17} />}
      </div>
      <div className="reward-row__copy">
        <div>
          <ProductBadge products={reward.products} />
          <span>{variant === 'expiring' ? formatExpiringCountdown(reward) : reward.rewardTypeDisplayName}</span>
        </div>
        <h3>{getRewardDisplayTitle(reward)}</h3>
        <p>{getRewardDisplayDescription(reward)}</p>
      </div>
      <button type="button" className="row-action" disabled={!reward.action.enabled} onClick={() => onAction(reward)}>
        <span>{getActionLabelWithIntent(reward.action.label, reward)}</span>
        <ChevronRight size={17} aria-hidden="true" />
      </button>
    </article>
  );
}
