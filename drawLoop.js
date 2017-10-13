var canvas = document.getElementById('game_canvas');
var context = canvas.getContext('2d');

var initialPosition = [0,1];
var pathLocations = [];
function populatePath() { 
    var path = [['r', 17],['d', 4],['l', 15],['d', 4],['r', 10],['d', 12]];
    x = initialPosition[0];
    y = initialPosition[1];
    pathLocations.push([x, y]);
    for (i = 0, len = path.length; i < len; i++) { 
        for (j = path[i][1]; j > 0; j--) {
            switch(path[i][0]) {
                case 'l':
                    x--;
                    break;
                case 'r':
                    x++;
                    break;
                case 'd':
                    y++;
                    break;
                case 'u':
                    y--;
             }
             pathLocations.push([x,y]);
        }
    }
    drawPath();
}

bricks = new Image();
function drawPath(){
    for (i = 0, len = pathLocations.length; i < len; i++) {
        context.drawImage(bricks, pathLocations[i][0]*25, pathLocations[i][1]*25);
    }
}
bricks.src = "images/bricks.png";

function drawTowers() {
    var centerX;
    var centerY;
    var radius = 8;

    for(i = 0, len = towerLocations.length; i < len; i++) {
        centerX = towerLocations[i][0]*25 + 13;
        centerY = towerLocations[i][1]*25 + 13;
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'green';
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = '#003300';
        context.stroke();
    }
}
