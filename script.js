// 1. CONFIGURACIÓN: Agrega tus fotos y razones
const misFotosDeCarga = ['foto1.jpg', 'foto2.jpg', 'foto3.jpg']; // FOTOS PARA EL INICIO
const razones = [
    "Me encanta tu sonrisa al despertar.",
    "Amo cómo te brillan los ojos cuando hablas de código.",
    "Eres mi mejor debug en los días difíciles.",
    // RELLENA LAS 100 AQUÍ
];

let cartasAbiertas = 0;

// Lógica de Pantalla de Carga
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
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 1000);
    }, 4000); // 4 segundos de intro
};

function irA(id) {
    const musica = document.getElementById('musica');
    musica.play().catch(() => console.log("Esperando interacción para música"));
    
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    const proxima = document.getElementById(id);
    proxima.classList.add('active');
    
    if(id === 'pantalla3') generarJardin();
}

// Botones juguetones
const btnNo = document.getElementById('btnNo');
let scaleNo = 1;
btnNo.addEventListener('click', () => {
    scaleNo -= 0.15;
    btnNo.style.transform = `scale(${Math.max(scaleNo, 0.2)})`;
    btnNo.style.position = 'fixed';
    btnNo.style.top = Math.random() * 80 + 10 + '%';
    btnNo.style.left = Math.random() * 80 + 10 + '%';
});

const btnPoquito = document.getElementById('btnPoquito');
btnPoquito.addEventListener('mouseenter', () => {
    btnPoquito.style.position = 'fixed';
    btnPoquito.style.top = Math.random() * 80 + 10 + '%';
    btnPoquito.style.left = Math.random() * 80 + 10 + '%';
});

function generarJardin() {
    const jardin = document.getElementById('jardin');
    const flores = ['Gerbera1.png', 'Gerbera2.png', 'Gerbera3.png', 'Gerbera_Art.png'];
    for(let i=0; i<15; i++) {
        const img = document.createElement('img');
        img.src = `img/${flores[i % 4]}`;
        img.className = 'flor-brotando';
        img.style.left = Math.random() * 95 + '%';
        img.style.animationDelay = (i * 0.1) + 's';
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
    const duracion = 10 * 1000;
    const final = Date.now() + duracion;
    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#e4007c', '#ffdeeb'] });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#e4007c', '#ffdeeb'] });
        if (Date.now() < final) requestAnimationFrame(frame);
    }());
}