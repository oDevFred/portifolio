document.addEventListener('DOMContentLoaded', function () {
    // ---------- Criar container de fundo adicional ----------
    const backgroundContainer = document.createElement('div');
    backgroundContainer.id = 'background-container';
    document.body.insertBefore(backgroundContainer, document.body.firstChild);
    
    // ---------- Mobile menu + smooth scroll ----------
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.querySelector('header');
    
    // Toggle mobile menu
    menuBtn.addEventListener('click', () => {
        const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', String(!expanded));
        menuBtn.classList.toggle('open');
        mobileMenu.classList.toggle('show');
    });
    
    // Close mobile menu when clicking any internal link and perform smooth scroll
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    allNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        // close mobile menu if open
        if (mobileMenu.classList.contains('show')) {
            mobileMenu.classList.remove('show');
            menuBtn.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
        }
        });
    });
    
    // ---------- Top button ----------
    const topBtn = document.getElementById('top-btn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 220) topBtn.classList.remove('hidden');
        else topBtn.classList.add('hidden');
    });
    
    topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    
    // ---------- Close mobile menu when clicking outside ----------
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && mobileMenu.classList.contains('show')) {
        mobileMenu.classList.remove('show');
        menuBtn.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        }
    });
    
    // ---------- Canvas: estrelas simples ----------
    (function () {
        const canvas = document.getElementById('stars');
        const ctx = canvas.getContext('2d');
        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;
        let stars = [];
        
        // Garantir que o canvas sempre cubra toda a viewport
        function updateCanvasSize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        initStars();
        }
        
        function initStars() {
        stars = [];
        const count = Math.round((w * h) / 8000); // scale number of stars
        for (let i = 0; i < count; i++) {
            stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 1.6,
            color: Math.random() > 0.7 ? '#a855f7' : '#ffffff',
            speed: Math.random() * 0.4 + 0.02
            });
        }
        }
        
        function frame() {
        ctx.clearRect(0, 0, w, h);
        for (let s of stars) {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = s.color;
            ctx.fill();
            s.y += s.speed;
            if (s.y > h) s.y = 0;
        }
        requestAnimationFrame(frame);
        }
        
        // Atualizar o tamanho do canvas quando a janela for redimensionada
        window.addEventListener('resize', updateCanvasSize);
        
        // Atualizar o canvas quando a página rolar para ajustar a posição das estrelas
        window.addEventListener('scroll', () => {
        // Ajustar a posição das estrelas com base no scroll
        const scrollY = window.scrollY;
        stars.forEach(star => {
            star.y += scrollY * 0.01; // Movimento sutil das estrelas durante o scroll
            if (star.y > h) star.y = 0;
        });
        });
        
        // Inicializar
        updateCanvasSize();
        frame();
    })();
    
    // ---------- Garantir que o fundo cubra toda a página ----------
    function updateBackgroundHeight() {
        const bodyHeight = document.body.scrollHeight;
        const viewportHeight = window.innerHeight;
        
        // Se o conteúdo for maior que a viewport, ajustar o fundo
        if (bodyHeight > viewportHeight) {
        document.getElementById('background-container').style.height = bodyHeight + 'px';
        }
    }
    
    // Atualizar altura do fundo quando a janela for redimensionada
    window.addEventListener('resize', updateBackgroundHeight);
    
    // Atualizar altura do fundo quando o conteúdo mudar
    const observer = new MutationObserver(updateBackgroundHeight);
    observer.observe(document.body, { 
        childList: true, 
        subtree: true,
        attributes: false,
        characterData: false
    });
    
    // Inicializar
    updateBackgroundHeight();
});