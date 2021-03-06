var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var foodAmount = 0;
var emote = document.getElementById("emote");
c.width = 600;
c.height = 600;

var greeting = ["Hello.", "Hi.", "Oh hey there."];
var concern = ["Please keep your distance.", "Careful there!", "I would like some personal space"];
var anger = ["Piss off!", "Get away from me!", "Back it up!"];

var box = {
    x: 300,
    y: 300,
    draw: function(color) {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, 20, 20);
        ctx.fill();
    },
    move: function() {
        if(foodAmount <= 0) {
            var rand = Math.random();
            if(rand <= .25) {
                this.x += 1;
            }
            if(rand <= .5 && rand > .25) {
                this.x -= 1;
            }
            if(rand <= .75 && rand > .5) {
                this.y += 1;
            }
            if(rand <= 1 && rand > .75) {
                this.y -= 1;
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
    checkMouse();
    box.draw("lightgreen");
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
            ctx.fillStyle = "red";
            ctx.fillRect(this.x, this.y, 10, 10);
            ctx.fill();
        },
    }
    function foodLoop() {
        food.draw();
    }
    setInterval(foodLoop, 0);
}

function checkMouse() {
    if((mouseX - 160) === box.x || (mouseY - 160) === box.y) {
        emote.innerHTML = "Jonathon: " + concern[Math.floor(Math.random() * 3)];
    }
    if((mouseX - 80) === box.x || (mouseY - 80) === box.y) {
        emote.innerHTML = "Jonathon: " + anger[Math.floor(Math.random() * 3)];
    }
}

emote.innerHTML = "Jonathon: " + greeting[Math.floor(Math.random() * 3)];
