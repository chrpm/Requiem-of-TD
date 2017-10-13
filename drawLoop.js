var canvas = document.getElementById('game_canvas');
var context = canvas.getContext('2d');
var damage = $(".selectedTower").attr("data-damage");
var towerColor = $(".selectedTower").attr("data-color");

var initialPosition = [0,1];
var pathLocations = [];
var towerLocations = [];
var enemyTargets = [];
var towers = [];

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
    enemyTargets.push([x*25, y*25]);
  }
}

bricks = new Image();
function drawPath(){
  for (i = 0, len = pathLocations.length; i < len; i++) {
    context.drawImage(bricks, pathLocations[i][0]*25, pathLocations[i][1]*25);
  }
}
bricks.src = "images/bricks.png";

gameLoop = function() {
  context.fillStyle = "white";
  context.fillRect(0,0,canvas.width,canvas.height);
  drawPath();
  for (tower of towers) {
    tower.draw();
  }
  setTimeout(gameLoop, 1000/30);
};

window.onload = function() {
  populatePath();
  context.fillStyle = "white";
  context.fillRect(0,0,canvas.width,canvas.height);
  drawPath();
};

$(".towerButton").on('click', function() {
  $(this).addClass("selectedTower");
  $(".selectedTower").removeClass("selectedTower");
  $(this).addClass("selectedTower");
  damage = $(this).data("data-damage");
  towerColor = $(this).attr("data-color");
})

$("#startBtn").on('click', function() {
  $(this).hide();
  $("#resetBtn").show();
  setTimeout(gameLoop, 1000/30);
})

$("#resetBtn").on('click', function() {
  $(this).hide();
  $("#startBtn").show();
})
