'use strict';

const weekdays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const declensions = {
    hours: ['час', 'часа', 'часов'],
    minutes: ['минута', 'минуты', 'минут'],
    seconds: ['секунда', 'секунды', 'секунд']
};

const formatA = document.getElementById('formatA');
const formatB = document.getElementById('formatB');

function getWordForm(value, words) {
    if (value <= 0) return words[2]
    value = Math.abs(value) % 100
    const lastNum = value % 10

    if (value > 10 && value < 20) return words[2]
    if (lastNum === 1) return words[0]
    if (lastNum >= 2 && lastNum <= 4) return words[1]

    return words[2]
}

function addLeadingZero(num) {
    return num < 10 ? '0' + num : num;
}

function updateClock() {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    const weekday = now.getDay() === 0 ? 6 : now.getDay() - 1;
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    formatA.textContent = 'Сегодня ' + weekdays[weekday] + ', '
        + day + ' ' + months[month] + ' ' + year + ' года, '
        + hours + ' ' + getWordForm(hours, declensions.hours) + ' '
        + minutes + ' ' + getWordForm(minutes, declensions.minutes) + ' '
        + seconds + ' ' + getWordForm(seconds, declensions.seconds);

    formatB.textContent = addLeadingZero(day) + '.' + addLeadingZero(month + 1) + '.' + year
        + ' - ' + addLeadingZero(hours) + ':' + addLeadingZero(minutes) + ':' + addLeadingZero(seconds);
}

updateClock();
setInterval(updateClock, 1000);
