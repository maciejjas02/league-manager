import React, { useState } from 'react';
import { CalendarDays, Settings, Play, MapPin, Clock, Info } from 'lucide-react';

// Przykładowe dane
const mockSchedule = [
  {
    day: 1,
    date: '15 Paź 2026',
    matches: [
      { time: '18:00', pitch: 'Boisko 1 (Orlik)', teamA: 'FC Orły', teamB: 'Sparta Wwa' },
      { time: '18:00', pitch: 'Boisko 2 (Trawiaste)', teamA: 'KS Tygrysy', teamB: 'Błyskawica' },
      { time: '19:30', pitch: 'Boisko 1 (Orlik)', teamA: 'Wikingowie', teamB: 'Sokoły' },
    ]
  },
  {
    day: 2,
    date: '22 Paź 2026',
    matches: [
      { time: '18:00', pitch: 'Boisko 1 (Orlik)', teamA: 'Sparta Wwa', teamB: 'KS Tygrysy' },
      { time: '18:00', pitch: 'Boisko 2 (Trawiaste)', teamA: 'Sokoły', teamB: 'FC Orły' },
      { time: '19:30', pitch: 'Boisko 2 (Trawiaste)', teamA: 'Błyskawica', teamB: 'Wikingowie' },
    ]
  }
];

export function ScheduleView() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(true); // Na razie true, żeby widzieć układ

  const handleGenerate = () => {
    setIsGenerating(true);
    // symulacja (FastAPI -> Google OR-Tools)
    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Nagłówek */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Harmonogramowanie (Solver CSP)</h2>
        <p className="text-sm text-gray-500 mt-1">
          Moduł układający optymalny terminarz przy użyciu algorytmu spełniania ograniczeń.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kolumna boczna - Parametry Solvera */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center">
              <Settings className="w-5 h-5 text-gray-500 mr-2" />
              <h3 className="font-semibold text-gray-800">Parametry Ligi</h3>
            </div>
            
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Liczba drużyn</label>
                <input type="number" defaultValue={6} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dostępne boiska</label>
                <input type="number" defaultValue={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sloty czasowe (dziennie)</label>
                <input type="number" defaultValue={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow" />
              </div>

              <div className="pt-2">
                <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-xs flex items-start border border-blue-100">
                  <Info className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                  <p>System weźmie pod uwagę dostępność boisk oraz preferencje czasowe drużyn (Soft Constraints).</p>
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center transition-colors disabled:opacity-70"
              >
                {isGenerating ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Optymalizowanie...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Play className="w-4 h-4 mr-2" /> Generuj Terminarz
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Główna kolumna - Wynik Terminarza */}
        <div className="lg:col-span-2">
          {showResults ? (
            <div className="space-y-6">
              {mockSchedule.map((matchday) => (
                <div key={matchday.day} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="bg-slate-800 px-5 py-3 flex justify-between items-center">
                    <h3 className="font-bold text-white flex items-center">
                      <CalendarDays className="w-5 h-5 mr-2 text-emerald-400" />
                      Kolejka {matchday.day}
                    </h3>
                    <span className="text-slate-300 text-sm font-medium">{matchday.date}</span>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    {matchday.matches.map((match, idx) => (
                      <div key={idx} className="p-4 sm:px-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        
                        <div className="flex flex-col space-y-1">
                          <span className="text-xs font-semibold text-emerald-600 flex items-center">
                            <Clock className="w-3.5 h-3.5 mr-1" /> {match.time}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center">
                            <MapPin className="w-3.5 h-3.5 mr-1" /> {match.pitch}
                          </span>
                        </div>

                        <div className="flex items-center justify-center space-x-4 flex-1">
                          <span className="font-bold text-gray-900 w-1/3 text-right">{match.teamA}</span>
                          <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded text-xs font-bold">VS</span>
                          <span className="font-bold text-gray-900 w-1/3 text-left">{match.teamB}</span>
                        </div>
                        
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center p-12 text-center text-gray-400">
              <CalendarDays className="w-16 h-16 mb-4 text-gray-300" />
              <p className="text-lg font-medium text-gray-600">Brak wygenerowanego terminarza</p>
              <p className="text-sm">Ustaw parametry w panelu bocznym i uruchom solver AI.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}