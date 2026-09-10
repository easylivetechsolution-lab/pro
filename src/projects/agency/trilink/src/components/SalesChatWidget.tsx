import React, { useState } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  PhoneCall,
  Clock,
  ArrowRight
} from 'lucide-react';

interface SalesChatWidgetProps {
  onOpenContactSales?: () => void;
}

export const SalesChatWidget: React.FC<SalesChatWidgetProps> = ({ onOpenContactSales }) => {
  if (onOpenContactSales) {
    // Registered
  }
  const [chatOpen, setChatOpen] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'agent' | 'user'; text: string; time: string }>>([
    {
      sender: 'agent',
      text: "Hi! We're here to help answer questions about Trilink's payment solutions, custom volume pricing, or developer integration.",
      time: 'Just now',
    },
  ]);

  const quickPrompts = [
    'Custom volume pricing',
    'Platform & marketplace payouts',
    'Migrating from existing provider',
    'Request enterprise demo',
  ];

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { sender: 'user', text, time: userTime }]);
    if (!textToSend) setInputMessage('');

    // Trigger typing state
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let reply = '';
      const lower = text.toLowerCase();

      if (lower.includes('pricing') || lower.includes('volume') || lower.includes('rate')) {
        reply = "Our standard pay-as-you-go rate is 2.9% + 30¢ with no monthly minimums. For businesses processing over $100k/month, we offer custom IC+ pricing, volume tiers, and multi-product discounts. Would you like our sales team to run an interchange fee analysis for you?";
      } else if (lower.includes('platform') || lower.includes('marketplace') || lower.includes('connect')) {
        reply = "Trilink Connect supports multi-party disbursements, automated seller KYC in 135+ countries, and flexible fee markups. You can test embedded components in our sandbox immediately.";
      } else if (lower.includes('migrate') || lower.includes('provider') || lower.includes('transfer')) {
        reply = "We offer complimentary zero-downtime card data migrations from any PCI-DSS Level 1 compliant provider. We securely transfer your customer tokens with zero friction.";
      } else if (lower.includes('demo') || lower.includes('call') || lower.includes('sales')) {
        reply = "I'd love to connect you with one of our solutions architects for a 15-minute tailored walkthrough. What is the best email address or company domain to reach you at?";
      } else {
        reply = `Thanks for asking about "${text}"! Our sales architects can prepare a personalized proposal and technical specification. Would you like to schedule a quick consultation or review our API docs?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 850);
  };

  return (
    <aside aria-label="Sales Assistance" className="fixed bottom-6 right-6 z-50 select-none">
      {/* ========================================================================= */}
      {/* 1. COLLAPSED FLOATING STATE (Trilink Speech Bubble + Chat now button) */}
      {/* ========================================================================= */}
      {!chatOpen ? (
        <div className="flex flex-col items-end space-y-2.5">
          {/* Speech bubble card */}
          {!bubbleDismissed && (
            <div
              id="trilink-sales-bubble"
              className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-3.5 max-w-[290px] relative animate-in fade-in slide-in-from-bottom-3 duration-300 ring-1 ring-black/5"
            >
              {/* Dismiss X button */}
              <button
                type="button"
                id="btn-dismiss-bubble"
                onClick={() => setBubbleDismissed(true)}
                className="absolute top-2.5 right-2.5 text-slate-400 hover:text-slate-700 p-1 rounded-md transition-colors"
                aria-label="Dismiss message"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Top row: 2 Overlapping specialist avatars + green status dot + rep count */}
              <div className="flex items-center space-x-2 mb-1.5 pr-6">
                <div className="flex -space-x-2 overflow-hidden shrink-0">
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                    alt="Sarah M. - Sales Lead"
                  />
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Elena R. - Solutions Specialist"
                  />
                </div>

                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-bold text-slate-900 tracking-tight">
                    7 sales reps available
                  </span>
                </div>
              </div>

              {/* Message body */}
              <p className="text-xs text-slate-600 leading-snug font-normal pl-0.5">
                We're here to discuss your business needs.
              </p>
            </div>
          )}

          {/* Trilink "Chat now" dark navy button */}
          <button
            type="button"
            id="btn-chat-now"
            onClick={() => {
              setChatOpen(true);
              setBubbleDismissed(true);
            }}
            className="group inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-[#0a2540] hover:bg-[#06182a] text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-200 border border-[#0a2540]/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageSquare className="w-4 h-4 mr-2 text-[#00E599] transition-transform group-hover:scale-110" />
            <span>Chat now</span>
          </button>
        </div>
      ) : (
        /* ========================================================================= */
        /* 2. EXPANDED STRIPE SALES CHAT WINDOW                                      */
        /* ========================================================================= */
        <div
          id="trilink-sales-chat-window"
          className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 w-[92vw] sm:w-[380px] h-[520px] max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-slate-900"
        >
          {/* Header */}
          <div className="bg-[#0a2540] p-4 text-white flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center space-x-3">
              <div className="flex -space-x-2">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0a2540] object-cover"
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                  alt="Sales Rep"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0a2540] object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Sales Rep"
                />
              </div>

              <div>
                <div className="text-sm font-bold text-white flex items-center">
                  <span>Trilink Sales Team</span>
                  <span className="ml-2 text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded bg-emerald-500/20 text-[#00E599]">Live</span>
                </div>
                <div className="text-[11px] text-slate-300 flex items-center mt-0.5">
                  Typically replies in &lt; 1 minute
                </div>
              </div>
            </div>

            <button
              type="button"
              id="btn-close-chat-window"
              onClick={() => setChatOpen(false)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {/* Introductory greeting badge */}
            <div className="text-center my-1">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-200/60 px-2.5 py-1 rounded-full">
                Connected to Trilink Sales
              </span>
            </div>

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[84%] p-3 rounded-2xl leading-relaxed text-xs ${
                    m.sender === 'user'
                      ? 'bg-[#00E599] text-slate-950 font-medium rounded-tr-xs shadow-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 shadow-xs rounded-tl-xs'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">{m.time}</span>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center space-x-1.5 bg-white border border-slate-200/80 p-2.5 rounded-2xl rounded-tl-xs w-max text-slate-400 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center space-x-1.5 overflow-x-auto no-scrollbar shrink-0">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(prompt)}
                className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors shrink-0 border border-slate-200/60 hover:border-slate-300"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Message Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2 shrink-0"
          >
            <input
              type="text"
              id="input-sales-chat"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about volume pricing or features..."
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl bg-slate-100 border border-transparent focus:border-slate-300 focus:bg-white focus:outline-none text-slate-900 transition-colors"
            />
            <button
              type="submit"
              id="btn-send-sales-chat"
              disabled={!inputMessage.trim()}
              className="p-2.5 rounded-xl bg-[#0a2540] hover:bg-[#06182a] disabled:opacity-40 text-white transition-colors shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 text-[#00E599]" />
            </button>
          </form>
        </div>
      )}
    </aside>
  );
};
