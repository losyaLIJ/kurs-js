'use strict';

const week = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

const container = document.querySelector("body");

const printDays = function () {
    for(let i = 0; i < week.length; i++) {
        const p = document.createElement('p');
        p.textContent = week[i];
        
        if (i == todayIndex) {
            p.style.fontWeight = 'bold';
        }

        if (i == 5 || i == 6) {
            p.style.fontStyle = 'italic';
        }
        container.appendChild(p);
    }
}

printDays();