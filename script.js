const display = document.querySelector(".calculator-input") // Calculator input classını aldım.
const keys = document.querySelector(".calculator-keys") //calculator keys kısmını çağırdık.


let displayValue = "0"
let firstValue =null
let operator = null
let waitingForSecondValue=false



function updateDisplay() {

    display.value=displayValue; // display.value bilgisi display value'ye ata.

}

updateDisplay()


keys.addEventListener("click", function(event) {   //Click eventi oluşturdum ve aşağıya tek tek butonları tanımladım. 

     const element = event.target

    if(!element.matches("button")) return //boşluk kısımlarını görmesin diye sadece butonu okuttum buton değilse returnle dedim
     console.log(element)


     if(element.classList.contains("operator")) { // Tek Tek buttonları ayarladım işte bu operator

        // console.log("operator: ", element.value)
        handleOperator(element.value) // bu kısımda operatoru tanımladık
        updateDisplay()
        return
     }
     if(element.classList.contains("decimal")) { // bu ondalık kısım

        // console.log("decimal: ", element.value)
        inputDecimal()
        updateDisplay()
        return
     }
     if(element.classList.contains("clear")) { // bu temizleme kısmı

        // console.log("clear: ", element.value)
        clear()
        updateDisplay()
        return
     }


    //  console.log("number: ", element.value) bu kısımsa sayıların olduğu yer.

    inputNumber(element.value)
    updateDisplay()
})

function inputNumber(num) {

    if(waitingForSecondValue) {
        displayValue= num
        waitingForSecondValue = false
    } else{
        displayValue = displayValue === '0' ? num : displayValue + num 

    }
    console.log(displayValue, firstValue, operator, waitingForSecondValue)

}


function inputDecimal() {

    if(!displayValue.includes('.')) {
        displayValue +='.'
    }
    
}

function clear() {

    displayValue = "0"
}

function handleOperator (nextOperator) {

    const value = parseFloat(displayValue)

    if(operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue ===null) {
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue, value, operator) 

            displayValue= `${parseFloat(result.toFixed(7))}`
            firstValue = result 
        
    }

    waitingForSecondValue = true
    operator = nextOperator

    console.log(displayValue, firstValue, operator, waitingForSecondValue)


}

function calculate(first, second, operator) {
    
    if(operator==="+") {
        return first + second
    } else if (operator ==="-") {
        return first - second
    } else if (operator ==="*") {
        return first * second
    } else if (operator==="/") {
        return first / second
    }

    return second
}