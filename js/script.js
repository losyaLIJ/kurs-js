'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let toDoData = []

const loadFromStorage = function () {
    const data = localStorage.getItem('todo');
    toDoData = data ? JSON.parse(data) : [];
}

const saveToStorage = function () {
    localStorage.setItem('todo', JSON.stringify(toDoData));
}

const render = function () {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';

    toDoData.forEach(function (item, index) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML =
            '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        (item.completed ? todoCompleted : todoList).append(li);

        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed;
            saveToStorage();
            render()
        })

        li.querySelector('.todo-remove').addEventListener('click', function () {
            toDoData.splice(index, 1);
            saveToStorage();
            render()
        })
    })
}

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();

    const value = headerInput.value.trim();
    if (!value) return;

    const newToDo = {
        text: headerInput.value,
        completed: false
    }
    toDoData.push(newToDo);
    headerInput.value = '';

    saveToStorage();
    render();
})

loadFromStorage();
render();