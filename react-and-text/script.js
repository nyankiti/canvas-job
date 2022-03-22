const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// fillRect(x, y, width, height)
ctx.fillStyle = "red";
ctx.fillRect(20, 20, 150, 100);

ctx.fillStyle = "blue";
ctx.fillRect(200, 20, 150, 100);

// strokeRect(x, y, width, height)
ctx.lineWidth = 5;
ctx.strokeStyle = "green";
ctx.strokeRect(100, 200, 150, 100);

// clearRect(x, y, width, height)
ctx.clearRect(25, 25, 140, 90);

// fillText(text, x, y)
ctx.font = "30px Arial";
ctx.fillStyle = "purple";
ctx.fillText("Hello World", 400, 50);

// strokeText(text, x, y)
ctx.lineWidth = 1;
ctx.strokeStyle = "orange";
ctx.strokeText("Hello World", 400, 100);
