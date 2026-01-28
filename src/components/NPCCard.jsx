import { formatModifier } from '../utils/diceUtils';

const NPCCard = ({ npc }) => {
  if (!npc) return null;

  return (
    <div className="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-lg shadow-2xl p-4 sm:p-6 border-4 border-amber-800 max-w-4xl mx-auto">
      {/* Cabeçalho */}
      <div className="border-b-4 border-amber-800 pb-3 sm:pb-4 mb-4 sm:mb-6">
        {/* Imagem do Personagem */}
        {npc.avatarUrl && (
          <div className="flex justify-center mb-3 sm:mb-4">
            <img 
              src={npc.avatarUrl} 
              alt={npc.name}
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-4 border-amber-700 shadow-lg bg-gradient-to-br from-amber-100 to-yellow-50"
              onError={(e) => e.target.style.display = 'none'}
            />
          </div>
        )}
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medieval font-bold text-amber-900 text-center mb-2">
          {npc.name}
        </h2>
        <p className="text-center text-gray-700 text-base sm:text-lg font-medieval">
          {npc.race} {npc.class} - Nível {npc.level}
        </p>
        <p className="text-center text-gray-600 italic text-sm sm:text-base">
          {npc.background} • {npc.alignment}
        </p>
      </div>

      {/* Informações Básicas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <InfoBox label="Idade" value={`${npc.age} anos`} />
        <InfoBox label="Gênero" value={npc.gender} />
        <InfoBox label="Tamanho" value={npc.size} />
        <InfoBox label="Velocidade" value={`${npc.speed} pés`} />
      </div>

      {/* Atributos */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-medieval font-bold text-amber-900 mb-2 sm:mb-3 border-b-2 border-amber-700 pb-2">
          Atributos
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
          <AbilityScore name="FOR" value={npc.abilities.str} modifier={npc.modifiers.str} />
          <AbilityScore name="DES" value={npc.abilities.dex} modifier={npc.modifiers.dex} />
          <AbilityScore name="CON" value={npc.abilities.con} modifier={npc.modifiers.con} />
          <AbilityScore name="INT" value={npc.abilities.int} modifier={npc.modifiers.int} />
          <AbilityScore name="SAB" value={npc.abilities.wis} modifier={npc.modifiers.wis} />
          <AbilityScore name="CAR" value={npc.abilities.cha} modifier={npc.modifiers.cha} />
        </div>
      </div>

      {/* Combate */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <CombatStat label="Pontos de Vida" value={`${npc.hp}/${npc.maxHp}`} icon="❤️" />
        <CombatStat label="Classe de Armadura" value={npc.ac} icon="🛡️" />
        <CombatStat label="Bônus de Proficiência" value={`+${npc.proficiencyBonus}`} icon="⭐" />
      </div>

      {/* Características */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-medieval font-bold text-amber-900 mb-2 sm:mb-3 border-b-2 border-amber-700 pb-2">
          Características
        </h3>
        <div className="space-y-2 sm:space-y-3">
          <FeatureBox label="Traços Raciais" items={npc.racialTraits} />
          <FeatureBox label="Perícias" items={npc.skills} />
        </div>
      </div>

      {/* Magias (se houver) */}
      {npc.spells && npc.spells.length > 0 && (
        <div className="mb-4 sm:mb-6">
          <h3 className="text-xl sm:text-2xl font-medieval font-bold text-amber-900 mb-2 sm:mb-3 border-b-2 border-amber-700 pb-2">
            ✨ Grimoire de Magias
          </h3>
          <div className="grid grid-cols-1 gap-2.5">
            {npc.spells.map((spell, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-700 rounded-lg p-3 sm:p-4 shadow-md">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm sm:text-base font-bold text-purple-900 flex-1">{spell.name}</p>
                  <div className="flex gap-2 flex-shrink-0">
                    <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded font-semibold shadow">
                      Nível {spell.level}
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-purple-700 italic mb-1">🔮 {spell.school}</p>
                {spell.description && (
                  <p className="text-xs text-purple-600 leading-relaxed mt-2 border-t border-purple-300 pt-2">{spell.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Equipamento Detalhado (se houver) */}
      {npc.equipment && npc.equipment.length > 0 && (
        <div className="mb-4 sm:mb-6">
          <h3 className="text-xl sm:text-2xl font-medieval font-bold text-amber-900 mb-2 sm:mb-3 border-b-2 border-amber-700 pb-2">
            ⚔️ Arsenal & Equipamento
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {npc.equipment.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-700 rounded-lg p-3 sm:p-4 shadow-md">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm sm:text-base font-bold text-green-900">{item.name}</p>
                  {item.quantity > 1 && (
                    <span className="text-xs bg-green-600 text-white px-2.5 py-1 rounded-full font-semibold shadow">
                      x{item.quantity}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-green-700 font-semibold">🎯 {item.type}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Traits Raciais Detalhados (se houver) */}
      {npc.racialTraitsDetailed && npc.racialTraitsDetailed.length > 0 && (
        <div className="mb-4 sm:mb-6">
          <h3 className="text-xl sm:text-2xl font-medieval font-bold text-amber-900 mb-2 sm:mb-3 border-b-2 border-amber-700 pb-2">
            🧬 Herança Racial (D&D 5e Oficial)
          </h3>
          <div className="space-y-2.5">
            {npc.racialTraitsDetailed.map((trait, index) => (
              <div key={index} className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-700 rounded-r-lg p-3 sm:p-4 shadow-md">
                <p className="text-sm sm:text-base font-bold text-orange-900 mb-2 flex items-center gap-2">
                  ✨ {trait.name}
                </p>
                <p className="text-xs sm:text-sm text-orange-700 leading-relaxed">{trait.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Proficiências (se houver) */}
      {npc.proficiencies && (
        <div className="mb-4 sm:mb-6">
          <h3 className="text-xl sm:text-2xl font-medieval font-bold text-amber-900 mb-2 sm:mb-3 border-b-2 border-amber-700 pb-2">
            🎯 Proficiências da Classe
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {npc.proficiencies.saves?.length > 0 && (
              <div className="bg-red-50 border-2 border-red-700 rounded-lg p-3 sm:p-4">
                <p className="text-sm sm:text-base font-bold text-red-900 mb-2">❤️ Testes de Resistência:</p>
                <p className="text-xs sm:text-sm text-red-700 leading-relaxed">{npc.proficiencies.saves.join(', ')}</p>
              </div>
            )}
            {npc.proficiencies.weapons?.length > 0 && (
              <div className="bg-yellow-50 border-2 border-yellow-700 rounded-lg p-3 sm:p-4">
                <p className="text-sm sm:text-base font-bold text-yellow-900 mb-2">⚔️ Armas:</p>
                <p className="text-xs sm:text-sm text-yellow-700 leading-relaxed">{npc.proficiencies.weapons.join(', ')}</p>
              </div>
            )}
            {npc.proficiencies.armor?.length > 0 && (
              <div className="bg-blue-50 border-2 border-blue-700 rounded-lg p-3 sm:p-4">
                <p className="text-sm sm:text-base font-bold text-blue-900 mb-2">🛡️ Armaduras:</p>
                <p className="text-xs sm:text-sm text-blue-700 leading-relaxed">{npc.proficiencies.armor.join(', ')}</p>
              </div>
            )}
            {npc.proficiencies.skills?.length > 0 && (
              <div className="bg-green-50 border-2 border-green-700 rounded-lg p-3 sm:p-4">
                <p className="text-sm sm:text-base font-bold text-green-900 mb-2">🎯 Perícias Disponíveis:</p>
                <p className="text-xs sm:text-sm text-green-700 leading-relaxed">{npc.proficiencies.skills.join(', ')}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Personalidade */}
      <div>
        <h3 className="text-xl sm:text-2xl font-medieval font-bold text-amber-900 mb-2 sm:mb-3 border-b-2 border-amber-700 pb-2">
          Personalidade
        </h3>
        <div className="space-y-2">
          <PersonalityTrait label="Traço" value={npc.personality.trait} />
          <PersonalityTrait label="Ideal" value={npc.personality.ideal} />
          <PersonalityTrait label="Vínculo" value={npc.personality.bond} />
          <PersonalityTrait label="Defeito" value={npc.personality.flaw} />
        </div>
      </div>
    </div>
  );
};

// Componentes auxiliares
const InfoBox = ({ label, value }) => (
  <div className="bg-amber-100 border-2 border-amber-700 rounded p-3 text-center">
    <p className="text-xs sm:text-sm text-gray-600 font-semibold mb-1">{label}</p>
    <p className="text-base sm:text-lg font-bold text-amber-900 font-medieval">{value}</p>
  </div>
);

const AbilityScore = ({ name, value, modifier }) => (
  <div className="bg-amber-200 border-3 border-amber-800 rounded-lg p-3 sm:p-4 text-center shadow-md">
    <p className="text-xs sm:text-sm font-bold text-amber-900 mb-1">{name}</p>
    <p className="text-2xl sm:text-3xl font-bold text-amber-950 font-medieval">{value}</p>
    <p className="text-sm font-semibold text-gray-700 mt-1 font-medieval">{formatModifier(modifier)}</p>
  </div>
);

const CombatStat = ({ label, value, icon }) => (
  <div className="bg-red-50 border-2 border-red-800 rounded-lg p-4 sm:p-5 text-center">
    <div className="text-3xl sm:text-4xl mb-2">{icon}</div>
    <p className="text-xs sm:text-sm text-gray-600 font-semibold mb-1.5">{label}</p>
    <p className="text-2xl sm:text-3xl font-bold text-red-900 font-medieval">{value}</p>
  </div>
);

const FeatureBox = ({ label, items }) => (
  <div className="bg-blue-50 border-2 border-blue-700 rounded-lg p-3.5 sm:p-4">
    <p className="text-sm sm:text-base font-bold text-blue-900 mb-2">{label}:</p>
    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{items.join(', ')}</p>
  </div>
);

const PersonalityTrait = ({ label, value }) => (
  <div className="bg-purple-50 border-l-4 border-purple-700 p-3.5 sm:p-4">
    <p className="text-sm sm:text-base font-bold text-purple-900 mb-1.5">{label}:</p>
    <p className="text-sm sm:text-base text-gray-700 italic leading-relaxed">{value}</p>
  </div>
);

export default NPCCard;
