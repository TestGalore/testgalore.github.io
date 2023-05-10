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

let projectContainer = document.getElementById("project-container");
let projects = document.getElementsByClassName("project-item");

let style = window.getComputedStyle(projectContainer);
let scrollAmountTillNextProject = window.innerWidth - parseInt(style.getPropertyValue("gap"));

let projectItemWidth = projects[0].offsetWidth;

let projectContainerLeft = window.innerWidth/2 - projectItemWidth/2 ;
let projectContainerRight = window.innerWidth/2 + projectItemWidth/2;
let currentProject = 0;
let numProjects = projects.length;


//order of elements matter since we select the children based on hard coded index
//z-index for the projectimage is null when first starting for some reason
function projectItemOnClick(e){
    let parent = e.target.parentNode;
    while(!parent.classList.contains("project-item")){
        parent = parent.parentNode;
    }
    let projectImg = parent.children[0];
    let projectText = parent.children[1];

    if( projectImg.style.zIndex != 2){
        projectImg.style.zIndex = 2;
        projectText.style.zIndex = 3;
    }
    else{
        projectImg.style.zIndex = 3;
        projectText.style.zIndex = 2;        
    }

}

for( let i = 0; i < projects.length; i++ ){
    projects[i].addEventListener('click', projectItemOnClick)
} 


projectContainer.addEventListener('click', function(e){
    if( e.clientX <= projectContainerLeft){
        currentProject = --currentProject % numProjects;
        if( currentProject < 0){
            currentProject = numProjects-1;
        }
    }
    if( e.clientX >= projectContainerRight){
        currentProject = ++currentProject % numProjects;
    }
    projectContainer.scrollTo({
        top: 0,
        left: scrollAmountTillNextProject*currentProject,
        behaviour: "smooth",
    });
    console.log(currentProject);
});

window.addEventListener("resize", function(){
    projectContainer.scrollLeft = 0;
    scrollAmountTillNextProject = window.innerWidth - parseInt(style.getPropertyValue("gap"));
    projectItemWidth = projects[0].offsetWidth;
    projectContainerLeft = window.innerWidth/2 - projectItemWidth/2;
    projectContainerRight = window.innerWidth/2 + projectItemWidth/2;
});


