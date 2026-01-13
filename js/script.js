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

const cmsCheckbox = document.getElementById('cms-open');
const cmsVariants = document.querySelector('.hidden-cms-variants');
const cmsSelect = document.getElementById('cms-select');
const cmsOtherInput = cmsVariants.querySelector('.main-controls__input');

let screens = document.querySelectorAll('.screen')

let appData = {
    title: "",
    screens: [],
    screenPrice: 0,
    rollback: 10,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: [],
    servicesNumber: [],
    init: function () {
        this.addTitle();

        startBtn.disabled = true;

        document.addEventListener('input', this.checkScreens.bind(this));
        document.addEventListener('change', this.checkScreens.bind(this));

        inputRange.addEventListener('input', () => {
            const value = inputRange.value
            inputRangeValue.textContent = value + '%';
            this.rollback = +value;
        });

        cmsCheckbox.addEventListener('change', () => {
            cmsVariants.style.display = cmsCheckbox.checked ? 'flex' : 'none';
        });

        cmsSelect.addEventListener('change', () => {
            cmsOtherInput.style.display =
                cmsSelect.value === 'other' ? 'flex' : 'none';
        });

        startBtn.addEventListener('click', this.start.bind(this));
        resetBtn.addEventListener('click', this.reset.bind(this));
        buttonPlus.addEventListener('click', this.addScreenBlock.bind(this))
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    checkScreens: function () {
        if (startBtn.style.display === 'none') return;
        
        let isValid = true;
        screens = document.querySelectorAll('.screen');

        screens.forEach(screen => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');

            if (!select.value || !input.value || +input.value <= 0) {
                isValid = false;
            }
        });

        startBtn.disabled = !isValid;
    },
    start: function () {
        this.addScreens();
        this.addServices();
        this.addPrices();
        this.showResult();
        this.lockControls();
    },
    reset: function () {
        this.resetState();
        this.resetScreens();
        this.resetFormControls();
        this.resetUI();
    },
    resetState: function () {
        this.screens = [];
        this.servicesPercent = [];
        this.servicesNumber = [];
        this.screenPrice = 0;
        this.servicePricesNumber = 0;
        this.servicePricesPercent = 0;
        this.fullPrice = 0;
        this.servicePercentPrice = 0;
        this.rollback = 10;
        total.value = 0;
        totalCount.value = 0;
        totalCountOther.value = 0;
        fullTotalCount.value = 0;
        totalCountRollback.value = 0;
    },
    resetScreens: function () {
        screens = document.querySelectorAll('.screen');
        screens.forEach((screen, index) => index && screen.remove());
    },
    resetFormControls: function () {
        document.querySelectorAll('input[type=text]')
            .forEach(input => input.value = '');

        document.querySelectorAll('input[type=checkbox]')
            .forEach(check => check.checked = false);

        document.querySelectorAll('select')
            .forEach(select => select.selectedIndex = 0);

        document.querySelectorAll('.main-controls input, .main-controls select')
            .forEach(el => el.disabled = false);
    },
    resetUI: function () {
        startBtn.style.display = 'inline-block';
        resetBtn.style.display = 'none';

        buttonPlus.disabled = false;

        cmsVariants.style.display = 'none';

        inputRange.value = 10;
        inputRangeValue.textContent = '10%';
    },
    lockControls: function () {
        document.querySelectorAll('.main-controls input[type=text], .main-controls select')
            .forEach(el => el.disabled = true);
        buttonPlus.disabled = true;
        startBtn.style.display = 'none';
        resetBtn.style.display = 'inline-block';
    },
    showResult: function () {
        total.value = this.screenPrice;
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
        fullTotalCount.value = this.fullPrice;
    },
    addScreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true);

        screens[screens.length - 1].after(cloneScreen);
    },
    addScreens: function () {
        screens = document.querySelectorAll('.screen');
        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            this.screens.push({
                id: index,
                name: selectName,
                count: +input.value,
                price: +select.value * +input.value
            });
        });
    },
    addServices: function () {
        otherItemsPercent.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesPercent.push({
                    name: label.textContent,
                    price: +input.value
                });
            }
        })

        otherItemsNumber.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesNumber.push({
                    name: label.textContent,
                    price: +input.value
                });
            }
        })
    },
    logger: function () {
        console.log(this.fullPrice);
        console.log(this.servicePercentPrice);
    },
    addPrices: function () {
        this.screenPrice = this.screens.reduce((sum, screen) => {
            return sum + +screen.price;
        }, 0);

        this.servicePricesNumber = this.servicesNumber.reduce((sum, service) => {
            return sum + service.price;
        }, 0);

        this.servicePricesPercent = this.servicesPercent.reduce((sum, percent) => {
            return sum + this.screenPrice * (percent.price / 100);
        }, 0);

        let basePrice = this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

        if (cmsCheckbox.checked && !isNaN(+cmsSelect.value)) {
            basePrice += basePrice * (+cmsSelect.value / 100);
        }

        this.fullPrice = basePrice;

        totalCount.value = this.screens.reduce((sum, screen) => {
            return sum + screen.count;
        }, 0);

        this.servicePercentPrice = this.fullPrice - this.fullPrice * (this.rollback / 100);

        totalCountRollback.value = Math.round(this.servicePercentPrice);
    }
}

appData.init();