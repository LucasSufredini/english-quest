# English Quest

Uma plataforma de estudos de inglês que transforma nível, objetivo, tempo disponível e interesses pessoais em uma rotina diária prática.

O projeto nasceu de uma dificuldade real: existem muitos livros, vídeos, podcasts e métodos bons, mas nem sempre é fácil saber o que estudar hoje e como transformar conteúdo em aprendizado. O English Quest organiza essa decisão em uma sequência curta de input compreensível, recuperação ativa, fala e produção.

[Abrir demonstração](https://english-quest-lucas.lsufredine.chatgpt.site/)

## O que a plataforma oferece

- plano diário de 15, 30, 45 ou 60 minutos;
- conteúdo adaptado aos níveis A1, A2, B1, B2 e C1;
- personalização por objetivo e 18 áreas de interesse;
- 76 indicações de vídeos, podcasts, livros, cursos e ferramentas;
- 10 histórias graduadas com vocabulário, compreensão e áudio;
- 136 flashcards divididos por contexto, além de cartões pessoais;
- fila diária com revisões vencidas e limite de cartões novos;
- quiz rápido, áudio de pronúncia e atalhos de teclado;
- sessões guiadas para input, memória, shadowing e output;
- progresso, sequência de estudos e meta semanal;
- dados separados por visitante ou usuário autenticado;
- interface responsiva para computador e celular.

## Métodos usados

O English Quest não depende de um único método. A rotina combina técnicas que se complementam:

1. **Comprehensible Input:** contato com material próximo do nível atual, com contexto suficiente para entender a mensagem sem traduzir cada palavra.
2. **Active Recall:** tentativa de lembrar significados e formular frases antes de revelar a resposta.
3. **Spaced Repetition:** cada flashcard volta de acordo com a dificuldade informada pelo estudante.
4. **Shadowing:** repetição de trechos curtos para trabalhar ritmo, pronúncia e entonação.
5. **Output:** o estudo termina com uma fala, resumo ou opinião criada pelo próprio estudante.

O plano diário segue a ideia `INPUT + RECUPERAR + FALAR + CRIAR`. A personalização é determinística: duas pessoas com perfis diferentes recebem recomendações diferentes, e o mesmo estudante recebe um plano consistente durante o dia.

## Tecnologias

- TypeScript
- React 19 e Next.js 16 com Vinext
- Tailwind CSS e componentes acessíveis
- Cloudflare Workers e D1
- Drizzle ORM
- Web Speech API para áudio
- Node Test Runner para testes da lógica de estudo

## Arquitetura

```text
Interface React
   │
   ├── Plano e recomendações ──> catálogo local por nível/interesse
   ├── Histórias e flashcards ─> conteúdo local + Web Speech API
   └── Progresso ──────────────> /api/state
                                      │
                                      ├── perfil
                                      ├── dias de estudo
                                      ├── agenda de revisão
                                      └── cartões pessoais
                                           │
                                           └── Cloudflare D1 + Drizzle
```

A API identifica cada visitante por um cookie seguro. Quando a autenticação está disponível, usa a identidade do usuário. Todas as consultas de dados incluem esse identificador, evitando que progresso, preferências ou cartões sejam compartilhados entre pessoas.

## Como executar localmente

Pré-requisitos: Node.js 22.13 ou superior e pnpm.

```bash
pnpm install
pnpm dev
```

Para verificar o projeto:

```bash
pnpm test
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

O preview local usa o banco D1 simulado pelo Wrangler. As migrações estão na pasta `drizzle/`.

## Decisões que fizeram diferença

- **Poucos cartões novos por dia:** evita transformar repetição espaçada em uma fila impossível de manter.
- **Expressões em contexto:** os cartões usam frases completas em vez de listas de palavras soltas.
- **Conteúdo ligado a interesses:** games, anime, música, ciência e outras áreas servem como porta de entrada para o idioma.
- **Plano curto e fechado:** cada sessão tem começo, meio e fim; isso reduz a dúvida sobre o que estudar.
- **Persistência por usuário:** a experiência continua de onde cada pessoa parou.
- **Mobile first:** os principais fluxos podem ser concluídos com toque e sem rolagem horizontal.

## Próximos passos

- permitir exportar e importar baralhos;
- adicionar gravação de voz com comparação de pronúncia;
- criar testes end-to-end para os fluxos de onboarding e revisão;
- oferecer mais histórias e trilhas temáticas;
- adicionar um painel opcional para professores.

## Sobre o desenvolvimento

Este é um projeto pessoal em evolução. O produto, as regras de estudo, a seleção de conteúdo e as decisões de experiência foram refinados de forma iterativa. Ferramentas de IA foram usadas como apoio em pesquisa, prototipação e revisão de código.

Um roteiro com os principais pontos para apresentar o projeto está em [`docs/GUIA_DE_ENTREVISTA.md`](docs/GUIA_DE_ENTREVISTA.md).
