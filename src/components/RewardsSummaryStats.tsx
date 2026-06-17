import { AlertTriangle, CheckCircle, Clock3, Star } from 'lucide-react';
import type { RewardsOverview } from '../types/rewards';

type RewardsSummaryStatsProps = {
  overview: RewardsOverview;
};

export function RewardsSummaryStats({ overview }: RewardsSummaryStatsProps) {
  const stats = [
    { label: 'Ready now', value: overview.readyRewardsCount, icon: CheckCircle, tone: 'success' },
    { label: 'In progress', value: overview.inProgressRewardsCount, icon: Clock3, tone: 'info' },
    { label: 'Expiring soon', value: overview.expiringSoonCount, icon: AlertTriangle, tone: 'warning' },
    { label: overview.pointsName, value: overview.pointsBalance.toLocaleString(), icon: Star, tone: 'points' }
  ];

  return (
    <section className="summary-grid" aria-label="Rewards summary">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div className={`summary-tile summary-tile--${stat.tone}`} key={stat.label}>
            <Icon size={16} aria-hidden="true" />
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        );
      })}
    </section>
  );
}
