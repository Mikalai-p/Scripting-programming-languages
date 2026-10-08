//task1
let a = 5;
console.log(typeof a);
let name = "Name";
console.log(typeof name);
let i = 0;
console.log(typeof i);
let double = 0.23;
console.log(typeof double);
let result = 1/0;
console.log(typeof result);
let answer = true;
console.log(typeof answer);
let no=null;
console.log(typeof no);
//task2
    document.getElementById('button1').addEventListener('click', 
        function kvadrat() {
            let sidea1=45,sidea2=21;
        let  solution = Math.floor(sidea1/5)*Math.floor(sidea2/5);
            document.getElementById('solution').textContent = "Ответ: " + solution;
        });
        //task3
let c = 2;
let o = c++;
let d = ++c;

console.log(d);
console.log(o);
        //task4
let comparison1 = ("Котик" == "котик") ? "Равны" : "Не равны";
let comparison2 = ("Котик" == "китик") ? "Равны" : "Не равны";
let comparison3 = ("Кот" == "Котик") ? "Равны" : "Не равны";
let comparison4 = ("Привет" == "Пока") ? "Равны" : "Не равны";
let comparison5 = (73 == "53") ? "Равны" : "Не равны";
let comparison6 = (false == 0) ? "Равны" : "Не равны";
let comparison7 = (54 == true) ? "Равны" : "Не равны";
let comparison8 = (123 == false) ? "Равны" : "Не равны";
let comparison9 = (true == "3") ? "Равны" : "Не равны";
let comparison10 = (3 == "5mm") ? "Равны" : "Не равны";
let comparison11 = (8 == "-2") ? "Равны" : "Не равны";
let comparison12 = (34 == "34") ? "Равны" : "Не равны";

console.log(comparison1);
console.log(comparison2);
console.log(comparison3);
console.log(comparison4);
console.log(comparison5);
console.log(comparison6);
console.log(comparison7);
console.log(comparison8);
console.log(comparison9);
console.log(comparison10);
console.log(comparison11); 
console.log(comparison12);


//task5
let input = prompt("Введите ваше имя:");

let teacherName  = "Дмитрий";
let teacherName2 = "Дмитрий Васильевич";
let teacherName3 = "Шиман Дмитрий Васильевич";

if (input.toLowerCase() == teacherName.toLowerCase() || input.toLowerCase() === teacherName2.toLowerCase() || input.toLowerCase() === teacherName3.toLowerCase())
    { alert("Данные корректны!");}
    else {
    alert("Данные некорректны");}


//task6
     document.getElementById('button2').addEventListener('click',function takeExams() {
        const rus = document.getElementById('rus').checked;
        const math = document.getElementById('math').checked;
        const eng = document.getElementById('eng').checked;

        
        if(rus && math && eng){ document.getElementById('results').textContent = "Результат сессии: 2 курс" ;}
        else if( rus || math || eng){ document.getElementById('results').textContent = "Результат сессии: Пересдача"}
        else{ document.getElementById('results').textContent = "Результат сессии: Отчислен"}
        
     
    });
//task7
    console.log(true + true);
    console.log(0 + "5");
    console.log(5 + "mm");
    console.log(8 / Infinity);
    console.log(9 * "\n9");
    console.log(null - 1);
    console.log("5" - 2);
    console.log("5px" - 3);
    console.log(true - 3);
    console.log(7 || 0);
//task8
    for (let i = 1; i <= 10; i++) {
        if (i % 2 === 0) {
            console.log(i + 2);
        } else {
            let odd = i.toString() + "мм";
            console.log(odd);
        }
    }
    //task9
    const obj = {
        1: 'пн',
        2: 'вт',
        3: 'ср',
        4: 'чт',
        5: 'пт',
        6: 'сб',
        7: 'вс'
    };
    
    const input2 = parseInt(prompt('Введите номер дня недели (от 1 до 7):'));
    const obj_mini = obj[input2];
    
    if (obj_mini) {
        console.log(`Это день "${obj_mini}".`);
    } else {
        console.log('Неверный номер дня.');
    }

    const arr = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

const input3 = parseInt(prompt('Введите номер дня недели (от 1 до 7):'));
const arr_mini = arr[input3 - 1];

if (arr_mini) {
    console.log(`Это день "${arr_mini}".`);
} else {
    console.log('Неверный номер дня.');
}
//task10
function generateString(param1 = "Первый", param2, param3) {
    return `${param1} ${param2} ${param3}`;
}

const input4 = prompt("Введите слово:");
const result3 = generateString( undefined,"из", input4);

console.log(result3);
//task11
function params(g, h) {
    if (g === h) {
        return 4 * g;
    } else {
        return g * h; 
    }
}

const params2 = function(g, h) {
    if (g === h) {
        return 4 * g;
    } else {
        return g * h;
    }
};

const params3 = (g, h) => (g === h) ? 4 * g : g * h;


const g = parseFloat(prompt("Введите значение a:"));
const h = parseFloat(prompt("Введите значение b:"));


if (!isNaN(g) && !isNaN(h)) {
    
    alert(`Результат params: ${params(g, h)}`);
    alert(`Результат params2: ${params2(g, h)}`);
    alert(`Результат params3: ${params3(g, h)}`);
} else {
    alert("Ошибка: введены нечисловые значения.");
}