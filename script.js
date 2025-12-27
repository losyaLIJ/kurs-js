console.log("Complecated Second lesson!");

const num = 266219;
const strNum = String(num);
let product = 1;

for(let i = 0; i < strNum.length; i++) {
    product *= Number(strNum[i]);
}
console.log("Произведение цифр числа " + num + ":", product);

const productCubed = product ** 3;
console.log("Куб произведения:", productCubed);

const firstNumberCubed = String(productCubed)[0];
const secondNumberCubed = String(productCubed)[1];
console.log("Первые 2 числа этого куба:", firstNumberCubed, secondNumberCubed);


