export default function generateSudoku(num){
    const sudoku = initS()
    generate(sudoku, 0,0,0)
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
function generate(sudoku, x,y ,num){
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
        const res = generate(sudoku,nx,ny,num+1)
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