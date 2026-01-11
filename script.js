'use strict';

const btn = document.getElementById('btn');
const text = document.getElementById('text');
const square = document.getElementById('square');
const circle = document.getElementById('circle');
const circleBtn = document.getElementById('e_btn');
circleBtn.style.display = 'none';
const range_span = document.getElementById('range-span');
const range = document.getElementById('range');

btn.addEventListener('click', () => {
    const color = text.value.trim();
    if (!color) return;

    square.style.backgroundColor = color;
})

range.addEventListener('input', () => {
    const size = range.value;
    range_span.textContent = size;
    circle.style.width = size + '%';
    circle.style.height = size + '%';
});



