$(() => {
    $('.screenshot .content-container').each((index, contentContainer) => {
        contentContainer.onmouseenter = setPosition;
        contentContainer.onmouseleave = setPosition;
    });

    $(window).on('scroll', function () {
        let elements = [];

        $('.screenshot .content-container').each((index, contentContainer) => {
            let y = contentContainer.getBoundingClientRect().top;

            if (window.scrollY > y - 50 && !contentContainer.classList.contains('display')) {
                elements.push(contentContainer);
            }
        });

        elements.forEach((contentContainer, index) => {
            setTimeout(() => {
                contentContainer.classList.add('display');
            }, index * 100);
        })
    });
});

function setPosition(e) {
    let el = e.currentTarget.querySelector('span');
    el.style.left = e.offsetX + 'px';
    el.style.top = e.offsetY + 'px';
}
