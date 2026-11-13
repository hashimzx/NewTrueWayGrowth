/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  Calendar,
  ShieldCheck,
  Award,
  Users,
  Clock,
  HelpCircle
} from 'lucide-react';

interface PricingSectionProps {
  onSelectTier: (tierName: string) => void;
  currency?: 'USD' | 'GBP';
  onSetCurrency?: (c: 'USD' | 'GBP') => void;
  onBookFreeTrial?: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onSelectTier,
  currency = 'USD',
  onSetCurrency,
  onBookFreeTrial
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');

  const packages = [
    {
      id: 'foundation',
      name: 'Foundation Plan (2 Days/Week)',
      classes: '8 One-on-One Classes / Month',
      duration: '30 mins per class',
      tagline: 'Ideal for beginners starting Noorani / Madani Qaida & daily Islamic fundamentals',
      priceUSD: billingCycle === 'monthly' ? 35 : 30,
      priceGBP: billingCycle === 'monthly' ? 28 : 24,
      popular: false,
      features: [
        '1-on-1 personalized live classes with certified scholar',
        'Madani Qaida with correct Arabic letter pronunciation',
        'Foundational Tajweed rules & Makharij training',
        'Daily Duas, Kalimas & basic prayer (Salah) steps',
        'Flexible schedule tailored to your family timezone',
        'Monthly progress report sent directly to parents',
        'Free 3-Day Trial Class (No credit card needed)'
      ],
      bestFor: 'Young children (ages 4-8) & complete beginners'
    },
    {
      id: 'standard',
      name: 'Standard Tajweed Plan (3-4 Days/Week)',
      classes: '16 One-on-One Classes / Month',
      duration: '30 mins per class',
      tagline: 'Our most popular comprehensive pathway for steady Quran recitation & Islamic studies',
      priceUSD: billingCycle === 'monthly' ? 55 : 47,
      priceGBP: billingCycle === 'monthly' ? 44 : 37,
      popular: true,
      features: [
        '1-on-1 personalized lessons with Al-Azhar / Wifaq scholars',
        'Nazra Quran recitation with applied Tajweed rules',
        'Full Salah masterclass, Wudu, and Six Kalimas practice',
        'Complete access to Student Islamic Learning Portal',
        'Audio recitations & interactive Tajweed guidance',
        'Weekly Sabaq homework reviews & WhatsApp support',
        'Free rescheduling & 100% money-back guarantee'
      ],
      bestFor: 'Children & adults seeking fluent, beautiful recitation'
    },
    {
      id: 'intensive',
      name: 'Intensive Hifz & Tafseer (5 Days/Week)',
      classes: '22 One-on-One Classes / Month',
      duration: '30-45 mins per class',
      tagline: 'Daily dedicated mentorship for Quran memorization, translation and deeper Islamic sciences',
      priceUSD: billingCycle === 'monthly' ? 80 : 68,
      priceGBP: billingCycle === 'monthly' ? 65 : 55,
      popular: false,
      features: [
        '5 Days a week 1-on-1 intensive daily sessions',
        'Dedicated Hafiz / Qari mentor for daily Sabaq & revision',
        'Structured 3-tier Hifz roadmap (Sabaq, Sabqi, Manzil)',
        'Quran Translation (Lafzi) & classical Ayah Tafseer',
        'Official True Way Quran Academy Graduation Certificate',
        'Priority timetable booking across UK, USA & Global timezones',
        'Direct parent-teacher quarterly video conferences'
      ],
      bestFor: 'Serious Hifz students, sisters & advanced learners'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#6E1373]/10" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#6E1373] text-xs font-bold border border-purple-200">
            <Sparkles className="w-3.5 h-3.5 text-[#C72F8A]" />
            <span>Affordable Online Quran Education</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Transparent Pricing & Class Packages
          </h2>
          
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            High quality 1-on-1 Islamic education with certified scholars should be accessible to every family. No registration fees, no long contracts, and 3 days free trial.
          </p>

          {/* Currency & Billing Cycle Toggles */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            
            {/* Billing Cycle Toggle */}
            <div className="bg-purple-50 p-1 rounded-full border border-purple-200 flex items-center text-xs font-bold">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 rounded-full transition cursor-pointer ${
                  billingCycle === 'monthly' ? 'bg-[#6E1373] text-white shadow-xs' : 'text-slate-600 hover:text-[#6E1373]'
                }`}
              >
                Monthly Plan
              </button>
              <button
                onClick={() => setBillingCycle('quarterly')}
                className={`px-4 py-1.5 rounded-full transition cursor-pointer flex items-center gap-1 ${
                  billingCycle === 'quarterly' ? 'bg-[#6E1373] text-white shadow-xs' : 'text-slate-600 hover:text-[#6E1373]'
                }`}
              >
                <span>Quarterly Plan</span>
                <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-black">Save 15%</span>
              </button>
            </div>

            {/* Currency selector */}
            {onSetCurrency && (
              <div className="bg-purple-50 p-1 rounded-full border border-purple-200 flex items-center text-xs font-bold">
                <button
                  onClick={() => onSetCurrency('USD')}
                  className={`px-3 py-1.5 rounded-full transition cursor-pointer ${
                    currency === 'USD' ? 'bg-[#6E1373] text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  USD ($)
                </button>
                <button
                  onClick={() => onSetCurrency('GBP')}
                  className={`px-3 py-1.5 rounded-full transition cursor-pointer ${
                    currency === 'GBP' ? 'bg-[#6E1373] text-white shadow-xs' : 'text-slate-600'
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
                    ? 'border-2 border-[#C72F8A] shadow-2xl shadow-purple-900/15 ring-4 ring-[#C72F8A]/10 scale-102 bg-white'
                    : 'border-[#6E1373]/20 shadow-md hover:shadow-xl bg-white'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-gradient-to-r from-[#6E1373] via-[#851C82] to-[#C72F8A] text-white text-[11px] font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Most Popular Choice</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{pkg.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-bold text-[#6E1373] bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                        {pkg.classes}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">{pkg.tagline}</p>
                  </div>

                  {/* Price */}
                  <div className="pt-2 border-t border-purple-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-[#6E1373]">{displayPrice}</span>
                      <span className="text-xs text-slate-500 font-bold">/ month</span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-600 block mt-0.5">
                      {billingCycle === 'quarterly' ? 'Quarterly billing with 15% discount applied' : 'Flexible month-to-month agreement'}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 pt-2 border-t border-purple-50">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#6E1373] block">
                      Course Benefits Included:
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
                    onClick={() => {
                      if (onBookFreeTrial) onBookFreeTrial();
                      else onSelectTier(pkg.name);
                    }}
                    className={`w-full py-3.5 px-4 font-black rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-[#6E1373] via-[#851C82] to-[#C72F8A] text-white hover:opacity-95'
                        : 'bg-purple-50 hover:bg-purple-100 text-[#6E1373] border border-purple-200'
                    }`}
                  >
                    <span>Enroll Now / Book Free Trial</span>
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

        {/* Sibling & Family Discount Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-purple-50/70 border border-purple-200 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
              <span>Family Privilege Offer</span>
            </div>
            <h4 className="text-base font-bold text-[#6E1373]">
              Enrolling 2 or more children? Enjoy a 15% Sibling Discount!
            </h4>
            <p className="text-xs text-slate-600">
              We support families learning together. Every additional sibling automatically qualifies for an ongoing 15% reduction across all plans.
            </p>
          </div>

          <button
            onClick={() => {
              if (onBookFreeTrial) onBookFreeTrial();
              else onSelectTier('Family / Sibling Package');
            }}
            className="px-6 py-3 bg-[#6E1373] hover:bg-[#561F79] text-white text-xs font-bold rounded-xl transition cursor-pointer shrink-0 shadow-sm"
          >
            Claim Family Trial & Discount
          </button>
        </div>

      </div>
    </section>
  );
};
