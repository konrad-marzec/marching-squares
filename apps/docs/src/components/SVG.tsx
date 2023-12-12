import React, { useMemo } from 'react';
import { mesh } from '../utils/mesh.utils';
import { marchingSquares } from '../utils/contour.utils';
import ContourSinglePath from './ContourSinglePath';
import { DENSITY_MAP, FN_MAP, MeshType } from '../constants/mesh.constants';
import { useScale, useScreenSize } from '../common-hooks';

type SettingsProps = {
  fnId: MeshType;
};

function SVG({ fnId }: SettingsProps) {
  const { width, height } = useScreenSize();
  const [xScale, yScale, step] = useScale(fnId, width, height);

  const [grid, min, max] = useMemo(() => mesh(FN_MAP[fnId], xScale, yScale, step), [fnId, width, height]);

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
      {contours}
    </svg>
  );
}

export default SVG;
