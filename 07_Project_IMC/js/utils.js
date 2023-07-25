export function notANumber(value) {
    // isNaN verifica se não é um número 
    //ou value =="" porque espaço vazio é considerado um número
    return isNaN(value) || value == ""
}

export function calculateIMC(weight, height) {
    return (weight / ((height / 100) ** 2)).toFixed(2)
}
