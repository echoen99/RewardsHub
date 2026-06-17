import { Flame, Gift, Sparkles, Trophy } from 'lucide-react';
import type { RewardsOverview } from '../types/rewards';

type RewardsSummaryStatsProps = {
  overview: RewardsOverview;
};

export function RewardsSummaryStats({ overview }: RewardsSummaryStatsProps) {
  const stats = [
    { label: 'Ready', value: overview.readyRewardsCount, icon: Gift },
    { label: 'Progress', value: overview.inProgressRewardsCount, icon: Trophy },
    { label: 'Expiring', value: overview.expiringSoonCount, icon: Flame },
    { label: overview.pointsName, value: overview.pointsBalance.toLocaleString(), icon: Sparkles }
  ];

  return (
    <section className="summary-grid" aria-label="Rewards summary">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div className="summary-tile" key={stat.label}>
            <Icon size={16} aria-hidden="true" />
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        );
      })}
    </section>
  );
}
