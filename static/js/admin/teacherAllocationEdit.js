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
        "Subject-101",
        "Subject-102",
        "Subject-103",
        "Subject-104",
        "Subject-105",
        "Subject-106",
    ],

    "2nd":
    [
        "Subject-201",
        "Subject-202",
        "Subject-203",
        "Subject-204",
        "Subject-205",
        "Subject-206",
        "Subject-207",
        "Subject-208",
    ],
    "3rd":
    [
        "Subject-301",
        "Subject-302",
        "Subject-303",
        "Subject-304",
        "Subject-305",
        "Subject-306",
        "Subject-307",
        "Subject-308",
        "Subject-309",
        "Subject-310",
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

