export type Level = "A1" | "A2" | "B1" | "B2" | "C1";
export type Interest =
  | "games" | "anime" | "cartoons" | "movies" | "series" | "books"
  | "music" | "sports" | "travel" | "tech" | "science" | "history"
  | "food" | "fitness" | "work" | "study" | "news" | "daily";

export const interestLabels: Record<Interest, string> = {
  games: "Games", anime: "Anime", cartoons: "Desenhos", movies: "Filmes", series: "Séries",
  books: "Livros", music: "Música", sports: "Esportes", travel: "Viagens", tech: "Tecnologia",
  science: "Ciência", history: "História", food: "Culinária", fitness: "Saúde e treino",
  work: "Trabalho", study: "Faculdade", news: "Notícias", daily: "Vida real",
};

export const levelCopy: Record<Level, { label: string; canDo: string; focus: string }> = {
  A1: { label: "Iniciante", canDo: "Entender e usar frases muito comuns.", focus: "vocabulário essencial e frases curtas" },
  A2: { label: "Básico", canDo: "Conversar sobre rotina, gostos e necessidades.", focus: "escuta clara e construção de frases" },
  B1: { label: "Intermediário", canDo: "Entender os pontos principais e contar experiências.", focus: "fluência funcional e vocabulário em contexto" },
  B2: { label: "Intermediário alto", canDo: "Interagir com naturalidade e acompanhar conteúdo complexo.", focus: "nuance, velocidade real e argumentação" },
  C1: { label: "Avançado", canDo: "Usar o idioma com flexibilidade em situações exigentes.", focus: "precisão, estilo e comunicação profissional" },
};

export type Resource = {
  id: string; title: string; creator: string; type: "Vídeo" | "Podcast" | "Livro" | "Prática" | "Curso";
  levels: Level[]; interests: Interest[]; duration: string; description: string; url: string; free: boolean;
};

export const resources: Resource[] = [
  { id:"bc-listening", title:"Listening por nível", creator:"British Council", type:"Curso", levels:["A1","A2","B1","B2","C1"], interests:["daily"], duration:"10–20 min", description:"Áudios, transcrições e exercícios organizados por CEFR.", url:"https://learnenglish.britishcouncil.org/free-resources/listening", free:true },
  { id:"bc-podcast", title:"LearnEnglish Podcasts", creator:"British Council", type:"Podcast", levels:["A2","B1"], interests:["daily"], duration:"20 min", description:"Conversas claras com transcrição e atividades de compreensão.", url:"https://learnenglish.britishcouncil.org/general-english/audio-series/podcasts", free:true },
  { id:"bbc-easy", title:"Real Easy English", creator:"BBC Learning English", type:"Vídeo", levels:["A1","A2"], interests:["daily"], duration:"6–10 min", description:"Inglês cotidiano em ritmo acessível, ideal para começar a ouvir.", url:"https://www.bbclearningenglish.com/", free:true },
  { id:"bbc-six", title:"6 Minute English", creator:"BBC Learning English", type:"Podcast", levels:["B1","B2"], interests:["daily","tech"], duration:"6 min", description:"Um tema por episódio, vocabulário destacado e transcrição.", url:"https://www.bbc.co.uk/learningenglish/english/features/6-minute-english", free:true },
  { id:"bbc-news", title:"Learning English from the News", creator:"BBC Learning English", type:"Vídeo", levels:["B2","C1"], interests:["daily","tech"], duration:"8–12 min", description:"Notícias reais explicadas com foco na linguagem usada.", url:"https://www.bbclearningenglish.com/", free:true },
  { id:"voa-level1", title:"Let's Learn English — Level 1", creator:"VOA Learning English", type:"Curso", levels:["A1","A2"], interests:["daily"], duration:"15 min", description:"Curso em vídeo com fala lenta, situações reais e atividades.", url:"https://learningenglish.voanews.com/p/5644.html", free:true },
  { id:"easy-english", title:"Easy English", creator:"Easy Languages", type:"Vídeo", levels:["A2","B1","B2"], interests:["daily"], duration:"8–15 min", description:"Entrevistas de rua com legendas em inglês para ouvir fala real.", url:"https://www.youtube.com/@EasyEnglishVideos", free:true },
  { id:"lucy", title:"English with Lucy", creator:"Lucy Bella Earl", type:"Vídeo", levels:["A2","B1","B2","C1"], interests:["daily"], duration:"10–20 min", description:"Pronúncia, vocabulário e gramática apresentados com clareza.", url:"https://www.youtube.com/@EnglishwithLucy", free:true },
  { id:"youglish", title:"YouGlish", creator:"YouGlish", type:"Prática", levels:["A2","B1","B2","C1"], interests:["daily","movies","series","tech"], duration:"5 min", description:"Pesquise uma palavra e escute dezenas de exemplos reais no YouTube.", url:"https://youglish.com/", free:true },
  { id:"lyricstraining", title:"LyricsTraining", creator:"LyricsTraining", type:"Prática", levels:["A1","A2","B1","B2"], interests:["anime","movies","series","music"], duration:"10 min", description:"Complete trechos de músicas enquanto treina escuta e ortografia.", url:"https://lyricstraining.com/", free:true },
  { id:"penguin", title:"Penguin Readers", creator:"Penguin", type:"Livro", levels:["A1","A2","B1","B2"], interests:["books","anime","games","movies","series","tech","daily"], duration:"15–25 min", description:"Livros adaptados por nível, de pre-A1 a B2, com atividades.", url:"https://www.penguinreaders.co.uk/books/", free:false },
  { id:"treasure", title:"Treasure Island — Reader", creator:"Penguin Readers", type:"Livro", levels:["A1"], interests:["books","games","movies"], duration:"10 páginas", description:"Aventura adaptada ao A1; boa primeira leitura longa em inglês.", url:"https://www.penguin.co.uk/series/PENREA/penguin-readers", free:false },
  { id:"jane", title:"Jane Eyre — Reader", creator:"Penguin Readers", type:"Livro", levels:["A2"], interests:["books","movies","series"], duration:"10 páginas", description:"Clássico adaptado ao A2+, com linguagem controlada.", url:"https://www.penguinreaders.co.uk/ladybird-books/jane-eyre/", free:false },
  { id:"oxford", title:"Oxford Bookworms", creator:"Oxford University Press", type:"Livro", levels:["A1","A2","B1","B2"], interests:["books","games","movies","series","tech","daily"], duration:"15–25 min", description:"Mais de 270 leituras graduadas, várias com áudio.", url:"https://www.oup.com.au/elt/oxford-bookworms", free:false },
  { id:"gmtk", title:"Game Maker's Toolkit", creator:"Mark Brown", type:"Vídeo", levels:["B2","C1"], interests:["games","tech"], duration:"10–20 min", description:"Ensaios claros sobre design de jogos; ótimo para inglês técnico.", url:"https://www.youtube.com/@GMTK", free:true },
  { id:"outside-xbox", title:"Outside Xbox", creator:"Outside Xbox", type:"Vídeo", levels:["B1","B2","C1"], interests:["games"], duration:"10–25 min", description:"Listas e comentários sobre games com contexto visual forte.", url:"https://www.youtube.com/@outsidexbox", free:true },
  { id:"gigguk", title:"Gigguk", creator:"Garnt Maneetapho", type:"Vídeo", levels:["B2","C1"], interests:["anime"], duration:"10–25 min", description:"Comentários rápidos sobre anime; use legenda em inglês e reduza a velocidade.", url:"https://www.youtube.com/@gigguk", free:true },
  { id:"crunchyroll", title:"Crunchyroll Collection", creator:"Crunchyroll", type:"Vídeo", levels:["A2","B1","B2"], interests:["anime"], duration:"3–8 min", description:"Clipes curtos: reveja uma cena e extraia expressões úteis.", url:"https://www.youtube.com/@crunchyroll", free:true },
  { id:"the-take", title:"The Take", creator:"The Take", type:"Vídeo", levels:["B2","C1"], interests:["movies","series"], duration:"10–20 min", description:"Análises de personagens, filmes e séries com narração clara.", url:"https://www.youtube.com/@thetake", free:true },
  { id:"cinema-therapy", title:"Cinema Therapy", creator:"Cinema Therapy", type:"Vídeo", levels:["B1","B2","C1"], interests:["movies","series"], duration:"15–30 min", description:"Conversas sobre filmes com linguagem emocional e cotidiana.", url:"https://www.youtube.com/@CinemaTherapyShow", free:true },
  { id:"ted", title:"TED Talks", creator:"TED", type:"Vídeo", levels:["B2","C1"], interests:["tech","daily"], duration:"8–18 min", description:"Palestras com transcrições e legendas em vários idiomas.", url:"https://www.ted.com/talks", free:true },
  { id:"luke", title:"Luke's English Podcast", creator:"Luke Thompson", type:"Podcast", levels:["B1","B2","C1"], interests:["daily","movies","series"], duration:"20–60 min", description:"Inglês britânico natural com episódios para aprendizes adultos.", url:"https://teacherluke.co.uk/", free:true },
  { id:"anki", title:"Anki", creator:"Anki", type:"Prática", levels:["A1","A2","B1","B2","C1"], interests:["daily","games","anime","movies","series","tech"], duration:"5–10 min", description:"Repetição espaçada para revisar frases que você encontrou em contexto.", url:"https://apps.ankiweb.net/", free:true },
  { id:"write-read", title:"Write & Improve", creator:"Cambridge English", type:"Prática", levels:["A1","A2","B1","B2","C1"], interests:["daily","tech"], duration:"10–20 min", description:"Prática de escrita com feedback automático e tarefas por nível.", url:"https://writeandimprove.com/", free:true },
  { id:"bc-story-zone", title:"Story Zone", creator:"British Council", type:"Livro", levels:["A2","B1"], interests:["daily","movies","series"], duration:"10–20 min", description:"Contos escritos para aprendizes, com exercícios antes e depois da leitura.", url:"https://learnenglish.britishcouncil.org/free-resources/general/story-zone", free:true },
  { id:"bc-reading", title:"Reading por nível", creator:"British Council", type:"Curso", levels:["A1","A2","B1","B2","C1"], interests:["daily","tech"], duration:"10–20 min", description:"Textos e tarefas de compreensão separados do A1 ao C1.", url:"https://learnenglish.britishcouncil.org/free-resources/reading", free:true },
  { id:"bc-audio-zone", title:"Audio Zone", creator:"British Council", type:"Podcast", levels:["B2","C1"], interests:["daily","tech"], duration:"8–15 min", description:"Áudios avançados com transcrição e exercícios interativos.", url:"https://learnenglish.britishcouncil.org/free-resources/general/audio-zone", free:true },
  { id:"bc-video-series", title:"Video Series", creator:"British Council", type:"Vídeo", levels:["A1","A2","B1","B2","C1"], interests:["daily","movies","series"], duration:"5–15 min", description:"Séries didáticas por nível, do inglês iniciante ao avançado.", url:"https://learnenglish.britishcouncil.org/free-resources/general/video-series", free:true },
  { id:"cambridge-portal", title:"English Learner Portal", creator:"Cambridge English", type:"Curso", levels:["A1","A2","B1","B2"], interests:["daily","tech"], duration:"10–25 min", description:"Centenas de atividades gratuitas de leitura, escuta, fala, gramática e vocabulário.", url:"https://assets.cambridgeenglish.org/portal/", free:true },
  { id:"cambridge-readers", title:"Cambridge English Readers", creator:"Cambridge University Press", type:"Livro", levels:["A1","A2","B1","B2","C1"], interests:["daily","movies","series"], duration:"15–30 min", description:"Histórias originais escritas para aprendizes em sete níveis, de A1 a C1.", url:"https://www.cambridge.es/en/catalogue/readers/collections/cambridge-english-readers", free:false },
  { id:"wonder-reader", title:"Wonder — Reader", creator:"Penguin Readers", type:"Livro", levels:["A2"], interests:["movies","series","daily"], duration:"10 páginas", description:"Versão A2 do romance Wonder, com atividades e linguagem controlada.", url:"https://www.penguinreaders.co.uk/ladybird-books/wonder/", free:false },
  { id:"roald-dahl", title:"Roald Dahl Readers", creator:"Penguin Readers", type:"Livro", levels:["A1","A2"], interests:["movies","series"], duration:"10–20 min", description:"Quinze histórias adaptadas, ilustradas e separadas por nível.", url:"https://www.penguinreaders.co.uk/roalddahlreaders/", free:false },
  { id:"bbc-english-work", title:"English at Work", creator:"BBC Learning English", type:"Podcast", levels:["A2","B1"], interests:["daily","tech","work"], duration:"5–8 min", description:"Situações profissionais curtas para aprender frases usadas no trabalho.", url:"https://www.bbc.co.uk/learningenglish/english/features/english-at-work", free:true },
  { id:"bbc-english-we-speak", title:"The English We Speak", creator:"BBC Learning English", type:"Podcast", levels:["B1","B2"], interests:["daily","movies","series"], duration:"3 min", description:"Expressões atuais explicadas em episódios muito curtos.", url:"https://www.bbc.co.uk/learningenglish/english/features/the-english-we-speak", free:true },
  { id:"voa-stories", title:"American Stories", creator:"VOA Learning English", type:"Podcast", levels:["A2","B1","B2"], interests:["daily","movies","series"], duration:"10–20 min", description:"Contos americanos narrados em ritmo acessível, com texto para acompanhar.", url:"https://learningenglish.voanews.com/z/1581", free:true },
  { id:"culips", title:"Culips English Podcast", creator:"Culips", type:"Podcast", levels:["B1","B2","C1"], interests:["daily","movies","series"], duration:"15–30 min", description:"Conversas naturais e explicações de expressões do inglês cotidiano.", url:"https://esl.culips.com/", free:true },
  { id:"all-ears", title:"All Ears English", creator:"All Ears English", type:"Podcast", levels:["B1","B2","C1"], interests:["daily"], duration:"15–20 min", description:"Fluência, conexão em conversas e cultura do inglês americano.", url:"https://www.allearsenglish.com/episodes/", free:true },
  { id:"easy-stories", title:"Easy Stories in English", creator:"Ariel Goodbody", type:"Podcast", levels:["A2","B1","B2"], interests:["movies","series","daily"], duration:"15–30 min", description:"Histórias narradas com níveis indicados e apoio de vocabulário.", url:"https://easystoriesinenglish.com/", free:true },
  { id:"espresso", title:"Espresso English Podcast", creator:"Shayna Oliveira", type:"Podcast", levels:["A2","B1","B2"], interests:["daily"], duration:"5–10 min", description:"Aulas compactas de vocabulário, gramática e expressões úteis.", url:"https://www.espressoenglish.net/podcast/", free:true },
  { id:"rachel", title:"Rachel's English", creator:"Rachel Smith", type:"Vídeo", levels:["B1","B2","C1"], interests:["daily","movies","series"], duration:"8–20 min", description:"Mais de 800 vídeos sobre pronúncia americana, ritmo e fala conectada.", url:"https://www.youtube.com/@rachelsenglish", free:true },
  { id:"vanessa", title:"Speak English With Vanessa", creator:"Vanessa Prothe", type:"Vídeo", levels:["A2","B1","B2"], interests:["daily"], duration:"10–25 min", description:"Conversação, frases naturais e confiança para falar.", url:"https://www.youtube.com/@SpeakEnglishWithVanessa", free:true },
  { id:"tv-series", title:"Learn English With TV Series", creator:"RealLife English", type:"Vídeo", levels:["A2","B1","B2","C1"], interests:["movies","series","anime"], duration:"10–20 min", description:"Cenas de filmes e séries transformadas em aulas de escuta e vocabulário.", url:"https://www.youtube.com/@LearnEnglishWithTVSeries", free:true },
  { id:"reallife", title:"RealLife English", creator:"RealLife English", type:"Vídeo", levels:["B1","B2","C1"], interests:["daily","movies","series"], duration:"10–30 min", description:"Inglês natural, compreensão de nativos e estratégias de fluência.", url:"https://www.youtube.com/@RealLifeEnglish1", free:true },
  { id:"mmmenglish", title:"mmmEnglish", creator:"Emma", type:"Vídeo", levels:["A2","B1","B2","C1"], interests:["daily"], duration:"10–20 min", description:"Gramática, pronúncia e conversação com inglês australiano claro.", url:"https://www.youtube.com/@mmmEnglish_Emma", free:true },
  { id:"engvid", title:"engVid", creator:"engVid Teachers", type:"Vídeo", levels:["A1","A2","B1","B2","C1"], interests:["daily","tech"], duration:"8–20 min", description:"Milhares de aulas gratuitas com diferentes professores e sotaques.", url:"https://www.engvid.com/", free:true },
  { id:"ted-ed", title:"TED-Ed", creator:"TED", type:"Vídeo", levels:["B1","B2","C1"], interests:["tech","daily"], duration:"5–8 min", description:"Animações educativas curtas; ótimo para treino de resumo e vocabulário acadêmico.", url:"https://www.youtube.com/@TEDEd", free:true },
  { id:"kurzgesagt", title:"Kurzgesagt — In a Nutshell", creator:"Kurzgesagt", type:"Vídeo", levels:["B2","C1"], interests:["tech"], duration:"8–15 min", description:"Ciência com contexto visual forte e legendas em inglês.", url:"https://www.youtube.com/@kurzgesagt", free:true },
  { id:"veritasium", title:"Veritasium", creator:"Derek Muller", type:"Vídeo", levels:["B2","C1"], interests:["tech"], duration:"10–25 min", description:"Ciência em inglês autêntico para desenvolver compreensão avançada.", url:"https://www.youtube.com/@veritasium", free:true },
  { id:"ign", title:"IGN", creator:"IGN", type:"Vídeo", levels:["B1","B2","C1"], interests:["games","movies","series"], duration:"5–20 min", description:"Reviews, notícias e entrevistas sobre games e entretenimento.", url:"https://www.youtube.com/@IGN", free:true },
  { id:"gutenberg", title:"Project Gutenberg", creator:"Project Gutenberg", type:"Livro", levels:["B2","C1"], interests:["books","history","movies","series","daily"], duration:"Livre", description:"Clássicos em domínio público para leitura original e gratuita.", url:"https://www.gutenberg.org/", free:true },
  { id:"librivox", title:"LibriVox", creator:"LibriVox", type:"Podcast", levels:["B2","C1"], interests:["books","history","movies","series","daily"], duration:"Livre", description:"Audiolivros gratuitos em domínio público para ler e ouvir juntos.", url:"https://librivox.org/", free:true },
  { id:"news-levels", title:"News in Levels", creator:"News in Levels", type:"Prática", levels:["A1","A2","B1"], interests:["daily","tech"], duration:"5–10 min", description:"A mesma notícia reescrita em três níveis com áudio.", url:"https://www.newsinlevels.com/", free:true },
  { id:"elllo", title:"ELLLO Listening", creator:"ELLLO", type:"Prática", levels:["A1","A2","B1","B2","C1"], interests:["daily"], duration:"5–10 min", description:"Milhares de áudios curtos com transcrição, quiz e muitos sotaques.", url:"https://elllo.org/", free:true },
  { id:"breaking-news", title:"Breaking News English", creator:"Sean Banville", type:"Prática", levels:["A2","B1","B2","C1"], interests:["news","daily","tech"], duration:"15–30 min", description:"Notícias com texto, áudio em velocidades diferentes e atividades.", url:"https://breakingnewsenglish.com/", free:true },
  { id:"simple-wiki", title:"Simple English Wikipedia", creator:"Wikimedia", type:"Livro", levels:["A2","B1","B2"], interests:["books","study","science","history","games","anime","movies","series","tech","daily"], duration:"5–15 min", description:"Artigos sobre quase qualquer tema escritos com vocabulário mais simples.", url:"https://simple.wikipedia.org/", free:true },
  { id:"cartoon-network", title:"Cartoon Network UK", creator:"Cartoon Network", type:"Vídeo", levels:["A1","A2","B1"], interests:["cartoons"], duration:"3–10 min", description:"Clipes curtos de desenhos com contexto visual forte; repita falas simples e descreva a cena.", url:"https://www.youtube.com/@CartoonNetworkUK", free:true },
  { id:"disney-channel", title:"Disney Channel", creator:"Disney", type:"Vídeo", levels:["A1","A2","B1"], interests:["cartoons","music"], duration:"3–10 min", description:"Cenas e músicas com vocabulário cotidiano, boas para legenda em inglês e shadowing.", url:"https://www.youtube.com/@disneychannel", free:true },
  { id:"npr-music", title:"NPR Music", creator:"NPR", type:"Vídeo", levels:["B1","B2","C1"], interests:["music"], duration:"10–25 min", description:"Apresentações e entrevistas para treinar letras, opiniões e vocabulário musical em contexto.", url:"https://www.youtube.com/@nprmusic", free:true },
  { id:"bbc-music", title:"BBC Music", creator:"BBC", type:"Vídeo", levels:["B1","B2","C1"], interests:["music"], duration:"5–20 min", description:"Performances e entrevistas; escute uma vez, acompanhe a letra e resuma a mensagem.", url:"https://www.youtube.com/@bbcmusic", free:true },
  { id:"olympics", title:"Olympics", creator:"International Olympic Committee", type:"Vídeo", levels:["A2","B1","B2","C1"], interests:["sports"], duration:"5–15 min", description:"Destaques, histórias de atletas e entrevistas para aprender ações, resultados e comentários esportivos.", url:"https://www.youtube.com/@Olympics", free:true },
  { id:"dude-perfect", title:"Dude Perfect", creator:"Dude Perfect", type:"Vídeo", levels:["A2","B1","B2"], interests:["sports"], duration:"8–18 min", description:"Desafios esportivos com apoio visual; anote expressões de reação, competição e movimento.", url:"https://www.youtube.com/@dudeperfect", free:true },
  { id:"rick-steves", title:"Rick Steves' Europe", creator:"Rick Steves", type:"Vídeo", levels:["B1","B2","C1"], interests:["travel","history"], duration:"10–25 min", description:"Viagens, cultura e história com narração clara; faça um roteiro curto do lugar em inglês.", url:"https://www.youtube.com/@ricksteves", free:true },
  { id:"natgeo", title:"National Geographic", creator:"National Geographic", type:"Vídeo", levels:["B1","B2","C1"], interests:["travel","science","history"], duration:"5–20 min", description:"Documentários curtos sobre lugares, natureza e culturas com forte contexto visual.", url:"https://www.youtube.com/@NatGeo", free:true },
  { id:"crash-course", title:"CrashCourse", creator:"CrashCourse", type:"Vídeo", levels:["B1","B2","C1"], interests:["study","science","history"], duration:"10–15 min", description:"Aulas rápidas de história, ciência e literatura; pause por blocos e faça um resumo.", url:"https://www.youtube.com/@crashcourse", free:true },
  { id:"khan-academy", title:"Khan Academy", creator:"Khan Academy", type:"Curso", levels:["B1","B2","C1"], interests:["study","science","tech"], duration:"10–25 min", description:"Aulas por assunto para aprender conteúdo acadêmico e o inglês usado em explicações.", url:"https://www.khanacademy.org/", free:true },
  { id:"scishow", title:"SciShow", creator:"Complexly", type:"Vídeo", levels:["B2","C1"], interests:["science"], duration:"5–12 min", description:"Perguntas e descobertas científicas explicadas com linguagem autêntica e apoio visual.", url:"https://www.youtube.com/@SciShow", free:true },
  { id:"nasa", title:"NASA", creator:"NASA", type:"Vídeo", levels:["B1","B2","C1"], interests:["science","tech"], duration:"5–20 min", description:"Missões espaciais e entrevistas; escolha três termos técnicos e explique-os com palavras simples.", url:"https://www.youtube.com/@NASA", free:true },
  { id:"fall-civilizations", title:"Fall of Civilizations", creator:"Paul Cooper", type:"Podcast", levels:["B2","C1"], interests:["history"], duration:"20–60 min", description:"Narrativas longas sobre sociedades antigas; ouça em blocos e escreva uma linha do tempo curta.", url:"https://fallofcivilizationspodcast.com/", free:true },
  { id:"jamie-oliver", title:"Jamie Oliver", creator:"Jamie Oliver", type:"Vídeo", levels:["A2","B1","B2"], interests:["food"], duration:"5–15 min", description:"Receitas com ações claras e objetos visíveis; liste ingredientes e reconte o preparo.", url:"https://www.youtube.com/@JamieOliver", free:true },
  { id:"bbc-good-food", title:"Good Food", creator:"Good Food", type:"Vídeo", levels:["A2","B1","B2"], interests:["food"], duration:"3–12 min", description:"Receitas passo a passo para praticar imperativos, medidas, ingredientes e sequências.", url:"https://www.youtube.com/@GoodFood", free:true },
  { id:"yoga-adriene", title:"Yoga With Adriene", creator:"Adriene Mishler", type:"Vídeo", levels:["A2","B1","B2"], interests:["fitness"], duration:"10–30 min", description:"Instruções ligadas ao movimento; siga a aula e reconheça verbos do corpo sem traduzir tudo.", url:"https://www.youtube.com/@yogawithadriene", free:true },
  { id:"self-fitness", title:"SELF Fitness", creator:"SELF", type:"Vídeo", levels:["A2","B1","B2"], interests:["fitness"], duration:"10–25 min", description:"Treinos guiados para aprender partes do corpo, posições, esforço e instruções em inglês.", url:"https://www.youtube.com/@selfmagazine", free:true },
  { id:"hbr", title:"Harvard Business Review", creator:"Harvard Business Review", type:"Vídeo", levels:["B2","C1"], interests:["work","study"], duration:"5–15 min", description:"Carreira, comunicação e liderança; pratique resumir um problema e uma solução profissional.", url:"https://www.youtube.com/@harvardbusinessreview", free:true },
  { id:"ali-abdaal", title:"Ali Abdaal", creator:"Ali Abdaal", type:"Vídeo", levels:["B1","B2","C1"], interests:["work","study"], duration:"10–25 min", description:"Estudo, produtividade e carreira; extraia conectores e conselhos úteis.", url:"https://www.youtube.com/@aliabdaal", free:true },
  { id:"pbs-newshour", title:"PBS NewsHour", creator:"PBS", type:"Vídeo", levels:["B2","C1"], interests:["news"], duration:"5–15 min", description:"Notícias e entrevistas em inglês americano; identifique fato, contexto e opinião.", url:"https://www.youtube.com/@PBSNewsHour", free:true },
  { id:"voa-news", title:"VOA Learning English News", creator:"VOA Learning English", type:"Curso", levels:["A2","B1","B2"], interests:["news","daily"], duration:"5–12 min", description:"Notícias em ritmo acessível com texto para acompanhar e comparar palavras-chave.", url:"https://learningenglish.voanews.com/", free:true },
];

export const flashcardDecks = [
  { id:"personal", title:"Meu vocabulário", description:"Expressões que você encontrou", color:"cyan" },
  { id:"essential", title:"Inglês essencial", description:"Palavras e frases de alta utilidade", color:"cyan" },
  { id:"conversation", title:"Conversação", description:"Responder e manter uma conversa", color:"violet" },
  { id:"phrasal", title:"Phrasal verbs", description:"Verbos frequentes em contexto", color:"orange" },
  { id:"games", title:"Games & internet", description:"Partidas, comunidades e tecnologia", color:"lime" },
  { id:"entertainment", title:"Filmes, séries & anime", description:"Histórias, opiniões e personagens", color:"pink" },
  { id:"travel", title:"Viagens & mundo", description:"Aeroporto, hospedagem, direções e cultura", color:"orange" },
  { id:"work-study", title:"Trabalho & faculdade", description:"Reuniões, projetos, aulas e apresentações", color:"blue" },
  { id:"science-tech", title:"Ciência & tecnologia", description:"Descobertas, dados, programação e inovação", color:"cyan" },
  { id:"hobbies-life", title:"Hobbies & vida real", description:"Música, esportes, culinária e saúde", color:"violet" },
  { id:"advanced", title:"Inglês avançado", description:"Precisão, nuance e argumentos", color:"blue" },
] as const;

export type Flashcard = { id:string; deck:string; front:string; back:string; example:string };
export const cards: Flashcard[] = [
  { id:"actually", deck:"essential", front:"actually", back:"na verdade / de fato", example:"Actually, I prefer studying in the morning." },
  { id:"although", deck:"essential", front:"although", back:"embora / apesar de", example:"Although it was difficult, I understood the main idea." },
  { id:"instead", deck:"essential", front:"instead", back:"em vez disso", example:"I watched the video instead of translating every word." },
  { id:"at-least", deck:"essential", front:"at least", back:"pelo menos", example:"Study for at least fifteen minutes today." },
  { id:"as-soon-as", deck:"essential", front:"as soon as", back:"assim que", example:"I'll call you as soon as the match ends." },
  { id:"even-though", deck:"essential", front:"even though", back:"mesmo que / apesar de", example:"I kept reading even though some words were new." },
  { id:"so-far", deck:"essential", front:"so far", back:"até agora", example:"So far, this is the best episode." },
  { id:"it-depends", deck:"essential", front:"it depends", back:"depende", example:"It depends on how much time you have." },

  { id:"what-do-you-mean", deck:"conversation", front:"What do you mean?", back:"O que você quer dizer?", example:"What do you mean by 'natural English'?" },
  { id:"sounds-good", deck:"conversation", front:"Sounds good", back:"Parece bom / combinado", example:"Let's practise after class. — Sounds good!" },
  { id:"let-me-think", deck:"conversation", front:"Let me think", back:"Deixe-me pensar", example:"Let me think... I watched it last month." },
  { id:"from-my-point", deck:"conversation", front:"From my point of view", back:"Do meu ponto de vista", example:"From my point of view, the ending was perfect." },
  { id:"how-about", deck:"conversation", front:"How about you?", back:"E você?", example:"I enjoy RPGs. How about you?" },
  { id:"not-sure", deck:"conversation", front:"I'm not sure, but...", back:"Não tenho certeza, mas...", example:"I'm not sure, but I think the update is tomorrow." },
  { id:"makes-sense", deck:"conversation", front:"That makes sense", back:"Isso faz sentido", example:"Your explanation makes sense now." },
  { id:"could-repeat", deck:"conversation", front:"Could you repeat that?", back:"Você poderia repetir?", example:"Sorry, could you repeat that more slowly?" },

  { id:"figure-out", deck:"phrasal", front:"figure out", back:"descobrir / entender", example:"I finally figured out how the game works." },
  { id:"end-up", deck:"phrasal", front:"end up", back:"acabar fazendo algo", example:"They ended up watching three episodes." },
  { id:"catch-up", deck:"phrasal", front:"catch up", back:"colocar-se em dia", example:"I need to catch up on the latest episodes." },
  { id:"give-up", deck:"phrasal", front:"give up", back:"desistir", example:"Don't give up because of one difficult video." },
  { id:"look-up", deck:"phrasal", front:"look up", back:"pesquisar / procurar", example:"Look up only the words that block understanding." },
  { id:"run-out", deck:"phrasal", front:"run out of", back:"ficar sem", example:"We ran out of time before the final round." },
  { id:"turn-out", deck:"phrasal", front:"turn out", back:"acabar sendo / revelar-se", example:"The villain turned out to be the hero's brother." },
  { id:"come-across", deck:"phrasal", front:"come across", back:"encontrar por acaso", example:"I came across a great podcast yesterday." },

  { id:"level-up", deck:"games", front:"level up", back:"subir de nível / melhorar", example:"Daily practice helps you level up your English." },
  { id:"matchmaking", deck:"games", front:"matchmaking", back:"sistema que forma partidas", example:"The matchmaking put us against a stronger team." },
  { id:"nerf", deck:"games", front:"nerf", back:"enfraquecer algo no jogo", example:"They nerfed the strongest weapon in the patch." },
  { id:"buff", deck:"games", front:"buff", back:"fortalecer algo no jogo", example:"This character needs a small buff." },
  { id:"lag", deck:"games", front:"lag", back:"atraso / travamento na conexão", example:"We lost the round because of lag." },
  { id:"teammate", deck:"games", front:"teammate", back:"colega de equipe", example:"My teammate gave me useful information." },
  { id:"walkthrough", deck:"games", front:"walkthrough", back:"guia passo a passo", example:"I watched a walkthrough without Portuguese subtitles." },
  { id:"patch-notes", deck:"games", front:"patch notes", back:"notas de atualização", example:"Read the patch notes and summarize the main changes." },

  { id:"plot-twist", deck:"entertainment", front:"plot twist", back:"reviravolta", example:"That plot twist changed the whole story." },
  { id:"worth-it", deck:"entertainment", front:"worth it", back:"vale a pena", example:"The series starts slowly, but it is worth it." },
  { id:"character-arc", deck:"entertainment", front:"character arc", back:"arco de desenvolvimento do personagem", example:"Her character arc is the best part of the series." },
  { id:"soundtrack", deck:"entertainment", front:"soundtrack", back:"trilha sonora", example:"The soundtrack makes the final scene more emotional." },
  { id:"spoiler", deck:"entertainment", front:"spoiler", back:"informação que revela a história", example:"Please don't give me any spoilers." },
  { id:"binge-watch", deck:"entertainment", front:"binge-watch", back:"assistir vários episódios seguidos", example:"We binge-watched the whole season." },
  { id:"live-action", deck:"entertainment", front:"live-action", back:"produção com atores reais", example:"The anime is getting a live-action adaptation." },
  { id:"underrated", deck:"entertainment", front:"underrated", back:"subestimado", example:"This movie is completely underrated." },

  { id:"takeaway", deck:"advanced", front:"takeaway", back:"principal aprendizado", example:"My main takeaway is to practise every day." },
  { id:"nevertheless", deck:"advanced", front:"nevertheless", back:"ainda assim / apesar disso", example:"The task was demanding; nevertheless, we finished it." },
  { id:"to-some-extent", deck:"advanced", front:"to some extent", back:"até certo ponto", example:"I agree with the argument to some extent." },
  { id:"compelling", deck:"advanced", front:"compelling", back:"convincente / envolvente", example:"The author presents a compelling explanation." },
  { id:"misleading", deck:"advanced", front:"misleading", back:"enganoso", example:"The headline is accurate but slightly misleading." },
  { id:"drawback", deck:"advanced", front:"drawback", back:"desvantagem", example:"The main drawback is the high cost." },
  { id:"standpoint", deck:"advanced", front:"standpoint", back:"ponto de vista", example:"From a learner's standpoint, transcripts are valuable." },
  { id:"notwithstanding", deck:"advanced", front:"notwithstanding", back:"apesar de", example:"Notwithstanding the delay, the project was successful." },

  { id:"by-the-way", deck:"essential", front:"by the way", back:"a propósito / aliás", example:"By the way, have you finished the episode?" },
  { id:"as-long-as", deck:"essential", front:"as long as", back:"desde que / contanto que", example:"You can choose any topic as long as you use English." },
  { id:"even-if", deck:"essential", front:"even if", back:"mesmo se", example:"Keep speaking even if you make a mistake." },
  { id:"most-of-time", deck:"essential", front:"most of the time", back:"na maior parte do tempo", example:"Most of the time, I understand the main idea." },

  { id:"good-point", deck:"conversation", front:"That's a good point", back:"Esse é um bom argumento", example:"That's a good point. I hadn't considered the cost." },
  { id:"see-what-mean", deck:"conversation", front:"I see what you mean", back:"Entendo o que você quer dizer", example:"I see what you mean, but I have a different opinion." },
  { id:"could-clarify", deck:"conversation", front:"Could you clarify that?", back:"Você poderia esclarecer isso?", example:"Could you clarify what you mean by efficient?" },
  { id:"give-second", deck:"conversation", front:"Give me a second", back:"Espere um segundo", example:"Give me a second. I'm trying to remember the word." },

  { id:"point-out", deck:"phrasal", front:"point out", back:"apontar / destacar", example:"The teacher pointed out one pronunciation mistake." },
  { id:"work-out", deck:"phrasal", front:"work out", back:"resolver / dar certo", example:"We worked out a better study plan." },
  { id:"set-up", deck:"phrasal", front:"set up", back:"configurar / organizar", example:"I set up the app on my phone." },
  { id:"carry-on", deck:"phrasal", front:"carry on", back:"continuar", example:"Carry on speaking; your idea is clear." },

  { id:"queue-up", deck:"games", front:"queue up", back:"entrar na fila de uma partida", example:"Let's queue up for one more match." },
  { id:"respawn", deck:"games", front:"respawn", back:"renascer no jogo", example:"Wait for me to respawn before you attack." },
  { id:"loadout", deck:"games", front:"loadout", back:"conjunto de equipamentos", example:"This loadout is better for long-range fights." },
  { id:"open-world", deck:"games", front:"open-world", back:"mundo aberto", example:"It is an open-world game with many side quests." },

  { id:"cliffhanger", deck:"entertainment", front:"cliffhanger", back:"final que deixa suspense", example:"The episode ends on a huge cliffhanger." },
  { id:"voice-actor", deck:"entertainment", front:"voice actor", back:"dublador / ator de voz", example:"The voice actor gives the character a unique personality." },
  { id:"subtitles", deck:"entertainment", front:"subtitles", back:"legendas", example:"I watch with English subtitles instead of Portuguese ones." },
  { id:"season-finale", deck:"entertainment", front:"season finale", back:"episódio final da temporada", example:"The season finale answered most of our questions." },

  { id:"arguably", deck:"advanced", front:"arguably", back:"pode-se argumentar que", example:"This is arguably the most useful feature." },
  { id:"whereas", deck:"advanced", front:"whereas", back:"enquanto que / ao passo que", example:"Podcasts train listening, whereas journals train writing." },
  { id:"therefore", deck:"advanced", front:"therefore", back:"portanto", example:"The evidence was weak; therefore, we repeated the experiment." },
  { id:"insight", deck:"advanced", front:"insight", back:"percepção / entendimento importante", example:"The interview gave me a useful insight into the role." },

  { id:"boarding-pass", deck:"travel", front:"boarding pass", back:"cartão de embarque", example:"Keep your boarding pass ready at the gate." },
  { id:"departure-gate", deck:"travel", front:"departure gate", back:"portão de embarque", example:"Our departure gate changed from twelve to eighteen." },
  { id:"layover", deck:"travel", front:"layover", back:"conexão / escala", example:"We have a three-hour layover in London." },
  { id:"carry-on-bag", deck:"travel", front:"carry-on bag", back:"bagagem de mão", example:"My carry-on bag fits under the seat." },
  { id:"hotel-check-in", deck:"travel", front:"check in", back:"fazer check-in", example:"We can check in at the hotel after two." },
  { id:"book-room", deck:"travel", front:"book a room", back:"reservar um quarto", example:"I'd like to book a room for two nights." },
  { id:"reservation", deck:"travel", front:"reservation", back:"reserva", example:"I have a reservation under the name Lucas." },
  { id:"fully-booked", deck:"travel", front:"fully booked", back:"sem vagas / lotado", example:"The hotel is fully booked this weekend." },
  { id:"sightseeing", deck:"travel", front:"sightseeing", back:"passeio turístico", example:"We spent the morning sightseeing in the old town." },
  { id:"get-around", deck:"travel", front:"get around", back:"locomover-se", example:"The subway is the easiest way to get around." },
  { id:"ask-directions", deck:"travel", front:"Could you give me directions?", back:"Você pode me dar as direções?", example:"Excuse me, could you give me directions to the museum?" },
  { id:"turn-left", deck:"travel", front:"turn left", back:"vire à esquerda", example:"Turn left after the traffic lights." },
  { id:"exchange-rate", deck:"travel", front:"exchange rate", back:"taxa de câmbio", example:"Check the exchange rate before changing money." },
  { id:"local-customs", deck:"travel", front:"local customs", back:"costumes locais", example:"Learning local customs helps you avoid misunderstandings." },
  { id:"hidden-gem", deck:"travel", front:"hidden gem", back:"lugar pouco conhecido e especial", example:"This small café is a hidden gem." },
  { id:"travel-insurance", deck:"travel", front:"travel insurance", back:"seguro de viagem", example:"Travel insurance can cover medical emergencies." },

  { id:"deadline", deck:"work-study", front:"deadline", back:"prazo final", example:"The deadline for the assignment is Friday." },
  { id:"assignment", deck:"work-study", front:"assignment", back:"trabalho / tarefa acadêmica", example:"I submitted the assignment before class." },
  { id:"lecture", deck:"work-study", front:"lecture", back:"aula expositiva / palestra", example:"Today's lecture was about computer networks." },
  { id:"syllabus", deck:"work-study", front:"syllabus", back:"plano da disciplina", example:"The exam dates are listed in the syllabus." },
  { id:"research-paper", deck:"work-study", front:"research paper", back:"artigo científico", example:"We discussed a research paper about artificial intelligence." },
  { id:"take-notes", deck:"work-study", front:"take notes", back:"fazer anotações", example:"I take notes while watching the lecture." },
  { id:"hand-in", deck:"work-study", front:"hand in", back:"entregar um trabalho", example:"Remember to hand in your report tomorrow." },
  { id:"catch-up-work", deck:"work-study", front:"catch up on", back:"colocar algo em dia", example:"I need to catch up on two classes." },
  { id:"group-project", deck:"work-study", front:"group project", back:"trabalho em grupo", example:"Our group project needs a clear task division." },
  { id:"presentation", deck:"work-study", front:"presentation", back:"apresentação", example:"I practised my presentation out loud." },
  { id:"constructive-feedback", deck:"work-study", front:"constructive feedback", back:"feedback construtivo", example:"Constructive feedback helped me improve the report." },
  { id:"schedule-meeting", deck:"work-study", front:"schedule a meeting", back:"marcar uma reunião", example:"Let's schedule a meeting for Thursday afternoon." },
  { id:"follow-up", deck:"work-study", front:"follow up", back:"acompanhar / retomar contato", example:"I'll follow up by email after the interview." },
  { id:"workload", deck:"work-study", front:"workload", back:"carga de trabalho", example:"My workload is heavier near the end of the semester." },
  { id:"internship", deck:"work-study", front:"internship", back:"estágio", example:"I'm applying for a software development internship." },
  { id:"scholarship", deck:"work-study", front:"scholarship", back:"bolsa de estudos", example:"She received a scholarship to study abroad." },

  { id:"evidence", deck:"science-tech", front:"evidence", back:"evidência", example:"The conclusion must be supported by evidence." },
  { id:"hypothesis", deck:"science-tech", front:"hypothesis", back:"hipótese", example:"The experiment did not confirm our hypothesis." },
  { id:"experiment", deck:"science-tech", front:"experiment", back:"experimento", example:"They repeated the experiment three times." },
  { id:"data-set", deck:"science-tech", front:"data set", back:"conjunto de dados", example:"The model was trained on a larger data set." },
  { id:"outcome", deck:"science-tech", front:"outcome", back:"resultado", example:"The outcome was different from what we expected." },
  { id:"reliable", deck:"science-tech", front:"reliable", back:"confiável", example:"We need a reliable source for this information." },
  { id:"device", deck:"science-tech", front:"device", back:"dispositivo", example:"The app works on every mobile device." },
  { id:"software-feature", deck:"science-tech", front:"feature", back:"funcionalidade / recurso", example:"This feature saves the user's progress." },
  { id:"software-bug", deck:"science-tech", front:"bug", back:"erro de software", example:"We found a bug in the mobile layout." },
  { id:"deploy", deck:"science-tech", front:"deploy", back:"publicar / implantar software", example:"We will deploy the new version tonight." },
  { id:"source-code", deck:"science-tech", front:"source code", back:"código-fonte", example:"The source code is stored in a repository." },
  { id:"user-interface", deck:"science-tech", front:"user interface", back:"interface do usuário", example:"The user interface is clearer on smaller screens." },
  { id:"data-privacy", deck:"science-tech", front:"data privacy", back:"privacidade de dados", example:"Data privacy should be considered from the start." },
  { id:"breakthrough", deck:"science-tech", front:"breakthrough", back:"avanço importante / descoberta", example:"The discovery was a major scientific breakthrough." },
  { id:"trade-off", deck:"science-tech", front:"trade-off", back:"compensação entre vantagens e desvantagens", example:"There is a trade-off between speed and accuracy." },
  { id:"scalable", deck:"science-tech", front:"scalable", back:"escalável", example:"We need a scalable solution for more users." },

  { id:"lyrics", deck:"hobbies-life", front:"lyrics", back:"letra de música", example:"I read the lyrics after listening to the song." },
  { id:"beat", deck:"hobbies-life", front:"beat", back:"batida / ritmo", example:"This song has a strong beat." },
  { id:"live-performance", deck:"hobbies-life", front:"live performance", back:"apresentação ao vivo", example:"The live performance sounded better than the recording." },
  { id:"sports-score", deck:"hobbies-life", front:"score", back:"placar / pontuação", example:"What was the final score?" },
  { id:"warm-up", deck:"hobbies-life", front:"warm up", back:"aquecer", example:"Always warm up before a difficult workout." },
  { id:"stretch", deck:"hobbies-life", front:"stretch", back:"alongar", example:"Stretch your legs after running." },
  { id:"ingredient", deck:"hobbies-life", front:"ingredient", back:"ingrediente", example:"Garlic is the main ingredient in this sauce." },
  { id:"recipe", deck:"hobbies-life", front:"recipe", back:"receita", example:"This recipe only needs five ingredients." },
  { id:"chop", deck:"hobbies-life", front:"chop", back:"picar", example:"Chop the onions into small pieces." },
  { id:"bake", deck:"hobbies-life", front:"bake", back:"assar", example:"Bake the bread for thirty minutes." },
  { id:"balanced-diet", deck:"hobbies-life", front:"balanced diet", back:"alimentação equilibrada", example:"A balanced diet includes different types of food." },
  { id:"appointment", deck:"hobbies-life", front:"appointment", back:"consulta / compromisso marcado", example:"I have a doctor's appointment tomorrow morning." },
  { id:"hobby", deck:"hobbies-life", front:"hobby", back:"passatempo", example:"Photography became my favourite hobby." },
  { id:"improve", deck:"hobbies-life", front:"improve", back:"melhorar", example:"Regular practice will improve your listening." },
  { id:"daily-practice", deck:"hobbies-life", front:"practise", back:"praticar", example:"I practise speaking for ten minutes a day." },
  { id:"healthy-routine", deck:"hobbies-life", front:"routine", back:"rotina", example:"A simple routine is easier to maintain." },
];

export type Story = { id:string; title:string; level:Level; genre:string; minutes:number; summary:string; paragraphs:string[]; vocabulary:{word:string; meaning:string}[]; question:string; answer:string };
export const stories: Story[] = [
  { id:"late-bus", title:"The Late Bus", level:"A1", genre:"Vida real", minutes:3, summary:"Mia precisa chegar ao trabalho, mas o ônibus não vem.", paragraphs:["Mia wakes up at seven o'clock. She has breakfast and leaves home at eight.","At the bus stop, she waits for ten minutes. Then twenty minutes. The bus is late.","A woman at the stop says, ‘The bus is not coming today.’ Mia looks at her phone. She can walk to work in twenty-five minutes.","Mia starts walking. On the way, she finds a small café. The owner gives her a cup of coffee. Mia arrives at work tired, but happy."], vocabulary:[{word:"leaves home",meaning:"sai de casa"},{word:"bus stop",meaning:"ponto de ônibus"},{word:"on the way",meaning:"no caminho"}], question:"Why does Mia walk to work?", answer:"Because the bus is not coming." },
  { id:"new-player", title:"The New Player", level:"A1", genre:"Games", minutes:3, summary:"Um jogador novo entra na equipe e surpreende todo mundo.", paragraphs:["Leo plays an online game every Friday. His team needs one more player.","A new player called Nova joins the team. Nova does not talk much, but she listens carefully.","In the final round, Leo's team is losing. Nova sees an enemy behind a door and helps the team.","They win the match. Leo says, ‘Great job!’ Nova answers, ‘Thanks. Can we play again next Friday?’"], vocabulary:[{word:"joins",meaning:"entra / junta-se"},{word:"final round",meaning:"rodada final"},{word:"losing",meaning:"perdendo"}], question:"How does Nova help the team?", answer:"She sees an enemy behind a door." },
  { id:"missing-episode", title:"The Missing Episode", level:"A2", genre:"Séries", minutes:5, summary:"Um episódio desaparecido vira um mistério entre amigos.", paragraphs:["Daniel and Priya watch the same science-fiction series. Every Monday, they talk about the new episode at university.","One week, the streaming app jumps from episode six to episode eight. Episode seven is missing. Daniel thinks it is a technical problem, but Priya notices a strange message in the episode list: ‘The story continues where it began.’","They return to the first episode and discover a hidden link in the description. It opens a short secret episode filmed from the villain's point of view.","The next day, they tell their friends about it. Soon, everyone is searching the old episodes for more clues."], vocabulary:[{word:"jumps",meaning:"pula"},{word:"hidden link",meaning:"link escondido"},{word:"point of view",meaning:"ponto de vista"}], question:"Where do Daniel and Priya find the secret episode?", answer:"They find a hidden link in the description of the first episode." },
  { id:"wrong-chat", title:"The Wrong Group Chat", level:"A2", genre:"Comédia", minutes:5, summary:"Uma mensagem enviada ao grupo errado cria uma amizade inesperada.", paragraphs:["Sofia wants to send her friend a message about a difficult class. She writes, ‘I understand nothing, and the teacher speaks like a robot!’","Unfortunately, she sends it to the class group. The teacher is in the group too. Sofia wants to disappear.","A minute later, the teacher replies: ‘Beep boop. The robot can explain the lesson again tomorrow.’ Everyone sends laughing emojis.","After class the next day, the teacher helps Sofia for twenty minutes. The lesson finally makes sense, and Sofia learns to check the group name before sending a message."], vocabulary:[{word:"unfortunately",meaning:"infelizmente"},{word:"replies",meaning:"responde"},{word:"makes sense",meaning:"faz sentido"}], question:"How does the teacher react to Sofia's message?", answer:"The teacher makes a joke and offers to explain the lesson again." },
  { id:"speedrun", title:"The Language Speedrun", level:"B1", genre:"Games", minutes:7, summary:"Um streamer tenta aprender inglês rápido e descobre que não há atalhos.", paragraphs:["Kai was famous for finishing games quickly. When an international tournament invited him to commentate in English, he treated the language like another speedrun.","He memorized hundreds of isolated words in one weekend. By Monday, he could recognize them on a list, but he could not use them while speaking. Every sentence felt like a puzzle assembled under pressure.","His teammate suggested a different strategy: watch one short match analysis, collect three useful phrases, explain the main idea aloud, and review the phrases the next day. Kai thought the method looked too slow.","After two weeks, however, he could describe plays without translating each word. He realized that language was not a level to finish once. It was a skill built through many small, repeated attempts."], vocabulary:[{word:"shortcut",meaning:"atalho"},{word:"isolated",meaning:"isolado"},{word:"under pressure",meaning:"sob pressão"},{word:"attempts",meaning:"tentativas"}], question:"Why does Kai change his study strategy?", answer:"Because memorizing isolated words did not help him use English while speaking." },
  { id:"quiet-floor", title:"The Quiet Floor", level:"B1", genre:"Mistério", minutes:7, summary:"Uma estudante investiga sons estranhos na biblioteca da faculdade.", paragraphs:["The fourth floor of the university library was officially closed after nine o'clock. Still, every evening, Mara heard a chair move above her while she studied on the third floor.","The security guard insisted that nobody was there. Mara decided to investigate before imagining something supernatural. She checked the building map and noticed a small room beside the old language laboratory.","At 8:55, she went upstairs and waited. A soft mechanical sound came from the room. Inside, she found an automatic book scanner that switched on every night to digitize rare documents.","There was no ghost, but Mara discovered a collection of letters written by international students fifty years earlier. She later used them for a research project about how student life had changed."], vocabulary:[{word:"insisted",meaning:"insistiu"},{word:"upstairs",meaning:"andar de cima"},{word:"switched on",meaning:"ligava"},{word:"rare documents",meaning:"documentos raros"}], question:"What was making the sound?", answer:"An automatic book scanner was making the sound." },
  { id:"last-subtitle", title:"The Last Subtitle", level:"B2", genre:"Filmes", minutes:9, summary:"Uma tradutora precisa escolher entre uma tradução literal e o verdadeiro sentido de uma cena.", paragraphs:["Nora had translated hundreds of scenes, but the final line of the film refused to cooperate. The main character looked at his empty hometown and said, ‘I guess the lights were never the point.’ A literal translation sounded unnatural, while a freer version risked changing the meaning.","She replayed the scene and examined everything that had happened before it. Throughout the film, the town's bright signs had represented success. By the ending, the character understood that recognition meant little without the people he cared about.","Nora stopped searching for matching words and focused on the function of the sentence. Her final subtitle was not identical to the original structure, but it preserved the contrast between appearance and meaning.","At the premiere, the audience became silent at exactly that moment. Nora realized that good translation was not replacing words. It was rebuilding an effect in another language."], vocabulary:[{word:"refused to cooperate",meaning:"não colaborava"},{word:"freer version",meaning:"versão mais livre"},{word:"throughout",meaning:"ao longo de"},{word:"preserved",meaning:"preservou"}], question:"What helps Nora choose the final translation?", answer:"She considers the whole story and the function of the sentence, not only the individual words." },
  { id:"algorithm", title:"The Recommendation Loop", level:"B2", genre:"Tecnologia", minutes:9, summary:"Um algoritmo parece conhecer um usuário bem demais — até limitar o mundo dele.", paragraphs:["At first, Arun loved how accurately the platform predicted what he wanted to watch. Every recommendation matched his interests: strategy games, science fiction and software documentaries.","Months later, he noticed that nothing surprised him. The system had become so efficient at reflecting his past choices that it rarely offered anything outside them. Convenience had quietly turned into repetition.","Arun created a weekly rule: choose one recommendation the algorithm would never make. He watched a cooking documentary, a historical drama and an interview with a jazz musician. Some choices bored him, but others opened unexpected paths.","The algorithm had not trapped him deliberately; it had simply optimized the signals he provided. By changing his behavior, Arun reminded the system—and himself—that curiosity cannot be reduced to a record of previous clicks."], vocabulary:[{word:"accurately",meaning:"com precisão"},{word:"reflecting",meaning:"refletindo"},{word:"quietly",meaning:"silenciosamente"},{word:"reduced to",meaning:"reduzido a"}], question:"What problem does Arun identify?", answer:"The recommendations repeat his existing interests and stop exposing him to surprising content." },
  { id:"memory-market", title:"The Market of Borrowed Memories", level:"C1", genre:"Ficção científica", minutes:12, summary:"Em uma cidade onde lembranças podem ser alugadas, uma arquivista questiona o valor da experiência.", paragraphs:["In the lower district, memories were cheaper than cinema tickets. For a modest fee, anyone could borrow the sensation of standing on another planet, performing before a stadium or saying goodbye without regret.","Elena worked as an authenticity clerk. Her job was to identify fabricated details before memories entered the public catalogue. The most convincing products were not the spectacular ones but the ordinary experiences: the warmth of a kitchen at midnight, the weight of a sleeping child, the relief of being forgiven.","One morning, she examined a memory that appeared to belong to her. Every detail of her childhood home was exact, including a crack beneath the window that she had never described to anyone. The supplier claimed the resemblance was a statistical coincidence.","Elena faced an unsettling possibility: perhaps personal experience was less private than people believed, assembled from patterns shared by millions. She rejected the memory, not because it was false, but because she could no longer determine what authenticity meant.","That evening, she walked home without recording anything. For the first time in years, she wanted an experience that no device would help her remember."], vocabulary:[{word:"modest fee",meaning:"taxa pequena"},{word:"fabricated",meaning:"inventado / falsificado"},{word:"unsettling",meaning:"perturbador"},{word:"assembled",meaning:"montado / composto"}], question:"Why does Elena reject the memory?", answer:"Because it makes her unable to determine what an authentic personal memory really is." },
  { id:"confident-pause", title:"The Confident Pause", level:"C1", genre:"Vida real", minutes:10, summary:"Um candidato descobre que fluência não significa falar sem parar.", paragraphs:["During his first international interview, Rafael treated every silence as evidence of failure. He rushed to fill each gap, abandoned sentences halfway through and replaced precise ideas with whatever words arrived first.","The interviewer remained patient, but Rafael left convinced that his English had collapsed. When he watched the recording later, he noticed something unexpected: the interviewer paused frequently as well. Her silences sounded thoughtful, whereas his constant speech sounded uncertain.","Before the next interview, Rafael practised a different skill. He learned phrases that gave him time—‘Let me put that another way’ and ‘The main point I would emphasize is...’—but he also practised saying nothing for two seconds before answering.","His language did not suddenly become perfect. What changed was his control over it. By allowing himself time to plan, he used simpler sentences more accurately and communicated more complex ideas.","Fluency, he concluded, was not the absence of pauses. It was the ability to use them without losing the listener."], vocabulary:[{word:"rushed",meaning:"apressou-se"},{word:"abandoned",meaning:"abandonou"},{word:"emphasize",meaning:"enfatizar"},{word:"absence",meaning:"ausência"}], question:"What changes Rafael's performance in the second interview?", answer:"He uses pauses deliberately, which gives him time to plan clearer and more accurate answers." },
];

export const practicalGuides = [
  { title:"Como usar séries e anime", steps:["Assista uma cena curta sem legenda.","Reveja com legenda em inglês.","Anote no máximo três expressões.","Repita duas falas imitando ritmo e entonação.","Conte o que aconteceu em 30 segundos."] },
  { title:"Como estudar com games", steps:["Mude menus e legendas para inglês.","Leia objetivos antes de agir.","Salve frases de personagens, não palavras soltas.","Explique uma partida em voz alta.","Leia patch notes e resuma a mudança principal."] },
  { title:"Como ler um livro", steps:["Escolha um texto em que quase tudo seja compreensível.","Leia primeiro sem dicionário.","Marque somente palavras que bloqueiam a história.","Após o capítulo, escreva três frases de resumo.","Conte o capítulo em voz alta no dia seguinte."] },
  { title:"Como usar um podcast", steps:["Ouça uma vez para captar o tema.","Ouça com a transcrição.","Escolha um trecho de 20 segundos.","Faça shadowing três vezes.","Use duas expressões em frases pessoais."] },
  { title:"Como estudar com música", steps:["Escute uma vez sem olhar a letra.","Leia a letra e marque três expressões.","Cante ou fale junto em um trecho curto.","Explique a mensagem da música.","Use uma expressão em uma frase sua."] },
  { title:"Como usar esportes e treino", steps:["Assista a um destaque ou exercício curto.","Ligue ações às imagens e movimentos.","Anote verbos e comentários recorrentes.","Narre uma jogada ou exercício em voz alta.","Revise as expressões no dia seguinte."] },
  { title:"Como aprender com viagens", steps:["Escolha um vídeo sobre um destino.","Anote frases para aeroporto, hotel e direções.","Monte um diálogo curto.","Grave-se pedindo informação.","Crie um pequeno roteiro em inglês."] },
  { title:"Como usar faculdade e trabalho", steps:["Leia ou assista um conteúdo da sua área.","Liste cinco termos realmente úteis.","Explique o assunto com palavras simples.","Escreva um resumo ou e-mail curto.","Apresente a ideia em 60 segundos."] },
  { title:"Como estudar ciência e história", steps:["Comece pelo título e tente prever o tema.","Divida o conteúdo em blocos curtos.","Crie uma linha do tempo ou relação de causa e efeito.","Explique um conceito sem copiar.","Confira e corrija somente o ponto principal."] },
  { title:"Como usar receitas", steps:["Veja a receita uma vez pelo contexto visual.","Separe ingredientes, medidas e verbos.","Repita as instruções em ordem.","Explique uma etapa sem olhar.","Escreva sua própria versão da receita."] },
];

export const diagnosticQuestions = [
  { q:"She ___ English every day.", options:["study","studies","studying"], answer:1 },
  { q:"I have lived here ___ 2022.", options:["for","since","during"], answer:1 },
  { q:"If I had more time, I ___ another language.", options:["learn","will learn","would learn"], answer:2 },
  { q:"Choose the natural sentence:", options:["I look forward to meet you.","I look forward to meeting you.","I look forward meet you."], answer:1 },
  { q:"Hardly ___ the match started when the server crashed.", options:["had","has","did"], answer:0 },
  { q:"‘The update is anything but minor’ means it is…", options:["very small","not minor at all","optional"], answer:1 },
];

export type StudyTask = { id: string; title: string; meta: string; minutes: number; skill: string; instruction: string; url?: string; resource?: string };

export function stableHash(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function pickResources(level: Level, interests: Interest[], seedKey: string, limit = 3) {
  const selected = interests.length ? interests : ["daily" as Interest];
  const order = ["A1", "A2", "B1", "B2", "C1"] as Level[];
  const levelIndex = order.indexOf(level);
  const interested = resources.filter((resource) => resource.interests.some((interest) => selected.includes(interest)));
  const pool = interested.length ? interested : resources.filter((resource) => resource.levels.includes(level));
  return [...pool].sort((a, b) => {
    const score = (resource: Resource) => {
      const distance = Math.min(...resource.levels.map((item) => Math.abs(order.indexOf(item) - levelIndex)));
      const interestScore = resource.interests.reduce((total, interest) => total + (selected.includes(interest) ? 30 : 0), 0);
      return interestScore + (resource.levels.includes(level) ? 45 : 0) - distance * 12 + (resource.free ? 2 : 0);
    };
    const difference = score(b) - score(a);
    if (difference) return difference;
    return stableHash(`${seedKey}:${a.id}`) - stableHash(`${seedKey}:${b.id}`);
  }).slice(0, limit);
}

export function makePlan(level: Level, minutes: number, interests: Interest[], date: string, visitorSeed = "", goal = "conversation", reviewCount = 0): StudyTask[] {
  const seed = stableHash(`${visitorSeed}|${date}|${level}|${interests.join(",")}|${goal}`);
  const selectedInterests = interests.length ? interests : ["daily" as Interest];
  const planInterest = selectedInterests[seed % selectedInterests.length];
  const topic = interestLabels[planInterest].toLowerCase();
  const listenable = resources.filter((resource) => resource.type === "Vídeo" || resource.type === "Podcast");
  const exactAndInteresting = listenable.filter((resource) => resource.levels.includes(level) && resource.interests.includes(planInterest));
  const interesting = listenable.filter((resource) => resource.interests.includes(planInterest));
  const exact = listenable.filter((resource) => resource.levels.includes(level));
  const candidates = exactAndInteresting.length ? exactAndInteresting : interesting.length ? interesting : exact.length ? exact : listenable;
  const input = candidates[seed % candidates.length];
  const speakingVariant = Math.floor(seed / 7) % 2;
  const inputMinutes = Math.round(minutes * .35);
  const recallMinutes = Math.round(minutes * .2);
  const speakingMinutes = Math.round(minutes * .2);
  const blocks = [inputMinutes, recallMinutes, speakingMinutes, minutes - inputMinutes - recallMinutes - speakingMinutes];
  const outputInstruction = goal === "career"
    ? `Explique em inglês como ${topic} se conecta ao seu trabalho ou a uma habilidade profissional.`
    : goal === "travel"
      ? `Crie uma situação de viagem relacionada a ${topic} e fale o que você diria.`
      : goal === "exam"
        ? `Escreva um resumo curto sobre ${topic} e termine com sua opinião.`
        : level === "A1" || level === "A2"
          ? `Escreva 4 frases simples sobre ${topic}. Use pelo menos uma expressão nova.`
          : `Explique em inglês o que aprendeu sobre ${topic} e dê sua opinião em 60–90 segundos.`;
  return [
    { id:`${date}-input`, title:"Entenda a ideia principal", meta:`${input.creator} · ${input.title}`, minutes:blocks[0], skill:"INPUT", instruction:"Primeiro acompanhe sem pausar. Depois volte aos trechos importantes e marque só 3 expressões úteis.", url:input.url, resource:input.title },
    { id:`${date}-recall`, title:"Recupere sem olhar", meta:reviewCount > 0 ? `${reviewCount} cartões programados` : "3 expressões de ontem", minutes:blocks[1], skill:"MEMÓRIA", instruction:"Tente lembrar o significado e crie uma frase para cada expressão antes de conferir." },
    speakingVariant === 0
      ? { id:`${date}-speak`, title:"Shadowing em voz alta", meta:`Tema: ${topic}`, minutes:blocks[2], skill:"PRONÚNCIA", instruction:"Escolha 20–30 segundos do áudio. Escute, repita junto e grave uma última tentativa." }
      : { id:`${date}-speak`, title:"Resumo falado sem ler", meta:`Tema: ${topic}`, minutes:blocks[2], skill:"FLUÊNCIA", instruction:"Feche o material e explique a ideia principal por 30–60 segundos. Depois confira o que faltou." },
    { id:`${date}-output`, title:"Produza algo seu", meta:level === "A1" || level === "A2" ? "4 frases" : "Resumo + opinião", minutes:blocks[3], skill:"OUTPUT", instruction:outputInstruction },
  ];
}

export const researchSources = [
  { title:"CEFR Companion Volume", org:"Council of Europe", note:"níveis, tarefas reais e abordagem orientada à ação", url:"https://www.coe.int/en/web/common-european-framework-reference-languages/home" },
  { title:"Spaced practice meta-analysis", org:"Language Learning (2022)", note:"benefícios da prática distribuída na aprendizagem de L2", url:"https://doi.org/10.1111/lang.12479" },
  { title:"Adult L2 vocabulary training review", org:"Cambridge / ERIC", note:"combinação de repetição, recuperação e elaboração semântica", url:"https://eric.ed.gov/?id=EJ1251020" },
  { title:"Lexical coverage and comprehension", org:"Language Teaching", note:"materiais compreensíveis e a referência de 95–98% de palavras conhecidas", url:"https://www.cambridge.org/core/journals/language-teaching/article/how-much-vocabulary-is-needed-to-use-english-replication-of-van-zeeland-schmitt-2012-nation-2006-and-cobb-2007/1D217A56A2E0056E67802A6A8360FDDE" },
  { title:"Deliberate practice for L2", org:"TESL-EJ / ERIC (2025)", note:"metas claras, dificuldade ajustada e feedback", url:"https://eric.ed.gov/?id=EJ1488626" },
  { title:"Daily Limits", org:"Anki Manual", note:"limitar cartões novos evita que as revisões diárias cresçam sem controle", url:"https://docs.ankiweb.net/deck-options.html#daily-limits" },
  { title:"How to be a confident learner", org:"British Council", note:"prática curta e regular é preferível a uma maratona semanal", url:"https://learnenglish.britishcouncil.org/english-levels/improve-your-english-level/how-be-confident-learner" },
];

export type ReviewSchedule = { cardId: string; dueDate: string };

export function buildDailyReviewQueue<T extends { id: string }>(allCards: T[], reviews: ReviewSchedule[], date: string, newCardLimit = 10) {
  const reviewByCard = new Map(reviews.map((review) => [review.cardId, review]));
  const scheduled = allCards.filter((card) => {
    const review = reviewByCard.get(card.id);
    return review && review.dueDate <= date;
  });
  const unseen = allCards.filter((card) => !reviewByCard.has(card.id)).slice(0, newCardLimit);
  return [...scheduled, ...unseen];
}
