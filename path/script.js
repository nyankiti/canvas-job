// 参考：https://www.youtube.com/watch?v=gm1QtePAYTM

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Paths

// moveTo(x, y) 最初の位置を指定
// lineTo(x, y) 線を引く

// 下向きの三角形
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(150, 50);
ctx.lineTo(100, 200);
ctx.lineTo(50, 50);
// 最初の座標に戻る場合は、以下のようにclosePathを使っても良い
// ctx.closePath();
ctx.stroke();
ctx.fillStyle = "coral";
ctx.fill();

// 上むきの三角形
ctx.beginPath();
ctx.moveTo(200, 50);
ctx.lineTo(150, 200);
ctx.lineTo(250, 200);
ctx.lineTo(200, 50);
ctx.stroke();

// 長方形
ctx.beginPath();
ctx.rect(300, 50, 150, 100);
ctx.fillStyle = "teal";
ctx.fill();

// Arc
// arc(x, y, radius, startAngle, endAngle [, counterclockwise]);
// x, y => 中心座標  radius => 半径  angle => 弧度法で指定する角度
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
ctx.beginPath();
ctx.arc(100, 300, 40, 0, Math.PI * 2);
ctx.stroke();
