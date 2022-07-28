import solveSudoku from './solver'
import generateSudoku from './generator'
import Board from './components/Board';
function App() {
  const size = 9;
  const sudoku = generateSudoku()
  return (
    <div className="App">
      <Board height = {size} width = {size} sudoku = {sudoku}>

      </Board>
    </div>
  );
}

export default App;
