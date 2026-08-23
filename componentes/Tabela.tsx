'use client';

// Tabela do padrão Valora. Agendamentos, clientes, estoque e faturas são a
// mesma tela com colunas diferentes — por isso ela recebe as colunas.
export type Coluna<T> = {
  chave: keyof T & string;
  titulo: string;
  alinhar?: 'esq' | 'dir';
  /** Esconde em tela estreita, na ordem em que estorva menos */
  some?: 'sm' | 'md' | 'lg';
  render?: (linha: T) => React.ReactNode;
};

export default function Tabela<T extends { id: string }>({
  colunas, dados, onLinha, vazio = 'Nada aqui.',
}: {
  colunas: Coluna<T>[];
  dados: T[];
  onLinha?: (l: T) => void;
  vazio?: string;
}) {
  const somer = { sm: 'hidden sm:table-cell', md: 'hidden md:table-cell', lg: 'hidden lg:table-cell' };

  if (!dados.length) {
    return <div className="bg-white rounded-2xl p-8 text-center text-sm text-gray-400"
      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>{vazio}</div>;
  }

  return (
    <div className="bg-white rounded-2xl p-3 overflow-x-auto"
      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b border-gray-100">
            {colunas.map((c) => (
              <th key={c.chave}
                className={`px-4 py-3 font-medium ${c.some ? somer[c.some] : ''} ${c.alinhar === 'dir' ? 'text-right' : ''}`}>
                {c.titulo}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dados.map((l) => (
            <tr key={l.id} onClick={() => onLinha?.(l)}
              className="border-b border-gray-50 last:border-0 hover:bg-gray-50 cursor-pointer">
              {colunas.map((c) => (
                <td key={c.chave}
                  className={`px-4 py-3 text-gray-700 ${c.some ? somer[c.some] : ''} ${c.alinhar === 'dir' ? 'text-right' : ''}`}>
                  {c.render ? c.render(l) : String(l[c.chave] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
