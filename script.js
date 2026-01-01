'use strict';

function getNumber(value) {
    if (value === null) {
        return null;
    }

    value = value.trim();
    if (value === "" || !isFinite(value)) {
        return null;
    }

    return Number(value);
}

function createGame() {
    const numberToGuess = Math.floor(Math.random() * 100) + 1;

    function ask() {
        const userInput = prompt("Угадай число от 1 до 100");

        if (userInput === null) {
            alert("Игра окончена");
            return;
        }
        const userNumber = getNumber(userInput);

        if (userNumber === null) {
            alert("Введи число!");
            return ask();
        }

        if (userNumber > numberToGuess) {
            alert("Загаданное число меньше");
            return ask();
        }

        if (userNumber < numberToGuess) {
            alert("Загаданное число больше");
            return ask();
        }

        alert("Поздравляю, Вы угадали!!!");
    }

    return ask;
}

function createGameWithLimit() {
    const numberToGuess = Math.floor(Math.random() * 100) + 1;
    let attempts = 10;

    function ask() {
        if (attempts === 0) {
            const playAgain = confirm("Попытки закончились. Хотите сыграть еще?");
            if (playAgain) {
                const newGame = createGameWithLimit();
                newGame();
            }
            return;
        }

        const userInput = prompt("Угадай число от 1 до 100");

        if (userInput === null) {
            alert("Игра окончена");
            return;
        }
        const userNumber = getNumber(userInput);

        if (userNumber === null) {
            alert("Введи число!");
            return ask();
        }
        attempts--;

        if (userNumber > numberToGuess) {
            alert("Загаданное число меньше, осталось попыток: " + (attempts));
            return ask();
        }

        if (userNumber < numberToGuess) {
            alert("Загаданное число больше, осталось попыток: " + (attempts));
            return ask();
        }

        const agree = confirm("Поздравляю, Вы угадали!!! Хотели бы сыграть еще?");
        if (agree) {
            const newGame = createGameWithLimit();
            newGame();
        }
    }

    return ask;
}


// const guessTheNumber = createGame();
const guessTheNumber = createGameWithLimit();
guessTheNumber();