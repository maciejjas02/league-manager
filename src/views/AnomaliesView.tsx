import React from 'react';
import { AlertTriangle, TrendingUp, UserX, CheckCircle, Activity } from 'lucide-react';

// tu backend bedzie okok
const mockAnomalies = [
  {
    id: 1,
    playerName: 'Jan Kowalski',
    teamName: 'FC Orły',
    match: 'FC Orły vs. Błyskawica',
    date: '12 Paź 2026',
    confidence: 94, // %
    expectedStats: { distance: '3.1 km', goals: 0.2 },
    actualStats: { distance: '8.4 km', goals: 5 },
    status: 'pending',
  },
  {
    id: 2,
    playerName: 'Marek Nowak',
    teamName: 'Sparta Wwa',
    match: 'Sparta Wwa vs. KS Tygrysy',
    date: '11 Paź 2026',
    confidence: 78,
    expectedStats: { distance: '4.5 km', goals: 1 },
    actualStats: { distance: '6.2 km', goals: 3 },
    status: 'pending',
  }
];

export function AnomaliesView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Wykryte Anomalie</h2>
          <p className="text-sm text-gray-500 mt-1">
            System wykrył statystyki znacząco odbiegające od historycznego profilu graczy.
          </p>
        </div>
        <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg flex items-center font-medium border border-red-100">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Do weryfikacji: {mockAnomalies.length}
        </div>
      </div>

      <div className="grid gap-6">
        {mockAnomalies.map((anomaly) => (
          <div key={anomaly.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Nagłówek karty */}
            <div className="bg-slate-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <UserX className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{anomaly.playerName}</h3>
                  <p className="text-xs text-gray-500">{anomaly.teamName} • {anomaly.match} • {anomaly.date}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-500">Pewność algorytmu</span>
                <span className={`font-bold ${anomaly.confidence > 90 ? 'text-red-600' : 'text-orange-500'}`}>
                  {anomaly.confidence}%
                </span>
              </div>
            </div>

            {/* Treść karty - Porównanie statystyk */}
            <div className="px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              <div className="flex-1 bg-gray-50 rounded-lg p-4 flex items-center justify-between border border-gray-100">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Profil historyczny (Średnia)</p>
                  <p className="text-sm text-gray-700">Dystans: <span className="font-semibold">{anomaly.expectedStats.distance}</span></p>
                  <p className="text-sm text-gray-700">Gole: <span className="font-semibold">{anomaly.expectedStats.goals}</span></p>
                </div>
                <Activity className="w-8 h-8 text-gray-300" />
              </div>

              <div className="flex flex-col items-center justify-center text-red-500">
                <TrendingUp className="w-6 h-6" />
                <span className="text-xs font-bold mt-1">SKOK</span>
              </div>

              <div className="flex-1 bg-red-50 rounded-lg p-4 flex items-center justify-between border border-red-100">
                <div>
                  <p className="text-xs font-medium text-red-800 uppercase tracking-wider mb-1">Występ w tym meczu</p>
                  <p className="text-sm text-red-900">Dystans: <span className="font-bold">{anomaly.actualStats.distance}</span></p>
                  <p className="text-sm text-red-900">Gole: <span className="font-bold">{anomaly.actualStats.goals}</span></p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-300" />
              </div>
            </div>

            {/* Akcje */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                Zatwierdź występ (Fałszywy alarm)
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 transition-colors flex items-center">
                <UserX className="w-4 h-4 mr-2" />
                Oflaguj jako "Gracz na lewo"
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}