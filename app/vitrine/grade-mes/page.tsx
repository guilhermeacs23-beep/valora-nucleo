'use client';

import { useState } from 'react';
import GradeMes, { type Modo, type Slot } from '@/componentes/GradeMes';
import { mesDeExemplo, MESES } from '@/lib/exemplo';

// Vitrine da grade do mês: a peça real, com dado inventado.
//
// Os controles do topo não são enfeite — são a prova de que a peça é
// parametrizável. Mexer no número de cadeiras ou nos dias fechados muda a
// tela sem tocar no componente.

export default function VitrineGradeMes() {
  const hoje = new Date();
  const [ref, setRef] = useState(new Date(hoje.getFullYear(), hoje.getMonth(), 1));
  const [modo, setModo] = useState<Modo>('mes');
  const [cadeiras, setCadeiras] = useState(1);
  const [cor, setCor] = useState('#C4A45A');
  const [selecionado, setSelecionado] = useState<string>();
  const [ultimo, setUltimo] = useState('');

  const fechadosPorRamo: Record<string, number[]> = {
    'Estúdio (qua, qui, sáb)': [0, 1, 2, 5],
    'Barbearia (ter a sáb)':   [0, 1],
    'Aberto todo dia':         [],
  };
  const [ramo, setRamo] = useState(Object.keys(fechadosPorRamo)[0]);

  const dias = mesDeExemplo({
    ano: ref.getFullYear(), mes: ref.getMonth(),
    diasFechados: fechadosPorRamo[ramo],
    horarios: cadeiras > 1
      ? ['09:00', '11:00', '14:00', '16:00', '18:00']
      : ['08:00', '13:30', '18:30'],
    cadeiras,
  });

  const andar = (p: -1 | 1) =>
    setRef(new Date(ref.getFullYear(), ref.getMonth() + p, 1));

  const campo = 'border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 bg-white';

  return (
    <main className="min-h-screen bg-[#FAFAF8] p-5">
      <div className="max-w-5xl mx-auto">
        <p className="text-[10px] tracking-widest text-gray-400 uppercase">Núcleo Valora · vitrine</p>
        <h1 className="text-2xl font-light text-gray-900 mb-1">Grade do mês</h1>
        <p className="text-xs text-gray-400 mb-5">
          O componente real da agenda, com dados de exemplo. Nenhum dado de cliente.
        </p>

        <div className="flex flex-wrap items-center gap-3 mb-5">
          <select className={campo} value={ramo} onChange={(e) => setRamo(e.target.value)}>
            {Object.keys(fechadosPorRamo).map((r) => <option key={r}>{r}</option>)}
          </select>
          <select className={campo} value={cadeiras}
            onChange={(e) => setCadeiras(Number(e.target.value))}>
            <option value={1}>1 profissional</option>
            <option value={3}>3 profissionais</option>
            <option value={5}>5 profissionais</option>
          </select>
          <label className="flex items-center gap-2 text-sm text-gray-500">
            cor da marca
            <input type="color" value={cor} onChange={(e) => setCor(e.target.value)}
              className="w-9 h-8 border-0 bg-transparent p-0 cursor-pointer" />
          </label>
        </div>

        <GradeMes
          dias={dias}
          titulo={`${MESES[ref.getMonth()]} ${ref.getFullYear()}`}
          hoje={`${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`}
          selecionado={selecionado}
          modo={modo}
          cor={cor}
          onModo={setModo}
          onHoje={() => setRef(new Date(hoje.getFullYear(), hoje.getMonth(), 1))}
          onNavegar={andar}
          onDia={(d) => { setSelecionado(d); setUltimo(`dia ${d}`); }}
          onDiaDuplo={(d) => setUltimo(`duplo clique em ${d} — abriria o agendamento`)}
          onSlot={(d, s: Slot) => setUltimo(`${d} às ${s.hora} — estava ${s.estado}`)}
        />

        <p className="text-xs text-gray-400 mt-3 h-4">{ultimo}</p>
      </div>
    </main>
  );
}
