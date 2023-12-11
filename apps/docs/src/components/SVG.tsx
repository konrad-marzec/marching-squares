import React, { ChangeEvent, useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { func1, func2, func3, func4, mesh } from '../utils/mesh.utils';
import { marchingSquares } from '../utils/contour.utils';
import Contour from './Contour';
import Values from './Values';
import ContourSinglePath from './ContourSinglePath';

const FN_MAP: Record<string, (x: number, y: number) => number> = {
  '1': func1,
  '2': func2,
  '3': func3,
  '4': func4,
};

const DENSITY_MAP: Record<string, number> = {
  '1': 22,
  '2': 16,
  '3': 14,
  '4': 20,
};

const STEP = 8;

function SVG() {
  const [fnId, setFnId] = useState('1');
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFnId(e.target.value);
  }, []);

  const [grid, min, max] = useMemo(() => mesh(FN_MAP[fnId], width, height, STEP), [fnId, width, height]);

  // const contours = useMemo(() => {
  //   if (!grid?.length) {
  //     return null;
  //   }

  //   let res = [];
  //   let i = Math.floor(min - 1);

  //   while (i < Math.ceil(max + 1)) {
  //     const delta = (max - min) / 20;

  //     res.push(<Contour key={i} contour={marchingSquares(grid, STEP, (i += delta))} />);
  //   }

  //   return res;
  // }, [grid, min, max]);

  const contours = useMemo(() => {
    if (!grid?.length) {
      return null;
    }

    let res = [];
    let i = Math.floor(min - 1);

    while (i < Math.ceil(max + 1)) {
      const delta = (max - min) / DENSITY_MAP[fnId];

      res.push(<ContourSinglePath key={i} contour={marchingSquares(grid, STEP, (i += delta))} />);
    }

    return res;
  }, [grid, min, max]);

  return (
    <>
      <div className="absolute top-0 left-0 shadow-md p-2 m-2 bg-zinc-200 rounded-md">
        <div>
          <input onChange={onChange} type="radio" id="1" name="grid-fn" value="1" checked={fnId === '1'} />
          <label htmlFor="1">func1</label>
        </div>
        <div>
          <input onChange={onChange} type="radio" id="2" name="grid-fn" value="2" checked={fnId === '2'} />
          <label htmlFor="2">func2</label>
        </div>
        <div>
          <input onChange={onChange} type="radio" id="3" name="grid-fn" value="3" checked={fnId === '3'} />
          <label htmlFor="3">func3</label>
        </div>
        <div>
          <input onChange={onChange} type="radio" id="4" name="grid-fn" value="4" checked={fnId === '4'} />
          <label htmlFor="4">func4</label>
        </div>
      </div>
      <svg className="w-screen h-screen" viewBox={`0 0 ${width} ${height}`}>
        {/* <Values grid={grid} min={min} max={max} step={STEP} /> */}

        <defs>
          <pattern id="grid" width={STEP} height={STEP} patternUnits="userSpaceOnUse">
            <path
              fill="none"
              strokeWidth={0.5}
              strokeOpacity={0.4}
              stroke="currentColor"
              d={`M ${STEP} 0 L 0 0 0 ${STEP}`}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {contours}
      </svg>
    </>
  );
}

export default SVG;
