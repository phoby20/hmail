const { constants } = require("../../constants/index");

const { LETTER } = constants;

/**
 *飛行機のx, y, 斜面（移動距離）を計算する
 * @param endCoordinates 到着地の座標
 * @param startCoordinates 出発地の座標
 * @returns 出発と到着地の座標をもとにしたx, y, 斜面の長さのオブジェクト
 */
const calcDistances = (startCoordinates, endCoordinates) => {
  const x = endCoordinates[0] - startCoordinates[0];
  const y = endCoordinates[1] - startCoordinates[1];

  return {
    x, // x축 거리
    y, // y축 거리
    hypotenuse: Math.sqrt(x ** 2 + y ** 2), // 삼각형의 경사면 거리 (a제곱 + b제곱 = c제곱)
  };
};

/**
 * 三角形の二つの辺の長さをもってtangentの角度を求める
 * @param x 求める角度に面した三角形の辺の長さ
 * @param y 求める角度の反対の辺の長さ
 * @returns tangentの角度
 */
const calcTangent = (x, y) => (Math.atan2(y, x) * 180) / Math.PI;

const calcLetterType = () => {
  const letterTypeLength = Object.keys(LETTER.TYPE).length;
  return Math.floor(Math.random() * letterTypeLength) + 1;
};

const getRandomLatterType = (max) => {
  return Math.floor(Math.random() * max) + 1;
};

exports.calcDistances = calcDistances;
exports.calcTangent = calcTangent;
exports.calcLetterType = calcLetterType;
exports.getRandomLatterType = getRandomLatterType;
