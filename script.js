console.log("Second lesson!");

let title = "kurs-js";
let screens = "Простые, Сложные, Интерактивные"
let screenPrice = 56;
let rollback = 88;
let fullPrice = 200000;
let adaptive = false;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length); 

console.log("Стоимость верстки экранов " + screenPrice + " рублей/ долларов/гривен/юани");
console.log("Стоимость разработки сайта " + fullPrice + " рублей/ долларов/гривен/юани");

console.log(screens.toLowerCase().split(", "));

let rollbackPrice = fullPrice * (rollback / 100);
console.log("Откат посреднику " + rollbackPrice + " рублей/ долларов/гривен/юани");
