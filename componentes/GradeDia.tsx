'use client';

// Grade do dia — uma coluna por profissional.
//
// É a outra forma que a agenda assume. No estúdio da Jessica há uma cadeira só,
// e o dia inteiro cabe numa coluna; na barbearia são três, e o mesmo horário
// tem três destinos diferentes.
//
// Repare que não são dois componentes concorrentes: com `colunas` de tamanho 1
// esta grade desenha exatamente a agenda de um profissional.

export type ColunaAgenda = {
  id: string;
  nome: string;
  cor: string;
};

export type CelulaAgenda = {
  colunaId: string;
  hora: string;
  titulo: string;
  subtitulo?: string;
  estado: 'marcado' | 'pedido' | 'atendido' | 'faltou';
};

export type GradeDiaProps = {
  colunas: ColunaAgenda[];
  horas: string[];
  celulas: CelulaAgenda[];
  /** Texto livre — quem chama decide o formato da data */
  titulo: string;
  onCelula?: (c: CelulaAgenda) => void;
  onVazio?: (colunaId: string, hora: string) => void;
  onNavegar?: (passo: -1 | 1) => void;
  onHoje?: () => void;
  vazio?: string;
};

const ROTULO: Record<CelulaAgenda['estado'], string> = {
  marcado: '', pedido: 'aguardando ok', atendido: 'atendido', faltou: 'faltou',
};

export default function GradeDia({
  colunas, horas, celulas, titulo,
  onCelula, onVazio, onNavegar, onHoje,
  vazio = 'O negócio não abre nesse dia.',
}: GradeDiaProps) {
  const achar = (colunaId: string, hora: string) =>
    celulas.find((c) => c.colunaId === colunaId && c.hora === hora);

  const seta = 'w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors';

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => onNavegar?.(-1)} className={seta} aria-label="dia anterior">‹</button>
        <p className="text-gray-800 capitalize flex-1">{titulo}</p>
        <button onClick={onHoje} className="text-xs text-gray-400 px-3">hoje</button>
        <button onClick={() => onNavegar?.(1)} className={seta} aria-label="próximo dia">›</button>
      </div>

      {horas.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <p className="text-gray-500">{vazio}</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-x-auto"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <table className="w-full text-sm" style={{ minWidth: 520 }}>
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-gray-400 w-16">
                  Hora
                </th>
                {colunas.map((c) => (
                  <th key={c.id} className="text-left px-3 py-3 text-[11px] text-gray-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ background: c.cor }} />
                      {c.nome}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {horas.map((h) => (
                <tr key={h} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2.5 text-gray-400 tabular-nums align-top">{h}</td>
                  {colunas.map((c) => {
                    const cel = achar(c.id, h);
                    if (!cel) {
                      return (
                        <td key={c.id} onClick={() => onVazio?.(c.id, h)}
                          className="px-3 py-2.5 text-gray-200 cursor-pointer hover:text-gray-400">
                          livre
                        </td>
                      );
                    }
                    return (
                      <td key={c.id} className="px-3 py-2">
                        <div onClick={() => onCelula?.(cel)}
                          className="rounded-lg px-2.5 py-1.5 cursor-pointer"
                          style={{ background: c.cor + '18', borderLeft: `2px solid ${c.cor}` }}>
                          <p className="text-gray-800 truncate">{cel.titulo}</p>
                          {cel.subtitulo && (
                            <p className="text-[10px] text-gray-400 truncate">{cel.subtitulo}</p>
                          )}
                          {ROTULO[cel.estado] && (
                            <p className={`text-[10px] mt-0.5 ${
                              cel.estado === 'pedido' ? 'text-red-500'
                              : cel.estado === 'atendido' ? 'text-green-600' : 'text-gray-400'}`}>
                              {ROTULO[cel.estado]}
                            </p>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
