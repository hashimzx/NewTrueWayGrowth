import React, { useState } from 'react';
import { DEFAULT_GROWTH_SERVICES, ServiceItem } from '../utils/growthDatabase';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  HelpCircle,
  Share2,
  Search,
  TrendingUp,
  Users,
  PenTool,
  Layout,
  CheckCircle,
  Target
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceId: string, serviceTitle: string) => void;
  currency?: 'USD' | 'GBP';
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForQuote,
  currency = 'USD'
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [expandedProcessServiceId, setExpandedProcessServiceId] = useState<string | null>(null);

  const filterCategories = [
    { id: 'all', label: 'All Services (8)' },
    { id: 'Paid Acquisition', label: 'Paid Advertising' },
    { id: 'Search & Visibility', label: 'SEO & Search' },
    { id: 'Social Media', label: 'Social & Management' },
    { id: 'Creative Production', label: 'Creative & Design' },
    { id: 'Executive Strategy', label: 'Consultation' }
  ];

  const filteredServices = selectedFilter === 'all'
    ? DEFAULT_GROWTH_SERVICES
    : DEFAULT_GROWTH_SERVICES.filter(s => s.category.toLowerCase().includes(selectedFilter.toLowerCase()) || (selectedFilter === 'Social Media' && (s.category === 'Social Media' || s.category === 'Full Management')));

  return (
    <section className="py-16 sm:py-24 bg-[#faf8ff] border-b border-[#6B1B7E]/10" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-[#6B1B7E] bg-white px-3.5 py-1.5 rounded-full border border-purple-200 shadow-2xs">
            Comprehensive Growth Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#6B1B7E] tracking-tight">
            Our Digital Marketing Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Every business requires a customized growth engine. Explore our 8 core specialized pillars engineered to attract qualified visitors, maximize conversion rates, and build long-term brand equity.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {filterCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedFilter === cat.id
                    ? 'bg-[#6B1B7E] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:text-[#6B1B7E] hover:bg-purple-50 border border-purple-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map(service => {
            const isProcessExpanded = expandedProcessServiceId === service.id;
            const price = currency === 'GBP' ? `£${service.startingPriceGBP}` : `$${service.startingPriceUSD}`;

            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-purple-100 hover:border-[#6B1B7E]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute top-0 right-7 transform -translate-y-1/2 bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
                    Most Popular
                  </div>
                )}

                <div className="space-y-5">
                  {/* Category & Turnaround */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-50 text-[#6B1B7E] border border-purple-100">
                      {service.category}
                    </span>
                    <span className="text-slate-400 text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#E0107F]" />
                      <span>{service.turnaround}</span>
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-[#6B1B7E] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#E0107F] mt-1">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Key Benefits */}
                  <div className="space-y-2 pt-2 border-t border-purple-50">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#6B1B7E] block">
                      Key Client Benefits:
                    </span>
                    <ul className="space-y-1.5">
                      {service.keyBenefits.map((benefit, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E0107F] mt-1.5 shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Work Process Dropdown Toggle */}
                  <div className="pt-2 border-t border-purple-50">
                    <button
                      onClick={() => setExpandedProcessServiceId(isProcessExpanded ? null : service.id)}
                      className="text-xs font-bold text-[#6B1B7E] hover:text-[#E0107F] flex items-center justify-between w-full py-1 cursor-pointer transition"
                    >
                      <span>{isProcessExpanded ? 'Hide Work Process' : 'View 4-Step Work Process'}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isProcessExpanded ? 'rotate-90' : ''}`} />
                    </button>

                    {isProcessExpanded && (
                      <div className="mt-3 space-y-2 bg-purple-50/70 p-3 rounded-2xl border border-purple-100 text-[11px]">
                        {service.workProcess.map(step => (
                          <div key={step.step} className="flex items-start gap-2 text-slate-700">
                            <span className="w-5 h-5 rounded-full bg-white text-[#6B1B7E] font-black text-[10px] flex items-center justify-center shrink-0 border border-purple-200">
                              {step.step}
                            </span>
                            <div>
                              <strong className="text-slate-900 block">{step.title}</strong>
                              <span className="text-slate-500 leading-tight block">{step.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Pricing & CTA Row */}
                <div className="pt-6 mt-6 border-t border-purple-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Starting from</span>
                    <span className="text-lg font-black text-[#6B1B7E]">{price}</span>
                  </div>

                  <button
                    onClick={() => onSelectServiceForQuote(service.id, service.title)}
                    className="px-4 py-2.5 bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] hover:from-[#5B2A9A] hover:to-[#6B1B7E] text-white text-xs font-black rounded-xl shadow-sm hover:shadow transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Get a Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Custom Tailored Consultation Box */}
        <div className="bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[11px] font-black uppercase tracking-wider text-pink-200 bg-white/10 px-3 py-1 rounded-full border border-white/20">
              Need Multi-Service Synergy?
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Bespoke Omnichannel Marketing Packages
            </h3>
            <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
              Combine Meta Ads, SEO, and Social Media Management into a unified high-converting growth retainer with dedicated account management and custom performance milestones.
            </p>
          </div>

          <button
            onClick={() => onSelectServiceForQuote('custom-package', 'Custom Multi-Service Retainer')}
            className="px-7 py-3.5 bg-white hover:bg-purple-50 text-[#6B1B7E] font-black text-xs sm:text-sm rounded-xl shadow-lg transition shrink-0 cursor-pointer"
          >
            Request Custom Omnichannel Quote
          </button>
        </div>

      </div>
    </section>
  );
};
