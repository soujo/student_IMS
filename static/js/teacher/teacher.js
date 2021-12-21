const dateTime= document.querySelector(".date__time");

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