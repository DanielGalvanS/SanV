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

const moveButton = (e) => {
    // 0. Update state first (Text, Image, Counts) so we know the new size
    noClickCount++;

    // Change "No" button text
    if (noClickCount < noTexts.length) {
        noBtn.innerText = noTexts[noClickCount];
    } else {
        noBtn.innerText = noTexts[noTexts.length - 1];
    }

    // Change image logic
    if (noBtn.innerText === "Maldito gremlin") {
        mainImage.src = "PA.jpg";

        // Transform button into the face
        noBtn.style.backgroundImage = "url('PA.jpg')";
        noBtn.style.backgroundSize = "cover";
        noBtn.style.backgroundPosition = "center";

        // Make it bigger
        noBtn.style.width = "150px";
        noBtn.style.height = "150px";
        noBtn.style.borderRadius = "50%";

        // Text visibility (white with shadow so it pops)
        noBtn.style.color = "white";
        noBtn.style.textShadow = "2px 2px 4px #000000";
        noBtn.style.fontWeight = "bold";
        noBtn.style.border = "none";

    } else {
        mainImage.src = "https://media.tenor.com/BbSkyx3DaEgAAAAM/goma-sad.gif";

        // Reset styles
        noBtn.style.backgroundImage = "none";
        noBtn.style.color = "#ff1e4d";
        noBtn.style.border = "2px solid #ff1e4d";
        noBtn.style.width = "auto";
        noBtn.style.height = "auto";
        noBtn.style.textShadow = "none";
        noBtn.style.borderRadius = "50px";
    }

    // Increase "Yes" button size
    yesFontSize *= 1.5;
    yesBtn.style.fontSize = `${yesFontSize}rem`;

    // 1. Initialize position on first hover
    if (isFirstHover) {
        const rect = noBtn.getBoundingClientRect();
        noBtn.style.left = `${rect.left}px`;
        noBtn.style.top = `${rect.top}px`;
        noBtn.style.position = 'fixed';
        void noBtn.offsetWidth;
        isFirstHover = false;
    }

    // 2. Calculate constraints (with new text size)
    const padding = 20; // Safety margin
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    // 3. Move Logic
    // "Follow" logic removed as requested to keep "Run Away" behavior consistent
    // but preserving the "Maldito gremlin" check for future flexibility if needed
    if (noBtn.innerText === "Maldito gremlin") {
        // "Follow" logic (Stalker Mode)
        // Move towards the cursor/touch center, but stay in bounds
        let targetX, targetY;

        if (e && (e.clientX || (e.touches && e.touches[0]))) {
            const clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
            const clientY = e.clientY || (e.touches ? e.touches[0].clientY : 0);

            // Center the button on the cursor
            targetX = clientX - (noBtn.offsetWidth / 2);
            targetY = clientY - (noBtn.offsetHeight / 2);
        } else {
            // Fallback if no event (e.g. initial click fallback)
            targetX = maxX / 2;
            targetY = maxY / 2;
        }

        // Clamp to screen
        targetX = Math.max(padding, Math.min(targetX, maxX));
        targetY = Math.max(padding, Math.min(targetY, maxY));

        // Use a slight delay/smoothness via CSS, but set coords directly
        noBtn.style.left = `${targetX}px`;
        noBtn.style.top = `${targetY}px`;

    } else {
        // "Run Away" logic (Random)
        const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
        const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
    }
}

// Desktop (Mouse)
noBtn.addEventListener('mouseover', (e) => moveButton(e));

// Mobile (Touch)
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton(e);
});

// Click (Just in case)
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveButton(e);
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
