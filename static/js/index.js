const loginContent = document.querySelector(".login-content");
const loginBtn = document.querySelector(".login-btn");
const registerContent = document.querySelector(".register-content");
const registerBtn = document.querySelector(".register-btn");

loginContent.addEventListener("mouseover",()=>{
    loginBtn.style.backgroundColor = "white";
    loginBtn.style.color = "#45B1F6";
    loginBtn.style.boxShadow = "inset 0 0 0 2px #45B1F6";
    loginBtn.style.transition = "0.2s ease-in-out";

});

loginContent.addEventListener("mouseout",()=>{
    loginBtn.style.backgroundColor = "#45B1F6";
    loginBtn.style.color = "white";

});

registerContent.addEventListener("mouseover",()=>{
    registerBtn.style.backgroundColor = "#45B1F6";
    registerBtn.style.color = "white";
    registerBtn.style.transition = "0.2s ease-in-out";

});

registerContent.addEventListener("mouseout",()=>{
    registerBtn.style.backgroundColor = "white";
    registerBtn.style.color = "#45B1F6";
    registerBtn.style.border = "2px solid #45B1F6";
});

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
