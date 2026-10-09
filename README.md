# English Quest

O English Quest é uma plataforma que criei para ajudar no estudo de inglês de uma forma mais organizada. A ideia surgiu porque eu encontrava muitos vídeos, livros e podcasts bons, mas nem sempre sabia o que estudar primeiro ou como montar uma rotina.

Na plataforma, a pessoa informa o nível de inglês, o objetivo, quanto tempo tem por dia e os assuntos de que gosta. Com isso, ela recebe um plano diário com conteúdos e atividades mais próximos do seu perfil.

**[Acessar a plataforma](https://english-quest-lucas.lsufredine.chatgpt.site/)**

## O que tem na plataforma

- planos de 15, 30, 45 ou 60 minutos por dia;
- conteúdo para os níveis A1, A2, B1, B2 e C1;
- 18 opções de interesse, como games, anime, filmes, música, tecnologia e esportes;
- 76 indicações de vídeos, podcasts, livros, cursos e outras ferramentas;
- 10 histórias em inglês com vocabulário, perguntas e áudio;
- 136 flashcards prontos e opção para criar cartões próprios;
- sistema de revisão baseado na dificuldade de cada cartão;
- quiz, treino de pronúncia e atividades de fala;
- histórico de estudos, sequência de dias e meta semanal;
- progresso separado para cada pessoa;
- layout adaptado para celular e computador.

## Métodos de estudo que usei

Eu não quis deixar a plataforma presa a um método só. Por isso, juntei algumas formas de estudo que funcionam bem em conjunto:

1. **Comprehensible Input:** estudar com conteúdos que a pessoa consegue entender pelo contexto, mesmo sem conhecer todas as palavras.
2. **Active Recall:** tentar lembrar a resposta antes de olhar, em vez de apenas reler.
3. **Spaced Repetition:** rever os flashcards em intervalos diferentes, de acordo com a dificuldade.
4. **Shadowing:** ouvir uma frase e repetir logo depois, tentando acompanhar o ritmo e a pronúncia.
5. **Output:** usar o que foi estudado para falar, escrever um resumo ou dar uma opinião.

O plano diário segue uma ordem simples: entender um conteúdo, tentar lembrar, praticar a fala e criar algo usando o inglês.

## Tecnologias

- TypeScript;
- React 19;
- Next.js 16 com Vinext;
- Tailwind CSS;
- Cloudflare Workers e D1;
- Drizzle ORM;
- Web Speech API;
- Node Test Runner.

## Como organizei o projeto

A interface foi feita em React. Os conteúdos, histórias e flashcards ficam organizados por nível e interesse. O perfil e o progresso são enviados para uma API e salvos no banco D1.

Cada visitante recebe um identificador próprio. Assim, o progresso, os cartões e as preferências de uma pessoa não aparecem para outra. Se houver autenticação, a aplicação usa a identificação do usuário conectado.

As principais partes são:

- `app/`: páginas, interface e rotas da API;
- `lib/`: conteúdos e regras do plano de estudo;
- `db/`: estrutura e acesso ao banco;
- `drizzle/`: migrações do banco;
- `tests/`: testes da lógica de personalização e revisão.

## Como rodar no computador

É preciso ter Node.js 22.13 ou superior e pnpm instalados.

```bash
pnpm install
pnpm dev
```

Para conferir o projeto:

```bash
pnpm test
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

## Algumas escolhas que fiz

- limitei a quantidade de cartões novos por dia para a revisão não ficar cansativa;
- usei frases completas nos flashcards para não ensinar palavras soltas e sem contexto;
- relacionei os conteúdos aos interesses escolhidos pela pessoa;
- organizei cada sessão com começo, meio e fim;
- salvei o progresso separadamente para cada usuário;
- testei os principais fluxos em telas de celular e computador.

## O que ainda quero adicionar

- importação e exportação de baralhos;
- gravação de voz para ajudar no treino de pronúncia;
- mais testes dos fluxos completos da plataforma;
- novas histórias e trilhas por assunto;
- uma área opcional para professores acompanharem alunos.

O projeto ainda está em desenvolvimento e pretendo continuar adicionando conteúdos e melhorando a experiência de estudo.
