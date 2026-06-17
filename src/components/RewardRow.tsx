import { useEffect, useMemo, useState } from 'react';
import { ChevronRight, Star } from 'lucide-react';
import type { Reward } from '../types/rewards';
import { getRewardActionIntent, getRewardDisplayDescription, getRewardDisplayTitle } from '../utils/rewardDisplay';
import { ProductBadge } from './ProductBadge';

type RewardRowProps = {
  reward: Reward;
  variant: 'expiring' | 'offer';
  onAction: (reward: Reward) => void;
};

export function RewardRow({ reward, variant, onAction }: RewardRowProps) {
  const countdownDeadline = useMemo(() => getCountdownDeadline(reward), [reward.expiresAt, reward.expiresInHours, reward.rewardId]);
  const countdownLabel = useLiveCountdown(countdownDeadline);

  return (
    <article className={`reward-row reward-row--${variant}`}>
      <div className="reward-row__icon" aria-hidden="true">
        {variant === 'expiring' ? <Star size={17} /> : <ChevronRight size={17} />}
      </div>
      <div className="reward-row__copy">
        <div>
          <ProductBadge products={reward.products} />
          <span>{variant === 'expiring' ? countdownLabel : reward.rewardTypeDisplayName}</span>
        </div>
        <h3>{getRewardDisplayTitle(reward)}</h3>
        <p>{getRewardDisplayDescription(reward)}</p>
      </div>
      <button type="button" className="row-action" title={getRewardActionIntent(reward)} disabled={!reward.action.enabled} onClick={() => onAction(reward)}>
        <span>{reward.action.label}</span>
        <ChevronRight size={17} aria-hidden="true" />
      </button>
    </article>
  );
}

function useLiveCountdown(deadline: number | null) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (deadline === null) {
      return undefined;
    }

    const timerId = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timerId);
  }, [deadline]);

  if (deadline === null) {
    return 'No expiry';
  }

  return `Expires in ${formatDuration(deadline - now)}`;
}

function getCountdownDeadline(reward: Reward) {
  if (reward.expiresAt) {
    const expiresAt = new Date(reward.expiresAt).getTime();

    if (Number.isFinite(expiresAt)) {
      return expiresAt;
    }
  }

  if (reward.expiresInHours !== null) {
    return Date.now() + reward.expiresInHours * 60 * 60 * 1000;
  }

  return null;
}

function formatDuration(milliseconds: number) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':');
}
