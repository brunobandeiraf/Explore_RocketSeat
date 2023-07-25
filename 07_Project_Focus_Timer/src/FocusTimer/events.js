import state from './state.js'
import { controls } from './elements.js';
import * as actions from './actions.js'
import * as el from './elements.js'
import { updateDisplay } from './timer.js';



export function registerControls() {
    controls.addEventListener('click', (event) => {
        // target - alvo
        // dataset - 
        const action = event.target.dataset.action
        
        // Para se clicar em algum local não mapeado
        // Verifica se a função existe
        if(typeof actions[action] != "function") {
            return
        }

        // Identifica os controladores e envia o nome da função
        actions[action]()
        // Entra no módulo actions

    })

}

export function setMinutes() {
 el.minutes.addEventListener('focus', () => {
    el.minutes.textContent = ""
 })

 el.minutes.onkeypress = (event) => /\d/.test(event.key)

 el.minutes.addEventListener('blur', (event) => {
    let time = event.currentTarget.textContent

    time = time > 60 ? 60 : time

    state.minutes = time
    state.seconds = 0

    updateDisplay()
    el.minutes.removeAttribute('contenteditable')
 })
}