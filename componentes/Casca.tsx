'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, X, Menu } from 'lucide-react';

// A moldura do padrão Valora: barra lateral recolhível + barra superior.
//
// Extraída do Studio J.C sem mudar o desenho. Tudo que era do estúdio virou
// parâmetro — logo, cor, nome do negócio, itens do menu, o que a busca procura.
// São as colunas do barracão: idênticas em todo cliente.

export type ItemMenu = { href: string; rot: string; ini: string };
export type GrupoMenu = { label: string; itens: ItemMenu[] };

export type Achado = { id: string; titulo: string; sub?: string; href?: string };

export type CascaProps = {
  negocio: string;
  cor?: string;
  corEscura?: string;
  /** caminho do logo; sem ele, aparece o nome do negócio */
  logo?: string;
  grupos: GrupoMenu[];
  usuario?: { nome: string; papel?: string };
  /** o que a busca do topo procura; devolver [] desliga a busca */
  buscar?: (termo: string) => Promise<Achado[]>;
  buscaDica?: string;
  /** pílula vermelha no topo, para o que exige atenção */
  alerta?: { texto: string; href: string };
  /** botão extra à direita do topo — ex.: o seletor de fundo */
  extraTopo?: ReactNode;
  aoSair?: string;
  children: ReactNode;
};

export default function Casca({
  negocio, cor = '#C4A45A', corEscura = '#8B5E3C', logo,
  grupos, usuario, buscar, buscaDica = 'Procurar...', alerta, extraTopo,
  aoSair = '/login', children,
}: CascaProps) {
  const caminho = usePathname();
  const [aberta, setAberta] = useState(true);
  const [gaveta, setGaveta] = useState(false);
  const [escuro, setEscuro] = useState(false);

  const [termo, setTermo] = useState('');
  const [achados, setAchados] = useState<Achado[]>([]);
  const [relogio, setRelogio] = useState({ h: '', ampm: '' });

  const ativo = (href: string) => caminho === href || caminho.startsWith(href + '/');

  useEffect(() => { setEscuro(document.documentElement.classList.contains('dark')); }, []);
  useEffect(() => { setGaveta(false); }, [caminho]);

  useEffect(() => {
    const tic = () => {
      const d = new Date();
      setRelogio({
        h: d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: true })
             .replace(/\s?(AM|PM)/i, ''),
        ampm: d.getHours() >= 12 ? 'PM' : 'AM',
      });
    };
    tic();
    const t = setInterval(tic, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!buscar || termo.trim().length < 2) { setAchados([]); return; }
    const t = setTimeout(() => { buscar(termo.trim()).then(setAchados); }, 250);
    return () => clearTimeout(t);
  }, [termo, buscar]);

  const trocarTema = () => {
    const el = document.documentElement;
    const novo = !el.classList.contains('dark');
    el.classList.toggle('dark', novo);
    try { localStorage.theme = novo ? 'dark' : 'light'; } catch { /* modo anônimo */ }
    setEscuro(novo);
  };

  const seta = (dir: 'esq' | 'dir') => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points={dir === 'esq' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} />
    </svg>
  );

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {gaveta && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setGaveta(false)} />
      )}

      <aside className={`fixed left-0 top-0 h-full bg-white/90 backdrop-blur border-r border-gray-100
        flex flex-col z-50 transition-all duration-200 w-[210px]
        ${aberta ? 'md:w-[210px]' : 'md:w-[56px]'}
        ${gaveta ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>

        <div className={`flex items-center border-b border-gray-100 h-14 ${aberta ? 'px-4 justify-between' : 'px-0 justify-center'}`}>
          {aberta ? (
            <>
              {logo
                ? <img src={logo} alt={negocio} className="object-contain" style={{ height: 34 }} />
                : <span className="text-lg" style={{ color: corEscura, fontFamily: 'Cormorant Garamond, serif' }}>{negocio}</span>}
              <button onClick={() => setAberta(false)}
                className="hidden md:block text-gray-400 hover:text-gray-600 transition-colors ml-2">
                {seta('esq')}
              </button>
              <button onClick={() => setGaveta(false)}
                className="md:hidden text-gray-400 hover:text-gray-600 transition-colors ml-2">
                <X size={20} />
              </button>
            </>
          ) : (
            <button onClick={() => setAberta(true)} className="text-gray-400 hover:text-gray-600 transition-colors">
              {seta('dir')}
            </button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-3">
          {grupos.map((g) => (
            <div key={g.label} className="mb-1">
              {aberta && (
                <p className="text-[10px] text-gray-400 tracking-widest px-4 py-1 font-medium">{g.label}</p>
              )}
              {g.itens.map((i) => {
                const on = ativo(i.href);
                return (
                  <Link key={i.href} href={i.href} onClick={() => setGaveta(false)}
                    title={!aberta ? i.rot : undefined}
                    className={`flex items-center transition-colors ${
                      aberta ? 'gap-3 px-4 py-2 mx-2 rounded-lg' : 'justify-center py-2.5'
                    } ${on ? 'font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                    style={on ? { background: cor + '26', color: corEscura } : undefined}>
                    <span className="text-sm font-semibold flex-shrink-0 w-5 text-center"
                      style={{ color: on ? cor : undefined }}>
                      {i.ini}
                    </span>
                    {aberta && <span className="text-sm">{i.rot}</span>}
                  </Link>
                );
              })}
              {aberta && <div className="h-px bg-gray-100 mx-4 mt-2 mb-1" />}
            </div>
          ))}
        </nav>

        <div className="border-t border-gray-100 pb-4 pt-2">
          {aberta && <p className="text-[11px] text-gray-400 px-4 py-1">{negocio}</p>}
          <button onClick={trocarTema} title={escuro ? 'Tema claro' : 'Tema escuro'}
            className={`flex items-center transition-colors w-full ${
              aberta ? 'gap-3 px-4 py-2 mx-2 rounded-lg' : 'justify-center py-2.5'
            } text-gray-500 hover:bg-gray-50 hover:text-gray-900`}>
            <span className="w-5 flex-shrink-0 flex items-center justify-center">
              {escuro ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
              )}
            </span>
            {aberta && <span className="text-sm">{escuro ? 'Tema claro' : 'Tema escuro'}</span>}
          </button>
          <Link href={aoSair} title="Sair"
            className={`flex items-center transition-colors ${
              aberta ? 'gap-3 px-4 py-2 mx-2 rounded-lg' : 'justify-center py-2.5'
            } text-red-400 hover:bg-red-50 hover:text-red-500`}>
            <span className="text-sm font-semibold w-5 text-center">X</span>
            {aberta && <span className="text-sm">Sair</span>}
          </Link>
        </div>
      </aside>

      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ml-0
        ${aberta ? 'md:ml-[210px]' : 'md:ml-[56px]'}`}>

        <header className="flex items-center gap-3 h-14 px-3 sm:px-4 bg-white/90 backdrop-blur
          border-b border-gray-200 flex-shrink-0 z-30">
          <button onClick={() => setGaveta(true)} aria-label="Abrir menu"
            className="md:hidden text-gray-600 hover:text-gray-900 transition-colors flex-shrink-0">
            <Menu size={20} />
          </button>

          {buscar && (
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={termo} onChange={(e) => setTermo(e.target.value)} placeholder={buscaDica}
                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full
                  focus:outline-none focus:bg-white transition-colors" />
              {achados.length > 0 && (
                <div className="absolute top-full mt-1.5 left-0 right-0 bg-white border border-gray-200
                  rounded-xl shadow-lg overflow-hidden z-50">
                  {achados.slice(0, 6).map((h) => (
                    <Link key={h.id} href={h.href ?? '#'} onClick={() => { setTermo(''); setAchados([]); }}
                      className="w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors flex
                        items-center gap-3 border-b border-gray-50 last:border-0">
                      <span className="w-7 h-7 rounded-full text-xs font-semibold flex items-center
                        justify-center flex-shrink-0"
                        style={{ background: cor + '26', color: corEscura }}>
                        {h.titulo.charAt(0)}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm text-gray-800 truncate">{h.titulo}</span>
                        {h.sub && <span className="block text-xs text-gray-400">{h.sub}</span>}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {alerta && (
            <Link href={alerta.href}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50
                border border-red-200 text-red-600 text-xs font-medium hover:bg-red-100
                transition-colors flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              {alerta.texto}
            </Link>
          )}

          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl font-light text-gray-700 tabular-nums leading-none">
              {relogio.h}<span className="text-xs text-gray-400 ml-1">{relogio.ampm}</span>
            </span>
            <span className="flex items-center gap-1 text-[10px] font-medium text-green-600 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              TRABALHANDO
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {extraTopo}
            {usuario && (
              <>
                <div className="text-right hidden sm:block leading-tight">
                  <p className="text-sm font-medium text-gray-800">{usuario.nome}</p>
                  <p className="text-[11px] text-gray-400">{usuario.papel ?? negocio}</p>
                </div>
                <span className="w-9 h-9 rounded-full text-white text-sm font-semibold flex items-center
                  justify-center flex-shrink-0"
                  style={{ background: `linear-gradient(to bottom right, ${cor}, ${corEscura})` }}>
                  {usuario.nome.charAt(0).toUpperCase()}
                </span>
              </>
            )}
          </div>
        </header>

        <main className="flex-1 min-h-0 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
