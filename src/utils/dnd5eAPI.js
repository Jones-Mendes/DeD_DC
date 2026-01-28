const API_BASE = 'https://www.dnd5eapi.co/api';

// Cache para reduzir chamadas repetidas
const cache = {
  classes: {},
  races: {},
  spells: {},
  equipment: {}
};

/**
 * Fetch genérico com cache
 */
async function fetchAPI(endpoint) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`);
    if (!response.ok) throw new Error('API request failed');
    return await response.json();
  } catch (error) {
    return null;
  }
}

/**
 * Busca detalhes da classe
 */
export async function getClassDetails(className) {
  const classMap = {
    'Bárbaro': 'barbarian',
    'Bardo': 'bard',
    'Clérigo': 'cleric',
    'Druida': 'druid',
    'Guerreiro': 'fighter',
    'Monge': 'monk',
    'Paladino': 'paladin',
    'Ranger': 'ranger',
    'Ladino': 'rogue',
    'Feiticeiro': 'sorcerer',
    'Bruxo': 'warlock',
    'Mago': 'wizard'
  };

  const apiName = classMap[className];
  if (!apiName) return null;

  if (cache.classes[apiName]) return cache.classes[apiName];

  const data = await fetchAPI(`/classes/${apiName}`);
  if (data) cache.classes[apiName] = data;
  return data;
}

/**
 * Busca detalhes da raça
 */
export async function getRaceDetails(raceName) {
  const raceMap = {
    'Humano': 'human',
    'Elfo': 'elf',
    'Anão': 'dwarf',
    'Halfling': 'halfling',
    'Draconato': 'dragonborn',
    'Gnomo': 'gnome',
    'Meio-Elfo': 'half-elf',
    'Meio-Orc': 'half-orc',
    'Tiefling': 'tiefling'
  };

  const apiName = raceMap[raceName];
  if (!apiName) return null;

  if (cache.races[apiName]) return cache.races[apiName];

  const data = await fetchAPI(`/races/${apiName}`);
  if (data) cache.races[apiName] = data;
  return data;
}

/**
 * Traduz escolas de magia para português
 */
function translateSpellSchool(schoolName) {
  const schools = {
    'Abjuration': 'Abjuração',
    'Conjuration': 'Conjuração',
    'Divination': 'Adivinhação',
    'Enchantment': 'Encantamento',
    'Evocation': 'Evocação',
    'Illusion': 'Ilusão',
    'Necromancy': 'Necromancia',
    'Transmutation': 'Transmutação',
    'Unknown': 'Desconhecida'
  };
  return schools[schoolName] || schoolName;
}

/**
 * Traduz nomes de magias para português
 */
function translateSpellName(spellName) {
  const spells = {
    'Acid Splash': 'Borrifada Ácida',
    'Blade Ward': 'Proteção contra Lâminas',
    'Chill Touch': 'Toque Gélido',
    'Dancing Lights': 'Luzes Dançantes',
    'Fire Bolt': 'Rajada de Fogo',
    'Light': 'Luz',
    'Mage Hand': 'Mãos Mágicas',
    'Mending': 'Consertar',
    'Message': 'Mensagem',
    'Minor Illusion': 'Ilusão Menor',
    'Poison Spray': 'Névoa Venenosa',
    'Prestidigitation': 'Prestidigitação',
    'Ray of Frost': 'Raio de Gelo',
    'Shocking Grasp': 'Toque Chocante',
    'True Strike': 'Golpe Certeiro',
    'Magic Missile': 'Mísseis Mágicos',
    'Shield': 'Escudo',
    'Burning Hands': 'Mãos Flamejantes',
    'Charm Person': 'Enfeitiçar Pessoa',
    'Cure Wounds': 'Curar Ferimentos',
    'Guiding Bolt': 'Projétil Guiado',
    'Healing Word': 'Palavra Curativa',
    'Sleep': 'Sono',
    'Thunderwave': 'Onda Trovejante',
    'Spiritual Weapon': 'Arma Espiritual',
    'Hold Person': 'Imobilizar Pessoa',
    'Invisibility': 'Invisibilidade',
    'Misty Step': 'Passo Nebuloso',
    'Scorching Ray': 'Raio Ardente',
    'Shatter': 'Estilhaçar',
    'Fireball': 'Bola de Fogo',
    'Lightning Bolt': 'Relâmpago',
    'Counterspell': 'Contra-Mágica',
    'Dispel Magic': 'Dissipar Magia',
    'Fly': 'Voar',
    'Haste': 'Velocidade',
    'Revivify': 'Reviver'
  };
  return spells[spellName] || spellName;
}

/**
 * Traduz descrições de magias para português
 */
function translateSpellDescription(spellName) {
  const descriptions = {
    'Acid Splash': 'Você arremessa uma bolha de ácido. Escolha uma ou duas criaturas que você possa ver dentro do alcance. Se você escolher duas, elas devem estar a 5 pés uma da outra. Um alvo deve ter sucesso em um teste de resistência de Destreza ou sofrerá 1d6 de dano ácido.',
    'Fire Bolt': 'Você arremessa um projétil de fogo em uma criatura ou objeto dentro do alcance. Faça um ataque à distância com magia contra o alvo. Se atingir, o alvo sofre 1d10 de dano de fogo. Um objeto inflamável atingido por essa magia pega fogo se não estiver sendo vestido ou carregado.',
    'Magic Missile': 'Você cria três dardos brilhantes de força mágica. Cada dardo atinge uma criatura de sua escolha que você possa ver dentro do alcance. Um dardo causa 1d4 + 1 de dano de força ao alvo. Os dardos atingem simultaneamente.',
    'Shield': 'Uma barreira invisível de força mágica aparece e protege você. Até o início do seu próximo turno, você tem +5 de bônus na CA, incluindo contra o ataque que acionou a magia.',
    'Cure Wounds': 'Uma criatura que você tocar recupera uma quantidade de pontos de vida igual a 1d8 + seu modificador de habilidade de conjuração.',
    'Fireball': 'Um raio brilhante dispara de seu dedo apontador para um ponto escolhido dentro do alcance e então irrompe em uma explosão de chamas. Cada criatura em uma esfera de 20 pés de raio centrada naquele ponto deve fazer um teste de resistência de Destreza. Um alvo sofre 8d6 de dano de fogo em uma falha, ou metade desse dano em um sucesso.',
    'Lightning Bolt': 'Um relâmpago em forma de linha de 100 pés de comprimento e 5 pés de largura dispara de você numa direção que você escolher. Cada criatura na linha deve fazer um teste de resistência de Destreza. Uma criatura sofre 8d6 de dano elétrico se falhar, ou metade em um sucesso.',
    'Healing Word': 'Uma criatura de sua escolha que você possa ver dentro do alcance recupera pontos de vida iguais a 1d4 + seu modificador de habilidade de conjuração.',
    'Sleep': 'Esta magia envia criaturas para um sono mágico. Role 5d8; o total é quantos pontos de vida de criaturas essa magia pode afetar. Criaturas a até 20 pés de um ponto que você escolher dentro do alcance são afetadas em ordem ascendente de seus pontos de vida atuais.',
    'Invisibility': 'Uma criatura que você tocar fica invisível até a magia terminar. Qualquer coisa que o alvo esteja vestindo ou carregando fica invisível enquanto estiver na posse do alvo. A magia termina para um alvo que ataca ou conjura uma magia.',
    'Misty Step': 'Brevemente envolto em névoa prateada, você se teletransporta até 30 pés para um espaço desocupado que você possa ver.',
    'Counterspell': 'Você tenta interromper uma criatura no processo de conjurar uma magia. Se a criatura estiver conjurando uma magia de 3º nível ou menor, sua magia falha e não tem efeito.',
    'Fly': 'Você toca uma criatura voluntária. O alvo ganha velocidade de voo de 60 pés pela duração. Quando a magia termina, o alvo cai se ainda estiver no ar, a menos que possa parar a queda.',
    'Haste': 'Escolha uma criatura voluntária que você possa ver dentro do alcance. Até a magia terminar, a velocidade do alvo é dobrada, ganha +2 de bônus na CA, tem vantagem em testes de resistência de Destreza, e ganha uma ação adicional em cada um de seus turnos.'
  };
  
  return descriptions[spellName] || 'Descrição mágica poderosa que afeta o campo de batalha.';
}

/**
 * Busca magias apropriadas para a classe e nível
 */
export async function getSpellsForClass(className, characterLevel) {
  const classData = await getClassDetails(className);
  if (!classData || !classData.spellcasting) return [];

  try {
    // Determina nível máximo de magia disponível
    const spellSlots = {
      1: 1, 2: 1, 3: 2, 4: 2, 5: 3, 6: 3, 7: 4, 8: 4, 9: 5,
      10: 5, 11: 6, 12: 6, 13: 7, 14: 7, 15: 8, 16: 8, 17: 9, 18: 9, 19: 9, 20: 9
    };
    const maxSpellLevel = Math.floor(spellSlots[characterLevel] || 1);

    // Busca magias da classe
    const spellsResponse = await fetchAPI(`/classes/${classData.index}/spells`);
    if (!spellsResponse || !spellsResponse.results) return [];

    // Filtra magias até o nível apropriado e pega uma amostra
    const availableSpells = spellsResponse.results.slice(0, 20);
    const selectedSpells = [];

    for (const spellRef of availableSpells.slice(0, 8)) {
      const url = spellRef.url.replace('https://www.dnd5eapi.co', '');
      const path = url.startsWith('/api') ? url.replace('/api', '') : url;
      const spell = await fetchAPI(path);
      if (spell && spell.level <= maxSpellLevel) {
        selectedSpells.push({
          name: translateSpellName(spell.name),
          level: spell.level,
          school: translateSpellSchool(spell.school?.name || 'Unknown'),
          description: translateSpellDescription(spell.name)
        });
      }
      if (selectedSpells.length >= 6) break;
    }

    return selectedSpells;
  } catch (error) {
    return [];
  }
}

/**
 * Traduz nomes de equipamentos para português
 */
function translateEquipmentName(equipName) {
  const equipment = {
    'Longsword': 'Espada Longa',
    'Shortsword': 'Espada Curta',
    'Greatsword': 'Montante',
    'Rapier': 'Rapieira',
    'Scimitar': 'Cimitarra',
    'Dagger': 'Adaga',
    'Club': 'Clava',
    'Quarterstaff': 'Cajado',
    'Shortbow': 'Arco Curto',
    'Longbow': 'Arco Longo',
    'Crossbow, light': 'Besta Leve',
    'Crossbow, heavy': 'Besta Pesada',
    'Handaxe': 'Machado de Mão',
    'Battleaxe': 'Machado de Batalha',
    'Greataxe': 'Machado Grande',
    'Warhammer': 'Martelo de Guerra',
    'Mace': 'Maça',
    'Javelin': 'Dardo',
    'Spear': 'Lança',
    'Morningstar': 'Mangual',
    'Leather Armor': 'Armadura de Couro',
    'Studded Leather Armor': 'Armadura de Couro Batido',
    'Hide Armor': 'Armadura de Pele',
    'Chain Shirt': 'Camisão de Cota de Malha',
    'Scale Mail': 'Brunea',
    'Breastplate': 'Peitoral',
    'Half Plate Armor': 'Meia-Armadura',
    'Ring Mail': 'Cota de Anéis',
    'Chain Mail': 'Cota de Malha',
    'Splint Armor': 'Cota de Talas',
    'Plate Armor': 'Armadura de Placas',
    'Shield': 'Escudo',
    'Backpack': 'Mochila',
    'Bedroll': 'Saco de Dormir',
    'Rope': 'Corda',
    'Torch': 'Tocha',
    'Waterskin': 'Cantil',
    'Rations': 'Rações',
    'Arrows': 'Flechas',
    'Bolts': 'Virotes',
    'Holy Symbol': 'Símbolo Sagrado',
    'Spellbook': 'Livro de Magias',
    'Component Pouch': 'Bolsa de Componentes',
    "Thieves' Tools": 'Ferramentas de Ladrão',
    'Musical Instrument': 'Instrumento Musical'
  };
  return equipment[equipName] || equipName;
}

/**
 * Traduz categorias de equipamento para português
 */
function translateEquipmentType(typeName) {
  const types = {
    'Weapon': 'Arma',
    'Armor': 'Armadura',
    'Adventuring Gear': 'Equipamento de Aventura',
    'Tools': 'Ferramentas',
    'Mounts and Vehicles': 'Montarias e Veículos',
    'Item': 'Item',
    'Equipment Pack': 'Kit de Equipamento'
  };
  return types[typeName] || typeName;
}

/**
 * Busca equipamento apropriado para a classe
 */
export async function getEquipmentForClass(className, characterLevel) {
  const classData = await getClassDetails(className);
  if (!classData) return [];

  try {
    const equipmentResponse = await fetchAPI(`/classes/${classData.index}/starting-equipment`);
    if (!equipmentResponse) return [];

    const equipment = [];
    
    // Adiciona equipamento inicial
    if (equipmentResponse.starting_equipment) {
      for (const item of equipmentResponse.starting_equipment.slice(0, 5)) {
        const url = item.equipment.url.replace('https://www.dnd5eapi.co', '');
        const path = url.startsWith('/api') ? url.replace('/api', '') : url;
        const equipData = await fetchAPI(path);
        if (equipData) {
          equipment.push({
            name: translateEquipmentName(equipData.name),
            type: translateEquipmentType(equipData.equipment_category?.name || 'Item'),
            quantity: item.quantity || 1
          });
        }
      }
    }

    return equipment;
  } catch (error) {
    return [];
  }
}

/**
 * Traduz nomes e descrições de traits raciais para português
 */
function translateTrait(traitName, description) {
  const traitTranslations = {
    // Anão
    'Darkvision': { name: 'Visão no Escuro', desc: 'Você pode ver na penumbra a até 18 metros como se fosse luz plena, e no escuro como se fosse penumbra. Você não pode discernir cores no escuro, apenas tons de cinza.' },
    'Dwarven Resilience': { name: 'Resiliência Anã', desc: 'Você tem vantagem em testes de resistência contra veneno e resistência contra dano de veneno.' },
    'Dwarven Combat Training': { name: 'Treinamento de Combate Anão', desc: 'Você tem proficiência com machados de batalha, machadinhas, martelos de arremesso e martelos de guerra.' },
    'Stonecunning': { name: 'Conhecimento de Pedra', desc: 'Sempre que realizar um teste de Inteligência (História) relacionado à origem de um trabalho em pedra, você é considerado proficiente na perícia História e adiciona o dobro de seu bônus de proficiência ao teste.' },
    
    // Elfo
    'Fey Ancestry': { name: 'Ancestral Feérico', desc: 'Você tem vantagem em testes de resistência contra ser enfeitiçado e magia não pode colocá-lo para dormir.' },
    'Trance': { name: 'Transe', desc: 'Elfos não precisam dormir. Em vez disso, eles meditam profundamente por 4 horas por dia. Após descansar dessa forma, você obtém o mesmo benefício que um humano obteria de 8 horas de sono.' },
    'Keen Senses': { name: 'Sentidos Aguçados', desc: 'Você tem proficiência na perícia Percepção.' },
    
    // Halfling
    'Lucky': { name: 'Sortudo', desc: 'Quando você obtiver um 1 natural em um teste de ataque, teste de atributo ou teste de resistência, você pode jogar novamente o dado e deve usar o novo resultado.' },
    'Brave': { name: 'Corajoso', desc: 'Você tem vantagem em testes de resistência contra ficar amedrontado.' },
    'Halfling Nimbleness': { name: 'Agilidade Halfling', desc: 'Você pode mover-se através do espaço de qualquer criatura que seja de um tamanho maior que o seu.' },
    
    // Humano
    'Age': { name: 'Idade', desc: 'Humanos atingem a idade adulta aos 18 anos e vivem menos de um século.' },
    'Size': { name: 'Tamanho', desc: 'Humanos variam muito em altura e constituição, de 1,5 a 1,8 metro de altura.' },
    'Languages': { name: 'Idiomas', desc: 'Você pode falar, ler e escrever Comum e um idioma extra de sua escolha.' },
    
    // Draconato
    'Draconic Ancestry': { name: 'Ancestral Dracônico', desc: 'Você tem ancestralidade dracônica. Escolha um tipo de dragão. Seu sopro e resistência a dano são determinados pelo tipo de dragão.' },
    'Breath Weapon': { name: 'Arma de Sopro', desc: 'Você pode usar sua ação para exalar energia destrutiva. Quando você usa sua arma de sopro, cada criatura na área da exalação deve fazer um teste de resistência.' },
    'Damage Resistance': { name: 'Resistência a Dano', desc: 'Você tem resistência ao tipo de dano associado à sua ancestralidade dracônica.' },
    
    // Gnomo
    'Gnome Cunning': { name: 'Astúcia Gnômica', desc: 'Você tem vantagem em todos os testes de resistência de Inteligência, Sabedoria e Carisma contra magia.' },
    
    // Meio-Elfo
    'Skill Versatility': { name: 'Versatilidade em Perícias', desc: 'Você ganha proficiência em duas perícias de sua escolha.' },
    
    // Meio-Orc
    'Menacing': { name: 'Ameaçador', desc: 'Você ganha proficiência na perícia Intimidação.' },
    'Relentless Endurance': { name: 'Resistência Incansável', desc: 'Quando você é reduzido a 0 pontos de vida mas não é completamente morto, você pode ficar com 1 ponto de vida. Você não pode usar esta característica novamente até terminar um descanso longo.' },
    'Savage Attacks': { name: 'Ataques Selvagens', desc: 'Quando você consegue um acerto crítico com um ataque corpo a corpo, você pode rolar um dos dados de dano da arma mais uma vez e adicioná-lo ao dano extra do crítico.' },
    
    // Tiefling
    'Hellish Resistance': { name: 'Resistência Infernal', desc: 'Você tem resistência a dano de fogo.' },
    'Infernal Legacy': { name: 'Legado Infernal', desc: 'Você conhece o truque thaumaturgy. Quando você atinge o 3º nível, você pode conjurar a magia hellish rebuke uma vez por dia. Quando você atinge o 5º nível, você também pode conjurar a magia darkness uma vez por dia.' }
  };

  const translated = traitTranslations[traitName];
  if (translated) {
    return {
      name: translated.name,
      description: translated.desc
    };
  }
  
  // Se não houver tradução, retorna o original
  return { name: traitName, description: description };
}

/**
 * Busca traits raciais oficiais
 */
export async function getRacialTraits(raceName) {
  const raceData = await getRaceDetails(raceName);
  if (!raceData || !raceData.traits) return [];

  const traits = [];
  for (const traitRef of raceData.traits.slice(0, 4)) {
    try {
      // Extrair apenas o endpoint após /api/ (ex: /traits/menacing)
      const url = traitRef.url.replace('https://www.dnd5eapi.co', '');
      const path = url.startsWith('/api') ? url.replace('/api', '') : url;
      const trait = await fetchAPI(path);
      if (trait) {
        const translated = translateTrait(trait.name, trait.desc?.[0] || '');
        traits.push({
          name: translated.name,
          description: translated.description
        });
      }
    } catch (error) {
    }
  }

  return traits;
}

/**
 * Traduz nomes de proficiências para português
 */
function translateProficiency(proficiencyName) {
  const translations = {
    // Armas
    'Simple weapons': 'Armas simples',
    'Martial weapons': 'Armas marciais',
    'All armor': 'Todas as armaduras',
    'Light armor': 'Armaduras leves',
    'Medium armor': 'Armaduras médias',
    'Heavy armor': 'Armaduras pesadas',
    'Shields': 'Escudos',
    
    // Atributos (Saving Throws)
    'STR': 'FOR',
    'DEX': 'DES',
    'CON': 'CON',
    'INT': 'INT',
    'WIS': 'SAB',
    'CHA': 'CAR',
    
    // Perícias
    'Acrobatics': 'Acrobacia',
    'Animal Handling': 'Lidar com Animais',
    'Arcana': 'Arcanismo',
    'Athletics': 'Atletismo',
    'Deception': 'Enganação',
    'History': 'História',
    'Insight': 'Intuição',
    'Intimidation': 'Intimidação',
    'Investigation': 'Investigação',
    'Medicine': 'Medicina',
    'Nature': 'Natureza',
    'Perception': 'Percepção',
    'Performance': 'Atuação',
    'Persuasion': 'Persuasão',
    'Religion': 'Religião',
    'Sleight of Hand': 'Prestidigitação',
    'Stealth': 'Furtividade',
    'Survival': 'Sobrevivência'
  };
  
  return translations[proficiencyName] || proficiencyName;
}

/**
 * Busca proficiências da classe
 */
export async function getClassProficiencies(className) {
  const classData = await getClassDetails(className);
  if (!classData) return { weapons: [], armor: [], saves: [], skills: [] };

  try {
    return {
      weapons: classData.proficiencies
        ?.filter(p => p.name.includes('weapon'))
        .map(p => translateProficiency(p.name)) || [],
      armor: classData.proficiencies
        ?.filter(p => p.name.includes('Armor') || p.name.includes('Shields'))
        .map(p => translateProficiency(p.name)) || [],
      saves: classData.saving_throws?.map(s => translateProficiency(s.name)) || [],
      skills: classData.proficiency_choices?.[0]?.from?.options
        ?.map(o => translateProficiency(o.item?.name))
        .filter(Boolean)
        .slice(0, 4) || []
    };
  } catch (error) {
    return { weapons: [], armor: [], saves: [], skills: [] };
  }
}

/**
 * Enriquece dados do NPC com informações da API
 */
export async function enrichNPCData(npc) {
  try {
    const [spells, equipment, racialTraits, proficiencies] = await Promise.all([
      getSpellsForClass(npc.class, npc.level),
      getEquipmentForClass(npc.class, npc.level),
      getRacialTraits(npc.race),
      getClassProficiencies(npc.class)
    ]);

    return {
      ...npc,
      spells: spells.length > 0 ? spells : undefined,
      equipment: equipment.length > 0 ? equipment : npc.equipment,
      racialTraitsDetailed: racialTraits.length > 0 ? racialTraits : undefined,
      proficiencies: proficiencies
    };
  } catch (error) {
    return npc;
  }
}
