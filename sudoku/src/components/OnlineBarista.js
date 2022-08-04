import '../styles/OnlineBarista.css'
import { useState, useEffect } from 'react'
const coffeTypes = ['Americano','Cappuchino','Vanilla latte']
const teaTypes = ['Black','Green','Jasmine']
let userText = [
    ["Hello!" , "Hi", "..."],
    ["Coffee", "Tea"],
]
const actions = [
    {
        type: 'await',
        text: 'Hey!',
        options: ["Hello!" , "Hi", "..."],
    },
    {
        type: 'proceed',
        text: "I guess you are busy solving this dumb sudoku.",
        timer: 1000
    },
    {
        type: 'proceed',
        text: "It's funny though...",
        timer: 1000
    },
    {
        type: 'proceed',
        text: "I mean...",
        timer: 1000
    },
]
export default function(){
    const [messages, setMessages] = useState([])
    const [ actionIndex, setActionIndex ] = useState(0)
    const [options, setOptions] = useState()
    const addMessage = (text, user) => {
        setMessages([...messages, {text: text, user: user}])
    }
    const performAction = (action) => {
        if (action.type == 'await'){
            addMessage(action.text, 'barista')
            setOptions(action.options)
        } else {
            addMessage(action.text, 'barista')
            setTimeout(() => {
                setActionIndex(actionIndex+1)
                performAction(actions[actionIndex+1])
            }, action.timer)
        }
    }
    useEffect(()=>{
        performAction(actions[actionIndex])
    },[])
    const handleClick = () => {
        setActionIndex(actionIndex+1)
        performAction(actions[actionIndex+1])
    }
    return (
        <div className="Barista">
            <div className='Barista__chat'>
                {actionIndex}
                <div className='Barista__messages'>
                    {messages?.map(message => {
                        const styling = message.user == 'barista' ? 'barista' : 'user'
                        return (
                            <div className={`Barista__message ${styling}`}>{message.text}</div>
                        )
                    })}
                </div>
                <div className='Barista__options'>
                    {options?.map(text => (
                    <div className='Barista__option' onClick={handleClick}>{text}</div>
                    ))}
                </div>
            </div>
            
        </div>
    )
}