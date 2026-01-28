export const races = [
  {
    name: "Humano",
    abilityBonus: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
    traits: ["Versátil", "Adaptável", "Ambicioso"],
    size: "Médio",
    speed: 30
  },
  {
    name: "Elfo",
    abilityBonus: { dex: 2 },
    traits: ["Visão no Escuro", "Sentidos Aguçados", "Ancestral Feérico", "Transe"],
    size: "Médio",
    speed: 30
  },
  {
    name: "Anão",
    abilityBonus: { con: 2 },
    traits: ["Visão no Escuro", "Resiliência Anã", "Conhecimento de Pedra", "Treinamento em Combate"],
    size: "Médio",
    speed: 25
  },
  {
    name: "Halfling",
    abilityBonus: { dex: 2 },
    traits: ["Sortudo", "Bravura", "Agilidade Halfling"],
    size: "Pequeno",
    speed: 25
  },
  {
    name: "Meio-Elfo",
    abilityBonus: { cha: 2 },
    traits: ["Visão no Escuro", "Ancestral Feérico", "Versatilidade de Perícia"],
    size: "Médio",
    speed: 30
  },
  {
    name: "Meio-Orc",
    abilityBonus: { str: 2, con: 1 },
    traits: ["Visão no Escuro", "Ameaçador", "Resistência Implacável", "Ataques Selvagens"],
    size: "Médio",
    speed: 30
  },
  {
    name: "Tiefling",
    abilityBonus: { int: 1, cha: 2 },
    traits: ["Visão no Escuro", "Resistência Infernal", "Legado Infernal"],
    size: "Médio",
    speed: 30
  },
  {
    name: "Draconato",
    abilityBonus: { str: 2, cha: 1 },
    traits: ["Sopro Dracônico", "Resistência a Dano"],
    size: "Médio",
    speed: 30
  },
  {
    name: "Gnomo",
    abilityBonus: { int: 2 },
    traits: ["Visão no Escuro", "Astúcia Gnômica"],
    size: "Pequeno",
    speed: 25
  }
];

export const classes = [
  {
    name: "Guerreiro",
    hitDie: 10,
    primaryAbility: ["str", "dex"],
    savingThrows: ["str", "con"],
    description: "Mestre em todas as formas de combate armado e desarmado"
  },
  {
    name: "Mago",
    hitDie: 6,
    primaryAbility: ["int"],
    savingThrows: ["int", "wis"],
    description: "Conjurador erudito capaz de manipular a estrutura da realidade"
  },
  {
    name: "Clérigo",
    hitDie: 8,
    primaryAbility: ["wis"],
    savingThrows: ["wis", "cha"],
    description: "Campeão sagrado que empunha magia divina em serviço de um poder superior"
  },
  {
    name: "Ladino",
    hitDie: 8,
    primaryAbility: ["dex"],
    savingThrows: ["dex", "int"],
    description: "Especialista em furtividade e ataques precisos"
  },
  {
    name: "Ranger",
    hitDie: 10,
    primaryAbility: ["dex", "wis"],
    savingThrows: ["str", "dex"],
    description: "Guerreiro que usa proezas marciais e magia da natureza"
  },
  {
    name: "Paladino",
    hitDie: 10,
    primaryAbility: ["str", "cha"],
    savingThrows: ["wis", "cha"],
    description: "Guerreiro sagrado ligado a um juramento sagrado"
  },
  {
    name: "Bárbaro",
    hitDie: 12,
    primaryAbility: ["str"],
    savingThrows: ["str", "con"],
    description: "Guerreiro feroz de instintos primais e fúria indomável"
  },
  {
    name: "Bardo",
    hitDie: 8,
    primaryAbility: ["cha"],
    savingThrows: ["dex", "cha"],
    description: "Mestre inspirador das artes mágicas e marciais"
  },
  {
    name: "Druida",
    hitDie: 8,
    primaryAbility: ["wis"],
    savingThrows: ["int", "wis"],
    description: "Sacerdote do Velho Credo que empunha os poderes da natureza"
  },
  {
    name: "Feiticeiro",
    hitDie: 6,
    primaryAbility: ["cha"],
    savingThrows: ["con", "cha"],
    description: "Conjurador que extrai magia inata de um dom ou linhagem"
  },
  {
    name: "Monge",
    hitDie: 8,
    primaryAbility: ["dex", "wis"],
    savingThrows: ["str", "dex"],
    description: "Mestre das artes marciais que aproveita o poder do corpo"
  },
  {
    name: "Bruxo",
    hitDie: 8,
    primaryAbility: ["cha"],
    savingThrows: ["wis", "cha"],
    description: "Detentor de um pacto com uma entidade ultramundana"
  }
];

export const backgrounds = [
  {
    name: "Acólito",
    description: "Serviu como um intermediário entre o reino sagrado e o mundo mortal",
    skills: ["Intuição", "Religião"],
    personality: ["Devoto", "Respeitoso", "Fanático"]
  },
  {
    name: "Criminoso",
    description: "Experiência em atividades ilegais e contatos no submundo",
    skills: ["Enganação", "Furtividade"],
    personality: ["Astuto", "Desconfiado", "Oportunista"]
  },
  {
    name: "Herói do Povo",
    description: "Veio de origem humilde mas fez algo extraordinário",
    skills: ["Lidar com Animais", "Sobrevivência"],
    personality: ["Humilde", "Corajoso", "Compassivo"]
  },
  {
    name: "Nobre",
    description: "Compreende riqueza, poder e privilégio desde o nascimento",
    skills: ["História", "Persuasão"],
    personality: ["Arrogante", "Carismático", "Refinado"]
  },
  {
    name: "Sábio",
    description: "Passou anos aprendendo as tradições de conhecimento multiversal",
    skills: ["Arcanismo", "História"],
    personality: ["Curioso", "Meticuloso", "Pedante"]
  },
  {
    name: "Soldado",
    description: "Treinou para a guerra como parte de um exército oficial",
    skills: ["Atletismo", "Intimidação"],
    personality: ["Disciplinado", "Leal", "Direto"]
  },
  {
    name: "Artesão de Guilda",
    description: "Membro de uma guilda artesanal, especializado em um ofício particular",
    skills: ["Intuição", "Persuasão"],
    personality: ["Trabalhador", "Prático", "Conservador"]
  },
  {
    name: "Eremita",
    description: "Viveu em isolamento prolongado, seja por escolha ou circunstância",
    skills: ["Medicina", "Religião"],
    personality: ["Contemplativo", "Solitário", "Sábio"]
  },
  {
    name: "Forasteiro",
    description: "Cresceu nas terras selvagens, longe da civilização",
    skills: ["Atletismo", "Sobrevivência"],
    personality: ["Selvagem", "Independente", "Desconfortável em cidades"]
  },
  {
    name: "Artista",
    description: "Prosperou em frente a uma audiência, praticando as artes performáticas",
    skills: ["Acrobacia", "Performance"],
    personality: ["Dramático", "Extrovertido", "Vaidoso"]
  }
];

export const namesByRace = {
  Humano: {
    male: ["Aldric", "Brennan", "Cedric", "Duncan", "Gareth", "Marcus", "Roland", "Tristan"],
    female: ["Aria", "Beatrice", "Cassandra", "Elena", "Iris", "Lyra", "Nora", "Vivian"]
  },
  Elfo: {
    male: ["Arannis", "Elrowyn", "Faelor", "Galadin", "Ivellios", "Thamior", "Variel"],
    female: ["Althaea", "Caelynn", "Elaria", "Felosial", "Meriele", "Silaqui", "Thia"]
  },
  Anão: {
    male: ["Baern", "Darrak", "Eberk", "Gimgen", "Thorin", "Ulfgar", "Vondal"],
    female: ["Amber", "Diesa", "Eldeth", "Gurdis", "Helja", "Kathra", "Riswynn"]
  },
  Halfling: {
    male: ["Alton", "Cade", "Eldon", "Finnan", "Garret", "Lindal", "Osborn"],
    female: ["Andry", "Bree", "Callie", "Euphemia", "Jillian", "Merla", "Verna"]
  },
  "Meio-Elfo": {
    male: ["Aldric", "Elrowyn", "Marcus", "Thamior", "Gareth", "Variel"],
    female: ["Aria", "Caelynn", "Elena", "Meriele", "Lyra", "Silaqui"]
  },
  "Meio-Orc": {
    male: ["Dench", "Feng", "Gell", "Holg", "Imsh", "Krusk", "Shump"],
    female: ["Baggi", "Emen", "Engong", "Myev", "Neega", "Ovak", "Vola"]
  },
  Tiefling: {
    male: ["Akmenos", "Damakos", "Ekemon", "Iados", "Kairon", "Leucis", "Melech"],
    female: ["Akta", "Bryseis", "Criella", "Ea", "Kallista", "Lerissa", "Nemeia"]
  },
  Draconato: {
    male: ["Arjhan", "Balasar", "Bharash", "Donaar", "Ghesh", "Heskan", "Torinn"],
    female: ["Akra", "Biri", "Daar", "Farideh", "Harann", "Jheri", "Surina"]
  },
  Gnomo: {
    male: ["Alston", "Boddynock", "Dimble", "Eldon", "Fonkin", "Glim", "Sindri"],
    female: ["Bimpnottin", "Caramip", "Duvamil", "Ella", "Lorilla", "Nissa", "Waywocket"]
  }
};

export const personalityTraits = [
  "Extremamente confiante nas próprias habilidades",
  "Sempre procura aprender algo novo",
  "Tem um senso de humor peculiar",
  "É incrivelmente pessimista",
  "Fala sem pensar nas consequências",
  "É meticuloso e detalhista",
  "Gosta de ajudar os outros desinteressadamente",
  "Desconfia de estranhos por padrão",
  "Adora contar histórias e piadas",
  "É muito supersticioso",
  "Tem dificuldade em expressar emoções",
  "É extremamente educado e formal",
  "Adora animais mais do que pessoas",
  "Sempre tenta ver o lado bom das coisas",
  "É muito competitivo em tudo",
  "Prefere a solidão à companhia"
];

export const ideals = [
  "Liberdade - Todos devem poder fazer suas próprias escolhas",
  "Honra - A palavra dada deve ser cumprida",
  "Conhecimento - A busca pelo saber é o maior objetivo",
  "Poder - Força é tudo que importa neste mundo",
  "Justiça - Todos devem ser julgados de forma igual",
  "Ganância - Riqueza é o caminho para a felicidade",
  "Caridade - Ajudar os necessitados é um dever",
  "Mudança - O mundo precisa evoluir constantemente",
  "Tradição - Costumes antigos devem ser preservados",
  "Criatividade - A arte e inovação movem o mundo"
];

export const bonds = [
  "Tem uma dívida que precisa pagar a qualquer custo",
  "Busca vingança contra quem destruiu sua vida",
  "Protege um segredo que poderia arruinar alguém",
  "Procura por um artefato lendário",
  "É leal a uma organização ou grupo específico",
  "Tenta reencontrar um ente querido perdido",
  "Dedica-se a proteger uma localização específica",
  "Busca provar seu valor para alguém importante",
  "Carrega a herança de um mentor falecido",
  "Tem uma missão sagrada ou destino profetizado"
];

export const flaws = [
  "É viciado em algo (jogo, álcool, etc.)",
  "Tem medo irracional de algo específico",
  "É extremamente arrogante",
  "Não consegue resistir a uma boa barganha",
  "Mente compulsivamente",
  "Guarda rancor e nunca perdoa",
  "Age sem pensar nas consequências",
  "É covarde quando em perigo real",
  "Rouba coisas que não precisa",
  "Confia demais em quem não deveria"
];
