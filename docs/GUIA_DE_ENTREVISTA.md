# Guia para apresentar o English Quest

Este arquivo serve como apoio para entrevistas. A ideia não é decorar tudo, mas lembrar dos pontos principais e explicar com suas próprias palavras.

## Resumo rápido

“O English Quest é uma plataforma que eu criei para organizar o estudo de inglês. A pessoa escolhe o nível, o objetivo, o tempo disponível e os assuntos de que gosta. A partir disso, a plataforma monta um plano diário com conteúdos, flashcards, histórias e atividades de fala. Também usei repetição espaçada para organizar as revisões e deixei o progresso separado para cada usuário.”

## Se pedirem para explicar melhor

“Eu tive a ideia porque existem muitos conteúdos bons para aprender inglês, mas é fácil ficar perdido sem saber o que estudar ou revisar. Então eu quis criar um lugar que já mostrasse uma rotina pronta para o dia.

Primeiro, a pessoa informa o nível de inglês, o objetivo, o tempo que tem para estudar e os interesses. A plataforma usa essas informações para escolher os conteúdos e montar o plano. Eu organizei a sessão em quatro partes: entender um conteúdo, tentar lembrar o que foi visto, praticar a fala e criar uma frase ou resposta própria.

No front-end, usei React e TypeScript. Para salvar o perfil e o progresso, criei uma API e usei o banco D1 com Drizzle. Também fiz uma separação por usuário para que cada pessoa tenha suas próprias preferências, revisões e estatísticas.

Uma escolha importante foi limitar os cartões novos. Primeiro aparecem os flashcards que já estão na hora de revisar e, depois, entram no máximo dez cartões novos. Fiz isso para a revisão não crescer demais e desanimar quem está estudando.”

## Pontos técnicos importantes

### Como a recomendação funciona?

Cada conteúdo tem informações de nível e assunto. A plataforma compara esses dados com o perfil da pessoa e dá prioridade ao que combina mais. Também existe um desempate estável, então o plano não fica mudando toda vez que a página é atualizada.

### Como os dados ficam separados?

Quando a pessoa ainda não fez login, a aplicação cria um identificador e salva em um cookie seguro. Todas as consultas ao banco usam esse identificador. Quando existe um usuário conectado, a identificação da conta é usada no lugar dele.

### Como funciona a revisão dos flashcards?

Depois de ver a resposta, a pessoa escolhe entre “De novo”, “Difícil”, “Bom” ou “Fácil”. Essa escolha define depois de quanto tempo o cartão vai aparecer outra vez. Os cartões atrasados sempre entram primeiro na fila.

### Por que usar interesses pessoais?

Porque é mais fácil manter a rotina quando o conteúdo tem relação com algo de que a pessoa gosta. Além disso, um assunto conhecido ajuda a entender palavras novas pelo contexto.

## Perguntas que podem fazer

**Qual foi o maior desafio?**
“O maior desafio foi juntar vários métodos de estudo sem deixar a plataforma confusa. Para resolver isso, organizei o plano em quatro etapas curtas e ajustei o tempo de cada uma.”

**Por que não salvar tudo somente no navegador?**
“Eu queria ter persistência de verdade e deixar os dados separados. Usar um banco também facilita adicionar login e sincronização entre dispositivos no futuro.”

**Como você evita que todo mundo receba o mesmo plano?**
“O nível, o objetivo, o tempo e os interesses mudam a escolha dos conteúdos. Por isso, pessoas com perfis diferentes recebem planos diferentes.”

**Como você testou?**
“Criei testes para a duração do plano, a personalização e a fila de revisão. Também rodei as verificações do TypeScript, o lint e o build, além de testar manualmente no celular e no computador.”

**Você usou IA?**
“Usei como apoio durante a pesquisa, a prototipação e a revisão do código. Eu defini o problema, escolhi os requisitos, testei os fluxos e consigo explicar as principais decisões e como o projeto funciona.”

## Antes da entrevista

- abra a plataforma e veja se o link está funcionando;
- crie um perfil para usar na demonstração;
- mostre um plano diário e revise pelo menos um flashcard;
- escolha uma decisão técnica para explicar com calma;
- fale também de alguma melhoria que pretende fazer;
- responda de forma simples e só afirme o que você consegue explicar.
