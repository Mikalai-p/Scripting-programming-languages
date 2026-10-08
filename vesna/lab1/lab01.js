var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// ============================================
// Типизированные переменные
// ============================================
var user = {
    name: 'Masha',
    age: 21
};
var userCopy = __assign({}, user);
var numbers = [1, 2, 3];
var numbersCopy = __spreadArray([], numbers, true);
var user1 = {
    name: 'Masha',
    age: 23,
    location: {
        city: 'Minsk',
        country: 'Belarus'
    }
};
var user1Copy = __assign(__assign({}, user1), { location: __assign({}, user1.location) });
var user2 = {
    name: 'Masha',
    age: 28,
    skills: ["HTML", "CSS", "JavaScript", "React"]
};
var user2Copy = __assign(__assign({}, user2), { skills: __spreadArray([], user2.skills, true) });
var array = [
    { id: 1, name: 'Vasya', group: 10 },
    { id: 2, name: 'Ivan', group: 11 },
    { id: 3, name: 'Masha', group: 12 },
    { id: 4, name: 'Petya', group: 10 },
    { id: 5, name: 'Kira', group: 11 },
];
var arrayCopy = array.map(function (item) { return (__assign({}, item)); });
var user4 = {
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
var user4Copy = __assign(__assign({}, user4), { studies: __assign(__assign({}, user4.studies), { exams: __assign({}, user4.studies.exams) }) });
var user5 = {
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
var user5Copy = __assign(__assign({}, user5), { studies: __assign(__assign({}, user5.studies), { department: __assign({}, user5.studies.department), exams: user5.studies.exams.map(function (exam) { return (__assign({}, exam)); }) }) });
var user6 = {
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
var user6Copy = __assign(__assign({}, user6), { studies: __assign(__assign({}, user6.studies), { department: __assign({}, user6.studies.department), exams: user6.studies.exams.map(function (exam) { return (__assign(__assign({}, exam), { professor: __assign({}, exam.professor) })); }) }) });
var user7 = {
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
var user7Copy = __assign(__assign({}, user7), { studies: __assign(__assign({}, user7.studies), { department: __assign({}, user7.studies.department), exams: user7.studies.exams.map(function (exam) { return (__assign(__assign({}, exam), { professor: __assign(__assign({}, exam.professor), { articles: exam.professor.articles.map(function (article) { return (__assign({}, article)); }) }) })); }) }) });
var store = {
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
var storeCopy = __assign(__assign({}, store), { state: __assign(__assign({}, store.state), { profilePage: __assign(__assign({}, store.state.profilePage), { posts: store.state.profilePage.posts.map(function (post) { return (__assign({}, post)); }) }), dialogsPage: __assign(__assign({}, store.state.dialogsPage), { dialogs: store.state.dialogsPage.dialogs.map(function (dialog) { return (__assign({}, dialog)); }), messages: store.state.dialogsPage.messages.map(function (message) { return (__assign({}, message)); }) }), sidebar: __spreadArray([], store.state.sidebar, true) }) });
// Изменения копий
user5Copy.studies.department.group = 12;
user5Copy.studies.exams[1].mark = 10;
user6Copy.studies.exams[0].professor.name = 'Новое имя преподавателя';
// Заменяем find на циклы для совместимости с ES5
var petrIvanovExam;
for (var i = 0; i < user7Copy.studies.exams.length; i++) {
    var exam = user7Copy.studies.exams[i];
    if (exam.professor.name === 'Petr Ivanov') {
        petrIvanovExam = exam;
        break;
    }
}
if (petrIvanovExam) {
    var aboutCssArticle = void 0;
    for (var j = 0; j < petrIvanovExam.professor.articles.length; j++) {
        var article = petrIvanovExam.professor.articles[j];
        if (article.title === "About CSS") {
            aboutCssArticle = article;
            break;
        }
    }
    if (aboutCssArticle) {
        aboutCssArticle.pagesNumber = 3;
    }
}
storeCopy.state.profilePage.posts.forEach(function (post) {
    post.message = "Hello";
});
storeCopy.state.dialogsPage.messages.forEach(function (message) {
    message.message = "Hello";
});
console.log("user5Copy после изменений:", user5Copy);
console.log("user6Copy после изменений:", user6Copy);
console.log("user7Copy после изменений:", user7Copy);
console.log("storeCopy после изменений:", storeCopy);
