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

function operate(operation) {
    currentValue = currentOp(currentValue, displayValue);
    display.textContent = currentValue;
    currentOp = operation;
    displayValue = 0;
}

numbers.forEach(number => number.addEventListener('click', pressNumber));
ac.addEventListener('click', clearAll);
ce.addEventListener('click', clearEntry);
addButton.addEventListener('click', () => operate(add));
subButton.addEventListener('click', () => operate(sub));
prodButton.addEventListener('click', () => operate(prod));
divButton.addEventListener('click', () => operate(div));
modButton.addEventListener('click', () => operate(mod));
equal.addEventListener('click', () => operate(add));

display.textContent = displayValue;
