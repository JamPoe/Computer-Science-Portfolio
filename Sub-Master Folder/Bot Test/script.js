var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var foodAmount = 0;
c.width = 600;
c.height = 600;

var box = {
    x: 300,
    y: 300,
    draw: function() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, 20, 20);
        ctx.fill();
    },
    move: function() {
        if(foodAmount <= 0) {
            var rand = Math.random();
            if(rand <= .25) {
                this.x += 5;
            }
            if(rand <= .5 && rand > .25) {
                this.x -= 5;
            }
            if(rand <= .75 && rand > .5) {
                this.y += 5;
            }
            if(rand <= 1 && rand > .75) {
                this.y -= 5;
            }
            if(this.x < 0) {
                this.x = 0;
            }
            if(this.x > 580) {
                this.x = 580;
            }
            if(this.y < 0) {
                this.y = 0;
            }
            if(this.y > 580) {
                this.y = 580;
            }
        }
        if(foodAmount >= 1) {
            var difX = -1 * (box.x - food.x);
            var difY = -1 * (box.y - food.y);
            if(difX > 0) {
                box.x += 1;
            }
            if(difX < 0) {
                box.x -= 1;
            }
            if(difY > 0) {
                box.y += 1;
            }
            if(difY < 0) {
                box.y -= 1;
            }
            if(box.x === food.x && box.y === food.y) {
            }
        }
    },
}

function animate() {
    ctx.clearRect(0, 0, c.width, c.height);
    box.move();
    box.draw();
}

setInterval(animate, 30);

document.addEventListener("click", createFood);
document.onmousemove = function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
}

function createFood() {
    var food = {
        x: mouseX,
        y: mouseY,
        draw: function() {
            ctx.fillStyle = "lightgreen";
            ctx.fillRect(this.x, this.y, 10, 10);
            ctx.fill();
        },
    }
    function foodLoop() {
        food.draw();
    }
    setInterval(foodLoop, 0);
}
