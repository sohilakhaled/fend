/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const Navbar_menu = document.querySelector('#navbar__list');
const Content_Sections = document.querySelectorAll('section');
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function IsVisible() {
    VisiSection = Content_Sections[0];
    minVal = 1000000;
    for (item of Content_Sections) {
        let bounding = item.getBoundingClientRect();
        if (bounding.top > -300 & bounding.top < minVal) {
            minVal = bounding.top;
            VisiSection = item;
        };
    };
    return VisiSection;


}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
// build the nav
function Build_Nav() {
    for (let i = 0; i < Content_Sections.length; i++) {
        let navitems = document.createElement('li');
        navitems.classList = 'menu__link';
        navitems.setAttribute('data-section-id', Content_Sections[i].id);
        navitems.innerText = `${Content_Sections[i].id}`;
        Navbar_menu.appendChild(navitems);
    };
};
//Responsive Mobile Menu
function MobileMenu() {
    if (Navbar_menu.className === "topnav") {
        Navbar_menu.classList.add('responsive');
    } else {
        Navbar_menu.className = "topnav";
    }
}

// Add class 'active' to section when near top of viewport
function SetSectionsActive() {
    window.addEventListener('scroll', function () {
        let ActiveSection = IsVisible();
        ActiveSection.classList.add('your-active-class');
        for (let i = 0; i < Content_Sections.length; i++) {
            if (Content_Sections[i].id != ActiveSection.id & Content_Sections[i].classList.contains('your-active-class')) {
                Content_Sections[i].classList.remove('your-active-class');
            }
        }
        const ActiveNavItems = document.querySelectorAll('li');
        for (let i = 0; i < ActiveNavItems.length; i++) {
            if (ActiveNavItems[i].getAttribute('data-section-id') == ActiveSection.id) {
                ActiveNavItems[i].classList.add('activelink');
            }
            else {
                ActiveNavItems[i].classList.remove('activelink');
            }
        }
    });
};


// Scroll to anchor ID using scrollTO event
function ScrollToSection() {

    Navbar_menu.addEventListener('click', function (event) {
        const clicked = document.querySelector('#' + event.target.dataset.sectionId);
        clicked.scrollIntoView({ 'behavior': 'smooth' });

    });
};

//Scroll to Top function
let TopButton = document.getElementById("topBtn");
window.onscroll = function () { scrollFunction() };
function scrollFunction() {
    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
        TopButton.style.display = "block";
    } else {
        TopButton.style.display = "none";
    }
}
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu
Build_Nav();
// Scroll to section on link click
ScrollToSection();
// Set sections as active
SetSectionsActive();

