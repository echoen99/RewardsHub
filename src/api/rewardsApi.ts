import { fallbackRewardsHubData } from '../data/fallbackRewards';
import type {
  CashierEligibleReward,
  EntryPoint,
  Player,
  Reward,
  RewardHistoryItem,
  RewardProgressSummary,
  RewardsHubData,
  RewardsOverview,
  RewardsUiState,
  RewardsWidget
} from '../types/rewards';

const apiBaseUrl = import.meta.env.VITE_REWARDS_API_BASE_URL ?? 'http://localhost:5136';
const playerId = import.meta.env.VITE_REWARDS_PLAYER_ID ?? '12345';

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`);

  if (!response.ok) {
    throw new Error(`Rewards API returned ${response.status} for ${path}`);
  }

  return response.json() as Promise<T>;
}

export async function getRewardsHubData(): Promise<RewardsHubData> {
  try {
    const [player, overview, widget, rewards, cashierRewards, history, progress, entryPoint, uiState] = await Promise.all([
      getJson<Player>(`/api/v1/players/${encodeURIComponent(playerId)}`),
      getJson<RewardsOverview>('/api/v1/rewards-centre/overview'),
      getJson<RewardsWidget>('/api/v1/rewards-centre/widget'),
      getJson<Reward[]>('/api/v1/rewards-centre/rewards'),
      getJson<CashierEligibleReward[]>('/api/v1/cashier/rewards/eligible'),
      getJson<RewardHistoryItem[]>('/api/v1/rewards-centre/history'),
      getJson<RewardProgressSummary>('/api/v1/rewards-centre/progress'),
      getJson<EntryPoint>('/api/v1/rewards-centre/entry-point'),
      getJson<RewardsUiState>('/api/v1/rewards-centre/ui-state')
    ]);

    return { player, overview, widget, rewards, cashierRewards, history, progress, entryPoint, uiState };
  } catch (error) {
    console.warn('Rewards API unavailable, using RewardsHub development data.', error);
    return fallbackRewardsHubData;
  }
}

export async function getRewardDetails(rewardId: string): Promise<Reward> {
  return getJson<Reward>(`/api/v1/rewards-centre/rewards/${rewardId}`);
}

export async function getCashierEligibleRewards(): Promise<CashierEligibleReward[]> {
  return getJson<CashierEligibleReward[]>('/api/v1/cashier/rewards/eligible');
}
