const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar   = document.querySelector('header nav');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
})

// Initialize the first section as active
window.addEventListener('DOMContentLoaded', () => {
    sections[0].classList.add('active');
    navLinks[0].classList.add('active');
    document.querySelector('header').classList.add('active');
});

const activePage = () => {
    const header = document.querySelector('header');

    // Update navigation state
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

// Handle section visibility on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Update navigation
            const sectionId = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    sectionObserver.observe(section);
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            activePage();
            link.classList.add('active');
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    activePage();
    navLinks[0].classList.add('active');
    
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const resumeBtns = document.querySelectorAll('.resume-btn');

resumeBtns.forEach((btn,idx) => {
    btn.addEventListener('click', ()=> {
        const resumeDetails = document.querySelectorAll('.resume-detail');


        resumeBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        btn.classList.add('active');

        resumeDetails.forEach(detail => {
            detail.classList.remove('active');
        });
        resumeDetails[idx].classList.add('active');
    });
});

const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');

let index = 0;

const activePortfolio = () => {
    const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
    const portfolioDetails = document.querySelectorAll('.portfolio-detail');

    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;

    portfolioDetails.forEach(detail => {
        detail.classList.remove('active');
    });
    portfolioDetails[index].classList.add('active');
}

arrowRight.addEventListener('click', () => {
    if (index < 4) {
        index++;
        arrowLeft.classList.remove('disabled');

    }
    else {
        index = 5;
        arrowRight.classList.add('disabled');
    }
    activePortfolio();
});

arrowLeft.addEventListener('click', () => {
    if (index > 1) {
        index--;
        arrowRight.classList.remove('disabled');

    }
    else {
        index = 0;
        arrowLeft.classList.add('disabled');

    }
    activePortfolio();
}); 
