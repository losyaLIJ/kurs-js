'use strict';
console.log("Complecated Third lesson!");

// lang принимает 2 значения: "en" и "ru"
const lang = "ru";

// 1. Вывод дней недели на выбранном языке с помощью if-else
if (lang === "ru") {
    console.log("Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье");
} else if (lang === "en") {
    console.log("Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday");
} else {
    console.log("Язык не поддерживается");
}

// 2. Вывод дней недели на выбранном языке с помощью switch
switch (lang) {
    case "ru":
        console.log("Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье");
        break;
    case "en":
        console.log("Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday");
        break;
    default:
        console.log("Язык не поддерживается");
}

// 3. Вывод дней недели на выбранном языке с помощью многомерного массива без ифов и switch
const days = {
    "ru": ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
    "en": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
};
days[lang] ? console.log(days[lang].join(", ")) : console.log("Язык не поддерживается");


const namePerson = "Артем";
namePerson == "Артем"
    ? console.log("директор")
    : namePerson == "Александр"
        ? console.log("преподаватель")
        : console.log("студент");