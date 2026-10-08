// Базовые типы
interface User {
    name: string;
    age: number;
}

// Расширения для пользователей с различными вложенными структурами
interface UserLocation {
    city: string;
    country: string;
}

interface UserWithLocation extends User {
    location: UserLocation;
}

interface UserWithSkills extends User {
    skills: string[];
}

// Элемент массива array
interface ArrayItem {
    id: number;
    name: string;
    group: number;
}

// Типы для экзаменов и профессоров
interface ExamItem {
    maths?: boolean;
    programming?: boolean;
    mark: number;
}

interface ProfessorBase {
    name: string;
    degree: string;
}

interface ProfessorWithArticles extends ProfessorBase {
    articles: Article[];
}

interface Article {
    title: string;
    pagesNumber: number;
}

interface ExamWithProfessor extends ExamItem {
    professor: ProfessorBase;
}

interface ExamWithProfessorArticles extends ExamItem {
    professor: ProfessorWithArticles;
}

// Структура department
interface Department {
    faculty: string;
    group: number;
}

// Варианты studies для разных пользователей
interface StudiesUser4 {
    university: string;
    speciality: string;
    year: number;
    exams: {
        maths: boolean;
        programming: boolean;
    };
}

interface StudiesUser5 {
    university: string;
    speciality: string;
    year: number;
    department: Department;
    exams: ExamItem[];
}

interface StudiesUser6 {
    university: string;
    speciality: string;
    year: number;
    department: Department;
    exams: ExamWithProfessor[];
}

interface StudiesUser7 {
    university: string;
    speciality: string;
    year: number;
    department: Department;
    exams: ExamWithProfessorArticles[];
}

// Интерфейсы пользователей
interface User4 extends User {
    studies: StudiesUser4;
}

interface User5 extends User {
    studies: StudiesUser5;
}

interface User6 extends User {
    studies: StudiesUser6;
}

interface User7 extends User {
    studies: StudiesUser7;
}

// Типы для store (состояние приложения)
interface Post {
    id: number;
    message: string;
    likesCount: number;
}

interface ProfilePage {
    posts: Post[];
    newPostText: string;
}

interface Dialog {
    id: number;
    name: string;
}

interface Message {
    id: number;
    message: string;
}

interface DialogsPage {
    dialogs: Dialog[];
    messages: Message[];
}

interface State {
    profilePage: ProfilePage;
    dialogsPage: DialogsPage;
    sidebar: any[];
}

interface Store {
    state: State;
}

// ============================================
// Типизированные переменные
// ============================================

let user: User = {
    name: 'Masha',
    age: 21
};
let userCopy: User = { ...user };

let numbers: number[] = [1, 2, 3];
let numbersCopy: number[] = [...numbers];

let user1: UserWithLocation = {
    name: 'Masha',
    age: 23,
    location: {
        city: 'Minsk',
        country: 'Belarus'
    }
};
let user1Copy: UserWithLocation = {
    ...user1,
    location: { ...user1.location }
};

let user2: UserWithSkills = {
    name: 'Masha',
    age: 28,
    skills: ["HTML", "CSS", "JavaScript", "React"]
};
let user2Copy: UserWithSkills = {
    ...user2,
    skills: [...user2.skills]
};

const array: ArrayItem[] = [
    { id: 1, name: 'Vasya', group: 10 },
    { id: 2, name: 'Ivan', group: 11 },
    { id: 3, name: 'Masha', group: 12 },
    { id: 4, name: 'Petya', group: 10 },
    { id: 5, name: 'Kira', group: 11 },
];
let arrayCopy: ArrayItem[] = array.map(item => ({ ...item }));

let user4: User4 = {
    name: 'Masha',
    age: 19,
    studies: {
        university: 'BSTU',
        speciality: 'designer',
        year: 2020,
        exams: {
            maths: true,
            programming: false
        }
    }
};
let user4Copy: User4 = {
    ...user4,
    studies: {
        ...user4.studies,
        exams: { ...user4.studies.exams }
    }
};

let user5: User5 = {
    name: 'Masha',
    age: 22,
    studies: {
        university: 'BSTU',
        speciality: 'designer',
        year: 2020,
        department: {
            faculty: 'FIT',
            group: 10,
        },
        exams: [
            { maths: true, mark: 8 },
            { programming: true, mark: 4 },
        ]
    }
};
let user5Copy: User5 = {
    ...user5,
    studies: {
        ...user5.studies,
        department: { ...user5.studies.department },
        exams: user5.studies.exams.map(exam => ({ ...exam }))
    }
};

let user6: User6 = {
    name: 'Masha',
    age: 21,
    studies: {
        university: 'BSTU',
        speciality: 'designer',
        year: 2020,
        department: {
            faculty: 'FIT',
            group: 10,
        },
        exams: [
            {
                maths: true,
                mark: 8,
                professor: {
                    name: 'Ivan Ivanov',
                    degree: 'PhD'
                }
            },
            {
                programming: true,
                mark: 10,
                professor: {
                    name: 'Petr Petrov',
                    degree: 'PhD'
                }
            },
        ]
    }
};
let user6Copy: User6 = {
    ...user6,
    studies: {
        ...user6.studies,
        department: { ...user6.studies.department },
        exams: user6.studies.exams.map(exam => ({
            ...exam,
            professor: { ...exam.professor }
        }))
    }
};

let user7: User7 = {
    name: 'Masha',
    age: 20,
    studies: {
        university: 'BSTU',
        speciality: 'designer',
        year: 2020,
        department: {
            faculty: 'FIT',
            group: 10,
        },
        exams: [
            {
                maths: true,
                mark: 8,
                professor: {
                    name: 'Ivan Petrov',
                    degree: 'PhD',
                    articles: [
                        { title: "About HTML", pagesNumber: 3 },
                        { title: "About CSS", pagesNumber: 5 },
                        { title: "About JavaScript", pagesNumber: 1 },
                    ]
                }
            },
            {
                programming: true,
                mark: 10,
                professor: {
                    name: 'Petr Ivanov',
                    degree: 'PhD',
                    articles: [
                        { title: "About HTML", pagesNumber: 3 },
                        { title: "About CSS", pagesNumber: 5 },
                        { title: "About JavaScript", pagesNumber: 1 },
                    ]
                }
            },
        ]
    }
};
let user7Copy: User7 = {
    ...user7,
    studies: {
        ...user7.studies,
        department: { ...user7.studies.department },
        exams: user7.studies.exams.map(exam => ({
            ...exam,
            professor: {
                ...exam.professor,
                articles: exam.professor.articles.map(article => ({ ...article }))
            }
        }))
    }
};

let store: Store = {
    state: {
        profilePage: {
            posts: [
                { id: 1, message: 'Hi', likesCount: 12 },
                { id: 2, message: 'By', likesCount: 1 },
            ],
            newPostText: 'About me',
        },
        dialogsPage: {
            dialogs: [
                { id: 1, name: 'Valera' },
                { id: 2, name: 'Andrey' },
                { id: 3, name: 'Sasha' },
                { id: 4, name: 'Viktor' },
            ],
            messages: [
                { id: 1, message: 'hi' },
                { id: 2, message: 'hi hi' },
                { id: 3, message: 'hi hi hi' },
            ],
        },
        sidebar: []
    }
};

let storeCopy: Store = {
    ...store,
    state: {
        ...store.state,
        profilePage: {
            ...store.state.profilePage,
            posts: store.state.profilePage.posts.map(post => ({ ...post }))
        },
        dialogsPage: {
            ...store.state.dialogsPage,
            dialogs: store.state.dialogsPage.dialogs.map(dialog => ({ ...dialog })),
            messages: store.state.dialogsPage.messages.map(message => ({ ...message }))
        },
        sidebar: [...store.state.sidebar]
    }
};

// Изменения копий
user5Copy.studies.department.group = 12;
user5Copy.studies.exams[1].mark = 10;

user6Copy.studies.exams[0].professor.name = 'Новое имя преподавателя';

// Заменяем find на циклы для совместимости с ES5
let petrIvanovExam: ExamWithProfessorArticles | undefined;
for (let i = 0; i < user7Copy.studies.exams.length; i++) {
    const exam = user7Copy.studies.exams[i];
    if (exam.professor.name === 'Petr Ivanov') {
        petrIvanovExam = exam;
        break;
    }
}

if (petrIvanovExam) {
    let aboutCssArticle: Article | undefined;
    for (let j = 0; j < petrIvanovExam.professor.articles.length; j++) {
        const article = petrIvanovExam.professor.articles[j];
        if (article.title === "About CSS") {
            aboutCssArticle = article;
            break;
        }
    }
    if (aboutCssArticle) {
        aboutCssArticle.pagesNumber = 3;
    }
}

storeCopy.state.profilePage.posts.forEach(post => {
    post.message = "Hello";
});

storeCopy.state.dialogsPage.messages.forEach(message => {
    message.message = "Hello";
});

console.log("user5Copy после изменений:", user5Copy);
console.log("user6Copy после изменений:", user6Copy);
console.log("user7Copy после изменений:", user7Copy);
console.log("storeCopy после изменений:", storeCopy);