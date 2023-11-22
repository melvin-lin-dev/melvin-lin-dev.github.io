let lineContainer = document.querySelector('.line-container');
let mainContainer = document.querySelector('.main-container');
let editContainer = document.querySelector('.edit-container');
let presentationContainer = document.querySelector('.presentation-container');
let actionContainer = document.querySelector('.action-container');

let nodeDrag = {mouseDown: false, drag: false};
let dirDrag = {mouseDown: false, drag: false, shiftDown: false};

let animation = false;
let clone = null;
let r = 50;
let space = 200;
let fontSize = 16;

let pos = {
    x: 0, y: 0
};

let presentation = {};

function createNode(dir = '') { // Create circle node
    let nodeContainer = document.createElement('div');
    nodeContainer.className = 'node-container';
    nodeContainer.id = 'circle-' + (getLastId() + 1);
    nodeContainer.onmousedown = nodeMouseDown;
    nodeContainer.onmousemove = nodeMouseMove;
    nodeContainer.onmouseup = nodeMouseUp;
    nodeContainer.onmouseleave = nodeMouseLeave;

    setTimeout(() => {
        nodeContainer.classList.add('active');
    }, 500);

    let content, parent;

    if (dir) {
        parent = dir.parentNode.parentNode;
        let {left, top} = parent.getBoundingClientRect();
        content = getContent(dir);

        switch (content) {
            case 1:
                top -= space;
                break;
            case 2:
                left += space;
                break;
            case 3:
                top += space;
                break;
            case 4:
                left -= space;
                break;
        }

        nodeContainer.style.left = left + 'px';
        nodeContainer.style.top = top + 'px';
    }

    let node = document.createElement('div');
    node.className = 'node';

    mainContainer.appendChild(nodeContainer);
    nodeContainer.appendChild(node);

    let curPres = presentation[nodeContainer.id] = {
        text: ''
    };

    for (let i = 1; i <= 4; i++) {
        let dir = document.createElement('span');
        dir.onclick = dirClick;
        dir.onmousedown = dirMouseDown;
        dir.onmousemove = dirMouseMove;

        node.appendChild(dir);

        curPres['relation' + i] = {
            title: '',
            targetId: ''
        }
    }

    if (dir) {
        createLine(parent, nodeContainer, content, (content + 1) % 4 + 1);
    }
}

function createLine(node1, node2, dir1, dir2) { // Create relation/line between node
    let line = document.createElement('div');
    line.onclick = lineClick;
    line.id = node1.id + '|' + node2.id;
    line.className = dir1 + '|' + dir2;
    lineContainer.appendChild(line);

    node1.children[0].children[dir1 - 1].classList.add('used');
    node2.children[0].children[dir2 - 1].classList.add('used');

    presentation[node1.id]['relation' + dir1].targetId = node2.id;
    presentation[node2.id]['relation' + dir2].targetId = node1.id;

    updateLines(node1.id);
}

function updateLines(id) { // Update line movement/position
    let lines = getLines(id);

    lines.forEach(line => {
        let {node1, node2} = getNodeData(line);

        let position = {
            rect1: {
                left: parseInt(node1.style.left),
                top: parseInt(node1.style.top)
            },
            rect2: {
                left: parseInt(node2.style.left),
                top: parseInt(node2.style.top)
            }
        };

        for (let key in position) {
            let content = parseInt(getDirs(line)[key.slice(-1) - 1]);

            let pos = position[key];

            switch (content) {
                case 1:
                    pos.left += r;
                    break;
                case 2:
                    pos.left += r * 2;
                    pos.top += r;
                    break;
                case 3:
                    pos.left += r;
                    pos.top += r * 2;
                    break;
                case 4:
                    pos.top += r;
                    break;
            }
        }

        let x = position.rect1.left - position.rect2.left;
        let y = position.rect1.top - position.rect2.top;
        let tilted = Math.hypot(x, y);
        let degree = Math.atan2(y, x) * 180 / Math.PI;

        setTimeout(() => {
            line.style.height = tilted + 'px';
            line.style.bottom = window.innerHeight - position.rect1.top + 'px';
            line.style.left = position.rect1.left + 'px';
            line.style.transform = `rotate(${degree - 90}deg)`;

            setTimeout(() => {
                line.style.transition = '.4s backgroundColor';
            }, 400);
        });
    });

    saveDesign(); // Save the design to localStorage after lines update
}

function action(cmd) { // Action like delete/edit
    let parent = mainContainer.querySelector('.node-container > div.active');
    if (parent) parent = parent.parentNode;

    if (cmd === 'x') {
        if (parent) {
            let lines = getLines(parent.id);

            lines.forEach(line => {
                let {node1, node2, dir1, dir2} = getNodeData(line);

                node1.children[0].children[dir1 - 1].classList.remove('used');
                node2.children[0].children[dir2 - 1].classList.remove('used');

                presentation[node1.id]['relation' + dir1].title = '';
                presentation[node2.id]['relation' + dir2].title = '';
                presentation[node1.id]['relation' + dir1].targetId = '';
                presentation[node2.id]['relation' + dir2].targetId = '';

                line.remove();
            });

            delete presentation[parent.id];
            parent.remove();
        } else {
            let line = document.querySelector('.line-container .active');

            if (line) {
                let {node1, node2, dir1, dir2} = getNodeData(line);

                node1.children[0].children[dir1 - 1].classList.remove('used');
                node2.children[0].children[dir2 - 1].classList.remove('used');

                presentation[node1.id]['relation' + dir1].title = '';
                presentation[node2.id]['relation' + dir2].title = '';
                presentation[node1.id]['relation' + dir1].targetId = '';
                presentation[node2.id]['relation' + dir2].targetId = '';

                line.remove();
            }
        }

        refreshActive('action');
    } else {
        editContainer.classList.add('active');

        let curPres = presentation[parent.id];

        ckContent.setData(curPres.text);

        let relations = document.querySelector('.relations');
        relations.innerHTML = '';

        for (let key in curPres) {
            if (curPres[key].targetId) {
                let input = document.createElement('input');
                input.id = key;
                input.placeholder = key;
                input.value = curPres[key].title;
                input.onkeydown = saveEdit;
                relations.appendChild(input);
            }
        }
    }

    saveDesign();
}

function closeEdit() { // Close edit content
    editContainer.classList.remove('active');
    setTimeout(() => {
        refreshActive('node');
        refreshActive('action');
    }, 400);
}

function saveEdit() { // Save edit when content changed
    setTimeout(() => {
        let node = document.querySelector('.node-container > div.active').parentNode;
        let curPres = presentation[node.id];

        curPres.text = ckContent.getData();

        let inputs = document.querySelectorAll('.relations input');

        inputs.forEach(input => {
            curPres[input.id].title = input.value;
        });

        saveDesign();
    });
}

function changeMode(el) { // Change mode
    if (el.innerHTML === 'Presentation Mode') {
        presentationContainer.classList.add('active');
        presentationContainer.children[1].innerHTML = '';

        document.documentElement.requestFullscreen();

        createPresentation();

        el.innerHTML = 'Design Mode';
    } else {
        presentationContainer.classList.remove('active');

        document.exitFullscreen();

        el.innerHTML = 'Presentation Mode';
    }
}

function createPresentation(dir = '') { // Create presentation
    let id = mainContainer.children[0].id;

    if (dir) {
        id = presentation[presentationContainer.children[1].children[0].id]['relation' + dir].targetId;
    }

    if (!id || animation) return false;

    let curPres = presentation[id];

    let size = {
        width: window.innerWidth - 200,
        height: screen.height - 200
    };
    let presentationEl = document.createElement('div');
    presentationEl.id = id;
    presentationEl.style.width = size.width + 'px';
    presentationEl.style.height = size.height + 'px';

    let content = document.createElement('div');
    content.className = 'content';
    content.innerHTML = curPres.text;
    content.style.fontSize = fontSize + 'px';

    let buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    let buttons = document.createElement('div');
    buttons.className = 'buttons';

    let labels = document.createElement('div');
    labels.className = 'labels';

    presentationContainer.children[1].appendChild(presentationEl);
    presentationEl.appendChild(content);
    presentationEl.appendChild(buttonContainer);
    buttonContainer.appendChild(buttons);
    buttonContainer.appendChild(labels);

    for (let key in curPres) {
        if (key !== 'text') {
            let targetId = curPres[key].targetId;
            let title = curPres[key].title;

            let button = document.createElement('button');
            button.disabled = !targetId;
            button.onclick = () => {
                createPresentation(parseInt(key.slice(-1)));
            };
            button.tabIndex = parseInt(key.slice(-1));
            buttons.appendChild(button);

            let label = document.createElement('label');
            if (targetId) {
                if (title) {
                    label.innerHTML = title;
                } else {
                    label.innerHTML = 'Title has not been set yet';
                    label.className = 'not-set';
                }
            } else {
                label.innerHTML = '-';
            }
            labels.appendChild(label);
        }
    }

    let pos = {
        left: window.innerWidth / 2 - size.width / 2,
        top: screen.height / 2 - size.height / 2
    };

    switch (dir) {
        case 1:
            pos.top -= window.innerHeight;
            break;
        case 2:
            pos.left += window.innerWidth;
            break;
        case 3:
            pos.top += window.innerHeight;
            break;
        case 4:
            pos.left -= window.innerWidth;
            break;
    }

    presentationEl.style.left = pos.left + 'px';
    presentationEl.style.top = pos.top + 'px';

    if (dir) {
        startAnimation(dir);
    }
}

function startAnimation(dir) { // Start animation of presentation
    animation = true;

    let presentationContent = presentationContainer.children[1];

    [...presentationContent.children].forEach(el => {
        let {left, top} = el.getBoundingClientRect();

        switch (dir) {
            case 1:
                top += window.innerHeight;
                break;
            case 2:
                left -= window.innerWidth;
                break;
            case 3:
                top -= window.innerHeight;
                break;
            case 4:
                left += window.innerWidth;
                break;
        }

        el.style.left = left + 'px';
        el.style.top = top + 'px';
    });

    setTimeout(() => {
        presentationContent.children[0].remove();
        animation = false;
    }, 500);
}

function showAction(el) { // Show action when line got clicked or circle on hover
    actionContainer.classList.add('active');
    let {left, top} = el.getBoundingClientRect();

    let btnDel = actionContainer.querySelector('button.del');

    if (el.classList.contains('node-container')) {
        btnDel.classList.add('pad');
    } else {
        btnDel.classList.remove('pad');
        let {width, height} = actionContainer.getBoundingClientRect();
        left += width / 2;
        top += height / 2;
    }

    actionContainer.style.left = left + 'px';
    actionContainer.style.top = top + 'px';
}

function changeFontSize(val) { // Change font size of text
    fontSize += val;

    [...presentationContainer.children[1].children].forEach(el => {
        el.querySelector('.content').style.fontSize = fontSize + 'px';
    });
}
