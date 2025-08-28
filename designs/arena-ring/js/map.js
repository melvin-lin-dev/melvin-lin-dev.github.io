$(() => {
    let startIndex = 0;
    let slides = $('section .map .content-container');
    slides.eq(startIndex).addClass('active');

    setInterval(() => {
        startIndex++;
        startIndex %= slides.length;

        slides.filter('.previous-active').removeClass('previous-active');
        slides.filter('.active').removeClass('active').addClass('previous-active');

        $(`section .map .content-container:nth-child(${startIndex + 1})`).addClass('active');
    }, 3000);
});
