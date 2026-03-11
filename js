let score = 0;
let currentLane = 50;
const player = document.getElementById('player');
const road = document.getElementById('road');

// Controls
document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft" && currentLane > 20) currentLane -= 30;
    if (e.key === "ArrowRight" && currentLane < 80) currentLane += 30;
    player.style.left = currentLane + "%";
});

// Scoring & Evolution Logic
function collectPoint() {
    score++;
    document.getElementById('score').innerText = score;

    // Rule 1: Weather Check (Multiples of 3)
    if (score % 3 === 0) {
        document.body.classList.toggle('cold-mode');
        document.getElementById('next-goal').innerText = score + 3;
    }

    // Rule 2: Attractive Gold Check (Multiples of 4)
    if (score % 4 === 0) {
        player.innerHTML = "🤰👙"; // Gold Bikini Evolution
        player.classList.add('gold-active');
        document.documentElement.style.setProperty('--road-speed', '0.8s'); // Faster!
    } else {
        const isCold = document.body.classList.contains('cold-mode');
        player.innerHTML = isCold ? "🤰🧥" : "🤰";
        player.classList.remove('gold-active');
        document.documentElement.style.setProperty('--road-speed', '2s');
    }
}

// Simulate collection for testing - call collectPoint() when hitting a gate
setInterval(() => {
    // In your real game, this happens when hitting a 3D gate
    // collectPoint(); 
}, 3000);
