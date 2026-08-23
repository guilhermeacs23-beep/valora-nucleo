// Dados de exemplo das vitrines. Nomes inventados, nenhum cliente real.

export const CLIENTES = [
  { id:'1', nome:'Ana Beatriz Moreira', telefone:'(41) 99812-3344', email:'ana@exemplo.com', ultima:'12/08', faltas:0 },
  { id:'2', nome:'Camila Fontes',       telefone:'(41) 99733-8821', email:'camila@exemplo.com', ultima:'05/08', faltas:1 },
  { id:'3', nome:'Daniela Rocha',       telefone:'(41) 99655-1290', email:'dani@exemplo.com', ultima:'28/07', faltas:0 },
  { id:'4', nome:'Eduarda Prado',       telefone:'(41) 99544-7733', email:'duda@exemplo.com', ultima:'21/07', faltas:2 },
  { id:'5', nome:'Fernanda Lisboa',     telefone:'(41) 99411-6655', email:'fe@exemplo.com',    ultima:'—',     faltas:0 },
  { id:'6', nome:'Gabriela Nunes',      telefone:'(41) 99388-2211', email:'gabi@exemplo.com',  ultima:'14/08', faltas:0 },
];

export const AGENDAMENTOS = [
  { id:'1', cliente:'Ana Beatriz Moreira', servico:'Alongamento no Molde F1', quando:'26/08, 08:00', canal:'app',   preco:'R$ 140,00' },
  { id:'2', cliente:'Camila Fontes',       servico:'Blindagem + Esmaltação',  quando:'26/08, 13:30', canal:'admin', preco:'R$ 110,00' },
  { id:'3', cliente:'Daniela Rocha',       servico:'Banho de Gel',            quando:'27/08, 08:00', canal:'app',   preco:'R$ 90,00'  },
  { id:'4', cliente:'Eduarda Prado',       servico:'Alongamento no Molde F1', quando:'27/08, 18:30', canal:'app',   preco:'R$ 140,00' },
  { id:'5', cliente:'Gabriela Nunes',      servico:'Blindagem + Esmaltação',  quando:'29/08, 09:00', canal:'admin', preco:'R$ 110,00' },
];

export const PEDIDOS = [
  { id:'1', nome:'Marcos Vinicius', fone:'(41) 99811-2233', servico:'Corte + barba', quando:'quarta, 26/08 às 10:00', quem:'Rafa',  cor:'#8B5E3C', preco:'R$ 75,00' },
  { id:'2', nome:'Felipe Andrade',  fone:'(41) 98722-1144', servico:'Corte masculino', quando:'quarta, 26/08 às 14:00', quem:'Diego', cor:'#2F6F7E', preco:'R$ 45,00' },
  { id:'3', nome:'Tiago Bergamo',   fone:'(41) 99733-4455', servico:'Barba na navalha', quando:'quinta, 27/08 às 16:00', quem:'Wes', cor:'#7A5C9E', preco:'R$ 35,00' },
];

export const CARDAPIO = [
  { cat:'Corte',   itens:[{n:'Corte masculino',p:45,d:30},{n:'Corte infantil',p:35,d:30},{n:'Pezinho / acabamento',p:20,d:15}] },
  { cat:'Barba',   itens:[{n:'Barba na navalha',p:35,d:30},{n:'Sobrancelha',p:15,d:15}] },
  { cat:'Combo',   itens:[{n:'Corte + barba',p:75,d:60}] },
  { cat:'Química', itens:[{n:'Platinado',p:180,d:90}] },
];

export const CONVERSAS = [
  { id:'1', nome:'Ana Beatriz',  ultima:'Confirmo sim, obrigada!', hora:'14:22', naoLidas:0 },
  { id:'2', nome:'Camila F.',    ultima:'Consigo remarcar pra sexta?', hora:'13:40', naoLidas:2 },
  { id:'3', nome:'Daniela R.',   ultima:'Perfeito 💛', hora:'11:05', naoLidas:0 },
  { id:'4', nome:'Eduarda P.',   ultima:'Bom dia! Tem horário hoje?', hora:'09:12', naoLidas:1 },
];

export const MENSAGENS = [
  { id:'1', de:'elas' as const, txt:'Bom dia! Tem horário quinta?', hora:'09:12' },
  { id:'2', de:'nos'  as const, txt:'Bom dia! Tenho às 13:30 e às 18:30 🙂', hora:'09:20', estado:'lida' as const },
  { id:'3', de:'elas' as const, txt:'13:30 fica ótimo', hora:'09:24' },
  { id:'4', de:'nos'  as const, txt:'Marcado! Te espero quinta às 13:30 💛', hora:'09:25', estado:'entregue' as const },
];

export const POR_PROFISSIONAL = [
  { nome:'Rafa',  cor:'#8B5E3C', bruto:4820, comissao:50, cortes:107 },
  { nome:'Diego', cor:'#2F6F7E', bruto:3140, comissao:45, cortes:74  },
  { nome:'Wes',   cor:'#7A5C9E', bruto:1890, comissao:45, cortes:41  },
];

export const dinheiro = (v: number) =>
  v.toLocaleString('pt-BR', { style:'currency', currency:'BRL' });
