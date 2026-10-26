document.documentElement.classList.add('js');

const header = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function setMenu(open) {
    if (!navToggle || !navMenu) return;

    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    navMenu.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
}

navToggle?.addEventListener('pointerdown', () => {
    navToggle.classList.add('is-pressed');
});

navToggle?.addEventListener('pointerup', () => {
    navToggle.classList.remove('is-pressed');
});

navToggle?.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    setMenu(!isOpen);
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 820) setMenu(false);
});

function updateHeader() {
    header?.classList.toggle('is-scrolled', window.scrollY > 24);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const revealItems = document.querySelectorAll('.reveal');

if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px'
    });

    revealItems.forEach((item) => revealObserver.observe(item));
}

const photoSlider = document.querySelector('.music-photo-slider');

if (photoSlider) {
    const slides = [...photoSlider.querySelectorAll('.music-photo-slide')];
    const counter = photoSlider.querySelector('[data-photo-counter]');
    let currentSlide = 0;
    let sliderTimer = null;

    const updateSlide = (nextIndex) => {
        slides[currentSlide].classList.remove('is-active');
        currentSlide = nextIndex;
        slides[currentSlide].classList.add('is-active');

        if (counter) {
            counter.textContent = `${String(currentSlide + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
        }
    };

    const stopSlider = () => {
        window.clearInterval(sliderTimer);
        sliderTimer = null;
    };

    const startSlider = () => {
        if (sliderTimer || document.hidden || slides.length < 2) return;
        sliderTimer = window.setInterval(() => {
            updateSlide((currentSlide + 1) % slides.length);
        }, 4200);
    };

    if ('IntersectionObserver' in window) {
        const sliderObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) startSlider();
                else stopSlider();
            });
        }, { threshold: 0.2 });

        sliderObserver.observe(photoSlider);
    } else {
        startSlider();
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopSlider();
        else if (photoSlider.getBoundingClientRect().top < window.innerHeight && photoSlider.getBoundingClientRect().bottom > 0) startSlider();
    });
}

const currentYear = document.getElementById('currentYear');
if (currentYear) currentYear.textContent = new Date().getFullYear();
