const dateTime= document.querySelector(".date__time");
const flagCross=document.querySelector(".flag__cross");
const flag=document.getElementById("flag");
const books= document.querySelector(".books");

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

flagCross.addEventListener("click",function (){
    flag.classList.remove("flag");
    flag.classList.add("off");
});

books.style.backgroundColor = "rgb(0, 60, 128)";