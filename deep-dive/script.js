// 参考：https://www.youtube.com/watch?v=uCH1ta5OUHw
let canvas;
let ctx;
let flowField;
let flowFieldAnimation;

window.onload = function () {
  canvas = document.getElementById("canvas1");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
  flowField.animate(0);
};

window.addEventListener("resize", function () {
  // resize前のanimationを終了する
  this.cancelAnimationFrame(flowFieldAnimation);

  // resize後のアニメーション
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
  flowField.animate(0);
});

const mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", function (event) {
  console.log(event);
  mouse.x = event.x;
  mouse.y = event.y;
});

// カプセル化してプログラムの依存性を低く保つ
class FlowFieldEffect {
  // privete な変数として, # を最初につける。class内でグローバル変数を使うことは避けよう！
  #ctx;
  #width;
  #height;
  constructor(ctx, width, height) {
    this.#ctx = ctx;
    this.#ctx.strokeStyle = "white";
    this.#ctx.lineWidth = 3;
    this.#width = width;
    this.#height = height;
    this.lastTime = 0;
    this.interval = 100;
    this.timer = 0;
    // csll sizeが小さすぎるとコンピュータに負荷がかかるので注意
    this.cellSize = 15;
    this.gradient;
    this.#createGradient();
    this.#ctx.strokeStyle = this.gradient;
    this.radius = 5;
    this.vr = 0.03;
  }

  #createGradient() {
    this.gradient = this.#ctx.createLinearGradient(
      0,
      0,
      this.#width,
      this.#height
    );
    this.gradient.addColorStop("0.1", "#ff5c33");
    this.gradient.addColorStop("0.2", "#ff66b3");
    this.gradient.addColorStop("0.4", "#ccccff");
    this.gradient.addColorStop("0.6", "#b3ffff");
    this.gradient.addColorStop("0.8", "#80ff80");
    this.gradient.addColorStop("0.9", "#ffff33");
  }

  #drawLine(angle, x, y) {
    let positionX = x;
    let positionY = y;
    let dx = mouse.x - positionX;
    let dy = mouse.y - positionY;

    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 500000) distance = 500000;
    else if (distance < 10000) distance = 10000;

    let length = distance / 1000;
    this.#ctx.beginPath();
    this.#ctx.moveTo(x, y);
    this.#ctx.lineTo(
      x + Math.cos(angle) * length,
      y + Math.cos(angle) * length
    );
    // this.#ctx.lineTo(x + angle * 20, y + angle * 20);
    this.#ctx.stroke();
  }

  animate(timeStamp) {
    const deltaTime = timeStamp - this.lastTime;
    this.lastTime = timeStamp;

    if (this.timer > this.interval) {
      this.#ctx.clearRect(0, 0, this.#width, this.#height);
      this.radius += this.vr;

      if (this.radius > 5 || this.radius < -5) this.vr *= -1;

      for (let y = 0; y < this.#height; y += this.cellSize) {
        for (let x = 0; x < this.#width; x += this.cellSize) {
          const angle = (Math.cos(x * 0.01) + Math.sin(y * 0.01)) * this.radius;
          this.#drawLine(angle, x, y);
        }
      }

      this.#drawLine(this.#width / 2, this.#height / 2);
      this.timer = 0;
    } else {
      this.timer += deltaTime;
    }

    flowFieldAnimation = requestAnimationFrame(this.animate.bind(this));

    // 以下のようにbindなしですると、2回目以降のループで、javascriptが this が何を意味しているのかを忘れてしまうので、bindする必要がある
    // bind は、this が何を意味しているのかを示す役割がある
    // requestAnimationFrame(this.animate);
  }
}
