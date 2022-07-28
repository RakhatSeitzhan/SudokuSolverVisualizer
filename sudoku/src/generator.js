export default function generateSudoku(){
    const size = 9
    const board = generate(20)
    const sudoku = board.map(row => row.map(item => item == "." ? 0 : Number(item)))
    let startx = 0, starty = 0;
    while(sudoku[starty][startx] != 0){
        startx++
        if (startx > 8){
            startx = 0
            starty++
        }
    }
    const res = solve2(sudoku, startx, starty, calcNum(sudoku))
    if (res == false) return sudoku
    return res
}
function generate(num){
    const sudoku = initS()
    generateRecursive(sudoku, 0,0,0)
    for (var i = 0; i<num; i++){
        let x = getRandomInt(8)
        let y = getRandomInt(8)
        while(sudoku[y][x] == 0){
            y = getRandomInt(8)
            x = getRandomInt(8)
        }
        sudoku[y][x] = 0
    }
    return sudoku
}
function generateRecursive(sudoku, x,y ,num){
    if (num == 81){
        return sudoku
    }
    const pos = calcEntropy(sudoku,x,y)
    if (pos.length == 0) return false
    const nx = x + 1 == 9 ? 0 : x+1
    const ny = x + 1 == 9 ? y+1 : y
    while(pos.length > 0){
        const index = getRandomInt(pos.length-1)
        sudoku[y][x] = pos[index]
        const res = generateRecursive(sudoku,nx,ny,num+1)
        if (res == false){
            pos.splice(index,1)
        } else {
            return res
        }
    }
    sudoku[y][x] = 0
    return false 
}
function initS(){
    let res = []
    for (var i = 0; i<9; i++){
        let row = []
        for (var j = 0; j<9; j++){
            row.push(0)
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