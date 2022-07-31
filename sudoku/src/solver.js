export default function solveSudoku(sudoku){
    let startx = 0, starty = 0;
    const steps = []
    while(sudoku[starty][startx] != 0){
        startx++
        if (startx > 8){
            startx = 0
            starty++
        }
    }
    const res = solve(sudoku, startx, starty, calcNum(sudoku), steps)
    if (res == false) return [sudoku, steps]
    return [res, steps]
}

function solve(sudoku, x,y,num, steps){
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
            steps.push({value: i, pos: [x,y] })
            sudoku[y][x] = i
            const res = solve(sudoku, nx,ny,num+1, steps)
            if (res != false) return res
        }
    }
    sudoku[y][x] = 0
    return false
}
export function calcNum(sudoku){
    let res = 0
    for (var i = 0; i<sudoku.length; i++){
        for (var j = 0; j<sudoku.length; j++){
            if (sudoku[i][j] != 0) res++ 
        }
    }
    return res
}
export function check(sudoku, target, x,y){
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