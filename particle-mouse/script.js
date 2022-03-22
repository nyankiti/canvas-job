// 参考：https://www.youtube.com/watch?v=Yvz_axxWG4Y

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const particleArray = [];
let hue = 0;

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
  for (let i = 0; i < 10; i++) {
    particleArray.push(new Particle());
  }
});

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 10; i++) {
    particleArray.push(new Particle());
  }
});

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 15 + 1; // Math.random()は0~1のランダムな小数を返す
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = "hsl(" + hue + ", 100%, 50%)";
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    // 球を徐々に小さくしていくアニメーション
    if (this.size > 0.2) this.size -= 0.1;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticle() {
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();
    if (particleArray[i].size <= 0.3) {
      particleArray.splice(i, 1);
      console.log(particleArray.length);
      // 配列からparticleを消去することでずれたindexを戻す
      i--;
    }
  }
}

function animate() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0,0.02)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticle();
  hue++;
  requestAnimationFrame(animate);
}
animate();
