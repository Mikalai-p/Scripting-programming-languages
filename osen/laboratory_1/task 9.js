const weekDays = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

const dayNumber = parseInt(prompt("Введите номер дня недели (1-7):"));

if (dayNumber >= 1 && dayNumber <= 7) {
    const dayName = weekDays[dayNumber - 1];
  console.log(`День недели: ${dayName}`);
} else {
  console.log("Ошибка! Введите число от 1 до 7.");
}


const weekDays = {
  1: "пн",
  2: "вт", 
  3: "ср",
  4: "чт",
  5: "пт",
  6: "сб",
  7: "вс"
};


const dayNumber = parseInt(prompt("Введите номер дня недели (1-7):"));


if (weekDays.hasOwnProperty(dayNumber)) {
  const dayName = weekDays[dayNumber];
  console.log(`День недели: ${dayName}`);
} else {
  console.log("Ошибка! Введите число от 1 до 7.");
}