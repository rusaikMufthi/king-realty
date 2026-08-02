'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { ClientDashboardLayout } from '@/components/dashboard/ClientDashboardLayout';
import { MessageCircle, Send, Paperclip, CheckCheck, Sparkles, Building, Shield } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'AGENT' | 'CLIENT';
  text: string;
  propertyRef?: { title: string; price: string };
  timestamp: string;
}

export default function ClientMessagesPage() {
  const { user } = useAuth();
  const [input, setInput] = useState('');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'AGENT',
      text: 'Good day! Welcome to KING Realty Advisory. I am reviewing your inquiry regarding the Sovereign Penthouse in Colombo 3.',
      propertyRef: { title: 'The Sovereign Residence – Ultra-Luxury Penthouse', price: 'LKR 650,000,000' },
      timestamp: '10:15 AM'
    },
    {
      id: 'm2',
      sender: 'CLIENT',
      text: 'Thank you! Could you confirm if the legal title deed has been verified with a clean search history?',
      timestamp: '10:18 AM'
    },
    {
      id: 'm3',
      sender: 'AGENT',
      text: 'Yes, absolutely. The deed has been fully verified by our legal counsel. All deed extracts and clear title reports are available for your review during our scheduled viewing.',
      timestamp: '10:22 AM'
    }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'CLIENT',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInput('');

    // Simulated Agent reply
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `msg-reply-${Date.now()}`,
          sender: 'AGENT',
          text: 'Thank you for your message. I have logged your request and will provide updated documentation shortly.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1500);
  };

  return (
    <ClientDashboardLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Chat Header Card */}
        <div className="gold-card p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="relative w-12 h-12 rounded-xl bg-[#18181B] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] font-bold text-lg font-serif">
              KR
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold font-serif text-slate-100">KING Realty Principal Advisory Desk</h2>
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online Direct
                </span>
              </div>
              <p className="text-xs text-slate-400">Direct confidential messaging channel with your agent</p>
            </div>
          </div>
        </div>

        {/* Chat Messages Box */}
        <div className="glass-panel rounded-2xl border border-[#D4AF37]/30 flex flex-col h-[520px] overflow-hidden shadow-2xl">
          {/* Scrollable Message History */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'CLIENT' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-md p-4 rounded-2xl space-y-2 ${
                    msg.sender === 'CLIENT'
                      ? 'bg-gradient-to-r from-[#BF953F] to-[#AA771C] text-[#0B0B0C] font-medium rounded-tr-none shadow-lg'
                      : 'bg-[#18181B] border border-[#D4AF37]/30 text-slate-100 rounded-tl-none'
                  }`}
                >
                  {msg.propertyRef && (
                    <div className="bg-black/30 p-2.5 rounded-xl border border-white/10 text-[11px] space-y-1 mb-2">
                      <div className="font-bold flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-[#D4AF37]" /> Property Attached:
                      </div>
                      <div className="font-semibold">{msg.propertyRef.title}</div>
                      <div className="text-[#D4AF37] font-bold">{msg.propertyRef.price}</div>
                    </div>
                  )}

                  <p className="leading-relaxed">{msg.text}</p>
                </div>

                <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1 px-1">
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'CLIENT' && <CheckCheck className="w-3 h-3 text-[#D4AF37]" />}
                </div>
              </div>
            ))}
          </div>

          {/* Typing Bar Form */}
          <form onSubmit={handleSend} className="p-4 bg-[#0E0E10] border-t border-[#D4AF37]/20 flex items-center gap-3">
            <input
              type="text"
              placeholder="Type your message or title inquiry..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-[#18181B] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
            />

            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#AA771C] text-[#0B0B0C] font-bold text-xs shadow-lg hover:brightness-110 flex items-center gap-1.5 flex-shrink-0"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </ClientDashboardLayout>
  );
}
