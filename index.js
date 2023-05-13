
//global vars
let projectList = 
[ 
    {
        name: "A-Star Visualizer",
        description : "Built using HTML, CSS, and Javascript",
        codeLink : "https://github.com/ElasticBop/A-Star-Visualizer",
        projLink : "https://elasticbop.github.io/projects/Pathfinding/index.html",
        img : "./images/astar.png"        
    },
    {
        name: "Portfolio",
        description : "Responsive. Built with HTML, CSS, and Javascript.",
        codeLink : "https://github.com/ElasticBop/elasticbop.github.io",
        projLink : "https://elasticbop.github.io",
        img : "./images/portfolio.png"
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

//computes values provided that projects are loaded and projects aren't empty 
function computeValues(){
    scrollAmountTillNextProject = window.innerWidth - parseInt(style.getPropertyValue("gap"));
    projectItemWidth = projects[0].offsetWidth;
    projectContainerLeft = window.innerWidth/2 - projectItemWidth/2 ;
    projectContainerRight = window.innerWidth/2 + projectItemWidth/2;
}

function createLinkElement(link, classes){
    let pLink = document.createElement("a");
    pLink.setAttribute("href", link);
    pLink.setAttribute("class", classes);
    pLink.setAttribute("target", "_blank");   
    return pLink; 
}

function addProject(project){
    let pItem = document.createElement("div");
    let pImageCon = document.createElement("div");
    let pImage = document.createElement("img");
    let pTextCon = document.createElement("div");
    let pP = document.createElement("p");
    let pH = document.createElement("h1");
    let pLinksCon = document.createElement("div");

    pLinksCon.setAttribute("class", "flex-container project-item-links");
    if( project.codeLink ){
        pLinksCon.appendChild( createLinkElement(project.codeLink, "fa fa-code") );
    }
    if( project.codeLink ){
        pLinksCon.appendChild( createLinkElement(project.projLink, "fa fa-laptop") );
    }
    pP.appendChild(document.createTextNode(project.description));
    pH.appendChild(document.createTextNode(project.name));
    pTextCon.setAttribute("class", "project-item-text");
    pTextCon.appendChild(pH);
    pTextCon.appendChild(pP);
    pTextCon.appendChild(pLinksCon);

    pImage.setAttribute("src", project.img);
    pImage.setAttribute("alt", "No Image Available");
    pImageCon.setAttribute("class", "flex-container project-item-image");
    pImageCon.appendChild(pImage);
    pItem.setAttribute("class", "project-item");
    pItem.appendChild(pImageCon);
    pItem.appendChild(pTextCon);
    projectContainer.appendChild(pItem);
}

//order of elements matter since we select the children based on hard coded index
//z-index for the projectimage is null when first starting for some reason
function projectItemOnClick(e){
    if( e.target.tagName === "A") return;

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

function uncover(){
    document.body.style.visibility = "visible";
}

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