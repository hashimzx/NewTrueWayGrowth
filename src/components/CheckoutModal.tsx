import React, { useState } from 'react';
import { Course, SubscriptionTier, User } from '../types';
import confetti from 'canvas-confetti';
import { 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Copy, 
  Check, 
  Sparkles,
  BookOpen
} from 'lucide-react';

interface CheckoutModalProps {
  item: Course | SubscriptionTier | null;
  currency: 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD';
  currentUser: User | null;
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (itemId: string, itemType: 'course' | 'subscription') => void;
  onNavigateToQaida: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  item,
  currency,
  currentUser,
  isOpen,
  onClose,
  onPaymentSuccess,
  onNavigateToQaida
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [cardHolder, setCardHolder] = useState(currentUser?.name || '');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !item) return null;

  const isCourse = 'syllabus' in item;
  const price = item.prices[currency];

  const getCurrencySymbol = (curr: string) => {
    switch (curr) {
      case 'GBP': return '£';
      case 'EUR': return '€';
      case 'CAD': return 'CA$';
      case 'AUD': return 'AU$';
      default: return '$';
    }
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      onPaymentSuccess(item.id, isCourse ? 'course' : 'subscription');
    }, 1200);
  };

  const enrollmentCode = `TWG-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-red-600/20 text-red-500 rounded-lg">
              <Lock className="w-4 h-4" />
            </span>
            <span className="text-sm font-bold text-white">
              {isCompleted ? 'Enrollment Confirmed' : 'Secure International Checkout'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isCompleted ? (
          /* Post Payment Success View */
          <div className="p-8 space-y-6 text-center">
            <div className="w-16 h-16 bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white">
                Alhamdulillah! Payment Successful
              </h3>
              <p className="text-xs text-zinc-400">
                You now have full access to <strong className="text-white">{'title' in item ? item.title : item.name}</strong>.
              </p>
            </div>

            {/* Access Pass Credentials Box */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-left space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs">
                <span className="text-zinc-400">Enrollment Pass ID:</span>
                <span className="font-mono font-bold text-red-400">{enrollmentCode}</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs">
                <span className="text-zinc-400">Student Account:</span>
                <span className="font-semibold text-white">{currentUser?.email || 'Registered User'}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Course Access:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Instant & Unlimited
                </span>
              </div>
            </div>

            {/* Direct Start Button */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  onClose();
                  onNavigateToQaida();
                }}
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 glow-red-sm"
              >
                <BookOpen className="w-4 h-4" />
                <span>Begin First Lesson Now</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.origin);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="text-xs text-zinc-400 hover:text-white flex items-center justify-center gap-1 mx-auto"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Portal Link Copied!' : 'Copy Direct Student Portal Link'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Payment Form */
          <form onSubmit={handlePay} className="p-6 space-y-6">
            
            {/* Order Item Summary */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-red-500 tracking-wider">
                  {isCourse ? 'Course Enrollment' : 'Subscription Plan'}
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">
                  {'title' in item ? item.title : item.name}
                </h4>
                <p className="text-xs text-zinc-400">
                  {isCourse ? `${(item as Course).totalLessons} Lessons & Certified Tutors` : (item as SubscriptionTier).period}
                </p>
              </div>

              <div className="text-right">
                <span className="text-2xl font-black text-white">
                  {getCurrencySymbol(currency)}{price}
                </span>
                <span className="block text-[10px] text-zinc-500 uppercase">{currency}</span>
              </div>
            </div>

            {/* Payment Method Switcher */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300 block">Select Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-bold transition flex flex-col items-center gap-1 ${
                    paymentMethod === 'card'
                      ? 'border-red-600 bg-zinc-900 text-white'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:bg-zinc-900'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-red-500" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-3 rounded-xl border text-xs font-bold transition flex flex-col items-center gap-1 ${
                    paymentMethod === 'apple_pay'
                      ? 'border-red-600 bg-zinc-900 text-white'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:bg-zinc-900'
                  }`}
                >
                  <span className="text-base leading-none"></span>
                  <span>Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-3 rounded-xl border text-xs font-bold transition flex flex-col items-center gap-1 ${
                    paymentMethod === 'paypal'
                      ? 'border-red-600 bg-zinc-900 text-white'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:bg-zinc-900'
                  }`}
                >
                  <span className="text-xs text-blue-400 font-extrabold italic">P</span>
                  <span>PayPal</span>
                </button>
              </div>
            </div>

            {/* Card Inputs */}
            {paymentMethod === 'card' && (
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    required
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder="e.g. Hashim Zafar"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 •••• •••• 4242"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      required
                      defaultValue="08/29"
                      placeholder="MM/YY"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                      CVC / CVV
                    </label>
                    <input
                      type="text"
                      required
                      defaultValue="888"
                      placeholder="CVC"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Guarantee and Submit */}
            <div className="space-y-3 pt-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg hover:shadow-red-600/30 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay {getCurrencySymbol(currency)}{price} & Enroll</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>256-Bit SSL Encrypted International Payment</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
