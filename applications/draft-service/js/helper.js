function getIds(line) {
    return line.id.split('|');
}

function getDirs(line) {
    return line.className.split(' ')[0].split('|');
}

function getLastId() {
    return mainContainer.lastElementChild ? parseInt(mainContainer.lastElementChild.id.split('-')[1]) : 0;
}

function getContent(dir) {
    return parseInt(getComputedStyle(dir, ':after').content.replace(/"/g, ''));
}

function getLines(id) {
    return lineContainer.querySelectorAll(`[id^="${id}|"], [id$="${id}"]`)
}

function getNodeData(line) {
    return {
        node1: document.getElementById(getIds(line)[0]),
        node2: document.getElementById(getIds(line)[1]),
        dir1: getDirs(line)[0],
        dir2: getDirs(line)[1]
    }
}

function refreshActive(type, className = 'active') {
    if (type === 'action') {
        actionContainer.classList.remove(className);

        if (className === 'active') {
            actionContainer.querySelector('.del').classList.remove('pad');
        }
    } else {
        if(className === 'active'){
            let els = document.querySelectorAll(`.${type}-container > .${className}`);

            els.forEach(el => {
                el.classList.remove(className);
            });
        }else{
            let els = document.querySelectorAll(`.${type}-container.${className}`);

            els.forEach(el => {
                el.classList.remove(className);
            });
        }
    }
}

function showAllNodes() {
    [...mainContainer.children].forEach(node => {
        node.children[0].classList.add('active');
    });
}
