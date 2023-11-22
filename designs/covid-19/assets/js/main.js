let owlCarousel = $('.owl-carousel');

$(document).ready(function () {
    owlCarousel.owlCarousel({
        items: 1,
        nav: true,
        navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>']
        // autoplay: true,
        // autoplayTimeout: 2000,
        // smartSpeed: 1000
    }).on('change.owl.carousel', function (e) {
        if (e.namespace && e.property.name === 'position'
            && e.relatedTarget.relative(e.property.value) === e.relatedTarget.items().length - 1) {
            // put your stuff here ...
            // $('.owl-dots').hide(true);
            // $('.owl-nav').hide(true);

        }
    });

    $('#btn-question').click(function () {
        $('.form-container').addClass('active');
        $('.owl-dots').hide(true);
        $('.owl-nav').hide(true);
        // $('.owl-item:not(.question)').remove();
        // owlCarousel.data('owlCarousel').removeItem(1);
    });
});
