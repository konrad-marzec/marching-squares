import { Point } from '../constants/mesh.constants';

export function stringify(obj: Point) {
  return `${obj.x}-${obj.y}`;
}

export function parse(str: `${number}-${number}`): Point {
  const [x, y] = str.split('-');

  return { x: +x, y: +y };
}
