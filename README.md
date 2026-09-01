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

## Tela de login (LoginValora)

A mesma porta para todo produto da casa. A logo da Valora manda, o nome do
produto vem pequeno embaixo — se a tela mostrasse só a Valora, a atendente do
restaurante abriria o tablet e poderia achar que errou o endereço; ela comprou
"o sistema do restaurante" e talvez nunca ouça falar da Valora.

```tsx
import { LoginValora } from 'valora-nucleo';

<LoginValora
  produto="Lead+"                        // some se não passar
  tagline="Inteligência que impulsiona"
  onEntrar={async (email, senha) => {    // devolve texto do erro, ou nada
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (error) return 'E-mail ou senha incorretos.';
    window.location.href = '/home';
  }}
  hrefCriarConta="/cadastro"             // some se não passar
/>
```

**O componente não autentica.** Recebe `onEntrar` e devolve e-mail e senha;
quem fala com o Supabase é cada aplicativo, porque cada um tem o seu cliente e
o seu destino depois do login.

**Cada sistema precisa de `public/valora.png`.** É a única coisa que não vem no
pacote: pacote npm não serve arquivo estático. Copie de outro sistema — todos
usam o mesmo arquivo, 66 kB.

O fundo troca sozinho a cada 7 dias, rodando entre 12 fotos. Para usar outras,
passe `fundos={[...]}`.

### Só a moldura (MolduraValora)

Quando o sistema já tem a sua tela de login com regras próprias, use só a
moldura e ponha o cartão dele dentro. O visual fica igual ao dos outros e
nenhuma regra é tocada.

```tsx
import { MolduraValora } from 'valora-nucleo';

<MolduraValora produto="Studio J.C">
  <div className="...o cartão do sistema, como já era...">
    {/* formulário, regras, links — tudo intacto */}
  </div>
</MolduraValora>
```

Foi o caso do Studio J.C.: login por e-mail ou celular, troca de senha na
própria tela e três destinos diferentes depois de entrar. Trocar a tela
inteira levaria essas regras junto.
