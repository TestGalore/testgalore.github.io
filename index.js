
//global vars
let projectList = [{
    description : "Response Portfolio. Built using HTML, CSS, and Javascript.",
    link : "https://elasticbop.github.io/projects/Pathfinding/index.html",
    img : "./images/project1.PNG"
}, {
    description : "A-star Visualizer. Built using HTML, CSS, and Javascript",
    link : "https://elasticbop.github.io/projects/Pathfinding/index.html",
    img : "./images/project2.PNG"        
}
];
let projectContainer = document.getElementById("project-container");
let style = window.getComputedStyle(projectContainer);
let scrollAmountTillNextProject = window.innerWidth - parseInt(style.getPropertyValue("gap"));

let currentProject = 0;
let numProjects = 0;
let projects = null;
let projectItemWidth = 0;
let projectContainerLeft = 0;
let projectContainerRight = 0;

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

//computes values provided that projects are loaded 
function computeValues(){
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

    if(!projectImg.style.zIndex){
        projectImg.style.zIndex = 1;
    }

    if( projectImg.style.zIndex > projectText.style.zIndex  ){
        projectText.style.zIndex++;
        projectImg.style.zIndex--;
    }
    else{
        projectText.style.zIndex--;
        projectImg.style.zIndex++;
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
});

window.addEventListener("resize", function(){
    currentProject = 0;
    projectContainer.scrollLeft = 0;
    computeValues();
});


function initialize() {
    projectList.forEach(addProject);
    projects = document.getElementsByClassName("project-item");
    numProjects = projects.length;
    computeValues();
    for( let i = 0; i < projects.length; i++ ){
        projects[i].addEventListener('click', projectItemOnClick)
    }
}

initialize();