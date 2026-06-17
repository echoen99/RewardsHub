import type { Reward } from '../types/rewards';
import { formatRecommendedExpiry, getRewardActionIntent, getRewardDisplayTitle } from '../utils/rewardDisplay';
import { ProductBadge } from './ProductBadge';

type RecommendedRewardCardProps = {
  reward: Reward;
  onAction: (reward: Reward) => void;
};

export function RecommendedRewardCard({ reward, onAction }: RecommendedRewardCardProps) {
  const showBodyDescription = !reward.description.toLowerCase().startsWith('expires');

  return (
    <article className="recommended-card">
      <div className="recommended-card__topline">
        <ProductBadge products={reward.products} />
      </div>
      <div className="recommended-card__body">
        <h3>{getRewardDisplayTitle(reward)}</h3>
        <p>{reward.recommendationReason ?? 'Based on your slot play'}</p>
        {showBodyDescription ? <span>{reward.description}</span> : null}
      </div>
      <div className="reward-card__footer">
        <span className="reward-meta">
          {formatRecommendedExpiry(reward.expiresInHours)}
        </span>
        <button
          type="button"
          className="primary-action"
          title={getRewardActionIntent(reward)}
          disabled={!reward.action.enabled}
          onClick={() => onAction(reward)}
        >
          PLAY NOW
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
