import { CheckCircle, ChevronDown, ChevronUp, Clock, Info } from 'lucide-react';
import { useState } from 'react';
import type { Reward } from '../types/rewards';
import { ProductBadge } from './ProductBadge';

type AvailableOfferCardProps = {
  reward: Reward;
  isApplied: boolean;
  onOptIn: (reward: Reward) => void;
};

export function AvailableOfferCard({ reward, isApplied, onOptIn }: AvailableOfferCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const restrictions = reward.rules.restrictions.slice(0, 2);

  function handleConfirm() {
    onOptIn(reward);
    setIsExpanded(false);
  }

  return (
    <article className={`available-offer ${isApplied ? 'available-offer--applied' : ''}`}>
      <div className="available-offer__summary">
        <div className="available-offer__icon" aria-hidden="true">
          {isApplied ? <CheckCircle size={17} /> : <Info size={17} />}
        </div>

        <div className="available-offer__copy">
          <div className="available-offer__meta">
            <ProductBadge products={reward.products} />
            <span>{reward.rewardTypeDisplayName}</span>
          </div>
          <h3>{reward.title}</h3>
          <p>{reward.description}</p>
        </div>

        <button
          type="button"
          className={isApplied ? 'offer-applied-action' : 'offer-opt-in-action'}
          disabled={isApplied || !reward.action.enabled}
          onClick={() => setIsExpanded(true)}
        >
          {isApplied ? 'Applied' : 'Opt in'}
        </button>
      </div>

      {isExpanded && !isApplied ? (
        <div className="available-offer__flow">
          <div className="available-offer__flow-header">
            <strong>Opt in to this offer</strong>
            <button type="button" className="text-icon-action" aria-label="Collapse opt in details" onClick={() => setIsExpanded(false)}>
              <ChevronUp size={16} />
            </button>
          </div>

          <dl className="available-offer__details">
            <div>
              <dt>Reward</dt>
              <dd>{reward.value.displayText}</dd>
            </div>
            {reward.rules.minimumDeposit !== null ? (
              <div>
                <dt>Min deposit</dt>
                <dd>{formatCurrency(reward.rules.minimumDeposit, reward.value.currency)}</dd>
              </div>
            ) : null}
            {reward.rules.wageringRequirement ? (
              <div>
                <dt>Wagering</dt>
                <dd>{reward.rules.wageringRequirement}</dd>
              </div>
            ) : null}
            <div>
              <dt>Expiry</dt>
              <dd>{formatExpiry(reward.expiresInHours)}</dd>
            </div>
          </dl>

          {restrictions.length > 0 ? (
            <ul className="available-offer__terms">
              {restrictions.map((restriction) => (
                <li key={restriction}>{restriction}</li>
              ))}
            </ul>
          ) : null}

          <div className="available-offer__actions">
            <button type="button" className="confirm-opt-in-action" onClick={handleConfirm}>
              Confirm opt in
            </button>
            <button type="button" className="cancel-opt-in-action" onClick={() => setIsExpanded(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      {!isExpanded && !isApplied ? (
        <button type="button" className="available-offer__disclosure" onClick={() => setIsExpanded(true)}>
          Offer details
          <ChevronDown size={15} />
        </button>
      ) : null}

      {isApplied ? (
        <div className="available-offer__success" role="status">
          <CheckCircle size={15} />
          Opted in successfully
        </div>
      ) : null}
    </article>
  );
}

function formatCurrency(amount: number, currency: string) {
  if (currency === 'Spins') {
    return `${amount} spins`;
  }

  return `${currency} ${amount}`;
}

function formatExpiry(hours: number | null) {
  if (hours === null) {
    return 'No expiry';
  }

  if (hours < 24) {
    return `${Math.max(1, Math.round(hours))}h left`;
  }

  return `${Math.round(hours / 24)}d left`;
}
