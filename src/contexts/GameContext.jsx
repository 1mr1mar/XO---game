import React, { createContext, useContext, useReducer, useEffect } from 'react';
import calculateWinner from '../utils/calculateWinner';

// Game action types
const GAME_ACTIONS = {
  MAKE_MOVE: 'MAKE_MOVE',
  RESET_GAME: 'RESET_GAME',
  SET_DIFFICULTY: 'SET_DIFFICULTY',
  SET_WINNER: 'SET_WINNER',
  UPDATE_STATS: 'UPDATE_STATS',
  SET_GAME_MODE: 'SET_GAME_MODE',
  SET_PLAYER_TURN: 'SET_PLAYER_TURN',
  SET_BOT_THINKING: 'SET_BOT_THINKING',
  ADD_GAME_TO_HISTORY: 'ADD_GAME_TO_HISTORY',
  CLEAR_HISTORY: 'CLEAR_HISTORY',
  SET_SOUND_ENABLED: 'SET_SOUND_ENABLED',
};

// Initial game state
const initialState = {
  // Game board and state
  board: Array(9).fill(null),
  isPlayerTurn: true,
  winner: null,
  isGameOver: false,
  botThinking: false,
  
  // Game settings
  difficulty: 'easy', // 'easy', 'medium', 'hard'
  gameMode: 'singleplayer', // 'singleplayer', 'multiplayer', 'ai-vs-ai'
  soundEnabled: true,
  
  // Game statistics
  stats: {
    wins: 0,
    losses: 0,
    draws: 0,
    totalGames: 0,
    winRate: 0,
  },
  
  // Game history
  gameHistory: [],
  
  // Bot move delay (for visual effect)
  botMoveDelay: 500,
};

// Game reducer
function gameReducer(state, action) {
  switch (action.type) {
    case GAME_ACTIONS.MAKE_MOVE:
      const newBoard = [...state.board];
      newBoard[action.payload.index] = action.payload.player;
      return {
        ...state,
        board: newBoard,
        isPlayerTurn: !state.isPlayerTurn,
      };
      
    case GAME_ACTIONS.RESET_GAME:
      return {
        ...state,
        board: Array(9).fill(null),
        isPlayerTurn: true,
        winner: null,
        isGameOver: false,
        botThinking: false,
      };
      
    case GAME_ACTIONS.SET_DIFFICULTY:
      return {
        ...state,
        difficulty: action.payload,
      };
      
    case GAME_ACTIONS.SET_WINNER:
      return {
        ...state,
        winner: action.payload,
        isGameOver: true,
      };
      
    case GAME_ACTIONS.UPDATE_STATS:
      const { result } = action.payload;
      const newStats = { ...state.stats };
      
      if (result === 'X') {
        newStats.wins++;
      } else if (result === 'O') {
        newStats.losses++;
      } else if (result === 'draw') {
        newStats.draws++;
      }
      
      newStats.totalGames = newStats.wins + newStats.losses + newStats.draws;
      newStats.winRate = newStats.totalGames > 0 ? (newStats.wins / newStats.totalGames) * 100 : 0;
      
      return {
        ...state,
        stats: newStats,
      };
      
    case GAME_ACTIONS.SET_GAME_MODE:
      return {
        ...state,
        gameMode: action.payload,
      };
      
    case GAME_ACTIONS.SET_PLAYER_TURN:
      return {
        ...state,
        isPlayerTurn: action.payload,
      };
      
    case GAME_ACTIONS.SET_BOT_THINKING:
      return {
        ...state,
        botThinking: action.payload,
      };
      
    case GAME_ACTIONS.ADD_GAME_TO_HISTORY:
      return {
        ...state,
        gameHistory: [action.payload, ...state.gameHistory].slice(0, 50), // Keep last 50 games
      };
      
    case GAME_ACTIONS.CLEAR_HISTORY:
      return {
        ...state,
        gameHistory: [],
      };
      
    case GAME_ACTIONS.SET_SOUND_ENABLED:
      return {
        ...state,
        soundEnabled: action.payload,
      };
      
    default:
      return state;
  }
}

// Create context
const GameContext = createContext();

// Game provider component
export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Load stats from localStorage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem('xo-game-stats');
    const savedHistory = localStorage.getItem('xo-game-history');
    const savedSettings = localStorage.getItem('xo-game-settings');
    
    if (savedStats) {
      const stats = JSON.parse(savedStats);
      dispatch({ type: GAME_ACTIONS.UPDATE_STATS, payload: { result: null, stats } });
    }
    
    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      history.forEach(game => {
        dispatch({ type: GAME_ACTIONS.ADD_GAME_TO_HISTORY, payload: game });
      });
    }
    
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      if (settings.difficulty) {
        dispatch({ type: GAME_ACTIONS.SET_DIFFICULTY, payload: settings.difficulty });
      }
      if (settings.soundEnabled !== undefined) {
        dispatch({ type: GAME_ACTIONS.SET_SOUND_ENABLED, payload: settings.soundEnabled });
      }
    }
  }, []);

  // Save stats to localStorage when they change
  useEffect(() => {
    localStorage.setItem('xo-game-stats', JSON.stringify(state.stats));
  }, [state.stats]);

  // Save history to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('xo-game-history', JSON.stringify(state.gameHistory));
  }, [state.gameHistory]);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('xo-game-settings', JSON.stringify({
      difficulty: state.difficulty,
      soundEnabled: state.soundEnabled,
    }));
  }, [state.difficulty, state.soundEnabled]);

  // Bot AI logic
  const getBotMove = (board, difficulty) => {
    const emptyIndices = board
      .map((cell, idx) => (cell === null ? idx : null))
      .filter((val) => val !== null);
      
    if (emptyIndices.length === 0) return null;
    
    if (difficulty === 'easy') {
      return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }
    
    if (difficulty === 'medium') {
      // 50% chance to play optimally, 50% random
      if (Math.random() < 0.5) {
        // Optimal move (like hard)
        for (let idx of emptyIndices) {
          const testBoard = [...board];
          testBoard[idx] = 'O';
          if (calculateWinner(testBoard) === 'O') return idx;
          testBoard[idx] = 'X';
          if (calculateWinner(testBoard) === 'X') return idx;
        }
      }
      // Otherwise random
      return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }
    
    // Hard: always play optimally
    for (let idx of emptyIndices) {
      const testBoard = [...board];
      testBoard[idx] = 'O';
      if (calculateWinner(testBoard) === 'O') return idx;
      testBoard[idx] = 'X';
      if (calculateWinner(testBoard) === 'X') return idx;
    }
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  };

  // Game actions
  const makeMove = (index, player = 'X') => {
    if (state.board[index] !== null || state.winner || state.botThinking) return false;
    
    dispatch({ type: GAME_ACTIONS.MAKE_MOVE, payload: { index, player } });
    return true;
  };

  const resetGame = () => {
    dispatch({ type: GAME_ACTIONS.RESET_GAME });
  };

  const setDifficulty = (difficulty) => {
    dispatch({ type: GAME_ACTIONS.SET_DIFFICULTY, payload: difficulty });
  };

  const setGameMode = (mode) => {
    dispatch({ type: GAME_ACTIONS.SET_GAME_MODE, payload: mode });
  };

  const setSoundEnabled = (enabled) => {
    dispatch({ type: GAME_ACTIONS.SET_SOUND_ENABLED, payload: enabled });
  };

  const clearHistory = () => {
    dispatch({ type: GAME_ACTIONS.CLEAR_HISTORY });
  };

  const playSound = (soundName) => {
    if (!state.soundEnabled) return;
    
    const audio = new Audio(`/sounds/${soundName}.mp3`);
    audio.play().catch(e => console.log('Audio play failed:', e));
  };

  // Check for winner after each move
  useEffect(() => {
    const result = calculateWinner(state.board);
    if (result && !state.winner) {
      dispatch({ type: GAME_ACTIONS.SET_WINNER, payload: result });
      dispatch({ type: GAME_ACTIONS.UPDATE_STATS, payload: { result } });
      
      // Add game to history
      const gameRecord = {
        id: Date.now(),
        date: new Date().toISOString(),
        result,
        difficulty: state.difficulty,
        gameMode: state.gameMode,
        board: [...state.board],
      };
      dispatch({ type: GAME_ACTIONS.ADD_GAME_TO_HISTORY, payload: gameRecord });
      
      // Play sound
      if (result === 'X') {
        playSound('win');
      } else if (result === 'O') {
        playSound('lose');
      } else if (result === 'draw') {
        playSound('draw');
      }
    }
  }, [state.board, state.winner, state.soundEnabled]);

  // Bot move logic
  useEffect(() => {
    if (!state.isPlayerTurn && !state.winner && state.gameMode === 'singleplayer') {
      dispatch({ type: GAME_ACTIONS.SET_BOT_THINKING, payload: true });
      
      const timer = setTimeout(() => {
        const botMove = getBotMove(state.board, state.difficulty);
        if (botMove !== null) {
          makeMove(botMove, 'O');
        }
        dispatch({ type: GAME_ACTIONS.SET_BOT_THINKING, payload: false });
      }, state.botMoveDelay);
      
      return () => clearTimeout(timer);
    }
  }, [state.isPlayerTurn, state.board, state.winner, state.gameMode, state.difficulty]);

  const value = {
    // State
    ...state,
    
    // Actions
    makeMove,
    resetGame,
    setDifficulty,
    setGameMode,
    setSoundEnabled,
    clearHistory,
    playSound,
    
    // Computed values
    isGameActive: !state.winner && state.board.some(cell => cell === null),
    currentPlayer: state.isPlayerTurn ? 'X' : 'O',
    emptyCells: state.board.filter(cell => cell === null).length,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

// Custom hook to use game context
export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

export default GameContext;
