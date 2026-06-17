import type { Reward } from '../types/rewards';

export function getRewardDisplayTitle(reward: Pick<Reward, 'title' | 'rewardType'>) {
  if (reward.rewardType === 'DepositOffer' && reward.title.toLowerCase().includes('world cup')) {
    return 'World Cup Welcome Offer';
  }

  return reward.title;
}

export function formatCurrencyAmount(amount: number) {
  return `€${amount}`;
}

export function formatCurrencyCopy(value: string) {
  return value.replace(/\bEUR\s+(\d+(?:\.\d{2})?)/g, '€$1');
}

export function getRewardDisplayValue(reward: Reward) {
  if (reward.rewardType === 'DepositOffer' && getRewardDisplayTitle(reward) === 'World Cup Welcome Offer') {
    return '100% up to €100 Bonus + €20 Free Bet';
  }

  return formatCurrencyCopy(reward.value.displayText);
}

export function getRewardDisplayDescription(reward: Reward) {
  if (reward.rewardType === 'DepositOffer' && getRewardDisplayTitle(reward) === 'World Cup Welcome Offer') {
    return '100% up to €100 Bonus + €20 Free Bet';
  }

  return formatCurrencyCopy(reward.description);
}

export function formatRecommendedExpiry(hours: number | null) {
  if (hours === null) {
    return 'No expiry';
  }

  if (hours < 24) {
    return `Expires in ${Math.max(1, Math.round(hours))} hours`;
  }

  const days = Math.max(1, Math.round(hours / 24));
  return `Expires in ${days} ${days === 1 ? 'day' : 'days'}`;
}

export function formatReadyExpiry(reward: Reward) {
  if (reward.expiresInHours === null) {
    return 'No expiry';
  }

  if (reward.products.includes('Sports') && reward.expiresInHours <= 24) {
    return 'Expires today 23:59';
  }

  if (reward.expiresInHours < 24) {
    return `Expires in ${Math.max(1, Math.round(reward.expiresInHours))} hours`;
  }

  const days = Math.max(1, Math.round(reward.expiresInHours / 24));
  return `Expires in ${days} ${days === 1 ? 'day' : 'days'}`;
}

export function formatExpiringCountdown(reward: Reward) {
  if (reward.expiresAt) {
    const millisecondsLeft = new Date(reward.expiresAt).getTime() - Date.now();

    if (Number.isFinite(millisecondsLeft) && millisecondsLeft > 0) {
      return `Expires in ${formatDuration(millisecondsLeft)}`;
    }
  }

  if (reward.expiresInHours !== null) {
    return `Expires in ${formatDuration(reward.expiresInHours * 60 * 60 * 1000)}`;
  }

  return 'No expiry';
}

function formatDuration(milliseconds: number) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':');
}
