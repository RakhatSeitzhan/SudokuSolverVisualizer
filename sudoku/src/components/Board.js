import '../styles/Board.css'
import '../styles/Gameover.css'
import useKeypress from 'react-use-keypress';
import { check, calcNum } from '../solver';
import CurrentCell from './CurrentCell';
export default function Board({ sudoku, initialSudoku, setCell, currentCell, setCurrentCell,subtractLive, gameover, lives, win, mode }) {
    const board = rearrange(sudoku)
    const changeNumber = (key) => {
        const target = key == 'Backspace' ? 0 : Number(key)
        const y = currentCell.y+(Math.floor(currentCell.id/3))*3
        const x = currentCell.x+(currentCell.id%3)*3
        if (initialSudoku[y][x] != 0) return
        if (target == 0 && initialSudoku[y][x] == 0 && sudoku[y][x] != 0) {
            setCell(target,x,y)
            return
        }
        if (mode == 'place'){
            if (!check(sudoku,target,x,y)) {
                if (lives-1 == 0){
                    gameover()
                }
                subtractLive()
                return
            }
            setCell(target,x,y)
            if (calcNum(sudoku)==81){
                win()
            }
        } else {
            let newArray = []
            if (Array.isArray(sudoku[y][x])) newArray = [...sudoku[y][x]]
            if (newArray.indexOf(target) == -1) newArray.push(target)
            setCell(newArray,x,y)
        }
    }
    const handleEnter = (blockId, x, y) => {
        setCurrentCell({id:blockId,x: x,y: y})
    }
    useKeypress(['1','2','3','4','5','6','7','8','9','Backspace'],(e) => {
        changeNumber(e.key)
    })
    
    return (
    <div className="Board"> 
        {board?.map((block, blockIndex) => {
            //styling each block depending on the index

            let borderStyle = " "
            if (blockIndex<6) borderStyle = borderStyle.concat(" Board__bb") 
            if ((blockIndex%3)!=2) borderStyle = borderStyle.concat(" Board__br") 

            return (
                <div className = {`Board__block${borderStyle}`} >
                    {block.map((row, y) =>  
                        row.map((cell, x) => 
                        {
                            // styling cells
                            let cellStyle = ""
                            const ty = y+(Math.floor(blockIndex/3))*3
                            const tx = x+(blockIndex%3)*3
                            const delay = 0.08
                            const animationStyling = {animation: `fadeIn 0.5s both ${(tx+ty)*delay}s`}
                            if (sudoku[ty][tx] != initialSudoku[ty][tx]) cellStyle = "Board__tempCell"
                            return (
                                <span 
                                    className={`Board__cell ${cellStyle}`} 
                                    onMouseEnter = {() => handleEnter(blockIndex, x, y)}
                                    style={animationStyling}
                                >
                                    {Array.isArray(cell) ? 
                                    cell.map(num => <div className='Board__possibility'>{num}</div>)
                                    :
                                    cell != 0 && cell
                                    }
                                </span>
                            )
                        }
                        
                        )
                    )}
                    
                </div>
            )
        }
            
        )}
        <CurrentCell currentCell={currentCell}/>
    </div>
    )
}

function rearrange(sudoku){
    let newS = []
    for (var i = 0; i < 3; i++){
        for (var j = 0; j < 3; j++){
            let block = []
            for (var y = 0; y < 3; y++){
                block.push(sudoku[i*3+y].slice(j*3,j*3+3))
            }
            newS.push(block)
        }
    }
    return newS
}
