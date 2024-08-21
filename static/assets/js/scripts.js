document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarLinks = document.querySelector('.navbar-links');
    const menuIcon = document.getElementById('menu-icon');
    const contactForm = document.getElementById('contact-form');
    const contactFeedback = document.getElementById('contact-feedback');
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterFeedback = document.getElementById('feedback');
    const sticky = navbar.offsetTop;

    const menuClosedImage = "/static/assets/images/abrirmenu.png";
    const menuOpenedImage = "/static/assets/images/menufechado.png";

    // Sticky Navbar
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > sticky) {
            navbar.classList.add('fixed');
        } else {
            navbar.classList.remove('fixed');
        }
    });

    // Toggle Navbar on Mobile
    navbarToggler.addEventListener('click', function() {
        navbarLinks.classList.toggle('show');
        menuIcon.src = navbarLinks.classList.contains('show') ? menuOpenedImage : menuClosedImage;
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Newsletter Form Submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const emailInput = document.getElementById('email-input');

            fetch('/subscribe/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                },
                body: new URLSearchParams({
                    'email': emailInput.value
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    newsletterFeedback.innerHTML = `<p class="success-message">${data.message}</p>`;
                    emailInput.value = '';  // Limpa o campo de email
                } else {
                    newsletterFeedback.innerHTML = `<p class="error-message">${data.message}</p>`;
                }
            })
            .catch(error => {
                newsletterFeedback.innerHTML = `<p class="error-message">Erro ao processar o pedido. Tente novamente mais tarde.</p>`;
            });
        });
    }

    // Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(contactForm);

            fetch('/enviar-contato/', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    contactFeedback.innerHTML = '<p class="success">Mensagem enviada com sucesso!</p>';
                    contactForm.reset();
                } else {
                    contactFeedback.innerHTML = '<p class="error">Erro ao enviar mensagem. Por favor, tente novamente.</p>';
                }
            })
            .catch(error => {
                contactFeedback.innerHTML = '<p class="error">Ocorreu um erro. Por favor, tente novamente mais tarde.</p>';
            });
        });
    }
});
