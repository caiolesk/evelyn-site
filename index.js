
document.addEventListener('DOMContentLoaded', () => {
    // Ano atual
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Menu Mobile
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');

    if (menuBtn && mobileMenu) {
        menuBtn.onclick = (e) => {
            e.stopPropagation();
            const isHidden = mobileMenu.classList.toggle('hidden');
            menuBtn.innerHTML = isHidden ? '☰' : '<span class="text-3xl">&times;</span>';
            if (!isHidden) {
                mobileMenu.classList.add('flex');
            }
        };

        // Fecha menu ao clicar fora
        document.onclick = (e) => {
            if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                menuBtn.textContent = '☰';
            }
        };
    }

    // Scroll Suave com Offset para ancoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.onclick = function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                mobileMenu.classList.add('hidden');
                menuBtn.textContent = '☰';

                const offset = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        };
    });

    // Intersection Observer para as animações de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // Scroll simples para mudar o estilo da navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('glass', 'py-4', 'shadow-md');
            navbar.classList.remove('py-6');
        } else {
            navbar.classList.remove('glass', 'py-4', 'shadow-md');
            navbar.classList.add('py-6');
        }
    });
});
