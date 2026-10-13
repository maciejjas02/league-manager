import React from 'react';
import { 
  CalendarDays, 
  AlertTriangle, 
  ShieldAlert, 
  Newspaper, 
  Swords, 
  TrendingUp,
  ChevronRight
} from 'lucide-react';

// Zamokowane dane podsumowujące
const upcomingMatches = [
  { id: 1, teamA: 'FC Orły', teamB: 'Sparta Wwa', time: 'Dzisiaj, 18:00', risk: 'High', probA: 45, probB: 55 },
  { id: 2, teamA: 'KS Tygrysy', teamB: 'Błyskawica', time: 'Dzisiaj, 19:30', risk: 'Low', probA: 82, probB: 18 },
  { id: 3, teamA: 'Wikingowie', teamB: 'Sokoły', time: 'Jutro, 17:00', risk: 'Medium', probA: 50, probB: 50 },
];

const alerts = [
  { id: 1, type: 'anomaly', text: 'Wykryto nienaturalny skok formy (Jan Kowalski).', time: '10 min temu' },
  { id: 2, type: 'referee', text: 'Mecz FC Orły - Sparta wymaga sędziego z licencją PRO (Historia konfliktów).', time: '1 godz. temu' },
  { id: 3, type: 'news', text: 'Wygenerowano automatyczną relację dla meczu KS Tygrysy.', time: '2 godz. temu' },
];

export function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Nagłówek */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Podsumowanie Sezonu</h2>
        <p className="text-sm text-gray-500 mt-1">
          Bieżące statystyki i powiadomienia z modułów sztucznej inteligencji.
        </p>
      </div>

      {/* Karty Statystyk (Top Kpi) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Mecze do rozegrania</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">24</p>
            <p className="text-xs text-emerald-600 mt-2 font-medium flex items-center">
              <CalendarDays className="w-3 h-3 mr-1" /> Terminarz zoptymalizowany
            </p>
          </div>
          <div className="bg-emerald-50 p-3 rounded-lg"><CalendarDays className="w-6 h-6 text-emerald-600" /></div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Podejrzani gracze</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">2</p>
            <p className="text-xs text-red-600 mt-2 font-medium flex items-center">
              <AlertTriangle className="w-3 h-3 mr-1" /> Wymaga weryfikacji
            </p>
          </div>
          <div className="bg-red-50 p-3 rounded-lg"><AlertTriangle className="w-6 h-6 text-red-600" /></div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Mecze podw. ryzyka</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">1</p>
            <p className="text-xs text-amber-600 mt-2 font-medium flex items-center">
              <ShieldAlert className="w-3 h-3 mr-1" /> Brak obsady sędziowskiej
            </p>
          </div>
          <div className="bg-amber-50 p-3 rounded-lg"><ShieldAlert className="w-6 h-6 text-amber-600" /></div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Wygenerowane relacje</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
            <p className="text-xs text-blue-600 mt-2 font-medium flex items-center">
              <Newspaper className="w-3 h-3 mr-1" /> Ostatnia: 2h temu
            </p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg"><Newspaper className="w-6 h-6 text-blue-600" /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lewa kolumna: Nadchodzące mecze (ELO) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <Swords className="w-5 h-5 mr-2 text-slate-500" />
              Najbliższe spotkania (Prognoza ELO)
            </h3>
            <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">Pełny terminarz</button>
          </div>
          <div className="divide-y divide-gray-100">
            {upcomingMatches.map((match) => (
              <div key={match.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">
                    {match.time}
                  </span>
                  {match.risk === 'High' && (
                    <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-700 rounded-md flex items-center">
                      <ShieldAlert className="w-3 h-3 mr-1" /> Ryzyko Derbowe
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  {/* Drużyna A */}
                  <div className="flex-1 text-right">
                    <p className="font-bold text-gray-900 text-lg">{match.teamA}</p>
                    <p className="text-sm text-gray-500 font-medium">{match.probA}% szans</p>
                  </div>
                  
                  {/* Pasek prawdopodobieństwa ELO */}
                  <div className="px-6 flex-1 max-w-[200px]">
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden flex">
                      <div style={{ width: `${match.probA}%` }} className="bg-emerald-500 h-full"></div>
                      <div style={{ width: `${match.probB}%` }} className="bg-blue-500 h-full"></div>
                    </div>
                  </div>

                  {/* Drużyna B */}
                  <div className="flex-1 text-left">
                    <p className="font-bold text-gray-900 text-lg">{match.teamB}</p>
                    <p className="text-sm text-gray-500 font-medium">{match.probB}% szans</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prawa kolumna: Powiadomienia Systemowe */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-slate-500" />
              Aktywność AI
            </h3>
          </div>
          <div className="p-2">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-4 flex items-start space-x-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                <div className={`mt-0.5 p-2 rounded-full flex-shrink-0 ${
                  alert.type === 'anomaly' ? 'bg-red-100 text-red-600' : 
                  alert.type === 'referee' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {alert.type === 'anomaly' && <AlertTriangle className="w-4 h-4" />}
                  {alert.type === 'referee' && <ShieldAlert className="w-4 h-4" />}
                  {alert.type === 'news' && <Newspaper className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-sm text-gray-800 font-medium">{alert.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-100">
            <button className="w-full py-2 flex items-center justify-center text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              Zobacz wszystkie zdarzenia <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}