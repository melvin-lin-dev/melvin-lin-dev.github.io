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
    var offsetXToChildCenter = 70;
    var offsetYToParentCenter = parseInt(cardContainerEl.offsetHeight / 2);
    var offsetYToChildCenter = 200;

    cards.forEach((card, index) => {
        const deg = 90 / (cards.length - 1);
        const y = Math.sin((deg * (index - 2)) * (Math.PI / 180)) * 240;
        const x = Math.cos((deg * (index - 2)) * (Math.PI / 180)) * 240;

        const cardEl = document.createElement('div');
        cardEl.innerHTML = card.name;
        cardEl.className = 'card';
        cardEl.style.backgroundColor = card.color;
        cardEl.style.top = `${y + offsetXToParentCenter - offsetXToChildCenter}px`;
        cardEl.style.left = `${x + offsetYToParentCenter - offsetYToChildCenter}px`;
        cardEl.dataset.index = index;
        cardEl.onclick = () => {
            setOverlaps(cardEl);
        }
        cardContainerEl.appendChild(cardEl);

        setTimeout(() => {
            cardEl.style.transitionDuration = '.5s';
        },10);
    });

    cardContainerEl.children[0].classList.add('active');

    setOverlaps(cardContainerEl.children[0], false);
}

function setOverlaps(cardEl) {
    const deg = 90 / (cards.length - 1);

    let activeEl = document.querySelector('.active');
    activeEl.classList.remove('active');

    let overlapIndex = Math.floor(cards.length / 2);
    const nextEl = cardContainerEl.children[cardEl.dataset.index];
    nextEl.classList.add('active');
    nextEl.style.zIndex = overlapIndex;
    nextEl.style.boxShadow = `0 0 ${2.5 * overlapIndex}px ${.5 * overlapIndex}px rgba(0,0,0,${.1 * overlapIndex})`;
    nextEl.style.transform = `rotate(${deg * nextEl.dataset.index + 90}deg) scale(1)`;

    let leftIndex = cardEl.dataset.index;
    let leftOverlapIndex = overlapIndex;
    while(leftIndex > 0){
        leftIndex--;
        leftOverlapIndex--;

        const leftEl = cardContainerEl.children[leftIndex];
        leftEl.style.zIndex = leftOverlapIndex;
        leftEl.style.boxShadow = `0 0 ${2.5 * leftOverlapIndex}px ${.5 * leftOverlapIndex}px rgba(0,0,0,${.1 * leftOverlapIndex})`;
        leftEl.style.transform = `rotate(${deg * leftEl.dataset.index + 90}deg) scale(${1 - .05 * (overlapIndex - leftOverlapIndex)})`;
    }

    let rightIndex = cardEl.dataset.index;
    let rightOverlapIndex = overlapIndex;
    while(rightIndex < cards.length - 1){
        rightIndex++;
        rightOverlapIndex--;

        const rightEl = cardContainerEl.children[rightIndex];
        rightEl.style.zIndex = rightOverlapIndex;
        rightEl.style.boxShadow = `0 0 ${2.5 * rightOverlapIndex}px ${.5 * rightOverlapIndex}px rgba(0,0,0,${.1 * rightOverlapIndex})`;
        rightEl.style.transform = `rotate(${deg * rightEl.dataset.index + 90}deg) scale(${1 - .05 * (overlapIndex - rightOverlapIndex)})`;
    }
}