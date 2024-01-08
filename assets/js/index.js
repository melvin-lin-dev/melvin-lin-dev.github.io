function loadApp() {
  var flipbook = $(".book");

  if (flipbook.width() == 0 || flipbook.height() == 0) {
    setTimeout(loadApp, 10);
    return;
  }

  flipbook.turn({
    width: 922,
    height: 600,
    duration: 1000,
    gradients: true,
    autoCenter: true,
    elevation: 50,
    pages: 5,
    when: {
      turning: function(event, page, view) {
        Hash.go('page/' + page).update();

        disableControls(page);

        $(".thumbnails li")
          .removeClass("current");

        $('.thumbnails .page-'+page).
          parent().
          addClass('current');
      },

      turned: function (event, page, view) {
        disableControls(page);

        $(this).turn("center");

        if (page == 1) {
          $(this).turn("peel", "br");
        }
      },

      missing: function (event, pages) {
        const INIT_NUM_PAGES = 4;

        for(let i = 1; i <= 2; i++){
          addPage(i, $(this));
        }
        
        $.ajax({url: './assets/json/data.json'})
          .done(function(res) {
            $(`
              <li>
                  <div class="thumbnail page-3">
                      <i class="fa-solid fa-list-ul"></i>
                  </div>
                  <span>Contents</span>
              </li>
            `).appendTo($('.thumbnails ul'));

            let len = 0;

            let contentsHTML = '';

            for(let key in res){
              const CURRENT_PAGE = INIT_NUM_PAGES + len;

              let element = $('<div />', {});
              
              if ($('.book').turn('addPage', element, CURRENT_PAGE)) {
                element.html('<div class="gradient"></div>');
              
                let html = '';
                if(res[key].data.length){
                  res[key].data.sort((a, b) => a.name.localeCompare(b.name));

                  res[key].data.forEach(data => {
                    html += `
                      <button class="content" onclick="navigateTo(this, '${data.link}')">
                        <div>
                          <div>${data.name}</div>
                          ${data.desc ? `<div class="desc">${data.desc}</div>` : ""}
                          ${data.skills ? `<div class="skills"><b>Skills:</b> ${data.skills}</div>` : ""}
                        </div>
                        <i class="fa-solid fa-chevron-right"></i>
                      </button>
                    `;
                  })
                }else{
                  html = '<div class="empty-data"><i class="fa-solid fa-bullhorn"></i><div>Coming Soon</div></div>'
                }

                let el = $(`
                  <div class="content-container ${key}">
                      <div class="title">${key}</div>
                      <div class="list">
                        ${html}
                      </div>
                  </div>
                `);
                $(el).appendTo(element);

                $(`
                  <li class="${CURRENT_PAGE % 2 === 0 ? 'left-page' : ''}">
                      <div class="thumbnail page-${CURRENT_PAGE}">
                          <i class="${res[key].class}"></i>
                      </div>
                      <span>${key}</span>
                  </li>
                `).appendTo($('.thumbnails ul'));

                contentsHTML += `
                  <div class="page-${CURRENT_PAGE}">
                    <div>${key}</div>
                    <div>${CURRENT_PAGE}</div>
                  </div>
                `;
              }
              len++;
            }

            let contentsEl = $('<div />', {});
            if ($('.book').turn('addPage', contentsEl, INIT_NUM_PAGES - 1)) {
              contentsEl.html('<div class="gradient"></div>');

              let el = $(`
                <div class="contents-container">
                    <div class="title">Contents</div>
                    <div class="list">
                      ${contentsHTML}
                    </div>
                </div>
              `);
              $(el).appendTo(contentsEl);
            }

            let newLength = INIT_NUM_PAGES + len;
            addPage(newLength, $('.book'));
            $('.book').turn('pages', newLength);
          });
      },
    },
  });

  $(document).keydown(function (e) {
    var previous = 37,
      next = 39;

    switch (e.keyCode) {
      case previous:
        $(".book").turn("previous");
        e.preventDefault();
        break;
      case next:
        $(".book").turn("next");
        e.preventDefault();
        break;
    }
  });

  Hash.on("^page/([0-9]*)$", {
    yep: function (path, parts) {
      var page = parts[1];

      if (page !== undefined) {
        if ($(".book").turn("is")) {
          $(".book").turn("page", page);
          $(".thumbnails .page-" + page).parent().addClass("current");
        }
      }
    },
    nop: function (path) {
      if ($(".book").turn("is")) {
        $(".book").turn("page", 1);
        $(".thumbnails .page-1").parent().addClass("current");
      }
    },
  });

  $(window)
    .load(() => {
      setTimeout(() => {
        window.scrollTo(0,0);
      })
    })
    .resize(function () {
      resizeViewport();
    })
    .bind("orientationchange", function () {
      resizeViewport();
    });

  $(".thumbnails, .book").click(function (event) {
    let page;

    if (
      event.target &&
      (page = /page-([0-9]+)/.exec($(event.target).attr("class")) || /page-([0-9]+)/.exec($(event.target.parentNode).attr("class")))
    ) {
      Hash.go("page/" + page[1]).update();
      
      goToPage(page[1]);

      disableControls(page);

      $(".thumbnails li")
        .removeClass("current");

      $('.thumbnails .page-'+page[1]).
        parent().
        addClass('current');
    }
  });

  $(".next-button")
    .bind($.mouseEvents.over, function () {
      $(this).addClass("next-button-hover");
    })
    .bind($.mouseEvents.out, function () {
      $(this).removeClass("next-button-hover");
    })
    .bind($.mouseEvents.down, function () {
      $(this).addClass("next-button-down");
    })
    .bind($.mouseEvents.up, function () {
      $(this).removeClass("next-button-down");
    })
    .click(function () {
      $(".book").turn("next");
    });

  $(".previous-button")
    .bind($.mouseEvents.over, function () {
      $(this).addClass("previous-button-hover");
    })
    .bind($.mouseEvents.out, function () {
      $(this).removeClass("previous-button-hover");
    })
    .bind($.mouseEvents.down, function () {
      $(this).addClass("previous-button-down");
    })
    .bind($.mouseEvents.up, function () {
      $(this).removeClass("previous-button-down");
    })
    .click(function () {
      $(".book").turn("previous");
    });

  resizeViewport();

  $(".book").addClass("animated");
}

yepnope({
  test: Modernizr.csstransforms,
  yep: ["./assets/other/turnjs/lib/turn.js"],
  nope: ["./assets/other/turnjs/lib/turn.html4.min.js"],
  complete: loadApp,
});
