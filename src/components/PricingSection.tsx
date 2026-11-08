import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

interface PricingSectionProps {
  onSelectTier: (tierName: string) => void;
  currency?: 'USD' | 'GBP';
  onSetCurrency?: (c: 'USD' | 'GBP') => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onSelectTier,
  currency = 'USD',
  onSetCurrency
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');

  const packages = [
    {
      id: 'starter',
      name: 'Starter Growth',
      tagline: 'Ideal for local businesses & emerging brands getting started',
      priceUSD: billingCycle === 'monthly' ? 499 : 429,
      priceGBP: billingCycle === 'monthly' ? 399 : 349,
      popular: false,
      features: [
        'Dedicated Social Media Management (2 Channels)',
        '12 Custom Branded Graphics & Reels / month',
        'Basic On-Page SEO & Meta Tag Optimization',
        'Direct-Response Ad Campaign Setup (1 Ad Channel)',
        'Bi-Weekly Performance Recap & Analytics Report',
        'Direct WhatsApp Account Support Desk'
      ],
      bestFor: 'Startups & Local Service Businesses'
    },
    {
      id: 'business',
      name: 'Accelerated Scaling',
      tagline: 'Our flagship full-funnel acquisition engine for scaling businesses',
      priceUSD: billingCycle === 'monthly' ? 999 : 849,
      priceGBP: billingCycle === 'monthly' ? 799 : 679,
      popular: true,
      features: [
        'Multi-Channel Social Management (3-4 Channels)',
        '24 High-Impact Creative Assets (Reels, Carousels, Ad Banners)',
        'Full Technical SEO + Authority Backlink Building',
        'Advanced Meta (FB/IG) Ad Management with Retargeting',
        'Conversion Rate Optimization (CRO) for Landing Pages',
        'Weekly Video Performance Reviews & Ad Spend Audits',
        'Priority 24/7 Dedicated Account Director via WhatsApp'
      ],
      bestFor: 'E-Commerce Brands & Established Firms'
    },
    {
      id: 'enterprise',
      name: 'Market Dominance',
      tagline: 'Comprehensive omnichannel marketing department for market leaders',
      priceUSD: billingCycle === 'monthly' ? 1999 : 1699,
      priceGBP: billingCycle === 'monthly' ? 1599 : 1359,
      popular: false,
      features: [
        'Complete Omnichannel Social Dominance (All Channels)',
        'Unlimited Monthly Graphic & Short-Form Video Assets',
        'Aggressive Google Ads + Meta Ads Multi-Funnel Management',
        'Influencer Partnership Scouting & Outreach Management',
        'Custom PR & High-Domain Authority Editorial Link Building',
        'Dedicated Senior Growth Director + Full Creative Pod',
        'Custom Live Data Dashboard & Executive Strategy Sessions'
      ],
      bestFor: 'Multi-Location Brands & High-Growth Companies'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#6B1B7E]/10" id="pricing">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-[#6B1B7E] bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200">
            Transparent Investment Plans
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#6B1B7E] tracking-tight">
            Predictable Pricing Packages
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            No surprise fees, no hidden markups, and no lock-in contracts. Choose the growth tier tailored to your immediate business stage or request a bespoke custom scope.
          </p>

          {/* Currency & Billing Cycle Toggles */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            
            {/* Billing Cycle Toggle */}
            <div className="bg-purple-50 p-1 rounded-full border border-purple-200 flex items-center text-xs font-bold">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 rounded-full transition cursor-pointer ${
                  billingCycle === 'monthly' ? 'bg-[#6B1B7E] text-white shadow-xs' : 'text-slate-600 hover:text-[#6B1B7E]'
                }`}
              >
                Monthly Retainer
              </button>
              <button
                onClick={() => setBillingCycle('quarterly')}
                className={`px-4 py-1.5 rounded-full transition cursor-pointer flex items-center gap-1 ${
                  billingCycle === 'quarterly' ? 'bg-[#6B1B7E] text-white shadow-xs' : 'text-slate-600 hover:text-[#6B1B7E]'
                }`}
              >
                <span>Quarterly Retainer</span>
                <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-black">Save 15%</span>
              </button>
            </div>

            {/* Currency selector if setter provided */}
            {onSetCurrency && (
              <div className="bg-purple-50 p-1 rounded-full border border-purple-200 flex items-center text-xs font-bold">
                <button
                  onClick={() => onSetCurrency('USD')}
                  className={`px-3 py-1.5 rounded-full transition cursor-pointer ${
                    currency === 'USD' ? 'bg-[#6B1B7E] text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  USD ($)
                </button>
                <button
                  onClick={() => onSetCurrency('GBP')}
                  className={`px-3 py-1.5 rounded-full transition cursor-pointer ${
                    currency === 'GBP' ? 'bg-[#6B1B7E] text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  GBP (£)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 3 Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {packages.map(pkg => {
            const displayPrice = currency === 'GBP' ? `£${pkg.priceGBP}` : `$${pkg.priceUSD}`;

            return (
              <div
                key={pkg.id}
                className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative border ${
                  pkg.popular
                    ? 'border-2 border-[#E0107F] shadow-2xl shadow-purple-900/15 ring-4 ring-[#E0107F]/10 scale-102 bg-white'
                    : 'border-[#6B1B7E]/20 shadow-lg hover:shadow-xl bg-white'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white text-[11px] font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">{pkg.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-snug">{pkg.tagline}</p>
                  </div>

                  {/* Price */}
                  <div className="pt-2 border-t border-purple-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-[#6B1B7E]">{displayPrice}</span>
                      <span className="text-xs text-slate-500 font-bold">/ month</span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-600 block mt-0.5">
                      {billingCycle === 'quarterly' ? 'Billed quarterly with 15% discount' : 'Flexible month-to-month agreement'}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 pt-2 border-t border-purple-50">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#6B1B7E] block">
                      Everything Included:
                    </span>
                    <ul className="space-y-2.5">
                      {pkg.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-8 mt-6 border-t border-purple-100 space-y-2">
                  <button
                    onClick={() => onSelectTier(pkg.name)}
                    className={`w-full py-3.5 px-4 font-black rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] text-white hover:opacity-95'
                        : 'bg-purple-50 hover:bg-purple-100 text-[#6B1B7E] border border-purple-200'
                    }`}
                  >
                    <span>Choose {pkg.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <span className="block text-center text-[10px] text-slate-400 font-medium">
                    Best for: {pkg.bestFor}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Custom Scope Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-purple-50/60 border border-purple-200 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-[#6B1B7E]">
              Need a completely custom enterprise scope?
            </h4>
            <p className="text-xs text-slate-600">
              We frequently architect bespoke arrangements for multi-brand franchises, international startups, and high-volume e-commerce stores.
            </p>
          </div>

          <button
            onClick={() => onSelectTier('Custom Enterprise Retainer')}
            className="px-6 py-3 bg-[#6B1B7E] hover:bg-[#5B2A9A] text-white text-xs font-bold rounded-xl transition cursor-pointer shrink-0 shadow-sm"
          >
            Request Custom Scope & Proposal
          </button>
        </div>

      </div>
    </section>
  );
};
