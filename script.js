const razones = ["Tus preciosos ojos", "Tu sonrisa", "Tu forma de ser", "Tu apoyo incondicional", "Tu inteligencia", "Tu risa contagiosa", "Tus labios", "Tu cabello", "Tu mirada", "Tu bondad", "Tu paciencia", "Tu fuerza", "Tu alegría", "Tu ternura", "Tu pasión", "Tu estilo", "Tu aroma", "Tu voz", "Tus abrazos", "Tus besos", "Tu honestidad", "Tu lealtad", "Tu compañía", "Tu comprensión", "Tu humildad", "Tu carácter", "Tu dulzura", "Tu seguridad", "Tu valentía", "Tu carisma", "Tu creatividad", "Tu optimismo", "Tu sencillez", "Tu elegancia", "Tu naturalidad", "Tu paz", "Tu energía", "Tu luz", "Tu magia", "Tu esencia", "Tu verdad", "Tu respeto", "Tu amor", "Tu entrega", "Tu dedicación", "Tu tiempo", "Tu vida", "Tu alma", "Tu corazón", "Tu ser", "Tu todo"]; 
// ... (puedes completar las 100 razones aquí)

function irA(id) {
    const musica = document.getElementById('musica');
    if (musica) {
        musica.volume = 0.4;
        musica.play().catch(() => {});
    }

    // Ocultar todas las secciones
    document.querySelectorAll('section').forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
    });

    // Mostrar la seleccionada
    const proxima = document.getElementById(id);
    if (proxima) {
        proxima.classList.add('active');
        // Usar flex para las normales y block para la de 100 cosas
        proxima.style.display = (id === 'pantalla5') ? 'block' : 'flex';
    }
    
    if(id === 'pantalla3') generarJardin();
}

// Movimiento de botones
document.getElementById('btnNo').addEventListener('mouseover', moverBoton);
document.getElementById('btnPoquito').addEventListener('mouseover', moverBoton);

function moverBoton() {
    this.style.position = 'fixed';
    this.style.top = Math.random() * 70 + 15 + '%';
    this.style.left = Math.random() * 70 + 15 + '%';
}

function iniciarTransicion() {
    irA('pantalla4');
    setTimeout(() => {
        irA('pantalla5');
        generarCartas();
    }, 4000);
}

function generarJardin() {
    const jardin = document.getElementById('jardin');
    jardin.innerHTML = '';
    for(let i=0; i<15; i++) {
        const img = document.createElement('img');
        img.src = `img/Gerbera${(i%3)+1}.png`;
        img.className = 'flor-brotando';
        jardin.appendChild(img);
    }
}

function generarCartas() {
    const container = document.getElementById('mosaico-container');
    container.innerHTML = '';
    razones.forEach((texto, i) => {
        const div = document.createElement('div');
        div.className = 'sobre';
        div.innerHTML = '✉️';
        div.onclick = function() {
            this.className = 'hoja';
            this.innerHTML = texto;
        };
        container.appendChild(div);
    });
}

// Quitar loader
window.onload = () => {
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => document.getElementById('loader').remove(), 1000);
    }, 3000);
};