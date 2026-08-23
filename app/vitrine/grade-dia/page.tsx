'use client';

import { useState } from 'react';
import GradeDia, { type ColunaAgenda, type CelulaAgenda } from '@/componentes/GradeDia';

// A mesma agenda, na forma de dia. O seletor de cadeiras é o ponto: com 1 ela
// é a agenda do estúdio; com 3, a da barbearia. Nenhuma linha do componente
// muda entre os dois.

const EQUIPE: ColunaAgenda[] = [
  { id: 'a', nome: 'Rafa',  cor: '#8B5E3C' },
  { id: 'b', nome: 'Diego', cor: '#2F6F7E' },
  { id: 'c', nome: 'Wes',   cor: '#7A5C9E' },
];

const NOMES = ['Anderson R.', 'Bruno T.', 'Caio M.', 'Diego A.', 'Eduardo P.',
  'Fabio C.', 'Gustavo L.', 'Henrique S.', 'Igor B.', 'Joao Vitor R.'];
const SERVICOS = ['Corte masculino', 'Corte + barba', 'Barba na navalha', 'Pezinho'];
const HORAS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

export default function VitrineGradeDia() {
  const [quantas, setQuantas] = useState(3);
  const [ultimo, setUltimo] = useState('');

  const colunas = EQUIPE.slice(0, quantas);

  // Preenchimento estável: mesma tela a cada abertura, sem sorteio piscando.
  const celulas: CelulaAgenda[] = [];
  colunas.forEach((c, ci) => {
    HORAS.forEach((h, hi) => {
      const n = (ci * 7 + hi * 3) % 11;
      if (n < 5) {
        celulas.push({
          colunaId: c.id, hora: h,
          titulo: NOMES[(ci * 3 + hi) % NOMES.length],
          subtitulo: SERVICOS[(ci + hi) % SERVICOS.length],
          estado: n === 0 ? 'pedido' : n === 1 ? 'atendido' : 'marcado',
        });
      }
    });
  });

  const campo = 'border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 bg-white';

  return (
    <main className="min-h-screen bg-[#FAFAF8] p-5">
      <div className="max-w-4xl mx-auto">
        <p className="text-[10px] tracking-widest text-gray-400 uppercase">Núcleo Valora · vitrine</p>
        <h1 className="text-2xl font-light text-gray-900 mb-1">Grade do dia</h1>
        <p className="text-xs text-gray-400 mb-5">
          Uma coluna por profissional. Com uma cadeira só, é a agenda do estúdio.
        </p>

        <div className="flex flex-wrap items-center gap-3 mb-5">
          <select className={campo} value={quantas}
            onChange={(e) => setQuantas(Number(e.target.value))}>
            <option value={1}>1 profissional — estúdio</option>
            <option value={2}>2 profissionais</option>
            <option value={3}>3 profissionais — barbearia</option>
          </select>
        </div>

        <GradeDia
          colunas={colunas}
          horas={HORAS}
          celulas={celulas}
          titulo="quarta-feira, 26 de agosto"
          onCelula={(c) => setUltimo(`${c.titulo} às ${c.hora} — ${c.estado}`)}
          onVazio={(col, h) => setUltimo(`vago: ${h} com ${colunas.find((x) => x.id === col)?.nome}`)}
          onNavegar={(p) => setUltimo(p === 1 ? 'próximo dia' : 'dia anterior')}
          onHoje={() => setUltimo('voltou para hoje')}
        />

        <p className="text-xs text-gray-400 mt-3 h-4">{ultimo}</p>
      </div>
    </main>
  );
}
