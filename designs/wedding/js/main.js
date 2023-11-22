let slides = ['slide-1.jpg', 'slide-2.jpg'];
let slideIndex = 0;

let dotContainer = document.querySelector('.dot-container');

window.onload = () => {
    for(let i = 0; i < slides.length; i++){
        dotContainer.innerHTML += `<span onclick="setSlide(${i})"></span>`;
    }

    dotContainer.children[0].classList.add('active');

    changeSlide();
};

function changeSlide(dir = 0) {
    if (dir) {
        dotContainer.children[slideIndex].classList.remove('active');

        slideIndex += dir;
        slideIndex %= slides.length;

        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }
    }

    setSlide(slideIndex);
}

function setSlide(index) {
    document.querySelector('.slideshow-container').style.backgroundImage = `url('images/${slides[index]}')`;
}

window.onscroll = () => {
    let nav = document.querySelector('nav');

    if(window.scrollY){
        nav.classList.add('scroll-active');
    }else{
        nav.classList.remove('scroll-active');
    }
};
