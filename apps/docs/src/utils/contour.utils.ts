import { Point } from '../constants/mesh.constants';
import { parse, stringify } from './point.utils';

function lerp(x0: number, x1: number, t = 0.5) {
  return x0 + (x1 - x0) * t;
}

// function interpolate(x0: number, x1: number, y0: number, y1: number) {
//   const x = lerp(x0, x1, 1);

//   return [{ x, y: y0 + ((x - x0) * (y1 - y0)) / (x1 - x0) }];
// }

function getFlag(n: number, threshold: number) {
  return n >= threshold ? 1 : 0;
}

export function marchingSquares(grid: number[][], step: number, threshold: number) {
  const contours: [Point, Point][] = [];

  for (let i = 0; i < grid.length - 1; i++) {
    for (let j = 0; j < grid[i].length - 1; j++) {
      const tl = getFlag(grid[i][j], threshold);
      const tr = getFlag(grid[i][j + 1], threshold);
      const br = getFlag(grid[i + 1][j + 1], threshold);
      const bl = getFlag(grid[i + 1][j], threshold);

      const id = 8 * tl + 4 * tr + 2 * br + bl;

      const vx0 = j * step;
      const vy0 = i * step;

      const vx2 = (j + 1) * step;
      const vy2 = (i + 1) * step;

      const vxn = lerp(vx0, vx2);
      const vyn = lerp(vy0, vy2);

      if (id === 1 || id === 10 || id === 14) {
        contours.push([
          { x: vx0, y: vyn },
          // ...interpolate(vx0, vxn, vyn, vy2),
          { x: vxn, y: vy2 },
        ]);
      }

      if (id === 2 || id === 5 || id === 13) {
        contours.push([
          { x: vxn, y: vy2 },
          // ...interpolate(vxn, vx2, vy2, vyn),
          { x: vx2, y: vyn },
        ]);
      }

      if (id === 3 || id === 12) {
        contours.push([
          { x: vx0, y: vyn },
          { x: vx2, y: vyn },
        ]);
      }

      if (id === 4 || id === 10 || id === 11) {
        contours.push([
          { x: vxn, y: vy0 },
          // ...interpolate(vxn, vx2, vy0, vyn),
          { x: vx2, y: vyn },
        ]);
      }

      if (id === 6 || id === 9) {
        contours.push([
          { x: vxn, y: vy0 },
          { x: vxn, y: vy2 },
        ]);
      }

      if (id === 5 || id === 7 || id === 8) {
        contours.push([
          { x: vx0, y: vyn },
          // ...interpolate(vx0, vxn, vyn, vy0),
          { x: vxn, y: vy0 },
        ]);
      }
    }
  }

  return contours;
}

function swap(map: Map<string, any>, left: Point, right: Point) {
  if (map.has(stringify(right))) {
    swap(map, right, map.get(stringify(right)));
  }

  map.set(stringify(right), left);
}

export function isoline(contours: [Point, Point][]) {
  if (!contours?.length) {
    return [];
  }

  const startToEnd = new Map();
  contours.forEach((cnt) => {
    const start = cnt[0];
    const end = cnt[1];

    if (startToEnd.has(stringify(start))) {
      swap(startToEnd, start, end);
    } else {
      startToEnd.set(stringify(start), end);
    }
  });

  const endToStart = new Map();
  startToEnd.forEach((value, key) => {
    if (endToStart.has(stringify(value))) {
      swap(endToStart, value, parse(key));
    } else {
      endToStart.set(stringify(value), parse(key));
    }
  });

  const values = new Set();
  endToStart.forEach((value) => {
    values.add(stringify(value));
  });

  let startPoints = contours.filter((cnt) => !values.has(stringify(cnt[1])) || !values.has(stringify(cnt[0])));
  if (startPoints.length === 0) {
    startPoints = [contours[0]];
  }

  const lines = [];

  for (let i = 0; i < startPoints.length; i++) {
    let start = startPoints[i][1];
    let key = stringify(start);

    const line = [];

    while (endToStart.has(key)) {
      line.push(start);

      start = endToStart.get(key);
      endToStart.delete(key);

      key = stringify(start);
    }

    line.push(start);

    if (line.length) {
      lines.push(line);
    }
  }

  while (endToStart.size) {
    let key = endToStart.keys().next().value;
    let start = endToStart.get(key);

    const line = [parse(key)];

    while (endToStart.has(key)) {
      line.push(start);

      start = endToStart.get(key);
      endToStart.delete(key);

      key = stringify(start);
    }

    line.push(start);

    if (line.length > 2) {
      lines.push(line);
    }
  }

  return lines;
}
