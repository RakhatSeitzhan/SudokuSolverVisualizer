import "../styles/Sudoku.css"

import { useState } from 'react'

import Board from "./Board"
import Gameover from "./Gameover"
import generateSudoku from '../generator'
import solveSudoku from '../solver';
import {FaHeart} from 'react-icons/fa'
import ToolBar from "./ToolBar"
export default function Sudoku(){
    const [ sudoku, setSudoku ] = useState(generateSudoku(40))
    const [ solved, setSolved ] = useState(solveSudoku(JSON.parse(JSON.stringify(sudoku)))) //this is for cloning
    const [ lives, setLives ] = useState(3)
    const [ isOver, setIsOver ] = useState(false)
    const [ mode, setMode ] = useState('place')
    const [currentCell, setCurrentCell] = useState()
    const [currentSudoku, setCurrentSudoku] = useState(JSON.parse(JSON.stringify(sudoku)))
    const subtractLive = () => setLives(lives-1)
    const gameover = () => setIsOver(true)
    const win = () => {

    }
    const restart = () => {
        setCurrentSudoku(JSON.parse(JSON.stringify(sudoku)))
        setIsOver(false)
        setLives(3)
    }
    const newGame = () => {
        const newSudoku = generateSudoku(40)
        setSudoku(newSudoku)
        setCurrentSudoku(JSON.parse(JSON.stringify(newSudoku)))
        setIsOver(false)
        setLives(3)
        setSolved(solveSudoku(JSON.parse(JSON.stringify(newSudoku))))
    }
    const solve = (setIsSolving) => {
        const speed = 40
        let i = 0
        const intervalID = setInterval(() => {
            const cell = {
                id: Math.floor(solved[1][i].pos[0]/3)+Math.floor(solved[1][i].pos[1]/3)*3, 
                x: solved[1][i].pos[0]%3, 
                y: solved[1][i].pos[1]%3
            }
            setCurrentCell(cell)
            setCell(solved[1][i].value, solved[1][i].pos[0], solved[1][i].pos[1])
            i++
            if (i >= solved[1].length){
                clearInterval(intervalID)
                setIsSolving(false)
            } 
        }, speed)
        return intervalID
    }
    const setCell = (target,x,y) => {
        let newSudoku = [...currentSudoku] 
        newSudoku[y][x] = target
        setCurrentSudoku(newSudoku)
    }
    
    return (
        <div className="Sudoku">
            {isOver && <Gameover/>}
            <div className="Sudoku__left">
                <Board 
                    win = {win}
                    lives = {lives} 
                    gameover = {gameover} 
                    subtractLive = {subtractLive} 
                    sudoku = {currentSudoku}
                    setCell = {setCell}
                    initialSudoku = {sudoku}
                    mode = {mode}
                    currentCell = {currentCell}
                    setCurrentCell = {setCurrentCell} 
                />
                <div className="Sudoku__bar">
                    <div className="Sudoku__heartContainer">
                        <FaHeart className="heart" size={22} color={lives>=1 ? 'rgb(250,70,70)' : 'rgb(225,225,225)'}/>
                        <FaHeart className="heart" size={22} color={lives>=2 ? 'rgb(250,70,70)' : 'rgb(225,225,225)'}/>
                        <FaHeart className="heart" size={22} color={lives>=3 ? 'rgb(250,70,70)' : 'rgb(225,225,225)'}/>
                    </div>
                </div>
            </div>
            <ToolBar mode = {mode} setMode = {setMode} solve = {solve} restart = {restart} newGame = {newGame}/>
        </div>
    )
}