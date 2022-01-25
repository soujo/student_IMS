const dateTime = document.querySelector(".date__time");
const studentResult= document.querySelector(".student__results");


let today = new Date();

let time = today.toLocaleString('en-IN', {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    hour12: true,
    minute: "numeric"
});
dateTime.innerText = `${time}`;
studentResult.style.backgroundColor = "rgb(0, 60, 128)";

const grade = ["O", "E", "A", "B", "C", "D", "F", "I"];
const pointsArr = [10, 9, 8, 7, 6, 5, 2, 2];
let index;
function populate(letterGrade, points) {
    let letterGradeSelection = document.getElementById(letterGrade);
    let pointsSelection = document.getElementById(points);

    index = grade.indexOf(letterGradeSelection.value);
    pointsSelection.value = pointsArr[index];
}