const person = {
    name: 'Иван',
    age: 25,
    greet() {
        return `Привет, я ${this.name}!`;
    },
    ageAfterYears(years) {
        return this.age + years;
    }
};

const car = {
    model: 'Tesla Model S',
    year: 2022,
    getInfo() {
        return `Модель: ${this.model}, Год выпуска: ${this.year}`;
    }
};

function Book(title, author) {
    this.title = title;
    this.author = author;
    this.getTitle = function() { return this.title; };
    this.getAuthor = function() { return this.author; };
}

const team = {
    players: ['Алексей', 'Мария', 'Иван'],
    printPlayers() {
        this.players.forEach(function(player) {
            console.log(`Игрок: ${player}`);
        }.bind(this));
    }
};

const counter = (function() {
    let count = 0;
    return {
        increment() { return ++count; },
        decrement() { return --count; },
        getCount() { return count; }
    };
})();

let item = {};
Object.defineProperty(item, 'price', {
    value: 100,
    writable: true,
    configurable: true
});

Object.defineProperty(item, 'price', {
    writable: false,
    configurable: false
});

const circle = {
    _radius: 5,
    get area() {
        return Math.PI * this._radius ** 2;
    },
    get radius() {
        return this._radius;
    },
    set radius(value) {
        if (value > 0) this._radius = value;
    }
};

let car2 = { make: 'Toyota', model: 'Camry', year: 2020 };
Object.keys(car2).forEach(prop => {
    Object.defineProperty(car2, prop, {
        writable: false,
        configurable: false
    });
});

const arr = [1, 2, 3];
Object.defineProperty(arr, 'sum', {
    get() {
        return this.reduce((a, b) => a + b, 0);
    },
    enumerable: false
});

const rectangle = {
    _width: 10,
    _height: 5,
    get area() {
        return this._width * this._height;
    },
    get width() { return this._width; },
    set width(value) { if (value > 0) this._width = value; },
    get height() { return this._height; },
    set height(value) { if (value > 0) this._height = value; }
};

const user = {
    firstName: 'Джон',
    lastName: 'Доу',
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    set fullName(value) {
        [this.firstName, this.lastName] = value.split(' ');
    }
};

console.log(person.greet());
console.log(person.ageAfterYears(5));
console.log(car.getInfo());

const myBook = new Book('1984', 'Оруэлл');
console.log(myBook.getTitle());

team.printPlayers();

console.log(counter.increment());
console.log(counter.increment());
console.log(counter.decrement());
console.log(counter.getCount());

console.log(circle.area);
circle.radius = 10;
console.log(circle.area);

console.log(arr.sum);

console.log(rectangle.area);
rectangle.width = 15;
console.log(rectangle.area);

console.log(user.fullName);
user.fullName = 'Иван Петров';
console.log(user.firstName);