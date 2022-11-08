"use strict";

const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const ac = document.querySelector('.ac');
const ce = document.querySelector('.ce');

let currentValue = 0;
let displayValue = 0;

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

function operate(operation, a, b) {
    return operation(a, b);
}

function pressNumber(e) {
    displayValue = Number(displayValue + e.target.textContent);
    display.textContent = displayValue;
}

function clearAll() {
    currentValue = 0;
    displayValue = 0;
    display.textContent = displayValue;
}

function clearEntry() {
    displayValue = 0;
    display.textContent = displayValue;
}

numbers.forEach(number => number.addEventListener('click', pressNumber));
ac.addEventListener('click', clearAll);
ce.addEventListener('click', clearEntry);

display.textContent = displayValue;