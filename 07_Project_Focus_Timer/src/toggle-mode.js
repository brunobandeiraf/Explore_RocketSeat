let darkMode = true
const buttonToggle = document.getElementById('toggle-mode')

buttonToggle.addEventListener('click', (event) => {
    // toggle tira ou coloca - realiza o oposto
    document.documentElement.classList.toggle('light')
    
    // Captura o modo
    const mode = darkMode ? 'light' : 'dark'
    
    event.currentTarget.querySelector('span').textContent = `${mode} mode ativado!`
    
    darkMode = !darkMode // o contrário do valor atual
})