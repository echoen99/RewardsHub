import { CheckCircle, ChevronDown, ChevronUp, Info, Zap } from 'lucide-react';
import { useState } from 'react';
import type { Reward } from '../types/rewards';
import { formatCurrencyAmount, formatExpiringCountdown, getRewardDisplayDescription, getRewardDisplayTitle, getRewardDisplayValue } from '../utils/rewardDisplay';
import { ProductBadge } from './ProductBadge';

type AvailableOfferCardProps = {
  reward: Reward;
  isApplied: boolean;
  onOptIn: (reward: Reward) => void;
};

export function AvailableOfferCard({ reward, isApplied, onOptIn }: AvailableOfferCardProps) {
  const [showRules, setShowRules] = useState(false);
  const restrictions = reward.rules.restrictions.slice(0, 2);
  const showProductBadge = !reward.products.includes('CrossProduct');

  return (
    <article className={`available-offer ${isApplied ? 'available-offer--applied' : ''}`}>
      <div className="available-offer__flag">
        <span>
          <Zap size={12} />
          Featured
        </span>
        <span className="available-offer__eligibility">
          <CheckCircle size={12} />
          {isApplied ? 'Applied' : 'Eligible'}
        </span>
      </div>
      <div className="available-offer__summary">
        <div className="available-offer__icon" aria-hidden="true">
          {isApplied ? <CheckCircle size={17} /> : <Info size={17} />}
        </div>

        <div className="available-offer__copy">
          <div className="available-offer__meta">
            {showProductBadge ? <ProductBadge products={reward.products} /> : null}
            {reward.rewardTypeDisplayName ? <span>{reward.rewardTypeDisplayName}</span> : null}
          </div>
          <h3>{getRewardDisplayTitle(reward)}</h3>
          <p>{getRewardDisplayDescription(reward)}</p>
        </div>

        <button
          type="button"
          className={isApplied ? 'offer-applied-action' : 'offer-opt-in-action'}
          disabled={isApplied || !reward.action.enabled}
          onClick={() => onOptIn(reward)}
        >
          {isApplied ? 'Applied' : 'OPT IN'}
        </button>
      </div>

      <button type="button" className="available-offer__disclosure" onClick={() => setShowRules((current) => !current)}>
        View rules
        {showRules ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>

      {showRules ? (
        <div className="available-offer__flow">
          <div className="available-offer__flow-header">
            <strong>Offer rules</strong>
          </div>

          <dl className="available-offer__details">
              <div>
                <dt>Reward</dt>
                <dd>{getRewardDisplayValue(reward)}</dd>
              </div>
            {reward.rules.minimumDeposit !== null ? (
              <div>
                <dt>Min deposit</dt>
                <dd>{formatCurrencyAmount(reward.rules.minimumDeposit)}</dd>
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
              <dd>{formatExpiringCountdown(reward)}</dd>
            </div>
          </dl>

          {restrictions.length > 0 ? (
            <ul className="available-offer__terms">
              {restrictions.map((restriction) => (
                <li key={restriction}>{restriction}</li>
              ))}
            </ul>
          ) : null}
        </div>
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
