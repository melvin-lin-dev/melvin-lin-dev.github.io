window.onscroll = (e) => {
    let offsetY = window.pageYOffset;

    let nav = document.querySelector('nav');

    if (offsetY) {
        nav.classList.add('scroll-active');
    } else {
        nav.classList.remove('scroll-active');
    }

    let sections = document.querySelectorAll('header > div, section > div');

    sections.forEach(section => {
        if (section.id) {
            let rect = section.getBoundingClientRect();
            let currentLink = nav.querySelector(`a.${section.id}`);

            if (offsetY >= section.offsetTop - 200 && offsetY <= section.offsetTop + rect.height) {
                nav.querySelectorAll('a').forEach(el => {
                    el.classList.remove('active');
                });
                currentLink.classList.add('active');
            } else {
                currentLink.classList.remove('active');
            }
        }
    });

    let animatedSections = document.querySelectorAll('section .header, section .active-animation');

    animatedSections.forEach(section => {
        let rect = section.getBoundingClientRect();

        if (rect.top - rect.height - 200 < 0) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
};

function showMenu(toggle) {
    document.querySelector('.menu').classList[toggle]('active');
}
