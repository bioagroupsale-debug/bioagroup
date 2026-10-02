window.addEventListener("load", function () {
  // Modal
  if (window.Modal) {
    const modalInstance = new Modal();
    modalInstance.listen();
  }

  // Input
  if (window.Input) {
    const inputInstance = new Input();
    inputInstance.listenner(Array.from(document.querySelectorAll("input")));
  }


  function swiperAutoHeight(swiper) {
    const swipers = Array.isArray(swiper) ? swiper : [swiper];
    swipers.forEach(function(swiper) {
      const wrapper = $(swiper.wrapperEl);
      const slides = $(swiper.slides);

      function setHeight() {
        wrapper.innerHeight('auto')
        const slideMaxHeight = Math.max.apply(null, slides.map(function() {
          return $(this).innerHeight();
        }).get());
        wrapper.innerHeight(slideMaxHeight)
      }
      setHeight()

      $(window).on('load resize', setHeight);
    })
  }

  // Swiper Why Choose Us
  const swiperWhyChooseUs = new Swiper(".block-why-choose-us .swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".block-why-choose-us .swiper-button_right",
      prevEl: ".block-why-choose-us .swiper-button_left",
    },
    breakpoints: {
      768: {
        slidesPerView: "auto",
        spaceBetween: 0,
      },
    },
  });
  swiperAutoHeight(swiperWhyChooseUs);

  // Swiper How It Works desctop
  const swiperHowWorksDesctop = new Swiper(".block-how-works.desctop .swiper", {
    slidesPerView: 2,
    spaceBetween: 0,
    navigation: {
      nextEl: ".block-how-works.desctop  .swiper-button_right",
      prevEl: ".block-how-works.desctop  .swiper-button_left",
    },
  });
  swiperAutoHeight(swiperHowWorksDesctop);

  // Swiper How It Works mobile
  const swiperHowWorksMobile = new Swiper(".block-how-works.mobile .swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".block-how-works.mobile .swiper-button_right",
      prevEl: ".block-how-works.mobile .swiper-button_left",
    },
  });
  swiperAutoHeight(swiperHowWorksMobile);

  // Swiper Products desctop
  const swiperProductsDesctop = new Swiper(".block-products-desctop .swiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    // autoplay: {
    // 	delay: 5000,
    // 	disableOnInteraction: false
    // },
    pagination: {
      el: ".block-products-desctop .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".block-products-desctop .swiper-button_right",
      prevEl: ".block-products-desctop .swiper-button_left",
    },
  });

  // Swiper Products mobile
  const swiperProductsMobile = new Swiper(".block-products-mobile .swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    // autoplay: {
    // 	delay: 5000,
    // 	disableOnInteraction: false
    // },
    navigation: {
      nextEl: ".block-products-mobile .swiper-button_right",
      prevEl: ".block-products-mobile .swiper-button_left",
    },
  });
  function productsMobileInit() {
    const products = $('.block-products-mobile .product');
    products.each(function() {
      if ($(window).width() > 768) {
        return;
      }

      const product = $(this);

      if (product.attr('init')) {
        return;
      } else {
        product.attr('init', 'true');
      }

      const content = product.find('.product__content');
      const openBtn = product.find('.product__open');

      if (content.innerHeight() > product.innerHeight()) {
        product.addClass('resize');
        openBtn.click(function() {
          if (openBtn.hasClass('open')) {
            openBtn
              .removeClass('open')
              .find('.product__open-text')
              .text(openBtn.attr('show-text'));
            product.innerHeight('');
          } else {
            openBtn
              .addClass('open')
              .find('.product__open-text')
              .text(openBtn.attr('hide-text'));
            product.innerHeight(content.innerHeight());
          }
        })
      } else {
        product.removeClass('resize');
      }
    })
  };
  productsMobileInit();
  $(window).on('resize', productsMobileInit);

  // Swiper Products small
  const swiperProductsSmall = new Swiper(".block-products-small .swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      768: {
        slidesPerView: "auto",
        spaceBetween: 0,
      },
    },
  });


  // Swiper Reviews Desctop
  const swiperReviewsDesctop = new Swiper(".block-reviews.desctop .swiper", {
    slidesPerView: 3,
    spaceBetween: 0,
    loop: true,
    centeredSlides: true,
    pagination: {
      el: ".block-reviews.desctop .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".block-reviews.desctop .swiper-button_right",
      prevEl: ".block-reviews.desctop .swiper-button_left",
    },
  });

  // Swiper Reviews Mobile
  const swiperReviewsMobile = new Swiper(".block-reviews.mobile .swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".block-reviews.mobile .swiper-button_right",
      prevEl: ".block-reviews.mobile .swiper-button_left",
    },
  });

  // Swiper Roadmap
  const swiperRoadmap = new Swiper(".block-roadmap .swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".block-roadmap .swiper-button_right",
      prevEl: ".block-roadmap .swiper-button_left",
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
    },
  });
  swiperAutoHeight(swiperRoadmap);


 // Панели по атрибуту [menu] — без бургера, с нормальным закрытием
(function ($) {
  function openPanelByKey(key) {
    var $target = $('.menu-services[data-menu="' + key + '"]');
    if (!$target.length) return;

    // закрыть все
    $('.menu-services.open').removeClass('open').attr('aria-hidden', 'true');

    // открыть нужную
    $target.addClass('open').attr('aria-hidden', 'false');

    // a11y
    $('[menu="' + key + '"]').attr('aria-expanded', 'true');
  }

  function closePanel($panel) {
    if (!$panel || !$panel.length) return;
    var key = $panel.attr('data-menu');
    $panel.removeClass('open').attr('aria-hidden', 'true');
    if (key) $('[menu="' + key + '"]').attr('aria-expanded', 'false');
  }

  function closeAllPanels() {
    $('.menu-services.open').each(function () {
      closePanel($(this));
    });
  }

  // Тоггл по клику на триггер с [menu]
  $(document).on('click', '[menu]', function (e) {
    e.preventDefault();
    var key = $(this).attr('menu');
    if (!key) return;

    var $panel = $('.menu-services[data-menu="' + key + '"]');
    if (!$panel.length) return;

    // если уже открыта — закрыть (тоггл)
    if ($panel.hasClass('open')) {
      closePanel($panel);
    } else {
      openPanelByKey(key);
    }
  });

  // Закрытие по кнопке Back
  $(document).on('click', '.menu-services .back', function (e) {
    e.preventDefault();
    closePanel($(this).closest('.menu-services'));
  });

  // Закрытие по клику на тень
  $(document).on('click', '.menu-services__shadow', function (e) {
    // клик по самой тени
    closePanel($(this).closest('.menu-services'));
  });

  // Закрытие по Esc
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      var $opened = $('.menu-services.open').first();
      if ($opened.length) closePanel($opened);
    }
  });
})(jQuery);


  // Menu
  (function () {
    const header = $(".header");
    const menu = $(".menu");
    const menuServices = $(".menu-services");
    const menuBurger = $(".menu-burger");

    menuBurger.click(function () {
      if (menuBurger.hasClass("open")) {
        menuBurger.removeClass("open");
        header.removeClass("menu-open");
        menu.removeClass("open");
        menuServices.removeClass("open");
      } else {
        menuBurger.addClass("open");
        header.addClass("menu-open");
        menu.addClass("open");
      }
    });
  })();

  // Header visible
  (function () {
    const header = $(".header");

    let lastScrollTop = $(window).scrollTop();

    $(window).scroll(function () {
      if (header.hasClass("menu-open")) {
        return;
      }

      let currentScrollTop = $(window).scrollTop();
      if (currentScrollTop > 30) {
        header.addClass('visible')
      } else {
        header.removeClass('visible')
      }

      // let currentScrollTop = $(window).scrollTop();
      // if (currentScrollTop < 100) {
      //   header.css("transform", "translateY(0%)");
      // } else {
      //   if (lastScrollTop - currentScrollTop > 100) {
      //     header.css("transform", "translateY(0%)");
      //     lastScrollTop = currentScrollTop;
      //   }
      //   if (lastScrollTop - currentScrollTop < -100) {
      //     header.css("transform", "translateY(-100%)");
      //     lastScrollTop = currentScrollTop;
      //   }
      //   if (currentScrollTop < 100) {
      //     header.css("transform", "translateY(0%)");
      //     header.removeClass('visible')
      //   }
      // }
    });
  })();


  $('.wpcf7').on('wpcf7mailsent', function() {
    window.location.href = '/success';
  });


  // Якоря дефолтный скролл
  $(window).on('click', function(e) {
    const el = e.target.closest('a[href^="#"]');
    if (el) {
      e.preventDefault();
      const headerElement = $('header');
      const targetId = el.getAttribute('href').substring(1);
      const isMobile = innerWidth <= 768
      const targetElement = targetId == 'footer'
        ? $('#footer')
        : innerWidth > 768
          ? $('#' + targetId)
          : $('#' + targetId + '.mobile');

      if (targetElement) {
        const scrollTop = targetElement.offset().top - headerElement.height();
        $([document.documentElement, document.body]).animate({ scrollTop, easing: 'linear' }, 500);
      }

      $(".menu-burger").click();
    }
  });


  // Smooth Scrollbar (https://idiotwu.github.io/smooth-scrollbar/)
  if (window.Scrollbar) {
    
    var scrollbar = false;
    var isScrollbarListener = false;

    function scrollbarInit() {
      const header = $(".header");
      const page = document.querySelector('.smooth-scrollbar');

      if (innerWidth > 768) {
        page.style.position = 'fixed';
        scrollbar = Scrollbar.init(page);
        if (!isScrollbarListener) {
          scrollbar.addListener((status) => {
            if (scrollbar.scrollTop > 30) {
              header.addClass('visible');
            } else {
              header.removeClass('visible');
            }
          });
          isScrollbarListener = true
        }
      } else {
        page.style.position = 'static';
        Scrollbar.destroy(page);
        scrollbar = false;
        isScrollbarListener = false;
      }
    }
    scrollbarInit();
    $(window).on('load resize', scrollbarInit);

    $(window).on('click', function(e) {
      const el = e.target.closest('a[href^="#"]');
      if (el && scrollbar) {
        e.preventDefault();
        const headerElement = $('header');
        const targetId = el.getAttribute('href').substring(1);
        const targetElement = targetId == 'footer'
          ? $('#footer')
          : innerWidth > 768
            ? $('#' + targetId)
            : $('#' + targetId + '.mobile');
  
        if (targetElement) {
          const scrollTop = targetElement.get(0).offsetTop - headerElement.height();
          scrollbar.scrollTo(0, scrollTop, 500)
        }
      }
    });  
  }
});
