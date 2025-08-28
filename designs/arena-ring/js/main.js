let animationTime = .7;

$(() => {
    $(".year-now").text(new Date().getFullYear());
    $('header').addClass('active');
    $(window).on('scroll', function () {
        $('section > div').each((index, section) => {
            let sectionY = section.getBoundingClientRect().top;

            if (window.scrollY > sectionY + 50) {
                section.classList.add('active');

                if (window.scrollExtraFunction) {
                    scrollExtraFunction(true);
                }
            } else {
                section.classList.remove('active');

                if (window.scrollExtraFunction) {
                    scrollExtraFunction(false);
                }
            }
        });
    });

    $('.back-to-top').on('click', function () {
        window.scrollTo(0, 0);
    });

    initialPageTransition();

    $('a').on('click', function (e) {
        e.preventDefault();

        togglePageTransition();

        setTimeout(() => {
            location.href = this.href;
        }, $('.page-transition span').length * (animationTime + 1));
    });
});

function initialPageTransition() {
    let size = 70;

    $('body').prepend(`<div class="page-transition"></div>`);

    let lengthX = window.innerWidth / size;
    let lengthY = window.innerHeight / size;

    for (let y = 0; y < lengthY; y++) {
        for (let x = 0; x < lengthX; x++) {
            let span = document.createElement('span');
            span.style.left = x * size + 'px';
            span.style.top = y * size + 'px';
            span.style.width = size + 'px';
            span.style.height = size + 'px';

            $('.page-transition').append(span.outerHTML);
        }
    }

    togglePageTransition();
}

function togglePageTransition() {
    let spans = $('.page-transition span');

    setTimeout(() => {
        if (!spans.parent().hasClass('d-none') && window.pageTransitionFunction) {
            pageTransitionFunction();
        }

        spans.parent().toggleClass('d-none');
    }, spans.parent().hasClass('d-none') ? 0 : spans.length * animationTime);

    spans.each((index, span) => {
        setTimeout(() => {
            span.classList.toggle('hide');

            setTimeout(() => {
                span.classList.toggle('d-none');
            }, 400);
        }, index * animationTime);
    });
}
