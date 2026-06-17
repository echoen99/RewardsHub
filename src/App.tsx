import { useEffect, useState } from 'react';
import { getRewardsHubData } from './api/rewardsApi';
import { CashierRewardsPanel } from './components/CashierRewardsPanel';
import { RewardsEntryWidget } from './components/RewardsEntryWidget';
import { RewardsCentreDrawer } from './components/RewardsCentreDrawer';
import { fallbackRewardsHubData } from './data/fallbackRewards';
import type { CashierEligibleReward, Reward, RewardsHubData } from './types/rewards';

function App() {
  const [data, setData] = useState<RewardsHubData>(fallbackRewardsHubData);
  const [appliedRewardIds, setAppliedRewardIds] = useState<string[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  useEffect(() => {
    let isMounted = true;

    getRewardsHubData().then((rewardsData) => {
      if (isMounted) {
        setData(rewardsData);
        setIsUsingFallback(rewardsData === fallbackRewardsHubData);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  function handleRewardAction(reward: Reward) {
    if (!reward.action.enabled) {
      return;
    }

    if (reward.action.type === 'DeepLink' && reward.action.url) {
      setStatusMessage(`Opening ${reward.title}`);
      return;
    }

    if (reward.action.type === 'MockApply') {
      setAppliedRewardIds((currentIds) =>
        currentIds.includes(reward.rewardId) ? currentIds : [...currentIds, reward.rewardId]
      );
      setStatusMessage(reward.action.confirmationMessage ?? `${reward.title} applied.`);
      return;
    }

    setStatusMessage(`Viewing ${reward.title}`);
  }

  function handleCashierApply(reward: CashierEligibleReward) {
    if (!reward.cashierAction.enabled) {
      return;
    }

    setAppliedRewardIds((currentIds) =>
      currentIds.includes(reward.rewardId) ? currentIds : [...currentIds, reward.rewardId]
    );
    setStatusMessage(reward.cashierAction.confirmationMessage ?? `${reward.title} applied.`);
  }

  return (
    <main className="app-shell">
      <div className="host-page">
        <div className="host-page__topbar" />
        <div className="host-page__content">
          <div className="host-page__intro">
            <span>RewardsHub</span>
            <h1>My Account</h1>
            <p>{data.entryPoint.message}</p>
          </div>

          <div className="host-page__grid">
            <RewardsEntryWidget widget={data.widget} onOpen={() => setIsDrawerOpen(true)} />
            <CashierRewardsPanel
              rewards={data.cashierRewards}
              appliedRewardIds={appliedRewardIds}
              onApply={handleCashierApply}
            />
          </div>

          {isUsingFallback ? <p className="fallback-note">Development data is active while the API is unavailable.</p> : null}
        </div>
      </div>

      {isDrawerOpen ? (
        <div className="drawer-overlay">
          <RewardsCentreDrawer
            data={data}
            appliedRewardIds={appliedRewardIds}
            onAction={handleRewardAction}
            isLoading={isLoading}
            onClose={() => {
              setIsDrawerOpen(false);
              setStatusMessage('Rewards Centre closed');
            }}
          />
        </div>
      ) : null}

      {statusMessage ? (
        <div className="toast" role="status">
          {statusMessage}
        </div>
      ) : null}
    </main>
  );
}

export default App;
