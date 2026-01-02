'use strict';

let appData = {
    title: "",
    screens: "",
    screenPrice: 0,
    adaptive: false,
    rollback: 10,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    service1: "",
    service2: "",
    start: function () {
        appData.asking();
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice();
        appData.servicePercentPrice = appData.getServicePercentPrice();
        appData.title = appData.getTitle();

        appData.logger();
    },
    logger: function () {
        for (let key in appData) {
            console.log(key + ": " + appData[key]);
        }
    },
    asking: function () {
        appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
        appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
        appData.screenPrice = appData.getNumber("Сколько будет стоить данная работа?");
        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },
    getNumber: function (message) {
        let value;

        do {
            value = prompt(message);
            if (value === null) {
                return null;
            }

            value = value.trim();
        } while (value === "" || !isFinite(value))

        return Number(value);
    },
    getAllServicePrices: function () {
        let sum = 0;
        let priceService = 0;

        for (let i = 0; i < 2; i++) {
            if (i === 0) {
                appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
            } else if (i === 1) {
                appData.service2 = prompt("Какой дополнительный тип услуги нужен?");
            }

            priceService = appData.getNumber("Сколько это будет стоить?");
            if (priceService === null) {
                i--;
                continue;
            }
            sum += priceService;
        }

        return sum;
    },
    getFullPrice: function () {
        return appData.screenPrice + appData.allServicePrices;
    },
    getServicePercentPrice: function () {
        return appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
    },
    getTitle: function () {
        const clearTitle = appData.title.trim();
        return clearTitle
            ? clearTitle[0].toUpperCase() + clearTitle.slice(1).toLowerCase()
            : clearTitle;
    },
    getRollbackMessage: function (price) {
        if (price >= 30000) {
            return "Даем скидку в 10%";
        } else if (price >= 15000 && price < 30000) {
            return "Даем скидку в 5%";
        } else if (price < 15000 && price >= 0) {
            return "Скидка не предусмотрена";
        } else {
            return "Что-то пошло не так";
        }
    },
}

appData.start();