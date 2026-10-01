'use client';

import React, { useState } from 'react';
import { ArrowUp, CheckCircle2, Send } from 'lucide-react';

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 5000);
    }
  };

  return (
    <>
      <form onSubmit={handleSubscribe} className="relative flex items-center">
        <label htmlFor="footer-email" className="sr-only">
          Email address
        </label>
        <input
          id="footer-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address..."
          required
          className="w-full bg-white/90 border border-gold/40 rounded-full pl-5 pr-32 py-3.5 text-sm text-charcoal-900 placeholder-stone-400 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] shadow-xs tracking-normal"
        />
        <button
          type="submit"
          className="absolute right-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C5A059] via-[#E2C785] to-[#B38E3C] text-charcoal-950 text-xs font-medium uppercase tracking-normal hover:opacity-95 transition-opacity flex items-center gap-1.5 shadow-md"
        >
          <span>Join</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
      {subscribed && (
        <div role="status" className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
          <CheckCircle2 className="w-4 h-4" />
          <span>Thank you! Your complimentary royal lookbook is on its way.</span>
        </div>
      )}
    </>
  );
};

export const BackToTop: React.FC = () => (
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="p-2.5 rounded-full border border-gold/40 bg-white/90 text-charcoal-800 hover:bg-gradient-to-r hover:from-[#C5A059] hover:via-[#E2C785] hover:to-[#B38E3C] hover:text-charcoal-950 transition-all shadow-xs"
    aria-label="Scroll to top"
    title="Return to top"
  >
    <ArrowUp className="w-4 h-4" />
  </button>
);
