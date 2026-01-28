import {
  races,
  classes,
  backgrounds,
  namesByRace,
  personalityTraits,
  ideals,
  bonds,
  flaws
} from '../data/dndData';
import {
  generateAbilityScores,
  getStandardArray,
  randomChoice,
  applyRacialBonuses,
  calculateHP,
  calculateModifier,
  getProficiencyBonus,
  generateAge,
  generatePhysicalStats,
  formatModifier
} from './diceUtils';
import { jsPDF } from 'jspdf';

// Gerar um NPC completo
export const generateNPC = (options = {}) => {
  const {
    level = 1,
    method = 'roll', // 'roll' ou 'standard'
    specificRace = null,
    specificClass = null,
    specificBackground = null,
    gender = null
  } = options;

  // Selecionar raça, classe e background
  const race = specificRace || randomChoice(races);
  const characterClass = specificClass || randomChoice(classes);
  const background = specificBackground || randomChoice(backgrounds);
  
  // Determinar gênero
  const npcGender = gender || (Math.random() > 0.5 ? 'male' : 'female');
  
  // Gerar nome
  const nameList = namesByRace[race.name]?.[npcGender] || namesByRace["Humano"][npcGender];
  const firstName = randomChoice(nameList);
  const lastName = generateLastName(race.name);
  const fullName = `${firstName} ${lastName}`;
  
  // Gerar atributos base
  const baseAbilities = method === 'standard' 
    ? getStandardArray() 
    : generateAbilityScores();
  
  // Aplicar bônus raciais
  const finalAbilities = applyRacialBonuses(baseAbilities, race);
  
  // Calcular modificadores
  const modifiers = {};
  for (const ability in finalAbilities) {
    modifiers[ability] = calculateModifier(finalAbilities[ability]);
  }
  
  // Calcular HP
  const hp = calculateHP(characterClass, finalAbilities.con, level);
  
  // Calcular AC base (10 + modificador de Destreza)
  const baseAC = 10 + modifiers.dex;
  
  // Gerar características de personalidade
  const personality = {
    trait: randomChoice(personalityTraits),
    ideal: randomChoice(ideals),
    bond: randomChoice(bonds),
    flaw: randomChoice(flaws)
  };
  
  // Gerar características físicas
  const age = generateAge(race.name);
  const physicalStats = generatePhysicalStats(race.name, npcGender);
  
  // Bônus de proficiência
  const proficiencyBonus = getProficiencyBonus(level);
  
  // Montar o NPC completo
  const npc = {
    id: Date.now() + Math.random(), // ID único
    name: fullName,
    gender: npcGender === 'male' ? 'Masculino' : 'Feminino',
    race: race.name,
    class: characterClass.name,
    background: background.name,
    level,
    age,
    size: race.size,
    speed: race.speed,
    alignment: generateAlignment(),
    
    // Atributos
    abilities: finalAbilities,
    modifiers,
    
    // Combate
    hp,
    maxHp: hp,
    ac: baseAC,
    proficiencyBonus,
    hitDie: characterClass.hitDie,
    
    // Testes de resistência
    savingThrows: characterClass.savingThrows,
    
    // Características raciais
    racialTraits: race.traits,
    
    // Perícias do background
    skills: background.skills,
    
    // Personalidade
    personality,
    
    // Informações adicionais
    physicalStats,
    backgroundDescription: background.description,
    classDescription: characterClass.description,
    
    // Imagem do personagem
    avatarUrl: generateAvatarUrl(npcGender, race.name, characterClass.name, fullName),
    
    // Timestamp de criação
    createdAt: new Date().toISOString()
  };
  
  return npc;
};

// Gerar URL de avatar baseado nas características do personagem
const generateAvatarUrl = (gender, race, characterClass, name) => {
  const seed = encodeURIComponent(name);
  const style = 'big-ears';
  const params = new URLSearchParams({
    seed: seed,
    size: 400,
    backgroundColor: 'transparent'
  });
  return `https://api.dicebear.com/7.x/${style}/svg?${params.toString()}`;
};

// Gerar sobrenome baseado na raça
const generateLastName = (raceName) => {
  const lastNames = {
    "Humano": ["Silva", "Thornheart", "Ashwood", "Brightblade", "Stormwind", "Ironforge"],
    "Elfo": ["Amastacia", "Moonwhisper", "Starflower", "Nightbreeze", "Silvermoon"],
    "Anão": ["Forjapedra", "Martelo-de-Ferro", "Barbaforte", "Cervejapura", "Machadorúnico"],
    "Halfling": ["Colinaalta", "Péligeiro", "Folhaverde", "Boabebida", "Sotaque"],
    "Meio-Elfo": ["Thornheart", "Moonwhisper", "Ashwood", "Silvermoon", "Brightblade"],
    "Meio-Orc": ["Garraferoz", "Machadoraivosa", "Craniopartido", "Gritofúria"],
    "Tiefling": ["Desespero", "Glória", "Esperança", "Busca", "Tormenta", "Ideal"],
    "Draconato": ["Clethtinthiallor", "Daardendrian", "Fenkenkabradon", "Yarjerit"],
    "Gnomo": ["Nackle", "Timbers", "Turen", "Scheppen", "Folkor", "Garrick"]
  };
  
  const names = lastNames[raceName] || lastNames["Humano"];
  return randomChoice(names);
};

// Gerar alinhamento aleatório
const generateAlignment = () => {
  const alignments = [
    "Leal e Bom", "Neutro e Bom", "Caótico e Bom",
    "Leal e Neutro", "Neutro", "Caótico e Neutro",
    "Leal e Mau", "Neutro e Mau", "Caótico e Mau"
  ];
  
  return randomChoice(alignments);
};

// Exportar NPC como PDF
export const exportNPCAsPDF = async (npc) => {
  try {
    const doc = new jsPDF();
    
    // Configurações
    const margin = 20;
    let y = margin;
    const lineHeight = 7;
    const pageWidth = doc.internal.pageSize.width;
    
    // Título principal
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('FICHA DE PERSONAGEM D&D', pageWidth / 2, y, { align: 'center' });
    y += lineHeight * 2;
    
    // Linha separadora
    doc.setDrawColor(180, 120, 30);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += lineHeight;
    
    // Adicionar imagem do avatar se disponível
    if (npc.avatarUrl) {
      try {
        console.log('Carregando imagem do avatar...');
        
        // Criar um canvas para converter SVG
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const imgSize = 200; // tamanho em pixels
        canvas.width = imgSize;
        canvas.height = imgSize;
        
        // Carregar o SVG
        const response = await fetch(npc.avatarUrl);
        const svgText = await response.text();
        
        // Criar um blob e URL do SVG
        const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        
        // Carregar como imagem
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        await new Promise((resolve, reject) => {
          img.onload = () => {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, imgSize, imgSize);
            ctx.drawImage(img, 0, 0, imgSize, imgSize);
            
            const imgData = canvas.toDataURL('image/png');
            
            const pdfImgSize = 40;
            const imgX = (pageWidth - pdfImgSize) / 2;
            doc.addImage(imgData, 'PNG', imgX, y, pdfImgSize, pdfImgSize);
            
            URL.revokeObjectURL(url);
            resolve();
          };
          
          img.onerror = (error) => {
            URL.revokeObjectURL(url);
            reject(error);
          };
          
          img.src = url;
        });
        
        y += 45;
      } catch (error) {
      }
    }
    
    // Nome do personagem
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(npc.name, pageWidth / 2, y, { align: 'center' });
    y += lineHeight;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`${npc.race} ${npc.class} - Nível ${npc.level}`, pageWidth / 2, y, { align: 'center' });
    y += lineHeight * 1.5;
  
  // Seção: Informações Básicas
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('INFORMAÇÕES BÁSICAS', margin, y);
  y += lineHeight;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Background: ${npc.background}`, margin, y);
  y += lineHeight;
  doc.text(`Alinhamento: ${npc.alignment}`, margin, y);
  y += lineHeight;
  doc.text(`Gênero: ${npc.gender}`, margin, y);
  doc.text(`Idade: ${npc.age} anos`, pageWidth / 2, y);
  y += lineHeight * 1.5;
  
  // Seção: Atributos
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('ATRIBUTOS', margin, y);
  y += lineHeight;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const abilities = [
    { name: 'Força', value: npc.abilities.str, mod: npc.modifiers.str },
    { name: 'Destreza', value: npc.abilities.dex, mod: npc.modifiers.dex },
    { name: 'Constituição', value: npc.abilities.con, mod: npc.modifiers.con },
    { name: 'Inteligência', value: npc.abilities.int, mod: npc.modifiers.int },
    { name: 'Sabedoria', value: npc.abilities.wis, mod: npc.modifiers.wis },
    { name: 'Carisma', value: npc.abilities.cha, mod: npc.modifiers.cha }
  ];
  
  abilities.forEach((ability, index) => {
    const col = index % 2 === 0 ? margin : pageWidth / 2;
    doc.text(`${ability.name}: ${ability.value} (${formatModifier(ability.mod)})`, col, y);
    if (index % 2 === 1) y += lineHeight;
  });
  y += lineHeight * 1.5;
  
  // Seção: Combate
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('COMBATE', margin, y);
  y += lineHeight;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Pontos de Vida: ${npc.hp}/${npc.maxHp}`, margin, y);
  y += lineHeight;
  doc.text(`Classe de Armadura: ${npc.ac}`, margin, y);
  doc.text(`Bônus de Proficiência: +${npc.proficiencyBonus}`, pageWidth / 2, y);
  y += lineHeight;
  doc.text(`Dado de Vida: 1d${npc.hitDie}`, margin, y);
  y += lineHeight * 1.5;
  
  // Seção: Características
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('CARACTERÍSTICAS', margin, y);
  y += lineHeight;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Traços Raciais: ${npc.racialTraits.join(', ')}`, margin, y, { maxWidth: pageWidth - 2 * margin });
  y += lineHeight * 1.5;
  doc.text(`Perícias: ${npc.skills.join(', ')}`, margin, y, { maxWidth: pageWidth - 2 * margin });
  y += lineHeight * 1.5;
  doc.text(`Velocidade: ${npc.speed} pés`, margin, y);
  doc.text(`Tamanho: ${npc.size}`, pageWidth / 2, y);
  y += lineHeight * 1.5;
  
  // Seção: Personalidade
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('PERSONALIDADE', margin, y);
  y += lineHeight;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Traço: ${npc.personality.trait}`, margin, y, { maxWidth: pageWidth - 2 * margin });
  y += lineHeight * 1.5;
  doc.text(`Ideal: ${npc.personality.ideal}`, margin, y, { maxWidth: pageWidth - 2 * margin });
  y += lineHeight * 1.5;
  doc.text(`Vínculo: ${npc.personality.bond}`, margin, y, { maxWidth: pageWidth - 2 * margin });
  y += lineHeight * 1.5;
  doc.text(`Defeito: ${npc.personality.flaw}`, margin, y, { maxWidth: pageWidth - 2 * margin });
  
  doc.save(`${npc.name.replace(/\s+/g, '_')}_NPC.pdf`);
  } catch (error) {
    throw error;
  }
};

// Exportar NPC como texto
export const exportNPCAsText = (npc) => {
  return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FICHA DE PERSONAGEM D&D
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INFORMAÇÕES BÁSICAS
────────────────────────────────────────
Nome: ${npc.name}
Raça: ${npc.race}
Classe: ${npc.class} (Nível ${npc.level})
Background: ${npc.background}
Alinhamento: ${npc.alignment}
Gênero: ${npc.gender}
Idade: ${npc.age} anos

ATRIBUTOS
────────────────────────────────────────
Força:        ${npc.abilities.str} (${formatModifier(npc.modifiers.str)})
Destreza:     ${npc.abilities.dex} (${formatModifier(npc.modifiers.dex)})
Constituição: ${npc.abilities.con} (${formatModifier(npc.modifiers.con)})
Inteligência: ${npc.abilities.int} (${formatModifier(npc.modifiers.int)})
Sabedoria:    ${npc.abilities.wis} (${formatModifier(npc.modifiers.wis)})
Carisma:      ${npc.abilities.cha} (${formatModifier(npc.modifiers.cha)})

COMBATE
────────────────────────────────────────
Pontos de Vida: ${npc.hp}/${npc.maxHp}
Classe de Armadura: ${npc.ac}
Bônus de Proficiência: +${npc.proficiencyBonus}
Dado de Vida: 1d${npc.hitDie}

CARACTERÍSTICAS
────────────────────────────────────────
Traços Raciais: ${npc.racialTraits.join(', ')}
Perícias: ${npc.skills.join(', ')}
Velocidade: ${npc.speed} pés
Tamanho: ${npc.size}

PERSONALIDADE
────────────────────────────────────────
Traço: ${npc.personality.trait}
Ideal: ${npc.personality.ideal}
Vínculo: ${npc.personality.bond}
Defeito: ${npc.personality.flaw}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Criado em: ${new Date(npc.createdAt).toLocaleString('pt-BR')}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
};

// Salvar NPC no localStorage
export const saveNPC = (npc) => {
  const saved = getSavedNPCs();
  saved.push(npc);
  localStorage.setItem('savedNPCs', JSON.stringify(saved));
};

// Obter NPCs salvos
export const getSavedNPCs = () => {
  const saved = localStorage.getItem('savedNPCs');
  return saved ? JSON.parse(saved) : [];
};

// Deletar NPC salvo
export const deleteNPC = (npcId) => {
  const saved = getSavedNPCs();
  const filtered = saved.filter(npc => npc.id !== npcId);
  localStorage.setItem('savedNPCs', JSON.stringify(filtered));
};

// Limpar todos os NPCs salvos
export const clearAllNPCs = () => {
  localStorage.removeItem('savedNPCs');
};
