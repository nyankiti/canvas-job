// https://web-dev.tech/front-end/javascript/cherry-blossom-petal-falling-effect/　にある発想で桜を描画する
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let sakuraArray = [];

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

// 桜の花びら
// ctx.beginPath();
// ctx.moveTo(100, 100);
// ctx.quadraticCurveTo(150, 150, 200, 100);
// ctx.quadraticCurveTo(150, 50, 100, 100);

// ctx.quadraticCurveTo(
//   rotate15(100, 100, 150, 150)[0],
//   rotate15(100, 100, 150, 150)[1],
//   rotate15(100, 100, 200, 100)[0],
//   rotate15(100, 100, 200, 100)[1]
// );
// ctx.quadraticCurveTo(
//   rotate15(100, 100, 150, 50)[0],
//   rotate15(100, 100, 150, 50)[1],
//   rotate15(100, 100, 100, 100)[0],
//   rotate15(100, 100, 100, 100)[1]
// );
// ctx.fillStyle = "pink";
// ctx.fill();

class Sakura {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 15;
    // x, yは変化する値なので、基準となる値を最初にbaseとして保持しておく
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1;
  }

  darw() {
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
    ctx.fillStyle = "pink";
    ctx.fill();
  }
}

function init() {
  sakuraArray = [];
  for (let i = 0; i < 700; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    sakuraArray.push(new Sakura(x, y));
  }
}
init();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < sakuraArray.length; i++) {
    sakuraArray[i].darw();
    //   sakuraArray[i].update();
  }
  //   requestAnimationFrame(animate);
}
animate();
