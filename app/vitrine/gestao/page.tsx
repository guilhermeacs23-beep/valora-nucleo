'use client';

import { useState } from 'react';
import Pagina from '@/componentes/Pagina';
import Cartoes from '@/componentes/Cartoes';
import Tabela, { type Coluna } from '@/componentes/Tabela';
import { AGENDAMENTOS } from '@/lib/dados';

type Ag = (typeof AGENDAMENTOS)[number];

export default function VitrineGestao() {
  const [status, setStatus] = useState('Todos');
  const campo = 'w-full px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white';

  const colunas: Coluna<Ag>[] = [
    { chave:'cliente', titulo:'Cliente' },
    { chave:'servico', titulo:'Serviço', some:'sm' },
    { chave:'quando',  titulo:'Data/Hora' },
    { chave:'canal',   titulo:'Canal', some:'md' },
    { chave:'preco',   titulo:'Preço', alinhar:'dir' },
  ];

  return (
    <Pagina titulo="Gestão de Agendamentos" negocio="exemplo">
      <Cartoes itens={[
        { rotulo:'Agosto (este mês)', valor:'R$ 440', sub:'4 agendamentos',  tom:'bom' },
        { rotulo:'Setembro',          valor:'R$ 720', sub:'8 agendamentos',  tom:'bom' },
        { rotulo:'Depois',            valor:'R$ 0',   sub:'0 agendamentos' },
        { rotulo:'Falta agendar',     valor:'36',     sub:'~R$ 3.535 · tkt R$ 98', tom:'atencao' },
      ]}/>
      <p className="text-xs text-gray-400 my-3">
        Total agendado (futuro): <b className="text-gray-700">R$ 1.160</b> · 12 agendamentos · 11 clientes
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white rounded-2xl p-4 mb-4"
        style={{ boxShadow:'0 2px 8px rgba(0,0,0,0.05)' }}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por status</label>
          <select className={campo} value={status} onChange={(e)=>setStatus(e.target.value)}>
            {['Todos','Confirmado','Concluído','Cancelado'].map((o)=><option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por data</label>
          <input type="date" className={campo}/>
        </div>
      </div>

      <Tabela colunas={colunas} dados={AGENDAMENTOS as Ag[]}/>
    </Pagina>
  );
}
