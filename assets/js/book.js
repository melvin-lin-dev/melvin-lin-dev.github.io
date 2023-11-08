function addPage(page, book) {
	var element = $('<div />', {});

	if (book.turn('addPage', element, page)) {
		element.html('<div class="gradient"></div><div class="loader"></div>');

		loadPage(page, element);
	}
}

function loadPage(page, pageElement) {
	switch(page){
		case 1:
			loadHTML('front-cover', page, pageElement);
			break;
		case 2:
			loadHTML('portfolio', page, pageElement);
			break;
		case $('.book').turn('pages'):
			loadHTML('back-cover', page, pageElement);
			break;
	}
}

function loadHTML(fileName, page, pageElement){
	$.ajax({url: `./assets/pages/${fileName}.html`})
		.done(function(pageHtml) {
			var el = $(pageHtml);
			$(el).appendTo(pageElement);
			pageElement.find('.loader').remove();

			$(`
				<li>
					<div class="thumbnail page-${page} ${fileName}">${page === $('.book').turn('pages') ? 'The End' : ''}</div>
					<span>${fileName.replace('-', ' ')}</span>
				</li>
			`).appendTo($('.thumbnails ul'));
		});
}

function disableControls(page) {
	if (page==1)
		$('.previous-button').hide();
	else
		$('.previous-button').show();
				
	if (page==$('.book').turn('pages'))
		$('.next-button').hide();
	else
		$('.next-button').show();
}

function resizeViewport() {
	$('.book').removeClass('animated');

	var bookOffset = $('.book').offset();

	if (bookOffset.top<$('.made').height())
		$('.made').hide();
	else
		$('.made').show();

	$('.book').addClass('animated');
	
}

function goToPage(page){
	$(".book").turn("page", page);
}

function navigateTo(el, link){
	$(el).addClass('clicked');
	setTimeout(() => {
		location.href = link;
	}, 650);
}