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

const guessTheNumber = createGame();
guessTheNumber();