/*
以下のサイトを参考にリファクタリングしたもの
https://www.otwo.jp/blog/canvas_sakura/
*/

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

const sakuraArray = [];
const rad = Math.PI / 180;

const img = new Image();
img.src = "http://www.otwo.jp/blog/demo/canvas/images/web/sakura.png";
img.onload = animate;

const imgBaseSizeW = 15;
const imgBaseSizeH = 18.5;
const speedMax = 1.7;
const speedMin = 0.5;
const wind = 10;
const aspectMax = 1.3;
const aspectMin = 0.5;

class Sakura {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.aspect = Math.random() * (aspectMax - aspectMin) + aspectMin; //画像サイズに掛けるアスペクト比を0.5~1.5倍でランダムで生成
    this.width = imgBaseSizeW * this.aspect;
    this.height = imgBaseSizeH * this.aspect;
    this.speedy = Math.random() * (speedMax - speedMin) * speedMin;
    this.dtheta = Math.random() * 360; // 角度の微小変化
    this.cos;
    this.sin;
  }

  update(id) {
    this.x += wind / this.width;
    this.y += this.speedy;
    id % 2 ? (this.dtheta += 1) : (this.dtheta -= 1);
    this.cos = Math.cos(this.dtheta * rad);
    this.sin = Math.sin(this.dtheta * rad);
  }

  draw() {
    ctx.setTransform(this.cos, this.sin, this.sin, this.cos, this.x, this.y); // 回転行列によって回転させる
    ctx.drawImage(img, 0, 0, this.width, this.height);
    ctx.setTransform(1, 0, 0, 1, 0, 0); // scale(1,1)と同じことを回転行列を用いてやっている
    // はみ出し判定
    if (this.y >= canvas.height) {
      this.y = -this.height;
    }
    if (this.x >= canvas.width) {
      this.x = -this.width;
    }
  }
}

function init() {
  for (let i = 0; i < 20; i++) {
    sakuraArray.push(new Sakura());
  }
}

init();

function handleParticle() {
  for (let i = 0; i < sakuraArray.length; i++) {
    sakuraArray[i].update(i);
    sakuraArray[i].draw();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticle();
  requestAnimationFrame(animate);
}
