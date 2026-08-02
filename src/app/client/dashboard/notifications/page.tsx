'use client';

import React, { useState } from 'react';
import { ClientDashboardLayout } from '@/components/dashboard/ClientDashboardLayout';
import { Bell, Check, Trash2, Calendar, Sparkles, AlertCircle, FileText } from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'appointment' | 'alert' | 'system' | 'news';
  unread: boolean;
}

export default function ClientNotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      title: 'Viewing Appointment Confirmed',
      message: 'Your viewing for Sovereign Penthouse (Colombo 3) has been approved for August 5th at 4:00 PM.',
      time: '1 hour ago',
      type: 'appointment',
      unread: true
    },
    {
      id: 'n2',
      title: 'Price Drop Alert (- LKR 10 Mn)',
      message: 'Mirissa Ocean Cliffside Villa has been reduced to LKR 740,000,000.',
      time: '3 hours ago',
      type: 'alert',
      unread: true
    },
    {
      id: 'n3',
      title: 'New Market Guide Published',
      message: 'Read our latest guide: "Navigating Foreign Property Ownership & Deed Verification in Sri Lanka".',
      time: '1 day ago',
      type: 'news',
      unread: false
    },
    {
      id: 'n4',
      title: 'Inquiry Status Updated',
      message: 'Your inquiry #INQ-8813 status has been updated to VIEWING_SCHEDULED.',
      time: '2 days ago',
      type: 'system',
      unread: false
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <ClientDashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#D4AF37]/20 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase font-serif mb-1">
              <Bell className="w-3.5 h-3.5" /> Client Activity Hub
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-100">
              Notifications Center ({notifications.filter(n => n.unread).length} Unread)
            </h1>
          </div>

          {notifications.length > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 rounded-xl bg-[#18181B] border border-[#D4AF37]/30 text-[#D4AF37] font-semibold text-xs hover:bg-[#D4AF37] hover:text-[#0B0B0C] transition-all flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" /> Mark All as Read
            </button>
          )}
        </div>

        {/* List */}
        {notifications.length === 0 ? (
          <div className="glass-panel p-16 rounded-3xl text-center space-y-4 border border-[#D4AF37]/30">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37]">
              <Bell className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-serif text-slate-100">No Notifications</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You are all caught up! Updates about your viewing appointments, saved property alerts, and inquiry responses will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((item) => (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border transition-all flex justify-between items-start gap-4 ${
                  item.unread
                    ? 'gold-card border-[#D4AF37]/50 bg-[#121214]'
                    : 'bg-[#18181B] border-slate-800 opacity-80'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {item.type === 'appointment' && <Calendar className="w-4 h-4" />}
                    {item.type === 'alert' && <Sparkles className="w-4 h-4" />}
                    {item.type === 'news' && <FileText className="w-4 h-4" />}
                    {item.type === 'system' && <AlertCircle className="w-4 h-4" />}
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-100 text-sm font-serif">{item.title}</span>
                      {item.unread && (
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37]" title="Unread" />
                      )}
                    </div>
                    <p className="text-slate-300">{item.message}</p>
                    <div className="text-[10px] text-slate-500">{item.time}</div>
                  </div>
                </div>

                <button
                  onClick={() => deleteNotification(item.id)}
                  className="p-1.5 text-slate-500 hover:text-rose-400 text-xs"
                  title="Delete Notification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ClientDashboardLayout>
  );
}
