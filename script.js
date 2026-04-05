const misFotos = ['Foto.jpg', 'Foto1.jpg', 'Foto2.jpg', 'Foto3.jpg', 'Foto4.jpg', 'Foto5.jpg', 'Foto6.jpg', 'Foto7.jpg', 'Foto8.jpg', 'Foto9.jpg', 'Foto10.jpg', 'Foto11.jpg', 'Foto12.jpg', 'Foto13.jpg', 'Foto14.jpg'];
const razones = ["Tus preciosos ojos", "Tu sonrisa", "Tu forma de ser", "Tu apoyo", "Tu inteligencia", "Tu risa", "Tu bondad", "Tu paciencia", "Tu fuerza", "Tu mirada"]; // Agrega hasta las 100

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

    if(id === 'pantalla3') {
        generarLluvia();
        generarJardin();
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
            this.className = 'hoja';
            this.innerHTML = r;
            cartasAbiertas++;
            document.getElementById('contador-flotante').innerText = `${cartasAbiertas} / ${razones.length}`;
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