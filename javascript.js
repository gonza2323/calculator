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
const equal = document.querySelector('.equal');
const decimal = document.querySelector('.decimal');

let currentValue = 0;
let displayValue = 0;
let currentOp = add;

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

function pressNumber(e) {
    displayValue = Number(displayValue + e.target.textContent);
    display.textContent = displayValue;
}

function clearAll() {
    currentValue = 0;
    displayValue = 0;
    currentOp = add;
    display.textContent = displayValue;
}

function clearEntry() {
    displayValue = 0;
    display.textContent = displayValue;
}

function operate(e, operation) {
    if (currentOp === div && displayValue === 0) {
        clearAll();
        display.textContent = 'MATHERROR';
        return;
    }
    currentValue = currentOp(currentValue, displayValue);
    display.textContent = currentValue
    if (e.target.textContent !== '=')
        display.textContent += e.target.textContent;
    currentOp = operation;
    displayValue = 0;
}

numbers.forEach(number => number.addEventListener('click', pressNumber));
ac.addEventListener('click', clearAll);
ce.addEventListener('click', clearEntry);
addButton.addEventListener('click', (e) => operate(e, add));
subButton.addEventListener('click', (e) => operate(e, sub));
prodButton.addEventListener('click', (e) => operate(e, prod));
divButton.addEventListener('click', (e) => operate(e, div));
modButton.addEventListener('click', (e) => operate(e, mod));
equal.addEventListener('click', (e) => operate(e, add));

display.textContent = displayValue;
