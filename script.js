'use strict';

let appData = {
    title: "",
    screens: [],
    screenPrice: 0,
    adaptive: false,
    rollback: 10,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    services: [],
    start: function () {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getServicePercentPrice();
        appData.getTitle();

        appData.logger();
    },
    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
    },
    isNumber: function (value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    },
    isText: function (value) {
        return value !== null && value.trim() !== '' && isNaN(value.trim());
    },
    asking: function () {
        do {
            appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
        } while (!appData.isText(appData.title));

        for (let i = 0; i < 2; i++) {
            let name = "";
            let price = 0;

            do {
                name = prompt("Какие типы экранов нужно разработать?");
            } while (!appData.isText(name));

            do {
                price = prompt("Сколько будет стоить данная работа?");
            } while (!appData.isNumber(price));

            appData.screens.push({ id: i, name, price });
        }

        for (let i = 0; i < 2; i++) {
            let name = "";
            let price = 0;   

            do {
                name = prompt("Какой дополнительный тип услуги нужен?");
            } while (!appData.isText(name));
            
            do {
                price = prompt("Сколько это будет стоить?");
            } while (!appData.isNumber(price));

            appData.services.push({ id: i, name, price });
        }

        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },
    addPrices: function () {
        appData.screenPrice = appData.screens.reduce((sum, screen) => sum + +screen.price, 0);
        appData.allServicePrices = appData.services.reduce((sum, service) => sum + +service.price, 0);
    },
    getFullPrice: function () {
        appData.fullPrice = appData.screenPrice + appData.allServicePrices;
    },
    getServicePercentPrice: function () {
        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
    },
    getTitle: function () {
        const clearTitle = appData.title.trim();
        appData.title = clearTitle
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
