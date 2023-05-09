document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        let scroll = window.scrollY;
        let arrow = document.querySelector('.arrow');
        if (scroll >= 1) {
            arrow.classList.add('fade');
        } else{
            arrow.classList.remove('fade');
        }

    });
});

let currentProject = 0;
let numProjects = 3;

let projectContainer = document.getElementById("project-container");
let projects = document.getElementsByClassName("project-item");

let style = window.getComputedStyle(projectContainer);
let scrollAmountTillNextProject = window.innerWidth - parseInt(style.getPropertyValue("gap"));
console.log(projectContainer.scrollWidth);

let counter = 0
window.addEventListener('click', function() {

    projectContainer.scrollTo({
        top: 0,
        left: scrollAmountTillNextProject*counter,
        behaviour: "smooth",
    });
    counter = ++counter % numProjects;
})

window.addEventListener("resize", function(){
    projectContainer.scrollLeft = 0;
    scrollAmountTillNextProject = window.innerWidth - parseInt(style.getPropertyValue("gap"));
});

