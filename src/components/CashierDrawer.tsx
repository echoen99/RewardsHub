import {
  CheckCircle,
  CreditCard,
  Gift,
  HeartHandshake,
  History,
  Lock,
  ShieldCheck,
  X
} from 'lucide-react';
import { useState } from 'react';
import type { Player, Reward } from '../types/rewards';
import { formatCurrencyAmount, getRewardDisplayTitle } from '../utils/rewardDisplay';

type CashierDrawerProps = {
  offer: Reward;
  player: Player;
  onClose: () => void;
  onViewRewardsCentre: (offer: Reward) => void;
};

const depositAmounts = [30, 50, 100, 200, 500];
const paymentMethods = ['Visa / MC', 'Skrill', 'LuxonPay', 'Neteller'];
const cashierTabs = [
  { label: 'Deposit', intent: 'current deposit step', active: true },
  { label: 'Withdrawal - would open withdrawals', intent: 'would open withdrawals', active: false },
  { label: 'History - would open cashier history', intent: 'would open cashier history', active: false },
  { label: 'Limits - would open deposit limits', intent: 'would open deposit limits', active: false },
  { label: 'Responsible Gaming - would open safer gaming tools', intent: 'would open safer gaming tools', active: false }
];

export function CashierDrawer({ offer, player, onClose, onViewRewardsCentre }: CashierDrawerProps) {
  const [selectedAmount, setSelectedAmount] = useState(30);
  const [isConfirmed, setIsConfirmed] = useState(false);

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
              <button type="button" className={index === 0 ? 'payment-method payment-method--selected' : 'payment-method'} key={method}>
                {index === 0 ? method : `${method} - would switch payment method`}
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
            <button type="button" className="deposit-amount deposit-amount--muted">
              Other - would enter custom amount
            </button>
          </div>
        </section>

        <section className="cashier-step" aria-labelledby="applied-reward-title">
          <div className="cashier-step__label">
            <span>2</span>
            <h2 id="applied-reward-title">Applied reward</h2>
          </div>
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
            <h3>{getRewardDisplayTitle(offer)}</h3>
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
              <button type="button">View rules - would show offer rules</button>
              <button type="button">Remove reward - would remove applied reward</button>
            </div>
          </article>
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
          <strong>KICKOFF</strong>
          <small>You get €75 Bonus + €30 Free Bets</small>
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
            <p>Your {getRewardDisplayTitle(offer)} has been applied. Your rewards are waiting in Rewards Centre.</p>
            <button type="button" className="view-rewards-action" onClick={() => onViewRewardsCentre(offer)}>
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
