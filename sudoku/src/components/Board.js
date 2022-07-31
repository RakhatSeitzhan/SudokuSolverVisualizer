import '../styles/Board.css'
import '../styles/Gameover.css'
import { useState, useEffect } from 'react'
import useKeypress from 'react-use-keypress';
import { check, calcNum } from '../solver';

export default function Board({ sudoku, setCell, subtractLive, gameover, lives, win }) {
    const [currentCell, setCurrentCell] = useState()
    const board = rearrange(sudoku)
    const changeNumber = (target) => {
        const y = currentCell.y+(Math.floor(currentCell.id/3))*3
        const x = currentCell.x+(currentCell.id%3)*3
        if (sudoku[y][x] != 0) return
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
                        <span className="Board__cell" onMouseEnter = {() => handleEnter(blockIndex, x, y)}>
                            {Array.isArray(cell) ? 
                            cell.map(num => <div className='Board__possibility'>{num}</div>)
                            :
                            cell != 0 && cell
                            }
                        </span>
                        )
                    )}
                </div>
            )
        }
            
        )}
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

// export default function Board({ sudoku, subtractLive, gameover, lives, win }) {
//     const [currentCell, setCurrentCell] = useState()
//     const [currentSudoku, setCurrentSudoku] = useState(sudoku)
//     const board = rearrange(currentSudoku)
//     useEffect(()=>{
//         setCurrentSudoku(sudoku)
//     },[sudoku])
//     const changeNumber = (target) => {
//         const y = currentCell.y+(Math.floor(currentCell.id/3))*3
//         const x = currentCell.x+(currentCell.id%3)*3
//         if (currentSudoku[y][x] != 0) return
//         if (!check(currentSudoku,target,x,y)) {
//             if (lives-1 == 0){
//                 gameover()
//             }
//             subtractLive()
//             return
//         }
//         let newSudoku = [...currentSudoku] 
//         newSudoku[currentCell.y+(Math.floor(currentCell.id/3))*3][currentCell.x+(currentCell.id%3)*3] = target
//         setCurrentSudoku(newSudoku)
//         if (calcNum(sudoku)==81){
//             win()
//         }
//     }
//     const handleEnter = (blockId, x, y) => {
//         setCurrentCell({id:blockId,x: x,y: y})
//     }
//     useKeypress(['1','2','3','4','5','6','7','8','9'],(e) => {
//         changeNumber(Number(e.key))
//     })
    
//     return (
//     <div className="Board"> 
//         {board?.map((block, blockIndex) => {
//             //styling each block depending on the index

//             let borderStyle = " "
//             if (blockIndex<6) borderStyle = borderStyle.concat(" Board__bb") 
//             if ((blockIndex%3)!=2) borderStyle = borderStyle.concat(" Board__br") 

//             return (
//                 <div className = {`Board__block${borderStyle}`} >
//                     {block.map((row, y) =>  
//                         row.map((cell, x) => 
//                         <span className="Board__cell" onMouseEnter = {() => handleEnter(blockIndex, x, y)}>
//                             {Array.isArray(cell) ? 
//                             cell.map(num => <div className='Board__possibility'>{num}</div>)
//                             :
//                             cell != 0 && cell
//                             }
//                         </span>
//                         )
//                     )}
//                 </div>
//             )
//         }
            
//         )}
//     </div>
//     )
// }

// function rearrange(sudoku){
//     let newS = []
//     for (var i = 0; i < 3; i++){
//         for (var j = 0; j < 3; j++){
//             let block = []
//             for (var y = 0; y < 3; y++){
//                 block.push(sudoku[i*3+y].slice(j*3,j*3+3))
//             }
//             newS.push(block)
//         }
//     }
//     return newS
// }