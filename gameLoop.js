var FPS = 30;
var gameInterval, towers, enemies, money, score, enemyStartX, enemyStartY, spawnInt, towerLocations;

var enemyDist = [
    [0.5, [25, 5, 5, 'green', 7, 10, 20]],
    [0.9, [75, 10, 3, 'blue', 15, 50, 100]],
];

var towerTypes = [
    ['Lightning', [50, 100, 0.2, 'blue']],
    ['Fire', [200, 50, 1, 'red']],
];

function addTower(x, y) {
    let ti = parseInt($('.selectedTower').val());
    let [tName, [tCost, tRange, tAttack, tColor]] = towerTypes[ti];

    if (money >= tCost) {
	money -= tCost;
	drawMoney();
	
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
}

function spawnEnemies() {
    for (let [secs, [health, atk, speed, color, width, money, sValue]] of enemyDist) {
	spawnInt.push(setInterval(function() {
	    enemies.push(new Enemy(
		context,
		enemyStartX,
		enemyStartY,
		health,
		atk,
		speed,
		color,
		width,
		money,
		sValue
	    ));
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

    money = 200;
    score = 0;

    enemyStartX = 0;
    enemyStartY = 37.5;
    spawnInt = [];

    towerLocations = [];

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawPath();

    clearInterval(gameInterval);

    for (let i of spawnInt) {
	clearInterval(i);
    }
    drawMoney();
}

function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
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
	    money += e.moneyValue;
	    drawMoney();
	    enemies.splice(i, 1);
	} else {
	    e.move();
	    e.draw();
	}
    }
}
