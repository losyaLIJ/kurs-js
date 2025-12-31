'use strict';

let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 10;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;

const getNumber = function (message) {
    let value;

    do {
        value = prompt(message);
        if (value === null) {
            return null;
        }

        value = value.trim();
    } while (value === "" || !isFinite(value))

    return Number(value);
}

const asking = function () {
    title = prompt("Как называется ваш проект?", "Калькулятор верстки");
    screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");

    screenPrice = getNumber("Сколько будет стоить данная работа?");

    adaptive = confirm("Нужен ли адаптив на сайте?");
}

const getAllServicePrices = function () {
    let sum = 0;
    let priceService = 0;

    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            service1 = prompt("Какой дополнительный тип услуги нужен?");
        } else if (i === 1) {
            service2 = prompt("Какой дополнительный тип услуги нужен?");
        }

        priceService = getNumber("Сколько это будет стоить?");
        if (priceService === null) {
            i--;
            continue;
        }
        sum += priceService;
    }

    return sum;
}

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
}

const getFullPrice = function () {
    return screenPrice + allServicePrices;
}

const getServicePercentPrice = function () {
    return fullPrice - (fullPrice * (rollback / 100));
}

const getTitle = function () {
    const clearTitle = title.trim();
    return clearTitle
        ? clearTitle[0].toUpperCase() + clearTitle.slice(1).toLowerCase()
        : clearTitle;
};

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

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrice();
title = getTitle();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log("allServicePrices", allServicePrices);

console.log(getRollbackMessage(fullPrice));
console.log("Стоимсоть верстки экранов " + screenPrice + " юани и Стоимость разработки сайта " + fullPrice + " юани");
