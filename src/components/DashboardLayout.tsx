import React from 'react';
import { 
  CalendarDays, 
  Trophy, 
  FileText, 
  AlertTriangle, 
  ShieldAlert, 
  LayoutDashboard 
} from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Terminarz (CSP)', href: '/schedule', icon: CalendarDays },
  { name: 'Rankingi i Elo', href: '/rankings', icon: Trophy },
  { name: 'Relacje z Meczów', href: '/news', icon: FileText },
  { name: 'Wykrywanie Anomalii', href: '/anomalies', icon: AlertTriangle },
  { name: 'Obsada Sędziowska', href: '/referees', icon: ShieldAlert },
];

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-5">
          <h1 className="text-xl font-bold tracking-wider text-emerald-400">
            LEAGUE MANAGER
          </h1>
          <p className="text-xs text-slate-400 mt-1">Smart Admin Panel</p>
        </div>
        
        <nav className="flex-1 px-3 space-y-1 mt-5">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive 
                    ? 'bg-slate-800 text-emerald-400' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center">
              <span className="text-sm font-medium">AD</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-8">
            <h2 className="text-lg font-semibold text-gray-800">
              Panel Zarządzania Rozgrywkami
            </h2>
          </div>
        </header>
        
        <div className="p-8 max-w-7xl mx-auto">
          {/* Tutaj będą wstrzykiwane poszczególne widoki (np. Terminarz, Rankingi) */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}