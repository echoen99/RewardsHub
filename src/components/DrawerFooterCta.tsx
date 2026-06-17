import { ArrowRight } from 'lucide-react';
import type { RewardProgressSummary } from '../types/rewards';
import { ProgressBar } from './ProgressBar';

type DrawerFooterCtaProps = {
  progress: RewardProgressSummary;
  onViewHub: () => void;
};

export function DrawerFooterCta({ progress, onViewHub }: DrawerFooterCtaProps) {
  return (
    <footer className="drawer-footer">
      <div>
        <p>Next gift</p>
        <strong>{progress.message}</strong>
      </div>
      <ProgressBar percentage={progress.progressPercentage} />
      <button type="button" className="footer-action" title="Not yet implemented" onClick={onViewHub}>
        VIEW ALL REWARDS HUB
        <ArrowRight size={15} />
      </button>
    </footer>
  );
}
