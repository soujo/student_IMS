const dateTime= document.querySelector(".date__time");
const teacherAllocation= document.querySelector(".teacher__allocation");

let today=new Date();

let time = today.toLocaleString('en-IN', {  
    weekday:"long",
    day:"numeric",
    month:"long",
    year:"numeric",
    hour:"2-digit",
    hour12:true,
    minute:"numeric"
});
dateTime.innerText=`${time}`;

teacherAllocation.style.backgroundColor = "rgb(0, 60, 128)";


let semesterObj ={
    "1st":
    [
        "Chemistry-I (Gr-B)",
        "Mathematics-IB",
        "Basic Electrical Engineering",
        "Chemistry-I Laboratory (Gr-B)",
        "Basic Electrical Engineering Laboratory",
        "Engineering Graphics & Design (Gr-B)"
    ],

    "2nd":
    [
        "Physics-I (Gr-B)",
        "Mathamatics-IIB",
        "Programming for Problem Solving",
        "English",
        "Physics-I Laboratory (Gr-B)",
        "Programming for Problem Solving Laboratory",
        "Workshop Manufacturing Practices (Gr-B)",
        "Language Laboratory"
    ],
    "3rd":
    [
        "Electric Circuit Theory",
        "Analog Electronics",
        "Elctromagnetic Field Theory",
        "Engineering Mechanics",
        "Mathematics-III",
        "Biology For Engineers",
        "Indian Constitution",
        "Numerical Methods Laboratory",
        "Circuit Theory Laboratory",
        "Analog Electronics Laboratory"
    ]
}

let optionArr;

function populate(sem,sub){

    let semesterSelection= document.getElementById(sem);
    let subjectSelection= document.getElementById(sub);


    subjectSelection.innerHTML=`<option value="" >Select subject</option>`;
    if(semesterSelection.value =="1st"){
        optionArr = semesterObj["1st"];
    }
    else if(semesterSelection.value == "2nd"){
        optionArr = semesterObj["2nd"];
    }
    else{
        optionArr = semesterObj["3rd"];        
    }
    for (let val in optionArr){
        let newOption = document.createElement("option");
        newOption.value=optionArr[val];
        newOption.innerHTML=optionArr[val];
        subjectSelection.options.add(newOption);
    }

}

