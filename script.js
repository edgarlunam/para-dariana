const misFotos = ['Foto.jpg', 'Foto1.jpg', 'Foto2.jpg', 'Foto3.jpg', 'Foto4.jpg', 'Foto5.jpg', 'Foto6.jpg', 'Foto7.jpg', 'Foto8.jpg', 'Foto9.jpg', 'Foto10.jpg', 'Foto11.jpg', 'Foto12.jpg', 'Foto13.jpg', 'Foto14.jpg'];
const razones = ["Tus preciosos ojos cafes", "Tu cabello", "Tu hermosa sonrisa", "Tus labios", "Tu inteligencia", "Tu forma de ser", "La manera en la que piensas", "Tu risa", "Tu amabilidad", "Tus pestañas", "Tus hermosos cachetitos", "Tu amor", "Tus abrazos", "Tus besos", "Tu honestidad", "Tu lealtad", "La forma en que me apoyas", "Tu voz", "Lo linda que te ves", "Tu mejora constante", "Tu comprension", "Tu humildad", "Tu caracter", "Tu forma de querer", "Tu forma de mirarme", "La manera en la que me amas", "Como te vistes", "Lo sensible que eres", "Tus enojos", "Tu sentido del humor", "Tu pasion", "Tu olor", "Tu sonrisa constante", "Tu seguridad", "Tu interes", "Tus regaños", "Tus mordidas", "Tus caricias", "Tus celos", "Tus caras", "Tu comedia", "Tu bella piel", "Tu alegria", "Tu perspectiva", "Tu amor por los paisajes", "Tu belleza incomparable", "Tu sencillez", "Tu precioso cuerpo", "Tu cariño", "Tus detalles", "Tu fortaleza", "Lo orgullosa que eres", "Todo para mi"]; 

let cartasAbiertas = 0;

window.onload = () => {
    const stack = document.getElementById('photo-stack');
    misFotos.forEach((foto, i) => {
        const img = document.createElement('img');
        img.src = `img/${foto}`;
        img.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 40 - 20}deg)`;
        stack.appendChild(img);
    });

    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loader').remove();
            irA('pantalla-bienvenida');
        }, 1000);
    }, 4000);
};

function irA(id) {
    const musica = document.getElementById('musica');
    if (musica) { musica.play().catch(() => {}); }

    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    // Aquí solo se genera la lluvia, el jardín ha sido quitado
    if(id === 'pantalla3') {
        generarLluvia();
    }
}

function generarLluvia() {
    const container = document.getElementById('lluvia-flores-container');
    container.innerHTML = '';
    const imgs = ['Gerbera1.png', 'Gerbera2.png', 'Gerbera3.png'];
    for(let i=0; i<25; i++) {
        const f = document.createElement('img');
        f.src = `img/${imgs[i%3]}`;
        f.className = 'flor-cayendo';
        f.style.left = Math.random() * 100 + 'vw';
        f.style.width = (Math.random() * 30 + 30) + 'px';
        f.style.animationDuration = (Math.random() * 3 + 4) + 's';
        f.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(f);
    }
}

function iniciarTransicion() {
    irA('pantalla4');
    setTimeout(() => {
        irA('pantalla5');
        generarCartas();
    }, 4000);
}

function generarCartas() {
    const container = document.getElementById('mosaico-container');
    container.innerHTML = '';
    razones.forEach(r => {
        const d = document.createElement('div');
        d.className = 'sobre';
        d.innerHTML = '✉️';
        d.onclick = function() {
            if(this.className === 'hoja') return;
            this.className = 'hoja';
            this.innerHTML = r;
            cartasAbiertas++;
            document.getElementById('contador-flotante').innerText = `${cartasAbiertas} / ${razones.length}`;
            if(cartasAbiertas === razones.length) {
                confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
            }
        };
        container.appendChild(d);
    });
}

function moverBoton() {
    this.style.position = 'fixed';
    this.style.top = Math.random() * 80 + 10 + '%';
    this.style.left = Math.random() * 80 + 10 + '%';
}

document.getElementById('btnNo').onmouseover = moverBoton;
document.getElementById('btnPoquito').onmouseover = moverBoton;