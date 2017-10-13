var canvas = document.getElementById('game_canvas');
var context = canvas.getContext('2d');

var initialPosition = [0,1];
var path = [['r', 17],['d', 4],['l', 15],['d', 4],['r', 10],['d', 12]];
bricks = new Image();
function drawPath() { 
    x = initialPosition[0];
    y = initialPosition[1];
    context.drawImage(bricks, x*25, y*25);

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
             context.drawImage(bricks, x*25, y*25);
        }
    }
}
bricks.src = "images/bricks.png";

function drawTowers() {
    var centerX;
    var centerY;
    var radius = 8;

    for(var location in towerLocations) {
        console.log(location);
        centerX = location[0]*25 + radius;
        centerY = location[1]*25 + radius;
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'green';
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = '#003300';
        context.stroke();
    }
}
