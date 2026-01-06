'use strict';

const title = prompt("Как называется ваш проект?");
const screens = prompt("Какие типы экранов нужно разработать? (Простые, Сложные, Интерактивные)");
const screenPrice = +prompt("Сколько будет стоить данная работа?");
const adaptive = confirm("Нужен ли адаптив на сайте?");
const service1 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice1 = +prompt("Сколько это будет стоить?");
const service2 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice2 = +prompt("Сколько это будет стоить?");
const rollback = 20;

let allServicePrices;
let fullPrice;
let servicePercentPrice;

function showTypeOf(variable) {
    console.log(variable, typeof (variable));
}

const getRollbackMessage = function (price) {
    if (price >= 30000) {
        return "Даем скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
        return "Даем скидку в 5%";
    } else if (price < 15000 && price >= 0) {
        return "Скидка не предусмотрена";
    } else {
        return "Что-то пошло не так";
    }
}

const getAllServicePrices = function () {
    return servicePrice1 + servicePrice2;
};

function getFullPrice() {
    return screenPrice + getAllServicePrices();
}

const getTitle = function () {
    const clearTitle = title.trim();
    return clearTitle.charAt(0).toUpperCase() + clearTitle.slice(1).toLowerCase();
}

const getServicePercentPrices = function () {
    return fullPrice - (fullPrice * rollback / 100);
}


showTypeOf(getTitle());
showTypeOf(screenPrice);
showTypeOf(adaptive);

allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();

console.log("Типы экранов: " + screens);
console.log(getRollbackMessage(fullPrice));
console.log("Итоговая стоимость за вычетом процента отката: " + servicePercentPrice);
