'use client';

// Faixa de indicadores. Aparece no topo de toda tela operacional.
export type Cartao = {
  rotulo: string;
  valor: string;
  sub?: string;
  tom?: 'normal' | 'bom' | 'atencao' | 'ruim';
};

const TOM = {
  normal:   'text-gray-800',
  bom:      'text-emerald-600',
  atencao:  'text-amber-600',
  ruim:     'text-red-500',
};

export default function Cartoes({ itens }: { itens: Cartao[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
      {itens.map((c) => (
        <div key={c.rotulo} className="bg-white rounded-xl p-3"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <p className="text-[9px] text-gray-400 tracking-wide uppercase truncate">{c.rotulo}</p>
          <p className={`text-2xl font-light mt-0.5 ${TOM[c.tom ?? 'normal']}`}>{c.valor}</p>
          {c.sub && <p className="text-[10px] text-gray-400 font-light">{c.sub}</p>}
        </div>
      ))}
    </div>
  );
}
