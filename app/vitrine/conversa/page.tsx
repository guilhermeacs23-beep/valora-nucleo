'use client';

import { useState } from 'react';
import Pagina from '@/componentes/Pagina';
import { CONVERSAS, MENSAGENS } from '@/lib/dados';

// Tique de entrega, igual ao do WhatsApp: um cinza enviada, dois entregue,
// dois azuis lida. Foi o que faltava no painel da Jessica e escondeu falha real.
function Tique({ estado }: { estado?: 'enviada'|'entregue'|'lida' }) {
  if (!estado) return null;
  const cor = estado === 'lida' ? '#34B7F1' : '#9AA5A0';
  return (
    <span style={{ color: cor }} className="text-[11px] ml-1">
      {estado === 'enviada' ? '✓' : '✓✓'}
    </span>
  );
}

export default function VitrineConversa() {
  const [ativa, setAtiva] = useState(CONVERSAS[3].id);
  const atual = CONVERSAS.find((c) => c.id === ativa)!;

  return (
    <Pagina titulo="WhatsApp" negocio="exemplo">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}>
          <p className="px-4 py-3 text-xs text-gray-500 tracking-widest border-b border-gray-100">CONVERSAS</p>
          {CONVERSAS.map((c) => (
            <div key={c.id} onClick={() => setAtiva(c.id)}
              className={`px-4 py-3 border-b border-gray-50 last:border-0 cursor-pointer ${
                c.id === ativa ? 'bg-[#F0E8D5]' : 'hover:bg-gray-50'}`}>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-gray-800 truncate">{c.nome}</p>
                <span className="text-[10px] text-gray-400 shrink-0">{c.hora}</span>
              </div>
              <div className="flex items-center justify-between gap-2 mt-0.5">
                <p className="text-[11px] text-gray-400 truncate">{c.ultima}</p>
                {c.naoLidas > 0 && (
                  <span className="text-[10px] bg-green-500 text-white rounded-full px-1.5 shrink-0">{c.naoLidas}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-2 bg-white rounded-2xl flex flex-col" style={{ boxShadow:'0 1px 4px rgba(0,0,0,0.06)', minHeight:420 }}>
          <p className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">{atual.nome}</p>
          <div className="flex-1 p-4 space-y-2">
            <p className="text-center text-[10px] text-gray-400 my-2">quarta-feira, 26/08</p>
            {MENSAGENS.map((m) => (
              <div key={m.id} className={`flex ${m.de === 'nos' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm ${
                  m.de === 'nos' ? 'bg-[#DCF8C6] text-gray-800' : 'bg-gray-100 text-gray-700'}`}>
                  {m.txt}
                  <span className="text-[10px] text-gray-400 ml-2">{m.hora}<Tique estado={m.estado}/></span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-100">
            <input placeholder="Digite uma mensagem..."
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm"/>
          </div>
        </div>
      </div>
    </Pagina>
  );
}
