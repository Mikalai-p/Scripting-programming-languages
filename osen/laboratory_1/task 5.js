const teacherName = "Шиман Дмитрий Васильевич";

function normalizeString(str) {
    return str.toLowerCase().trim().replace(/\s+/g, ' ');
}

const userInput = prompt("Введите имя преподавателя:");

const normalizedInput = normalizeString(userInput);
const normalizedTeacherName = normalizeString(teacherName);

const allowedVariants = [
    "дмитрий",
    "дмитрий васильевич",
    "шиман дмитрий васильевич"
];

const isValid = allowedVariants.includes(normalizedInput);

if (isValid) {
    alert("Введенные данные верные");
} else {
    alert("Введенные данные не верные");
}