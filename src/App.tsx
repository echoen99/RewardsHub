import { useEffect, useState } from 'react';
import { getRewardsHubData } from './api/rewardsApi';
import { CashierDrawer } from './components/CashierDrawer';
import { CashierRewardsPanel } from './components/CashierRewardsPanel';
import { RewardsEntryWidget } from './components/RewardsEntryWidget';
import { RewardsCentreDrawer } from './components/RewardsCentreDrawer';
import { fallbackRewardsHubData } from './data/fallbackRewards';
import type { CashierEligibleReward, Reward, RewardsHubData } from './types/rewards';
import { getRewardDisplayTitle } from './utils/rewardDisplay';

function App() {
  const [data, setData] = useState<RewardsHubData>(fallbackRewardsHubData);
  const [appliedRewardIds, setAppliedRewardIds] = useState<string[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const [cashierOffer, setCashierOffer] = useState<Reward | null>(null);

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

    if (reward.status === 'AvailableOffer') {
      setCashierOffer(reward);
      setIsDrawerOpen(false);
      setStatusMessage(null);
      return;
    }

    if (reward.action.type === 'DeepLink' && reward.action.url) {
      setStatusMessage(`Opening ${getRewardDisplayTitle(reward)}`);
      return;
    }

    if (reward.action.type === 'MockApply') {
      setAppliedRewardIds((currentIds) =>
        currentIds.includes(reward.rewardId) ? currentIds : [...currentIds, reward.rewardId]
      );
      setStatusMessage(reward.action.confirmationMessage ?? `${getRewardDisplayTitle(reward)} applied.`);
      return;
    }

    setStatusMessage(`Viewing ${getRewardDisplayTitle(reward)}`);
  }

  function handleDepositConfirmed(reward: Reward) {
    setAppliedRewardIds((currentIds) =>
      currentIds.includes(reward.rewardId) ? currentIds : [...currentIds, reward.rewardId]
    );
    setCashierOffer(null);
    setIsDrawerOpen(true);
    setStatusMessage(`${getRewardDisplayTitle(reward)} applied. Your rewards are waiting in Rewards Centre.`);
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

      {cashierOffer ? (
        <div className="drawer-overlay">
          <CashierDrawer
            offer={cashierOffer}
            player={data.player}
            onClose={() => {
              setCashierOffer(null);
              setIsDrawerOpen(true);
            }}
            onViewRewardsCentre={handleDepositConfirmed}
          />
        </div>
      ) : null}

      {isDrawerOpen && !cashierOffer ? (
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
