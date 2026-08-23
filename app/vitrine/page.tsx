import Link from 'next/link';

const PECAS = [
  { href:'/vitrine/dashboard',  n:'Dashboard do dono',  d:'Indicadores, calendário do mês e a lista de agendamentos.', de:'Studio J.C · /agenda' },
  { href:'/vitrine/grade-mes',  n:'Grade do mês',       d:'O calendário da agenda. Dias de atendimento e cor da marca configuráveis.', de:'Studio J.C · /agenda' },
  { href:'/vitrine/grade-dia',  n:'Grade do dia',       d:'Uma coluna por profissional. Com uma cadeira só, vira a agenda do estúdio.', de:'Barbearia · /painel/agenda' },
  { href:'/vitrine/gestao',     n:'Gestão de agendamentos', d:'Cartões por mês, filtros e a tabela ordenável.', de:'Studio J.C · /agendamentos' },
  { href:'/vitrine/pedidos',    n:'Aprovação de pedidos',   d:'O que chega pelo link e espera o ok do dono.', de:'Barbearia · /painel/pedidos' },
  { href:'/vitrine/clientes',   n:'Cadastro de clientes',   d:'Busca e tabela com colunas que somem em tela estreita.', de:'Studio J.C · /clientes' },
  { href:'/vitrine/servicos',   n:'Serviços',           d:'Cardápio em Quadros ou Lista, agrupado por categoria.', de:'Studio J.C · /servicos' },
  { href:'/vitrine/caixa',      n:'Caixa do período',   d:'Faturado, ticket médio, comissão e o que se perdeu em falta.', de:'Barbearia · /painel/caixa' },
  { href:'/vitrine/conversa',   n:'WhatsApp',           d:'Conversas, thread com data e o tique de entrega.', de:'Studio J.C · /whatsapp' },
  { href:'/vitrine/entrar',     n:'Entrada',            d:'A porta de todo sistema. Só o nome e a cor mudam por cliente.', de:'todos' },
];

export default function Vitrine() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] p-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-[10px] tracking-widest text-gray-400 uppercase">Valora</p>
        <h1 className="text-3xl font-light text-gray-900 mb-1">Núcleo</h1>
        <p className="text-sm text-gray-500 mb-7 leading-relaxed">
          As telas que os sistemas compartilham, com dados de exemplo. Nenhum dado
          de cliente, nenhum login. Se uma peça só desenha com o banco junto, ela
          não está separada de verdade — e isso aparece aqui primeiro.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PECAS.map((p) => (
            <Link key={p.href} href={p.href}
              className="block bg-white rounded-2xl border border-gray-100 p-4 hover:border-[#C4A45A] transition-colors"
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <p className="font-medium text-gray-800">{p.n}</p>
              <p className="text-sm text-gray-500 mt-1 leading-snug">{p.d}</p>
              <p className="text-[11px] text-gray-400 mt-2">{p.de}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
