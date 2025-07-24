// Efeito de rolagem
const menuLinks = document.querySelectorAll('a[href^="#"]');
menuLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();

        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Animações
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    });
}, { threshold: 0.5 });

const animatedElements = document.querySelectorAll('.animate');
animatedElements.forEach(element => observer.observe(element));

// Botão de voltar ao topo
const backToTopButton = document.getElementById('backToTop');
backToTopButton.classList.add('animate');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
        setTimeout(() => {
            backToTopButton.classList.add('visible');
        }, 10);
    } else {
        backToTopButton.style.display = 'none';
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Menu Hamburguer
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    const overlay = document.querySelector('.overlay');
    const menuItems = document.querySelectorAll('.menu a');

    function toggleMenu() {
        menu.classList.toggle('active');
        hamburger.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Fecha o menu quando um item é clicado
    menuItems.forEach(item => {
        item.addEventListener('click', toggleMenu);
    });
});

// Efeito de Typewriter com Cursor
const typewriterSpan = document.getElementById('typewriter');
const cursorSpan = document.getElementById('cursor');
const textToType = "Olá, eu sou Caio Frederico!";
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
    if (!isDeleting) {
        // Durante a digitação, garante que o cursor fique fixo
        cursorSpan.classList.remove('blink');
        typewriterSpan.textContent = textToType.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === textToType.length) {
            // Quando o texto termina, ativa o cursor piscante e espera 2 segundos
            cursorSpan.classList.add('blink');
            setTimeout(() => {
                isDeleting = true;
                typeLoop();
            }, 2000);
            return;
        }
    } else {
        // Durante a deleção, o cursor fica fixo
        cursorSpan.classList.remove('blink');
        typewriterSpan.textContent = textToType.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
        }
    }
    // Define o delay para digitação (150ms) ou deleção (100ms)
    let delay = isDeleting ? 100 : 150;
    setTimeout(typeLoop, delay);
}
typeLoop();
