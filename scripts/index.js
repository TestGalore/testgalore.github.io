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

let projectItemWidth = projects[0].offsetWidth;

let projectContainerLeft = window.innerWidth/2 - projectItemWidth/2 ;
let projectContainerRight = window.innerWidth/2 + projectItemWidth/2;
let counter = 0

window.addEventListener("resize", function(){
    projectContainer.scrollLeft = 0;
    scrollAmountTillNextProject = window.innerWidth - parseInt(style.getPropertyValue("gap"));
    projectItemWidth = projects[0].offsetWidth;
    projectContainerLeft = window.innerWidth/2 - projectItemWidth/2;
    projectContainerRight = window.innerWidth/2 + projectItemWidth/2;
});

projectContainer.addEventListener('click', function(e){
    if( e.clientX <= projectContainerLeft){
        counter = --counter % numProjects;
        if( counter < 0){
            counter = numProjects-1;
        }
    }
    if( e.clientX >= projectContainerRight){
        counter = ++counter % numProjects;
    }
    projectContainer.scrollTo({
        top: 0,
        left: scrollAmountTillNextProject*counter,
        behaviour: "smooth",
    });
    console.log(counter);
});
