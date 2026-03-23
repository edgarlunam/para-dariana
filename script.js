const misFotosDeCarga = ['Foto', 'Foto1.jpg', 'Foto2.jpg', 'Foto3.jpg', 'Foto4.jpg', 'Foto5.jpg', 'Foto6.jpg', 'Foto7.jpg', 'Foto8.jpg', 'Foto9.jpg', 'Foto10.jpg', 'Foto11.jpg', 'Foto12.jpg', 'Foto13.jpg', 'Foto14.jpg']; // Pon tus fotos reales
const razones = [
    "Tus ojos cafes.",
    "Tu cabello.",
    "Tu hermosa sonrisa.",
    "Tus ricos labios.",
    "Tu inteligencia.",
    "Tu forma de ser.",
    "La manera en la que piensas.",
    "Tu risa preciosa",
    "Tu amabilidad.",
    // RELLENA LAS 100 AQUÍ
];

let cartasAbiertas = 0;

// Shuffle: Reuelve las razones al azar
const razonesMezcladas = [...razones].sort(() => Math.random() - 0.5);

window.onload = () => {
    const stack = document.getElementById('photo-stack');
    misFotosDeCarga.forEach((foto, i) => {
        const img = document.createElement('img');
        img.src = `img/${foto}`;
        img.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 40 - 20}deg)`;
        img.style.zIndex = i;
        stack.appendChild(img);
    });

    // Mostrar botón de entrar después de 5 segundos
    setTimeout(() => {
        document.getElementById('loader-status').innerText = "¡Listo para ti!";
        document.getElementById('btn-entrar').style.display = "block";
    }, 5000);
};

function comenzarSorpresa() {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 1000);
    
    // Música con Fade-in
    const musica = document.getElementById('musica');
    musica.volume = 0;
    musica.play();
    let vol = 0;
    const interval = setInterval(() => {
        if (vol < 0.5) {
            vol += 0.05;
            musica.volume = vol;
        } else {
            clearInterval(interval);
        }
    }, 200); // Sube el volumen gradualmente
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
    jardin.innerHTML = '';
    const flores = ['Gerbera1.png', 'Gerbera2.png', 'Gerbera3.png', 'Gerbera_Art.png'];
    const totalFlores = 12;
    for(let i=0; i < totalFlores; i++) {
        const img = document.createElement('img');
        img.src = `img/${flores[i % 4]}`;
        img.className = 'flor-brotando';
        // Separación uniforme:
        img.style.left = (i * (100 / (totalFlores - 1)) * 0.9) + 5 + '%';
        img.style.animationDelay = (i * 0.15) + 's';
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
    const end = Date.now() + 10000;
    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#e4007c', '#ffffff'] });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#e4007c', '#ffffff'] });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}