'use client';

import { useState } from 'react';
import Pagina from '@/componentes/Pagina';
import { CARDAPIO, dinheiro } from '@/lib/dados';

export default function VitrineServicos() {
  const [vis, setVis] = useState<'quadros'|'lista'>('quadros');
  const total = CARDAPIO.reduce((s,g)=>s+g.itens.length,0);

  return (
    <Pagina titulo="Gestão de Serviços" negocio="exemplo">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm text-gray-500">Visualização:</span>
        <div className="flex bg-gray-100 rounded-lg p-0.5">
          {(['quadros','lista'] as const).map((v)=>(
            <button key={v} onClick={()=>setVis(v)}
              className={`px-4 py-1.5 text-sm rounded-md font-medium transition-colors ${
                vis===v ? 'bg-[#8B5E3C] text-white' : 'text-gray-500 hover:text-gray-700'}`}>
              {v==='quadros'?'Quadros':'Lista'}
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-400">{total} registros</span>
      </div>

      {vis==='quadros' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {CARDAPIO.flatMap((g)=>g.itens.map((i)=>(
            <div key={i.n} className="bg-white rounded-2xl overflow-hidden"
              style={{ boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}>
              <div className="px-4 py-2" style={{ background:'linear-gradient(to bottom right,#C4A45A,#8B6914)' }}>
                <p className="text-[9px] uppercase tracking-widest text-white/75">{g.cat}</p>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-800">{i.n}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{i.d} minutos</p>
                <p className="text-lg font-light text-gray-800 mt-2">{dinheiro(i.p)}</p>
              </div>
            </div>
          )))}
        </div>
      ) : CARDAPIO.map((g)=>(
        <div key={g.cat} className="mb-4">
          <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-2 px-1">{g.cat}</p>
          <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}>
            {g.itens.map((i)=>(
              <div key={i.n} className="px-5 py-3 border-b border-gray-50 last:border-0 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800">{i.n}</p>
                  <p className="text-xs text-gray-400">{i.d} minutos</p>
                </div>
                <p className="text-lg font-light text-gray-800">{dinheiro(i.p)}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Pagina>
  );
}
