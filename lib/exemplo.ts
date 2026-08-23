import type { DiaDaGrade, Slot, EstadoSlot } from '../componentes/GradeMes';

// Dados de exemplo para a vitrine.
//
// Nenhuma linha aqui toca banco. A vitrine existe justamente para mostrar a
// peça sem o dado de ninguém — e para provar que ela funciona desacoplada:
// se a grade só desenha com o Supabase junto, ela não está separada de verdade.

/** Sorteio com semente: a vitrine abre igual toda vez, sem piscar diferente. */
function sorteio(semente: number) {
  let s = semente;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
}

export type OpcoesExemplo = {
  ano: number;
  mes: number;                 // 0 a 11
  horarios?: string[];
  diasFechados?: number[];     // 0 = domingo
  cadeiras?: number;
  semente?: number;
};

export function mesDeExemplo({
  ano, mes,
  horarios = ['08:00', '13:30', '18:30'],
  diasFechados = [0, 1, 2, 5],
  cadeiras = 1,
  semente = 7,
}: OpcoesExemplo): DiaDaGrade[] {
  const rnd = sorteio(semente);
  const primeiro = new Date(ano, mes, 1);
  const totalDias = new Date(ano, mes + 1, 0).getDate();
  const vaziosNoInicio = primeiro.getDay();

  const celulas: DiaDaGrade[] = Array(vaziosNoInicio).fill(null);

  for (let d = 1; d <= totalDias; d++) {
    const data = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const dow = new Date(ano, mes, d).getDay();
    const fechado = diasFechados.includes(dow);

    const slots: Slot[] = horarios.map((hora) => {
      let estado: EstadoSlot = 'livre';
      if (fechado) estado = 'fechado';
      else {
        const sorte = rnd();
        estado = sorte < 0.45 ? 'agendado' : sorte < 0.6 ? 'reservado' : 'livre';
      }
      return cadeiras > 1
        ? { hora, estado, total: cadeiras,
            ocupados: estado === 'agendado' ? 1 + Math.floor(rnd() * cadeiras) : 0 }
        : { hora, estado };
    });

    celulas.push({ data, numero: d, slots });
  }

  while (celulas.length % 7 !== 0) celulas.push(null);
  return celulas;
}

export const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
