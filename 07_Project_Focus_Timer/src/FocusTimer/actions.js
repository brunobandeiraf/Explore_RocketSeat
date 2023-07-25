import state from './state.js'
import * as timer from './timer.js'
import * as elements from './elements.js'
import * as sounds from './sounds.js'

export function toggleRunning() {
    // Remove ou insere o nome 'running' na classe
    state.isRunning = document.documentElement.classList.toggle('running')

    timer.countdown()
    sounds.buttonPressAudio.play() // tocar áudio

}

export function reset() {
    state.isRunning = false
    document.documentElement.classList.remove('running')
    timer.updateDisplay()

    sounds.buttonPressAudio.play() // tocar áudio
    
}

export function set() {
    elements.minutes.setAttribute('contenteditable', true)
    elements.minutes.focus()

}

export function toggleMusic() {
    // Insere ou remove a classe music-on
    state.isMute = document.documentElement.classList.toggle('music-on')

    if(state.isMute) {
        sounds.bgAudio.play()
        return
    }

    sounds.bgAudio.pause()
    
}