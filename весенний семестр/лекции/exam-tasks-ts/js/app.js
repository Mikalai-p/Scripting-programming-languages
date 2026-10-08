"use strict";
// Примерные задачи А–Е (TypeScript + DOM)
// Компиляция: tsc  →  js/app.js
// --- А. Счётчик ---
function initCounter() {
    const display = document.getElementById("count");
    const incBtn = document.getElementById("inc");
    const decBtn = document.getElementById("dec");
    let count = 0;
    incBtn.addEventListener("click", () => {
        count++;
        display.textContent = String(count);
    });
    decBtn.addEventListener("click", () => {
        count--;
        display.textContent = String(count);
    });
}
// --- Б. Ввод → показ на странице ---
function initNameOutput() {
    const nameInput = document.getElementById("name");
    const output = document.getElementById("output");
    nameInput.addEventListener("input", () => {
        output.textContent = nameInput.value;
    });
}
// --- В. Количество → список li ---
function initDynamicList() {
    const countInput = document.getElementById("count-list");
    const btn = document.getElementById("btn-list");
    const list = document.getElementById("list");
    btn.addEventListener("click", () => {
        const n = Number(countInput.value);
        list.replaceChildren();
        for (let i = 1; i <= n; i++) {
            const li = document.createElement("li");
            li.textContent = `Элемент ${i}`;
            list.appendChild(li);
        }
    });
}
// --- Г. Удалить элемент по клику ---
function initDeleteList() {
    const list = document.getElementById("list-del");
    list.addEventListener("click", (e) => {
        const target = e.target;
        if (target.classList.contains("del")) {
            target.closest("li")?.remove();
        }
    });
}
// --- Д. Поменять цвет по клику ---
function initColorToggle() {
    const box = document.getElementById("box");
    box.addEventListener("click", () => {
        box.classList.toggle("active");
    });
}
// --- Е. Синхронизировать два поля ---
function initSyncInputs() {
    const inputA = document.getElementById("a");
    const inputB = document.getElementById("b");
    inputA.addEventListener("input", () => {
        inputB.value = inputA.value;
    });
    inputB.addEventListener("input", () => {
        inputA.value = inputB.value;
    });
}
document.addEventListener("DOMContentLoaded", () => {
    initCounter();
    initNameOutput();
    initDynamicList();
    initDeleteList();
    initColorToggle();
    initSyncInputs();
});
