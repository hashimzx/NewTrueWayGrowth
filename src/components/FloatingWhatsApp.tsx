import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  CheckCheck, 
  Sparkles, 
  Calendar, 
  BookOpen, 
  Users, 
  DollarSign, 
  PhoneCall, 
  ShieldCheck, 
  Smile 
} from 'lucide-react';

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  onOpenTrialModal?: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber = '923068959085',
  onOpenTrialModal
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [userMessage, setUserMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Array<{
    id: string;
    sender: 'bot' | 'user';
    text: string;
    time: string;
  }>>([]);
  const [lastActiveText, setLastActiveText] = useState('Active now');

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate realistic dynamic "Last Active" time based on current time
  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const minutes = now.getMinutes();
      if (minutes % 5 === 0) {
        setLastActiveText('Active now · Global Desk');
      } else if (minutes % 3 === 0) {
        setLastActiveText('Active 1m ago · Replies in <2 mins');
      } else {
        setLastActiveText('Online · Ready to assist');
      }
    };
    updateStatus();
    const interval = setInterval(updateStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  // Initialize simulated automated bot greeting conversation
  useEffect(() => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages([
      {
        id: 'msg-1',
        sender: 'bot',
        text: 'Assalam-o-Alaikum! 🌸 Welcome to True Way Quran Academy.',
        time: timeStr
      },
      {
        id: 'msg-2',
        sender: 'bot',
        text: 'I am Abdul Basit, Admissions Director. How can our certified scholars assist your Quran journey today?',
        time: timeStr
      }
    ]);
  }, []);

  // Handle hover behavior
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
      setIsOpen(true);
      setUnreadCount(0);
    }, 250);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    // Don't auto-close if user typed something
    if (!userMessage.trim()) {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsHovered(false);
      }, 5000);
    }
  };

  const handleSendToWhatsApp = (customText?: string) => {
    const query = customText || userMessage.trim() || 'Assalam-o-Alaikum, I would like to inquire about 1-on-1 Quran classes with True Way Quran Academy.';
    const encoded = encodeURIComponent(query);
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, '_blank');
    setUserMessage('');
  };

  const quickActions = [
    {
      label: '📅 Book 3-Day Free Trial',
      query: 'Assalam-o-Alaikum, I want to book a 3-Day Free Trial class for Quran learning.',
      highlight: true
    },
    {
      label: '🧕 Female Teacher for Sisters',
      query: 'Assalam-o-Alaikum, I am looking for a qualified female Quran teacher for sisters/girls.'
    },
    {
      label: '📖 Madani Qaida for Kids',
      query: 'Assalam-o-Alaikum, I want to enroll my child for beginner Madani Qaida & Tajweed.'
    },
    {
      label: '💷 Fee Packages & Timetable',
      query: 'Assalam-o-Alaikum, please share your monthly fee plans and available class timings.'
    }
  ];

  return (
    <div 
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Auto-Reply Interactive WhatsApp Chat Card */}
      {isOpen && (
        <div className="mb-3 w-[340px] sm:w-[380px] max-w-[92vw] bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden animate-scale-in transition-all">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white p-4 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Counselor Avatar with pulsating live dot */}
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-white/20 p-0.5 border border-white/30 overflow-hidden flex items-center justify-center font-bold text-sm">
                    <span className="text-white text-base">AB</span>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-emerald-800 animate-pulse" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-sm text-white leading-tight">Abdul Basit</h4>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-800/80 text-emerald-200 font-semibold">
                      Admissions Desk
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-100 flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping inline-block" />
                    <span>{lastActiveText}</span>
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 text-white flex items-center justify-center transition cursor-pointer"
                aria-label="Close WhatsApp chat popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sub-strip with verified badge */}
            <div className="mt-2.5 pt-2 border-t border-emerald-500/40 flex items-center justify-between text-[11px] text-emerald-100 font-medium">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>Verified True Way Academy Official</span>
              </span>
              <span className="text-emerald-200">UK & Worldwide Desk</span>
            </div>
          </div>

          {/* Chat Messages Body with WhatsApp pattern background */}
          <div className="p-4 bg-emerald-50/40 max-h-[300px] overflow-y-auto space-y-3 text-xs">
            
            {/* Academy Bot Notice */}
            <div className="text-center">
              <span className="bg-white/80 text-slate-500 text-[10px] px-2.5 py-1 rounded-full shadow-2xs font-medium border border-emerald-100">
                🔒 End-to-end encrypted · Auto-response active
              </span>
            </div>

            {/* Conversation Bubbles */}
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl shadow-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 rounded-bl-xs border border-emerald-100'
                  }`}
                >
                  <p>{msg.text}</p>
                  <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-400">
                    <span>{msg.time}</span>
                    <CheckCheck className="w-3 h-3 text-emerald-500" />
                  </div>
                </div>
              </div>
            ))}

            {/* Interactive Quick Inquiries */}
            <div className="pt-1 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 block px-1">
                Instant Auto-Reply Inquiries:
              </span>
              <div className="flex flex-col gap-1.5">
                {quickActions.map((act, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendToWhatsApp(act.query)}
                    className={`w-full text-left p-2 rounded-xl text-[11px] font-semibold transition cursor-pointer flex items-center justify-between border ${
                      act.highlight
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-500 shadow-xs hover:brightness-105'
                        : 'bg-white hover:bg-emerald-50 text-slate-700 border-emerald-100'
                    }`}
                  >
                    <span>{act.label}</span>
                    <Send className={`w-3 h-3 ${act.highlight ? 'text-white' : 'text-emerald-600'}`} />
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Interactive Input Bar */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendToWhatsApp();
              }}
              placeholder="Ask anything or request a free trial..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <button
              onClick={() => handleSendToWhatsApp()}
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white shadow-xs transition cursor-pointer flex items-center justify-center shrink-0"
              aria-label="Send message to WhatsApp"
              title="Chat on WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Direct CTA strip */}
          <div className="bg-slate-50 px-3 py-2 text-center border-t border-slate-100">
            <button
              onClick={() => handleSendToWhatsApp()}
              className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 transition flex items-center justify-center gap-1.5 w-full cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Continue conversation on official WhatsApp (+92 306 8959085)</span>
            </button>
          </div>

        </div>
      )}

      {/* Main Floating Trigger Button with Halo and Badge */}
      <div className="relative group">
        <span className="absolute -inset-1 rounded-full bg-emerald-500 blur-sm opacity-60 group-hover:opacity-100 animate-pulse transition-opacity pointer-events-none" />
        
        {/* Unread Message Badge */}
        {unreadCount > 0 && !isOpen && (
          <span className="absolute -top-1 -right-1 z-10 w-5 h-5 rounded-full bg-rose-500 text-white font-black text-[10px] flex items-center justify-center shadow-md animate-bounce">
            {unreadCount}
          </span>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:from-emerald-700 text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer"
          aria-label="Chat with True Way Quran Academy on WhatsApp"
          title="Auto-Reply Desk · True Way Quran"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-7 h-7" />
          )}
        </button>
      </div>

    </div>
  );
};
