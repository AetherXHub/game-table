import { nanoid } from "nanoid";

export const ID = nanoid;

export const round = (n: number, step: number): number =>
  Math.round(n / step) * step;
export const getNearestPoint = (
  x: number,
  y: number,
  gridSize: number
): Point => {
  return [round(x, gridSize), round(y, gridSize)];
};

export const getColName = (n: number): string => {
  var ordA = "a".charCodeAt(0);
  var ordZ = "z".charCodeAt(0);
  var len = ordZ - ordA + 1;

  var s = "";
  while (n >= 0) {
    s = String.fromCharCode((n % len) + ordA) + s;
    n = Math.floor(n / len) - 1;
  }
  return s.toUpperCase();
};
