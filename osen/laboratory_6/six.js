console.log("\n1. Деструктуризация массива:");
const numbers = [10, 20, 30, 40, 50];
const [y] = numbers;
console.log("Первый элемент массива:", y); 

console.log("\n2. Spread оператор с объектами:");
const user = {
    name: "Микола",
    age: 25
};

const admin = {
    admin: true,
    ...user
};
console.log("Объект admin:", admin);

console.log("\n3. Деструктуризация сложного объекта:");

let store = {
    state: { // 1 уровень
        profilePage: { // 2 уровень
            posts: [ // 3 уровень
                {id: 1, message: 'Hi', likesCount: 12},
                {id: 2, message: 'By', likesCount: 1}
            ],
            newPostText: 'About me',
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Valera'},
                {id: 2, name: 'Andrey'},
                {id: 3, name: 'Sasha'},
                {id: 4, name: 'Viktor'},
            ],
            messages: [
                {id: 1, message: 'hi'},
                {id: 2, message: 'hi hi'},
                {id: 3, message: 'hi hi hi'},
            ],
        },
        sidebar: []
    }
};
const {
    state: {
        profilePage: {
            posts
        },
        dialogsPage: {
            dialogs,
            messages
        }
    }
} = store;
console.log("Значения likesCount из массива posts:");
posts.forEach(post => {
    console.log(`Пост ID ${post.id}: ${post.likesCount} лайков`);
});
const evenIdDialogs = dialogs.filter(dialog => dialog.id % 2 === 0);
console.log("\nПользователи с четными ID:", evenIdDialogs);
const updatedMessages = messages.map(message => ({
    ...message,
    message: "Hello user"
}));
console.log("\nОбновленные сообщения:", updatedMessages);
console.log("\n4. Spread оператор с массивами:");

let tasks = [
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
    { id: 4, title: "Rest API", isDone: false },
    { id: 5, title: "GraphQL", isDone: false },
];

const newTask = { id: 6, title: "Новая задача", completed: false };

const updatedTasks = [...tasks, newTask];
console.log("Обновленный список задач:", updatedTasks);

console.log("\n5. Spread оператор для передачи параметров:");

function sumValues(a, b, c) {
    return a + b + c;
}

const values = [1, 2, 3];
const result = sumValues(...values);
console.log(`Сумма значений [${values}]:`, result);

