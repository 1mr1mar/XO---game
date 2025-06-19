import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import GameModeSelectionPage from './pages/GameModeSelectionPage';
import Board from './components/Board/Board';
import LoginForm from './components/Forms/LoginForm';
import RegisterForm from './components/Forms/RegisterForm';
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
            <Route path="/" element={<GameModeSelectionPage />} />
            <Route path="/game" element={<Board />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            {/* لاحقًا */}
            {/* <Route path="/online" element={<OnlineGame />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}