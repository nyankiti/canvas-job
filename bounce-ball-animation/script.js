const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// ball Animation

const circle = {
  x: 200,
  y: 200,
  size: 30, // radius of this circle
  dx: 5,
  dy: 4,
};

function drawCircle() {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
  ctx.fillStyle = "purple";
  ctx.fill();
}

/*
 requestAnimationFrameでアニメーションをおこなう

 ブラウザのアニメーションフレーム更新を適切に調節しながらアニメーションを実行してくれる
*/

function update() {
  // フレームごとに絵を変えるため、まずはcanvasを綺麗にする
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawCircle();

  // change position
  circle.x += circle.dx;
  circle.y += circle.dy;

  // 横の壁のあたり判定し、方向を反転させる
  if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
    circle.dx *= -1;
  }

  // 縦の壁のあたり判定
  if (circle.y + circle.size > canvas.height || circle.y - circle.size < 0) {
    circle.dy *= -1;
  }

  // ブラウザごとに適度なフレームレートでupdateメソッドを再帰的に繰り返す
  requestAnimationFrame(update);
}

update();
