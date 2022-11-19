"use strict";

const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const ac = document.querySelector('.ac');
const ce = document.querySelector('.ce');
const addButton = document.querySelector('.add');
const subButton = document.querySelector('.sub');
const prodButton = document.querySelector('.prod');
const divButton = document.querySelector('.div');
const modButton = document.querySelector('.mod');
const equalButton = document.querySelector('.equal');
const decimal = document.querySelector('.decimal');

const operations = {
    add: (a, b) => {
        return a + b;
    },
    sub: (a, b) => {
        return a - b;
    },
    prod: (a, b) => {
        return a * b;
    },
    div: (a, b) => {
        return a / b;
    },
    mod: (a, b) => {
        return a % b;
    },
    equal: (a, b) => {
        return b;
    }
}

operations.add.symbol = '+';
operations.sub.symbol = '-';
operations.prod.symbol = '×';
operations.div.symbol = '÷';
operations.mod.symbol = '%';
operations.equal.symbol = '';

let currentValue = 0;
let displayValue = 0;
let currentOp = operations.equal;
let awaitingArgument = false;
let displayErase = false;




function writeToDisplay(text) {
    text = text.toString();
    const maxLength = text.includes('.') ? 12 : 11;
    display.textContent = text.substring(0, Math.min(text.length, maxLength));
}

function pressNumber(e) {
    if (awaitingArgument || displayErase) {
        display.textContent = '';
        displayErase = false;
        awaitingArgument = false;
    }
    if (display.textContent === '0') {
        if (e.target.textContent === '0'){
            return;
        } else {
            display.textContent = '';
        }
    }
    writeToDisplay(display.textContent + e.target.textContent);
}

function addDecimal() {
    if (awaitingArgument || displayErase) {
        displayValue = 0;
        display.textContent = 0;
        displayErase = false;
        awaitingArgument = false;
    }
    if (display.textContent.includes('.')) return;
    writeToDisplay(display.textContent += '.');
}

function clearAll() {
    currentValue = 0;
    displayValue = 0;
    display.textContent = displayValue;
    currentOp = operations.equal;
    awaitingArgument = false;
    displayErase = true;
}

function clearEntry() {
    displayValue = 0;
    display.textContent = displayValue;
    awaitingArgument = false;
}

function operate(operation) {
    if (awaitingArgument) {
        if (currentOp != operations.equal) {
            display.textContent = display.textContent.slice(0, -1);
        }
        if (Number(display.textContent)) {
            display.textContent += operation.symbol;
            currentOp = operation;
        }
        return;
    }

    displayValue = Number(display.textContent);

    if (currentOp === operations.div && displayValue === 0) {
        clearAll();
        display.textContent = 'Error ÷ by 0';
        awaitingArgument = true;
        return;
    }

    displayValue = Number(currentOp(currentValue, displayValue).toPrecision(11));
    
    const maxLength = displayValue.toString().includes('.') ? 12 : 11;
    if (displayValue.toString().length > maxLength) {
        clearAll();
        display.textContent = "TOO BIG";
        awaitingArgument = true;
        return;
    }

    writeToDisplay(displayValue);
    currentValue = displayValue;
    
    currentOp = operation;
    
    if (currentOp !== operations.equal) {
        awaitingArgument = true;
    }
    
    display.textContent += operation.symbol;
    displayErase = true;
}

function pressKey(e) {
    const key = e.key;
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (numbers.includes(key)) {
        pressNumber({target: {textContent: key}});
        return;
    }
    if (key === '.') {
        addDecimal();
        return;
    }
    if (key === '+') {
        operate(operations.add);
        return;
    }
    if (key === '-') {
        operate(operations.sub);
        return;
    }
    if (key === '*') {
        operate(operations.prod);
        return;
    }
    if (key === '/') {
        operate(operations.div);
        return;
    }
    if (key === '%') {
        operate(operations.mod);
        return;
    }
    if (key === '=' || key === 'Enter') {
        operate(operations.equal);
        return;
    }
    if (key === 'c' || key === 'Backspace') {
        clearEntry();
        return;
    }
    if (key === 'Escape') {
        clearAll();
        return;
    }
}

numbers.forEach(number => number.addEventListener('click', pressNumber));
ac.addEventListener('click', clearAll);
ce.addEventListener('click', clearEntry);
addButton.addEventListener('click', () => operate(operations.add));
subButton.addEventListener('click', () => operate(operations.sub));
prodButton.addEventListener('click', () => operate(operations.prod));
divButton.addEventListener('click', () => operate(operations.div));
modButton.addEventListener('click', () => operate(operations.mod));
equalButton.addEventListener('click', () => operate(operations.equal));
decimal.addEventListener('click', addDecimal);

document.addEventListener('keydown', e => pressKey(e));

display.textContent = displayValue;
