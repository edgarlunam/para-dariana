// 1. CONFIGURACIÓN
const misFotosDeCarga = ['Foto.jpg', 'Foto1.jpg', 'Foto2.jpg', 'Foto3.jpg', 'Foto4.jpg', 'Foto5.jpg', 'Foto6.jpg', 'Foto7.jpg', 'Foto8.jpg', 'Foto9.jpg', 'Foto10.jpg', 'Foto11.jpg', 'Foto12.jpg', 'Foto13.jpg', 'Foto14.jpg'];

const razones = [
    "Me encanta tu sonrisa al despertar.",
    "Amo cómo te brillan los ojos cuando hablas de código.",
    "Eres mi mejor debug en los días difíciles.",
    // RELLENA AQUÍ TODAS LAS DEMÁS
];

let cartasAbiertas = 0;

// 2. CARGA (Tu lógica original de 5 segundos)
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

// 3. MÚSICA Y NAVEGACIÓN (Copiado de tu versión funcional)
function irA(id) {
    const musica = document.getElementById('musica');
    // Si existe el elemento, darle play directo. Sin fade-in, sin vueltas.
    if (musica) {
        musica.play().catch(e => console.log("Clic necesario"));
    }
    
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    const proxima = document.getElementById(id);
    if (proxima) proxima.classList.add('active');
    
    if(id === 'pantalla3') generarJardin();
}

// 4. BOTONES (Tu lógica original)
document.getElementById('btnNo').addEventListener('click', function() {
    const musica = document.getElementById('musica');
    if (musica) musica.play().catch(() => {}); // Intentar play aquí también
    
    this.style.position = 'fixed';
    this.style.top = Math.random() * 80 + 10 + '%';
    this.style.left = Math.random() * 80 + 10 + '%';
});

document.getElementById('btnPoquito').addEventListener('mouseenter', function() {
    this.style.position = 'fixed';
    this.style.top = Math.random() * 80 + 10 + '%';
    this.style.left = Math.random() * 80 + 10 + '%';
});

// 5. JARDÍN (Ajustado para que no se amontone como pediste)
function generarJardin() {
    const jardin = document.getElementById('jardin');
    if(!jardin) return;
    jardin.innerHTML = '';
    const flores = ['Gerbera1.png', 'Gerbera2.png', 'Gerbera3.png', 'Gerbera_Art.png'];
    for(let i=0; i<12; i++) {
        const img = document.createElement('img');
        img.src = `img/${flores[i % 4]}`;
        img.className = 'flor-brotando';
        img.style.left = (i * 8) + 5 + '%'; // Separación fija
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
    
    // Shuffle simple antes de crear sobres
    const razonesMezcladas = [...razones].sort(() => Math.random() - 0.5);

    razonesMezcladas.forEach((texto) => {
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
    const final = Date.now() + 10000;
    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#e4007c', '#ffffff'] });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#e4007c', '#ffffff'] });
        if (Date.now() < final) requestAnimationFrame(frame);
    }());
}