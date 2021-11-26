const dateTime= document.querySelector(".date__time");
const flagCross=document.querySelector(".flag__cross");
const flag=document.getElementById("flag");
let today=new Date();
const acc = document.getElementsByClassName("accordion");
const result= document.querySelector(".result");

let i;


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

result.style.backgroundColor = "rgb(0, 60, 128)";

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;

    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  
  });
}