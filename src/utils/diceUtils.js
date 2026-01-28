// Função para rolar dados (ex: rollDice(6) rola 1d6, rollDice(20, 2) rola 2d20)
export const rollDice = (sides, times = 1) => {
  let total = 0;
  for (let i = 0; i < times; i++) {
    total += Math.floor(Math.random() * sides) + 1;
  }
  return total;
};

// Função para rolar 4d6 e descartar o menor (método padrão de geração de atributos)
export const roll4d6DropLowest = () => {
  const rolls = [rollDice(6), rollDice(6), rollDice(6), rollDice(6)];
  rolls.sort((a, b) => a - b);
  return rolls.slice(1).reduce((sum, val) => sum + val, 0);
};

// Calcular modificador de atributo baseado no valor
export const calculateModifier = (abilityScore) => {
  return Math.floor((abilityScore - 10) / 2);
};

// Gerar todos os 6 atributos usando o método 4d6 drop lowest
export const generateAbilityScores = () => {
  return {
    str: roll4d6DropLowest(),
    dex: roll4d6DropLowest(),
    con: roll4d6DropLowest(),
    int: roll4d6DropLowest(),
    wis: roll4d6DropLowest(),
    cha: roll4d6DropLowest()
  };
};

// Método alternativo: Standard Array (array padrão do D&D 5e)
export const getStandardArray = () => {
  const standardArray = [15, 14, 13, 12, 10, 8];
  const shuffled = standardArray.sort(() => Math.random() - 0.5);
  return {
    str: shuffled[0],
    dex: shuffled[1],
    con: shuffled[2],
    int: shuffled[3],
    wis: shuffled[4],
    cha: shuffled[5]
  };
};

// Selecionar elemento aleatório de um array
export const randomChoice = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// Aplicar bônus raciais aos atributos
export const applyRacialBonuses = (baseScores, race) => {
  const scores = { ...baseScores };
  const bonuses = race.abilityBonus;
  
  for (const ability in bonuses) {
    scores[ability] += bonuses[ability];
  }
  
  return scores;
};

// Calcular HP baseado na classe e constituição
export const calculateHP = (classData, constitution, level = 1) => {
  const conModifier = calculateModifier(constitution);
  if (level === 1) {
    return classData.hitDie + conModifier;
  }
  // Para níveis maiores, média do dado + modificador por nível
  const additionalHP = Math.floor((classData.hitDie / 2) + 1 + conModifier) * (level - 1);
  return classData.hitDie + conModifier + additionalHP;
};

// Calcular bônus de proficiência baseado no nível
export const getProficiencyBonus = (level) => {
  return Math.ceil(level / 4) + 1;
};

// Formatar modificador com sinal (+/-)
export const formatModifier = (modifier) => {
  return modifier >= 0 ? `+${modifier}` : `${modifier}`;
};

// Gerar idade apropriada para a raça
export const generateAge = (raceName) => {
  const ageRanges = {
    "Humano": { min: 18, max: 80 },
    "Elfo": { min: 100, max: 700 },
    "Anão": { min: 50, max: 350 },
    "Halfling": { min: 20, max: 150 },
    "Meio-Elfo": { min: 20, max: 180 },
    "Meio-Orc": { min: 14, max: 75 },
    "Tiefling": { min: 18, max: 90 },
    "Draconato": { min: 15, max: 80 },
    "Gnomo": { min: 40, max: 400 }
  };
  
  const range = ageRanges[raceName] || { min: 18, max: 80 };
  return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
};

// Gerar altura e peso apropriados
export const generatePhysicalStats = (raceName, gender) => {
  // Simplificado - valores aproximados
  const stats = {
    "Humano": { height: "1,65m - 1,85m", weight: "60kg - 90kg" },
    "Elfo": { height: "1,50m - 1,80m", weight: "50kg - 70kg" },
    "Anão": { height: "1,20m - 1,50m", weight: "70kg - 100kg" },
    "Halfling": { height: "0,90m - 1,20m", weight: "30kg - 50kg" },
    "Meio-Elfo": { height: "1,60m - 1,85m", weight: "60kg - 85kg" },
    "Meio-Orc": { height: "1,70m - 2,00m", weight: "80kg - 120kg" },
    "Tiefling": { height: "1,60m - 1,85m", weight: "60kg - 90kg" },
    "Draconato": { height: "1,80m - 2,10m", weight: "100kg - 140kg" },
    "Gnomo": { height: "0,90m - 1,20m", weight: "20kg - 40kg" }
  };
  
  return stats[raceName] || stats["Humano"];
};
