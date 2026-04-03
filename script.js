const misFotosDeCarga = ['Foto.jpg', 'Foto1.jpg', 'Foto2.jpg', 'Foto3.jpg', 'Foto4.jpg', 'Foto5.jpg', 'Foto6.jpg', 'Foto7.jpg', 'Foto8.jpg', 'Foto9.jpg', 'Foto10.jpg', 'Foto11.jpg', 'Foto12.jpg', 'Foto13.jpg', 'Foto14.jpg'];
const razones = [
    "Tus preciosos ojos cafes", "Tu cabello", "Tu hermosa sonrisa", "Tus labios (muy ricos, por cierto)",
    "Tu inteligencia", "Tu forma de ser", "La manera en la que piensas", "Tu risa",
    "Tu amabilidad", "Tus pestañas", "Tus hermosos cachetitos", "Tu amor",
    "Tus abrazos", "Tus besos", "Tu honestidad", "Tu lealtad",
    "La forma en que me apoyas", "Tu voz (ojala seguir escuchandola toda la vida)", "Lo linda que te ves", "Tu mejora constante",
    "Tu comprension", "Tu humildad", "Tu caracter", "Tu forma de querer a las personas",
    "Tu forma de mirarme", "La manera en la que me amas", "Como te vistes", "Lo sensible que eres",
    "Tus enojos, te amo mi berrinchuda", "Tu sentido del humor", "Tu pasion por hacer las cosas", "Tu olor",
    "Tu sonrisa cada que me miras (porfa no dejes de hacerlo)", "Que no te gusta dejarme solo", "Tu seguridad", "Tu interes",
    "Tus regaños", "Tus mordidas", "Las caricias que haces en mi cabello y orejas. ah y espalda", "Tu seguridad por lo que quieres",
    "Tus celos", "Tus caras", "Tu comedia", "Tu bella piel",
    "Tu alegria", "Tu risa contagiosa", "Tu actuar", "Tu perspectiva de todo",
    "Tu amor por los paisajes, que por cierto tu eres el mas hermoso que existe", "Tu amor por tus tierras", "Tu belleza incomparable", "Tu apoyo",
    "Tu sencillez", "Tu precioso cuerpo", "Tu cariño", "Tus detalles",
    "Tu fortaleza", "Lo orgullosa que eres", "Todo para mi"
];

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
            setTimeout(() => {
                loader.remove();
                irA('pantalla-bienvenida');
            }, 1000);
        }
    }, 5000);
};

function irA(id) {
    const musica = document.getElementById('musica');
    if (musica) {
        musica.volume = 0.5;
        musica.play().catch(error => console.log("Audio esperando interacción"));
    }
    
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    const proxima = document.getElementById(id);
    if (proxima) proxima.classList.add('active');
    
    if(id === 'pantalla3') generarJardin();
}

document.getElementById('btnNo').addEventListener('click', function() {
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
    for(let i=0; i<12; i++) {
        const img = document.createElement('img');
        img.src = `img/${flores[i % 4]}`;
        img.className = 'flor-brotando';
        img.style.left = (i * 8) + 5 + '%';
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
    confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } });
}