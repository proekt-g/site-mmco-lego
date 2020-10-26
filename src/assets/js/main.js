$(document).on("readystatechange", () => {
    if (document.readyState === "interactive" && $(window).width() <= 900) {
        $(".header__buttons").appendTo($(".menu__desktop"))
    }
})
$(window).on("load", () => {
    let rightAnswer = 0
    // ----------------------------------------------
    // universal function
    function toggleModal() {
        $(".modal").toggleClass("modal--active")
        $(".modal-overlay").toggleClass("modal-overlay--active")
        if ($(".modal-overlay").hasClass("modal-overlay--active"))
            $(".modal__content-video").trigger("play")
        else $(".modal__content-video").trigger("pause")
    }
    function removeDisableButton() {
        $(this)
            .parents(".test__slide")
            .find(".slide-button--disable")
            .removeClass("slide-button--disable")
    }
    //  /universal function
    // ----------------------------------------------
    // event
    $(".test__slide-answer").on("click", function () {
        if (!$(this).hasClass("test__slide-answer--open"))
            removeDisableButton.bind(this)()
        else
            $(this)
                .parents(".test__slide")
                .find(".slide-button--next")
                .addClass("slide-button--disable")
    })
    $(".slide-button--next").on("click", () => {
        let buffRightAnswer = 0
        $("input[type=radio]:not(.switch):checked").each(function () {
            if ($(this).data("right")) buffRightAnswer++
        })
        rightAnswer = buffRightAnswer
    })
    $(".slide-button--last").on("click", () => {
        const SELECTOR_LAST_TITLE = $(".test__slide-title--finish")
        const RESULT_TEST =
            +SELECTOR_LAST_TITLE.data("win-count") <= rightAnswer
                ? "win"
                : "lose"
        SELECTOR_LAST_TITLE.text(
            SELECTOR_LAST_TITLE.data(`${RESULT_TEST}-title`)
                .replace("&&", rightAnswer)
                .replace("||", SELECTOR_LAST_TITLE.data("count"))
        )
        SELECTOR_LAST_TITLE.parents(".test__slide")
            .find(".test__slide-text")
            .text(SELECTOR_LAST_TITLE.data(`${RESULT_TEST}-text`))
        if ($(window).width() >= 700)
            $(".test__slide-finish-picture-img").prop(
                "src",
                SELECTOR_LAST_TITLE.data(`${RESULT_TEST}-img`)
            )
        else {
            $(".test__slide-finish-picture source").prop(
                "srcset",
                SELECTOR_LAST_TITLE.data(`${RESULT_TEST}-img-mobail`)
            )
        }
    })
    $(".test__slide-textarea").on("click", function () {
        $(this)
            .parents(".test__slide-answer")
            .find(".test__slide-input")
            .prop("checked", true)
    })
    $(".test__slide-textarea").on("blur", function () {
        if ($(this).val()) removeDisableButton.bind(this)()
    })
    $(".test__slide-textarea").on("input", function () {
        if ($(this).val()) removeDisableButton.bind(this)()
    })
    $(".slide-button").on("click", (e) => {
        e.preventDefault()
    })
    $(".menu__burger").on("click", () => {
        $(".menu").toggleClass("menu--open")
    })
    $('a[href^="#"]').on("click", function (event) {
        if (String(this).slice(-1) !== "#") {
            event.preventDefault()
            let sc = $(this).attr("href"),
                dn = $(sc).offset().top
            $("html, body").animate({ scrollTop: dn - 100 }, 1000)
        }
    })
    $(".menu__desktop-element").on("click", () => {
        $(".menu").removeClass("menu--open")
    })
    $(".about__placeholder").on("click", toggleModal)
    $(".modal__close").on("click", toggleModal)
    $(".modal-overlay").on("click", (event) => {
        if ($(event.target).hasClass("modal-overlay--active")) toggleModal()
    })
    // /event
    // ----------------------------------------------

    // Tests

    new Swiper(".test__swiper-container", {
        spaceBetween: 48,
        slidesPerView: 1,
        on: {
            sliderMove: function (e) {
                e.preventDefault()
            },
        },
        navigation: {
            nextEl: ".slide-button--next",
            prevEl: ".slide-button--prev",
        },
        breakpoints: {
            // when window width is >= 320px
            701: {
                slidesPerView: "auto",
            },
        },
    })
    // /Tests
})
