export default function calculateWinner(board) {
    const lines = [
      [0, 1, 2], // الصفوف
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // الأعمدة
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // الأقطار
      [2, 4, 6],
    ];
  
    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // 'X' أو 'O'
      }
    }
  
    // لو كل الخانات مليانة بدون فائز → تعادل
    if (board.every((cell) => cell !== null)) {
      return 'draw';
    }
  
    // اللعبة ما زالت مستمرة
    return null;
  }
  