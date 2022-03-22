const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const image = document.getElementById("source");

const ozisan = {
  width: 50,
  height: 70,
  x: 20,
  y: 200,
  speed: 5,
  dx: 0,
  dy: 0,
};

function drawozisan() {
  ctx.drawImage(image, ozisan.x, ozisan.y, ozisan.width, ozisan.height);
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newPos() {
  ozisan.x += ozisan.dx;
  ozisan.y += ozisan.dy;

  // 壁の当たり判定
  detectWalls();
}

function detectWalls() {
  // 左の壁
  if (ozisan.x < 0) {
    ozisan.x = 0;
  }
  // 右の壁
  if (ozisan.x + ozisan.width > canvas.width) {
    ozisan.x = canvas.width - ozisan.width;
  }
  // 上の壁
  if (ozisan.y < 0) {
    ozisan.y = 0;
  }
  // 下の壁
  if (ozisan.y + ozisan.height > canvas.height) {
    ozisan.y = canvas.height - ozisan.height;
  }
}

function update() {
  clear();

  drawozisan();

  newPos();

  requestAnimationFrame(update);
}

function moveUp() {
  // y 座標が左上原点で下向きであることに注意
  ozisan.dy = -ozisan.speed;
}

function moveDown() {
  ozisan.dy = ozisan.speed;
}

function moveRight() {
  ozisan.dx = ozisan.speed;
}

function moveLeft() {
  ozisan.dx = -ozisan.speed;
}

function onKeyDown(e) {
  if (e.key === "ArrowRight" || e.key === "Right") {
    moveRight();
  } else if (e.key === "ArrowLeft" || e.key === "Left") {
    moveLeft();
  } else if (e.key === "ArrowUp" || e.key === "Up") {
    moveUp();
  } else if (e.key === "ArrowDown" || e.key === "Down") {
    moveDown();
  }
}

function onKeyUp(e) {
  if (
    e.key == "Right" ||
    e.key == "ArrowRight" ||
    e.key == "Left" ||
    e.key == "ArrowLeft" ||
    e.key == "Up" ||
    e.key == "ArrowUp" ||
    e.key == "Down" ||
    e.key == "ArrowDown"
  ) {
    ozisan.dx = 0;
    ozisan.dy = 0;
  }
}

update();

document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);
