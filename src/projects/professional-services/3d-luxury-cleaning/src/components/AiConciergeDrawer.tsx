import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  FileText,
  Loader2,
  MessageSquare,
  Send,
  Tag,
  X,
} from 'lucide-react';
import type { AiActionResult, ChatMessage, QuoteBreakdown, QuoteInput } from '../types/cleaning';

interface AiConciergeDrawerProps {
  open: boolean;
  prefillMessage?: string;
  onOpen: () => void;
  onClose: () => void;
  onApplyQuote: (patch: Partial<QuoteInput>) => void;
  onDataMutated: () => void;
}

const STARTER_PROMPTS = [
  'Quote a 2,400 sq ft bi-weekly deep clean with interior windows',
  'Are your cleaning formulas safe for dogs and marble stone?',
  'Check open arrival windows this week',
  'Generate a personal referral code for Alex Kim (alex@studio.co)',
];

export const AiConciergeDrawer: React.FC<AiConciergeDrawerProps> = ({
  open,
  prefillMessage,
  onOpen,
  onClose,
  onApplyQuote,
  onDataMutated,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Welcome to AetherClean. I can answer questions about our eco-safe cleaning protocols, calculate instant quotes, check open arrival windows, confirm bookings, or create your $35 referral code.',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefillMessage && open) {
      setInput(prefillMessage);
    }
  }, [prefillMessage, open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, sending]);

  const sendMessage = async (textToSend?: string) => {
    const clean = (textToSend ?? input).trim();
    if (!clean || sending) return;

    setError(null);
    if (!textToSend) setInput('');

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: clean,
      timestamp: new Date().toISOString(),
    };

    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setSending(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: clean,
          history: nextHistory
            .filter((m) => m.id !== 'welcome')
            .map((m) => ({ role: m.role, text: m.text })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Chat error');

      const actions = (data.actions || []) as AiActionResult[];
      if (
        actions.some(
          (a) =>
            a.type === 'lead_created' ||
            a.type === 'booking_created' ||
            a.type === 'referral_created',
        )
      ) {
        onDataMutated();
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: data.reply,
          actions,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send your message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={onOpen}
        aria-label="Open AetherClean chat"
        className="fixed bottom-5 right-4 z-40 inline-flex items-center gap-2 rounded-full border border-sky-100/90 bg-white/90 py-2 pl-2 pr-3 text-xs font-semibold text-slate-900 shadow-[0_8px_28px_rgba(15,23,42,0.16)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-[0_12px_34px_rgba(14,165,233,0.22)] sm:right-5 sm:gap-2.5 sm:py-2.5 sm:pl-2.5 sm:pr-4 sm:text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-sky-400 text-white shadow-sm sm:h-9 sm:w-9">
          <MessageSquare className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="whitespace-nowrap">Chat with us</span>
      </button>
    );
  }

  return (
    <aside
      aria-label="Chat with AetherClean"
      className="fixed bottom-4 right-4 z-50 flex h-[min(620px,84vh)] w-[min(430px,calc(100vw-2rem))] flex-col rounded-2xl border border-sky-200 bg-white shadow-2xl shadow-slate-900/15 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-sky-100 bg-[#F6FAFF] px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 text-white">
            <MessageSquare className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-display text-sm font-bold text-slate-900">
              Chat with AetherClean
            </h3>
            <p className="text-xs text-slate-500">Ask about services, prices, or bookings.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="rounded-lg p-1.5 text-slate-500 hover:bg-sky-100 hover:text-slate-900 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-white">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-sky-600 text-white'
                  : 'bg-[#F6FAFF] border border-sky-100 text-slate-800'
              }`}
            >
              {msg.text}
            </div>

            {/* Structured Tool Action Cards */}
            {msg.actions && msg.actions.length > 0 && (
              <div className="mt-2 w-[88%] space-y-2">
                {msg.actions.map((action, idx) => (
                  <div
                    key={`${msg.id}-act-${idx}`}
                    className="rounded-xl border border-sky-200 bg-white p-3.5 text-xs shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2 font-semibold text-slate-900 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        {action.type === 'quote' && <FileText className="w-3.5 h-3.5 text-sky-600" />}
                        {action.type === 'availability' && <Calendar className="w-3.5 h-3.5 text-sky-600" />}
                        {(action.type === 'booking_created' || action.type === 'lead_created') && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                        {(action.type === 'referral_created' || action.type === 'referral_validated') && (
                          <Tag className="w-3.5 h-3.5 text-sky-600" />
                        )}
                        <span>{action.title}</span>
                      </span>
                    </div>

                    {action.type === 'quote' && (
                      <div className="space-y-2 text-slate-600">
                        <div className="font-mono tabular-nums">
                          {String(action.data.sqft)} sq ft · {String(action.data.rooms)} rooms ·{' '}
                          {String(action.data.crewSize)} specialists (~
                          {String(action.data.estimatedHours)}h)
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const d = action.data as unknown as QuoteBreakdown & QuoteInput;
                            onApplyQuote({
                              serviceType: d.serviceType,
                              sqft: Number(d.sqft) || 1800,
                              rooms: Number(d.rooms) || 4,
                              frequency: d.frequency || 'one-time',
                              addOns: Array.isArray(d.addOns) ? d.addOns : [],
                              referralCode: d.appliedReferralCode || '',
                            });
                            onClose();
                          }}
                          className="inline-flex items-center gap-1 font-semibold text-sky-700 hover:underline cursor-pointer"
                        >
                          <span>Save quote preset</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {action.type === 'referral_created' && (
                      <div className="font-mono font-bold text-sky-800">
                        Code: {String(action.data.code)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {sending && (
          <div className="flex items-center gap-2 text-xs text-slate-500 px-2">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-600" />
            <span>AetherClean is typing...</span>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
            {error}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Starter Prompt Suggestions */}
      {messages.length <= 2 && (
        <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-2.5 flex gap-1.5 overflow-x-auto">
          {STARTER_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => sendMessage(prompt)}
              className="shrink-0 rounded-lg border border-sky-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-slate-700 hover:border-sky-400 hover:text-sky-800 cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="border-t border-sky-100 bg-white p-3 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about services, quotes, slots, or bookings..."
          className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:outline-none"
        />
        <button
          type="submit"
          disabled={sending || !input.trim()}
          aria-label="Send message"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-40 cursor-pointer shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </aside>
  );
};
