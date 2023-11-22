window.onload = () => {
    if (localStorage.design) {
        loadDesign();
    } else {
        createNode();

        let last = mainContainer.lastElementChild;
        last.style.left = window.innerWidth / 2 - r + 'px';
        last.style.top = window.innerHeight / 2 - r + 'px';
    }
};

window.onkeydown = e => {
    let key = e.keyCode;

    if (key === 16) {
        dirDrag.shiftDown = true;
    }
};

window.onkeyup = e => {
    let key = e.keyCode;

    // Key for backspace and delete
    if ((key === 8 || key === 46) && !clone && !editContainer.classList.contains('active') && !nodeDrag.drag) {
        action('x');
    }

    if ((key >= 49 && key <= 52) && presentationContainer.classList.contains('active')) {
        createPresentation(key - 48);
    }

    if (key === 16) {
        dirMouseUp();
    }
};

