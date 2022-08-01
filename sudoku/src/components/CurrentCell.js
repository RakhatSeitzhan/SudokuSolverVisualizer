import { useState, useEffect, useRef } from 'react'
import '../styles/CurrentCell.css'
export default function({ currentCell }){
    const size = 50 // in pixels
    const lineSize = 1 // in pixels

    let x = (currentCell?.x+(currentCell?.id%3)*3)*size
    let y = (currentCell?.y+(Math.floor(currentCell?.id/3))*3)*size
    x = x + Math.floor(x/150)*lineSize
    y = y + Math.floor(y/150)*lineSize
    const styling = {transform: `translate(${x}px, ${y}px)`}
    return (
        <div style={styling} className="CurrentCell">
        </div>
    )
}