class Tower {
    constructor(ctx, x, y, range = 5, color = 'blue') {
	this.ctx = ctx;
	this.x = x;
	this.y = y;
	this.range = range;
	this.color = color;
    }
    
    fire(target) {
	this.ctx.beginPath();
	this.ctx.moveTo(this.x, this.y);
	this.ctx.lineTo(target.x, target.y);
	this.ctx.strokeStyle = this.color;
	this.ctx.stroke();
    }

    draw() {
	this.ctx.beginPath();
	this.ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
	this.ctx.fillStyle = this.color;
	this.ctx.fill();
    }

    targetInRange(target) {
	let dx = target.x - this.x;
	let dy = target.y - this.y;
	return Math.sqrt(dx*dx + dy*dy) <= this.range;
    }
}

class Enemy {
    constructor(ctx, x, y, health = 100, atk = 10, speed = 3, color = 'green', width = 5) {
	this.ctx = ctx;
	this.x = x;
	this.y = y;
	this.atk = atk;
	this.health = health;
	this.speed = speed;
	this.color = color;
	this.width = width;

	this.targetIndex = 0;
	
	this.draw();
    }

    nextTarget() {
	if (this.targetIndex + 1 < enemyTargets.length) {
	    this.targetIndex += 1;
	}
    }

    move() {
	let target = enemyTargets[this.targetIndex];
	let tx = target[0];
	let ty = target[1];
	
	let dx = Math.abs(this.x - tx);
	let dy = Math.abs(this.y - ty);
	
	if (dx > 0) {
	    if (dx <= this.speed) {
		this.x = tx;
		this.nextTarget();
	    } else {
		this.x += speed;
	    }
	} else if (dy > 0) {
	    if (dy <= this.speed) {
		this.y = ty;
		this.nextTarget();
	    } else {
		this.y += speed;
	    }
	} else {
	    this.nextTarget();
	}
    }
    
    draw() {
	this.ctx.fillStyle = this.color;
	this.ctx.fillRect(x, y, width, width);
    }
}
