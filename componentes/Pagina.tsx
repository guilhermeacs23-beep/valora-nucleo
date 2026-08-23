// Cabeçalho de tela do padrão Valora: título fino, marca do negócio embaixo.
export default function Pagina({
  titulo, negocio, cor = '#C4A45A', children,
}: {
  titulo: string; negocio: string; cor?: string; children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#FAFAF8] p-5">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-light text-gray-900">{titulo}</h1>
        <p className="text-[10px] tracking-widest uppercase mb-5" style={{ color: cor }}>{negocio}</p>
        {children}
      </div>
    </main>
  );
}
