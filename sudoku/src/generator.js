// return matrix of numbers
// 0 if the cell is empty

export default function generateSudoku(){
    const size = 9
    const board =
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
    const sudoku1 = board.map(row => row.map(item => item == "." ? 0 : Number(item)))
    let sudoku = init(size)
    // sudoku[0][0] = 1
    // sudoku[0][1] = 2
    // sudoku[0][2] = 3
    // sudoku[0][3] = 4
    // let possibilites = init(size)
    // for (var i = 0; i < size; i++){
    //     for (var j = 0; j < size; j++){
    //         if (sudoku[i][j] == 0){
    //             possibilites[i][j] = calcEntropy(sudoku,j,i)
    //         }
    //     }
    // }
    console.log(solve(sudoku1,2,0))
    return sudoku1
}

function solve1(sudoku){
    for (var i = 0; i < sudoku.length; i ++){
        for (var j = 0; j < sudoku.length; j ++){
            if (sudoku[i][j] == 0){
                const possibilites = calcEntropy(sudoku, j, i)
                if (possibilites.length == 0) return false 
                for (var k = 0; k < possibilites.length; k++){
                    sudoku[i][j] = possibilites[k]
                    console.log(j,i,possibilites, possibilites[k])
                    const result = solve([...sudoku])
                    if (result == false) continue
                    break
                }
                break
            }
        }
    }
    return sudoku
}
function solve(sudoku, x, y){

    let nx = x
    let ny = y

    while(true){
        if (sudoku[ny][nx] == 0 && !(nx == x && ny == y)) break
        nx = nx + 1
        if (nx == sudoku.length ){
            nx = 0
            ny = ny + 1
        }
    }

    const possibilites = calcEntropy(sudoku, x,y)
    console.log(x,y,possibilites,nx,ny)
    if (possibilites.length == 0) return false 
    if (x == sudoku.length-1  && y == sudoku.length-1 ) {
        sudoku[y][x] = possibilites[0]
        return true
    }
    for (var k = 0; k < possibilites.length; k++){
        sudoku[y][x] = possibilites[k]
        //console.log(x,y,possibilites, possibilites[k],nx,ny)
        const result = solve([...sudoku],nx,ny)
        if (result != false) return result
    }
    return false
}

function init(size){
    let sudoku = []
    for ( var i = 0; i < size; i++){
        let a = []
        for ( var j = 0; j < size; j++){
            // let pos = []
            // for ( var k = 1; k <= 0; k++){
            //     pos.push(k);
            // }
            a.push(0)
        }
        sudoku.push(a)
    }
    return sudoku
}

function reduceEntropy(sudoku, target, x,y){
    for (var i = 0; i < sudoku.length; i++){
        const order1 = sudoku[y][i].indexOf(target);
        if (order1 > -1) { 
            sudoku[y][i].splice(order1, 1)
        } 
        const order2 = sudoku[i][x].indexOf(target);
        if (order2 > -1) { 
            sudoku[i][x].splice(order2, 1)
        }
    }
    const bx = Math.floor(x/3)
    const by = Math.floor(y/3)
    for (var i = 0; i < 3; i++){
        for (var j = 0; j < 3; j++){
            const order = sudoku[by*3+i][bx*3+j].indexOf(target);
            if (order > -1) { 
                sudoku[by*3+i][bx*3+j].splice(order, 1)
            }
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function placeNumber(){

}
function calcEntropy(sudoku, x,y){
    let res = [1,2,3,4,5,6,7,8,9]
    for (var i = 0; i < sudoku.length; i++){
        if (sudoku[y][i] != 0){
            const index = res.indexOf(sudoku[y][i])
            if (index != -1) res.splice(index, 1)
        } 
        if (sudoku[i][x] != 0){
            const index = res.indexOf(sudoku[i][x])
            if (index != -1) res.splice(index, 1)
        }
    }
    return res
}