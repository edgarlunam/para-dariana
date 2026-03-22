// Agrega tus 100 razones aquí
const razones = [
    "Tus ojos",
    "Tu cabello",
    "Tu sonrisa",
    "Tus labios",
    "Tu inteligencia",
    "Tu forma de ser",
    "La manera en la que piensas",
    "Tu risa",
    "Tu amabilidad",
    "Tus cejas",
];

let cartasAbiertas = 0;

function irA(id) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if(id === 'pantalla3') generarJardin();
}

// Botón NO que huye y se encoge
const btnNo = document.getElementById('btnNo');
let currentScale = 1;
btnNo.addEventListener('click', () => {
    currentScale -= 0.15;
    if(currentScale < 0.2) currentScale = 0.2;
    btnNo.style.transform = `scale(${currentScale})`;
    btnNo.style.position = 'absolute';
    btnNo.style.top = Math.random() * 70 + 5 + '%';
    btnNo.style.left = Math.random() * 70 + 5 + '%';
});

// Botón Poquito que huye al acercarse
const btnPoquito = document.getElementById('btnPoquito');
btnPoquito.addEventListener('mouseenter', () => {
    btnPoquito.style.position = 'absolute';
    btnPoquito.style.top = Math.random() * 70 + 5 + '%';
    btnPoquito.style.left = Math.random() * 70 + 5 + '%';
});

// Generar jardín con tus flores específicas
function generarJardin() {
    const jardin = document.getElementById('jardin');
    jardin.innerHTML = '';
    // Aquí puedes elegir cual flor quieres que aparezca más o fijar posiciones
    const misFlores = ['Gerbera1.png', 'Gerbera2.png', 'Gerbera3.png', 'Gerbera_Art.png'];
    
    for(let i=0; i < 12; i++) {
        const img = document.createElement('img');
        img.src = `img/${misFlores[i % 4]}`;
        img.className = 'flor-brotando';
        img.style.left = (i * 8) + '%';
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
    razones.forEach((texto) => {
        const div = document.createElement('div');
        div.className = 'sobre';
        div.innerHTML = '✉️'; 
        div.onclick = function() {
            this.className = 'hoja';
            this.innerHTML = texto;
            this.onclick = null;
            cartasAbiertas++;
            if(cartasAbiertas === razones.length) celebrar();
        };
        container.appendChild(div);
    });
}

function celebrar() {
    const end = Date.now() + (5 * 1000);
    const colors = ['#e4007c', '#ffffff', '#ffb6c1'];

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}