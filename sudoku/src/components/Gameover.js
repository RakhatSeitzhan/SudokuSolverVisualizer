export default function Gameover({restart, solve}){
    return (
        <div className="Gameover">
            <div className="Gameover__card">Game over!</div>
            <button onClick={()=>restart()}>Restart</button>
            <button onClick={()=>solve()}>Solve</button>
        </div>
    )
}