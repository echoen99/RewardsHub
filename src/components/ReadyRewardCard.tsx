import type { Reward } from '../types/rewards';
import { formatReadyExpiry, getRewardActionIntent, getRewardDisplayValue } from '../utils/rewardDisplay';
import { ProductBadge } from './ProductBadge';

type ReadyRewardCardProps = {
  reward: Reward;
  onAction: (reward: Reward) => void;
};

export function ReadyRewardCard({ reward, onAction }: ReadyRewardCardProps) {
  const primaryProduct = reward.products[0]?.toLowerCase() ?? 'crossproduct';

  return (
    <article className={`reward-card reward-card--ready reward-card--${primaryProduct}`}>
      <div className="reward-card__header">
        <ProductBadge products={reward.products} />
      </div>
      <p className="reward-value">{getRewardDisplayValue(reward)}</p>
      <h3>{reward.title}</h3>
      <span className="reward-description">{reward.description}</span>
      <span className="reward-meta reward-meta--expiry">{formatReadyExpiry(reward)}</span>
      <button
        type="button"
        className="secondary-action"
        title={getRewardActionIntent(reward)}
        disabled={!reward.action.enabled}
        onClick={() => onAction(reward)}
      >
        {reward.action.label.toUpperCase()}
      </button>
    </article>
  );
}
