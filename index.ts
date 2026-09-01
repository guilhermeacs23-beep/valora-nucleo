// Porta do núcleo. É o que os sistemas importam.
export { default as GradeMes } from './componentes/GradeMes';
export type {
  GradeMesProps, DiaDaGrade, Slot, EstadoSlot, Modo,
} from './componentes/GradeMes';
export { default as Casca } from './componentes/Casca';
export type { CascaProps, GrupoMenu, ItemMenu, Achado } from './componentes/Casca';
export { default as Cartoes } from './componentes/Cartoes';
export type { Cartao } from './componentes/Cartoes';
export { default as Tabela } from './componentes/Tabela';
export type { Coluna } from './componentes/Tabela';
export { default as Pagina } from './componentes/Pagina';
export { default as GradeDia } from './componentes/GradeDia';
export type {
  GradeDiaProps, ColunaAgenda, CelulaAgenda,
} from './componentes/GradeDia';
export { default as LoginValora, MolduraValora, fundoDaSemana } from './componentes/LoginValora';
export type { LoginValoraProps } from './componentes/LoginValora';
export { default as VitrineValora, PRODUTOS_VALORA } from './componentes/VitrineValora';
export type { ProdutoValora } from './componentes/VitrineValora';
export { mesDeExemplo, MESES } from './lib/exemplo';
export type { OpcoesExemplo } from './lib/exemplo';
