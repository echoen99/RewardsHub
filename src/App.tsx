import { useEffect, useState } from 'react';
import { getRewardsHubData } from './api/rewardsApi';
import { RewardsCentreDrawer } from './components/RewardsCentreDrawer';
import { fallbackRewardsHubData } from './data/fallbackRewards';
import type { Reward, RewardsHubData } from './types/rewards';

function App() {
  const [data, setData] = useState<RewardsHubData>(fallbackRewardsHubData);
  const [appliedRewardIds, setAppliedRewardIds] = useState<string[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    getRewardsHubData().then((rewardsData) => {
      if (isMounted) {
        setData(rewardsData);
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

  return (
    <main className="app-shell">
      <div className="host-page" aria-hidden="true">
        <div className="host-page__topbar" />
        <div className="host-page__content">
          <span>RewardsHub</span>
          <h1>Casino lobby</h1>
          <div className="host-page__tiles">
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>

      <div className="drawer-overlay">
        <RewardsCentreDrawer
          data={data}
          appliedRewardIds={appliedRewardIds}
          onAction={handleRewardAction}
          onClose={() => setStatusMessage('Rewards Centre closed')}
        />
      </div>

      {statusMessage ? (
        <div className="toast" role="status">
          {statusMessage}
        </div>
      ) : null}
    </main>
  );
}

export default App;
