const screen1 = document.querySelector(".screen1")
const screen2 = document.querySelector(".screen2")
const btnTry = document.querySelector("#btnTry")
const btnReset = document.querySelector("#btnReset")
let randomNumber = Math.round(Math.random() * 10)
let xAttempts = 1

// Eventos
btnTry.addEventListener('click', handleTryClick)
btnReset.addEventListener('click', handResetClick)
document.addEventListener('keydown', function(e){
    if(e.key == 'Enter' && screen1.classList.contains('hide')){
        handResetClick()
    }
})

// Funções callback
function handleTryClick(event){
    event.preventDefault() // Não faça o padrão

    const inputNumber = document.querySelector('#inputNumber')
    
    if(Number(inputNumber.value) == randomNumber){
        screen1.classList.add("hide")
        screen2.classList.remove("hide")
        
        screen2
        .querySelector("h2")
        .innerHTML = `Acertou em ${xAttempts} tentativas`
        //console.log("Acertou em " +xAttempts +" tentativas.")
    }
    inputNumber.value = ""
    xAttempts++
}

function handResetClick(){
    screen1.classList.remove("hide")
    screen2.classList.add("hide")
    //screen1.classList.toggle("hide")
    //toggle faz a troca automática, ou seja, 
    //se tem, tira. Se não tem, coloca
    xAttempts = 1
    randomNumber = Math.round(Math.random() * 10)
}
