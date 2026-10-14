import { useState } from 'react';
import { 
  Trophy, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Calculator, 
  Layers, 
  Globe, 
  Flame, 
  UserX, 
  Info,
  Award,
  ArrowUpCircle,
  ArrowDownCircle
} from 'lucide-react';

type FormResult = 'W' | 'R' | 'P';

interface TeamRankingData {
  id: number;
  name: string;
  leagueId: number;
  leagueName: string;
  matches: number;
  w: number;
  d: number;
  l: number;
  goalsFor: number;
  goalsAgainst: number;
  elo: number;
  prevElo: number;
  form: FormResult[];
  keyPlayerNote?: string;
}

const allTeamsData: TeamRankingData[] = [
  // --- I LIGA (ID: 1) ---
  { id: 1, name: 'FC Orły', leagueId: 1, leagueName: 'I Liga', matches: 12, w: 9, d: 2, l: 1, goalsFor: 34, goalsAgainst: 12, elo: 1650, prevElo: 1635, form: ['W', 'W', 'R', 'W', 'W'], keyPlayerNote: 'J. Kowalski (18 goli)' },
  { id: 2, name: 'Sparta Wwa', leagueId: 1, leagueName: 'I Liga', matches: 12, w: 8, d: 3, l: 1, goalsFor: 28, goalsAgainst: 14, elo: 1580, prevElo: 1590, form: ['R', 'W', 'W', 'P', 'W'], keyPlayerNote: 'A. Lewandowski (14 goli)' },
  { id: 3, name: 'KS Tygrysy', leagueId: 1, leagueName: 'I Liga', matches: 12, w: 6, d: 2, l: 4, goalsFor: 22, goalsAgainst: 19, elo: 1510, prevElo: 1480, form: ['W', 'W', 'P', 'W', 'R'], keyPlayerNote: 'M. Zieliński (11 goli)' },
  { id: 4, name: 'Wikingowie', leagueId: 1, leagueName: 'I Liga', matches: 12, w: 5, d: 3, l: 4, goalsFor: 19, goalsAgainst: 18, elo: 1480, prevElo: 1480, form: ['R', 'P', 'R', 'W', 'P'] },
  { id: 5, name: 'Błyskawica', leagueId: 1, leagueName: 'I Liga', matches: 12, w: 3, d: 1, l: 8, goalsFor: 14, goalsAgainst: 27, elo: 1420, prevElo: 1435, form: ['P', 'W', 'P', 'P', 'P'] },
  { id: 6, name: 'Sokoły', leagueId: 1, leagueName: 'I Liga', matches: 12, w: 1, d: 1, l: 10, goalsFor: 9, goalsAgainst: 36, elo: 1360, prevElo: 1380, form: ['P', 'P', 'R', 'P', 'P'] },

  // --- II LIGA (ID: 2) ---
  { id: 7, name: 'Młode Wilki', leagueId: 2, leagueName: 'II Liga', matches: 12, w: 10, d: 1, l: 1, goalsFor: 38, goalsAgainst: 11, elo: 1535, prevElo: 1505, form: ['W', 'W', 'W', 'W', 'R'], keyPlayerNote: 'D. Szymański (21 goli)' },
  { id: 8, name: 'Husaria', leagueId: 2, leagueName: 'II Liga', matches: 12, w: 8, d: 2, l: 2, goalsFor: 29, goalsAgainst: 15, elo: 1495, prevElo: 1475, form: ['W', 'R', 'W', 'W', 'P'] },
  { id: 9, name: 'Grom Wwa', leagueId: 2, leagueName: 'II Liga', matches: 12, w: 5, d: 3, l: 4, goalsFor: 21, goalsAgainst: 20, elo: 1430, prevElo: 1440, form: ['P', 'R', 'W', 'R', 'W'] },
  { id: 10, name: 'Feniks', leagueId: 2, leagueName: 'II Liga', matches: 12, w: 4, d: 2, l: 6, goalsFor: 17, goalsAgainst: 23, elo: 1395, prevElo: 1390, form: ['W', 'P', 'P', 'R', 'P'] },
  { id: 11, name: 'Tornado', leagueId: 2, leagueName: 'II Liga', matches: 12, w: 2, d: 2, l: 8, goalsFor: 12, goalsAgainst: 29, elo: 1340, prevElo: 1355, form: ['P', 'P', 'W', 'P', 'R'] },
  { id: 12, name: 'Zjednoczeni', leagueId: 2, leagueName: 'II Liga', matches: 12, w: 1, d: 2, l: 9, goalsFor: 10, goalsAgainst: 31, elo: 1310, prevElo: 1320, form: ['P', 'R', 'P', 'P', 'P'] },
];

export function RankingsView() {
  const [activeTab, setActiveTab] = useState<'points' | 'elo'>('points');
  const [selectedLeagueId, setSelectedLeagueId] = useState<number>(1);

  const [selectedTeamA, setSelectedTeamA] = useState<number>(1); // FC Orły
  const [selectedTeamB, setSelectedTeamB] = useState<number>(2); // Sparta Wwa
  const [missingKeyPlayerA, setMissingKeyPlayerA] = useState<boolean>(false);
  const [missingKeyPlayerB, setMissingKeyPlayerB] = useState<boolean>(false);

  const getPoints = (t: TeamRankingData) => t.w * 3 + t.d * 1;
  const getGoalDiff = (t: TeamRankingData) => t.goalsFor - t.goalsAgainst;

  const getFormPoints = (form: FormResult[]) => {
    return form.reduce((acc, res) => acc + (res === 'W' ? 3 : res === 'R' ? 1 : 0), 0);
  };

  const leagueStandings = allTeamsData
    .filter(t => t.leagueId === selectedLeagueId)
    .sort((a, b) => {
      const ptsDiff = getPoints(b) - getPoints(a);
      if (ptsDiff !== 0) return ptsDiff;
      return getGoalDiff(b) - getGoalDiff(a);
    });

  const globalEloStandings = [...allTeamsData].sort((a, b) => b.elo - a.elo);

  // --- LOGIKA WIELOCZYNNIKOWEGO SYMULATORA SZANS ---
  const teamA = allTeamsData.find(t => t.id === selectedTeamA)!;
  const teamB = allTeamsData.find(t => t.id === selectedTeamB)!;

  const formPtsA = getFormPoints(teamA.form);
  const formPtsB = getFormPoints(teamB.form);

  const formBonusA = Math.round((formPtsA - 7.5) * 8);
  const formBonusB = Math.round((formPtsB - 7.5) * 8);

  const absencePenaltyA = missingKeyPlayerA ? -65 : 0;
  const absencePenaltyB = missingKeyPlayerB ? -65 : 0;

  const effectiveEloA = teamA.elo + formBonusA + absencePenaltyA;
  const effectiveEloB = teamB.elo + formBonusB + absencePenaltyB;

  const expectedScoreA = 1 / (1 + Math.pow(10, (effectiveEloB - effectiveEloA) / 400));

  const eloGap = Math.abs(effectiveEloA - effectiveEloB);
  const drawProb = Math.max(8, 22 * Math.exp(-eloGap / 280)); // od 8% do 22% szans na remis
  const winProbA = expectedScoreA * (100 - drawProb);
  const winProbB = (1 - expectedScoreA) * (100 - drawProb);

  const renderFormBadges = (form: FormResult[]) => (
    <div className="flex items-center justify-center space-x-1">
      {form.map((res, idx) => {
        const styles =
          res === 'W'
            ? 'bg-emerald-500 text-white'
            : res === 'R'
            ? 'bg-gray-400 text-white'
            : 'bg-red-500 text-white';
        return (
          <span
            key={idx}
            className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center ${styles}`}
            title={res === 'W' ? 'Wygrana (3 pkt)' : res === 'R' ? 'Remis (1 pkt)' : 'Porażka (0 pkt)'}
          >
            {res}
          </span>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tabele Ligowe i Ranking ELO</h2>

        </div>

        <div className="inline-flex bg-gray-200/80 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('points')}
            className={`flex items-center px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'points'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Trophy className="w-4 h-4 mr-1.5 text-amber-500" />
            Tabela Punktowa (Sezon)
          </button>
          <button
            onClick={() => setActiveTab('elo')}
            className={`flex items-center px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'elo'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Globe className="w-4 h-4 mr-1.5 text-emerald-600" />
            Globalny Ranking ELO (Baza)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-4">
          {activeTab === 'points' ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center">
                  <Trophy className="w-5 h-5 text-amber-500 mr-2" />
                  <h3 className="font-semibold text-gray-800">
                    Tabela Punktowa — {selectedLeagueId === 1 ? 'I Liga Orlikowa (Dywizja A)' : 'II Liga Orlikowa (Dywizja B)'}
                  </h3>
                </div>

                <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-lg border border-gray-200">
                  <Layers className="w-3.5 h-3.5 text-emerald-600" />
                  <select
                    value={selectedLeagueId}
                    onChange={(e) => setSelectedLeagueId(Number(e.target.value))}
                    className="text-xs font-bold text-gray-800 bg-transparent outline-none cursor-pointer"
                  >
                    <option value={1}>I Liga (Walka o Mistrzostwo i Utrzymanie)</option>
                    <option value={2}>II Liga (Walka o Awans do I Ligi)</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white border-b border-gray-100 text-gray-500 text-xs uppercase">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Poz</th>
                      <th className="px-4 py-3 font-semibold">Drużyna</th>
                      <th className="px-3 py-3 font-semibold text-center">M</th>
                      <th className="px-3 py-3 font-semibold text-center">W-R-P</th>
                      <th className="px-3 py-3 font-semibold text-center">Bramki</th>
                      <th className="px-3 py-3 font-semibold text-center">Forma</th>
                      <th className="px-4 py-3 font-bold text-gray-900 text-right">Pkt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {leagueStandings.map((team, index) => {
                      const pos = index + 1;
                      const pts = getPoints(team);
                      const diff = getGoalDiff(team);

                      const isTopZone = pos <= 2;
                      const isRelegationZone = selectedLeagueId === 1 && pos >= 5;

                      let rowStyle = 'hover:bg-gray-50/70';
                      let badge = null;

                      if (selectedLeagueId === 1 && pos === 1) {
                        rowStyle = 'bg-amber-50/40 hover:bg-amber-50/70';
                        badge = (
                          <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                            <Award className="w-3 h-3 mr-0.5" /> Lider
                          </span>
                        );
                      } else if (selectedLeagueId === 2 && isTopZone) {
                        rowStyle = 'bg-emerald-50/40 hover:bg-emerald-50/70';
                        badge = (
                          <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            <ArrowUpCircle className="w-3 h-3 mr-0.5" /> Awans
                          </span>
                        );
                      } else if (isRelegationZone) {
                        rowStyle = 'bg-red-50/40 hover:bg-red-50/70';
                        badge = (
                          <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800">
                            <ArrowDownCircle className="w-3 h-3 mr-0.5" /> Spadek
                          </span>
                        );
                      }

                      return (
                        <tr key={team.id} className={`${rowStyle} transition-colors`}>
                          <td className="px-4 py-3.5 font-bold text-gray-700">
                            <span
                              className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                                selectedLeagueId === 1 && pos === 1
                                  ? 'bg-amber-500 text-white'
                                  : selectedLeagueId === 2 && isTopZone
                                  ? 'bg-emerald-600 text-white'
                                  : isRelegationZone
                                  ? 'bg-red-500 text-white'
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {pos}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 font-bold text-gray-900">
                            <div className="flex items-center flex-wrap">
                              <span>{team.name}</span>
                              {badge}
                            </div>
                          </td>
                          <td className="px-3 py-3.5 text-center text-gray-600">{team.matches}</td>
                          <td className="px-3 py-3.5 text-center text-gray-600">
                            {team.w}-{team.d}-{team.l}
                          </td>
                          <td className="px-3 py-3.5 text-center text-gray-600 font-medium">
                            {team.goalsFor}:{team.goalsAgainst}{' '}
                            <span className="text-xs text-gray-400">
                              ({diff > 0 ? `+${diff}` : diff})
                            </span>
                          </td>
                          <td className="px-3 py-3.5 text-center">
                            {renderFormBadges(team.form)}
                          </td>
                          <td className="px-4 py-3.5 font-extrabold text-gray-900 text-right text-base">
                            {pts}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  {selectedLeagueId === 1 ? (
                    <>
                      <span className="flex items-center">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-1.5"></span>
                        1. miejsce: Mistrz Ligi
                      </span>
                      <span className="flex items-center">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 mr-1.5"></span>
                        5-6. miejsce: Spadek do II Ligi
                      </span>
                    </>
                  ) : (
                    <span className="flex items-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 mr-1.5"></span>
                      1-2. miejsce: Bezpośredni awans do I Ligi
                    </span>
                  )}
                </div>
                <span>Punktacja: Zwycięstwo = 3 pkt, Remis = 1 pkt, Porażka = 0 pkt</span>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center">
                  <Globe className="w-5 h-5 text-emerald-600 mr-2" />
                  <h3 className="font-semibold text-gray-800">
                    Globalny Ranking ELO (Wszystkie drużyny w bazie)
                  </h3>
                </div>
                <span className="text-xs text-gray-500">Łącznie: {globalEloStandings.length} zespołów</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white border-b border-gray-100 text-gray-500 text-xs uppercase">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Rank</th>
                      <th className="px-4 py-3 font-semibold">Drużyna</th>
                      <th className="px-3 py-3 font-semibold">Obecna Liga</th>
                      <th className="px-3 py-3 font-semibold text-center">Forma (5)</th>
                      <th className="px-4 py-3 font-bold text-gray-900 text-right">Rating ELO</th>
                      <th className="px-4 py-3 font-semibold text-right">Zmiana</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {globalEloStandings.map((team, index) => {
                      const eloDiff = team.elo - team.prevElo;
                      return (
                        <tr key={team.id} className="hover:bg-gray-50/70 transition-colors">
                          <td className="px-4 py-3.5 font-bold text-gray-500">#{index + 1}</td>
                          <td className="px-4 py-3.5 font-bold text-gray-900">{team.name}</td>
                          <td className="px-3 py-3.5">
                            <span
                              className={`text-xs font-semibold px-2 py-0.5 rounded ${
                                team.leagueId === 1
                                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                                  : 'bg-slate-100 text-slate-700 border border-slate-200'
                              }`}
                            >
                              {team.leagueName}
                            </span>
                          </td>
                          <td className="px-3 py-3.5 text-center">
                            {renderFormBadges(team.form)}
                          </td>
                          <td className="px-4 py-3.5 font-extrabold text-emerald-600 text-right text-base">
                            {team.elo}
                          </td>
                          <td className="px-4 py-3.5 text-right">
                            <div className="flex justify-end items-center">
                              {eloDiff > 0 ? (
                                <span className="flex items-center text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded">
                                  <TrendingUp className="w-3.5 h-3.5 mr-1" /> +{eloDiff}
                                </span>
                              ) : eloDiff < 0 ? (
                                <span className="flex items-center text-red-600 text-xs font-bold bg-red-50 px-2 py-0.5 rounded">
                                  <TrendingDown className="w-3.5 h-3.5 mr-1" /> {eloDiff}
                                </span>
                              ) : (
                                <span className="flex items-center text-gray-400 text-xs font-bold">
                                  <Minus className="w-3.5 h-3.5 mr-1" /> 0
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
                Współczynnik ELO przechodzi między sezonami i pozwala obiektywnie porównać np. mistrza II Ligi ze średniakiem I Ligi.
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center">
                <Calculator className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="font-semibold text-gray-800">Symulator Szans AI (v2.0)</h3>
              </div>
              <span className="text-[10px] font-bold uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                3 Czynniki
              </span>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="p-3 bg-blue-50/40 rounded-lg border border-blue-100 space-y-2">
                <label className="block text-xs font-bold text-blue-900 uppercase tracking-wider">
                  Drużyna A
                </label>
                <select 
                  className="w-full border border-gray-300 bg-white rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                  value={selectedTeamA}
                  onChange={(e) => setSelectedTeamA(Number(e.target.value))}
                >
                  {allTeamsData.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.leagueName} • ELO: {t.elo})
                    </option>
                  ))}
                </select>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-gray-600 flex items-center">
                    <Flame className="w-3.5 h-3.5 text-amber-500 mr-1" />
                    Forma (5 gier): <strong>&nbsp;{formPtsA}/15 pkt</strong>
                  </span>
                  <span className={`font-bold ${formBonusA >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {formBonusA >= 0 ? `+${formBonusA}` : formBonusA} ELO
                  </span>
                </div>

                <label className="flex items-center space-x-2 text-xs text-gray-700 pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={missingKeyPlayerA}
                    onChange={(e) => setMissingKeyPlayerA(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="flex items-center">
                    <UserX className="w-3.5 h-3.5 text-red-500 mr-1" />
                    Brak kluczowego gracza (-65 ELO)
                  </span>
                </label>
              </div>

              <div className="p-3 bg-emerald-50/40 rounded-lg border border-emerald-100 space-y-2">
                <label className="block text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  Drużyna B
                </label>
                <select 
                  className="w-full border border-gray-300 bg-white rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={selectedTeamB}
                  onChange={(e) => setSelectedTeamB(Number(e.target.value))}
                >
                  {allTeamsData.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.leagueName} • ELO: {t.elo})
                    </option>
                  ))}
                </select>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-gray-600 flex items-center">
                    <Flame className="w-3.5 h-3.5 text-amber-500 mr-1" />
                    Forma (5 gier): <strong>&nbsp;{formPtsB}/15 pkt</strong>
                  </span>
                  <span className={`font-bold ${formBonusB >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {formBonusB >= 0 ? `+${formBonusB}` : formBonusB} ELO
                  </span>
                </div>

                <label className="flex items-center space-x-2 text-xs text-gray-700 pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={missingKeyPlayerB}
                    onChange={(e) => setMissingKeyPlayerB(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="flex items-center">
                    <UserX className="w-3.5 h-3.5 text-red-500 mr-1" />
                    Brak kluczowego gracza (-65 ELO)
                  </span>
                </label>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-xs space-y-1">
                <div className="flex justify-between text-gray-500">
                  <span>Efektywna siła (ELO + Forma + Kadra):</span>
                </div>
                <div className="flex justify-between font-bold text-sm pt-1">
                  <span className="text-blue-700">{teamA.name}: {effectiveEloA}</span>
                  <span className="text-emerald-700">{teamB.name}: {effectiveEloB}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-blue-50 border border-blue-100">
                    <p className="text-xl font-extrabold text-blue-600">{winProbA.toFixed(1)}%</p>
                    <p className="text-[11px] font-semibold text-gray-600 truncate mt-0.5">{teamA.name}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-gray-100 border border-gray-200">
                    <p className="text-xl font-extrabold text-gray-700">{drawProb.toFixed(1)}%</p>
                    <p className="text-[11px] font-semibold text-gray-500 mt-0.5">Remis</p>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                    <p className="text-xl font-extrabold text-emerald-600">{winProbB.toFixed(1)}%</p>
                    <p className="text-[11px] font-semibold text-gray-600 truncate mt-0.5">{teamB.name}</p>
                  </div>
                </div>

                <div className="h-3 w-full bg-gray-200 rounded-full mt-3 overflow-hidden flex">
                  <div style={{ width: `${winProbA}%` }} className="bg-blue-500 h-full transition-all duration-500" title={`Wygrana ${teamA.name}`} />
                  <div style={{ width: `${drawProb}%` }} className="bg-gray-400 h-full transition-all duration-500" title="Remis" />
                  <div style={{ width: `${winProbB}%` }} className="bg-emerald-500 h-full transition-all duration-500" title={`Wygrana ${teamB.name}`} />
                </div>
              </div>

              <div className="bg-blue-50/70 text-blue-900 p-3 rounded-lg text-[11px] flex items-start border border-blue-100 leading-relaxed">
                <Info className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5 text-blue-600" />
                <p>
                  <strong>Model Hybrydowy:</strong> Wzór uwzględnia globalny rating ELO, dynamikę formy z 5 ostatnich kolejek oraz osłabienia kadrowe.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}