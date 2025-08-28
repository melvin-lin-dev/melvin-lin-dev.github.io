let slideShow = {
    interval: null,
    activeIndex: null,
    time: {
        change: 3000,
        animate: 1000
    },
    animate: false
};

let events = [
    {
        name: 'Free for All classic',
        description: 'Fight other players to win the match',
        fileName: 'Free for All classic.png',
        highlight: false
    },
    {
        name: '1 vs 1 Dodgeball',
        description: 'Hit other player without the other player catch the ball',
        fileName: '1 vs 1 dodge ball.png',
        highlight: true
    },
    {
        name: '3 vs 3 Dodgeball',
        description: 'Hit other players without other players catch the ball, and don\'t forget to protect your teammate',
        fileName: '3 vs 3 dodge ball.png',
        highlight: false
    },
    {
        name: 'Free for All tournament',
        description: 'Win 1 vs 1 vs 1 vs 1 tournament to go to the next stage and win $1500',
        fileName: 'Free for All tournament.png',
        highlight: true
    },
    {
        name: '2 vs 2 tournament',
        description: 'Win 2 vs 2 tournament to go to the next stage and win $2000',
        fileName: '2 vs 2 tournament.png',
        highlight: true
    },
];

$(() => {
    initialSlideShow();

    $('#btn-slide-left').on('click', function () {
        slideTo(-1);
    });

    $('#btn-slide-right').on('click', function () {
        slideTo(1);
    });

    $(window).on('resize', function () {
        clearInterval(slideShow.interval);
        startSlideShow();
    });

    let slideShowContent = $('.highlight-event .slideshow-content');
    slideShowContent.on('mouseenter', function () {
        clearInterval(slideShow.interval);
    }).on('mouseleave', function () {
        startSlideShow();
    });
});

function initialSlideShow() {
    events.filter(event => {
        return event.highlight;
    }).forEach(event => {
        $('.highlight-event .slideshow-content').append(`
                    <div class="content-container">
                        <img src="images/events/${event.fileName}" alt="${event.name} Image" class="object-fit">

                        <div class="content">
                            <h3>${event.name}</h3>
                            <p>${event.description}</p>
                            <button class="btn btn-primary-medium btn-hover">
                                Read More <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>`);
    });

    $('.highlight-event .content-container:nth-child(2)').addClass('active');

    startSlideShow();
}

function startSlideShow() {
    slideShow.activeIndex = $('.highlight-event .content-container.active').index();

    let slides = $('.highlight-event .content-container');
    let parentWidth = slides.parent()[0].getBoundingClientRect().width;
    let parentHalfWidth = parentWidth / 2;
    let width = parentWidth * 70 / 100;
    slides.each(index => {
        slides.eq(index).css({'left': parentHalfWidth + width * (index - slideShow.activeIndex)});
    });

    slideShow.interval = setInterval(() => {
        slide();
    }, slideShow.time.change);
}

function slideTo(direction) {
    if (!slideShow.animate) {
        clearInterval(slideShow.interval);
        slide(direction);
    }
}

function slide(direction = 1) {
    slideShow.animate = true;

    let slides = $('.highlight-event .content-container');
    let parentWidth = slides.parent()[0].getBoundingClientRect().width;
    let parentHalfWidth = parentWidth / 2;
    let width = parentWidth * 70 / 100;

    let edgeIndex = direction === 1 ? 0 : slides.length - 1;
    let slideCloneIndex = (direction === 1 ? slides.length : -1) - slideShow.activeIndex;
    let slideClone = slides.eq(edgeIndex).clone().css('left', parentHalfWidth + width * slideCloneIndex);
    slides.parent()[direction === 1 ? 'append' : 'prepend'](slideClone);

    slides = $('.highlight-event .content-container');

    slides.each(index => {
        slides.eq(index).animate({left: '+=' + width * direction * -1}, slideShow.time.animate);
    });

    let nextIndex = (slideShow.activeIndex + direction) % slides.length;
    if (nextIndex < 0) {
        nextIndex = slides.length - 1;
    }

    slides.eq(slideShow.activeIndex + (direction === 1 ? 0 : 1)).removeClass('active');
    slides.eq(direction === 1 ? nextIndex : slideShow.activeIndex).addClass('active');

    setTimeout(() => {
        slides.eq(edgeIndex + (direction === 1 ? 0 : 1)).remove();
    }, 600);

    setTimeout(() => {
        slideShow.animate = false;
    }, slideShow.time.animate)
}
