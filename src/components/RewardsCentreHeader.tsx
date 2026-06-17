import { Gift, X } from 'lucide-react';
import type { Player } from '../types/rewards';

type RewardsCentreHeaderProps = {
  player: Player;
  onClose: () => void;
};

export function RewardsCentreHeader({ player, onClose }: RewardsCentreHeaderProps) {
  return (
    <header className="rewards-header">
      <div className="rewards-header__mark" aria-hidden="true">
        <Gift size={20} />
      </div>
      <div className="rewards-header__copy">
        <p>Rewards Centre</p>
        <h1>{`Hi ${player.displayName}, here are your rewards`}</h1>
      </div>
      <button type="button" className="icon-button" aria-label="Close rewards centre" onClick={onClose}>
        <X size={18} />
      </button>
    </header>
  );
}
