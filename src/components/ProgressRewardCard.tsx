import { Gift, Info } from 'lucide-react';
import type { Reward } from '../types/rewards';
import { formatCurrencyCopy } from '../utils/rewardDisplay';
import { ProgressBar } from './ProgressBar';

type ProgressRewardCardProps = {
  reward: Reward;
  onAction: (reward: Reward) => void;
};

export function ProgressRewardCard({ reward, onAction }: ProgressRewardCardProps) {
  return (
    <article className="reward-card reward-card--progress" onClick={() => reward.action.enabled && onAction(reward)}>
      <div className="progress-card__top">
        <div>
          <h3>
            {reward.title}
            <Info size={13} aria-hidden="true" />
          </h3>
          <p className="reward-description">{formatCurrencyCopy(reward.description)}</p>
        </div>
        <span className="progress-card__gift" aria-hidden="true">
          <Gift size={17} />
        </span>
      </div>
      <ProgressBar percentage={reward.progress?.percentage ?? 0} label={reward.progress?.label ?? '0 of 0'} />
      <span className="progress-card__percent">{reward.progress?.percentage ?? 0}%</span>
    </article>
  );
}
