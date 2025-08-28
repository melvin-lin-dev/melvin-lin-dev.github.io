$(() => {
    initialEvent();
});

function initialEvent() {
    let wordsLimit = 10;

    events.forEach(event => {
        let description = event.description.split(' ').slice(0, wordsLimit).join(' ');
        description += ' ...';

        $('#event-list').append(`
                <div class="col-12 col-md-6 col-xl-4">
                    <div class="content-container">
                        <img src="images/events/${event.fileName}" alt="${event.name} Image">

                        <div class="content">
                            <h2>${event.name}</h2>
                            <p>${description}</p>
                            <a href="">Read More <i class="fas fa-chevron-right"></i></a>
                        </div>
                    </div>
                </div>
        `);
    });
}

function scrollExtraFunction(isActive) {
    if (isActive) {
        $('#event-list > div').each((index, content) => {
            setTimeout(() => {
                content.classList.add('display');
            }, index * 250);
        });
    } else {
        $('#event-list > div').removeClass('display');
    }
}
