import Link from 'next/link';

const PECAS = [
  { href: '/vitrine/grade-mes', nome: 'Grade do mês',
    d: 'O calendário da agenda. Um profissional ou vários, dias de atendimento configuráveis.',
    de: 'extraída de Studio J.C · /agenda' },
  { href: '/vitrine/grade-dia', nome: 'Grade do dia',
    d: 'A mesma agenda por dia, com uma coluna por profissional. Com uma cadeira só, vira a agenda do estúdio.',
    de: 'extraída de Barbearia · /painel/agenda' },
];

export default function Vitrine() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] p-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-[10px] tracking-widest text-gray-400 uppercase">Valora</p>
        <h1 className="text-3xl font-light text-gray-900 mb-1">Núcleo</h1>
        <p className="text-sm text-gray-500 mb-7 leading-relaxed">
          As peças que os sistemas compartilham, mostradas com dados de exemplo.
          O que aparece aqui é o mesmo código que roda nos clientes — não é cópia
          nem maquete. Se a peça só desenha com o banco junto, ela não está
          separada de verdade, e isso aparece aqui primeiro.
        </p>

        {PECAS.map((p) => (
          <Link key={p.href} href={p.href}
            className="block bg-white rounded-2xl border border-gray-100 p-5 mb-3 hover:border-[#C4A45A] transition-colors"
            style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <p className="font-medium text-gray-800">{p.nome}</p>
            <p className="text-sm text-gray-500 mt-1">{p.d}</p>
            <p className="text-[11px] text-gray-400 mt-2">{p.de}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
