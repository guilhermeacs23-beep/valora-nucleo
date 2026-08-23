'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

// Grade do mês — a peça central da agenda.
//
// Extraída da tela do Studio J.C sem mudar uma linha do desenho. A diferença é
// que ela não sabe de onde vem o dado: quem chama entrega os dias já resolvidos.
// É isso que permite a mesma grade servir o estúdio, a barbearia e a vitrine
// com dados de exemplo.

export type EstadoSlot = 'agendado' | 'reservado' | 'livre' | 'fechado';

export type Slot = {
  hora: string;
  estado: EstadoSlot;
  /** Quantos ocupam este horário. Só aparece quando há mais de uma cadeira. */
  ocupados?: number;
  total?: number;
};

export type DiaDaGrade = {
  /** AAAA-MM-DD */
  data: string;
  numero: number;
  slots: Slot[];
} | null;

export type Modo = 'dia' | 'semana' | 'mes';

export type GradeMesProps = {
  /** 35 ou 42 células; null onde o mês não começou ou já acabou */
  dias: DiaDaGrade[];
  titulo: string;
  hoje: string;
  selecionado?: string;
  modo?: Modo;
  /** Cor da marca do negócio. Só isto muda de um cliente para outro. */
  cor?: string;
  diasAbrev?: string[];
  onDia?: (data: string) => void;
  onDiaDuplo?: (data: string) => void;
  onSlot?: (data: string, slot: Slot) => void;
  onHoje?: () => void;
  onNavegar?: (passo: -1 | 1) => void;
  onModo?: (m: Modo) => void;
};

const CLASSE: Record<EstadoSlot, string> = {
  agendado:  'bg-green-100 text-green-700 border-green-200',
  reservado: 'bg-blue-100 text-blue-700 border-blue-200',
  fechado:   'bg-blue-100 text-blue-700 border-blue-200',
  livre:     'bg-gray-100 text-gray-400 border-gray-200',
};

const TITULO: Record<EstadoSlot, string> = {
  agendado:  'agendado',
  reservado: 'reservado (clique para liberar)',
  fechado:   'fechado (clique para encaixar mesmo assim)',
  livre:     'livre (clique para reservar)',
};

export default function GradeMes({
  dias, titulo, hoje, selecionado, modo = 'mes', cor = '#C4A45A',
  diasAbrev = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
  onDia, onDiaDuplo, onSlot, onHoje, onNavegar, onModo,
}: GradeMesProps) {
  const btn = 'px-3 py-1.5 text-xs transition-colors';

  return (
    <div className="bg-white rounded-2xl overflow-hidden"
      style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>

      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <button onClick={onHoje}
            className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            Hoje
          </button>
          <button onClick={() => onNavegar?.(-1)}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
            <ChevronLeft size={16} />
          </button>
          <button onClick={() => onNavegar?.(1)}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
            <ChevronRight size={16} />
          </button>
          <span className="text-sm font-medium text-gray-700 ml-1">{titulo}</span>
        </div>

        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
          {(['dia', 'semana', 'mes'] as const).map((v) => (
            <button key={v} onClick={() => onModo?.(v)}
              className={`${btn} capitalize ${modo === v ? 'text-white' : 'text-gray-500 hover:bg-gray-50'}`}
              style={modo === v ? { background: cor } : undefined}>
              {v === 'dia' ? 'Dia' : v === 'semana' ? 'Semana' : 'Mes'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 px-2 py-2 text-[11px] text-gray-500 flex-wrap">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-green-100 border border-green-200" />agendado</span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-blue-100 border border-blue-200" />reservado</span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-gray-100 border border-gray-200" />livre</span>
        <span className="text-gray-400 hidden sm:inline">· clique num horário para reservar ou liberar</span>
      </div>

      <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50">
        {diasAbrev.map((d) => (
          <div key={d} className="py-2 text-center text-[11px] font-medium text-gray-500 uppercase tracking-wide">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {dias.map((dia, idx) => {
          if (!dia) {
            return <div key={`vazio-${idx}`} className="min-h-[112px] border-b border-r border-gray-100 bg-gray-50/40" />;
          }
          const ehHoje = dia.data === hoje;
          const ultimaColuna = (idx + 1) % 7 === 0;

          return (
            <div key={dia.data}
              onClick={() => onDia?.(dia.data)}
              onDoubleClick={() => onDiaDuplo?.(dia.data)}
              title="Clique num horário para reservar · duplo-clique no dia para agendar"
              className={`min-h-[112px] border-b border-gray-100 p-1.5 transition-colors cursor-pointer
                ${!ultimaColuna ? 'border-r' : ''}
                ${dia.data === selecionado ? 'ring-2 ring-inset' : ''}
                ${ehHoje ? '' : 'bg-white hover:bg-gray-50'}`}
              style={{
                ...(dia.data === selecionado ? { boxShadow: `inset 0 0 0 2px ${cor}` } : {}),
                ...(ehHoje ? { background: cor + '18' } : {}),
              }}>

              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mb-1
                  ${ehHoje ? 'text-white font-semibold' : 'text-gray-600'}`}
                style={ehHoje ? { background: cor } : undefined}>
                {dia.numero}
              </div>

              <div className="space-y-1">
                {dia.slots.map((s) => (
                  <button key={s.hora} type="button" title={TITULO[s.estado]}
                    onClick={(e) => { e.stopPropagation(); onSlot?.(dia.data, s); }}
                    onDoubleClick={(e) => e.stopPropagation()}
                    className={`w-full text-center text-[10px] rounded px-1 py-0.5 leading-tight border transition hover:opacity-80 ${CLASSE[s.estado]}`}>
                    {s.hora}
                    {s.total && s.total > 1 && (
                      <span className="opacity-60"> {s.ocupados ?? 0}/{s.total}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
