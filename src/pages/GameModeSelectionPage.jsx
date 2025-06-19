import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../components/UI/Modal";
import { useLanguage } from "../contexts/LanguageContext";

export default function GameModeSelectionPage() {
  const [showModal, setShowModal] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleVsBotClick = () => {
    setShowModal(true);
  };

  const handleDifficultySelect = (level) => {
    setDifficulty(level);
    setShowModal(false);
    navigate(`/game?difficulty=${level}`);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 py-16">
      <h1 
        className="text-4xl font-bold drop-shadow"
        style={{ color: 'var(--text-theme)' }}
      >
        🎮 {t('chooseGameMode')}
      </h1>

      <div className="flex flex-col items-center gap-4 w-full max-w-xs">
        <button
          onClick={handleVsBotClick}
          className="w-full px-6 py-3 rounded-xl shadow text-lg font-semibold transition transform hover:scale-105"
          style={{
            backgroundColor: 'var(--line1-theme)',
            color: 'var(--bg-theme)',
            border: `2px solid var(--line-theme)`
          }}
        >
          🤖 {t('startVsBot')}
        </button>

        <button
          onClick={() => navigate("/online")}
          className="w-full px-6 py-3 rounded-xl shadow text-lg font-semibold transition transform hover:scale-105 opacity-60 cursor-not-allowed"
          style={{
            backgroundColor: 'var(--line-theme)',
            color: 'var(--bg-theme)',
            border: `2px solid var(--line1-theme)`
          }}
          disabled
        >
          🌐 {t('playerVsPlayer')}
        </button>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 
          className="text-xl font-bold mb-4 text-center"
          style={{ color: 'var(--text-theme)' }}
        >
          {t('selectDifficulty')}
        </h2>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleDifficultySelect("easy")}
            className="w-full px-4 py-2 rounded-lg font-semibold transition"
            style={{
              backgroundColor: 'var(--bg1-theme)',
              color: 'var(--text-theme)',
              border: `1px solid var(--line-theme)`
            }}
          >
            {t('easy')}
          </button>
          <button
            onClick={() => handleDifficultySelect("medium")}
            className="w-full px-4 py-2 rounded-lg font-semibold transition"
            style={{
              backgroundColor: 'var(--bg1-theme)',
              color: 'var(--text-theme)',
              border: `1px solid var(--line-theme)`
            }}
          >
            {t('medium')}
          </button>
          <button
            onClick={() => handleDifficultySelect("hard")}
            className="w-full px-4 py-2 rounded-lg font-semibold transition"
            style={{
              backgroundColor: 'var(--bg1-theme)',
              color: 'var(--text-theme)',
              border: `1px solid var(--line-theme)`
            }}
          >
            {t('hard')}
          </button>
        </div>
      </Modal>
    </div>
  );
}
