console.log("Complecated Second lesson!");

const num = 266219;

let product = String(num).split('').reduce((acc, elem) => acc * Number(elem), 1);

console.log("Произведение цифр числа " + num + ":", product);

const productCubed = product ** 3;
console.log("Куб произведения:", productCubed);

const firstNumberCubed = String(productCubed)[0];
const secondNumberCubed = String(productCubed)[1];
console.log("Первые 2 числа этого куба:", firstNumberCubed, secondNumberCubed);


