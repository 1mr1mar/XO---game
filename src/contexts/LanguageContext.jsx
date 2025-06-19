import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    // Game Mode Selection
    chooseGameMode: "Choose Game Mode",
    startVsBot: "Start vs Bot",
    playerVsPlayer: "Player vs Player (Coming Soon)",
    selectDifficulty: "Select Difficulty",
    easy: "Easy",
    medium: "Medium", 
    hard: "Hard",
    
    // Game Board
    gameTitle: "XO Game vs Bot 🤖",
    yourTurn: "Your turn now (X)",
    botPlaying: "Bot is playing...",
    congratulations: "Congratulations! You won",
    botWon: "Bot won! Try again",
    draw: "It's a draw!",
    playAgain: "Play Again",
    
    // Results Modal
    showList: "Show List",
    returnToMenu: "Return to Menu",
    playAgainModal: "Play Again",
    
    // Navigation
    home: "Home",
    gameHistory: "Game History",
    leaderboard: "Leaderboard",
    settings: "Settings",
    help: "Help",
    support: "Support",
    challenges: "Challenges",
    
    // Auth
    login: "Login",
    register: "Register",
    logout: "Logout",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    username: "Username",
    
    // Common
    close: "Close",
    save: "Save",
    cancel: "Cancel",
    loading: "Loading...",
    error: "Error",
    success: "Success"
  },
  
  ar: {
    // Game Mode Selection
    chooseGameMode: "اختر وضع اللعب",
    startVsBot: "ابدأ ضد الروبوت",
    playerVsPlayer: "لاعب ضد لاعب (قريبًا)",
    selectDifficulty: "اختر مستوى الصعوبة",
    easy: "سهل",
    medium: "متوسط",
    hard: "صعب",
    
    // Game Board
    gameTitle: "لعبة XO ضد الروبوت 🤖",
    yourTurn: "دورك الآن (X)",
    botPlaying: "الروبوت يلعب...",
    congratulations: "مبروك! أنت فزت",
    botWon: "الروبوت فاز! حاول مرة ثانية",
    draw: "تعادل!",
    playAgain: "لعب مرة أخرى",
    
    // Results Modal
    showList: "عرض القائمة",
    returnToMenu: "العودة للقائمة",
    playAgainModal: "لعب مرة أخرى",
    
    // Navigation
    home: "الرئيسية",
    gameHistory: "تاريخ اللعب",
    leaderboard: "المتصدرين",
    settings: "الإعدادات",
    help: "المساعدة",
    support: "الدعم",
    challenges: "التحديات",
    
    // Auth
    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    logout: "تسجيل الخروج",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    username: "اسم المستخدم",
    
    // Common
    close: "إغلاق",
    save: "حفظ",
    cancel: "إلغاء",
    loading: "جاري التحميل...",
    error: "خطأ",
    success: "نجح"
  },
  
  fr: {
    // Game Mode Selection
    chooseGameMode: "Choisir le Mode de Jeu",
    startVsBot: "Commencer contre le Bot",
    playerVsPlayer: "Joueur contre Joueur (Bientôt)",
    selectDifficulty: "Sélectionner la Difficulté",
    easy: "Facile",
    medium: "Moyen",
    hard: "Difficile",
    
    // Game Board
    gameTitle: "Jeu XO contre le Bot 🤖",
    yourTurn: "Votre tour maintenant (X)",
    botPlaying: "Le bot joue...",
    congratulations: "Félicitations! Vous avez gagné",
    botWon: "Le bot a gagné! Essayez encore",
    draw: "Match nul!",
    playAgain: "Rejouer",
    
    // Results Modal
    showList: "Voir la Liste",
    returnToMenu: "Retour au Menu",
    playAgainModal: "Rejouer",
    
    // Navigation
    home: "Accueil",
    gameHistory: "Historique des Jeux",
    leaderboard: "Classement",
    settings: "Paramètres",
    help: "Aide",
    support: "Support",
    challenges: "Défis",
    
    // Auth
    login: "Connexion",
    register: "S'inscrire",
    logout: "Déconnexion",
    email: "Email",
    password: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    username: "Nom d'utilisateur",
    
    // Common
    close: "Fermer",
    save: "Sauvegarder",
    cancel: "Annuler",
    loading: "Chargement...",
    error: "Erreur",
    success: "Succès"
  }
};

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState('ar'); // Default to Arabic

  const t = (key) => {
    return translations[currentLanguage][key] || key;
  };

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
    // Store in localStorage for persistence
    localStorage.setItem('language', lang);
  };

  // Load saved language on mount
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 