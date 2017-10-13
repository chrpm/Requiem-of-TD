var FPS = 30;
var gameInterval;
var towers = [];
var enemies = [];
var money = 200;

var enemyStartX = 0;
var enemyStartY = 37.5;
var enemyDist = [
    [0.5, [25, 5, 5, 'green', 7]],
    [0.9, [75, 10, 3, 'blue', 15]],
];
var spawnInt = [];

var towerLocations = [];
var towerTypes = [
    ['Lightning', [50, 100, 0.2, 'blue']],
    ['Fire', [200, 50, 1, 'red']],
];

function addTower(x, y) {
    let ti = parseInt($('.selectedTower').val());
    console.log(ti);
    console.log(towerTypes[ti]);
    let [tName, [tCost, tRange, tAttack, tColor]] = towerTypes[ti];
    
    towerLocations.push([x, y]);
    towers.push(new Tower(
	context,
	x*25+12,
	y*25+12,
	tRange,
	tAttack,
	tColor,
    ));
}

function spawnEnemies() {
    for (let [secs, [health, atk, speed, color, width]] of enemyDist) {
	spawnInt.push(setInterval(function() {
	    enemies.push(new Enemy(context, enemyStartX, enemyStartY, health, atk, speed, color, width));
	}, secs*1000));
    }
}

function startGame() {
    spawnEnemies();
    gameInterval = setInterval(gameLoop, 1000/FPS);
}

function resetGame() {
    towers = [];
    enemies = [];
    towerLocations = [];
    context.fillStyle = "white";
    context.fillRect(0,0,canvas.width,canvas.height);
    drawPath();

    clearInterval(gameInterval);

    for (let i of spawnInt) {
	clearInterval(i);
    }
}

function gameLoop() {
    context.fillStyle = "white";
    context.fillRect(0,0,canvas.width,canvas.height);
    drawPath();
    for (let tower of towers) {
	tower.draw();
	for (let e of enemies) {
	    if (tower.targetInRange(e)) {
		tower.fire(e);
	    }
	}
    }

    let i = enemies.length;
    while (i--) {
	let e = enemies[i];
	
	if (e.isDead()) {
	    enemies.splice(i, 1);
	} else {
	    e.move();
	    e.draw();
	}
    }
}
