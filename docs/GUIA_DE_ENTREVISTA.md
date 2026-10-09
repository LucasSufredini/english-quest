# Como apresentar o English Quest

Este arquivo é um apoio para entrevista. Use as ideias como referência, mas explique com suas próprias palavras e demonstre a plataforma sempre que possível.

## Resumo em 30 segundos

“O English Quest é uma plataforma de estudos de inglês que cria uma rotina diária com base no nível, objetivo, tempo e interesses do usuário. Eu combinei input compreensível, recuperação ativa, repetição espaçada, shadowing e produção. A aplicação também separa o progresso de cada pessoa, recomenda conteúdo por perfil e funciona em celular e computador.”

## Explicação em 2 minutos

O problema que eu quis resolver foi a falta de direção. Muitas pessoas têm acesso a bons vídeos, podcasts e livros, mas gastam tempo escolhendo material ou estudam sem revisar.

Na entrada, o usuário informa nível, objetivo, tempo diário e interesses. A aplicação usa essas informações junto com a data e um identificador do visitante para montar um plano. A sessão sempre passa por quatro etapas: compreender conteúdo, recuperar o que já foi visto, praticar fala e produzir algo próprio.

No front-end, usei React e TypeScript. Os dados são salvos por uma rota de API e persistidos em um banco D1, com Drizzle para definir o esquema. Existem tabelas para perfil, dias estudados, agenda de flashcards e cartões criados pelo usuário.

Uma decisão importante foi não mostrar todos os cartões novos de uma vez. A fila coloca primeiro as revisões vencidas e depois adiciona no máximo dez cartões ainda não vistos. Isso deixa a carga diária controlada.

## Decisões técnicas que vale explicar

### Como a personalização funciona?

Os recursos recebem metadados de nível e interesse. A função de recomendação calcula uma pontuação maior para correspondências exatas e usa um hash estável para desempatar. Assim, o resultado varia entre perfis, mas não muda aleatoriamente a cada renderização.

### Como os dados de cada pessoa ficam separados?

A API obtém uma identidade autenticada quando disponível. Para visitantes anônimos, cria um UUID e o guarda em cookie `httpOnly`. Todas as leituras e gravações no banco usam esse identificador como filtro ou parte da chave.

### Como funciona a repetição espaçada?

Depois de revelar um cartão, o usuário escolhe “De novo”, “Difícil”, “Bom” ou “Fácil”. A API transforma a avaliação em um novo intervalo e salva a próxima data de revisão. A fila diária seleciona cartões vencidos antes de liberar conteúdo novo.

### Por que usar conteúdo por interesse?

O objetivo não é apenas deixar a tela personalizada. Um assunto familiar oferece mais contexto para deduzir vocabulário, aumenta a chance de contato frequente e facilita a produção de frases próprias.

### O que você melhoraria com mais tempo?

Eu adicionaria testes end-to-end, gravação de áudio para feedback de pronúncia, importação e exportação de baralhos e uma área para professores acompanharem alunos que autorizarem esse compartilhamento.

## Perguntas que podem aparecer

**Qual foi o maior desafio?**  
Transformar vários métodos de estudo em um fluxo simples. A solução foi limitar o plano a quatro blocos com duração proporcional ao tempo disponível.

**Por que não usar somente localStorage?**  
Porque o projeto precisava demonstrar persistência real e separação de dados. O banco também facilita continuar evoluindo para autenticação e sincronização entre dispositivos.

**Como você evitou recomendações iguais para todo mundo?**  
O nível e os interesses mudam a pontuação do catálogo. A data e o identificador do usuário entram no desempate estável, então perfis e dias diferentes geram planos diferentes.

**Como você testou?**  
A lógica principal tem testes automatizados para duração do plano, determinismo, personalização e fila de revisão. Também foram executados TypeScript, lint e build, além de testes manuais dos fluxos principais em tamanhos de celular e desktop.

**Você usou IA?**  
“Sim. Usei IA como ferramenta de apoio para pesquisa, prototipação e revisão. Eu defini o problema, os requisitos, os métodos de estudo, testei os fluxos e refinei as decisões do produto. Também consigo explicar a arquitetura e as regras principais do código.”

Essa resposta é melhor do que esconder a ferramenta: demonstra que você sabe usar IA com critério e continua responsável pelas decisões.

## Antes da entrevista

- abra a plataforma e confirme que o link está funcionando;
- crie um perfil de demonstração;
- conclua uma tarefa e revise um flashcard;
- saiba explicar as quatro tabelas do banco;
- escolha um desafio técnico e uma melhoria futura;
- nunca diga que implementou sozinho algo que ainda não consegue explicar.
