'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/lib/api';

export function PortfolioClient({ categories }: { categories: [string, Product[]][] }) {
  return (
    <div className="bg-white min-h-screen">
      <style>{`
        @page { 
          size: A4 portrait; 
          margin: 10mm; 
        }
        @media print {
          body { 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
            background-color: white !important;
          }
          .no-print { display: none !important; }
          .break-inside-avoid { page-break-inside: avoid; break-inside: avoid; }
        }
      `}</style>
      
      {/* Print Control Bar */}
      <div className="no-print w-full bg-[#1e293b] text-white p-3 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <span className="font-semibold px-4 hidden md:block">Visualização de Portfólio (A4 Retrato)</span>
        <button 
          onClick={() => window.print()} 
          className="bg-[#25D366] hover:bg-[#128C7E] px-4 py-2 rounded font-bold transition-colors cursor-pointer border-none text-white shadow flex items-center gap-2"
        >
          <svg style={{width:'20px',height:'20px'}} viewBox="0 0 24 24"><path fill="currentColor" d="M18,3H6V7H18M19,12A1,1 0 0,1 18,11A1,1 0 0,1 19,10A1,1 0 0,1 20,11A1,1 0 0,1 19,12M16,19H8V14H16M19,8H5A3,3 0 0,0 2,11V17H6V21H18V17H22V11A3,3 0 0,0 19,8Z" /></svg>
          Imprimir / PDF
        </button>
      </div>

      {/* Header Banner - Takes full width in HTML and PDF */}
      <div className="w-full bg-[#0a4f5c] text-white p-6 md:p-8 flex flex-col md:flex-row justify-between items-center border-b-[6px] border-[#ffc300] print:flex-row print:px-4 print:py-3 shrink-0 break-inside-avoid">
        <div className="flex flex-col md:flex-row items-center gap-6 print:flex-row print:items-center print:gap-3">
          <div className="bg-white p-3 rounded shrink-0 flex items-center shadow-inner print:p-1.5">
             <Image src="/images/logo.png" alt="Locmais" width={180} height={60} className="select-none print:w-[120px]" />
          </div>
          <div className="text-center md:text-left print:text-left">
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-wide mb-1 text-white print:text-lg">Catálogo de Equipamentos</h1>
            <p className="text-teal-100/80 text-sm uppercase tracking-widest font-semibold m-0 print:text-[10px]">Venda & Locação</p>
          </div>
        </div>
        <div className="mt-6 md:mt-0 text-center md:text-right print:mt-0 print:text-right text-sm space-y-1 print:text-[10px]">
          <p className="font-bold text-[#ffc300] text-lg sm:text-base m-0 print:text-[11px]">(71) 3625-6693 | (71) 99945-4369</p>
          <p className="m-0">comercial@locmais.com.br</p>
        </div>
      </div>

      {/* Content Area - 4 Items per row */}
      <div className="w-full max-w-[2000px] mx-auto p-4 md:p-8 print:p-4 print:max-w-full">
         <div className="flex flex-col gap-10">
            {categories.map(([cat, prods]) => (
              <div key={cat} className="w-full">
                 
                 {/* Category Title */}
                 <div className="flex items-center gap-4 mb-6 border-b-2 border-gray-200 pb-2 break-inside-avoid">
                   <h2 className="text-xl font-black text-[#0a4f5c] uppercase m-0 leading-none">{cat}</h2>
                   <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider">{prods.length} itens</span>
                 </div>
                 
                 {/* Grid: 4 per row */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 print:grid-cols-4 gap-4 print:gap-2 w-full">
                   {prods.map(p => (
                     <div key={p.id} className="break-inside-avoid flex flex-col bg-white rounded-lg p-3 print:p-2 border border-gray-200 shadow-sm w-full h-full relative overflow-hidden transition-all hover:shadow-md">
                       
                       {/* Brand label */}
                       <div className="absolute top-0 right-0 bg-[#0a4f5c] text-white text-[9px] print:text-[7px] font-black tracking-widest px-2 py-1.5 print:px-1.5 print:py-1 rounded-bl-lg uppercase z-10 shadow-sm">
                         {p.brand}
                       </div>

                       {/* Condition tag */}
                       {p.condition && (
                         <div className="absolute top-0 left-0 bg-[#ffc300] text-[#0a4f5c] text-[9px] print:text-[7px] font-black tracking-widest px-2 py-1.5 print:px-1.5 print:py-1 rounded-br-lg uppercase z-10 shadow-sm">
                           {p.condition}
                         </div>
                       )}

                       {/* Image container */}
                       <div className="w-full aspect-[4/3] bg-gray-50 rounded flex items-center justify-center p-2 mb-3 print:mb-1.5 border border-gray-100 overflow-hidden shrink-0">
                         <img src={p.imageUrl} alt={p.name} className="w-full h-full object-contain" />
                       </div>
                       
                       {/* Product Info */}
                       <h3 className="text-sm print:text-[10px] font-bold text-gray-800 mb-1.5 print:mb-1 leading-tight flex-grow pr-2 print:pr-1 min-h-[2.5rem] print:min-h-[1.5rem]">
                         {p.name}
                       </h3>
                       
                       <p className="text-[11px] print:text-[8px] text-gray-500 mb-3 print:mb-1.5 leading-snug line-clamp-2 min-h-[2.5rem] print:min-h-[1.2rem]">
                         {p.shortDescription}
                       </p>
                       
                       <div className="border-t border-gray-100 mt-auto pt-3 print:pt-1.5">
                         {/* Badges: tipo de negócio e condição */}
                         <div className="flex flex-wrap gap-1 mb-3 print:mb-1.5">
                           {/* Locação */}
                           {(() => {
                             const bt = (p.businessType || '').toLowerCase();
                             const showLocacao = bt === '' || bt.includes('loca');
                             const showVenda = bt.includes('venda');
                             return (
                               <>
                                 {showLocacao && (
                                   <span className="text-[9px] print:text-[7px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#0a4f5c]/10 text-[#0a4f5c] border border-[#0a4f5c]/20">
                                     Locação
                                   </span>
                                 )}
                                 {showVenda && (
                                   <span className="text-[9px] print:text-[7px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#ffc300]/20 text-[#7a5c00] border border-[#ffc300]/40">
                                     Venda
                                   </span>
                                 )}
                                 {p.condition && (
                                   <span className={`text-[9px] print:text-[7px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${
                                     p.condition === 'Novo'
                                       ? 'bg-green-50 text-green-700 border-green-200'
                                       : 'bg-gray-100 text-gray-600 border-gray-300'
                                   }`}>
                                     {p.condition}
                                   </span>
                                 )}
                               </>
                             );
                           })()}
                         </div>

                         <div className="mt-3 print:mt-1.5 flex justify-between items-center bg-gray-50 -mx-3 -mb-3 p-3 print:-mx-2 print:-mb-2 print:p-2 rounded-b-lg border-t border-gray-100">
                             <div className="text-[9px] print:text-[7px] text-gray-400 font-bold uppercase tracking-widest">
                               REF: LOC-{p.id.padStart(3, '0')}
                             </div>
                             {p.price && p.condition === 'Usado' && (
                               <div className="text-[#0a4f5c] font-black text-[11px] print:text-[8px] bg-[#ffc300]/20 px-2 print:px-1 flex items-center h-6 print:h-4 rounded uppercase">
                                 R$ {p.price}
                               </div>
                             )}
                         </div>
                       </div>
                       
                     </div>
                   ))}
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  )
}
