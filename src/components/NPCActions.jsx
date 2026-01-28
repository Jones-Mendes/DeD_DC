import { exportNPCAsText, exportNPCAsPDF } from '../utils/npcGenerator';

const NPCActions = ({ npc, onSave, onExport }) => {
  if (!npc) return null;

  const handleSave = () => {
    onSave(npc);
  };

  const handleExportPDF = async () => {
    try {
      await exportNPCAsPDF(npc);
      if (onExport) onExport();
    } catch (error) {
      alert('Erro ao gerar PDF. Tente novamente.');
    }
  };

  const handleExportText = () => {
    const text = exportNPCAsText(npc);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${npc.name.replace(/\s+/g, '_')}_NPC.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    if (onExport) onExport();
  };

  const handleCopyToClipboard = () => {
    const text = exportNPCAsText(npc);
    navigator.clipboard.writeText(text).then(() => {
      alert('NPC copiado para a área de transferência!');
    }).catch(() => {
      alert('Erro ao copiar para área de transferência.');
    });
  };

  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5 sm:gap-3 justify-center my-4 sm:my-6">
      <button
        onClick={handleSave}
        className="px-4 sm:px-6 py-3 sm:py-3.5 min-h-[48px] bg-green-600 hover:bg-green-500 active:bg-green-700 active:scale-95 text-white font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base touch-manipulation"
      >
        💾 <span className="hidden sm:inline">Salvar</span><span className="sm:hidden">Salvar</span>
      </button>
      <button
        onClick={handleExportPDF}
        className="px-4 sm:px-6 py-3 sm:py-3.5 min-h-[48px] bg-red-600 hover:bg-red-500 active:bg-red-700 active:scale-95 text-white font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base touch-manipulation"
      >
        📘 <span className="hidden sm:inline">PDF</span><span className="sm:hidden">PDF</span>
      </button>
      <button
        onClick={handleExportText}
        className="px-4 sm:px-6 py-3 sm:py-3.5 min-h-[48px] bg-blue-600 hover:bg-blue-500 active:bg-blue-700 active:scale-95 text-white font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base touch-manipulation"
      >
        📄 <span className="hidden sm:inline">TXT</span><span className="sm:hidden">TXT</span>
      </button>
      <button
        onClick={handleCopyToClipboard}
        className="px-4 sm:px-6 py-3 sm:py-3.5 min-h-[48px] bg-purple-600 hover:bg-purple-500 active:bg-purple-700 active:scale-95 text-white font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base touch-manipulation"
      >
        📋 <span className="hidden sm:inline">Copiar</span><span className="sm:hidden">Copiar</span>
      </button>
    </div>
  );
};

export default NPCActions;
