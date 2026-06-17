import { ArrowRight } from 'lucide-react';
import type { RewardProgressSummary } from '../types/rewards';
import { ProgressBar } from './ProgressBar';

type DrawerFooterCtaProps = {
  progress: RewardProgressSummary;
};

export function DrawerFooterCta({ progress }: DrawerFooterCtaProps) {
  return (
    <footer className="drawer-footer">
      <div>
        <p>Next gift</p>
        <strong>{progress.message}</strong>
      </div>
      <ProgressBar percentage={progress.progressPercentage} />
      <button type="button" className="footer-action" title="would open full hub">
        VIEW ALL REWARDS HUB
        <ArrowRight size={15} />
      </button>
    </footer>
  );
}
