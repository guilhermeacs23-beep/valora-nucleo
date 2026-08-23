# Núcleo Valora

As peças que os sistemas da Valora compartilham. Uma fonte, vários consumidores.

## Por que existe

O cadastro de clientes estava escrito 5 vezes, a grade de horário 3, a agenda 2.
Corrigir um defeito exigia lembrar de todos os lugares. Aqui a peça é escrita
uma vez; quem consome passa os dados.

## O que tem dentro

- `componentes/GradeMes.tsx` — o calendário da agenda, extraído do Studio J.C
- `lib/exemplo.ts` — gerador de dados de exemplo, sem tocar banco
- `app/vitrine/` — as peças renderizadas com esses dados

## A vitrine é o teste

Se uma peça só desenha com o Supabase junto, ela **não está separada**. A vitrine
mostra isso na primeira tentativa, e não seis meses depois, quando já houver um
segundo cliente dependendo dela.

## Como um sistema usa

```
npm install github:guilhermeacs23-beep/valora-nucleo
```

No `next.config.js`:

```js
module.exports = { transpilePackages: ['valora-nucleo'] };
```

No `tailwind.config.ts`, para as classes da peça não serem descartadas:

```ts
content: ['./app/**/*.{ts,tsx}', './node_modules/valora-nucleo/**/*.{ts,tsx}']
```

E no código:

```tsx
import { GradeMes } from 'valora-nucleo';
```

## Regra

Componente daqui **não busca dado**. Recebe por props e devolve evento. Quem
sabe de Supabase é o sistema, nunca a peça.
