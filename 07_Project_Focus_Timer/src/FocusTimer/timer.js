import state from './state.js'
import * as elements from './elements.js'
import { reset } from './actions.js'
import { kitchenTimer } from './sounds.js'

export function countdown() {
    // Verifica se o estado está em running
    // momento de parada da recursão
    if(!state.isRunning) {
        return
    }

    let minutes = Number(elements.minutes.textContent)
    let seconds = Number(elements.seconds.textContent)

    seconds--

    // Quando os segundos fica menor do que zero
    if(seconds < 0) {
        seconds = 59
        minutes--
    }

    if (minutes < 0) {
        reset() // finaliza a aplicação
        kitchenTimer.play() // 
        return
    }

    // Atualiza os minutos e segundos
    updateDisplay(minutes, seconds)

    // Executa uma função depois de um determinado tempo
    // Recursiva e para quando clicar novamente
    setTimeout(() => countdown(), 1000)

}

export function updateDisplay(minutes, seconds) {
    // Se minutes for null, insere state.minutes
    minutes = minutes ?? state.minutes
    seconds = seconds ?? state.seconds

    // padStart - preencha o começo
    elements.minutes.textContent = String(minutes).padStart(2, "0")
    elements.seconds.textContent = String(seconds).padStart(2, "0")

}