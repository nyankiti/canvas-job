// 参考：https://www.youtube.com/watch?v=uCH1ta5OUHw

/*
requestAnimationFrameの描画間隔は自動的にハードウェアに最適化されるので、
intervalとtimerを用いた実装によって、環境に依存されないframe rateを実現できる
この場合、クラス変数のthis.intervalがfps(frame per milli second)となる
*/
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
    this.#ctx.lineWidth = 5;
    this.#width = width;
    this.#height = height;
    this.angle = 0;
    this.lastTime = 0;
    this.interval = 100;
    this.timer = 0;
  }

  #draw(x, y) {
    const length = 300;
    this.#ctx.beginPath();
    this.#ctx.moveTo(x, y);
    this.#ctx.lineTo(mouse.x, mouse.y);
    this.#ctx.stroke();
  }

  animate(timeStamp) {
    const deltaTime = timeStamp - this.lastTime;
    this.lastTime = timeStamp;

    // intervel以上に時間がった時のみ描画する
    if (this.timer > this.interval) {
      this.angle += 0.1;
      this.#ctx.clearRect(0, 0, this.#width, this.#height);
      this.#draw(this.#width / 2, this.#height / 2);
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
