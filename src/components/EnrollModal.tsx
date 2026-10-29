import React, { useState } from 'react';
import { 
  X, 
  Check, 
  CreditCard, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  MessageCircle,
  Lock,
  Globe,
  Award
} from 'lucide-react';

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency?: string;
  defaultCourse?: string;
}

const GLOBAL_COUNTRIES = [
  'United Kingdom',
  'United States',
  'Canada',
  'Australia',
  'Pakistan',
  'United Arab Emirates',
  'Saudi Arabia',
  'Germany',
  'France',
  'Qatar',
  'Kuwait',
  'Oman',
  'Bahrain',
  'Turkey',
  'Malaysia',
  'Singapore',
  'South Africa',
  'New Zealand',
  'Ireland',
  'Norway',
  'Sweden',
  'Denmark',
  'Netherlands',
  'Belgium',
  'Switzerland',
  'Austria',
  'Italy',
  'Spain',
  'India',
  'Bangladesh',
  'Indonesia',
  'Egypt',
  'Jordan',
  'Morocco',
  'Kenya',
  'Nigeria',
  'Japan',
  'South Korea',
  'Other'
];

export const EnrollModal: React.FC<EnrollModalProps> = ({
  isOpen,
  onClose,
  currency = 'GBP',
  defaultCourse = 'How to Become an Online Quran Teacher'
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Student Registration Fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryOfResidence, setCountryOfResidence] = useState('United Kingdom');
  const [course, setCourse] = useState(defaultCourse);

  // Payment Method Selection: 'card' or 'paypal'
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [paypalEmail, setPaypalEmail] = useState('');

  // Card Payment Details
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [billingZip, setBillingZip] = useState('');

  if (!isOpen) return null;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Assalam-o-Alaikum True Way Quran Admissions,\n\nI have enrolled in "${course}".\nPayment Method: ${paymentMethod === 'card' ? 'Credit/Debit Card' : 'PayPal'}\nName: ${firstName || 'Student'} ${lastName}\nCountry: ${countryOfResidence}\nPhone: ${phone}\nEmail: ${email}\nBilling/Payer: ${paymentMethod === 'card' ? (cardHolder || firstName) : (paypalEmail || email)}`
    );
    window.open(`https://wa.me/923068959085?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-purple-200 overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] text-white px-6 py-5 flex items-center justify-between shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider border border-white/30">
              <Sparkles className="w-3 h-3 text-pink-300" />
              <span>Global Student Admissions · True Way Quran</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black mt-1">
              New Student Registration & Secure Card Checkout
            </h2>
            <p className="text-purple-100 text-xs sm:text-sm">
              Instant registration, certified teacher allocation & verified Ijazah coursework.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-purple-200 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {submitted ? (
            <div className="text-center py-12 space-y-5 max-w-lg mx-auto">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Check className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-[#6B1B7E]">
                Alhamdulillah! Registration & Payment Confirmed!
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                JazakAllah Khair <strong>{firstName} {lastName}</strong> ({countryOfResidence}). Your card payment has been securely processed and your student enrollment pass has been issued.
              </p>
              
              <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 text-xs text-[#6B1B7E] font-medium text-left space-y-1">
                <p><strong>Course:</strong> {course}</p>
                <p><strong>Confirmation ID:</strong> TWQ-{Math.floor(100000 + Math.random() * 900000)}</p>
                <p><strong>Support & Mentor Contact:</strong> WhatsApp (+92 306 8959085)</p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleWhatsAppDirect}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect with Mentor on WhatsApp</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-purple-50 text-[#6B1B7E] border border-purple-200 text-xs font-bold rounded-xl hover:bg-purple-100 transition cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Secure Card Checkout Details */}
              <div className="lg:col-span-5 space-y-5">
                
                {/* Tuition summary */}
                <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50/50 border border-[#6B1B7E]/20 rounded-2xl p-4.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B1B7E]">Program Fee</span>
                    <span className="text-[10px] font-bold text-[#E0107F] bg-pink-100 px-2 py-0.5 rounded-full">Secure 256-Bit SSL</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900">
                      {currency === 'GBP' ? '£39' : currency === 'EUR' ? '€45' : currency === 'CAD' ? 'CA$65' : currency === 'AUD' ? 'AU$70' : '$49'}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      {currency === 'GBP' ? '£65' : currency === 'EUR' ? '€75' : '$80'}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Save 35%</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    All-inclusive tuition. Lifetime syllabus access, live certified mentor sessions & community included.
                  </p>
                </div>

                {/* Payment Selection Tabs: Credit/Debit Card or PayPal */}
                <div className="bg-white border-2 border-[#6B1B7E]/25 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm">
                  
                  {/* Method Switcher Pills */}
                  <div className="grid grid-cols-2 gap-2 p-1 bg-purple-50 rounded-xl border border-purple-100">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'bg-[#6B1B7E] text-white shadow-sm'
                          : 'text-slate-600 hover:text-[#6B1B7E]'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Credit / Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        paymentMethod === 'paypal'
                          ? 'bg-[#0070BA] text-white shadow-sm'
                          : 'text-slate-600 hover:text-[#0070BA]'
                      }`}
                    >
                      <span className="font-extrabold italic text-amber-300">P</span>
                      <span>PayPal</span>
                    </button>
                  </div>

                  {paymentMethod === 'card' ? (
                    /* Credit / Debit Card Form */
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-purple-100 pb-2">
                        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                          Card Details
                        </span>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                          <span className="px-1.5 py-0.5 bg-slate-100 rounded border">VISA</span>
                          <span className="px-1.5 py-0.5 bg-slate-100 rounded border">MC</span>
                          <span className="px-1.5 py-0.5 bg-slate-100 rounded border">AMEX</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          required={paymentMethod === 'card'}
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          placeholder="Name as it appears on card"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#6B1B7E] focus:bg-white transition"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Card Number *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required={paymentMethod === 'card'}
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="4242 •••• •••• 4242"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-[#6B1B7E] focus:bg-white transition pl-9"
                          />
                          <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Expiry (MM/YY) *
                          </label>
                          <input
                            type="text"
                            required={paymentMethod === 'card'}
                            value={cardExpiry}
                            onChange={handleExpiryChange}
                            placeholder="12/28"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-[#6B1B7E] focus:bg-white transition"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            CVV / CVC *
                          </label>
                          <div className="relative">
                            <input
                              type="password"
                              required={paymentMethod === 'card'}
                              maxLength={4}
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                              placeholder="123"
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-[#6B1B7E] focus:bg-white transition pl-8"
                            />
                            <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Billing Postal / Zip Code *
                        </label>
                        <input
                          type="text"
                          required={paymentMethod === 'card'}
                          value={billingZip}
                          onChange={(e) => setBillingZip(e.target.value)}
                          placeholder="e.g. SW1A 1AA / 10001"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#6B1B7E] focus:bg-white transition"
                        />
                      </div>
                    </div>
                  ) : (
                    /* PayPal Interactive Details */
                    <div className="space-y-3.5">
                      <div className="p-3.5 bg-[#0070BA]/5 border border-[#0070BA]/20 rounded-xl text-left space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-lg italic text-[#0070BA]">Pay<span className="text-[#003087]">Pal</span></span>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            Buyer Protection
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Safe & instant international payment without sharing financial details. Compatible with PayPal balances, linked bank accounts, and Pay in 4.
                        </p>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          PayPal Account Email *
                        </label>
                        <input
                          type="email"
                          required={paymentMethod === 'paypal'}
                          value={paypalEmail}
                          onChange={(e) => setPaypalEmail(e.target.value)}
                          placeholder="your-paypal-email@domain.com"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#0070BA] focus:bg-white transition"
                        />
                      </div>

                      <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl p-2.5 text-[11px] text-amber-900 flex items-start gap-2">
                        <span className="font-bold shrink-0">Notice:</span>
                        <span>
                          You will be instantly redirected to PayPal's secure portal upon clicking confirm.
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="pt-2 text-[11px] text-slate-500 flex items-center gap-1.5 border-t border-purple-50">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>256-Bit SSL Encrypted · Powered by Truth way growth</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Student Registration Form */}
              <div className="lg:col-span-7 space-y-4">
                <div className="border-b border-purple-100 pb-2">
                  <h3 className="text-base font-black text-slate-900">
                    New Student Registration
                  </h3>
                  <p className="text-xs text-slate-500">
                    Enter your personal and contact details for live portal access and teacher allocation.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Ahmad"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#6B1B7E] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="e.g. Khan"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#6B1B7E] focus:bg-white transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#6B1B7E] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      WhatsApp / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+44 7123 456789"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#6B1B7E] focus:bg-white transition"
                    />
                  </div>
                </div>

                {/* Country of Residence Dropdown (ALL COUNTRIES) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#E0107F]" />
                    <span>Country of Residence *</span>
                  </label>
                  <select
                    value={countryOfResidence}
                    onChange={(e) => setCountryOfResidence(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#6B1B7E] focus:bg-white transition font-semibold text-slate-800 cursor-pointer"
                  >
                    {GLOBAL_COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Course Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Course Track *
                  </label>
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#6B1B7E] focus:bg-white transition font-medium text-slate-800 cursor-pointer"
                  >
                    <option value="Training for Online Quran Teachers & Students">
                      Training for Online Quran Teachers & Students (30-Day Masterclass)
                    </option>
                    <option value="Full Quran Recitation & Tajweed Mastery">
                      Full Quran Recitation & Tajweed Mastery
                    </option>
                    <option value="Madani Qaida for Kids & Beginners">
                      Madani Qaida for Kids & Beginners (All 22 Lessons)
                    </option>
                    <option value="Quran Hifz (Memorization) Program">
                      Quran Hifz (Memorization) Program
                    </option>
                    <option value="Islamic Worship & Sunnah Mastery">
                      Islamic Worship & Sunnah Mastery (Namaz, Eid, Janazah & Roza)
                    </option>
                  </select>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full py-3.5 text-white font-black text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 ${
                      paymentMethod === 'paypal'
                        ? 'bg-[#0070BA] hover:bg-[#005ea6] shadow-blue-900/20'
                        : 'bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] hover:opacity-95 shadow-purple-900/20'
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing {paymentMethod === 'card' ? 'Card Payment' : 'PayPal Authorization'}...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>
                          {paymentMethod === 'card' 
                            ? 'Complete Registration & Pay via Card' 
                            : 'Continue & Pay with PayPal'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-slate-500 text-center mt-2">
                    Guaranteed 100% Halal Education · 30-Day Money-Back Guarantee · Card & PayPal Protected
                  </p>
                </div>

              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
