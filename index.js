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

let projectList = [{
    description : "Responsive portfolio to store  my current and future projects. Built using HTML, CSS, and Javascript.",
    img : "./images/project1.PNG"
}, {
    description : "Responsive visualization of the A-star pathfinding algorithm using the manhattan distance as a metric. Built using HTML, CSS, and Javascript",
    link : "https://elasticbop.github.io/projects/Pathfinding/index.html",
    img : "./images/project2.PNG"        
}
];

let projectContainer = document.getElementById("project-container");
let projects = document.getElementsByClassName("project-item");

let style = window.getComputedStyle(projectContainer);
let scrollAmountTillNextProject = window.innerWidth - parseInt(style.getPropertyValue("gap"));

let projectItemWidth = 0;

let projectContainerLeft = window.innerWidth/2 - projectItemWidth/2 ;
let projectContainerRight = window.innerWidth/2 + projectItemWidth/2;
let currentProject = 0;
let numProjects = 2;

function computeValues(){
    style = window.getComputedStyle(projectContainer);
    scrollAmountTillNextProject = window.innerWidth - parseInt(style.getPropertyValue("gap"));
    projectItemWidth = projects[0].offsetWidth;
    projectContainerLeft = window.innerWidth/2 - projectItemWidth/2 ;
    projectContainerRight = window.innerWidth/2 + projectItemWidth/2;
}


function addProject(project){
    let pitem = document.createElement("div");
    let pimagecon = document.createElement("div");
    let pimage = document.createElement("img");
    let ptextcon = document.createElement("div");
    let pspan = document.createElement("span");
    pspan.appendChild(document.createTextNode(project.description));
    ptextcon.setAttribute("class", "project-item-text");
    ptextcon.appendChild(pspan);
    pimage.setAttribute("src", project.img);
    pimage.setAttribute("alt", "No Image Available");
    pimagecon.setAttribute("class", "flex-container project-item-image");
    pimagecon.appendChild(pimage);
    pitem.setAttribute("class", "project-item");
    pitem.appendChild(pimagecon);
    pitem.appendChild(ptextcon);
    projectContainer.appendChild(pitem);
    console.log(pitem);
}

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
    currentProject = 0;
    projectContainer.scrollLeft = 0;
    scrollAmountTillNextProject = window.innerWidth - parseInt(style.getPropertyValue("gap"));
    projectItemWidth = projects[0].offsetWidth;
    projectContainerLeft = window.innerWidth/2 - projectItemWidth/2;
    projectContainerRight = window.innerWidth/2 + projectItemWidth/2;
});


function initialize() {
    projectList.forEach(addProject);
    projects = document.getElementsByClassName("project-item");
    for( let i = 0; i < projects.length; i++ ){
        projects[i].addEventListener('click', projectItemOnClick)
    }
    computeValues();
}

initialize();