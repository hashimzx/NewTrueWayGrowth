import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface FloatingWhatsAppProps {
  phoneNumber?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber = '923068959085'
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    const text = encodeURIComponent('Hello TrueWayGrowth, I would like to discuss digital marketing services for my business.');
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      
      {/* Optional Speech Bubble Tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl shadow-xl border border-purple-100 text-xs text-slate-700 animate-fade-in relative">
          <span>Need help? Chat with Abdul Basit on WhatsApp!</span>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button with Pulsing Halo */}
      <div className="relative group">
        <span className="absolute -inset-1 rounded-full bg-emerald-500 blur-sm opacity-60 group-hover:opacity-100 animate-pulse transition-opacity pointer-events-none" />
        
        <button
          onClick={handleClick}
          onMouseEnter={() => setShowTooltip(true)}
          className="relative w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer"
          aria-label="Chat with TrueWayGrowth on WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      </div>

    </div>
  );
};
