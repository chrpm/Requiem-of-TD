// class Projectile {
//     constructor(ctx, x, y, target, damage = 10, speed = 5, color = 'red') {
// 	this.ctx = ctx;
// 	this.x = x;
// 	this.y = y;
// 	this.target = target;
// 	this.damage = damage;
// 	this.speed = speed;
// 	this.color = color;

// 	this.radius = 3;
//     }

//     move() {
// 	xdist = target.x - this.x;
// 	ydist = target.y - this.y;
// 	theta = Math.atan(xdist/ydist);

// 	dx = Math.sin(theta)*xdist;
// 	dy = Math.sin(theta)*ydist;
// 	console.log(dx, dy);
//     }
    
//     draw() {
// 	this.ctx.beginPath();
// 	this.ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
// 	this.ctx.fillStyle = this.color;
// 	this.ctx.fill();
//     }
// }

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
	dx = target.x - this.x;
	dy = target.y - this.y;
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
	this.draw();
    }

    move() {}
    
    draw() {
	this.ctx.fillStyle = this.color;
	this.ctx.fillRect(x, y, width, width);
    }
}
