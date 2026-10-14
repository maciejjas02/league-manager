import { useState } from 'react';
import { 
  CalendarDays, 
  Settings, 
  Play, 
  MapPin, 
  Clock, 
  Info, 
  Edit2, 
  Check, 
  X, 
  Layers, 
  AlertCircle,
  AlertTriangle
} from 'lucide-react';

interface League {
  id: number;
  name: string;
  division: number;
  teams: string[];
}

interface Pitch {
  id: number;
  name: string;
  surface: string;
}

interface MatchItem {
  id: number;
  leagueId: number;
  matchday: number;
  date: string;
  time: string;
  pitchId: number;
  teamA: string;
  teamB: string;
  isManuallyEdited: boolean;
}

interface ConflictStatus {
  type: 'none' | 'warning' | 'error';
  message: string;
}

const mockLeagues: League[] = [
  { 
    id: 1, 
    name: 'I Liga Orlikowa (Dywizja A)', 
    division: 1,
    teams: ['FC Orły', 'Sparta Wwa', 'KS Tygrysy', 'Błyskawica', 'Wikingowie', 'Sokoły']
  },
  { 
    id: 2, 
    name: 'II Liga Orlikowa (Dywizja B)', 
    division: 2,
    teams: ['Młode Wilki', 'Husaria', 'Grom Wwa', 'Feniks', 'Tornado', 'Zjednoczeni']
  }
];

const mockPitches: Pitch[] = [
  { id: 1, name: 'Boisko 1 (Orlik Centrum)', surface: 'Sztuczna trawa' },
  { id: 2, name: 'Boisko 2 (Arena Południe)', surface: 'Sztuczna trawa' },
  { id: 3, name: 'Boisko 3 (Hala Balonowa)', surface: 'Pneumatyczna' },
];

const generateTimeSlots = (): string[] => {
  const slots: string[] = [];
  let currentMinutes = 13 * 60 + 30; // 13:30
  const endMinutes = 21 * 60 + 30;   // 21:30

  while (currentMinutes <= endMinutes) {
    const hours = Math.floor(currentMinutes / 60);
    const mins = currentMinutes % 60;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMins = String(mins).padStart(2, '0');
    slots.push(`${formattedHours}:${formattedMins}`);
    currentMinutes += 15;
  }
  return slots;
};

const availableTimeSlots = generateTimeSlots();

const timeToMinutes = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

const initialMatches: MatchItem[] = [
  // --- LIGA ID: 1 ---
  { id: 101, leagueId: 1, matchday: 1, date: '2026-10-15', time: '18:00', pitchId: 1, teamA: 'FC Orły', teamB: 'Sparta Wwa', isManuallyEdited: false },
  { id: 102, leagueId: 1, matchday: 1, date: '2026-10-15', time: '18:00', pitchId: 2, teamA: 'KS Tygrysy', teamB: 'Błyskawica', isManuallyEdited: false },
  { id: 103, leagueId: 1, matchday: 1, date: '2026-10-15', time: '19:15', pitchId: 1, teamA: 'Wikingowie', teamB: 'Sokoły', isManuallyEdited: false },
  
  { id: 104, leagueId: 1, matchday: 2, date: '2026-10-22', time: '18:00', pitchId: 1, teamA: 'Sparta Wwa', teamB: 'KS Tygrysy', isManuallyEdited: false },
  { id: 105, leagueId: 1, matchday: 2, date: '2026-10-22', time: '18:00', pitchId: 2, teamA: 'Sokoły', teamB: 'FC Orły', isManuallyEdited: false },
  { id: 106, leagueId: 1, matchday: 2, date: '2026-10-22', time: '19:15', pitchId: 2, teamA: 'Błyskawica', teamB: 'Wikingowie', isManuallyEdited: false },

  // --- LIGA ID: 2 ---
  { id: 201, leagueId: 2, matchday: 1, date: '2026-10-16', time: '14:00', pitchId: 1, teamA: 'Młode Wilki', teamB: 'Husaria', isManuallyEdited: false },
  { id: 202, leagueId: 2, matchday: 1, date: '2026-10-16', time: '15:15', pitchId: 1, teamA: 'Grom Wwa', teamB: 'Feniks', isManuallyEdited: false },
  { id: 203, leagueId: 2, matchday: 1, date: '2026-10-16', time: '15:15', pitchId: 2, teamA: 'Tornado', teamB: 'Zjednoczeni', isManuallyEdited: false },
];

export function ScheduleView() {
  const [selectedLeagueId, setSelectedLeagueId] = useState<number>(1);
  const [matches, setMatches] = useState<MatchItem[]>(initialMatches);
  const [isGenerating, setIsGenerating] = useState(false);

  const [editingMatchId, setEditingMatchId] = useState<number | null>(null);
  const [editDate, setEditDate] = useState<string>('');
  const [editTime, setEditTime] = useState<string>('');
  const [editPitchId, setEditPitchId] = useState<number>(1);

  const currentLeague = mockLeagues.find(l => l.id === selectedLeagueId)!;
  const leagueMatches = matches.filter(m => m.leagueId === selectedLeagueId);

  const matchdays = Array.from(new Set(leagueMatches.map(m => m.matchday))).sort();

  const handleGenerate = () => {
    setIsGenerating(true);
    setEditingMatchId(null);
    setTimeout(() => {
      setIsGenerating(false);
    }, 1000);
  };

  const startEdit = (match: MatchItem) => {
    setEditingMatchId(match.id);
    setEditDate(match.date);
    setEditTime(match.time);
    setEditPitchId(match.pitchId);
  };

  const saveEdit = (matchId: number) => {
    setMatches(prev =>
      prev.map(m =>
        m.id === matchId
          ? {
              ...m,
              date: editDate,
              time: editTime,
              pitchId: editPitchId,
              isManuallyEdited: true,
            }
          : m
      )
    );
    setEditingMatchId(null);
  };

  const checkPitchConflict = (
    matchId: number,
    date: string,
    time: string,
    pitchId: number
  ): ConflictStatus => {
    const currentMins = timeToMinutes(time);
    let hasWarning = false;
    let warningMessage = '';

    for (const other of matches) {
      if (other.id === matchId || other.date !== date || other.pitchId !== pitchId) {
        continue;
      }

      const otherMins = timeToMinutes(other.time);
      const diff = Math.abs(currentMins - otherMins);

      if (diff < 60) {
        return {
          type: 'error',
          message: `Kolizja! Mecz trwa 50 min + przerwa. Nakłada się ze spotkaniem ${other.teamA} vs ${other.teamB} (${other.time}, odstęp: ${diff} min).`,
        };
      }

      if (diff === 60) {
        hasWarning = true;
        warningMessage = `Uwaga (odstęp 1h): Możliwa kolizja ze spotkaniem ${other.teamA} vs ${other.teamB} (${other.time}) – brak buforu po 50 min gry i przerwie.`;
      }
    }

    if (hasWarning) {
      return { type: 'warning', message: warningMessage };
    }

    return { type: 'none', message: '' };
  };

  const getPitchName = (pitchId: number) => {
    return mockPitches.find(p => p.id === pitchId)?.name || 'Nieznane boisko';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Harmonogramowanie (Solver CSP)</h2>
          <p className="text-sm text-gray-500 mt-1">
            Automatyczne generowanie terminarza (mecz 50 min + przerwa, sloty co 15 min od 13:30).
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm">
          <Layers className="w-4 h-4 text-emerald-600 ml-2" />
          <span className="text-xs font-semibold text-gray-500 uppercase">Liga:</span>
          <select
            value={selectedLeagueId}
            onChange={(e) => {
              setSelectedLeagueId(Number(e.target.value));
              setEditingMatchId(null);
            }}
            className="text-sm font-bold text-gray-800 bg-transparent py-1 pr-3 pl-1 outline-none cursor-pointer"
          >
            {mockLeagues.map(league => (
              <option key={league.id} value={league.id}>
                [ID: {league.id}] {league.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center">
                <Settings className="w-5 h-5 text-gray-500 mr-2" />
                <h3 className="font-semibold text-gray-800">Parametry Solvera</h3>
              </div>
              <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                ID Ligi: {currentLeague.id}
              </span>
            </div>
            
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Drużyny w tej lidze ({currentLeague.teams.length})
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {currentLeague.teams.map(team => (
                    <span 
                      key={team} 
                      className="text-xs bg-gray-100 text-gray-700 font-medium px-2.5 py-1 rounded-md border border-gray-200"
                    >
                      {team}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-1">Dostępne boiska w bazie</label>
                <div className="space-y-1.5">
                  {mockPitches.map(pitch => (
                    <div key={pitch.id} className="text-xs text-gray-600 flex items-center bg-gray-50 px-3 py-1.5 rounded border border-gray-100">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 mr-1.5 flex-shrink-0" />
                      <span className="font-medium text-gray-800">{pitch.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Start slotów</label>
                  <input 
                    type="text" 
                    disabled 
                    value="Od 13:30 (co 15m)" 
                    className="w-full border border-gray-200 bg-gray-50 text-gray-600 rounded-lg px-2.5 py-1.5 text-xs" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Czas meczu</label>
                  <input 
                    type="text" 
                    disabled 
                    value="50 min + przerwa" 
                    className="w-full border border-gray-200 bg-gray-50 text-gray-600 rounded-lg px-2.5 py-1.5 text-xs" 
                  />
                </div>
              </div>

              <div className="pt-1">
                <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-xs flex items-start border border-blue-100">
                  <Info className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>Zasady kolizji boiska:</strong> Odstęp poniżej 60 min wywołuje czerwony błąd nałożenia spotkań. Odstęp równy 60 min wyświetla lekki alert o możliwym opóźnieniu.
                  </p>
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center transition-colors disabled:opacity-70 cursor-pointer"
              >
                {isGenerating ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Optymalizowanie dla Ligi #{currentLeague.id}...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Play className="w-4 h-4 mr-2" /> Generuj Terminarz CSP
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {matchdays.map((day) => {
            const dayMatches = leagueMatches.filter(m => m.matchday === day);
            return (
              <div key={day} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-slate-800 px-5 py-3 flex justify-between items-center">
                  <h3 className="font-bold text-white flex items-center">
                    <CalendarDays className="w-5 h-5 mr-2 text-emerald-400" />
                    Kolejka {day} — {currentLeague.name}
                  </h3>
                  <span className="text-slate-300 text-xs font-medium">
                    Liczba spotkań: {dayMatches.length}
                  </span>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {dayMatches.map((match) => {
                    const isEditing = editingMatchId === match.id;
                    const conflict = checkPitchConflict(match.id, match.date, match.time, match.pitchId);
                    const liveEditConflict = isEditing
                      ? checkPitchConflict(match.id, editDate, editTime, editPitchId)
                      : { type: 'none', message: '' };

                    return (
                      <div 
                        key={match.id} 
                        className={`p-4 sm:px-6 transition-colors ${
                          conflict.type === 'error'
                            ? 'bg-red-50/60'
                            : conflict.type === 'warning'
                            ? 'bg-amber-50/50'
                            : isEditing
                            ? 'bg-emerald-50/40'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {!isEditing ? (
                          <div className="space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="flex flex-col space-y-1 min-w-[200px]">
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs font-bold text-emerald-700 flex items-center bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                    <Clock className="w-3 h-3 mr-1" /> {match.date} • {match.time}
                                  </span>
                                  {match.isManuallyEdited && (
                                    <span className="text-[10px] font-semibold bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">
                                      Zmieniono ręcznie
                                    </span>
                                  )}
                                </div>
                                <span className="text-xs text-gray-600 flex items-center pt-0.5">
                                  <MapPin className="w-3.5 h-3.5 mr-1 text-gray-400" /> {getPitchName(match.pitchId)}
                                </span>
                              </div>

                              <div className="flex items-center justify-center space-x-3 flex-1">
                                <span className="font-bold text-gray-900 w-2/5 text-right text-sm sm:text-base">{match.teamA}</span>
                                <span className="px-2.5 py-1 bg-gray-100 text-gray-500 rounded text-xs font-bold">VS</span>
                                <span className="font-bold text-gray-900 w-2/5 text-left text-sm sm:text-base">{match.teamB}</span>
                              </div>

                              <div className="flex justify-end">
                                <button
                                  onClick={() => startEdit(match)}
                                  className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-emerald-600 transition-colors shadow-xs cursor-pointer"
                                  title="Ręczna zmiana terminu lub boiska"
                                >
                                  <Edit2 className="w-3.5 h-3.5 mr-1.5" />
                                  Edytuj
                                </button>
                              </div>
                            </div>

                            {conflict.type === 'error' && (
                              <div className="text-xs text-red-700 bg-red-100/80 border border-red-200 px-3 py-1.5 rounded-lg font-medium flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1.5 flex-shrink-0 text-red-600" />
                                {conflict.message}
                              </div>
                            )}
                            {conflict.type === 'warning' && (
                              <div className="text-xs text-amber-800 bg-amber-100/80 border border-amber-200 px-3 py-1.5 rounded-lg font-medium flex items-center">
                                <AlertTriangle className="w-4 h-4 mr-1.5 flex-shrink-0 text-amber-600" />
                                {conflict.message}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                                Ręczna edycja meczu: {match.teamA} vs {match.teamB}
                              </span>
                              <span className="text-xs text-gray-500">ID Meczu: #{match.id}</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Data spotkania</label>
                                <input
                                  type="date"
                                  value={editDate}
                                  onChange={(e) => setEditDate(e.target.value)}
                                  className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Godzina (od 13:30 co 15 min)</label>
                                <select
                                  value={editTime}
                                  onChange={(e) => setEditTime(e.target.value)}
                                  className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                                >
                                  {availableTimeSlots.map(slot => (
                                    <option key={slot} value={slot}>{slot}</option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Wybierz boisko z bazy</label>
                                <select
                                  value={editPitchId}
                                  onChange={(e) => setEditPitchId(Number(e.target.value))}
                                  className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                                >
                                  {mockPitches.map(pitch => (
                                    <option key={pitch.id} value={pitch.id}>
                                      {pitch.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            {liveEditConflict.type === 'error' && (
                              <div className="text-xs text-red-700 bg-red-100 border border-red-200 px-3 py-2 rounded-lg font-medium flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1.5 flex-shrink-0 text-red-600" />
                                {liveEditConflict.message}
                              </div>
                            )}
                            {liveEditConflict.type === 'warning' && (
                              <div className="text-xs text-amber-800 bg-amber-100 border border-amber-200 px-3 py-2 rounded-lg font-medium flex items-center">
                                <AlertTriangle className="w-4 h-4 mr-1.5 flex-shrink-0 text-amber-600" />
                                {liveEditConflict.message}
                              </div>
                            )}

                            <div className="flex justify-end space-x-2 pt-1">
                              <button
                                onClick={() => setEditingMatchId(null)}
                                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5 mr-1" /> Anuluj
                              </button>
                              <button
                                onClick={() => saveEdit(match.id)}
                                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 cursor-pointer"
                              >
                                <Check className="w-3.5 h-3.5 mr-1" /> Zapisz zmiany
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}