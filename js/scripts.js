window.onload = () => {

  // Брэйкпоинты js
  const breakXl = 1400,
        breakLg = 1200,
        breakMd = 992,
        breakSm = 768,
        breakXs = 576;

  // Swiper slider
  const welcomeSlider = new Swiper('#welcomeSlider', {
    loop: true,
    autoplay: {
      delay: 5000,
    },
    speed: 1500,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  // Каталог под меню
  function subcatalog() {
    const subcatalog = $('.subcatalog');
    const catalogBtn = $('.menu__catalog-btn');
    const link = $('.subcatalog__link');
    const sublink = $('.subcatalog__sublink');
    const sublist = $('.subcatalog__sublist');
    const sublist2 = $('.subcatalog__sublist2');
    link.on('click', function (e) {
      e.preventDefault()
      let $this = $(this);
      let drop = $this.next('.subcatalog__sublist');
      if (!$this.hasClass('active')) {
        link.removeClass('active');
        $this.addClass('active');
        sublist.removeClass('open');
        drop.addClass('open');
        subcatalog.addClass('active');
        catalogBtn.addClass('active');
      } else {
        $this.removeClass('active');
        drop.removeClass('open');
        sublist2.removeClass('open');
        sublink.removeClass('active');
        subcatalog.removeClass('active');
        catalogBtn.removeClass('active');
      }
    })
    sublink.on('click', function (e) {
      e.preventDefault();
      let $this = $(this);
      let drop = $this.next('.subcatalog__sublist2');
      if (!$this.hasClass('active')) {
        sublink.removeClass('active');
        $this.addClass('active');
        sublist2.removeClass('open');
        drop.addClass('open');
      } else {
        $this.removeClass('active');
        drop.removeClass('open');
      }
    })
    $(document).mouseup(function (e) {
      if (!subcatalog.is(e.target)
        && subcatalog.has(e.target).length === 0) {
        sublist.removeClass('open');
        sublist2.removeClass('open');
        link.removeClass('active');
        sublink.removeClass('active');
        subcatalog.removeClass('active');
        catalogBtn.removeClass('active');
      }
    });
    $(window).resize(function () { 
      if ($(window).width() <= breakMd) {
        sublist.removeClass('open');
        sublist2.removeClass('open');
        link.removeClass('active');
        sublink.removeClass('active');
        subcatalog.removeClass('active');
        catalogBtn.removeClass('active');
      }
    });
  }
  subcatalog();

  // Выпадайки при клике по кнопке
	// Задать блокам выпадайкам айдишник совпадающий с data-drop="" в кнопке для этого блока
	// Задать кнопкам .js-drop-btn и data-drop="" с айдишником блока выпадайки
	function dropBlock(btn) {
		var $this = undefined,
				drop = undefined,
				close = $('.js-drop-close');
		btn.on('click', function (e) {
      e.preventDefault();
			$this = $(this);
			drop = $('#' + $this.data('drop'));
			$this.toggleClass('active');
			drop.toggleClass('open');
			$(document).mouseup(function (e) {
				if (!$this.is(e.target)
					&& $this.has(e.target).length === 0
					&& !drop.is(e.target)
					&& drop.has(e.target).length === 0) {
					$this.removeClass('active');
					drop.removeClass('open');
				}
			});
		})
		close.on('click', function () {
			$('[data-drop="' + $(this).data('drop') +'"]').removeClass('active');
			$('#' + $(this).data('drop')).removeClass('open');
		})
	}
	dropBlock($('.js-drop-btn'));

  // Выпадание списков в меню-каталоге
  function menuCatalog() {
    const title = $('.catalog-menu__title');
    const link = $('.catalog-menu__link');
    const sublist = $('.catalog-menu__sublist');
    title.on('click', function () {
      let $this = $(this);
      if ($(window).width() <= breakSm) {
        $this.next('.catalog-menu__list').stop().slideToggle();
      }
    })
    link.on('click', function (e) {
      e.preventDefault();
      let $this = $(this);
      sublist.stop().slideUp();
      $this.next('.catalog-menu__sublist').stop().slideToggle();
    })
  }
  menuCatalog();

}