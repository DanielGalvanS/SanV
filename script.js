const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const question = document.getElementById('question');
const mainImage = document.getElementById('main-image');

let yesFontSize = 1.2; // Initial font size in rem
let noClickCount = 0;

const noTexts = [
    "No",
    "Segura??",
    "Segura???",
    "Porfavor",
    "Maldita",
    "Quieres que me enoje",
    "Tristeza :(",
    "OK",
    "Maldito gremlin"
];

// Make the No button run away and change text
let isFirstHover = true; // Use this flag to handle the first move smoothly

noBtn.addEventListener('mouseover', () => {
    // 1. Initialize position on first hover
    if (isFirstHover) {
        const rect = noBtn.getBoundingClientRect();
        // Set the button's position to EXACTLY where it is now, but fixed
        noBtn.style.left = `${rect.left}px`;
        noBtn.style.top = `${rect.top}px`;
        noBtn.style.position = 'fixed';

        // Force the browser to register this position BEFORE we move it
        // This prevents the "jumping" or "cutting" effect
        void noBtn.offsetWidth;

        isFirstHover = false;
    }

    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();

    // Calculate available space
    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noBtn.style.position = 'fixed'; // Use fixed to position relative to viewport
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    // Change text and increase Yes button size ON HOVER (since she can't click it easily)
    noClickCount++;

    // Change image to sad cat
    mainImage.src = "https://media.tenor.com/BbSkyx3DaEgAAAAM/goma-sad.gif";

    // Change "No" button text
    if (noClickCount < noTexts.length) {
        noBtn.innerText = noTexts[noClickCount];
    } else {
        noBtn.innerText = noTexts[noTexts.length - 1];
    }

    if (noBtn.innerText === "Maldito gremlin") {
        mainImage.src = "PA.jpg";
    }

    // Increase "Yes" button size
    yesFontSize *= 1.2; // Smaller increment since hover is faster than click
    yesBtn.style.fontSize = `${yesFontSize}rem`;
});

// Optional: Keep click just in case she catches it (mobile?) but logic is duplicated above effectively
noBtn.addEventListener('click', () => {
    // If she manages to click it, just do the same thing (run away again? or maybe finalize "No"?)
    // For now, let's just let the hover handle it.
});

yesBtn.addEventListener('click', () => {
    question.innerText = "Ti Amo ❤️";
    mainImage.src = "https://media.tenor.com/DATI3YHDggEAAAAM/love-you-lots-kiss.gif"; // Cute kissing catsr

    // Hide buttons
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';

    // Add some confetti or celebrations here if we wanted, 
    // but the image change + text is a good start.
});
