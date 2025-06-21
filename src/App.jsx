import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import GameModeSelectionPage from './pages/GameModeSelectionPage';
import GamePage from './pages/GamePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import GameHistoryPage from './pages/GameHistoryPage';
import LeaderboardPage from './pages/LeaderboardPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import SupportPage from './pages/SupportPage';
import ChallengesPage from './pages/ChallengesPage';
// import OnlineGame from './pages/OnlineGamePage'; // لاحقًا

export default function App() {
  return (
    <Router>
      <div 
        className="min-h-screen flex flex-col"
        style={{
          background: 'linear-gradient(135deg, var(--bg-theme) 0%, var(--bg1-theme) 100%)'
        }}
      >
        <Header />
        <main className="flex-1">
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<GameModeSelectionPage />} />
            <Route path="/game" element={<GamePage />} />
            
            {/* Authentication Pages */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* User Dashboard & Features */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/game-history" element={<GameHistoryPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/challenges" element={<ChallengesPage />} />
            
            {/* Help & Support */}
            <Route path="/help" element={<HelpPage />} />
            <Route path="/support" element={<SupportPage />} />
            
            {/* Legacy route for backward compatibility */}
            <Route path="/board" element={<GamePage />} />
            
            {/* لاحقًا */}
            {/* <Route path="/online" element={<OnlineGame />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}