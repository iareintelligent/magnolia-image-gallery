var calculateAspectRatio = function calculateAspectRatio($image) {
    var ratio = $image.width() / $image.height();
    return ratio > 0 ? ratio : 1;
};

var reRatio = function reRatio() {
    console.log("1");
    $(".image-gallery").each(function() {
        var ratio = calculateAspectRatio($(this).children("img"));
        $(this).css("flex-grow", ratio);
    });
};
var resizeTheSlider = function resizeTheSlider(slider) {
    $(slider).resize();
    $(slider)[0].slick.setPosition();
};
$(".slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true
});
$("#imgDropdown").on("shown.bs.collapse", function(e) {
    console.log("firing");
    resizeTheSlider(".slider");
    $("#bg-fader").addClass("down");
});

$("imgDropdown").on("hidden.bs.collapse", function(e) {
    $("#bg-fader").removeClass("down");
});

$(".click-close").on("click", function() {
    $("#imgDropdown").collapse("hide");
});
$(".click-left").on("click", function() {
    $(".slider").slick("slickPrev");
});
$(".click-right").on("click", function() {
    $(".slider").slick("slickNext");
});

$(window).on("load", function() {
    reRatio();
});
$(".image-gallery img").on("click", function() {
    $("#imgDropdown").collapse("show");
    $(".slider").slick("slickGoTo", $(this).data("index"), true);
});
