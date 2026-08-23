'use client';

import { useState } from 'react';
import Pagina from '@/componentes/Pagina';
import { PEDIDOS } from '@/lib/dados';
import { Check, X } from 'lucide-react';

export default function VitrinePedidos() {
  const [lista, setLista] = useState(PEDIDOS);
  const [recado, setRecado] = useState('');

  const decidir = (id: string, aceita: boolean) => {
    const p = lista.find((x) => x.id === id);
    if (p) setRecado(aceita
      ? `${p.nome} entrou na agenda: ${p.quando}, com ${p.quem}.`
      : `Pedido de ${p.nome} recusado. O horário voltou a ficar livre.`);
    setLista((l) => l.filter((x) => x.id !== id));
  };

  return (
    <Pagina titulo="Pedidos de horário" negocio="chegaram pelo link" cor="#8B5E3C">
      {recado && (
        <div className="bg-green-50 border border-green-100 rounded-2xl px-5 py-4 mb-3">
          <p className="text-sm text-green-700">{recado}</p>
        </div>
      )}
      {lista.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center" style={{ boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}>
          <p className="text-gray-500">Nenhum pedido esperando.</p>
          <button onClick={()=>{setLista(PEDIDOS);setRecado('');}}
            className="text-xs text-[#8B5E3C] underline mt-2">repor os pedidos</button>
        </div>
      ) : lista.map((p) => (
        <div key={p.id} className="bg-white rounded-2xl p-5 mb-3" style={{ boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="min-w-0">
              <p className="text-gray-800 font-medium">{p.nome}</p>
              <p className="text-xs text-gray-400 mt-0.5">{p.fone}</p>
              <p className="text-sm text-gray-600 mt-2">{p.servico}</p>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 flex-wrap">
                <span>{p.quando}</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background:p.cor }}/>{p.quem}
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xl font-light text-gray-800">{p.preco}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={()=>decidir(p.id,false)}
                  className="px-3 py-2 rounded-xl border border-gray-200 text-gray-500 text-sm flex items-center gap-1.5">
                  <X size={14}/> Recusar
                </button>
                <button onClick={()=>decidir(p.id,true)}
                  className="px-4 py-2 rounded-xl text-white text-sm flex items-center gap-1.5"
                  style={{ background:'linear-gradient(to bottom right,#8B5E3C,#6B4423)' }}>
                  <Check size={14}/> Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Pagina>
  );
}
