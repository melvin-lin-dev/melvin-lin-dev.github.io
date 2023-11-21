const cardContainerEl = document.querySelector('.card-container');

const cards = [
    { name: 'HTML', color: '#E96228' },
    { name: 'CSS', color: '#2862E9' },
    { name: 'JavaScript', color: '#F6D33C' },
    { name: 'PHP', color: '#4D588E' },
    { name: 'Angular', color: '#D82D2F' },
    { name: 'Vue', color: '#3FB27F' },
    { name: 'React', color: '#5ED3F3' },
    { name: 'Laravel', color: '#F72C1F' },
];

window.onload = () => {
    generateCards();
}

window.onkeydown = (e) => {
    if (e.key === 'ArrowLeft') {
        setOverlaps(-1);
    } else if (e.key === 'ArrowRight') {
        setOverlaps(1);
    }
}

function generateCards() {
    var offsetXToParentCenter = parseInt(cardContainerEl.offsetWidth / 2);
    var offsetXToChildCenter = 200;
    var offsetYToParentCenter = parseInt(cardContainerEl.offsetHeight / 2);
    var offsetYToChildCenter = 150;

    cards.forEach((card, index) => {
        const deg = 360 / cards.length;
        const y = Math.sin((deg * (index - 2)) * (Math.PI / 180)) * 300;
        const x = Math.cos((deg * (index - 2)) * (Math.PI / 180)) * 300;

        const cardEl = document.createElement('div');
        cardEl.innerHTML = card.name;
        cardEl.className = 'card';
        cardEl.style.backgroundColor = card.color;
        cardEl.style.top = `${y + offsetXToParentCenter - offsetXToChildCenter}px`;
        cardEl.style.left = `${x + offsetYToParentCenter - offsetYToChildCenter}px`;
        cardEl.dataset.index = index;
        cardContainerEl.appendChild(cardEl);

        setTimeout(() => {
            cardEl.style.transitionDuration = '.5s';
        },10);
    });

    cardContainerEl.children[0].classList.add('active');

    setOverlaps();
}

function setOverlaps(dir = 0) {
    const deg = 360 / cards.length;
    cardContainerEl.dataset.rotateDeg = +cardContainerEl.dataset.rotateDeg + deg * -dir;
    cardContainerEl.style.transform = `translate(-50%,-50%) rotate(${cardContainerEl.dataset.rotateDeg}deg)`;

    setTimeout(() => {
        let activeEl = document.querySelector('.active');
        let nextIndex = getIndex(+activeEl.dataset.index + dir);

        activeEl.classList.remove('active');

        let lastOverlapIndex = Math.floor(cards.length / 2);
        let overlapIndex = lastOverlapIndex;
        const nextEl = cardContainerEl.children[nextIndex];
        nextEl.classList.add('active');
        nextEl.style.zIndex = overlapIndex;
        nextEl.style.boxShadow = `0 0 ${2.5 * overlapIndex}px ${.5 * overlapIndex}px rgba(0,0,0,${.1 * overlapIndex})`;
        nextEl.style.transform = `rotate(${deg * nextEl.dataset.index}deg) scale(1)`;

        let leftIndex = nextIndex;
        let rightIndex = nextIndex;
        for (let i = 0; i < Math.floor(cards.length / 2); i++) {
            overlapIndex--;

            leftIndex = getIndex(leftIndex - 1);
            rightIndex = getIndex(rightIndex + 1);

            const leftEl = cardContainerEl.children[leftIndex];
            leftEl.style.zIndex = overlapIndex;
            leftEl.style.boxShadow = `0 0 ${2.5 * overlapIndex}px ${.5 * overlapIndex}px rgba(0,0,0,${.1 * overlapIndex})`;
            leftEl.style.transform = `rotate(${deg * leftEl.dataset.index}deg) scale(${1 - .15 * (lastOverlapIndex - overlapIndex)})`;

            if (leftIndex !== rightIndex) {
                const rightEl = cardContainerEl.children[rightIndex];
                rightEl.style.zIndex = overlapIndex;
                rightEl.style.boxShadow = `0 0 ${2.5 * overlapIndex}px ${.5 * overlapIndex}px rgba(0,0,0,${.1 * overlapIndex})`;
                rightEl.style.transform = `rotate(${deg * rightEl.dataset.index}deg) scale(${1 - .15 * (lastOverlapIndex - overlapIndex)})`;
            }
        }
    }, dir ? 250 : 0);
}

function getIndex(nextIndex) {
    nextIndex %= cards.length;
    if (nextIndex === -1) nextIndex = cards.length - 1;
    return nextIndex;
}