let cvs = document.querySelector('canvas');
let ctx = cvs.getContext('2d');

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

let circles = [];

let time = 0;

window.onload = () => {
    start();
};

function start() {
    generateCircle();

    update();
}

function update() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    time++;

    generateCircle();

    circles.forEach((circle, index) => {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = circle.color;
        ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeWidth = 5;
        ctx.strokeStyle = circle.borderColor;
        ctx.stroke();
        ctx.closePath();
        ctx.restore();

        if (circle.toggle) {
            circle.radius -= .5;

            if (circle.radius <= 0) {
                circles.splice(index, 1);
            }
        } else {
            circle.radius += .3;

            if (circle.radius > circle.targetRadius) {
                circle.toggle = true;
            }
        }
    });
    requestAnimationFrame(update);
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateCircle() {
    if (time % 30 === 0) {
        circles.push({
            x: random(0, cvs.width),
            y: random(0, cvs.height),
            radius: 0,
            targetRadius: random(50, 150),
            color: `rgb(${random(30, 255)},${random(30, 255)},${random(30, 255)})`,
            borderColor: `rgb(${random(30, 255)},${random(30, 255)},${random(30, 255)})`,
            toggle: false
        })
    }
}
