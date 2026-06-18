import {
  CheckCircle,
  CreditCard,
  Gift,
  HeartHandshake,
  History,
  Info,
  Lock,
  ShieldCheck,
  X,
  Zap
} from 'lucide-react';
import { useState } from 'react';
import type { Player, Reward } from '../types/rewards';
import { formatCurrencyAmount, getRewardDisplayDescription, getRewardDisplayTitle } from '../utils/rewardDisplay';

type CashierDrawerProps = {
  offer: Reward | null;
  availableOffer: Reward | null;
  player: Player;
  onClose: () => void;
  onViewRewardsCentre: (offer: Reward | null, amount: number) => void;
  onApplyOffer?: (offer: Reward) => Promise<void> | void;
  onRemoveOffer?: (offer: Reward) => Promise<void> | void;
};

const depositAmounts = [30, 50, 100, 200, 500];
const paymentMethods = ['Visa / MC', 'Skrill', 'LuxonPay', 'Neteller'];
const cashierTabs = [
  { label: 'Deposit', intent: 'current deposit step', active: true },
  { label: 'Withdrawal', intent: 'would open withdrawals', active: false },
  { label: 'History', intent: 'would open cashier history', active: false },
  { label: 'Limits', intent: 'would open deposit limits', active: false },
  { label: 'Responsible Gaming', intent: 'would open safer gaming tools', active: false }
];

export function CashierDrawer({
  offer,
  availableOffer,
  player,
  onClose,
  onViewRewardsCentre,
  onApplyOffer,
  onRemoveOffer
}: CashierDrawerProps) {
  const [selectedAmount, setSelectedAmount] = useState(30);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [appliedOffer, setAppliedOffer] = useState<Reward | null>(offer);

  async function handleApplyOffer(nextOffer: Reward) {
    await onApplyOffer?.(nextOffer);
    setAppliedOffer(nextOffer);
  }

  async function handleRemoveOffer(nextOffer: Reward) {
    await onRemoveOffer?.(nextOffer);
    setAppliedOffer(null);
  }

  return (
    <aside className="cashier-drawer" aria-label="Cashier">
      <header className="cashier-header">
        <div className="cashier-header__brand" aria-hidden="true">
          888
        </div>
        <div className="cashier-header__copy">
          <h1>Cashier</h1>
          <p>
            Cash <strong>€0.00</strong>
            <span>Bonus €5.00</span>
          </p>
        </div>
        <span className="cashier-promo">
          <Gift size={13} />
          KICKOFF
        </span>
        <button type="button" className="icon-button" aria-label="Close cashier" onClick={onClose}>
          <X size={18} />
        </button>
      </header>

      <nav className="cashier-tabs" aria-label="Cashier sections">
        {cashierTabs.map((tab) => (
          <button
            type="button"
            className={tab.active ? 'cashier-tabs__tab cashier-tabs__tab--active' : 'cashier-tabs__tab'}
            title={tab.intent}
            key={tab.label}
          >
            {tab.label.startsWith('History') ? <History size={14} /> : null}
            {tab.label.startsWith('Responsible') ? <HeartHandshake size={14} /> : null}
            {tab.label}
          </button>
        ))}
      </nav>

      <div className={`cashier-content ${isConfirmed ? 'cashier-content--dimmed' : ''}`}>
        <section className="payment-methods" aria-labelledby="payment-method-title">
          <h2 id="payment-method-title">Payment method</h2>
          <div className="payment-methods__list">
            {paymentMethods.map((method, index) => (
              <button
                type="button"
                className={index === 0 ? 'payment-method payment-method--selected' : 'payment-method'}
                title={index === 0 ? 'selected payment method' : 'would switch payment method'}
                key={method}
              >
                {method}
              </button>
            ))}
          </div>
        </section>

        <section className="cashier-step" aria-labelledby="deposit-amount-title">
          <div className="cashier-step__label">
            <span>1</span>
            <h2 id="deposit-amount-title">Choose deposit amount</h2>
          </div>
          <div className="deposit-grid">
            {depositAmounts.map((amount) => (
              <button
                type="button"
                className={selectedAmount === amount ? 'deposit-amount deposit-amount--selected' : 'deposit-amount'}
                onClick={() => setSelectedAmount(amount)}
                key={amount}
              >
                {amount === 30 ? <span>Qualifies</span> : null}
                {formatCurrencyAmount(amount)}
              </button>
            ))}
            <button type="button" className="deposit-amount deposit-amount--muted" title="would enter custom amount">
              Other
            </button>
          </div>
        </section>

        <section className="cashier-step" aria-labelledby="applied-reward-title">
          <div className="cashier-step__label">
            <span>2</span>
            <h2 id="applied-reward-title">{appliedOffer ? 'Applied reward' : 'Available offer'}</h2>
          </div>
          {appliedOffer ? (
            <article className="applied-reward-card">
              <div className="applied-reward-card__header">
                <span>
                  <Gift size={16} />
                  Reward applied
                </span>
                <strong>
                  <CheckCircle size={13} />
                  Applied
                </strong>
              </div>
              <h3>{getRewardDisplayTitle(appliedOffer)}</h3>
              <div className="promo-code-row">
                <span>Promo code</span>
                <strong>KICKOFF</strong>
                <em>added automatically</em>
              </div>
              <div className="benefit-grid">
                <span>Up to €75 Casino Bonus</span>
                <span>€30 Sports Free Bets</span>
              </div>
              <p>Deposit €30 or more to qualify</p>
              <div className="applied-reward-card__actions">
                <button type="button" title="would show offer rules">View rules</button>
                <button type="button" title="remove applied reward" onClick={() => handleRemoveOffer(appliedOffer)}>
                  Remove reward
                </button>
              </div>
            </article>
          ) : availableOffer ? (
            <article className="cashier-available-offer">
              <div className="cashier-available-offer__flag">
                <span>
                  <Zap size={12} />
                  Featured
                </span>
                <strong>
                  <CheckCircle size={12} />
                  Eligible
                </strong>
              </div>
              <div className="cashier-available-offer__summary">
                <div className="cashier-available-offer__icon" aria-hidden="true">
                  <Info size={17} />
                </div>
                <div>
                  <h3>{getRewardDisplayTitle(availableOffer)}</h3>
                  <p>{getRewardDisplayDescription(availableOffer)}</p>
                </div>
                <button type="button" className="offer-opt-in-action" onClick={() => handleApplyOffer(availableOffer)}>
                  OPT IN
                </button>
              </div>
              <button type="button" className="available-offer__disclosure" title="would show offer rules">
                View rules
              </button>
            </article>
          ) : (
            <p className="empty-state">No available offers for this deposit.</p>
          )}
        </section>

        <section className="cashier-step" aria-labelledby="payment-info-title">
          <div className="cashier-step__label">
            <span>3</span>
            <h2 id="payment-info-title">Payment information</h2>
          </div>
          <div className="payment-form">
            <label className="payment-form__wide">
              Card number
              <span>
                <CreditCard size={15} />
                **** **** **** 4242
              </span>
            </label>
            <label>
              Security code (CVV)
              <span>***</span>
            </label>
            <label>
              Cardholder name
              <span>{player.displayName}</span>
            </label>
          </div>
        </section>
      </div>

      <footer className="cashier-footer">
        <div>
          <span>Deposit</span>
          <strong>{formatCurrencyAmount(selectedAmount)}</strong>
        </div>
        <div>
          <span>Promo</span>
          <strong>{appliedOffer ? 'KICKOFF' : 'None selected'}</strong>
          <small>{appliedOffer ? 'You get €75 Bonus + €30 Free Bets' : 'Opt in to an offer above'}</small>
        </div>
        <div className="cashier-footer__trust">
          <span>
            <ShieldCheck size={13} />
            SSL
          </span>
          <span>
            <Lock size={13} />
            Encrypted
          </span>
        </div>
        <button type="button" className="deposit-confirm-action" onClick={() => setIsConfirmed(true)}>
          Deposit {formatCurrencyAmount(selectedAmount)}
        </button>
      </footer>

      {isConfirmed ? (
        <div className="deposit-confirmation" role="dialog" aria-modal="true" aria-labelledby="deposit-confirmed-title">
          <div className="deposit-confirmation__card">
            <div className="deposit-confirmation__icon" aria-hidden="true">
              <CheckCircle size={30} />
            </div>
            <h2 id="deposit-confirmed-title">Deposit Confirmed</h2>
            <strong>{formatCurrencyAmount(selectedAmount)}</strong>
            <p>
              {appliedOffer
                ? `Your ${getRewardDisplayTitle(appliedOffer)} has been applied. Your rewards are waiting in Rewards Centre.`
                : 'Your deposit has been confirmed.'}
            </p>
            <button
              type="button"
              className="view-rewards-action"
              onClick={() => onViewRewardsCentre(appliedOffer, selectedAmount)}
            >
              <Gift size={15} />
              View in Rewards Centre
            </button>
            <button type="button" className="close-cashier-action" onClick={onClose}>
              Close cashier
            </button>
          </div>
        </div>
      ) : null}
    </aside>
  );
}
