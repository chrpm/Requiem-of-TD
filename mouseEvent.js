canvas.addEventListener("mousedown", getPosition, false);

function getPosition(event)
{
    var x = event.x;
    var y = event.y;

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    x = Math.floor(x/25);
    y = Math.floor(y/25);

    if (isPointTaken(x,y)) {
        return;
    }
    towerLocations.push([x,y]);
    towers.push(new Tower(context, x*25+12, y*25+12));
}

function isPointTaken (x, y) {
    points = pathLocations.concat(towerLocations);
    for(i = 0, len = points.length; i < len; i++) {
        if (points[i][0] == x && points[i][1] == y) {
            return true;
        }
    }
    return false;
}
