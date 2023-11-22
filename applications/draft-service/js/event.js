function nodeMouseDown(e) {
    nodeDrag.mouseDown = true;

    pos.x = e.clientX;
    pos.y = e.clientY;
}

function nodeMouseMove(e) {
    let target = e.target;

    if (target.nodeName === 'SPAN') target = target.parentNode.parentNode;

    target.classList.add('drag');
    actionContainer.classList.add('drag');

    target.children[0].classList.add('active');
    showAction(target);

    if (nodeDrag.mouseDown) {
        nodeDrag.drag = true;

        target.style.left = target.offsetLeft - (pos.x - e.clientX) + 'px';
        target.style.top = target.offsetTop - (pos.y - e.clientY) + 'px';

        pos.x = e.clientX;
        pos.y = e.clientY;

        updateLines(target.id);
    }
}

function nodeMouseUp(e) {
    nodeDrag.mouseDown = false;
    refreshActive('node', 'drag');
    refreshActive('action', 'drag');
    setTimeout(() => {
        nodeDrag.drag = false;
    })
}

function nodeMouseLeave(e) {
    let target = document.elementFromPoint(e.clientX, e.clientY);

    if (!clone && target.nodeName !== 'BUTTON' && !editContainer.classList.contains('active')) {
        refreshActive('node');
        refreshActive('action');
    }
}

function dirClick(e) {
    if (!e.target.classList.contains('used') && !nodeDrag.drag) {
        createNode(e.target);
    }
}

function dirMouseDown(e) {
    if (!dirDrag.drag && !e.target.classList.contains('used')) {
        dirDrag.mouseDown = true;

        pos.x = e.clientX;
        pos.y = e.clientY;
    }
}

function dirMouseMove(e) {
    let target = e.target;

    if (dirDrag.mouseDown && dirDrag.shiftDown) {
        if (!dirDrag.drag) {
            let node = e.target.parentNode.parentNode;
            clone = node.cloneNode(true);
            clone.classList.add('dir-drag');
            clone.style.left = node.style.left;
            clone.style.top = node.style.top;

            let dir = clone.children[0].children[getContent(target) - 1];
            dir.className = 'active';
            dir.onmousemove = dirMouseMove;
            dir.onmouseup = dirMouseUp;

            document.body.appendChild(clone);

            showAllNodes();
        }

        dirDrag.drag = true;

        clone.style.left = clone.offsetLeft - (pos.x - e.clientX) + 'px';
        clone.style.top = clone.offsetTop - (pos.y - e.clientY) + 'px';

        pos.x = e.clientX;
        pos.y = e.clientY;
    }
}

function dirMouseUp(e) {
    if (clone) {
        clone.style.display = 'none';

        if (e) {
            let el = document.elementFromPoint(e.clientX, e.clientY);

            if (el.nodeName === 'SPAN' && !el.classList.contains('used')) {
                let node1 = mainContainer.querySelector(`#${clone.id}`);
                let node2 = el.parentNode.parentNode;
                let dir1 = getContent(clone.querySelector('.node-container span.active'));
                let dir2 = getContent(el);

                if (node1.id !== node2.id) {
                    createLine(node1, node2, dir1, dir2);
                }
            }
        }

        nodeMouseUp();

        refreshActive('node');
        clone.remove();
    }

    clone = '';
    dirDrag.mouseDown = false;
    dirDrag.shiftDown = false;
    dirDrag.drag = false;
}

function lineClick(e) {
    let target = e.target;

    target.classList.add('active');
    showAction(target);

    setTimeout(() => {
        target.classList.remove('active');
        refreshActive('action');
    }, 1500);
}

ckContent.on('key', function () {
    saveEdit();
});

[...actionContainer.children].forEach(btn => {
    btn.addEventListener('mouseleave', nodeMouseLeave);
});
