import state from './state.js'
import { controls } from './elements.js';
import * as actions from './actions.js'
import * as elements from './elements.js'
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
    // Quando estiver com o focus
    elements.minutes.addEventListener('focus', () => {
        elements.minutes.textContent = ""
    })

    // /\d/ só aceita números
    elements.minutes.onkeypress = (event) => /\d/.test(event.key)

    // blur -  perder o foco
    elements.minutes.addEventListener('blur', (event) => {
        // pega o texto do elemento
        let time = event.currentTarget.textContent

        // time é > 60, se sim, deixa 60, se não recebe time
        time = time > 60 ? 60 : time

        state.minutes = time
        state.seconds = 0

        updateDisplay() // atualiza o display
        elements.minutes.removeAttribute('contenteditable')
        // tira a opção de editar
    })
}