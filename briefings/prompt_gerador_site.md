# Prompt — Gerador de Site a partir do Briefing

Use este prompt no Claude Code para gerar o site completo de um cliente com base nos dados do briefing (CSV).

---

## Como usar

1. Certifique-se de que o arquivo CSV do cliente está na pasta `briefings/`.
2. Cole o prompt abaixo no Claude Code, substituindo `[ARQUIVO_CSV]` pelo nome do arquivo.
3. O Claude irá ler o briefing e gerar o `index.html` do site do cliente.

---

## Prompt

```
Leia o arquivo `briefings/[ARQUIVO_CSV]` e gere um site profissional completo em HTML/CSS para o cliente descrito nele.

### Instruções gerais

- Gere um único arquivo `index.html` com todo o CSS embutido no `<style>` e todo o JS no `<script>` ao final do body.
- O site deve ser 100% responsivo (mobile-first).
- Não use frameworks externos (Bootstrap, Tailwind etc.). CSS puro.
- Use Google Fonts — escolha a tipografia que melhor casa com o estilo indicado no campo `estilo`.
- Inclua um botão flutuante de WhatsApp no canto inferior direito, usando o número do campo `whatsapp_social` (ou `whatsapp` se o primeiro estiver vazio). O link deve abrir `https://wa.me/55XXXXXXXXXXX`.

---

### Mapeamento de campos → seções do site

| Campo CSV           | Onde usar no site                                              |
|---------------------|----------------------------------------------------------------|
| `nome`              | Logo/nome no nav, título da seção hero e rodapé               |
| `profissao`         | Subtítulo no hero e meta description                          |
| `objetivo`          | Guia o foco do CTA principal e da copy do hero                |
| `tipo`              | Define a estrutura (portfólio = galeria; empresa = serviços; landing = foco em conversão) |
| `estilo`            | Define paleta, tipografia, layout e tom visual (ver guia abaixo) |
| `cores`             | Reforça a paleta de cores                                      |
| `cor_exata`         | Usa como cor primária/acento se fornecida                      |
| `bio`               | Seção "Sobre" ou "Quem sou"                                    |
| `servicos`          | Seção de serviços/cards (um card por item)                     |
| `depoimentos`       | Seção de depoimentos (se preenchida)                           |
| `obs_imagens`       | Comentário HTML sobre onde cada imagem vai                     |
| `instagram`         | Ícone + link no rodapé e/ou seção social                       |
| `linkedin`          | Ícone + link no rodapé                                         |
| `tiktok`            | Ícone + link no rodapé                                         |
| `github`            | Ícone + link no rodapé                                         |
| `outro_social`      | Ícone + link no rodapé                                         |
| `refs_urls`         | Comentário HTML interno (não renderizar, apenas referência)    |
| `obs_ref`           | Orienta decisões de design (não renderizar)                    |
| `nao_quero`         | Restrições de design a respeitar (não renderizar)              |

---

### Guia de estilo visual

Aplique as seguintes diretrizes conforme o valor do campo `estilo`:

**Minimalista e clean**
- Fundo: branco ou off-white (#fafafa)
- Tipografia: serif elegante para títulos (ex: DM Serif Display, Playfair Display) + sans-serif leve para corpo
- Espaçamento generoso, muito espaço em branco
- Paleta reduzida: 1 cor de acento máximo
- Sem gradientes chamativos, sem sombras pesadas
- Layout: colunas simples, grid limpo

**Moderno e arrojado**
- Fundo: escuro (#0d0d1a ou similar)
- Tipografia: sans-serif bold (ex: Inter, Space Grotesk)
- Gradientes vibrantes azul/roxo nos elementos de destaque
- Cards com bordas brilhantes ou glow
- Seções com separação visual clara, CTAs grandes
- Animações sutis de fade-in ao scroll

**Elegante e sofisticado**
- Fundo: off-white quente (#f9f7f4) ou preto suave
- Tipografia: serif para títulos (ex: Cormorant Garamond, DM Serif Display) + sans-serif leve
- Acento em dourado (#c9a96e ou similar)
- Muito espaço, seções com padding generoso
- Linha fina como separador, sem boxes pesados
- Sem ícones coloridos — usar símbolos simples ou letras

**Divertido e colorido**
- Fundo: branco com seções coloridas em blocos
- Tipografia: rounded ou display (ex: Nunito, Poppins, Fredoka One)
- Múltiplas cores de acento (3 no máximo), usadas com alegria
- Cards arredondados, ícones grandes com emojis
- Bordas coloridas, seções alternando cores de fundo
- CTAs em rosa ou laranja com hover animado

**Sério e corporativo**
- Fundo: branco puro com seções cinza claro para separação
- Tipografia: sans-serif neutro (ex: Inter, Source Sans, DM Sans)
- Paleta restrita: azul escuro + branco + cinza
- Layout em grid regular, sem elementos decorativos
- Selos de confiança, números de impacto em destaque
- Header com logo à esquerda + nav à direita + CTA no nav

**Criativo e artístico**
- Fundo: escuro ou texturizado
- Tipografia: expressiva e misturada (display para títulos + mono ou condensed para detalhes)
- Composição assimétrica permitida
- Cores fortes e saturadas, uso consciente de contraste
- Grid irregular na galeria de portfólio
- Efeitos visuais: hover com escala, transições de cor, cursor custom se necessário

---

### Estrutura de seções por tipo de site

**Portfólio pessoal**
1. Nav (logo/nome + links âncora)
2. Hero (nome, profissão, frase de impacto + CTA de contato)
3. Sobre (bio + foto)
4. Portfólio / Galeria (grid com trabalhos)
5. Serviços (lista ou cards)
6. Depoimentos (se houver)
7. Contato (WhatsApp + redes sociais)
8. Rodapé

**Site de empresa**
1. Nav (logo + menu + CTA)
2. Hero (headline do problema que resolve + CTA)
3. Sobre a empresa (bio)
4. Serviços (cards)
5. Números / Diferenciais
6. Depoimentos (se houver)
7. CTA final (fundo escuro ou colorido)
8. Rodapé com redes sociais

**Landing page**
1. Nav mínimo (só logo + CTA)
2. Hero (headline + subhead do objetivo + CTA grande)
3. Prova social / números
4. O que está incluso / benefícios
5. Como funciona (passo a passo)
6. Depoimentos (se houver)
7. CTA final forte
8. Rodapé minimalista

---

### Imagens

Como não há imagens reais disponíveis, use placeholders com estilo consistente:
- Fotos de perfil: `<div>` estilizado com as iniciais do nome sobre fundo na cor primária
- Galeria/portfólio: `<div>` com proporção correta (ex: 4:3), fundo em gradiente suave e texto "Portfólio — [nome do projeto]"
- Logo: texto estilizado com a tipografia do site

Adicione comentários HTML (`<!-- foto de perfil aqui -->`) nos locais onde imagens reais serão inseridas.

---

### Qualidade esperada

- O resultado deve ter aparência de site profissional de agência, não de template genérico
- Cada seção deve ter copy coerente com o `objetivo` e o `estilo` do cliente
- A copy do hero deve ser escrita com base na `bio` e no `objetivo` — não use o texto bruto do CSV, reescreva de forma impactante
- Inclua micro-interações: hover nos cards, botões com transição suave, links sublinhados ao hover
- O código deve ser limpo, semântico e bem comentado por seção
```
