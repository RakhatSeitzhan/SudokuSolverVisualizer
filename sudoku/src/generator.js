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
const board1 =
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
    const sudoku1 = board1.map(row => row.map(item => item == "." ? 0 : Number(item)))
    const res = solve2(sudoku1, 2, 0, calcNum(sudoku1))
   
    if (res == false) return sudoku1
    return res
}
function make(){
    let pos = init()
    for (var i = 0; i<81; i++){
        const [x,y] = choose(pos)
        const index = getRandomInt(pos[y][x].length-1)
        const val = pos[y][x][index]
        reduceEntropy(pos,pos[y][x][index],x,y)
        pos[y][x] = [val]
    }
    return pos
}
function choose(pos){
    let minx = 0
    let miny = 0
    for (var i = 0; i<pos.length; i++){
        for (var j = 0; j<pos.length; j++){
            if (pos[i][j].length == 1) continue
            if (pos[miny][minx].length >= pos[i][j].length){
                miny = i
                minx = j
            }
        }
    }
    return [minx, miny]
}
function init(){
    let res = []
    for (var i = 0; i<9; i++){
        let row = []
        for (var j = 0; j<9; j++){
            row.push([1,2,3,4,5,6,7,8,9])
        }
        res.push(row)
    }
    return res
}
function solve2(sudoku, x,y,num){
    if (num == 81) {
        return sudoku
    }
    let nx = x
    let ny = y
    while(true){
        if (ny >= sudoku.length) break
        if (sudoku[ny][nx] == 0 && !(nx == x && ny == y)) break
        nx = nx + 1
        if (nx == sudoku.length ){
            nx = 0
            ny = ny + 1
        }
    }
    
    for (var i = 1; i <= 9; i++){
        if (check(sudoku, i, x,y)){
            sudoku[y][x] = i
            const res = solve2(sudoku, nx,ny,num+1)
            if (res != false) return res
        }
    }
    sudoku[y][x] = 0
    return false
}
function calcNum(sudoku){
    let res = 0
    for (var i = 0; i<sudoku.length; i++){
        for (var j = 0; j<sudoku.length; j++){
            if (sudoku[i][j] != 0) res++ 
        }
    }
    return res
}
function check(sudoku, target, x,y){
    for (var i = 0; i < sudoku.length; i++){
        if (sudoku[y][i] == target || sudoku[i][x] == target) {
            return false
        }
    }
    const bx = Math.floor(x/3)
    const by = Math.floor(y/3)
    for (var i = 0; i < 3; i++){
        for (var j = 0; j < 3; j++){
            if (sudoku[by*3+i][bx*3+j] == target) return false
        }
    }
    return true
}

function reduceEntropy(sudoku, target, x,y){
    for (var i = 0; i < sudoku.length; i++){
        if (Array.isArray(sudoku[y][i])){
            const order1 = sudoku[y][i].indexOf(target);
            if (order1 > -1) { 
                sudoku[y][i].splice(order1, 1)
            } 
        }
        if (Array.isArray(sudoku[i][x])){
            const order2 = sudoku[i][x].indexOf(target);
            if (order2 > -1) { 
                sudoku[i][x].splice(order2, 1)
            }
        }
    }
    const bx = Math.floor(x/3)
    const by = Math.floor(y/3)
    for (var i = 0; i < 3; i++){
        for (var j = 0; j < 3; j++){
            if (!Array.isArray(sudoku[by*3+i][bx*3+j])) continue
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
    const bx = Math.floor(x/3)
    const by = Math.floor(y/3)
    for (var i = 0; i < 3; i++){
        for (var j = 0; j < 3; j++){
            const order = res.indexOf(sudoku[by*3+i][bx*3+j])
            if (order > -1) { 
                res.splice(order, 1)
            }
        }
    }
    return res
}