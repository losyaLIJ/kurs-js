'use strict';

const booksContainer = document.querySelector('.books');
const books = document.querySelectorAll('.book');
let booksIds = [];
let sortedBooksIds = [];

function getBookId() {
    for (let book of books) {
        const title = book.querySelector('a').textContent.trim();
        const bookId = Number(title.match(/\d+/)[0]);

        booksIds.push({ book, bookId });
    }
}

function putBooksInOrder() {
    getBookId();
    sortedBooksIds = booksIds.sort((a, b) => {
        return a.bookId - b.bookId
    });

    for (let book of sortedBooksIds) {
        booksContainer.append(book.book);
    }
}

function replaceBackgroundImg() {
    document.body.style.backgroundImage = 'url("./image/you-dont-know-js.jpg")';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
}

function fixTitleBook3() {
    sortedBooksIds[2].book.querySelector('a').textContent = 'Книга 3. this и Прототипы Объектов';
}

function removeAdv() {
    const adv = document.querySelector('.adv');
    adv.remove();
}

function fixBookOrder() {
    let ul = sortedBooksIds[1].book.querySelector('ul');
    let items = Array.from(ul.children);
    let correctOrder = [0, 1, 3, 6, 8, 4, 5, 7, 9, 2, 10];
    correctOrder.forEach(i => ul.append(items[i]));

    ul = sortedBooksIds[4].book.querySelector('ul');
    items = Array.from(ul.children);
    correctOrder = [0, 1, 9, 3, 4, 2, 6, 7, 5, 8, 10];
    correctOrder.forEach(i => ul.append(items[i]));
}

function addChapter8InBook6() {
    const ul = sortedBooksIds[5].book.querySelector('ul');
    const items = Array.from(ul.children);
    const newChapter = document.createElement('li');
    newChapter.textContent = 'Глава 8: За пределами ES6';
    items[8].after(newChapter);
}

putBooksInOrder();
replaceBackgroundImg();
fixTitleBook3();
removeAdv();
fixBookOrder();
addChapter8InBook6();

