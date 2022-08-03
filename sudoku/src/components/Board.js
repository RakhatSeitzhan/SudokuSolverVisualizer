import '../styles/Board.css'
import '../styles/Gameover.css'
import { useState } from 'react'
import useKeypress from 'react-use-keypress';
import { check, calcNum } from '../solver';
import CurrentCell from './CurrentCell';

export default function Board({ sudoku, initialSudoku, setCell, subtractLive, gameover, lives, win, mode }) {
    const [currentCell, setCurrentCell] = useState()
    const board = rearrange(sudoku)
    const changeNumber = (target) => {
        const y = currentCell.y+(Math.floor(currentCell.id/3))*3
        const x = currentCell.x+(currentCell.id%3)*3
        if (sudoku[y][x] != 0 && !Array.isArray(sudoku[y][x])) return
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
    useKeypress(['1','2','3','4','5','6','7','8','9'],(e) => {
        changeNumber(Number(e.key))
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
                            if (sudoku[ty][tx] != initialSudoku[ty][tx]) cellStyle = "Board__tempCell"
                            return (
                                <span className={`Board__cell ${cellStyle}`} onMouseEnter = {() => handleEnter(blockIndex, x, y)}>
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
