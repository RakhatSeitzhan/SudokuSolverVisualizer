import Sudoku from './components/Sudoku';
import About from './components/About'
import Navbar from './components/Navbar';
import './App.css'
import Cup from './components/Cup';
import OnlineBarista from './components/OnlineBarista';
function App() {

  return (
    <div className="App">
      <Navbar/>
      <div className='App__sudokuContainer'>
        <Sudoku/>
        <div className='App__textContainer'>
          <div className='App__sudokuTitle'>How to play sudoku?</div>
          <div className='App__sudokuText'>
            It is very simple! Each row, column, and block (3x3) must contain the numbers from 1 to 9, without repetitions
          </div>
          <div className='App__sudokuText'>
            You can try to solve it yourself or see how the machine solves it
          </div>
          <br/><br/>

          <div className='App__sudokuTitle'>Does it help your mental health?</div>
          <div className='App__sudokuText'>
            Yes!
          </div>
          <div className='App__sudokuText'>
            Studies show that it improves concentration, helps to reduce anxiety and stress, improves memory and problem-solving skills!
          </div>
          <br/><br/>

          <div className='App__sudokuTitle'>What about eco-friendliness? </div>
          <div className='App__sudokuText'>
            It is 100% environmentally harmless!
          </div>
          <div className='App__sudokuText'>
            According to researches, solving soduku provides zero carbon emission and plastic waste!
          </div>
        </div>
      </div>

      <About/>
    </div>
  );
}

export default App;
