function makeCounter() {
    let currentCount = 1;

    return function() { 
        return currentCount++;
    };
}

let counter = makeCounter();

alert( counter() ); 
alert( counter() ); 
alert( counter() ); 

let counter2 = makeCounter();
alert( counter2() ); 

/*
let currentCount = 1;
function makeCounter() {
  return function() {
    return currentCount++;
};
}

let counter = makeCounter();
let counter2 = makeCounter();
alert( counter() ); 
alert( counter() ); 
alert( counter2() ); 
alert( counter2() ); 
*/
console.log("\n=== 2. Каррированная функция для расчета объема ===");
function calculateVolume(length) {
    return function(width) {
        return function(height) {
            return length * width * height;
        };
    };
}


const volume1 = calculateVolume(2)(3)(4);
console.log("Объем 2x3x4 =", volume1); 

const fixedLengthVolume = calculateVolume(10); 

const volume2 = fixedLengthVolume(2)(3); 
const volume3 = fixedLengthVolume(5)(4); 
const volume4 = fixedLengthVolume(1)(1); 

console.log("Объемы с фиксированной длиной 10:");
console.log("2x3 =", volume2); 
console.log("5x4 =", volume3); 
console.log("1x1 =", volume4); 

/*
console.log("\n=== 3. Генератор для управления движением объекта ===");
function* createMovement() {
    let x = 0;
    let y = 0;
    
    while (true) {
        const command = prompt("Введите команду (left, right, up, down):");
        
        for (let i = 0; i < 10; i++) {
            switch (command) {
                case 'left':
                    x--;
                    break;
                case 'right':
                    x++;
                    break;
                case 'up':
                    y++;
                    break;
                case 'down':
                    y--;
                    break;
                default:
                    console.log('Неизвестная команда');
                    i = 10; 
                    continue;
            }
            
            console.log(`Шаг ${i + 1}: координаты (${x}, ${y})`);
            yield { x, y, step: i + 1 };
        }
    }
}

const movement = createMovement();

let result = movement.next();
console.log("", result);
while (!result.done) {
    console.log(`Результат: {x: ${result.value.x}, y: ${result.value.y}, шаг: ${result.value.step}, команда: ${result.value.command}}`);
    result = movement.next();
}
*/
console.log("\n=== 4. Работа с глобальным объектом window ===");

var globalVar = "Глобальная переменная";
let letVar = "Переменная let"; 
const constVar = "Константа"; 

function globalFunction() {
    return "Глобальная функция";
}

console.log("1. Получение пользовательских свойств window:");

const userProperties = [];
for (let key in window) {
    if (window.hasOwnProperty(key) && !key.startsWith('_') && 
    !['name', 'location', 'history', 'console', 'document', 'alert', 'prompt'].includes(key) &&
        typeof window[key] !== 'function') {
        userProperties.push(key);
    }
}

console.log("Пользовательские свойства в window:", userProperties);

console.log("\n2. Проверка доступности через window:");
console.log("window.globalVar:", window.globalVar); 
console.log("window.letVar:", window.letVar); 
console.log("window.constVar:", window.constVar); 
console.log("window.globalFunction:", typeof window.globalFunction); 

console.log("\n3. Переопределение переменных через window:");

console.log("До переопределения:");
console.log("globalVar =", globalVar);
console.log("window.globalVar =", window.globalVar);

window.globalVar = "Переопределено через window";

console.log("После переопределения через window.globalVar = 'Переопределено через window':");
console.log("globalVar =", globalVar);
console.log("window.globalVar =", window.globalVar);