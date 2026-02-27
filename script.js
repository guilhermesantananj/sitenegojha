// ============================================
// CONFIGURAÇÕES E VARIÁVEIS
// ============================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// ============================================
// NAVBAR - SCROLL E MENU MOBILE
// ============================================

// Efeito de scroll no navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Toggle do menu mobile
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// ============================================
// NAVEGAÇÃO E REDIRECIONAMENTOS
// ============================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const redirect = link.getAttribute('data-redirect');
        
        // Redirecionamentos externos
        if (redirect === 'musica') {
            e.preventDefault();
            window.open('https://open.spotify.com/intl-pt/artist/2KbGxTODNjsDa9DZgpC6rZ?si=jJWIdSqcQbGYmyLDy6pNbQ', '_blank');
        } else if (redirect === 'video') {
            e.preventDefault();
            window.open('https://www.youtube.com/@negojha', '_blank');
        } else if (redirect === 'fotos') {
            e.preventDefault();
            window.open('https://www.instagram.com/negojhaoficial/', '_blank');
        } else if (link.getAttribute('href').startsWith('#')) {
            // Scroll suave para âncoras internas
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Offset do navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Fechar menu mobile após clicar
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});


// ============================================
// CARROSSEL SPOTIFY
// ============================================

const track = document.querySelector('.carousel-track');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

if (track && nextBtn && prevBtn) {
    let scrollAmount = 0;

    function getMaxScroll() {
        return track.scrollWidth - track.parentElement.offsetWidth;
    }

    nextBtn.addEventListener('click', () => {
        const maxScroll = getMaxScroll();
        scrollAmount += 350;
        if (scrollAmount > maxScroll) scrollAmount = maxScroll;
        track.style.transform = `translateX(-${scrollAmount}px)`;
    });

    prevBtn.addEventListener('click', () => {
        scrollAmount -= 350;
        if (scrollAmount < 0) scrollAmount = 0;
        track.style.transform = `translateX(-${scrollAmount}px)`;
    });
}




// ============================================
// ANIMAÇÕES AO ROLAR (ANIMATE ON SCROLL)
// ============================================

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observar todos os elementos com data-aos
const elementsToAnimate = document.querySelectorAll('[data-aos]');
elementsToAnimate.forEach(element => {
    observer.observe(element);
});

// ============================================
// EFEITO PARALLAX NO HERO
// ============================================

const heroLights = document.querySelectorAll('.light');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    heroLights.forEach((light, index) => {
        const speed = 0.5 + (index * 0.2);
        light.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ============================================
// SMOOTH SCROLL POLYFILL PARA NAVEGADORES ANTIGOS
// ============================================

// Adicionar comportamento de scroll suave para todos os links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignorar links com data-redirect
        if (this.hasAttribute('data-redirect') || href === '#') {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SLIDER BIOGRAFIA
// ============================================

const bioImages = document.querySelectorAll('.bio-slider img');
let currentBio = 0;

setInterval(() => {
    bioImages[currentBio].classList.remove('active');
    currentBio = (currentBio + 1) % bioImages.length;
    bioImages[currentBio].classList.add('active');
}, 10000); // troca a cada 10 segundos


// ============================================
// LOG DE INICIALIZAÇÃO
// ============================================

console.log('%c🎤 Nêgo Jhá - Site Oficial', 'color: #a855f7; font-size: 20px; font-weight: bold;');
console.log('%cSite carregado com sucesso!', 'color: #ec4899; font-size: 14px;');