let containerEl = document.querySelector('.container');
let quantity = {
    x: 10,
    y: 8
};

window.onload = () => {
    generateBoxes();
};

function generateBoxes() {
    for (let i = 0; i < quantity.x * quantity.y; i++) {
        let box = document.createElement('div');
        containerEl.appendChild(box);
    }
}

window.onmousemove = e => {
    let x = e.pageX;
    let y = e.pageY;

    [...containerEl.children].forEach(box => {
        let rect = box.getBoundingClientRect();
        let pos = {
            x: rect.left - rect.width / 2,
            y: rect.top - rect.height / 2
        };

        let front = pos.y - y;
        let side = pos.x - x;
        let deg = Math.atan(front / side) * 180 / Math.PI;

        box.style.transform = `rotate(${deg}deg)`;
    })
};
