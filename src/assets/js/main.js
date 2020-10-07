$(document).on("readystatechange", () => {
    if (document.readyState === "interactive" && $(window).width() <= 900) {
        $(".header__buttons").appendTo($(".menu__desktop"))
    }
})
$(window).on("load", () => {
    // ----------------------------------------------
    // universal function
    function toggleModal() {
        $(".modal").toggleClass("modal--active")
        $(".modal-overlay").toggleClass("modal-overlay--active")
        if ($(".modal-overlay").hasClass("modal-overlay--active"))
            $(".modal__content-video").trigger("play")
        else $(".modal__content-video").trigger("pause")
    }
    //  /universal function
    // ----------------------------------------------
    // event
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
})
