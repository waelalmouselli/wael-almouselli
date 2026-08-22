document.addEventListener("DOMContentLoaded", () => {
    // 1. CV Matrix Animation (Optimized with ResizeObserver)
    const canvas = document.querySelector('.matrix-bg-cv');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const parent = canvas.parentElement;
        const fontSize = 14;
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789PYTHONJSREACT@#$%&*+-_";
        const alphabet = characters.split('');
        let columns = 0;
        let drops = [];

        if (parent) {
            const resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    const width = entry.contentRect.width;
                    const height = entry.contentRect.height;
                    if (width === 0 || height === 0) continue;

                    canvas.width = width;
                    canvas.height = height;
                    columns = Math.floor(width / fontSize);
                    drops = Array(columns).fill(1);
                }
            });
            resizeObserver.observe(parent);
        }

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
});
