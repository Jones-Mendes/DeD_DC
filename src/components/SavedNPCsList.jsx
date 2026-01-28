import { useState } from 'react';
import { getSavedNPCs, deleteNPC } from '../utils/npcGenerator';

const SavedNPCsList = ({ onLoadNPC }) => {
  const [savedNPCs, setSavedNPCs] = useState(getSavedNPCs());
  const [showList, setShowList] = useState(false);

  const refreshList = () => {
    setSavedNPCs(getSavedNPCs());
  };

  const handleDelete = (npcId) => {
    if (confirm('Tem certeza que deseja deletar este NPC?')) {
      deleteNPC(npcId);
      refreshList();
    }
  };

  const handleLoad = (npc) => {
    onLoadNPC(npc);
    setShowList(false);
  };

  if (!showList) {
    return (
      <div className="text-center mb-4 sm:mb-6">
        <button
          onClick={() => {
            refreshList();
            setShowList(true);
          }}
          className="px-6 sm:px-8 py-3.5 sm:py-4 min-h-[52px] bg-amber-700 hover:bg-amber-600 active:bg-amber-800 active:scale-95 text-white font-semibold rounded-lg shadow-md transition-all text-base sm:text-lg touch-manipulation font-medieval"
        >
          📚 Ver NPCs Salvos ({savedNPCs.length})
        </button>
      </div>
    );
  }

  return (
    <div className="mb-4 sm:mb-6 bg-stone-800 rounded-lg shadow-xl p-4 sm:p-5 md:p-6 border-2 border-amber-700">
      <div className="flex justify-between items-center mb-4 sm:mb-5 gap-3">
        <h2 className="text-xl sm:text-2xl font-medieval font-bold text-amber-400 text-center sm:text-left flex-1 sm:flex-none">
          NPCs Salvos ({savedNPCs.length})
        </h2>
        <button
          onClick={() => setShowList(false)}
          className="px-4 sm:px-5 py-2.5 sm:py-3 min-h-[44px] bg-stone-600 hover:bg-stone-500 active:bg-stone-700 active:scale-95 text-white rounded transition-all text-sm sm:text-base touch-manipulation"
        >
          ✕ Fechar
        </button>
      </div>

      {savedNPCs.length === 0 ? (
        <p className="text-amber-200 text-center py-6 sm:py-8 text-sm sm:text-base leading-relaxed">
          Nenhum NPC salvo ainda. Gere e salve alguns NPCs!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {savedNPCs.map(npc => (
            <div
              key={npc.id}
              className="bg-amber-50 rounded-lg p-4 sm:p-5 border-2 border-amber-800 hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold text-base sm:text-lg text-amber-900 mb-1.5 font-medieval">{npc.name}</h3>
              <p className="text-sm sm:text-base text-gray-700 mb-2 leading-relaxed font-medieval">
                {npc.race} {npc.class} - Nível {npc.level}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mb-4 italic">{npc.background}</p>
              <div className="flex gap-2.5">
                <button
                  onClick={() => handleLoad(npc)}
                  className="flex-1 px-4 py-3 min-h-[48px] bg-blue-600 hover:bg-blue-500 active:bg-blue-700 active:scale-95 text-white text-sm sm:text-base font-semibold rounded transition-all touch-manipulation"
                >
                  📖 Carregar
                </button>
                <button
                  onClick={() => handleDelete(npc.id)}
                  className="px-4 py-3 min-h-[48px] min-w-[48px] bg-red-600 hover:bg-red-500 active:bg-red-700 active:scale-95 text-white text-sm sm:text-base font-semibold rounded transition-all touch-manipulation"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedNPCsList;
