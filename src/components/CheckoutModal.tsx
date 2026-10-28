import React, { useState } from 'react';
import { Course, SubscriptionTier, User } from '../types';
import confetti from 'canvas-confetti';
import { 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  X, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles,
  BookOpen,
  ArrowRight
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
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [cardHolder, setCardHolder] = useState(currentUser?.name || '');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [billingZip, setBillingZip] = useState('');
  const [paypalEmail, setPaypalEmail] = useState(currentUser?.email || '');
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

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = val.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 3) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }
    setCardExpiry(val);
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

  const enrollmentCode = `TWQ-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-white border border-purple-200 rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header with True Way Quran Gradient */}
        <div className="bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 bg-white/15 rounded-xl border border-white/20">
              <Lock className="w-4 h-4 text-pink-200" />
            </span>
            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-purple-200 block">
                True Way Quran Admissions
              </span>
              <h3 className="text-base sm:text-lg font-black text-white">
                {isCompleted ? 'Enrollment Confirmed' : 'Secure Online Purchase'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-purple-200 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isCompleted ? (
          /* Post Payment Success View */
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-[#6B1B7E]">
                Alhamdulillah! Payment Successful
              </h3>
              <p className="text-xs text-slate-600">
                You now have full access to <strong className="text-slate-900">{'title' in item ? item.title : item.name}</strong> via {paymentMethod === 'card' ? 'Credit/Debit Card' : 'PayPal'}.
              </p>
            </div>

            {/* Access Pass Credentials Box */}
            <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-5 text-left space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-purple-100 text-xs">
                <span className="text-slate-500">Enrollment Pass ID:</span>
                <span className="font-mono font-bold text-[#6B1B7E]">{enrollmentCode}</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-purple-100 text-xs">
                <span className="text-slate-500">Student Account:</span>
                <span className="font-semibold text-slate-800">{currentUser?.email || paypalEmail || 'Registered Student'}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Course Access:</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
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
                className="w-full py-3.5 bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] hover:opacity-95 text-white font-bold rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20 cursor-pointer"
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
                className="text-xs text-slate-500 hover:text-[#6B1B7E] flex items-center justify-center gap-1 mx-auto cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Portal Link Copied!' : 'Copy Direct Student Portal Link'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Payment Form */
          <form onSubmit={handlePay} className="p-6 space-y-5">
            
            {/* Order Item Summary */}
            <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#E0107F] tracking-wider">
                  {isCourse ? 'Course Enrollment' : 'Subscription Membership'}
                </span>
                <h4 className="text-base font-bold text-[#6B1B7E] mt-0.5">
                  {'title' in item ? item.title : item.name}
                </h4>
                <p className="text-xs text-slate-500">
                  {isCourse ? `${(item as Course).totalLessons} Lessons · Certified Ijazah Mentors` : (item as SubscriptionTier).period}
                </p>
              </div>

              <div className="text-right">
                <span className="text-2xl font-black text-[#6B1B7E]">
                  {getCurrencySymbol(currency)}{price}
                </span>
                <span className="block text-[10px] text-slate-500 uppercase">{currency}</span>
              </div>
            </div>

            {/* Payment Method Switcher: Card & PayPal */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Select Payment Method</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border-2 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#6B1B7E] bg-purple-50 text-[#6B1B7E] shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#E0107F]" />
                  <span>Credit / Debit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-3 rounded-2xl border-2 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                    paymentMethod === 'paypal'
                      ? 'border-[#0070BA] bg-blue-50/60 text-[#0070BA] shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-extrabold italic text-amber-500">P</span>
                  <span>PayPal Online</span>
                </button>
              </div>
            </div>

            {/* Card Inputs */}
            {paymentMethod === 'card' ? (
              <div className="space-y-3 bg-white border border-purple-100 rounded-2xl p-4">
                <div className="flex items-center justify-between border-b border-purple-50 pb-2">
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">
                    Card Information
                  </span>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                    <span className="px-1.5 py-0.5 bg-slate-100 rounded">VISA</span>
                    <span className="px-1.5 py-0.5 bg-slate-100 rounded">MC</span>
                    <span className="px-1.5 py-0.5 bg-slate-100 rounded">AMEX</span>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Cardholder Name *
                  </label>
                  <input
                    type="text"
                    required={paymentMethod === 'card'}
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder="e.g. Hashim Zafar"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#6B1B7E] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Card Number *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required={paymentMethod === 'card'}
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="4242 •••• •••• 4242"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#6B1B7E] focus:bg-white pl-9"
                    />
                    <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Expiry (MM/YY) *
                    </label>
                    <input
                      type="text"
                      required={paymentMethod === 'card'}
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                      placeholder="08/29"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#6B1B7E] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      CVV / CVC *
                    </label>
                    <input
                      type="password"
                      required={paymentMethod === 'card'}
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                      placeholder="123"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#6B1B7E] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Billing Postal / Zip Code *
                  </label>
                  <input
                    type="text"
                    required={paymentMethod === 'card'}
                    value={billingZip}
                    onChange={(e) => setBillingZip(e.target.value)}
                    placeholder="e.g. SW1A 1AA / 10001"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#6B1B7E] focus:bg-white"
                  />
                </div>
              </div>
            ) : (
              /* PayPal UI */
              <div className="space-y-3 bg-white border border-blue-100 rounded-2xl p-4">
                <div className="p-3 bg-blue-50/70 border border-blue-200/60 rounded-xl text-left space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-lg italic text-[#0070BA]">Pay<span className="text-[#003087]">Pal</span></span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Buyer Protection
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Fast, secure, 1-click international checkout. Supports PayPal balance, linked bank accounts, and Pay in 4.
                  </p>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    PayPal Email Address *
                  </label>
                  <input
                    type="email"
                    required={paymentMethod === 'paypal'}
                    value={paypalEmail}
                    onChange={(e) => setPaypalEmail(e.target.value)}
                    placeholder="your-paypal-email@domain.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0070BA] focus:bg-white"
                  />
                </div>
              </div>
            )}

            {/* Guarantee and Submit */}
            <div className="space-y-3 pt-2">
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-3.5 text-white font-bold rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50 ${
                  paymentMethod === 'paypal'
                    ? 'bg-[#0070BA] hover:bg-[#005ea6] shadow-blue-900/20'
                    : 'bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] hover:opacity-95 shadow-purple-900/20'
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing {paymentMethod === 'card' ? 'Payment' : 'PayPal Authorization'}...</span>
                  </div>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>
                      {paymentMethod === 'card'
                        ? `Pay ${getCurrencySymbol(currency)}${price} & Enroll`
                        : `Pay ${getCurrencySymbol(currency)}${price} with PayPal`}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Encrypted International Payment · Powered by Truth way growth</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
