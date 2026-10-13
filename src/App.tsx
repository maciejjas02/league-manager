import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/DashboardLayout';
import { AnomaliesView } from './views/AnomaliesView';
import { DashboardHome } from './views/DashboardHome'; 

// Zaślepka dla niewykonanych jeszcze widoków
const Placeholder = ({ title }: { title: string }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
    <h2 className="text-xl font-medium text-gray-700">Moduł: {title}</h2>
    <p className="text-gray-500 mt-2">Prace programistyczne w toku...</p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          {/* ZMIENIONY GŁÓWNY WIDOK */}
          <Route index element={<DashboardHome />} />
          
          <Route path="schedule" element={<Placeholder title="Harmonogramowanie CSP" />} />
          <Route path="rankings" element={<Placeholder title="Ranking ELO & Prawdopodobieństwo" />} />
          <Route path="news" element={<Placeholder title="Generator Relacji AI" />} />
          <Route path="anomalies" element={<AnomaliesView />} />
          <Route path="referees" element={<Placeholder title="System Ekspercki Sędziów" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;