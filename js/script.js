'use strict';

const title = document.getElementsByTagName('h1')[0];
const buttonPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback input');
const inputRangeValue = document.querySelector('.rollback .range-value');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen')

let appData = {
    title: "",
    screens: [],
    screenPrice: 0,
    adaptive: false,
    rollback: 10,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: [],
    servicesNumber: [],
    count: 0,
    init: function () {
        appData.addTitile();
        startBtn.disabled = true;
        document.addEventListener('input', appData.checkScreens);
        document.addEventListener('change', appData.checkScreens);

        inputRange.addEventListener('input', function () {
            const value = inputRange.value
            inputRangeValue.textContent = value + '%';
            appData.rollback = +value;
        });

        startBtn.addEventListener('click', appData.start);
        buttonPlus.addEventListener('click', appData.addScreenBlock)
    },
    addTitile: function () {
        document.title = title.textContent;
    },
    checkScreens: function () {
        let isValid = true;
        screens = document.querySelectorAll('.screen');

        screens.forEach(function (screen) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');

            if (!select.value || !input.value || +input.value <= 0) {
                isValid = false;
            }
        });

        startBtn.disabled = !isValid;
    },
    start: function () {
        appData.addScreens();
        appData.addServices();
        appData.addPrices();

        // appData.getServicePercentPrice();
        // appData.logger();

        appData.showResult();
    },
    showResult: function () {
        total.value = appData.screenPrice;
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
        fullTotalCount.value = appData.fullPrice;
    },
    addScreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true);

        screens[screens.length - 1].after(cloneScreen);
    },
    addScreens: function () {
        screens = document.querySelectorAll('.screen');
        screens.forEach(function (screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            appData.screens.push({
                id: index,
                name: selectName,
                count: +input.value,
                price: +select.value * +input.value
            });
        });
    },
    addServices: function () {
        otherItemsPercent.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesPercent.push({
                    name: label.textContent,
                    price: +input.value
                });
            }
        })

        otherItemsNumber.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesNumber.push({
                    name: label.textContent,
                    price: +input.value
                });
            }
        })
    },
    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
    },
    addPrices: function () {
        appData.screenPrice = appData.screens.reduce((sum, screen) => {
            return sum + +screen.price;
        }, 0);

        appData.servicePricesNumber = appData.servicesNumber.reduce((sum, service) => {
            return sum + service.price;
        }, 0);

        appData.servicePricesPercent = appData.servicesPercent.reduce((sum, percent) => {
            return sum + appData.screenPrice * (percent.price / 100);
        }, 0);

        appData.fullPrice = appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;

        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));

        totalCount.value = appData.screens.reduce((totalCount, screen) => {
            return totalCount + screen.count;
        }, 0)

        totalCountRollback.value = Math.round(appData.servicePercentPrice)
    }
}

appData.init();