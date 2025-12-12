// --- FUNCIÓN DE AUTORES EMERGENTES (ACORDEÓN) ---
function toggleAuthor(card) {
    // 1. Si esta tarjeta ya está abierta, la cerramos
    if (card.classList.contains('open')) {
        card.classList.remove('open');
        return;
    }

    // 2. Cerrar otras tarjetas (para que solo haya una abierta)
    document.querySelectorAll('.author-card').forEach(c => {
       c.classList.remove('open');
    });

    // 3. Abrimos la tarjeta clickeada
    card.classList.add('open');
}

// --- RESTO DE FUNCIONES (FLIP, EXPANDIR, BOOM) ---
function flipCard(card) {
    card.classList.toggle('flipped');
}

function activateFeature(id) {
    document.querySelectorAll('.touch-item').forEach(i => i.classList.remove('active'));
    document.querySelectorAll('.touch-item')[id-1].classList.add('active');
    document.querySelectorAll('.feat-content').forEach(c => c.classList.remove('active'));
    document.getElementById(`feat-${id}`).classList.add('active');
}

function expandPanel(panel) {
    if(panel.classList.contains('expanded')) { panel.classList.remove('expanded'); return; }
    document.querySelectorAll('.h-panel').forEach(p => p.classList.remove('expanded'));
    panel.classList.add('expanded');
}

function revealNextItem(listId) {
    const list = document.getElementById(listId);
    const nextItem = list.querySelector('.hidden-item:not(.revealed)');
    if (nextItem) {
        nextItem.classList.add('revealed');
    } else {
        list.parentElement.style.opacity = "0.7";
        setTimeout(() => list.parentElement.style.opacity = "1", 200);
    }
}

function goBoom() {
    const btn = document.getElementById('boom-btn');
    const msg = document.getElementById('thank-you-msg');
    const audio = document.getElementById('applause-sound');
    
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Audio necesita interacción"));
    
    btn.style.display = 'none';
    msg.style.display = 'block';
    createConfetti();
}

// --- FUNCIÓN DEL FINAL CORREGIDA ---
function goBoom() {
    const btn = document.getElementById('boom-btn');
    const msg = document.getElementById('thank-you-msg');
    const audio = document.getElementById('applause-sound');
    
    // 1. Intentar reproducir audio
    if(audio) {
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Audio bloqueado por navegador"));
    }
    
    // 2. Ocultar botón y mostrar mensaje
    btn.style.display = 'none';
    
    // Usamos una clase CSS para controlar la visibilidad mejor
    msg.classList.add('show');
    
    // 3. Lanzar confeti
    createConfetti();
}

function createConfetti() {
    const colors = ['#4285f4', '#ea4335', '#fbbc04', '#34a853', '#ffffff'];
    const container = document.getElementById('final');
    
    // Creamos 150 partículas
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Color aleatorio
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Posición inicial (Centro de la pantalla)
        // Usamos fixed para asegurar que salgan del centro de la ventana visible
        confetti.style.position = 'fixed'; 
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        
        // Matemáticas para la explosión (Dirección aleatoria en 360 grados)
        const angle = Math.random() * Math.PI * 2;
        // Velocidad aleatoria (fuerza de la explosión)
        const velocity = 200 + Math.random() * 600; 
        
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        // Animación
        confetti.animate([
            { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], { 
            duration: 1500 + Math.random() * 1000, 
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)', 
            fill: 'forwards' 
        });

        container.appendChild(confetti);
        
        // Limpiar memoria borrando el div después de la animación
        setTimeout(() => { confetti.remove(); }, 2500);
    }

};