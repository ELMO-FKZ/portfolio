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

    //-- Get dark mode data when the DOM get loaded 
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
    //-- Validate the contact form
document.addEventListener("DOMContentLoaded", validateContactForm);

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

function validateContactForm() {
    const nameForm = document.querySelector("#name");
    const emailForm = document.querySelector("#email");
    const messageForm = document.querySelector("#message");
    const submitButton = document.querySelector("#submit");

    let nameIsValid = false;
    let emailIsValid = false;
    let messageIsValid = false;

    // Check if one of the inputs is empty
    if (!nameForm || !emailForm || !messageForm || !submitButton) {
        return;
    }

    // Typing on the name input
    nameForm.addEventListener("input", e => {
        const nameFormValue = e.target.value;
        if (validateName(nameFormValue)) {
            nameIsValid = true;
            applyValidStyle(nameForm);
        }
        else {
            nameIsValid = false;
            applyInvalidStyles(nameForm);
        }
        updateSubmitButton();
    });

    // Typing on the email input
    emailForm.addEventListener("input", e => {
        const emailFormValue = e.target.value;
        if (validateEmail(emailFormValue)) {
            emailIsValid = true;
            applyValidStyle(emailForm);
        }
        else {
            emailIsValid = false;
            applyInvalidStyles(emailForm);
        }
        updateSubmitButton();
    });

    // Typing on message input
    messageForm.addEventListener("input", (event) => {
        const messageFormValue = event.target.value;
        if (validateMessage(messageFormValue)) {
            messageIsValid = true;
            applyValidStyle(messageForm);
        }
        else {
            messageIsValid = false;
            applyInvalidStyles(messageForm);
        }
        updateSubmitButton();
    });
    
    // Function to validate the name input
    const validateName = (value) => {
        const nameValidation = /^[a-zA-Z\u00C0-\u024F\u0027\u002E\u002D\u1E00-\u1EFF]+( [a-zA-Z\u00C0-\u024F\u0027\u002E\u002D\u1E00-\u1EFF\s]+)+$/;
        if (value.match(nameValidation)) {
            return true;
        }
        return false;
    };

    // Function to validate the email input
    const validateEmail = (value) => {
        const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
        if (value.match(emailValidation)) {
            return true;
        }
        return false;
    };

    // Function to validate the message input
    const validateMessage = (value) => {
        const messageValidation = /[\S\s]+[\S]+/;
        if (value.match(messageValidation)) {
            return true;
        }
        return false;
    };

    // Function of styles when an input is not valid
    const applyInvalidStyles = (input) => {
        input.classList.remove("contact__form-input--valid");
        input.classList.add("contact__form-input--error");
    };

    // Function of styles when an input is valid
    const applyValidStyle = (input) => {
        input.classList.remove("contact__form-input--error");
        input.classList.add("contact__form-input--valid");
    };

    // Function of styles when the submit button is disabled
    const disableSubmitButton = () => {
        submitButton.disabled = true;
        submitButton.classList.add("contact__submit--disabled");
    };

    // Function of styles when the submit button is enabled
    const enableSubmitButton = () => {
        submitButton.disabled = false;
        submitButton.classList.remove("contact__submit--disabled");
    };

    // Function to apply enable & disable submit button styles
    const updateSubmitButton = () => {
        if (nameIsValid && emailIsValid && messageIsValid) {
            enableSubmitButton();
        }
        else {
            disableSubmitButton();
        }
    };

    // Make sure the submit button is udated
    updateSubmitButton();
};