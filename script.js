// --- GAME STATE VARIABLES ---
let score = 0;
let charPos = 50; 
let isGameOver = false; // Prevents movement after death
const char = document.getElementById('character');

// ... (Keep your existing mouse/keyboard movement code here, 
// but add `if (isGameOver) return;` at the top of them so you can't move when dead) ...

function updateGame(points) {
    if (isGameOver) return; // Stop the game if she already died

    score += points;
    document.getElementById('score').innerText = score;

    // 1. LEVEL LOGIC (Every 3 points is a new level)
    let currentLevel = Math.floor(score / 3) + 1;
    let isCold = false;

    // 2. CHECK FOR LEVEL 6 (The Cold Level)
    if (currentLevel === 6) {
        isCold = true;
        document.getElementById('game-container').classList.add('cold-level');
    } else {
        document.getElementById('game-container').classList.remove('cold-level');
    }

    // 3. BIKINI LOGIC (Multiples of 4)
    let hasBikini = (score % 4 === 0 && score > 0);

    if (hasBikini) {
        char.innerHTML = "🤰👙"; // Bikini
        char.classList.add('attractive');
    } else {
        char.innerHTML = isCold ? "🤰🧥" : "🤰"; // Coat for cold, normal otherwise
        char.classList.remove('attractive');
    }

    // 4. THE FATAL COMBINATION (Bikini + Cold)
    if (isCold && hasBikini) {
        triggerGameOver();
    }
}

// 5. THE DEATH & BIRTH SEQUENCE
function triggerGameOver() {
    isGameOver = true;
    
    // Change emoji to Skull + Baby
    char.innerHTML = "💀👶"; 
    char.classList.remove('attractive');

    // Stop the 3D road animation (if you have it running)
    const road = document.getElementById('road');
    if (road) road.style.animationPlayState = 'paused';

    // Optional: Add a slight delay before showing the Game Over message
    setTimeout(() => {
        alert("GAME OVER! You wore a bikini in the cold level. She died and gave birth!");
    }, 500);
}
