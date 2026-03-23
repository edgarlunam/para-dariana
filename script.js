const misFotosDeCarga = ['Foto.jpg', 'Foto1.jpg', 'Foto2.jpg', 'Foto3.jpg', 'Foto4.jpg', 'Foto5.jpg', 'Foto6.jpg', 'Foto7.jpg', 'Foto8.jpg', 'Foto9.jpg', 'Foto10.jpg', 'Foto11.jpg', 'Foto12.jpg', 'Foto13.jpg', 'Foto14.jpg'];
const razonesOriginales = [
    "Me encanta tu sonrisa al despertar.",
    "Amo cómo te brillan los ojos cuando hablas de código.",
    "Eres mi mejor debug en los días difíciles.",
    // AGREGA AQUÍ LAS DEMÁS
];

const razones = [...razonesOriginales].sort(() => Math.random() - 0.5);
let cartasAbiertas = 0;

window.onload = () => {
    const stack = document.getElementById('photo-stack');
    misFotosDeCarga.forEach((foto, i) => {
        const img = document.createElement('img');
        img.src = `img/${foto}`;
        img.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 30 - 15}deg)`;
        img.style.zIndex = i;
        stack.appendChild(img);
    });

    setTimeout(() => {
        const loader = document.getElementById('loader');
        if(loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 1000);
        }
    }, 5000);
};

// FUNCIÓN DE MÚSICA CORREGIDA
function irA(id) {
    // Intentar reproducir la música CADA VEZ que se cambia de pantalla.
    // Una vez que empiece a sonar, las siguientes llamadas no harán nada (porque ya estará sonando).
    const musica = document.getElementById('musica');
    if (musica) {
        musica.volume = 0.5;
        musica.play().catch(error => {
            console.log("El navegador bloqueó el audio, intentando de nuevo en el siguiente clic...");
        });
    }

    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    const proximaPantalla = document.getElementById(id);
    if(proximaPantalla) proximaPantalla.classList.add('active');
    
    if(id === 'pantalla3') generarJardin();
}

document.getElementById('btnNo').addEventListener('click', function() {
    // También intentamos aquí por si acaso
    const musica = document.getElementById('musica');
    if(musica) musica.play().catch(() => {});

    this.style.position = 'fixed';
    this.style.top = Math.random() * 80 + 10 + '%';
    this.style.left = Math.random() * 80 + 10 + '%';
});

document.getElementById('btnPoquito').addEventListener('mouseenter', function() {
    this.style.position = 'fixed';
    this.style.top = Math.random() * 80 + 10 + '%';
    this.style.left = Math.random() * 80 + 10 + '%';
});

function generarJardin() {
    const jardin = document.getElementById('jardin');
    if(!jardin) return;
    jardin.innerHTML = '';
    const flores = ['Gerbera1.png', 'Gerbera2.png', 'Gerbera3.png', 'Gerbera_Art.png'];
    const total = 12;
    for(let i=0; i<total; i++) {
        const img = document.createElement('img');
        img.src = `img/${flores[i % 4]}`;
        img.className = 'flor-brotando';
        img.style.left = (i * (90 / (total - 1))) + 5 + '%';
        img.style.animationDelay = (i * 0.1) + 's';
        jardin.appendChild(img);
    }
}

function iniciarTransicion() {
    irA('pantalla4');
    setTimeout(() => {
        irA('pantalla5');
        generarCartas();
    }, 5000);
}

function generarCartas() {
    const container = document.getElementById('mosaico-container');
    if(!container) return;
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
            const contador = document.getElementById('contador-flotante');
            if(contador) contador.innerText = `${cartasAbiertas} / ${razonesOriginales.length}`;
            if(cartasAbiertas === razonesOriginales.length) celebrar();
        };
        container.appendChild(div);
    });
}

function celebrar() {
    const end = Date.now() + 10000;
    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#e4007c', '#ffffff'] });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#e4007c', '#ffffff'] });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}