'use client';

import { useState } from 'react';
import Pagina from '@/componentes/Pagina';
import Tabela, { type Coluna } from '@/componentes/Tabela';
import { CLIENTES } from '@/lib/dados';

type C = (typeof CLIENTES)[number];

export default function VitrineClientes() {
  const [busca, setBusca] = useState('');
  const lista = CLIENTES.filter((c) =>
    c.nome.toLowerCase().includes(busca.toLowerCase()) || c.telefone.includes(busca));

  const colunas: Coluna<C>[] = [
    { chave:'nome', titulo:'Nome' },
    { chave:'telefone', titulo:'Telefone' },
    { chave:'email', titulo:'E-mail', some:'sm' },
    { chave:'ultima', titulo:'Última visita', some:'lg' },
    { chave:'faltas', titulo:'Faltas', some:'md',
      render:(l)=> l.faltas ? <span className="text-red-500">{l.faltas}</span> : <span className="text-gray-300">0</span> },
  ];

  return (
    <Pagina titulo="Clientes" negocio={`${CLIENTES.length} clientes cadastradas`}>
      <input value={busca} onChange={(e)=>setBusca(e.target.value)}
        placeholder="Buscar por nome, telefone ou email..."
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm mb-4"
        style={{ boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}/>
      <Tabela colunas={colunas} dados={lista as C[]} vazio="Ninguém com esse nome."/>
    </Pagina>
  );
}
