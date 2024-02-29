const numberButtons = document.getElementsByClassName('number')
const operationButtons = document.getElementsByClassName('operation')
const toolButtons = document.getElementsByClassName('tool')
const resultNumber = document.getElementById('resultNumber')
const clearButton = document.getElementById('clearButton')
const equalsButton = document.getElementById('equals')
const toggleSignButton = document.getElementById('toggleSignButton')
const percentButton = document.getElementById('percentButton')
let operation = null
let firstNumber = null
let secondNumber = null
let checkpoint = false

// Initial functions execution
changeButtonColorOnClick(numberButtons, '#222222', '#333333')
changeButtonColorOnClick(toolButtons, '#858585', '#ACACAC')
changeButtonColorOnClick(operationButtons, '#e48c09', '#ff9f0a')
changeButtonColorOnClick(equalsButton, '#e48c09', '#ff9f0a')

checkIfActiveResultNumber()

// Event listeners
Array.from(numberButtons).forEach(button => {
    button.addEventListener('click', handleNumberButtonClick)
});

Array.from(operationButtons).forEach(button => {
    button.addEventListener('click', handleOperationButtonClick)
});

equalsButton.addEventListener('click', handleEqualsButtonClick)

clearButton.addEventListener('click', handleClearButtonClick)

percentButton.addEventListener('click', handlePercentButtonClick)

toggleSignButton.addEventListener('click', handleToggleSignButtonClick)


// Functions

// Change color on click function 
function changeButtonColorOnClick(buttons, firstColor, secondColor){
    Array.from(buttons).forEach(button => {
        button.addEventListener('mousedown', function(e){
            button.style.backgroundColor = firstColor
        });
    
        button.addEventListener('mouseup', function(e){
            button.style.backgroundColor = secondColor
        });
    });
}

// Check if result number is inactive function
function checkIfActiveResultNumber(){
    if(resultNumber.classList.contains('inactive')){
        resultNumber.innerText = "0"
    }
}

// Handle number button click function
function handleNumberButtonClick(e){
    resultNumber.classList.remove('inactive')
    checkIfActiveResultNumber()

    if(resultNumber.innerText.length >= 9){
        return
    }

    const clickedNumber = e.target.innerText
    if (checkpoint !== false) {
        resultNumber.innerText = clickedNumber
        checkpoint = false
    } else {
        if (resultNumber.innerText === '0') {
            resultNumber.innerText = clickedNumber
        } else {
            resultNumber.innerText += clickedNumber
        }
    }

    adjustFontSize(resultNumber.innerText.length)

}

// Handle operation button click function
function handleOperationButtonClick(e){
    if(operation !== null){
        handleEqualsButtonClick()
        firstNumber = resultNumber.innerText
        operation = e.target.innerText
        checkpoint = true
        return
    }
    firstNumber = resultNumber.innerText
    operation = e.target.innerText
    checkpoint = true
}

// Handle equals button click function
function handleEqualsButtonClick(e){
    secondNumber = resultNumber.innerText

    if(firstNumber !== null && secondNumber !== null && operation !== null){
        let result

        const num1 = parseFloat(firstNumber)
        const num2 = parseFloat(secondNumber)

        switch (operation) {
            case '+':
                result = num1 + num2
                break;
            case '-':
                result = num1 - num2
                break;
            case 'x':
                result = num1 * num2
                break;
            case '/':
                // Check if dividing by zero
                if (num2 === 0) {
                    result = 'Error'
                } else {
                    result = num1 / num2
                }
                break
            default:
                result = 'Error'
        }

        resultNumber.innerText = result

        firstNumber = null
        secondNumber = null
        operation = null
    }
}

// Handle clear button click function
function handleClearButtonClick(e){
    resultNumber.classList.add('inactive')
    checkIfActiveResultNumber()
}

// Handle percent button click function
function handlePercentButtonClick(e){
    let percent = resultNumber.innerText

    secondNumber = firstNumber / 100 * percent

    resultNumber.innerText = secondNumber
}

// Handle toggle sign button click function
function handleToggleSignButtonClick(e){
    let currentNumber = parseFloat(resultNumber.innerText)
    
    currentNumber = -currentNumber
    
    resultNumber.innerText = currentNumber.toString()
}

// Adjust font-size function
function adjustFontSize(numberLength) {
    const baseFontSize = 1
    const fontSizeStep = 0.1
    const threshold = 6

    if(numberLength >= 6){
        let calculatedFontSize = baseFontSize - (numberLength - threshold) * fontSizeStep
        resultNumber.style.fontSize = calculatedFontSize + 'em'
    } else {
        resultNumber.style.fontSize = baseFontSize + 'em'
    }
}
