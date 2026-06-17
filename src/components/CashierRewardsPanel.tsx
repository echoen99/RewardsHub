import { BadgeEuro, CheckCircle, CreditCard } from 'lucide-react';
import type { CashierEligibleReward } from '../types/rewards';

type CashierRewardsPanelProps = {
  rewards: CashierEligibleReward[];
  appliedRewardIds: string[];
  onApply: (reward: CashierEligibleReward) => void;
};

export function CashierRewardsPanel({ rewards, appliedRewardIds, onApply }: CashierRewardsPanelProps) {
  return (
    <section className="cashier-panel" aria-labelledby="cashier-rewards-title">
      <div className="cashier-panel__header">
        <div className="cashier-panel__mark" aria-hidden="true">
          <CreditCard size={18} />
        </div>
        <div>
          <h2 id="cashier-rewards-title">Cashier rewards</h2>
          <p>Eligible rewards for this deposit</p>
        </div>
      </div>

      <div className="cashier-panel__list">
        {rewards.length > 0 ? (
          rewards.map((reward) => {
            const isApplied = appliedRewardIds.includes(reward.rewardId);

            return (
              <article className="cashier-reward" key={reward.rewardId}>
                <div className="cashier-reward__icon" aria-hidden="true">
                  {isApplied ? <CheckCircle size={17} /> : <BadgeEuro size={17} />}
                </div>
                <div>
                  <h3>{reward.title}</h3>
                  <p>{isApplied ? 'Applied to this session' : formatStatus(reward.status)}</p>
                </div>
                <button
                  type="button"
                  className="cashier-reward__action"
                  disabled={!reward.cashierAction.enabled || isApplied}
                  onClick={() => onApply(reward)}
                >
                  {isApplied ? 'Applied' : reward.cashierAction.label}
                </button>
              </article>
            );
          })
        ) : (
          <p className="empty-state">No cashier rewards are eligible right now.</p>
        )}
      </div>
    </section>
  );
}

function formatStatus(status: CashierEligibleReward['status']) {
  if (status === 'AvailableOffer') {
    return 'Available at cashier';
  }

  if (status === 'ReadyNow') {
    return 'Ready to use';
  }

  return status.replace(/([a-z])([A-Z])/g, '$1 $2');
}
