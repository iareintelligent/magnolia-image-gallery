var calculateAspectRatio = function calculateAspectRatio($image) {
    return $image.width() / $image.height();
};

$(".image-gallery").each(function() {
    var ratio = calculateAspectRatio($(this).children("img"));
    $(this).css("flex-grow", ratio);
});
$(".slider-for").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    adaptiveHeight: true,
    asNavFor: ".slider-nav"
});
$(".slider-nav").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    dots: false,
    centerMode: true,
    focusOnSelect: true
});
$("#imageModal").on("shown.bs.modal", function(e) {
    $(".slider-for, .slider-nav").resize();
    $(".slider-for, .slider-nav")[0].slick.setPosition();
});
