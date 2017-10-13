var canvas = document.getElementById('game_canvas');
var context = canvas.getContext('2d');
var damage = $(".selectedTower").attr("data-damage");
var towerColor = $(".selectedTower").attr("data-color");

var initialPosition = [0,1];
var pathLocations = [];
var enemyTargets = [];

function populatePath() { 
    var path = [['r', 17],['d', 4],['l', 15],['d', 11],['r', 12],['u', 8], ['l', 5], ['d', 12]];
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

function drawStats() {
    $('#money').text(Math.floor(money));
    $('#score').text(Math.floor(score));
    $('#health').text(Math.floor(playerHealth));
}

function drawWave() {
    $('#waveNumber').text(wave);
}

function drawTowerButtons() {
    let container = $('#towerButtons');
    $(container).empty();
    for (let [i, [name, [cost, range, attack, color]]] of towerTypes.entries()) {
	let b = $("<button>", {
	    "class": `button towerButton${i == 0 ? ' selectedTower' : ''}`,
	    "value": i,
	    "style": `background-color: ${color}`,
	}).text(`${name} - ${cost}`);
	
	$(container).append(b);
    }
}

$(document).ready(function() {
    populatePath();
    resetGame();
    drawTowerButtons();
    drawStats();
    update_scores();

    $(".towerButton").on('click', function() {
	$(".selectedTower").removeClass("selectedTower");
	$(this).addClass("selectedTower");
    })

    $("#startBtn").on('click', function() {
	$(this).hide();
	$("#resetBtn").show();
	startGame();
    })

    $("#resetBtn").on('click', function() {
	$(this).hide();
	$("#startBtn").show();
	resetGame();
    })
});

