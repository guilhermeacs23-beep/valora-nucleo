'use client';

import { useState } from 'react';
import Casca from '@/componentes/Casca';
import Cartoes from '@/componentes/Cartoes';
import { CLIENTES } from '@/lib/dados';

// A moldura, com controles para provar que é a mesma em qualquer cliente.
const RAMOS = {
  'Estúdio de beleza': {
    cor:'#C4A45A', escura:'#8B5E3C',
    grupos:[
      {label:'OPERACAO', itens:[{href:'#',rot:'Dashboard',ini:'D'},{href:'#a',rot:'Agenda',ini:'A'}]},
      {label:'CLIENTES', itens:[{href:'#c',rot:'Clientes',ini:'C'},{href:'#w',rot:'WhatsApp',ini:'W'}]},
      {label:'CADASTROS',itens:[{href:'#s',rot:'Servicos',ini:'S'},{href:'#e',rot:'Estoque',ini:'E'}]},
      {label:'FINANCEIRO',itens:[{href:'#f',rot:'Financeiro',ini:'F'}]},
    ]},
  'Barbearia': {
    cor:'#8B5E3C', escura:'#6B4423',
    grupos:[
      {label:'OPERACAO', itens:[{href:'#',rot:'Dashboard',ini:'D'},{href:'#a',rot:'Agenda',ini:'A'},{href:'#p',rot:'Pedidos',ini:'P'}]},
      {label:'CLIENTES', itens:[{href:'#c',rot:'Clientes',ini:'C'}]},
      {label:'CADASTROS',itens:[{href:'#s',rot:'Servicos',ini:'S'}]},
      {label:'FINANCEIRO',itens:[{href:'#x',rot:'Caixa',ini:'$'}]},
    ]},
  'Clínica': {
    cor:'#2F6F7E', escura:'#1E4A55',
    grupos:[
      {label:'OPERACAO', itens:[{href:'#',rot:'Dashboard',ini:'D'},{href:'#a',rot:'Agenda',ini:'A'}]},
      {label:'PACIENTES',itens:[{href:'#c',rot:'Pacientes',ini:'P'}]},
      {label:'CADASTROS',itens:[{href:'#s',rot:'Procedimentos',ini:'S'}]},
      {label:'FINANCEIRO',itens:[{href:'#f',rot:'Financeiro',ini:'F'}]},
    ]},
};

export default function VitrineCasca() {
  const [qual, setQual] = useState<keyof typeof RAMOS>('Barbearia');
  const r = RAMOS[qual];

  return (
    <Casca
      negocio={qual}
      cor={r.cor}
      corEscura={r.escura}
      grupos={r.grupos}
      usuario={{ nome: 'Dono', papel: qual }}
      buscaDica="Procurar cliente, telefone..."
      buscar={async (t) => CLIENTES
        .filter((c) => c.nome.toLowerCase().includes(t.toLowerCase()))
        .map((c) => ({ id: c.id, titulo: c.nome, sub: c.telefone }))}
      alerta={{ texto: '2 pedidos aguardando', href: '#p' }}
    >
      <div className="p-5 bg-[#FAFAF8] min-h-full">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm text-gray-500 mb-1">
            Domingo, 23 de agosto de 2026
          </p>
          <p className="text-[10px] tracking-widest uppercase mb-5" style={{ color: r.cor }}>{qual}</p>

          <div className="bg-white rounded-2xl p-4 mb-4" style={{ boxShadow:'0 2px 8px rgba(0,0,0,0.05)' }}>
            <p className="text-sm text-gray-500 mb-2">Troque o ramo e veja a mesma moldura servir outro negócio:</p>
            <div className="flex gap-2 flex-wrap">
              {(Object.keys(RAMOS) as (keyof typeof RAMOS)[]).map((k) => (
                <button key={k} onClick={() => setQual(k)}
                  className={`px-4 py-1.5 text-sm rounded-lg border transition-colors ${
                    qual === k ? 'text-white' : 'text-gray-500 border-gray-200'}`}
                  style={qual === k ? { background: RAMOS[k].cor, borderColor: RAMOS[k].cor } : undefined}>
                  {k}
                </button>
              ))}
            </div>
          </div>

          <Cartoes itens={[
            { rotulo:'Hoje', valor:'4', sub:'agendamentos' },
            { rotulo:'Mês', valor:'63', sub:'agendamentos' },
            { rotulo:'Fatur.', valor:'R$ 2.205', sub:'no mês', tom:'bom' },
            { rotulo:'Clientes', valor:'30', sub:'cadastrados' },
            { rotulo:'Aguardando', valor:'2', sub:'vieram pelo link', tom:'ruim' },
          ]}/>
        </div>
      </div>
    </Casca>
  );
}
