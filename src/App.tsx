import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/DashboardLayout';
import { DashboardHome } from './views/DashboardHome'; 
import { AnomaliesView } from './views/AnomaliesView';
import { ScheduleView } from './views/ScheduleView';
import { RankingsView } from './views/RankingsView';
import { NewsView } from './views/NewsView';
import { RefereesView } from './views/RefereesView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="schedule" element={<ScheduleView />} />
          <Route path="rankings" element={<RankingsView />} />
          <Route path="news" element={<NewsView />} />
          <Route path="anomalies" element={<AnomaliesView />} />
          
          <Route path="referees" element={<RefereesView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;