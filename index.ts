// Porta do núcleo. É o que os sistemas importam.
export { default as GradeMes } from './componentes/GradeMes';
export type {
  GradeMesProps, DiaDaGrade, Slot, EstadoSlot, Modo,
} from './componentes/GradeMes';
export { default as GradeDia } from './componentes/GradeDia';
export type {
  GradeDiaProps, ColunaAgenda, CelulaAgenda,
} from './componentes/GradeDia';
export { mesDeExemplo, MESES } from './lib/exemplo';
export type { OpcoesExemplo } from './lib/exemplo';
