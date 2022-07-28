import '../styles/Board.css'

export default function Board({sudoku}) {
    return (
    <div className="Board"> 
        {sudoku.map(row => 
        <div className="Board__row">
            {row.map(cell => 
            <span className="Board__cell">
                {cell.length ? cell.length == 1 ? 
                cell[0]
                :
                cell.map(num => <div className='Board__possibility'>{num}</div>)
                :
                cell != 0 && cell
                }
            </span>
            )}
        </div>
        )}
    </div>
    )
}

// function rearrange(sudoku){
//     let newS = []
//     for (var i = 0; i < 3; i++){
//         for (var j = 0; j < 3; j++){
//             let block = []
//             for (var y = 0; y < 3; y++){
//                 block.push(sudoku[].slice())
//             }
//         }
//     }
//     return newS
// }