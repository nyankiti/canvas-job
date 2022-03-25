// 参考：https://www.youtube.com/watch?v=XGioNBHrFU4

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let sakuraArray = [];

let adjustX = 10;
let adjustY = 20;

const rad = Math.PI / 180;
const speedMax = 1.7;
const speedMin = 0.5;
const wind = 10;
const aspectMax = 1.3;
const aspectMin = 0.5;

// handle mouse
const mouse = {
  x: undefined,
  y: undefined,
  radius: 50,
};

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});
window.addEventListener("touchstart", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
window.addEventListener("touchend", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientT;
});
window.addEventListener("touchmove", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

ctx.fillStyle = "white";
ctx.font = "30px Verdana";
ctx.fillText("Gift Innovation 合同会社", 0, 30);
ctx.strokeRect(0, 0, 100, 100);
// 上で描画したテキストを座標のデータとして取得。後で、articleを描画する際に用いる
const textCoordinates = ctx.getImageData(0, 0, 360, 100);

const cos15 = Math.cos((Math.PI * 15) / 180);
const sin15 = Math.sin((Math.PI * 15) / 180);

function rotate15(baseX, baseY, x, y) {
  let new_x = x - baseX;
  let new_y = y - baseY;
  new_x = new_x * cos15 - new_y * sin15;
  new_y = new_x * sin15 + new_y * cos15;
  new_x = new_x + baseX;
  new_y = new_y + baseY;
  return [new_x, new_y];
}

class Sakura {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 8;
    // x, yは変化する値なので、基準となる値を最初にbaseとして保持しておく
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1;
    // 桜を靡かせるためのパラメータ
    this.cos;
    this.sin;
    this.dtheta = Math.random() * 360;
    this.speedy = Math.random() * (speedMax - speedMin) * speedMin;
  }

  darw() {
    // ctx.setTransform(this.cos, this.sin, this.sin, this.cos, this.x, this.y); // 回転行列によって回転させる

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.quadraticCurveTo(
      this.x + this.size / 2,
      this.y + this.size / 2,
      this.x + this.size,
      this.y
    );
    ctx.quadraticCurveTo(
      this.x + this.size / 2,
      this.y - this.size / 2,
      this.x,
      this.y
    );

    ctx.quadraticCurveTo(
      rotate15(
        this.x,
        this.y,
        this.x + this.size / 2,
        this.y + this.size / 2
      )[0],
      rotate15(
        this.x,
        this.y,
        this.x + this.size / 2,
        this.y + this.size / 2
      )[1],
      rotate15(this.x, this.y, this.x + this.size, this.y)[0],
      rotate15(this.x, this.y, this.x + this.size, this.y)[1]
    );
    ctx.quadraticCurveTo(
      rotate15(
        this.x,
        this.y,
        this.x + this.size / 2,
        this.y - this.size / 2
      )[0],
      rotate15(
        this.x,
        this.y,
        this.x + this.size / 2,
        this.y - this.size / 2
      )[1],
      this.x,
      this.y
    );
    // ctx.setTransform(1, 0, 0, 1, 0, 0); // scale(1,1)と同じことを回転行列を用いてやっている

    ctx.fillStyle = "pink";
    ctx.fill();
  }
  update(index) {
    // 桜を靡かせる処理
    index % 2 ? (this.dtheta += 1) : (this.dtheta -= 1);
    this.cos = Math.cos(this.dtheta * rad);
    this.sin = Math.sin(this.dtheta * rad);

    // マウスからの位置を算出
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }
  }
}
/*
textCoordinatesの扱いについては、参考動画の40分くらいの説明を見よう。
取得した座標の色のRGBの値(0~255の数値)を大量の配列によって表現した Unit8ClampedArrayとなっている？？ <= たぶん嘘
*/
function init() {
  sakuraArray = [];
  for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
    for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
      // 画像ないの、opacityが0.5以上の点でparticleを描画する
      if (
        textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] > 128
      ) {
        let positionX = x + adjustX;
        let positionY = y + adjustY;
        // 文字を大きくするため、座標に10をかける
        sakuraArray.push(new Sakura(positionX * 3, positionY * 3));
      }
    }
  }
}
init();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < sakuraArray.length; i++) {
    sakuraArray[i].darw();
    sakuraArray[i].update(i);
  }
  //   connectのコメントをとると、幾何学的なアニメーションになる
  //   connect();
  requestAnimationFrame(animate);
}
animate();

// function connect() {
//   let opacityValue = 1;
//   for (let a = 0; a < particleArray.length; a++) {
//     for (let b = a; b < particleArray.length; b++) {
//       let dx = particleArray[a].x - particleArray[b].x;
//       let dy = particleArray[a].y - particleArray[b].y;
//       let distance = Math.sqrt(dx * dx + dy * dy);
//       if (distance < 50) {
//         opacityValue = 1 - distance / 50;
//         ctx.strokeStyle = "rgba(255,255,255," + opacityValue + ")";
//         ctx.lineWidth = 2;
//         ctx.beginPath();
//         ctx.moveTo(particleArray[a].x, particleArray[a].y);
//         ctx.lineTo(particleArray[b].x, particleArray[b].y);
//         ctx.stroke();
//       }
//     }
//   }
// }
