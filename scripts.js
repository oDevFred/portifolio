// Efeito de rolagem
// Seleciona todos os ícones do menu
const menuLinks = document.querySelectorAll('a[href^="#"]');

// Adiciona evento de clique em cada link
menuLinks.forEach(link => {
    link.addEventListener('click', function(event){
        event.preventDefault(); // Impede o comportamento padrão de link

        const targetId = link.getAttribute('href').substring(1); // Remove o '#' do href
        const targetElement = document.getElementById(targetId); // Encontra a seção destino

        // Rolagem suave
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    })
});

// Animações
// Função para adicionar a classe 'visible' aos elementos
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Para de observar o elemento após a animação
    });
}, {threshold: 0.5}); // Detecta quando 50% do elemento tá visível

// Seleciona os elementos que terão animação
const animatedElements = document.querySelectorAll('.animate');

// Inicia observação
animatedElements.forEach(element => observer.observe(element));

// Botão de voltar ao topo
const backToTopButton = document.getElementById('backToTop');

// Adiciona a classe de animação
backToTopButton.classList.add('animate');

// Mostra o botão quando o usuário rola para baixo e adiciona a animação
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { // Quando rolar mais de 300px
        backToTopButton.style.display = 'block';
        setTimeout(() => {
            backToTopButton.classList.add('visible'); // Ativa a animação
        }, 10); // Um pequeno atraso para garantir que o display seja alterado antes da animação
    } else {
        backToTopButton.style.display = 'none';
        backToTopButton.classList.remove('visible'); // Remove a animação quando o botão não estiver visível
    }
});

// Adiciona o evento de clique para voltar ao topo
backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
