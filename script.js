'use strict';

arr = ["123", "456", "789", "101112", "131415", "21352", "7642"];

for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === "2" || arr[i][0] === "4") {
        console.log(arr[i]);
    }
}

for (let i = 2; i <= 100; i++) {
    let isPrime = true;

    for (let j = 2; j <= Math.sqrt(i); j++) {
        if(i % j === 0) {
            isPrime = false;
            break;
        }
    }
    if (isPrime) {
        console.log(i + " Делители этого числа: 1 и " + i);
    }
}