function loadLoader(){
    let loaderContainer = document.createElement('div');
    loaderContainer.className = 'loader-container';

    let row = 40;
    let column = 25;
    let w = window.innerWidth / row;
    let h = window.innerHeight / column;

    for(let x = 0; x < row; x++){
        for(let y = 0; y < column; y++){
            let div = document.createElement('div');
            div.style.width = w + 'px';
            div.style.height = h + 'px';
            div.style.left = x * w + 'px';
            div.style.top = y * h + 'px';
            div.style.transitionDelay = .005 * ((row - x) / 4) * ((column - y) / 4) + 's';

            loaderContainer.appendChild(div);
        }
    }

    document.body.appendChild(loaderContainer);

    setTimeout(() => {
        animateLoader();
    }, 50);
}

function animateLoader(){
    let loaderContainerEl = document.querySelector('.loader-container');
    [...loaderContainerEl.children].forEach(div => {
        div.style.transform = 'scale(0)';
    });
}