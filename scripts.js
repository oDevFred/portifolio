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
