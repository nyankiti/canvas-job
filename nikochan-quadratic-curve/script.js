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

/*
Quadratic Bezier curve
https://www.w3schools.com/tags/canvas_quadraticcurveto.asp
二次ベジエ曲線には2つのポイントが必要です。
1点目は2次ベジエ計算で使用する制御点、2点目は曲線の終点である。
曲線の始点は、現在のパスの最後の点です。パスが存在しない場合は、beginPath() と moveTo() メソッドを使用して開始点を定義します。

control pointoと始点、終点を結ぶ直線に漸近する二次方程式から算出される曲線を描く。
Quadaricは二次方程式という意味

使い方
quadraticCurveTo(control_point_x, control_point_y, termial_x, termial_y)
*/

ctx.moveTo(75, 25);
ctx.quadraticCurveTo(25, 25, 25, 62.5);
ctx.quadraticCurveTo(25, 100, 50, 100);
ctx.quadraticCurveTo(50, 120, 30, 125);
ctx.quadraticCurveTo(60, 120, 65, 100);
ctx.quadraticCurveTo(125, 100, 125, 62.5);
ctx.quadraticCurveTo(125, 25, 75, 25);

ctx.stroke();
