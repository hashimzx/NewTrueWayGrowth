import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  DEFAULT_GROWTH_SERVICES, 
  QuoteInquiry, 
  getStoredInquiries, 
  saveStoredInquiries 
} from '../utils/growthDatabase';
import { 
  X, 
  Send, 
  CheckCircle2, 
  Sparkles,
  Phone,
  MessageCircle
} from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceId?: string | null;
  preSelectedServiceName?: string | null;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preSelectedServiceId,
  preSelectedServiceName
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceId: preSelectedServiceId || 'social-media-marketing',
    serviceName: preSelectedServiceName || 'Social Media Marketing',
    budget: '$500 - $1,000 / month',
    message: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const found = DEFAULT_GROWTH_SERVICES.find(s => s.id === val);
    setFormData(prev => ({
      ...prev,
      serviceId: val,
      serviceName: found ? found.title : val
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newInquiry: QuoteInquiry = {
      id: `inq-${Date.now()}`,
      name: formData.name.trim() || 'Prospective Client',
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      company: formData.company.trim(),
      serviceId: formData.serviceId,
      serviceName: formData.serviceName,
      budget: formData.budget,
      message: formData.message.trim(),
      status: 'new',
      createdAt: new Date().toISOString()
    };

    const current = getStoredInquiries();
    saveStoredInquiries([newInquiry, ...current]);

    setIsSuccess(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#6B1B7E', '#5B2A9A', '#E0107F']
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-purple-100 relative max-h-[92vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          aria-label="Close quote modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-purple-50 border border-purple-200 rounded-2xl flex items-center justify-center mx-auto p-2">
              <img
                src="/assets/aistudio/image_9a2a600b_trimmed.png"
                alt="True Way Quran"
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-2xl font-black text-[#6B1B7E]">Free Quote Request Sent!</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              JazakAllah Khair! Our senior growth director will review your details for <strong>{formData.serviceName}</strong> and reply via WhatsApp or Email within 2 hours.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#6B1B7E] text-white rounded-xl text-xs font-bold transition hover:bg-[#5B2A9A] cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Header */}
            <div className="space-y-1 pr-6">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#6B1B7E] bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                TrueWayGrowth Consultation
              </span>
              <h3 className="text-xl font-black text-slate-900">Get a Free Custom Quote</h3>
              <p className="text-xs text-slate-500">
                Tell us about your project. Receive our customized roadmap and pricing proposal within 2 hours.
              </p>
            </div>

            {/* Inputs */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Sarah Jenkins"
                className="w-full px-3.5 py-2.5 rounded-xl border border-purple-200 focus:outline-none focus:border-[#6B1B7E] text-xs text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-purple-200 focus:outline-none focus:border-[#6B1B7E] text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+44 7911 123456"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-purple-200 focus:outline-none focus:border-[#6B1B7E] text-xs text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Service *
                </label>
                <select
                  value={formData.serviceId}
                  onChange={handleServiceChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-purple-200 focus:outline-none focus:border-[#6B1B7E] text-xs text-slate-900 bg-white"
                >
                  {DEFAULT_GROWTH_SERVICES.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                  <option value="custom-multi">Custom Omnichannel Retainer</option>
                  <option value="consultation-1on1">1-on-1 Growth Consultation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Estimated Budget
                </label>
                <select
                  value={formData.budget}
                  onChange={e => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-purple-200 focus:outline-none focus:border-[#6B1B7E] text-xs text-slate-900 bg-white"
                >
                  <option value="$350 - $500 / month">$350 – $500 / month</option>
                  <option value="$500 - $1,000 / month">$500 – $1,000 / month</option>
                  <option value="$1,000 - $2,500 / month">$1,000 – $2,500 / month</option>
                  <option value="$2,500+ / month">$2,500+ / month</option>
                  <option value="One-time Consultation">One-time Consultation</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Project Notes or Website Link
              </label>
              <textarea
                rows={2}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share your current website link or primary goals..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-purple-200 focus:outline-none focus:border-[#6B1B7E] text-xs text-slate-900"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] text-white font-black rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit & Receive Free Proposal</span>
            </button>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>🔒 100% Confidential</span>
              <span>Fast 2-Hour Response</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
