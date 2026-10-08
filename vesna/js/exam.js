function Counter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}
const cou = Counter();
console.log('Счетчик');
console.log(cou());
console.log(cou());
console.log(cou());

function createAdder(n) {
    return function(x){
        return x + n;
    };
}
const add5 = createAdder(5);
console.log('Каррирование');
console.log(add5(30));
console.log(add5(1000));

const user = {
    name: 'John',
    sayHi() {
        return `Привет, ${this.name}!`;
    }
};
console.log('Контекст this');
const sayHiCopy = user.sayHi;
console.log(sayHiCopy());

const sayHiBind = user.sayHi.bind(user);
console.log(sayHiBind());

console.log(user.sayHi.call({name: 'Alice'}));

console.log('Spread');
const product = { id:1, title: 'Phone', price:1000 };
const updateProduct = {...product, id: product.id * 10, price: product.price * 2};

console.log(product);
console.log(updateProduct);

console.log('Деструктуризация');
function minMax(arr) {
    return [Math.min(...arr), Math.max(...arr)];
}

const nem = [3, 5, 124, 44, 1, 12];
const [min, max] = minMax(nem);
console.log(`${min}, ${max}`);

console.log('Set');
const arr = [1, 2, 2, 3, 4, 5, 5, 7];
const uniq = [...new Set(arr)];
console.log(arr);
console.log(uniq);

console.log('Map');
const usersMap = new Map([
    ['Анна', 25],
    ['Борис', 12],
    ['Александр', 21],
    ['Гриша', 20],
]);
const adultUsers = [];
for (const [name, age] of usersMap) {
    if (age > 18) adultUsers.push(`${name} (${age} лет)`);
}
console.log('Все', Object.fromEntries(usersMap));
console.log('Старше 18',adultUsers);

console.log('Цепочка вызовов');
const ladder = {
    step: 0,
    up() {
        this.step++;
        return this;
    },
down() {
    this.step--;
    return this;
},
showStep() {
    console.log('Текущая', this.step);
    return this;
}
};

ladder.up().up().up().showStep().down().down().showStep();

console.log('Async/await + try/catch');
async function getData() {
    try {
        const response = await fetch('https://dummyjson.com/products')
        if (!response.ok) {
            throw new Error(`Http error, status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Данные получены:', data);
        return data;
    }
    catch (err) {
        console.error('Ошибка:', err.message);
    }
}
getData();

const promises = [
    Promise.resolve('Успех 1'),
    Promise.resolve('Успех 2'),
    Promise.reject('Неудача 1'),
    Promise.resolve('Успех 3'),
    Promise.reject('Неудача 2'),
];
Promise.allSettled(promises)
.then(results => {
    console.log('Все:', results);

    const successful = results
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value);

    console.log('Успешные:', successful);
})

console.log('Гонка промиссов');
function fetchFast(){
    return new Promise(resolve => {
        setTimeout(() => resolve('3000ms'), 3000);
    });
}
function fetchSlow() {
    return new Promise(resolve => {
        setTimeout(() => resolve('500ms'), 500);
    });
}
Promise.race([fetchFast(), fetchSlow()])
.then(result => {
    console.log('Победитель', result);
});

console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
