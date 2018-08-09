
var panelIndex = 1;
var panelsShowing = false;
var timeBetweenFadeIns = 300;
var timeToFadeIn = 400;

$(window).on('resize scroll', function () {
    if (isInViewport("#resume") && panelsShowing) {
        $("#resume").animate({ "opacity": "1" }, 800);
    }
});

function togglePanels()
{
    if (!panelsShowing) {
        panelsShowing = true;
        $(".textPanel").css({ "opacity": "0.01", "display": "block" });
        document.querySelector("#panel2").scrollIntoView({ behavior: 'smooth' });
        animatePanelsFadeIn();
        $("#resume").css({ "opacity": "0.01", "display": "block" });
    }
}

function animatePanelsFadeIn()
{
    setTimeout(() => {
        $("#panel" + panelIndex).animate({ "opacity": "1" }, timeToFadeIn, function () {
            panelIndex++;
            animatePanelsFadeIn();
        });
    }, timeBetweenFadeIns);
}

function isInViewport(element) {
    var elementTop = $(element).offset().top;
    var elementBottom = elementTop + $(element).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
}