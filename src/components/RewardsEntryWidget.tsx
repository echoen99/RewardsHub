import { ArrowRight, CheckCircle, Clock, Gift, Sparkles, Star } from 'lucide-react';
import type { RewardsWidget } from '../types/rewards';
import { ProgressBar } from './ProgressBar';

type RewardsEntryWidgetProps = {
  widget: RewardsWidget;
  onOpen: () => void;
};

const badgeIcons = {
  CheckCircle,
  Clock,
  Gift,
  Sparkles,
  Star
};

export function RewardsEntryWidget({ widget, onOpen }: RewardsEntryWidgetProps) {
  const AccentIcon = badgeIcons[widget.points.accentIcon as keyof typeof badgeIcons] ?? Sparkles;

  return (
    <section className="entry-widget" aria-labelledby="rewards-entry-title">
      <div className="entry-widget__header">
        <div className="entry-widget__mark" aria-hidden="true">
          <Gift size={20} />
        </div>
        <div>
          <h2 id="rewards-entry-title">{widget.title}</h2>
          <p>{widget.subtitle}</p>
        </div>
      </div>

      <div className="entry-widget__points">
        <div>
          <span>{widget.points.label}</span>
          <strong>{widget.points.balanceDisplay}</strong>
        </div>
        <AccentIcon size={22} aria-hidden="true" />
      </div>

      <div className="entry-widget__badges" aria-label="Rewards alerts">
        {widget.badges.map((badge) => {
          const BadgeIcon = badgeIcons[badge.icon as keyof typeof badgeIcons] ?? Gift;

          return (
            <span className={`entry-widget__badge entry-widget__badge--${badge.tone.toLowerCase()}`} key={badge.key}>
              <BadgeIcon size={14} aria-hidden="true" />
              {badge.label}
            </span>
          );
        })}
      </div>

      <ProgressBar percentage={widget.progress.percentage} label={widget.progress.label} />

      <button type="button" className="entry-widget__action" disabled={!widget.primaryAction.enabled} onClick={onOpen}>
        {widget.primaryAction.label}
        <ArrowRight size={16} />
      </button>
    </section>
  );
}
