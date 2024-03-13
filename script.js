document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.querySelector('.menu-button');
    const menuDropdown = document.querySelector('.menu-dropdown');
    const linesContainer = document.querySelector('.lines-container');
    const titleElement = document.querySelector('.title');
    const subtitleElement = document.querySelector('.subtitle');
    const reloadButton = document.querySelector('.reload-button');
    let currentPoem = 1;
    let lines = document.querySelectorAll('.line, .title, .subtitle');
    let timeouts = [];

    menuButton.addEventListener('click', () => {
        if (menuDropdown.style.display === "none" || menuDropdown.style.display === "") {
            menuDropdown.style.display = "block";
            menuDropdown.style.pointerEvents = "auto";
            setTimeout(() => {
                menuDropdown.style.opacity = "1";
            }, 10);
        } else {
            menuDropdown.style.opacity = "0";
            setTimeout(() => {
                menuDropdown.style.display = "none";
                menuDropdown.style.pointerEvents = "none";
            }, 300);
        }
    });

    const poems = {
        1: {
            title: "·a c r o s t·",
            font: "'Libre Baskerville', serif",
            lines: [
                "Tal vez este momento, este ocurriendo en otro tiempo, quizá en él estemos juntos, quizá juntos seamos uno,",
                "en cada decisión, quizá tuvimos la ilusión, de compartir nuestro futuro y ser nosotros contra el mundo,",
                "al filo de un sentimiento, el amor en nuestras manos, belleza en cada trato, calidez en nuestro tacto,",
                "más allá de todo rumbo, quizá más lejos por seguro, más que hoy y mil futuros, eres tú todo mi mundo,",
                "otro tiempo es un recuerdo, se imagina con anhelo, pero hoy bajo este cielo, aún vivo este momento, y el amor que te he descrito, existe eterno y es perfecto.",
            ],
            color: "#BFBFBF",
            linesWeight: "200",
            titleWeight: "700",
            size: "57px",
            background: "linear-gradient(to bottom right, black, #444)",
            useFirstLetterEffect: true,
        },
        2: {
            title: "Una historia sin final.",
            font: "'Borel', cursive",
            lines: [
                "¿Sabes de una historia... que no tiene un final?,",
                "de esas que comienzan, y buscan perdurar,",
                "tal vez toda una vida, para nada algo fugaz.",
                "Te contaré de esta historia, en verdad es especial,",
                "se escribe cada día, y con cada despertar,",
                "eres su protagonista, tan hermosa y bella artista,",
                "inspiración de mis momentos, de mi vida y de estos versos,",
                "de mi espacio sideral, de esta historia sin final.",
                "Y es así mi linda niña, con toda sinceridad...",
                "Que eres todo lo que anhelo, por toda la eternidad.",
                "De aquí hasta el infinito, sé que no va a terminar,",
                "porque es mi amor por ti... esta historia sin final.",
            ],
            color: "white",
            linesWeight: "500",
            titleWeight: "1000",
            size: "45px",
            background: "linear-gradient(to bottom right, #FF4171, #FF5982, #FF708F, #FF879D, #FF9DAA, #FFB3B7, #FFACAF, #FF9D9A)",
            useFirstLetterEffect: false,
        },
    };

    const showLines = () => {
        lines.forEach(line => {
            const delay = line.getAttribute('data-delay') * 3000;
            const timeoutId = setTimeout(() => {
                line.style.opacity = "1";
                line.style.transform = "translateY(0)";
            }, delay);
            timeouts.push(timeoutId);
        });
        const reloadTimeoutId = setTimeout(() => {
            reloadButton.style.opacity = "1";
        }, lines.length * 2000 + 500);
        timeouts.push(reloadTimeoutId);

        const pointerTimeoutId = setTimeout(() => {
            reloadButton.style.pointerEvents = "auto";
        }, lines.length * 2000 + 1500);
        timeouts.push(pointerTimeoutId);
    };

    function clearAllTimeouts() {
        for (let i = 0; i < timeouts.length; i++) {
            clearTimeout(timeouts[i]);
        }
        timeouts = [];
    }

    function smoothScrollToTop() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    function resetLines() {
        clearAllTimeouts();

        document.querySelectorAll('.line').forEach(line => {
            line.style.opacity = "0";
            line.style.transform = "translateY(3rem)";
        });

        document.querySelectorAll('.title, .subtitle').forEach(element => {
            element.style.opacity = "0";
            element.style.transform = "translateY(1rem)";
        });

        reloadButton.style.opacity = "0";
        reloadButton.style.pointerEvents = "none";
    }

    function displayPoem(poem) {
        titleElement.textContent = poem.title;

        let poemContent = '';
        poem.lines.forEach((line, index) => {
            poemContent += `<p class="line" data-delay="${index + 3}">${line}</p>`;
        });
        linesContainer.innerHTML = poemContent;

        linesContainer.style.color = poem.color;

        linesContainer.style.fontWeight = poem.linesWeight;

        lines = document.querySelectorAll('.line, .title, .subtitle');

        titleElement.style.fontFamily = poem.font;

        titleElement.style.fontSize = poem.size;

        titleElement.style.fontWeight = poem.titleWeight;

        subtitleElement.style.color = poem.color;

        document.body.style.background = poem.background;

        if (poem.useFirstLetterEffect) {
            linesContainer.classList.remove('no-first-letter-effect');
        } else {
            linesContainer.classList.add('no-first-letter-effect');
        }

        showLines();
    }

    let storedPoem = localStorage.getItem('selectedPoem');
    if (storedPoem) {
        currentPoem = storedPoem;
        displayPoem(poems[currentPoem]);
    } else {
        displayPoem(poems[1]);
    }

    document.querySelectorAll('.menu-dropdown li').forEach(li => {
        li.addEventListener('click', function () {
            const selectedPoem = this.getAttribute('data-poem');

            if (!poems[selectedPoem]) {
                return;
            }

            localStorage.setItem('selectedPoem', selectedPoem);

            if (selectedPoem != currentPoem) {
                resetLines();
                smoothScrollToTop();

                setTimeout(() => {
                    displayPoem(poems[selectedPoem]);
                }, 500);
                currentPoem = selectedPoem;
            }

            menuDropdown.style.display = "none";
        });
    });

    reloadButton.addEventListener('click', () => {
        resetLines();
        showLines();

        smoothScrollToTop();

        setTimeout(showLines, 500);
    });

    const totalImages = 4;
    const folderName = "images";

    const swiperWrapper = document.getElementById('swiperWrapper');

    for (let i = 0; i <= totalImages; i++) {
        const swiperSlide = document.createElement('div');
        swiperSlide.className = 'swiper-slide';

        const imageElement = document.createElement('img');
        imageElement.src = `${folderName}/image (${i}).webp`;
        imageElement.className = 'image-line';

        swiperSlide.appendChild(imageElement);
        swiperWrapper.appendChild(swiperSlide);
    }

    const swiper = new Swiper('.swiper-container', {
        effect: 'cards',
        centeredSlides: true,
        slidesPerView: 1,
        initialSlide: 2,
        cardsEffect: {
            perSlideOffset: 8,
            perSlideRotate: 1.5,
            rotate: true,
            slideShadows: false,
        },
    });

    const celebrateButton = document.querySelector('.celebrate-button');
    const particlesContainer = document.querySelector('#particles-js');
    const celebrationMessage = document.querySelector('.celebration-message');

    const messages = [
        "Eres mi todo... ❤️",
        "Eres mi sueño hecho realidad... 💫",
        "Te pienso siempre... 💭",
        "Contigo todo es perfecto... 🌟",
        "Eres mi inspiración... 💖",
        "Eres mi refugio... 🏠",
        "Eres mi amor eterno... 💕",
        "Eres mi paz interior... 🌸",
        "Contigo todo es mejor... 🌈",
        "Eres mi amor verdadero... 💞",
        "Eres tan linda y tierna... 💖",
        "Eres mi sueño cumplido... 🌠",
        "Eres mi mundo... 🌍",
        "Eres perfecta... 💎",
        "Eres hermosa... 🌹",
        "Eres única... 🦄",
        "Eres encantadora... ✨",
        "Eres preciosa... 🌼",
        "Eres adorable... 💐",
        "Eres maravillosa... 🌺"
    ];

    let fadeTimeout;
    let hideTimeout;

    celebrateButton.addEventListener('click', () => {
        clearTimeout(fadeTimeout);
        clearTimeout(hideTimeout);

        particlesContainer.style.opacity = "0";
        particlesContainer.style.visibility = "hidden";
        celebrationMessage.style.opacity = "0";
        celebrationMessage.style.visibility = "hidden";

        setTimeout(() => {
            particlesContainer.style.opacity = "1";
            particlesContainer.style.visibility = "visible";
            celebrationMessage.style.opacity = "1";
            celebrationMessage.style.visibility = "visible";
        }, 50);

        const randomIndex = Math.floor(Math.random() * messages.length);
        celebrationMessage.textContent = messages[randomIndex];

        particlesJS.load('particles-js', 'path_to_particles.json', function () {
            fadeTimeout = setTimeout(() => {
                particlesContainer.style.opacity = "0";
                celebrationMessage.style.opacity = "0";
            }, 5000);

            hideTimeout = setTimeout(() => {
                particlesContainer.style.visibility = "hidden";
                celebrationMessage.style.visibility = "hidden";
            }, 7000);
        });
    });

});