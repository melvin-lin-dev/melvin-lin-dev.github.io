function saveDesign() {
    let obj = {
        presentation
    };

    obj.design = {
        nodes: [],
        lines: []
    };

    [...mainContainer.children].forEach(node => {
        obj.design.nodes.push({
            id: node.id,
            left: node.style.left,
            top: node.style.top
        })
    });

    [...lineContainer.children].forEach(line => {
        obj.design.lines.push({
            id: line.id,
            className: line.className
        });
    });

    localStorage.design = JSON.stringify(obj);
}

function loadDesign() {
    let obj = JSON.parse(localStorage.design);

    obj.design.nodes.forEach(node => {
        createNode();

        let last = mainContainer.lastElementChild;
        last.id = node.id;
        last.style.left = node.left;
        last.style.top = node.top;
    });

    presentation = obj.presentation;

    obj.design.lines.forEach(line => {
        let {node1, node2, dir1, dir2} = getNodeData(line);

        createLine(node1, node2, dir1, dir2);
    });

    saveDesign();
}
