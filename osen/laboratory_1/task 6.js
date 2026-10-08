let russian = true;  
let math = true;
let english = true;


if (russian && math && english) {
    console.log("Студент переведен на следующий курс");
} else if (!russian && !math && !english) {
    console.log("Студент отчислен");
} else {
    console.log("Студент ожидает пересдачи");
}