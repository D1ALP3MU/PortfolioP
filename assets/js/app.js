// -------- Toggle icon navbar -----
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', addIconToggle);

// ---------- button Read More section about -------- 
const btnReadMore = document.querySelector('#btnReadMore');

btnReadMore.addEventListener('click', showEducationAndExperience);

// FUNCTIONS
function addIconToggle() {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

function showEducationAndExperience() {
    const sectionEducationExperience = document.querySelector('#container-edu-exp');
    
    if(sectionEducationExperience.style.display === 'block') {
        sectionEducationExperience.style.display = 'none';
        btnReadMore.textContent = 'Ver más';
    } else {
        sectionEducationExperience.style.display = 'block'
        btnReadMore.textContent = 'Ver menos';
    }
}

// -------- Scroll sections active link -----
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach( sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    // -------- Sticky navbar -----
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // -------- Remove toggle icon and navbar when click navbar link (scroll) -----
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// -------- Scroll reveal -----
ScrollReveal({ 
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// -------- typed js -----
const typed = new Typed('.multiple-text', {
    strings: ['Desarrollador de software', 'Desarrollador Frontend'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
})

// -------- smtp js (Para enviar email)-----
const form = document.querySelector('form');
const fullName = document.querySelector('#name');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const subject = document.querySelector('#subject');
const message = document.querySelector('#message');

function sendEmail() {
    const bodyMessage = `Full name: ${fullName.value}.<br> Email: ${email.value}.<br> Phone Number: ${phone.value}.<br> Message: ${message.value}.`

    Email.send({
        SecureToken: "866c3aa3-7678-4424-8bfa-09da6661a174",
        To : 'diegoalejandroperezm@gmail.com',
        From : "diegoalejandroperezm@gmail.com",
        Subject : subject.value,
        Body : bodyMessage
    }).then(
        message => {
            if (message === 'OK') {
                Swal.fire({
                    title: "Bien hecho!",
                    text: "Mensaje enviado con éxito!",
                    icon: "success"
                });
            }
        }
    );
}

function checkInputs() {
    const items = document.querySelectorAll('.item');

    for (const item of items) {
        if (item.value === "") {
            item.classList.add('error');
            item.parentElement.classList.add('error');
        }

        if (items[1].value !== "") {
            checkEmail();
        }

        items[1].addEventListener('keyup', () => {
            checkEmail();
        });

        item.addEventListener('keyup', () => {
            if (item.value !== "") {
                item.classList.remove('error');
                item.parentElement.classList.remove('error');
            } else {
                item.classList.add('error');
            item.parentElement.classList.add('error');
            }
        });
    }
}

function checkEmail() {
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    //const emailRegex = "^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$";
    //const emailRegex = [a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5};

    const errorTxtEmail = document.querySelector('.error-txt.email');

    if (!email.value.match(emailRegex)) {
        email.classList.add('error');
        email.parentElement.classList.add('error');

        if (email.value !== "") {
            errorTxtEmail.innerText = 'Ingrese un correo electrónico válido'
        } else {
            errorTxtEmail.innerText = 'El correo no puede estar en blanco'
        }
    } else {
        email.classList.remove('error');
        email.parentElement.classList.remove('error');
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    checkInputs();

    if (!fullName.classList.contains("error") && !email.classList.contains("error") && !phone.classList.contains("error") && !subject.classList.contains("error") && !message.classList.contains("error")) {
        sendEmail();

        form.reset();
        return false;
    }

});