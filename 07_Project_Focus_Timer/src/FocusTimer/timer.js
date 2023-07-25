import state from './state.js'
import * as time from './elements.js'
import { reset } from './actions.js'
import { kitchenTimer } from './sounds.js'

export function countdown() {
    if(!state.isRunning) {
        return
    }

    let minutes = Number(el.minutes.textContent)
    let seconds = Number(el.seconds.textContent)

    seconds--

    if(seconds < 0) {
        seconds = 59
        minutes--
    }

    if (minutes < 0) {
        reset()
        kitchenTimer.play()
        return
    }

    updateDisplay(minutes, seconds)


    setTimeout(() => countdown(), 1000)

}



export function updateDisplay(minutes, seconds) {
    // Se minutes for null, insere state.minutes
    minutes = minutes ?? state.minutes
    seconds = seconds ?? state.seconds

    // padStart - preencha o começo
    time.minutes.textContent = String(minutes).padStart(2, "0")
    time.seconds.textContent = String(seconds).padStart(2, "0")

}