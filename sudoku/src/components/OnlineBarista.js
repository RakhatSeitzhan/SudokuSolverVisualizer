import '../styles/OnlineBarista.css'
import { useState, useEffect, useRef } from 'react'
import { MdCoffeeMaker } from 'react-icons/md'
import actions from './actions'


export default function(){
    const [messages, setMessages] = useState([])
    const [actionIndex, setActionIndex] = useState(0)
    const [options, setOptions] = useState()
    const addMessage = (text, user) => {
        setMessages([...messages, {text: text, user: user}])
    }
    useEffect(()=>{
        if (actionIndex == actions.length) return
        const action = actions[actionIndex]
        let timer
        if (action.type == 'await'){
            addMessage(action.text, 'barista')
            setOptions(action.options)
        } else if (action.type == 'proceed') {
            addMessage(action.text, 'barista')
            setTimeout(() => {
                setActionIndex(actionIndex+1)
            }, action.timer)
        }
        return timer 
    }, [actionIndex])
    const handleClick = text => {
        addMessage(text, 'user')
        setOptions([])
        setTimeout(() => {
            setActionIndex(actionIndex+1)
        }, actions[actionIndex].timer)
    }
    return (
        <div className="Barista">
            <div className='Barista__chat'>
                <div className='Barista__title'>
                    <div className='Barista__icon'>
                        <MdCoffeeMaker/>
                    </div>
                    Online barista
                </div>
                <div className='Barista__messages'>
                    {messages?.map(message => {
                        return (
                            <span className={`Barista__message ${message.user}`}>{message.text}</span>
                        )
                    })}
                </div>
                <div className='Barista__options'>
                    {options?.map(text => (
                    <div className='Barista__option' onClick={() => handleClick(text)}>{text}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}

