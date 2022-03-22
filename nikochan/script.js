// 参考：https://www.youtube.com/watch?v=gm1QtePAYTM

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Arc
// arc(x, y, radius, startAngle, endAngle [, counterclockwise]);
// x, y => 中心座標  radius => 半径  angle => 弧度法で指定する角度
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc

ctx.beginPath();
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
// 頭を描く
ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);

// 口へ移動
ctx.moveTo(centerX + 100, centerY);

// 口を書く
ctx.arc(centerX, centerY, 100, 0, Math.PI, false);

// 左目へ移動
ctx.moveTo(centerX - 60, centerY - 80);
ctx.arc(centerX - 80, centerY - 80, 20, 0, Math.PI * 2);

// 右目へ移動
ctx.moveTo(centerX + 100, centerY - 80);
ctx.arc(centerX + 80, centerY - 80, 20, 0, Math.PI * 2);

ctx.stroke();

// 2022-03-22 動画26分までやった。
