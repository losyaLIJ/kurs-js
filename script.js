'use strict';

const DomElement = function (selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
};

DomElement.prototype.create = function () {
    let element;

    if (this.selector[0] === '.') {
        element = document.createElement('div');
        element.className = this.selector.slice(1);
    } else if (this.selector[0] === '#') {
        element = document.createElement('p');
        element.id = this.selector.slice(1);
    } else {
        return null;
    }

    element.style.cssText = `
        height: ${this.height};
        width: ${this.width};
        background: ${this.bg};
        font-size: ${this.fontSize};
        position: absolute;
        top: 0;
        left: 0;
    `;

    element.textContent = 'Созданный элемент DomElement';
    document.body.append(element);

    return element;
};

document.addEventListener('DOMContentLoaded', () => {

    /* Основное задание */
    const domBlock = new DomElement(
        '.block',
        '150px',
        '300px',
        '#4caf50',
        '20px'
    );
    domBlock.create();

    const square = new DomElement(
        '.square',
        '100px',
        '100px',
        'tomato',
        '16px'
    ).create();

    let positionX = 0;
    let positionY = 0;

    document.addEventListener('keydown', (event) => {
        const step = 10;

        switch (event.key) {
            case 'ArrowUp':
                positionY -= step;
                break;
            case 'ArrowDown':
                positionY += step;
                break;
            case 'ArrowLeft':
                positionX -= step;
                break;
            case 'ArrowRight':
                positionX += step;
                break;
        }

        square.style.left = positionX + 'px';
        square.style.top = positionY + 'px';
    });
});
