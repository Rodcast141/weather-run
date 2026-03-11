// --- GAME STATE ---
let score = 0;
let currentLane = 50; // 20 (Left), 50 (Middle), 80 (Right)
const player = document.getElementById('player');
const scene = document.getElementById('scene');

// --- 1. PLAYER MOVEMENT ---
document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft" && currentLane > 20) currentLane -= 30;
    if (e.key === "ArrowRight" && currentLane < 80) currentLane += 30;
    player.style.left = currentLane + "%";
});

// --- 2. THE EVOLUTION LOGIC ---
function collectPoint() {
    score++;
    document.getElementById('score').innerText = score;

    // RULE 1: Weather Check (Multiples of 3: 3, 6, 9...)
    if (score % 3 === 0) {
        document.body.classList.toggle('cold-mode');
        document.getElementById('next-goal').innerText = score + 3;
    }

    // RULE 2: Attractive Gold Check (Multiples of 4: 4, 8, 12...)
    if (score % 4 === 0) {
        player.innerHTML = "🤰👙"; // Bikini Evolution
        player.classList.add('gold-active');
        document.documentElement.style.setProperty('--road-speed', '0.6s'); // Speed up!
    } else {
        const isCold = document.body.classList.contains('cold-mode');
        player.innerHTML = isCold ? "🤰🧥" : "🤰";
        player.classList.remove('gold-active');
        document.documentElement.style.setProperty('--road-speed', '2s'); // Normal speed
    }
}

// --- 3. GATE SPAWNER ---
function spawnGate() {
    const gate = document.createElement('div');
    gate.className = 'gate';
    gate.innerHTML = "👕"; 
    
    // Choose a random lane
    const lanes = ["20%", "50%", "80%"];
    gate.style.left = lanes[Math.floor(Math.random() * 3)];
    gate.style.top = "0px";
    
    scene.appendChild(gate);
    
    // Move gate down towards player
    let pos = 0;
    const move = setInterval(() => {
        pos += 8;
        gate.style.top = pos + "px";
        
        // COLLISION DETECTION (3D Depth)
        if (pos > 400 && pos < 480) {
            const playerLeft = currentLane;
            const gateLeft = parseInt(gate.style.left);
            
            // If they are in the same lane
            if (Math.abs(playerLeft - gateLeft) < 10) {
                collectPoint();
                gate.remove();
                clearInterval(move);
            }
        }
        
        // Remove if missed
        if (pos > 600) {
            gate.remove();
            clearInterval(move);
        }
    }, 50);
}

// Run the spawner
setInterval(spawnGate, 1800);
