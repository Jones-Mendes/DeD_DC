import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GeneratorForm from './components/GeneratorForm';
import NPCCard from './components/NPCCard';
import NPCActions from './components/NPCActions';
import SavedNPCsList from './components/SavedNPCsList';
import { generateNPC, saveNPC } from './utils/npcGenerator';
import { enrichNPCData } from './utils/dnd5eAPI';

function App() {
  const [currentNPC, setCurrentNPC] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (options) => {
    setLoading(true);
    const npc = generateNPC(options);
    
    // Enriquecer com dados da API D&D 5e
    const enrichedNPC = await enrichNPCData(npc);
    
    setCurrentNPC(enrichedNPC);
    setHistory([enrichedNPC, ...history.slice(0, 9)]); // Mantém últimos 10
    setLoading(false);
  };

  const handleSave = (npc) => {
    saveNPC(npc);
    alert('✅ NPC salvo com sucesso!');
  };

  const handleLoadNPC = (npc) => {
    setCurrentNPC(npc);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen py-4 sm:py-6 md:py-8 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho */}
        <header className="text-center mb-4 sm:mb-6 md:mb-8">
          <h1 className="animate-flicker animate-glow text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medieval font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 mb-2 sm:mb-3 md:mb-4 px-2 leading-tight py-2">
            <span className="block md:hidden">🔥Gerador de NPCs D&D🔥</span>
            <span className="hidden md:inline">🔥Gerador de NPCs D&D🔥</span>
          </h1>
          <p className="text-amber-200 text-sm sm:text-base md:text-lg lg:text-xl px-3 sm:px-4 leading-relaxed">
            Crie personagens não-jogadores únicos para suas aventuras!
          </p>
        </header>

        {/* Lista de NPCs Salvos */}
        <SavedNPCsList onLoadNPC={handleLoadNPC} />

        {/* Formulário de Geração */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <GeneratorForm onGenerate={handleGenerate} loading={loading} />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
            <p className="text-amber-400 mt-4 font-medieval">Invocando magia arcana...</p>
          </div>
        )}

        {/* NPC Atual */}
        <AnimatePresence mode="wait">
          {currentNPC && (
            <motion.div
              key={currentNPC.id}
              initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            >
              <NPCActions 
                npc={currentNPC} 
                onSave={handleSave}
              />
              <NPCCard npc={currentNPC} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Histórico */}
        {history.length > 1 && (
          <div className="mt-4 sm:mt-6 md:mt-8">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full md:w-auto mx-auto block px-5 sm:px-6 py-3 sm:py-3.5 min-h-[48px] bg-stone-700 hover:bg-stone-600 active:bg-stone-800 active:scale-95 text-amber-300 font-semibold rounded-lg transition-all mb-3 sm:mb-4 text-sm sm:text-base touch-manipulation"
            >
              {showHistory ? '▲ Ocultar' : '▼ Mostrar'} Histórico desta Sessão ({history.length - 1} NPCs)
            </button>

            <AnimatePresence>
              {showHistory && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 overflow-hidden"
                >
                  {history.slice(1).map((npc, index) => (
                    <motion.div
                      key={npc.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      onClick={() => setCurrentNPC(npc)}
                      whileHover={{ scale: 1.05, rotateY: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-stone-800 rounded-lg p-4 sm:p-5 border-2 border-amber-700 cursor-pointer hover:bg-stone-700 transition-colors min-h-[100px] touch-manipulation"
                    >
                      <h3 className="font-bold text-base sm:text-lg text-amber-400 mb-1.5">{npc.name}</h3>
                      <p className="text-sm sm:text-base text-amber-200 leading-relaxed">
                        {npc.race} {npc.class} - Nível {npc.level}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">Toque para visualizar</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Rodapé */}
        <footer className="text-center mt-8 sm:mt-10 md:mt-12 text-amber-300 text-xs sm:text-sm px-3 sm:px-4 pb-4 sm:pb-6">
          <p className="leading-relaxed">⚔️ Feito com magia arcana para mestres e jogadores de D&D ⚔️</p>
          <p className="mt-2 text-gray-400 leading-relaxed">
            Baseado nas regras do Dungeons & Dragons 5ª Edição
          </p>
          <div className="mt-3 sm:mt-4 border-t border-amber-800/30 pt-3 sm:pt-4">
            <p className="text-gray-400 leading-relaxed flex items-center justify-center gap-2 flex-wrap">
              © 2026 - Desenvolvido por 
              <span className="text-amber-400 font-semibold font-medieval inline-flex items-center gap-1.5">
                Jones-Mendes
                <a 
                  href="https://github.com/Jones-Mendes" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-700/20 hover:bg-amber-600/40 border border-amber-600/40 hover:border-amber-500 transition-all hover:scale-110 active:scale-95"
                  aria-label="GitHub Profile"
                >
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current text-amber-400" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
              </span>
            </p>
            <p className="text-gray-500 text-[10px] sm:text-xs mt-1.5 leading-relaxed">
              Powered by React + Vite + Framer Motion
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
