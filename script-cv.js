document.addEventListener("DOMContentLoaded", () => {
    // 1. CV Matrix Animation
    const canvas = document.querySelector('.matrix-bg-cv');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const parent = canvas.parentElement;
        const fontSize = 14;
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789PYTHONJSREACT@#$%&*+-_";
        const alphabet = characters.split('');
        let columns = 0;
        let drops = [];

        const resizeCanvas = () => {
            requestAnimationFrame(() => {
                if (!parent) return;
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
                columns = Math.floor(canvas.width / fontSize);
                drops = Array(columns).fill(1);
            });
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas, { passive: true });

        const drawMatrix = () => {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.08)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#06b6d4';
            ctx.font = fontSize + 'px "Courier New", monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = alphabet[Math.floor(Math.random() * alphabet.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        setInterval(drawMatrix, 50);
    }

    // 2. Navbar & Mobile Menu Optimization
    const navbar = document.querySelector('.navbar');
    const navFlex = document.querySelector('.nav-flex');
    let menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!menuToggle && navFlex) {
        menuToggle = document.createElement('div');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '☰';
        navFlex.appendChild(menuToggle);
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '☰';
            });
        });
    }

    // Passive Smooth Scroll Handler
    let isTicking = false;
    window.addEventListener('scroll', () => {
        if (!isTicking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                    navbar.style.backdropFilter = 'blur(10px)';
                    navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
                } else {
                    navbar.style.background = 'transparent';
                    navbar.style.backdropFilter = 'none';
                    navbar.style.borderBottom = 'none';
                }
                isTicking = false;
            });
            isTicking = true;
        }
    }, { passive: true });
});
