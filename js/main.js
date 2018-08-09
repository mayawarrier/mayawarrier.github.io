
var panelIndex = 1;
var panelsShowing = false;

function togglePanels()
{
    if (!panelsShowing) {
        panelsShowing = true;
        $(".textPanel").css({ "opacity": "0.01", "display": "block" });
        document.querySelector("#panel2").scrollIntoView({ behavior: 'smooth' });
        animateFadeIn();
    }
}

function animateFadeIn() {

    var timeBetweenFadeIns = 300;
    var timeToFadeIn = 400;

    setTimeout(() => {
        $("#panel" + panelIndex).animate({ "opacity": "1" }, timeToFadeIn, () => {
            panelIndex++;
            animateFadeIn();
        });
    }, timeBetweenFadeIns);
}