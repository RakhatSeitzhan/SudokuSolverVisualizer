import '../styles/Navbar.css'
import {FaCode} from 'react-icons/fa'
import {BsQuestion} from 'react-icons/bs'
import {BiJoystick} from 'react-icons/bi'

export default function (){
    return (
        <div className="Navbar">
            <div className='Navbar__title'>Sudoku Visualizer</div>
            <div className='Navbar__icons'>
                <a className='Navbar__iconContainer' href='https://sudokusolvervisualizer.web.app/'><BiJoystick size={25}/></a>
                <a className='Navbar__iconContainer' href=''><BsQuestion size={25}/></a>
                <a className='Navbar__iconContainer' href='https://github.com/RakhatSeitzhan/SudokuSolverVisualizer'><FaCode/></a>
            </div>
        </div>
    )
}