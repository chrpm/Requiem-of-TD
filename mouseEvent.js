canvas.addEventListener("mousedown", getPosition, false);

var towerLocations = {}
function getPosition(event)
{
    var x = event.x;
    var y = event.y;

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    x = Math.floor(x/25);
    y = Math.floor(y/25);
    console.log("x: " + x + " y: " + y);

    if (towerLocations[[x,y]] === undefined) {
        towerLocations[[x,y]] = "tower";
    }
    drawTowers();
}