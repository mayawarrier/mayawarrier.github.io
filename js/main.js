
var panelIndex = 1;
var panelsShowing = false;
var timeBetweenFadeIns = 300;
var timeToFadeIn = 400;

$(window).on('resize scroll', function () {
    if (isInViewport("#resume") && panelsShowing) {
        $("#resume").animate({ "opacity": "1" }, 1500);
    }
});

function togglePanels()
{
    if (!panelsShowing) {
        panelsShowing = true;
        // remove vertical centering so that the panels scroll into view normally
        $("#main-container").css({ "position": "unset", "transform": "none" });
        // remove display: none from panels so that we scroll to the center while the panels fade into view
        $(".text-panel").css({ "opacity": "0.01", "display": "block" });
        // scroll to the center of the panels
        document.querySelector("#panel2").scrollIntoView({ behavior: 'smooth' });
        // fade in the panels
        animatePanelsFadeIn();
        // remove display: none from the resume link so it can fade in when in viewport
        $("#resume").css({ "opacity": "0.01", "display": "block" });
    }
}

function animatePanelsFadeIn()
{
    setTimeout(function() {
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