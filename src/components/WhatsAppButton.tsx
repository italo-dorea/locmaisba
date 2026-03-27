'use client';

import React from 'react';
import { WhatsAppOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';
import { Dropdown } from 'antd';

export const WhatsAppButton = () => {
  const pathname = usePathname();
  
  if (pathname === '/portfolio') return null;

  return (
    <Dropdown menu={{
      items: [
        {
          key: '1',
          label: (
            <a href="https://wa.me/5571999454369" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-2 px-2 text-base font-medium hover:text-locmaisTeal">
              <WhatsAppOutlined className="text-[#25D366] text-xl" /> (71) 99945-4369
            </a>
          )
        },
        {
          key: '2',
          label: (
            <a href="https://wa.me/557192563118" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-2 px-2 text-base font-medium hover:text-locmaisTeal">
              <WhatsAppOutlined className="text-[#25D366] text-xl" /> (71) 9256-3118
            </a>
          )
        }
      ]
    }} trigger={['click']} placement="topRight">
      <div
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white rounded-full py-3 px-5 shadow-lg hover:shadow-xl hover:bg-[#128C7E] transition-all cursor-pointer group"
      >
        <WhatsAppOutlined className="text-3xl sm:text-2xl" />
        <span className="font-bold text-sm hidden sm:block">Cotação Rápida</span>
      </div>
    </Dropdown>
  );
};
