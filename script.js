'use strict';
console.log("Third lesson!");

const title  = prompt("Как называется ваш проект?");
const screens = prompt("Какие типы экранов нужно разработать? (Простые, Сложные, Интерактивные)");
const screenPrice  = +prompt("Сколько будет стоить данная работа?");
const adaptive = confirm("Нужен ли адаптив на сайте?");
const service1 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice1 = +prompt("Сколько это будет стоить?");
const service2 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice2 = +prompt("Сколько это будет стоить?");
const fullPrice = screenPrice + servicePrice1 + servicePrice2;

let rollback = 20;
let rollbackPrice = fullPrice * (rollback / 100);
let servicePercentPrice =  Math.ceil(fullPrice - rollbackPrice);
console.log("Стоимость разработки сайта " + title +" составляет " + fullPrice + " рублей.");
console.log("С учетом скидки " + rollback + "%, стоимость составит " + servicePercentPrice + " рублей.");

switch(true) {
    case (fullPrice >= 30000):
        console.log("Даем скидку в 10%");
        rollback = 10;
        break;
    case (fullPrice >= 15000 && fullPrice < 30000):
        console.log("Даем скидку в 5%");
        rollback = 5;
        break;
    case (fullPrice < 15000 && fullPrice > 0):
        console.log("Скидка не предусмотрена");
        rollback = 0;
        break;
    default:
        console.log("Что-то пошло не так");
        break;
}

rollbackPrice = fullPrice * (rollback / 100);
servicePercentPrice =  Math.ceil(fullPrice - rollbackPrice);
console.log("Стоимость разработки сайта " + title +" составляет " + fullPrice + " рублей.");
console.log("С учетом скидки " + rollback + "%, стоимость составит " + servicePercentPrice + " рублей.");