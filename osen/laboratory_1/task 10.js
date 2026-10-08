// Функция с тремя параметрами
function combineParams(param1 = "Значение_по_умолчанию", param2, param3) {
  // Возвращаем строку из трех параметров
  return `${param1} ${param2} ${param3}`;
}

// Получаем третий параметр от пользователя
const userInput = prompt("Введите третий параметр:");

// Вызываем функцию с разными способами передачи параметров:

// 1. Все параметры передаются явно
const result1 = combineParams("Первый", "Второй", userInput);
console.log(result1);

// 2. Первый параметр использует значение по умолчанию
const result2 = combineParams(undefined, "Второй", userInput);
console.log(result2);

// 3. Пропускаем первый параметр (он будет по умолчанию)
const result3 = combineParams(null, "Второй", userInput);
console.log(result3);