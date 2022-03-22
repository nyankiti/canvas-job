// 参考　https://www.youtube.com/watch?v=Yvz_axxWG4Y

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

// canvasのサイズをwindowに合わせて調整する
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// resizeに対応するためには、以下のように、resize時にサイズを調整して再レンダリングするための処理を入れる必要がある
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
  x: undefined, // nullとすると 0 と解釈されてしまう。undefinedだと何とも解釈されない
  y: undefined,
};

window.addEventListener("click", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

function drawCircle() {
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
  ctx.fill();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle();
  requestAnimationFrame(animate);
}
animate();
