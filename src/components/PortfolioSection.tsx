import React, { useState } from 'react';
import { DEFAULT_PORTFOLIO_ITEMS, PortfolioItem } from '../utils/growthDatabase';
import { 
  ArrowRight, 
  ExternalLink, 
  TrendingUp, 
  CheckCircle2, 
  Filter
} from 'lucide-react';

interface PortfolioSectionProps {
  onGetQuote: () => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onGetQuote }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories = ['all', 'Paid Social & Creative', 'SEO & Content', 'Full-Funnel Growth', 'Paid Acquisition & Lead Gen'];

  const filteredItems = activeTab === 'all'
    ? DEFAULT_PORTFOLIO_ITEMS
    : DEFAULT_PORTFOLIO_ITEMS.filter(item => item.category === activeTab);

  return (
    <section className="py-16 sm:py-24 bg-[#faf8ff] border-b border-[#6B1B7E]/10" id="portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-[#6B1B7E] bg-white px-3.5 py-1.5 rounded-full border border-purple-200 shadow-2xs">
            Proven Track Record
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#6B1B7E] tracking-tight">
            Our Case Studies & Portfolio
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Real clients, verifiable metrics, and compounding revenue. Explore how our digital marketing strategies scaled brands across e-commerce, SaaS, online education, and real estate.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === cat
                    ? 'bg-[#6B1B7E] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:text-[#6B1B7E] hover:bg-purple-50 border border-purple-100'
                }`}
              >
                {cat === 'all' ? 'All Case Studies' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-purple-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image & Category Pill */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#6B1B7E] text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                    {item.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs text-purple-200 font-semibold block">{item.client}</span>
                  <h3 className="text-xl font-black text-white">{item.title}</h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Metrics Banner */}
                  <div className="grid grid-cols-3 gap-2 p-3 bg-purple-50/70 rounded-2xl border border-purple-100 text-center">
                    {item.results.map((res, rIdx) => (
                      <div key={rIdx} className="space-y-0.5">
                        <span className="block text-base sm:text-lg font-black text-[#6B1B7E]">
                          {res.metric}
                        </span>
                        <span className="block text-[10px] font-bold text-slate-500 leading-tight">
                          {res.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Services Used Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.servicesUsed.map((svc, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 border border-slate-200"
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-purple-50 flex items-center justify-between">
                  <button
                    onClick={onGetQuote}
                    className="text-xs font-bold text-[#6B1B7E] hover:text-[#E0107F] flex items-center gap-1 cursor-pointer transition"
                  >
                    <span>Achieve Similar Results For Your Business</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Growth Audit Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#6B1B7E]/20 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-black text-[#6B1B7E]">
              Want to see detailed case studies in your specific industry?
            </h4>
            <p className="text-xs text-slate-600">
              We have completed campaigns in over 20 niches across the UK, North America, and the Middle East.
            </p>
          </div>

          <button
            onClick={onGetQuote}
            className="px-6 py-3 bg-[#6B1B7E] hover:bg-[#5B2A9A] text-white font-bold text-xs sm:text-sm rounded-xl transition shadow cursor-pointer shrink-0"
          >
            Request Industry Case Studies
          </button>
        </div>

      </div>
    </section>
  );
};
