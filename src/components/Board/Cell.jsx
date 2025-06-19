import { motion } from 'framer-motion';

export default function Cell({ value, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="w-20 h-20 md:w-24 md:h-24 border-2 text-4xl md:text-5xl font-extrabold flex items-center justify-center rounded-xl shadow hover:opacity-80 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2"
      style={{
        borderColor: 'var(--line1-theme)',
        backgroundColor: 'var(--bg-theme)',
        color: 'var(--text-theme)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        focusRingColor: 'var(--line-theme)'
      }}
      whileTap={{ scale: 0.92 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {value}
    </motion.button>
  );
}
