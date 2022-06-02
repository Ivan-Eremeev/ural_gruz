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
      el: '.welcome__pagination',
      clickable: true,
    },
  });

  const partnersSlider = new Swiper('#partnersSlider', {
    slidesPerView: 1,
    spaceBetween: 10,
    grid: {
      rows: 2,
    },
    pagination: {
      el: '.partners__pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.partners__arrow--next',
      prevEl: '.partners__arrow--prev',
      disabledClass: 'none',
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
        spaceBetween: 20,
        grid: {
          rows: 2,
        },
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
        grid: {
          rows: 2,
        },
      }
    }
  });
  
  const modalSliderNav = new Swiper('#modalSliderNav', {
    spaceBetween: 10,
    slidesPerView: 'auto',
    freeMode: true,
    breakpoints: {
      576: {
        spaceBetween: 30,
      },
    }
  });
  const modalSlider = new Swiper('#modalSlider', {
    spaceBetween: 10,
    autoHeight: true,
    navigation: {
      nextEl: '.modal__arrow--next',
      prevEl: '.modal__arrow--prev',
      disabledClass: 'none',
    },
    thumbs: {
      swiper: modalSliderNav,
    },
  });

  // Переход к слайду по индексу
  function sildeTo(slider) {
    const trigger = $('[data-slide-to]');
    trigger.on('click', function () {
      const index = $(this).data('slide-to');
      slider.slideTo(index);
    })
  }
  sildeTo(modalSlider);

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
      if (!$this.hasClass('active')) {
        sublist.stop().slideUp();
        $this.next('.catalog-menu__sublist').stop().slideDown();
        link.removeClass('active');
        $this.toggleClass('active');
      } else {
        sublist.stop().slideUp();
        link.removeClass('active');
      }
    })
  }
  menuCatalog();

  // Stiky menu // Липкое меню. При прокрутке к элементу #header добавляется класс .stiky который и стилизуем
  function stikyMenu() {
    const header = document.querySelector('#stiky');

    setNavbarPosition();

    window.addEventListener('scroll', () => {
      setNavbarPosition();
    });

    function setNavbarPosition() {
      
      if (window.scrollY > header.clientTop + 250 && $(window).width() > breakSm) {
        header.classList.add('stiky');
      } else {
        header.classList.remove('stiky');
      }

    }
  }
  stikyMenu();

  // Видео youtube для страницы
  function uploadYoutubeVideo() {
    if ($(".js-youtube")) {

      let noToggle = true;

      $('.video-img').on('click', function () {
        // создаем iframe со включенной опцией autoplay
        let wrapp = $(this).closest('.js-youtube'),
          videoId = wrapp.data('video-id'),
          iframe_url = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&autohide=1";

        if ($(this).data('params')) iframe_url += '&' + $(this).data('params');

        // Высота и ширина iframe должны быть такими же, как и у родительского блока
        let iframe = $('<iframe/>', {
          'frameborder': '0',
          'src': iframe_url,
          'allow': "autoplay"
        })

        // Заменяем миниатюру HTML5 плеером с YouTube
        if (noToggle) {
          $(this).find('.video-iframe').append(iframe);
          noToggle = false;
        }

        // Закрыть видео при переключении слайдера
        modalSlider.on('slideChange', function () {
          $('.video-iframe iframe').remove();
          noToggle = true;
        });

        // Закрыть видео при закрытии модального окна
        $('#videoModal').on('hide.bs.modal', function () {
          $('.video-iframe iframe').remove();
          noToggle = true;
        });

      });
    }
  };
  uploadYoutubeVideo();

  // JQuery Scrollbar
  $('.scrollbar-inner').scrollbar();

  // Изменение количества товара (плюс минус)
  function counter(block) {
    const counter = document.querySelectorAll(block);
    if (counter) {
      counter.forEach(element => {
        const minus = element.querySelector('.js-counter-minus');
        const plus = element.querySelector('.js-counter-plus');
        const inputWrap = element.querySelector('.js-counter-input');
        const input = inputWrap.querySelector('input');
        plus.addEventListener('click', () => {
          if (Number(input.value) < 999) {
            input.value = Number(input.value) + 1;
          }
        })
        minus.addEventListener('click', () => {
          if (Number(input.value) > 1) {
            input.value = Number(input.value) - 1;
          }
        })
        input.addEventListener('keyup', () => {
          input.value = input.value.replace(/[^\d]/g, '');
        })
        input.addEventListener('blur', () => {
          if (input.value == '' || input.value == 0) {
            input.value = 1;
          }
        })
      });
    }
  }
  counter('.js-counter');

  // Показать еще
  function showMore(block, numShow) {
    const element = block.find('.js-show-more-element');
    const btn = block.find('.js-show-more-btn');
    element.each(function (index) {
      if (index >= numShow) {
        $(this).fadeOut();
      }
    })
    btn.on('click', function () {
      $(this).fadeOut();
      element.fadeIn();
    })
  }
  showMore($('.js-show-more-block'), 3);

  // YandexMap
  ymaps.ready(function () {
    initYandexMap($('#yandexMap'));
  });

  function initYandexMap(mapBlock) {
    if (mapBlock.length) {
      const mapId = mapBlock.attr('id');
      const center = mapBlock.data('center');
      const place = mapBlock.data('place');
      const zoom = mapBlock.data('zoom');
      var myMap;
      myMap = new ymaps.Map(mapId, {
        center: center, // Центер карты
        zoom: zoom, // Коэффициент масштаба карты
        controls: [ // Элементы управления
          'zoomControl',
        ]
      });
      myMap.behaviors.disable('scrollZoom'); // Отключить изменение масштаба скроллом мыши
      // Добавление метки
      var myPlacemark = new ymaps.Placemark(place, null, {
        preset: 'islands#redDotIcon'
      });
      myMap.geoObjects.add(myPlacemark);
    }
  } 

}