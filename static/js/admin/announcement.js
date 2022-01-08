const dateTime= document.querySelector(".date__time");
const flagCross=document.querySelector(".flag__cross");
const flag=document.getElementById("flag");
const announcement= document.querySelector(".announcement");

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

announcement.style.backgroundColor = "rgb(0, 60, 128)";