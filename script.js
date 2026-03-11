// --- GAME STATE ---
let score = 0;
let currentLane = 50; 
const player = document.getElementById('player');
const scene = document.getElementById('scene');
const scoreDisplay = document.getElementById('score');

// --- 1. PLAYER MOVEMENT ---
document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft" && currentLane > 20) currentLane -= 30;
    if (e.key === "ArrowRight" && currentLane < 80) currentLane += 30;
    player.style.left = currentLane + "%";
});

// --- 2. THE EVOLUTION LOGIC ---
function collectPoint() {
    score++;
    scoreDisplay.innerText = score;

    // RULE 1: Weather Check (Multiples of 3)
    if (score % 3 === 0) {
        document.body.classList.toggle('cold-mode');
        document.getElementById('next-goal').innerText = score + 3;
    }

    // RULE 2: Attractive Gold Check (Multiples of 4)
    if (score % 4 === 0) {
        player.innerHTML = "🤰👙"; // Bikini Evolution
        player.classList.add('gold-active');
        document.documentElement.style.setProperty('--road-speed', '0.6s');
    } else {
        const isCold = document.body.classList.contains('cold-mode');
        player.innerHTML = isCold ? "🤰🧥" : "🤰";
        player.classList.remove('gold-active');
        document.documentElement.style.setProperty('--road-speed', '2s');
    }
}

// --- 3. GATE SPAWNER ---
function spawnGate() {
    const gate = document.createElement('div');
    gate.className = 'gate';
    gate.innerHTML = "👕"; 
    
    const lanes = ["20%", "50%", "80%"];
    gate.style.left = lanes[Math.floor(Math.random() * 3)];
    gate.style.top = "0px";
    
    scene.appendChild(gate);
    
    // Move gate down towards player
    let pos = 0;
    const move = setInterval(() => {
        pos += 10;
        gate.style.top = pos + "px";
        
        // Collision Detection
        if (pos > 400 && pos < 480) {
            const playerLeft = currentLane;
            const gateLeft = parseInt(gate.style.left);
            
            if (Math.abs(playerLeft - gateLeft) < 10) {
                collectPoint();
                gate.remove();
                clearInterval(move);
            }
        }
        
        if (pos > 600) {
            gate.remove();
            clearInterval(move);
        }
    }, 50);
}

// Start the game loop
setInterval(spawnGate, 1500);
