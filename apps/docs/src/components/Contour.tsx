import React from 'react';

interface ContourProps {
  contour: { x: number; y: number }[][];
}

function Contour({ contour }: ContourProps) {
  return contour.map((points, i) => (
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

export default Contour;
