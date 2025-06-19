import { motion } from 'framer-motion';

export default function Cell({ value, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="w-20 h-20 md:w-24 md:h-24 border-2 border-blue-400 text-4xl md:text-5xl font-extrabold flex items-center justify-center bg-gradient-to-br from-white to-blue-50 rounded-xl shadow hover:bg-blue-100 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400"
      whileTap={{ scale: 0.92 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {value}
    </motion.button>
  );
}
