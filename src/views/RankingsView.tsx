import React, { useState } from 'react';
import { Trophy, TrendingUp, TrendingDown, Minus, Calculator, Percent } from 'lucide-react';

// na razie statyczne dane bazowe
const mockStandings = [
  { id: 1, name: 'FC Orły', elo: 1650, prevElo: 1635, matches: 12, w: 9, d: 2, l: 1 },
  { id: 2, name: 'Sparta Wwa', elo: 1580, prevElo: 1590, matches: 12, w: 8, d: 3, l: 1 },
  { id: 3, name: 'KS Tygrysy', elo: 1510, prevElo: 1480, matches: 12, w: 6, d: 2, l: 4 },
  { id: 4, name: 'Wikingowie', elo: 1480, prevElo: 1480, matches: 12, w: 5, d: 3, l: 4 },
  { id: 5, name: 'Błyskawica', elo: 1420, prevElo: 1435, matches: 12, w: 3, d: 1, l: 8 },
  { id: 6, name: 'Sokoły', elo: 1390, prevElo: 1370, matches: 12, w: 1, d: 1, l: 10 },
];

export function RankingsView() {
  const [selectedTeamA, setSelectedTeamA] = useState(mockStandings[0].id);
  const [selectedTeamB, setSelectedTeamB] = useState(mockStandings[1].id);

  // Pobranie aktualnego ELO wybranych drużyn
  const teamA = mockStandings.find(t => t.id === selectedTeamA)!;
  const teamB = mockStandings.find(t => t.id === selectedTeamB)!;

  // Obliczanie prawdopodobieństwa wygranej ze standardowego wzoru ELO
  // Pa = 1 / (1 + 10^((Rb - Ra) / 400))
  const calcWinProbability = (eloA: number, eloB: number) => {
    const prob = 1 / (1 + Math.pow(10, (eloB - eloA) / 400));
    return (prob * 100).toFixed(1);
  };

  const probA = calcWinProbability(teamA.elo, teamB.elo);
  const probB = calcWinProbability(teamB.elo, teamA.elo);

  return (
    <div className="space-y-6">
      {/* Nagłówek */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Ranking ELO i Prawdopodobieństwo</h2>
        <p className="text-sm text-gray-500 mt-1">
          Dynamiczna wycena siły drużyn i moduł przewidywania wyników na podstawie historii spotkań.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Tabela Ligowa (2 kolumny) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center">
            <Trophy className="w-5 h-5 text-amber-500 mr-2" />
            <h3 className="font-semibold text-gray-800">Tabela ELO</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white border-b border-gray-100 text-gray-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Poz</th>
                  <th className="px-5 py-3 font-medium">Drużyna</th>
                  <th className="px-5 py-3 font-medium text-center">Mecze</th>
                  <th className="px-5 py-3 font-medium text-center">W-R-P</th>
                  <th className="px-5 py-3 font-bold text-gray-900 text-right">Rating ELO</th>
                  <th className="px-5 py-3 font-medium text-right">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {mockStandings.map((team, index) => {
                  const eloDiff = team.elo - team.prevElo;
                  return (
                    <tr key={team.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-4 font-semibold text-gray-500">{index + 1}</td>
                      <td className="px-5 py-4 font-bold text-gray-900">{team.name}</td>
                      <td className="px-5 py-4 text-center text-gray-600">{team.matches}</td>
                      <td className="px-5 py-4 text-center text-gray-600">{team.w}-{team.d}-{team.l}</td>
                      <td className="px-5 py-4 font-bold text-emerald-600 text-right text-base">{team.elo}</td>
                      <td className="px-5 py-4 text-right flex justify-end items-center">
                        {eloDiff > 0 ? (
                          <span className="flex items-center text-emerald-500 text-xs font-bold"><TrendingUp className="w-4 h-4 mr-1" /> +{eloDiff}</span>
                        ) : eloDiff < 0 ? (
                          <span className="flex items-center text-red-500 text-xs font-bold"><TrendingDown className="w-4 h-4 mr-1" /> {eloDiff}</span>
                        ) : (
                          <span className="flex items-center text-gray-400 text-xs font-bold"><Minus className="w-4 h-4 mr-1" /> 0</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Kalkulator Prawdopodobieństwa (1 kolumna) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center">
              <Calculator className="w-5 h-5 text-blue-500 mr-2" />
              <h3 className="font-semibold text-gray-800">Symulator Szans</h3>
            </div>
            
            <div className="p-5 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Gospodarz (Drużyna A)</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={selectedTeamA}
                  onChange={(e) => setSelectedTeamA(Number(e.target.value))}
                >
                  {mockStandings.map(t => <option key={t.id} value={t.id}>{t.name} (ELO: {t.elo})</option>)}
                </select>
              </div>
              
              <div className="flex justify-center">
                <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded text-xs font-bold">VS</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Gość (Drużyna B)</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={selectedTeamB}
                  onChange={(e) => setSelectedTeamB(Number(e.target.value))}
                >
                  {mockStandings.map(t => <option key={t.id} value={t.id}>{t.name} (ELO: {t.elo})</option>)}
                </select>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Szansa na zwycięstwo</span>
                  <Percent className="w-4 h-4 text-gray-400" />
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="text-center w-2/5">
                    <p className="text-2xl font-bold text-blue-600">{probA}%</p>
                    <p className="text-xs text-gray-500 mt-1 truncate">{teamA.name}</p>
                  </div>
                  
                  <div className="w-1/5 flex justify-center text-gray-300">-</div>
                  
                  <div className="text-center w-2/5">
                    <p className="text-2xl font-bold text-emerald-600">{probB}%</p>
                    <p className="text-xs text-gray-500 mt-1 truncate">{teamB.name}</p>
                  </div>
                </div>

                {/* Pasek postępu */}
                <div className="h-2 w-full bg-gray-100 rounded-full mt-4 overflow-hidden flex">
                  <div style={{ width: `${probA}%` }} className="bg-blue-500 h-full transition-all duration-500"></div>
                  <div style={{ width: `${probB}%` }} className="bg-emerald-500 h-full transition-all duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}