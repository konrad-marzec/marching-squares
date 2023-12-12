import React, { useMemo } from 'react';
import { Point } from '../constants/mesh.constants';
import { isoline } from '../utils/contour.utils';

interface ContourSinglePathProps {
  contour: [Point, Point][];
}

function ContourSinglePath({ contour }: ContourSinglePathProps) {
  const points = useMemo(() => isoline(contour), [contour]);

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
