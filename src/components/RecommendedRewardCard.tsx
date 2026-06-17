import { ArrowRight, Clock } from 'lucide-react';
import type { Reward } from '../types/rewards';
import { ProductBadge } from './ProductBadge';

type RecommendedRewardCardProps = {
  reward: Reward;
  onAction: (reward: Reward) => void;
};

export function RecommendedRewardCard({ reward, onAction }: RecommendedRewardCardProps) {
  return (
    <article className="recommended-card">
      <div className="recommended-card__topline">
        <ProductBadge products={reward.products} />
        <span className="recommendation-chip">{reward.recommendationReason ?? 'Recommended'}</span>
      </div>
      <div className="recommended-card__body">
        <p>{reward.value.displayText}</p>
        <h3>{reward.title}</h3>
        <span>{reward.description}</span>
      </div>
      <div className="reward-card__footer">
        <span className="reward-meta">
          <Clock size={14} />
          {formatExpiry(reward.expiresInHours)}
        </span>
        <button type="button" className="primary-action" disabled={!reward.action.enabled} onClick={() => onAction(reward)}>
          {reward.action.label}
          <ArrowRight size={15} />
        </button>
      </div>
      <div className="carousel-dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </article>
  );
}

function formatExpiry(hours: number | null) {
  if (hours === null) {
    return 'No expiry';
  }

  if (hours < 24) {
    return `Expires in ${Math.max(1, Math.round(hours))}h`;
  }

  return `Expires in ${Math.round(hours / 24)}d`;
}
