import React, { useMemo } from 'react';
import { mesh } from '../utils/mesh.utils';
import { marchingSquares } from '../utils/contour.utils';
// import Contour from './Contour';
// import Values from './Values';
import ContourSinglePath from './ContourSinglePath';
import { DENSITY_MAP, FN_MAP, MeshType } from '../constants/mesh.constants';
import { useScreenSize } from '../common-hooks';

type SettingsProps = {
  fnId: MeshType;
  step?: number;
};

function SVG({ fnId, step = 10 }: SettingsProps) {
  const { width, height } = useScreenSize();

  const [grid, min, max] = useMemo(() => mesh(FN_MAP[fnId], width, height, step), [fnId, width, height]);

  // const contours = useMemo(() => {
  //   if (!grid?.length) {
  //     return null;
  //   }

  //   let res = [];
  //   let i = Math.floor(min - 1);

  //   while (i < Math.ceil(max + 1)) {
  //     const delta = (max - min) / 20;

  //     res.push(<Contour key={i} contour={marchingSquares(grid, step, (i += delta))} />);
  //   }

  //   return res;
  // }, [grid, min, max]);

  const contours = useMemo(() => {
    if (!grid?.length) {
      return null;
    }

    let res = [];
    let i = Math.floor(min - 1);

    const delta = (max - min) / DENSITY_MAP[fnId];
    while (i < Math.ceil(max + 1)) {
      res.push(<ContourSinglePath key={i} contour={marchingSquares(grid, step, (i += delta))} />);
    }

    return res;
  }, [grid, min, max]);

  return (
    <svg className="w-screen h-screen" viewBox={`0 0 ${width} ${height}`}>
      {/* <Values grid={grid} min={min} max={max} step={step} /> */}

      <defs>
        <pattern id="grid" width={step} height={step} patternUnits="userSpaceOnUse">
          <path
            fill="none"
            strokeWidth={0.5}
            strokeOpacity={0.4}
            stroke="currentColor"
            d={`M ${step} 0 L 0 0 0 ${step}`}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />

      {contours}
    </svg>
  );
}

export default SVG;
