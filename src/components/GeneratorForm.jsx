import { useState } from 'react';
import { races, classes, backgrounds } from '../data/dndData';

const GeneratorForm = ({ onGenerate, loading }) => {
  const [options, setOptions] = useState({
    level: 1,
    method: 'roll',
    specificRace: null,
    specificClass: null,
    specificBackground: null,
    gender: null
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(options);
  };

  const handleReset = () => {
    setOptions({
      level: 1,
      method: 'roll',
      specificRace: null,
      specificClass: null,
      specificBackground: null,
      gender: null
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-stone-800 to-stone-900 rounded-lg shadow-xl p-4 sm:p-5 md:p-6 border-2 border-amber-700 shadow-[0_0_20px_rgba(251,146,60,0.4),0_0_40px_rgba(234,88,12,0.3),0_0_60px_rgba(194,65,12,0.2)] sm:shadow-[0_0_25px_rgba(251,146,60,0.4),0_0_50px_rgba(234,88,12,0.3),0_0_75px_rgba(194,65,12,0.2)] md:shadow-[0_0_30px_rgba(251,146,60,0.4),0_0_60px_rgba(234,88,12,0.3),0_0_90px_rgba(194,65,12,0.2)] active:shadow-[0_0_25px_rgba(251,146,60,0.5),0_0_50px_rgba(234,88,12,0.4),0_0_75px_rgba(194,65,12,0.3)] hover:shadow-[0_0_40px_rgba(251,146,60,0.5),0_0_80px_rgba(234,88,12,0.4),0_0_120px_rgba(194,65,12,0.3)] transition-shadow duration-300">
      <h2 className="text-xl sm:text-2xl font-medieval font-bold text-amber-400 mb-4 sm:mb-5 text-center drop-shadow-[0_0_6px_rgba(251,191,36,0.8)] sm:drop-shadow-[0_0_8px_rgba(251,191,36,0.8)] md:drop-shadow-[0_0_10px_rgba(251,191,36,0.9)]">
        ⚔️ Configurações do Gerador ⚔️
      </h2>

      {/* Nível */}
      <div className="mb-4 sm:mb-5">
        <label className="block text-amber-200 font-semibold mb-2.5 text-sm sm:text-base">
          Nível do Personagem
        </label>
        <div className="flex gap-2.5">
          <input
            type="number"
            min="1"
            max="20"
            value={options.level}
            readOnly
            className="flex-1 px-4 py-3 sm:py-4 min-h-[48px] sm:min-h-[56px] bg-gradient-to-br from-amber-900/30 to-stone-800/50 text-amber-400 text-2xl sm:text-3xl md:text-4xl font-bold rounded-lg border-2 border-amber-600/60 shadow-[inset_0_2px_8px_rgba(0,0,0,0.3),0_0_15px_rgba(251,146,60,0.3)] focus:border-amber-400 focus:shadow-[inset_0_2px_8px_rgba(0,0,0,0.3),0_0_25px_rgba(251,146,60,0.5)] focus:outline-none cursor-default font-medieval text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none transition-all duration-200"
          />
          <div className="flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() => setOptions({ ...options, level: Math.min(20, options.level + 1) })}
              className="px-3.5 py-2 min-h-[48px] min-w-[48px] bg-gradient-to-b from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 active:from-amber-600 active:to-amber-800 active:scale-95 text-stone-900 font-bold rounded border-2 border-amber-800 shadow-md transition-all touch-manipulation"
            >
              ▲
            </button>
            <button
              type="button"
              onClick={() => setOptions({ ...options, level: Math.max(1, options.level - 1) })}
              className="px-3.5 py-2 min-h-[48px] min-w-[48px] bg-gradient-to-b from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 active:from-amber-800 active:to-amber-950 active:scale-95 text-amber-100 font-bold rounded border-2 border-amber-800 shadow-md transition-all touch-manipulation"
            >
              ▼
            </button>
          </div>
        </div>
      </div>

      {/* Método de Geração de Atributos */}
      <div className="mb-4 sm:mb-5">
        <label className="block text-amber-200 font-semibold mb-2.5 text-sm sm:text-base">
          Método de Atributos
        </label>
        <select
          value={options.method}
          onChange={(e) => setOptions({ ...options, method: e.target.value })}
          className="w-full px-4 py-3 sm:py-4 min-h-[48px] sm:min-h-[56px] bg-gradient-to-br from-amber-900/30 to-stone-800/50 text-amber-400 text-base sm:text-lg md:text-xl font-semibold rounded-lg border-2 border-amber-600/60 shadow-[inset_0_2px_8px_rgba(0,0,0,0.3),0_0_15px_rgba(251,146,60,0.3)] focus:border-amber-400 focus:shadow-[inset_0_2px_8px_rgba(0,0,0,0.3),0_0_25px_rgba(251,146,60,0.5)] focus:outline-none font-medieval text-center touch-manipulation transition-all duration-200"
        >
          <option value="roll" className="bg-stone-800 text-amber-400">Rolagem (4d6, descartar o menor)</option>
          <option value="standard" className="bg-stone-800 text-amber-400">Matriz Padrão (15, 14, 13, 12, 10, 8)</option>
        </select>
      </div>

      {/* Botão para mostrar opções avançadas */}
      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="w-full mb-4 sm:mb-5 px-4 py-3 min-h-[48px] bg-stone-600 hover:bg-stone-500 active:bg-stone-700 active:scale-95 text-amber-300 rounded font-semibold transition-all text-sm sm:text-base touch-manipulation"
      >
        {showAdvanced ? '▲ Ocultar' : '▼ Mostrar'} Opções Avançadas
      </button>

      {/* Opções Avançadas */}
      {showAdvanced && (
        <div className="space-y-4 mb-4 sm:mb-5 p-4 sm:p-5 bg-stone-950 bg-opacity-50 rounded border border-amber-800">
          {/* Gênero */}
          <div>
            <label className="block text-amber-200 font-semibold mb-2.5 text-sm sm:text-base">
              Gênero
            </label>
            <select
              value={options.gender || ''}
              onChange={(e) => setOptions({ ...options, gender: e.target.value || null })}
              className="w-full px-4 py-3 min-h-[48px] bg-stone-700 text-white text-base rounded border-2 border-amber-600 focus:border-amber-400 focus:outline-none touch-manipulation"
            >
              <option value="">Aleatório</option>
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
            </select>
          </div>

          {/* Raça Específica */}
          <div>
            <label className="block text-amber-200 font-semibold mb-2.5 text-sm sm:text-base">
              Raça Específica
            </label>
            <select
              value={options.specificRace?.name || ''}
              onChange={(e) => {
                const race = races.find(r => r.name === e.target.value);
                setOptions({ ...options, specificRace: race || null });
              }}
              className="w-full px-4 py-3 min-h-[48px] bg-stone-700 text-white text-base rounded border-2 border-amber-600 focus:border-amber-400 focus:outline-none touch-manipulation"
            >
              <option value="">Aleatório</option>
              {races.map(race => (
                <option key={race.name} value={race.name}>{race.name}</option>
              ))}
            </select>
          </div>

          {/* Classe Específica */}
          <div>
            <label className="block text-amber-200 font-semibold mb-2.5 text-sm sm:text-base">
              Classe Específica
            </label>
            <select
              value={options.specificClass?.name || ''}
              onChange={(e) => {
                const cls = classes.find(c => c.name === e.target.value);
                setOptions({ ...options, specificClass: cls || null });
              }}
              className="w-full px-4 py-3 min-h-[48px] bg-stone-700 text-white text-base rounded border-2 border-amber-600 focus:border-amber-400 focus:outline-none touch-manipulation"
            >
              <option value="">Aleatório</option>
              {classes.map(cls => (
                <option key={cls.name} value={cls.name}>{cls.name}</option>
              ))}
            </select>
          </div>

          {/* Background Específico */}
          <div>
            <label className="block text-amber-200 font-semibold mb-2.5 text-sm sm:text-base">
              Background Específico
            </label>
            <select
              value={options.specificBackground?.name || ''}
              onChange={(e) => {
                const bg = backgrounds.find(b => b.name === e.target.value);
                setOptions({ ...options, specificBackground: bg || null });
              }}
              className="w-full px-4 py-3 min-h-[48px] bg-stone-700 text-white text-base rounded border-2 border-amber-600 focus:border-amber-400 focus:outline-none touch-manipulation"
            >
              <option value="">Aleatório</option>
              {backgrounds.map(bg => (
                <option key={bg.name} value={bg.name}>{bg.name}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Botões */}
      <div className="flex gap-2.5 sm:gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-5 sm:px-6 py-3.5 sm:py-4 min-h-[52px] bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 active:from-amber-700 active:to-yellow-700 active:scale-95 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all text-base sm:text-lg touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? '⏳ Gerando...' : '🎲 Gerar NPC'}
        </button>
        <button
          type="button"
          onClick={handleReset}
          disabled={loading}
          className="px-5 sm:px-6 py-3.5 sm:py-4 min-h-[52px] bg-stone-600 hover:bg-stone-500 active:bg-stone-700 active:scale-95 text-white font-semibold rounded-lg transition-all text-base sm:text-lg touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🔄 Limpar
        </button>
      </div>
    </form>
  );
};

export default GeneratorForm;
