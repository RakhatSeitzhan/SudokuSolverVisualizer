import '../styles/Navbar.css'
import {FaCode} from 'react-icons/fa'
import {BsQuestion} from 'react-icons/bs'
import {BiJoystick} from 'react-icons/bi'

export default function (){
    return (
        <div className="Navbar">
            <div className='Navbar__title'>Sudoku Visualizer</div>
            <div className='Navbar__icons'>
                <div className='Navbar__iconContainer'><BiJoystick size={25}/></div>
                <div className='Navbar__iconContainer'><BsQuestion size={25}/></div>
                <div className='Navbar__iconContainer'><FaCode/></div>
            </div>
        </div>
    )
}