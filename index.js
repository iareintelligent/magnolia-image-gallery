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
$("#imgDropdown").on("shown.bs.collapse", function(e) {
    $(".slider-for").resize();
    $(".slider-for")[0].slick.setPosition();
});
