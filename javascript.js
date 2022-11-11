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

let currentValue = 0;
let displayValue = 0;
let currentOp = equal;
let awaitingArgument = false;
let displayErase = false;


function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function prod(a, b) {
    return a * b;
}

function div(a, b) {
    return a / b;
}

function mod(a, b) {
    return a % b;
}

function equal(a, b) {
    return b;
}

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
    currentOp = equal;
    awaitingArgument = false;
    displayErase = true;
}

function clearEntry() {
    displayValue = 0;
    display.textContent = displayValue;
    awaitingArgument = false;
}

function operate(e, operation) {
    if (awaitingArgument) {
        clearAll();
        display.textContent = 'Error';
        awaitingArgument = true;
        return;
    }

    displayValue = Number(display.textContent);

    if (currentOp === div && displayValue === 0) {
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
    
    if (currentOp !== equal) {
        awaitingArgument = true;
        display.textContent += e.target.textContent;
    }
    displayErase = true;
}

function pressKey(e) {
    const key = e.key;
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8','9'];
    console.log(key);
    if (numbers.includes(key)) {
        pressNumber({target: {textContent: key}});
        return;
    }
    if (key === '.') {
        addDecimal();
        return;
    }
    if (key === '+') {
        operate({target: {textContent: '+'}}, add);
        return;
    }
    if (key === '-') {
        operate({target: {textContent: '-'}}, sub);
        return;
    }
    if (key === '*') {
        operate({target: {textContent: '×'}}, prod);
        return;
    }
    if (key === '/') {
        operate({target: {textContent: '÷'}}, div);
        return;
    }
    if (key === '%') {
        operate({target: {textContent: '%'}}, mod);
        return;
    }
    if (key === '=' || key === 'Enter') {
        operate({target: {textContent: '='}}, equal);
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
addButton.addEventListener('click', e => operate(e, add));
subButton.addEventListener('click', e => operate(e, sub));
prodButton.addEventListener('click', e => operate(e, prod));
divButton.addEventListener('click', e => operate(e, div));
modButton.addEventListener('click', e => operate(e, mod));
equalButton.addEventListener('click', e => operate(e, equal));
decimal.addEventListener('click', addDecimal);

document.addEventListener('keydown', e => pressKey(e));

display.textContent = displayValue;
