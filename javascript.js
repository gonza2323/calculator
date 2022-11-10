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
let awaitingArgument = true;
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

function pressNumber(e) {
    if (awaitingArgument || displayErase) {
        display.textContent = '';
        displayErase = false;
        awaitingArgument = false;
    }
    displayValue = Number(display.textContent + e.target.textContent);
    display.textContent = displayValue;
}

function addDecimal() {
    if (awaitingArgument || displayErase) {
        displayValue = 0;
        display.textContent = 0;
        displayErase = false;
        awaitingArgument = false;
    }
    if (display.textContent.includes('.')) return;
    display.textContent += '.';
}

function clearAll() {
    currentValue = 0;
    displayValue = 0;
    currentOp = equal;
    display.textContent = displayValue;
}

function clearEntry() {
    displayValue = 0;
    display.textContent = displayValue;
}

function operate(e, operation) {
    if (awaitingArgument) {
        clearAll();
        display.textContent = 'Missing Arg';
        return;
    }

    currentValue = currentOp(currentValue, displayValue);
    displayValue = currentValue;
    display.textContent = displayValue;
    
    currentOp = operation;
    
    if (currentOp !== equal) {
        awaitingArgument = true;
        display.textContent += e.target.textContent;
    }
    displayErase = true;
}

numbers.forEach(number => number.addEventListener('click', pressNumber));
ac.addEventListener('click', clearAll);
ce.addEventListener('click', clearEntry);
addButton.addEventListener('click', (e) => operate(e, add));
subButton.addEventListener('click', (e) => operate(e, sub));
prodButton.addEventListener('click', (e) => operate(e, prod));
divButton.addEventListener('click', (e) => operate(e, div));
modButton.addEventListener('click', (e) => operate(e, mod));
equalButton.addEventListener('click', (e) => operate(e, equal));
decimal.addEventListener('click', addDecimal);

display.textContent = displayValue;
