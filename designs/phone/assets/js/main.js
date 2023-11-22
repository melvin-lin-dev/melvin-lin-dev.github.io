const el = document.querySelector('.animation-container > div');
let phoneAnimate = 0;

window.onload = () => {
    el.parentNode.style.borderTopWidth = `${window.innerHeight / 2}px`;
    el.parentNode.style.borderBottomWidth = `${window.innerHeight / 2}px`;
}

function animateRotation(direction){
    phoneAnimate += direction;
    el.style.transform = `rotate(${phoneAnimate * 90}deg)`;
}