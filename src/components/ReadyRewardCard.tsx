import { ArrowRight, Clock } from 'lucide-react';
import type { Reward } from '../types/rewards';
import { ProductBadge } from './ProductBadge';

type ReadyRewardCardProps = {
  reward: Reward;
  onAction: (reward: Reward) => void;
};

export function ReadyRewardCard({ reward, onAction }: ReadyRewardCardProps) {
  return (
    <article className="reward-card reward-card--ready">
      <div className="reward-card__header">
        <ProductBadge products={reward.products} />
        <span className="reward-meta">
          <Clock size={14} />
          {formatExpiry(reward.expiresInHours)}
        </span>
      </div>
      <p className="reward-value">{reward.value.displayText}</p>
      <h3>{reward.title}</h3>
      <span className="reward-description">{reward.description}</span>
      <button type="button" className="secondary-action" disabled={!reward.action.enabled} onClick={() => onAction(reward)}>
        {reward.action.label}
        <ArrowRight size={15} />
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
