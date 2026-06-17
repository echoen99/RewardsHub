import { ArrowRight } from 'lucide-react';
import type { Reward } from '../types/rewards';
import { ProductBadge } from './ProductBadge';
import { ProgressBar } from './ProgressBar';

type ProgressRewardCardProps = {
  reward: Reward;
  onAction: (reward: Reward) => void;
};

export function ProgressRewardCard({ reward, onAction }: ProgressRewardCardProps) {
  return (
    <article className="reward-card reward-card--progress">
      <div className="reward-card__header">
        <ProductBadge products={reward.products} />
        <span className="reward-type">{reward.rewardTypeDisplayName}</span>
      </div>
      <h3>{reward.title}</h3>
      <p className="reward-description">{reward.description}</p>
      <ProgressBar percentage={reward.progress?.percentage ?? 0} label={reward.progress?.label ?? '0 of 0'} />
      <button type="button" className="secondary-action" disabled={!reward.action.enabled} onClick={() => onAction(reward)}>
        {reward.action.label}
        <ArrowRight size={15} />
      </button>
    </article>
  );
}
