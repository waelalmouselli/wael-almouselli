document.addEventListener("DOMContentLoaded", () => {
    // 1. Optimized Counter Animation (No Forced Reflow)
    const counters = document.querySelectorAll('.counter');
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 1500; // Total duration in ms
            const startTime = performance.now();

            const updateCount = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const currentCount = Math.floor(progress * target);

                counter.textContent = currentCount;

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = target;
                }
            };
            requestAnimationFrame(updateCount);
        });
    };

    const statsSection = document.getElementById('stats-counter');
    if (statsSection) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(statsSection);
    }

    // 2. Matrix Code Rain Engine
    const matrixCanvases = document.querySelectorAll('.matrix-bg');
    matrixCanvases.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        const parent = canvas.parentElement;
        const fontSize = 14;
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+-/<>{}[]const;let;var;async;await;return;";
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

            ctx.fillStyle = '#84cc16';
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
    });

    // 3. Navbar & Mobile Menu Optimization
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
