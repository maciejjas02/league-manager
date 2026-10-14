import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  AlertTriangle, 
  ShieldAlert, 
  FileText, 
  ArrowUpRight, 
  Trophy, 
  Flame, 
  CheckCircle2,
  Clock
} from 'lucide-react';

export function DashboardHome() {
  const stats = [
    {
      name: 'Mecze do rozegrania',
      value: '24',
      subtext: 'Terminarz zoptymalizowany',
      icon: Calendar,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      borderHover: 'hover:border-emerald-300',
      path: '/schedule',
    },
    {
      name: 'Podejrzani gracze',
      value: '2',
      subtext: 'Wymaga weryfikacji',
      icon: AlertTriangle,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      borderHover: 'hover:border-amber-300',
      path: '/anomalies',
    },
    {
      name: 'Mecze podw. ryzyka',
      value: '1',
      subtext: 'Brak obsady sędziowskiej',
      icon: ShieldAlert,
      color: 'text-red-600',
      bg: 'bg-red-50',
      borderHover: 'hover:border-red-300',
      path: '/referees',
    },
    {
      name: 'Wygenerowane relacje',
      value: '12',
      subtext: 'Ostatnia: 2h temu',
      icon: FileText,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      borderHover: 'hover:border-blue-300',
      path: '/news',
    },
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'anomaly',
      title: 'Anomalia statystyczna: Kamil "Snajper" B. (Błyskawica)',
      description: 'Zdobył 5 goli i 2 asysty w 25 minut przeciwko liderowi (średnia historyczna: 0.2 gola/mecz).',
      time: '15 min temu',
      path: '/anomalies',
      badge: 'Wykrywanie Anomalii',
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    {
      id: 2,
      type: 'referee',
      title: 'Mecz podwyższonego ryzyka: FC Orły vs Sparta Wwa',
      description: 'Wysoki indeks konfliktu (88°) oraz walka o 1. miejsce w I Lidze. Wymagany sędzia z licencją PRO.',
      time: '1 godz. temu',
      path: '/referees',
      badge: 'Obsada Sędziowska',
      badgeColor: 'bg-red-100 text-red-800',
    },
    {
      id: 3,
      type: 'news',
      title: 'Nowy protokół od sędziego (Szymon M.) czeka na publikację',
      description: 'Dodano notatki o bramce z rzutu wolnego. Gotowe do wygenerowania relacji AI.',
      time: '2 godz. temu',
      path: '/news',
      badge: 'Generator Relacji',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Podsumowanie Sezonu</h2>
          
        </div>
        <Link 
          to="/rankings" 
          className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-emerald-600 transition-colors shadow-sm"
        >
          <Trophy className="w-4 h-4 mr-2 text-amber-500" />
          Zobacz Tabelę i ELO
          <ArrowUpRight className="w-4 h-4 ml-1 text-gray-400" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.name}
              to={stat.path}
              className={`group bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${stat.borderHover} hover:shadow-md transition-all duration-200 flex flex-col justify-between relative overflow-hidden`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
                    {stat.name}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500 flex items-center">
                  {stat.subtext}
                </span>
                <span className="text-xs font-semibold text-gray-400 group-hover:text-gray-900 flex items-center transition-colors">
                  Otwórz
                  <ArrowUpRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 flex items-center">
              <Flame className="w-5 h-5 text-amber-500 mr-2" />
              Ostatnie zdarzenia wymagające uwagi
            </h3>
            
          </div>

          <div className="divide-y divide-gray-100">
            {recentAlerts.map((alert) => (
              <Link
                key={alert.id}
                to={alert.path}
                className="block p-5 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${alert.badgeColor}`}>
                    {alert.badge}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {alert.time}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="pr-4">
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      {alert.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {alert.description}
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-600 flex-shrink-0 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between">
          <div>
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-gray-800">Status Modułów AI</h3>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" />
                  Solver CSP (OR-Tools)
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">Gotowy</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" />
                  Silnik ELO & Predykcji
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">Aktywny</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" />
                  Detektor Anomalii (Sklearn)
                </span>
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-1 rounded">2 alerty</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" />
                  System Ekspercki Sędziów
                </span>
                <span className="text-xs font-semibold text-red-700 bg-red-50 px-2 py-1 rounded">1 brak</span>
              </div>
            </div>
          </div>

          <div className="p-5 bg-slate-50 border-t border-gray-100">

          </div>
        </div>

      </div>
    </div>
  );
}