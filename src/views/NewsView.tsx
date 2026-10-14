import React, { useState } from 'react';
import { FileText, Bot, Wand2, Newspaper, CheckCircle2, Clock, UserCheck, Edit3, Save, X } from 'lucide-react';

export function NewsView() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(true); 

  const [refereeNotes, setRefereeNotes] = useState<string>(
    'Jan Kowalski – gol z 25 metrów, potężne uderzenie z prawej nogi w samo okienko bramki. M. Nowak (Sparta) – czerwona kartka za ostry wejście w kolano (ostatni obrońca).'
  );

  const [generatedArticle, setGeneratedArticle] = useState<{
    title: string;
    body: string[];
  }>({
    title: 'Dublet Kowalskiego i czerwiec w końcówce! FC Orły wygrywają hit kolejki',
    body: [
      'To był wieczór, który kibice FC Orłów zapamiętają na długo. W szlagierowym starciu tej kolejki gospodarze pokonali Spartę Wwa 3:1, potwierdzając swoje mistrzowskie aspiracje. Zdecydowanym bohaterem spotkania został Jan Kowalski, który nie tylko strzelał kluczowe bramki, ale popisał się prawdziwym strzeleckim kunsztem.',
      'Mecz od początku trzymał w napięciu. Jak zanotował w protokole sędzi główny Szymon M., kluczowy moment nadszedł w 12. minucie, kiedy to Jan Kowalski popisał się kapitalnym uderzeniem z 25 metrów – posyłając piłkę z prawej nogi w samo okienko bramki Sparty i wprawiając w zachwyt zgromadzoną publiczność.',
      'Sparta próbowała odwrócić losy spotkania, jednak ich defensywa gubiła szyki pod presją gospodarzy. Sytuację gości skomplikowała czerwona kartka, którą arbiter ukarał M. Nowaka za ratunkowy, ostry faul wślizgiem w kolano jako ostatni obrońca. Grając w osłabieniu, Sparta nie zdołała odrobić strat, a Orły przypieczętowały triumf w końcówce.'
    ]
  });

  const [isEditingArticle, setIsEditingArticle] = useState(false);
  const [editTitle, setEditTitle] = useState(generatedArticle.title);
  const [editBody, setEditBody] = useState<string[]>([...generatedArticle.body]);

  const handleGenerateAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
      setIsEditingArticle(false);
    }, 2000);
  };

  const startEditing = () => {
    setEditTitle(generatedArticle.title);
    setEditBody([...generatedArticle.body]);
    setIsEditingArticle(true);
  };

  const saveEditedArticle = () => {
    setGeneratedArticle({
      title: editTitle,
      body: editBody,
    });
    setIsEditingArticle(false);
  };

  const cancelEditing = () => {
    setIsEditingArticle(false);
  };

  const handleBodyChange = (index: number, value: string) => {
    const updated = [...editBody];
    updated[index] = value;
    setEditBody(updated);
  };

  return (
    <div className="space-y-6">
      {/* Nagłówek */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Generator Relacji AI</h2>
        <p className="text-sm text-gray-500 mt-1">
          Automatyczne tworzenie artykułów na podstawie protokołu oraz dodatkowych notatek sędziowskich z opcją korekty redakcyjnej.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-gray-500 mr-2" />
                <h3 className="font-semibold text-gray-800">Protokół Meczowy</h3>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-medium">Zatwierdzony</span>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="flex items-center space-x-3 bg-indigo-50/60 p-3 rounded-lg border border-indigo-100">
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                  SM
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 flex items-center">
                    <UserCheck className="w-3.5 h-3.5 text-indigo-600 mr-1" />
                    Sędzia: Szymon M.
                  </p>
                  <p className="text-[11px] text-gray-500">Licencja: PRO (FIFA)</p>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-xs space-y-1.5">
                <p className="font-bold text-gray-900">Mecz: FC Orły 3:1 Sparta Wwa</p>
                <p className="text-gray-600"><strong>12'</strong> Gol - J. Kowalski (Orły)</p>
                <p className="text-gray-600"><strong>45'</strong> Ż. Kartka - M. Nowak (Sparta)</p>
                <p className="text-gray-600"><strong>60'</strong> Gol - P. Wiśniewski (Orły)</p>
                <p className="text-gray-600"><strong>78'</strong> Czerwona kartka - M. Nowak (Sparta)</p>
                <p className="text-gray-600"><strong>89'</strong> Gol - J. Kowalski (Orły)</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center">
                  <Edit3 className="w-3.5 h-3.5 mr-1 text-blue-600" />
                  Notatki sędziego do tekstu AI:
                </label>
                <textarea
                  rows={4}
                  value={refereeNotes}
                  onChange={(e) => setRefereeNotes(e.target.value)}
                  placeholder="Wpisz szczegóły o golach, faulach..."
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed"
                />
              </div>

              <button 
                onClick={handleGenerateAI}
                disabled={isGenerating}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 cursor-pointer text-sm"
              >
                {isGenerating ? (
                  <span className="flex items-center">
                    <Bot className="w-4 h-4 mr-2 animate-bounce" /> Analiza LLM i stylizacja...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Wand2 className="w-4 h-4 mr-2" /> Generuj Artykuł AI Ponownie
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {hasGenerated ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="border-b border-gray-100">
                <div className="h-44 bg-gradient-to-r from-blue-900 to-indigo-800 flex items-center justify-center relative overflow-hidden px-6">
                  <Newspaper className="w-24 h-24 text-white/10 absolute -right-4 -bottom-4" />
                  
                  {!isEditingArticle ? (
                    <h1 className="text-xl sm:text-2xl font-bold text-white max-w-lg text-center leading-snug relative z-10">
                      {generatedArticle.title}
                    </h1>
                  ) : (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full max-w-lg bg-white/10 text-white border border-white/30 rounded-lg px-3 py-2 text-lg font-bold text-center outline-none relative z-10"
                      placeholder="Edytuj tytuł artykułu..."
                    />
                  )}
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 mb-6 pb-4 border-b border-gray-100 gap-2">
                  <div className="flex items-center">
                    <Bot className="w-4 h-4 mr-1.5 text-blue-500" />
                    <span>League Manager News</span>
                    <span className="mx-2">•</span>
                    <UserCheck className="w-3.5 h-3.5 mr-1 text-indigo-600" />
                    <span>Zweryfikował: Szymon M. (PRO)</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="flex items-center text-gray-400">
                      <Clock className="w-3.5 h-3.5 mr-1" /> Przed chwilą
                    </span>

                    {!isEditingArticle ? (
                      <button
                        onClick={startEditing}
                        className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-emerald-50 hover:text-emerald-700 text-gray-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer border border-gray-200"
                      >
                        <Edit3 className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Edytuj artykuł
                      </button>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={cancelEditing}
                          className="inline-flex items-center px-2.5 py-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5 mr-1" /> Anuluj
                        </button>
                        <button
                          onClick={saveEditedArticle}
                          className="inline-flex items-center px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5 mr-1" /> Zapisz zmiany
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {!isEditingArticle ? (
                  <div className="prose prose-blue max-w-none text-gray-700 space-y-4 text-sm sm:text-base leading-relaxed">
                    {generatedArticle.body.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-xs text-emerald-700 font-semibold bg-emerald-50 p-2 rounded border border-emerald-200">
                      Tryb edycji redakcyjnej włączony. Możesz dowolnie zmodyfikować akapity przed opublikowaniem artykułu na stronie głównej ligi.
                    </p>
                    {editBody.map((paragraph, idx) => (
                      <div key={idx} className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-500 uppercase">Akapit {idx + 1}</label>
                        <textarea
                          rows={3}
                          value={paragraph}
                          onChange={(e) => handleBodyChange(idx, e.target.value)}
                          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed bg-gray-50/50"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">#Derby</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">#FCOrły</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">#SzymonMarekSędzia</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
}