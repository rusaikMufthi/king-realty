'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  propertyTitle?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ propertyTitle }) => {
  const phone = '+94776937333';
  const text = propertyTitle
    ? `Hello KING Realty, I am inquiring about the property: "${propertyTitle}". Please provide further details.`
    : `Hello KING Realty, I would like to schedule a private real estate advisory consultation.`;

  const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl shadow-emerald-900/50 flex items-center gap-2 border border-emerald-400/40 hover:scale-105 transition-all group"
      title="Direct WhatsApp Consultation"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="hidden sm:inline text-xs font-bold tracking-wide pr-1">
        WhatsApp Advisory
      </span>
    </a>
  );
};
