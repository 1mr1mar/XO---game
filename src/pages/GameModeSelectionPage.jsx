import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../components/UI/Modal";

export default function GameModeSelectionPage() {
  const [showModal, setShowModal] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const navigate = useNavigate();

  const handleVsBotClick = () => {
    setShowModal(true);
  };

  const handleDifficultySelect = (level) => {
    setDifficulty(level);
    setShowModal(false);
    navigate(`/game?difficulty=${level}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-4 bg-gradient-to-br from-blue-100 to-indigo-200">
      <h1 className="text-4xl font-bold text-gray-800">
        🎮 اختر وضع اللعب
      </h1>

      <div className="flex flex-col items-center gap-4 w-full max-w-xs">
        <button
          onClick={handleVsBotClick}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow text-lg font-semibold transition transform hover:scale-105"
        >
          🤖 ابدأ ضد الروبوت
        </button>

        <button
          onClick={() => navigate("/online")}
          className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow text-lg font-semibold transition transform hover:scale-105 opacity-60 cursor-not-allowed"
          disabled
        >
          🌐 لاعب ضد لاعب (قريبًا)
        </button>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">اختر مستوى الصعوبة</h2>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleDifficultySelect("easy")}
            className="w-full px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-semibold transition"
          >
            سهل
          </button>
          <button
            onClick={() => handleDifficultySelect("medium")}
            className="w-full px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-lg font-semibold transition"
          >
            متوسط
          </button>
          <button
            onClick={() => handleDifficultySelect("hard")}
            className="w-full px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-semibold transition"
          >
            صعب
          </button>
        </div>
      </Modal>
    </div>
  );
}
