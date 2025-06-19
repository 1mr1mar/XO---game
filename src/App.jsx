import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameModeSelectionPage from './pages/GameModeSelectionPage';
import Board from './components/Board/Board';
// import OnlineGame from './pages/OnlineGamePage'; // لاحقًا

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Routes>
          <Route path="/" element={<GameModeSelectionPage />} />
          <Route path="/game" element={<Board />} />
          {/* لاحقًا */}
          {/* <Route path="/online" element={<OnlineGame />} /> */}
        </Routes>
      </div>
    </Router>
  );
}