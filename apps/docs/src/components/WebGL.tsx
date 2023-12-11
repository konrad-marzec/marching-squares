import * as PIXI from 'pixi.js';
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { DENSITY_MAP, FN_MAP, MeshType } from '../constants/mesh.constants';
import { mesh } from '../utils/mesh.utils';
import { useScreenSize } from '../common-hooks';
import { isoline, marchingSquares } from '../utils/contour.utils';

type WebGLProps = {
  fnId: MeshType;
  step?: number;
};

function WebGL({ fnId, step = 10 }: WebGLProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<PIXI.Application>();
  const { width, height } = useScreenSize();

  useLayoutEffect(() => {
    console.log('useLayoutEffect');

    if (!canvasRef.current) {
      return;
    }

    appRef.current = new PIXI.Application({
      background: '#1099bb',
      view: canvasRef.current,
      resizeTo: window,
    });
  }, []);

  const [grid, min, max] = useMemo(() => {
    console.log('useMemo');

    return mesh(FN_MAP[fnId], width, height, step);
  }, [fnId, width, height]);

  useEffect(() => {
    if (!appRef.current || !grid?.length) {
      return;
    }

    let res = [];
    let i = Math.floor(min - 1);

    while (i < Math.ceil(max + 1)) {
      const delta = (max - min) / DENSITY_MAP[fnId];
      const contour = marchingSquares(grid, step, (i += delta));
      res.push(...isoline(contour));
      // res.push(<ContourSinglePath key={i} contour={marchingSquares(grid, step, (i += delta))} />);
    }

    console.log(res);

    console.log('useEffect');
  }, [grid, min, max]);

  return <canvas ref={canvasRef} />;
}

export default WebGL;
