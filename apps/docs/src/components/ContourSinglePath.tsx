import React, { useMemo } from 'react';

interface ContourSinglePathProps {
  contour: { x: number; y: number }[][];
}

function str(obj: { x: number; y: number }) {
  return `${obj.x}-${obj.y}`;
}

function pt(str: `${number}-${number}`) {
  const [x, y] = str.split('-');

  return { x: +x, y: +y };
}

function swap(map: Map<string, any>, left: { x: number; y: number }, right: { x: number; y: number }) {
  if (map.has(str(right))) {
    swap(map, right, map.get(str(right)));
  }

  map.set(str(right), left);
}

function ContourSinglePath({ contour }: ContourSinglePathProps) {
  const points = useMemo(() => {
    if (!contour?.length) {
      return [];
    }

    const startToEnd = new Map();
    contour.forEach((cnt) => {
      const start = cnt[0];
      const end = cnt[1];

      if (startToEnd.has(str(start))) {
        swap(startToEnd, start, end);
      } else {
        startToEnd.set(str(start), end);
      }
    });

    const endToStart = new Map();
    startToEnd.forEach((value, key) => {
      if (endToStart.has(str(value))) {
        swap(endToStart, value, pt(key));
      } else {
        endToStart.set(str(value), pt(key));
      }
    });

    const values = new Set();
    endToStart.forEach((value) => {
      values.add(str(value));
    });

    let startPoints = contour.filter((cnt) => !values.has(str(cnt[1])) || !values.has(str(cnt[0])));
    if (startPoints.length === 0) {
      startPoints = [contour[0]];
    }

    const paths = [];

    for (let i = 0; i < startPoints.length; i++) {
      let start = startPoints[i][1];
      let key = str(start);

      const path = [];

      while (endToStart.has(key)) {
        path.push(start);

        start = endToStart.get(key);
        endToStart.delete(key);

        key = str(start);
      }

      path.push(start);

      if (path.length) {
        paths.push(path);
      }
    }

    while (endToStart.size) {
      let key = endToStart.keys().next().value;
      let start = endToStart.get(key);

      const path = [pt(key)];

      while (endToStart.has(key)) {
        path.push(start);

        start = endToStart.get(key);
        endToStart.delete(key);

        key = str(start);
      }

      path.push(start);

      if (path.length > 2) {
        paths.push(path);
      }
    }

    return paths;
  }, [contour]);

  return points.map((points, i) => (
    <path
      key={i}
      fill="none"
      strokeWidth={1}
      strokeOpacity={1}
      stroke="currentColor"
      d={points.reduce((res, point) => `${res} L ${point.x} ${point.y}`, `M ${points[0].x} ${points[0].y}`)}
    />
  ));
}

export default ContourSinglePath;
