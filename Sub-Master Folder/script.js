var span = document.getElementById("span");
span.style.transition = "1s";

function init() {
    span.style.color = "yellow";
}

setInterval(init, 1000);
