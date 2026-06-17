import type { ReactNode } from 'react';

type RewardsSectionProps = {
  title: string;
  count?: number;
  children: ReactNode;
  emptyMessage?: string;
  onViewAll?: () => void;
};

export function RewardsSection({ title, count, children, emptyMessage, onViewAll }: RewardsSectionProps) {
  const hasItems = count === undefined || count > 0;

  return (
    <section className="rewards-section" aria-labelledby={`${title.toLowerCase().replaceAll(' ', '-')}-title`}>
      <div className="rewards-section__header">
        <h2 id={`${title.toLowerCase().replaceAll(' ', '-')}-title`}>{title}</h2>
        {typeof count === 'number' && count > 0 ? (
          <button type="button" className="text-action" onClick={onViewAll}>
            View all ({count})
          </button>
        ) : null}
      </div>
      {hasItems ? children : <p className="empty-state">{emptyMessage ?? 'Nothing here right now.'}</p>}
    </section>
  );
}
