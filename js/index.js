var calculateAspectRatio = function calculateAspectRatio($image) {
    var ratio = $image.width() / $image.height();
    return ratio > 0 ? ratio : 1;
};

var reRatio = function reRatio() {
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

// because:
// .position-absolute { position: absolute; }
// .cover { top: 0; right: 0: left: 0; }
// .down { bottom: 0; }
$("#imgDropdown").on("shown.bs.collapse", function(e) {
    resizeTheSlider(".slider");
    $("#bg-fader").addClass("down");
});

$("#imgDropdown").on("hidden.bs.collapse", function(e) {
    $("#bg-fader").removeClass("down");
});

$(".click-icon-close").on("click", function() {
    $("#imgDropdown").collapse("hide");
});

$(".click-icon-left").on("click", function() {
    $(".slider").slick("slickPrev");
});

$(".click-icon-right").on("click", function() {
    $(".slider").slick("slickNext");
});

$(window).on("load", function() {
    reRatio();
});

$(".image-gallery img").on("click", function() {
    $("#imgDropdown").collapse("show");
    $(".slider").slick("slickGoTo", $(this).data("index"), true);
});

function is_touch_device() {
    var prefixes = " -webkit- -moz- -o- -ms- ".split(" ");
    var mq = function(query) {
        return window.matchMedia(query).matches;
    };

    if (
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof DocumentTouch)
    ) {
        return true;
    }

    // include the 'heartz' as a way to have a non matching MQ to help terminate the join
    // https://git.io/vznFH
    var query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join(
        ""
    );
    return mq(query);
}

if (is_touch_device()) {
    $("#click-zone").hide();
}
