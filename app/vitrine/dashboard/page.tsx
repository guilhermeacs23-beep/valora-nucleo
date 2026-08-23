'use client';

import { useState } from 'react';
import Cartoes from '@/componentes/Cartoes';
import GradeMes from '@/componentes/GradeMes';
import { mesDeExemplo, MESES } from '@/lib/exemplo';
import { AGENDAMENTOS } from '@/lib/dados';

export default function VitrineDashboard() {
  const hoje = new Date();
  const [ref, setRef] = useState(new Date(hoje.getFullYear(), hoje.getMonth(), 1));
  const dias = mesDeExemplo({ ano: ref.getFullYear(), mes: ref.getMonth() });

  return (
    <main className="min-h-screen bg-[#FAFAF8] p-5">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-light text-gray-900">Hoje no negócio</h1>
        <p className="text-[10px] tracking-widest uppercase text-[#C4A45A] mb-5">exemplo</p>

        <Cartoes itens={[
          { rotulo:'Hoje',     valor:'4',        sub:'agendamentos' },
          { rotulo:'Mês',      valor:'35',       sub:'agendamentos' },
          { rotulo:'Fatur.',   valor:'R$ 2.720', sub:'no mês', tom:'bom' },
          { rotulo:'Clientes', valor:'47',       sub:'cadastradas' },
          { rotulo:'Agenda',   valor:'75%',      sub:'17 livres · 24 res.' },
        ]}/>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start mt-4">
          <div className="lg:col-span-2">
            <GradeMes
              dias={dias}
              titulo={`${MESES[ref.getMonth()]} ${ref.getFullYear()}`}
              hoje={`${hoje.getFullYear()}-${String(hoje.getMonth()+1).padStart(2,'0')}-${String(hoje.getDate()).padStart(2,'0')}`}
              onNavegar={(p) => setRef(new Date(ref.getFullYear(), ref.getMonth()+p, 1))}
              onHoje={() => setRef(new Date(hoje.getFullYear(), hoje.getMonth(), 1))}
            />
          </div>
          <div className="bg-white rounded-2xl p-4" style={{ boxShadow:'0 2px 8px rgba(0,0,0,0.05)' }}>
            <p className="text-xs font-light text-gray-500 tracking-widest mb-3">TODOS OS AGENDAMENTOS</p>
            {AGENDAMENTOS.map((a) => (
              <div key={a.id} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                <div className="text-right shrink-0 w-14">
                  <p className="text-[10px] text-gray-400">{a.quando.split(',')[0]}</p>
                  <p className="text-sm text-[#C4A45A]">{a.quando.split(', ')[1]}</p>
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-gray-800 truncate">{a.cliente}</p>
                  <p className="text-[11px] text-gray-400 truncate">{a.servico}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
