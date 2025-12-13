// --- AUTORES ---
function toggleAuthor(card) {
    card.classList.toggle('open');
}

// --- FLIP CARDS ---
function flipCard(card) {
    card.classList.toggle('flipped');
}

// --- OMNIBARRA ---
function activateFeature(id) {
    document.querySelectorAll('.touch-item').forEach(i => i.classList.remove('active'));
    document.querySelectorAll('.touch-item')[id - 1].classList.add('active');
    document.querySelectorAll('.feat-content').forEach(c => c.classList.remove('active'));
    document.getElementById(`feat-${id}`).classList.add('active');
}

// --- HIBRIDO ---
function expandPanel(panel) {
    if (panel.classList.contains('expanded')) { panel.classList.remove('expanded'); return; }
    document.querySelectorAll('.h-panel').forEach(p => p.classList.remove('expanded'));
    panel.classList.add('expanded');
}

// --- VEREDICTO (FIXED) ---
function revealNextItem(containerId) {
    // 1. Buscamos el contenedor por su ID
    const container = document.getElementById(containerId);

    // Seguridad: Si no existe, paramos (evita errores en consola)
    if (!container) return;

    // 2. Buscamos el siguiente elemento oculto
    const nextItem = container.querySelector('.hidden-item:not(.revealed)');

    if (nextItem) {
        // 3. ¡Lo mostramos!
        nextItem.classList.add('revealed');
    } else {
        // Si ya no hay nada que mostrar, damos un pequeño feedback visual (opacidad)
        container.parentElement.style.opacity = "0.7";
        setTimeout(() => container.parentElement.style.opacity = "1", 200);
    }
}

// --- FINAL ---
function goBoom() {
    const btn = document.getElementById('boom-btn');
    const msg = document.getElementById('thank-you-msg');
    const audio = document.getElementById('applause-sound');

    if (audio) {
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Audio bloqueado"));
    }

    btn.style.display = 'none';
    msg.style.display = 'block';
    msg.classList.add('show');

    createConfetti();
}

function createConfetti() {
    const colors = ['#4285f4', '#ea4335', '#fbbc04', '#34a853', '#ffffff'];
    const container = document.getElementById('final');
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = '50%'; confetti.style.top = '50%';
        const angle = Math.random() * Math.PI * 2;
        const velocity = 200 + Math.random() * 400;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        confetti.animate([
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], { duration: 1500 + Math.random() * 1000, fill: 'forwards' });

        container.appendChild(confetti);
        setTimeout(() => c.remove(), 2500);
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});