var calculateAspectRatio = function calculateAspectRatio($image) {
    return $image.width() / $image.height();
};

$(".image-gallery").each(function() {
    var ratio = calculateAspectRatio($(this).children("img"));
    $(this).css("flex-grow", ratio);
});
