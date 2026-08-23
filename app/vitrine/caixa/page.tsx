'use client';

import Pagina from '@/componentes/Pagina';
import Cartoes from '@/componentes/Cartoes';
import { POR_PROFISSIONAL, dinheiro } from '@/lib/dados';

export default function VitrineCaixa() {
  const bruto = POR_PROFISSIONAL.reduce((s,b)=>s+b.bruto,0);
  const cortes = POR_PROFISSIONAL.reduce((s,b)=>s+b.cortes,0);
  const comissao = POR_PROFISSIONAL.reduce((s,b)=>s+b.bruto*b.comissao/100,0);
  const teto = Math.max(...POR_PROFISSIONAL.map((b)=>b.bruto));

  return (
    <Pagina titulo="Caixa" negocio="agosto · exemplo" cor="#8B5E3C">
      <Cartoes itens={[
        { rotulo:'Faturado',   valor:dinheiro(bruto),          sub:`${cortes} atendimentos`, tom:'bom' },
        { rotulo:'Ticket médio', valor:dinheiro(bruto/cortes), sub:'por cliente' },
        { rotulo:'Comissão',   valor:dinheiro(comissao),       sub:'a repassar' },
        { rotulo:'Perdido em faltas', valor:dinheiro(430),     sub:'6 faltas', tom:'ruim' },
      ]}/>

      <div className="bg-white rounded-2xl p-5 mt-4" style={{ boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}>
        <p className="text-sm text-gray-500 mb-4">Por profissional</p>
        {POR_PROFISSIONAL.map((b)=>(
          <div key={b.nome} className="mb-4 last:mb-0">
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="flex items-center gap-2 text-gray-700">
                <span className="w-2 h-2 rounded-full" style={{ background:b.cor }}/>
                {b.nome}<span className="text-xs text-gray-400">{b.cortes} cortes</span>
              </span>
              <span className="text-gray-800">{dinheiro(b.bruto)}
                <span className="text-xs text-gray-400"> · {dinheiro(b.bruto*b.comissao/100)} dele</span>
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full"
                style={{ width:`${Math.max(3,(b.bruto/teto)*100)}%`, background:b.cor }}/>
            </div>
          </div>
        ))}
      </div>
    </Pagina>
  );
}
