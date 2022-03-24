// 参考：https://www.youtube.com/watch?v=XGioNBHrFU4

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];

// handle mouse
const mouse = {
  x: undefined,
  y: undefined,
  radius: 150,
};

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});
window.addEventListener("touchstart", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});
window.addEventListener("touchend", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});
window.addEventListener("touchmove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

ctx.fillStyle = "white";
ctx.font = "30px Verdana";
ctx.fillText("A", 202, 20);
ctx.strokeRect(0, 0, 100, 100);
const data = ctx.getImageData(0, 0, 100, 100);

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 3;
    // x, yは変化する値なので、基準となる値を最初にbaseとして保持しておく
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1;
  }

  darw() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    // マウスからの位置を算出
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    const forceDirectionX = dx / distance;
    const forceDirectionY = dy / distance;
    if (distance < 300) {
      this.x += forceDirectionX * 3;
      this.y += forceDirectionY * 3;
    } else {
      //   this.size = 3;
    }
  }
}

function init() {
  particleArray = [];
  for (let i = 0; i < 700; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    particleArray.push(new Particle(x, y));
  }
}
init();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].darw();
    particleArray[i].update();
  }
  requestAnimationFrame(animate);
}
animate();
