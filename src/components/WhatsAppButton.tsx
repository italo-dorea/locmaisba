'use client';

import React from 'react';
import { WhatsAppOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';

export const WhatsAppButton = () => {
  const pathname = usePathname();
  
  if (pathname === '/portfolio') return null;

  return (
    <a
      href="https://wa.me/5571999454369"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 animate-shakeX flex items-center gap-2 bg-[#25D366] text-white rounded-full py-3 px-5 shadow-lg hover:shadow-xl hover:bg-[#128C7E] transition-all cursor-pointer group"
    >
      <WhatsAppOutlined className="text-3xl sm:text-2xl" />
      <span className="font-bold text-sm hidden sm:block">Cotação Rápida</span>
    </a>
  );
};
