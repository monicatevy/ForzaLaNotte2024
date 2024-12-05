const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');

const mazeInput = document.getElementById('mazeInput');

// Define ball and maze properties
const ball = { x: 20, y: 20, radius: 10, speed: 2 };
const goalZones = [
    { x: 400, y: 50, char: 'A' },
    { x: 300, y: 200, char: 'B' },
    { x: 100, y: 150, char: 'C' },
];
let currentGoal = 0;

// Draw maze and ball
function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw goal zones
    goalZones.forEach((zone, index) => {
        ctx.fillStyle = index === currentGoal ? 'green' : 'gray';
        ctx.fillRect(zone.x, zone.y, 50, 50);
    });

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

// Update ball position
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (ball.y - ball.speed - ball.radius > 0) ball.y -= ball.speed;
            break;
        case 'ArrowDown':
            if (ball.y + ball.speed + ball.radius < canvas.height) ball.y += ball.speed;
            break;
        case 'ArrowLeft':
            if (ball.x - ball.speed - ball.radius > 0) ball.x -= ball.speed;
            break;
        case 'ArrowRight':
            if (ball.x + ball.speed + ball.radius < canvas.width) ball.x += ball.speed;
            break;
    }

    checkGoal();
    drawMaze();
});

// Check if ball reaches current goal zone
function checkGoal() {
    const zone = goalZones[currentGoal];
    if (
        ball.x > zone.x &&
        ball.x < zone.x + 50 &&
        ball.y > zone.y &&
        ball.y < zone.y + 50
    ) {
        mazeInput.value += zone.char;
        currentGoal++;
        if (currentGoal >= goalZones.length) {
            alert('You completed the maze!');
        }
    }
}

drawMaze();