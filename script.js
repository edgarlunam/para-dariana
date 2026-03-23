// CONFIGURACIÓN
const misFotosDeCarga = ['Foto', 'Foto1.jpg', 'Foto2.jpg', 'Foto3.jpg', 'Foto4.jpg', 'Foto5.jpg', 'Foto6.jpg', 'Foto7.jpg', 'Foto8.jpg', 'Foto9.jpg', 'Foto10.jpg', 'Foto11.jpg', 'Foto12.jpg', 'Foto13.jpg', 'Foto14.jpg']; // FOTOS DEL LOADER
const razonesOriginales = [
    "Me encanta tu sonrisa al despertar.",
    "Amo cómo te brillan los ojos cuando hablas de código.",
    "Eres mi mejor debug en los días difíciles.",
    "Cada momento contigo es mi parte favorita del día.",
    "Adoro la forma en que me miras sin decir nada.",
    // RELLENA LAS 100 AQUÍ
];

// Shuffle: Mezcla las razones al azar cada vez que entra
const razones = [...razonesOriginales].sort(() => Math.random() - 0.5);

let cartasAbiertas = 0;

// FIX: Usamos DOMContentLoaded para que el timer inicie sin esperar a las fotos pesadas
document.addEventListener('DOMContentLoaded', () => {
    const stack = document.getElementById('photo-stack');
    
    misFotosDeCarga.forEach((foto, i) => {
        const img = document.createElement('img');
        img.src = `img/${foto}`;
        img.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 40 - 20}deg)`;
        img.style.zIndex = i;
        stack.appendChild(img);
    });

    // Forzamos aparición del botón a los 5 segundos
    setTimeout(() => {
        const status = document.getElementById('loader-status');
        if(status) status.innerText = "¡Listo para mi princesa!";
        
        const btn = document.getElementById('btn-entrar');
        if(btn) btn.style.display = "block";
    }, 5000); 
});

function comenzarSorpresa() {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 1000);
    
    // Música con Fade-in al 50%
    const musica = document.getElementById('musica');
    musica.volume = 0;
    musica.play();
    let vol = 0;
    const interval = setInterval(() => {
        if (vol < 0.5) {
            vol += 0.05;
            musica.volume = Math.min(vol, 0.5);
        } else {
            clearInterval(interval);
        }
    }, 250); 
}

function irA(id) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if(id === 'pantalla3') generarJardin();
}

// Botones que huyen
const btnNo = document.getElementById('btnNo');
btnNo.addEventListener('click', () => {
    btnNo.style.position = 'fixed';
    btnNo.style.top = Math.random() * 70 + 15 + '%';
    btnNo.style.left = Math.random() * 70 + 15 + '%';
});

const btnPoquito = document.getElementById('btnPoquito');
btnPoquito.addEventListener('mouseenter', () => {
    btnPoquito.style.position = 'fixed';
    btnPoquito.style.top = Math.random() * 70 + 15 + '%';
    btnPoquito.style.left = Math.random() * 70 + 15 + '%';
});

function generarJardin() {
    const jardin = document.getElementById('jardin');
    jardin.innerHTML = '';
    const flores = ['Gerbera1.png', 'Gerbera2.png', 'Gerbera3.png', 'Gerbera_Art.png'];
    const totalFlores = 12; // Cantidad de gerberas fijas
    
    for(let i=0; i < totalFlores; i++) {
        const img = document.createElement('img');
        img.src = `img/${flores[i % 4]}`;
        img.className = 'flor-brotando';
        // Posicionamiento uniforme para que no se amontonen
        img.style.left = (i * (90 / (totalFlores - 1))) + 5 + '%';
        img.style.animationDelay = (i * 0.2) + 's';
        jardin.appendChild(img);
    }
}

function iniciarTransicion() {
    irA('pantalla4');
    setTimeout(() => {
        irA('pantalla5');
        document.getElementById('pantalla5').style.display = 'block';
        generarCartas();
    }, 5000);
}

function generarCartas() {
    const container = document.getElementById('mosaico-container');
    container.innerHTML = '';
    razones.forEach((texto) => {
        const div = document.createElement('div');
        div.className = 'sobre';
        div.innerHTML = '✉️';
        div.onclick = function() {
            this.className = 'hoja';
            this.innerHTML = texto;
            this.onclick = null;
            cartasAbiertas++;
            document.getElementById('contador-flotante').innerText = `${cartasAbiertas} / ${razones.length}`;
            if(cartasAbiertas === razones.length) celebrar();
        };
        container.appendChild(div);
    });
}

function celebrar() {
    const end = Date.now() + 10000;
    (function frame() {
        confetti({ particleCount: 6, angle: 60, spread: 60, origin: { x: 0 }, colors: ['#e4007c', '#ffffff', '#ffb6c1'] });
        confetti({ particleCount: 6, angle: 120, spread: 60, origin: { x: 1 }, colors: ['#e4007c', '#ffffff', '#ffb6c1'] });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}