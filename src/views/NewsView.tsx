import React, { useState } from 'react';
import { FileText, Bot, Upload, Wand2, Newspaper, CheckCircle2, Clock } from 'lucide-react';

export function NewsView() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  // Symulacja wywołania modelu
  const handleGenerateAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
    }, 2000); // 2 sekundy symulacji "myślenia" AI
  };

  return (
    <div className="space-y-6">
      {/* Nagłówek */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Generator Relacji AI</h2>
        <p className="text-sm text-gray-500 mt-1">
          Automatyczne tworzenie emocjonujących artykułów na podstawie pomeczowych protokołów sędziowskich.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kolumna boczna - Protokół Sędziowski (Wejście) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-gray-500 mr-2" />
                <h3 className="font-semibold text-gray-800">Protokół Sędziego</h3>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-medium">Zatwierdzony</span>
            </div>
            
            <div className="p-5 space-y-4">
              {/* Surowe dane z meczu */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm">
                <p className="font-bold text-gray-900 mb-2">Mecz: FC Orły 3:1 Sparta Wwa</p>
                <ul className="space-y-1 text-gray-600">
                  <li><span className="font-medium text-gray-800">12'</span> Gol - Jan Kowalski (Orły)</li>
                  <li><span className="font-medium text-gray-800">45'</span> Żółta kartka - M. Nowak (Sparta)</li>
                  <li><span className="font-medium text-gray-800">60'</span> Gol - Piotr Wiśniewski (Orły)</li>
                  <li><span className="font-medium text-gray-800">75'</span> Gol - A. Lewandowski (Sparta)</li>
                  <li><span className="font-medium text-gray-800">89'</span> Gol - Jan Kowalski (Orły)</li>
                </ul>
              </div>

              <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center cursor-not-allowed bg-gray-50/50">
                <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-xs text-gray-500">W przyszłości: upload skanu lub pliku JSON z aplikacji sędziego</p>
              </div>

              <button 
                onClick={handleGenerateAI}
                disabled={isGenerating || hasGenerated}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <span className="flex items-center">
                    <Bot className="w-4 h-4 mr-2 animate-bounce" /> Analiza danych LLM...
                  </span>
                ) : hasGenerated ? (
                  <span className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Wygenerowano
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Wand2 className="w-4 h-4 mr-2" /> Generuj Artykuł AI
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Główna kolumna - Wygenerowany Artykuł (Wyjście) */}
        <div className="lg:col-span-2">
          {hasGenerated ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="border-b border-gray-100">
                <div className="h-48 bg-gradient-to-r from-blue-900 to-indigo-800 flex items-center justify-center relative overflow-hidden">
                  <Newspaper className="w-24 h-24 text-white/10 absolute -right-4 -bottom-4" />
                  <h1 className="text-2xl font-bold text-white max-w-lg text-center leading-snug px-6 relative z-10">
                    Dublet Kowalskiego pogrąża Spartę! FC Orły dominują w derbach kolejki
                  </h1>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <Bot className="w-4 h-4 mr-2 text-blue-500" />
                  <span>Wygenerowane przez League Manager</span>
                  <span className="mx-2">•</span>
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Przed chwilą</span>
                </div>

                <div className="prose prose-blue max-w-none text-gray-700 space-y-4 leading-relaxed">
                  <p>
                    To był wieczór, który kibice <strong>FC Orłów</strong> zapamiętają na długo. W szlagierowym starciu tej kolejki gospodarze pokonali <strong>Spartę Wwa 3:1</strong>, potwierdzając swoje mistrzowskie aspiracje. Zdecydowanym bohaterem spotkania został Jan Kowalski, który dwukrotnie wpisał się na listę strzelców.
                  </p>
                  <p>
                    Mecz rozpoczął się od mocnego uderzenia. Już w 12. minucie Kowalski znalazł lukę w obronie rywali i precyzyjnym strzałem otworzył wynik spotkania. Sparta próbowała odpowiedzieć, ale ich ataki kończyły się na dobrze zorganizowanej defensywie. Sfrustrowani goście przed przerwą obejrzeli żółtą kartkę, którą ukarany został M. Nowak.
                  </p>
                  <p>
                    Druga połowa przyniosła jeszcze więcej emocji. W 60. minucie prowadzenie podwyższył Piotr Wiśniewski. Nadzieja dla Sparty zaświtała kwadrans przed końcem, gdy kontaktową bramkę zdobył A. Lewandowski. Goście rzucili się do ataku, ale ostatnie słowo należało do gospodarzy. W 89. minucie Kowalski skompletował dublet, ustalając ostateczny wynik spotkania i pieczętując triumf FC Orłów.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex gap-2">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">#Derby</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">#FCOrły</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">#LigaZimowa</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center p-12 text-center text-gray-400 min-h-[400px]">
              <Newspaper className="w-16 h-16 mb-4 text-gray-300" />
              <p className="text-lg font-medium text-gray-600">Gotowy do stworzenia relacji</p>
              <p className="text-sm mt-2 max-w-md">
                Moduł sztucznej inteligencji czeka na dane. Zatwierdź protokół sędziowski, aby automatycznie napisać artykuł podsumowujący to spotkanie.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}