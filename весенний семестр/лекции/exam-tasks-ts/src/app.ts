// Примерные задачи А–Е (TypeScript + DOM)
// Компиляция: tsc  →  js/app.js

// --- А. Счётчик ---
function initCounter(): void {
  const display = document.getElementById("count") as HTMLParagraphElement;
  const incBtn = document.getElementById("inc") as HTMLButtonElement;
  const decBtn = document.getElementById("dec") as HTMLButtonElement;

  let count: number = 0;

  incBtn.addEventListener("click", (): void => {
    count++;
    display.textContent = String(count);
  });

  decBtn.addEventListener("click", (): void => {
    count--;
    display.textContent = String(count);
  });
}

// --- Б. Ввод → показ на странице ---
function initNameOutput(): void {
  const nameInput = document.getElementById("name") as HTMLInputElement;
  const output = document.getElementById("output") as HTMLParagraphElement;

  nameInput.addEventListener("input", (): void => {
    output.textContent = nameInput.value;
  });
}

// --- В. Количество → список li ---
function initDynamicList(): void {
  const countInput = document.getElementById("count-list") as HTMLInputElement;
  const btn = document.getElementById("btn-list") as HTMLButtonElement;
  const list = document.getElementById("list") as HTMLUListElement;

  btn.addEventListener("click", (): void => {
    const n: number = Number(countInput.value);
    list.replaceChildren();
    for (let i = 1; i <= n; i++) {
      const li: HTMLLIElement = document.createElement("li");
      li.textContent = `Элемент ${i}`;
      list.appendChild(li);
    }
  });
}

// --- Г. Удалить элемент по клику ---
function initDeleteList(): void {
  const list = document.getElementById("list-del") as HTMLUListElement;

  list.addEventListener("click", (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("del")) {
      target.closest("li")?.remove();
    }
  });
}

// --- Д. Поменять цвет по клику ---
function initColorToggle(): void {
  const box = document.getElementById("box") as HTMLDivElement;

  box.addEventListener("click", (): void => {
    box.classList.toggle("active");
  });
}

// --- Е. Синхронизировать два поля ---
function initSyncInputs(): void {
  const inputA = document.getElementById("a") as HTMLInputElement;
  const inputB = document.getElementById("b") as HTMLInputElement;

  inputA.addEventListener("input", (): void => {
    inputB.value = inputA.value;
  });

  inputB.addEventListener("input", (): void => {
    inputA.value = inputB.value;
  });
}

document.addEventListener("DOMContentLoaded", (): void => {
  initCounter();
  initNameOutput();
  initDynamicList();
  initDeleteList();
  initColorToggle();
  initSyncInputs();
});
