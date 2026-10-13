import React from 'react';
import { ShieldAlert, UserCheck, Flame, Scale, History, AlertOctagon, CheckCircle2 } from 'lucide-react';

// Zamokowani sędziowie w bazie
const referees = [
  { id: 1, name: 'Szymon M.', licence: 'PRO (FIFA)', experience: 95, status: 'Dostępny' },
  { id: 2, name: 'Tomasz K.', licence: 'Elite', experience: 78, status: 'Dostępny' },
  { id: 3, name: 'Jan P.', licence: 'Amator', experience: 35, status: 'Niedostępny' },
  { id: 4, name: 'Michał W.', licence: 'Amator', experience: 42, status: 'Dostępny' },
];

// Zamokowane mecze i wyniki działania systemu eksperckiego
const matchesToAssign = [
  {
    id: 1,
    teamA: 'FC Orły',
    teamB: 'Sparta Wwa',
    date: 'Dzisiaj, 18:00',
    temperature: 88, // % ryzyka konfliktów
    riskFactors: ['Derby miasta', 'Czerwona kartka w ostatnim starciu', 'Wysoka waga (walka o mistrzostwo)'],
    suggestedRefereeId: 1,
    matchReasoning: 'Wymagane doświadczenie sędziego > 85. Status PRO niezbędny do utrzymania dyscypliny.'
  },
  {
    id: 2,
    teamA: 'KS Tygrysy',
    teamB: 'Błyskawica',
    date: 'Dzisiaj, 19:30',
    temperature: 32,
    riskFactors: ['Mecz o pietruszkę', 'Brak historii konfliktów'],
    suggestedRefereeId: 4,
    matchReasoning: 'Mecz niskiego ryzyka. Idealny dla sędziego budującego doświadczenie (Amator).'
  }
];

export function RefereesView() {
  return (
    <div className="space-y-6">
      {/* Nagłówek */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">System Ekspercki Obsady Sędziowskiej</h2>
        <p className="text-sm text-gray-500 mt-1">
          Moduł logiki rozmytej dopasowujący kompetencje sędziego do przewidywanej "temperatury" spotkania.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Lewa kolumna: Dostępni Sędziowie */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center">
              <UserCheck className="w-5 h-5 text-indigo-500 mr-2" />
              <h3 className="font-semibold text-gray-800">Kadra Sędziowska</h3>
            </div>
            
            <div className="divide-y divide-gray-50 p-2">
              {referees.map(ref => (
                <div key={ref.id} className="p-3 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{ref.name}</p>
                    <p className="text-xs text-gray-500">{ref.licence}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      ref.experience > 80 ? 'bg-indigo-100 text-indigo-800' : 
                      ref.experience > 50 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      Exp: {ref.experience}
                    </span>
                    <p className="text-[10px] text-gray-400 mt-1">{ref.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Prawa kolumna: Obsada Meczów (Wynik Systemu) */}
        <div className="lg:col-span-2 space-y-6">
          {matchesToAssign.map(match => {
            const suggestedRef = referees.find(r => r.id === match.suggestedRefereeId);
            const isHighRisk = match.temperature > 70;

            return (
              <div key={match.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className={`px-5 py-3 flex justify-between items-center border-b ${
                  isHighRisk ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'
                }`}>
                  <div className="flex items-center">
                    {isHighRisk ? (
                      <Flame className="w-5 h-5 text-red-500 mr-2" />
                    ) : (
                      <Scale className="w-5 h-5 text-emerald-500 mr-2" />
                    )}
                    <h3 className={`font-bold ${isHighRisk ? 'text-red-900' : 'text-emerald-900'}`}>
                      {match.teamA} vs {match.teamB}
                    </h3>
                  </div>
                  <span className={`text-sm font-bold ${isHighRisk ? 'text-red-600' : 'text-emerald-600'}`}>
                    Temperatura: {match.temperature}°
                  </span>
                </div>
                
                <div className="p-6 flex flex-col md:flex-row gap-6">
                  {/* Analiza meczu */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase flex items-center mb-2">
                        <History className="w-4 h-4 mr-1" /> Czynniki ryzyka
                      </h4>
                      <ul className="space-y-2">
                        {match.riskFactors.map((factor, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start">
                            <AlertOctagon className={`w-4 h-4 mr-2 mt-0.5 ${isHighRisk ? 'text-red-400' : 'text-gray-400'}`} />
                            {factor}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Sugestia systemu eksperckiego */}
                  <div className="flex-1 bg-gray-50 rounded-lg p-5 border border-gray-100 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-indigo-500 uppercase mb-3">Zalecana Obsada AI</h4>
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-indigo-200">
                          <UserCheck className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{suggestedRef?.name}</p>
                          <p className="text-xs text-gray-500">Doświadczenie: {suggestedRef?.experience} • {suggestedRef?.licence}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 italic bg-white p-2 rounded border border-gray-200">
                        " {match.matchReasoning} "
                      </p>
                    </div>
                    
                    <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Zatwierdź Obsadę
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}