$(document).ready(function () {
    $('.carousel__inner').slick({
        adaptiveHeight: true,
        autoplay: false,
        autoplaySpeed: 5000,
        draggable: false,
        speed: 700,
        prevArrow: '<button type="button" class="carousel__arrow-prev"><img src="../img/catalog/slider/carousel_arrow_left.png" alt="slide"></button>',
        nextArrow: '<button type="button" class="carousel__arrow-next"><img src="../img/catalog/slider/carousel_arrow_right.png" alt="slide"></button>',
        dotsClass: 'carousel__dots',
        variableWidth: true,
        responsive: [{
            breakpoint: 992,
            settings: {
                dots: true,
                arrows: false,
                swipe: true
            }
        }]

    });

    //Tabs of the catalog

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    //Catalog links

    $('.catalog-item__link').each(function (i) {
        $(this).on('click', function (e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__content-list').eq(i).toggleClass('list_active');
        });
    });

    $('.catalog-item__back').each(function (i) {
        $(this).on('click', function (e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__content-list').eq(i).toggleClass('list_active');
        });
    });

    //Modal

    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('fast');
    });

    $('.button-min').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__title').eq(i).text());
            $('.overlay, #order').fadeIn('fast');
        });
    });

    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #notification').fadeOut('fast');
    });

    //arrow-up scroll
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1160) {
            $('.pageup').addClass('pageup_active');
        } else {
            $('.pageup').removeClass('pageup_active');
        }

    });


    //validation

    validateForm('#section-form form');
    validateForm('#order form');
    validateForm('#consultation form');

    //validation function

    function validateForm(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },

                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Неверно введено имя",
                phone: "Неверно введен номер",
                email: {
                    required: "Неверно введен email",
                    email: "Пожалуйста, введите корректый Email"
                }
            }
        });
    }

    $('input[name="phone"]').mask("+38 (999) 999-9999");

    //mail sender

    $('form').submit(function (e) {
        e.preventDefault();

        //validation check

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "../mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('form').trigger('reset');
            $('#consultation, #order').fadeOut();
            $('#notification').fadeIn('fast');
        });

        return false;
    });
});