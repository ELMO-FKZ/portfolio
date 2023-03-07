// Selectors

let darkToggle = document.querySelector('.header__checkbox-item');
let navBurger = document.querySelector('.header__nav-burger');
let list = document.querySelector('.header__list');
let overlay = document.querySelector('.header__overlay');
let switchItems = document.querySelectorAll(".portfolio__switch-item");

// Variables

let darkMode = localStorage.getItem('darkMode');
let prevScrollpos = window.pageYOffset;

// Event listeners

    //-- Get data when the DOM get loaded 
document.addEventListener("DOMContentLoaded", getDarkMode);
    //-- Click on toggle mode checkbox
darkToggle.addEventListener('change', changeMode);
    //-- Header behavior on scroll
window.addEventListener('scroll', HeaderOnScroll);
    //-- Click on burger menu button
navBurger.addEventListener('click', toggleNav);
    //-- Keypress on burger menu button
navBurger.addEventListener('keypress', toggleNavEnter);
    //-- Click on overlay
overlay.addEventListener("click", toggleNav);
    //-- Resize the window
window.addEventListener("resize", windowResize);
    //-- Click on portfolio filter
switchItems.forEach((switchItem) => {
    switchItem.addEventListener("click", removeActive);
    switchItem.addEventListener("click", manageBoxes);
});
    //-- Click ENTER keyboard on portfolio filter
switchItems.forEach((switchItem) => {
    switchItem.addEventListener("keypress", filterOnEnter);
});

// Functions

function getDarkMode() {
    //-- Check if the data already exist
    if (darkMode === 'enabled') {
    document.body.classList.add('body--dark');
    darkToggle.checked=true;
    }
}

function changeMode() {
    darkMode = localStorage.getItem('darkMode'); 
    if (darkMode !== 'enabled') {
        document.body.classList.add('body--dark');
        darkToggle.checked=true;
        localStorage.setItem('darkMode', 'enabled');
    } else {  
        document.body.classList.remove('body--dark');
        darkToggle.checked=false;
        localStorage.setItem('darkMode', 'disabled');
    } 
}

function HeaderOnScroll() {
    const header = document.querySelector('.header');
    let currentScrollPos = window.pageYOffset;
    // On scroll Down
    if (prevScrollpos < currentScrollPos) {
        header.classList.add('header--look'); 
      // On scroll Up  
    } else {
        header.classList.add('header--look');
    }
    prevScrollpos = currentScrollPos;
    // At the top
    if(currentScrollPos==0) {
        header.classList.remove('header--look');
    }
} 

function toggleNav() {
    navBurger.classList.toggle('header__nav-burger--change');
    list.classList.toggle('header__list--show');
    overlay.classList.toggle('header__overlay--show');
}

function toggleNavEnter(e) {
    if (e.key == "Enter") {
        navBurger.click();
    } 
}

function windowResize() {
    overlay.classList.remove('header__overlay--show');
    list.classList.remove('header__list--show');
    navBurger.classList.remove('header__nav-burger--change');
}

function removeActive() {
    switchItems.forEach((switchItem) => {
        switchItem.classList.remove("portfolio__switch-item--active");
        this.classList.add("portfolio__switch-item--active");
    });
}

function manageBoxes() {
    let boxes = document.querySelectorAll(".portfolio__box");
    boxes.forEach((box) => {
        box.style.display = "none";
    });
    document.querySelectorAll(this.dataset.cat).forEach((box) => {
        box.style.display = "block";
    });
}


function filterOnEnter(e) {
    if (e.key == "Enter") {
        e.target.click();
    }
}
