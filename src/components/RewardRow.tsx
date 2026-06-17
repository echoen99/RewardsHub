import { ChevronRight, Clock } from 'lucide-react';
import type { Reward } from '../types/rewards';
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
        {variant === 'expiring' ? <Clock size={17} /> : <ChevronRight size={17} />}
      </div>
      <div className="reward-row__copy">
        <div>
          <ProductBadge products={reward.products} />
          <span>{variant === 'expiring' ? formatExpiry(reward.expiresInHours) : reward.rewardTypeDisplayName}</span>
        </div>
        <h3>{reward.title}</h3>
        <p>{reward.description}</p>
      </div>
      <button type="button" className="row-action" disabled={!reward.action.enabled} onClick={() => onAction(reward)}>
        {reward.action.label}
      </button>
    </article>
  );
}

function formatExpiry(hours: number | null) {
  if (hours === null) {
    return 'No expiry';
  }

  if (hours < 24) {
    return `${Math.max(1, Math.round(hours))}h left`;
  }

  return `${Math.round(hours / 24)}d left`;
}
