import * as PIXI from 'pixi.js';
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { DENSITY_MAP, FN_MAP, MeshType } from '../constants/mesh.constants';
import { mesh } from '../utils/mesh.utils';
import { useScale, useScreenSize } from '../common-hooks';
import { isoline, marchingSquares } from '../utils/contour.utils';

type WebGLProps = {
  fnId: MeshType;
};

function WebGL({ fnId }: WebGLProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<PIXI.Application>();
  const { width, height } = useScreenSize();
  const [xScale, yScale, step] = useScale(fnId, width, height);

  useLayoutEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    appRef.current = new PIXI.Application({
      background: '#FFFFFF',
      view: canvasRef.current,
      resizeTo: window,
    });
  }, []);

  const [grid, min, max] = useMemo(() => {
    return mesh(FN_MAP[fnId], xScale, yScale, step);
  }, [fnId, width, height]);

  useEffect(() => {
    if (!appRef.current || !grid?.length) {
      return;
    }

    appRef.current.stage.removeChildren();

    let res = [];
    let i = Math.floor(min - 1);

    const delta = (max - min) / DENSITY_MAP[fnId];
    while (i < Math.ceil(max + 1)) {
      res.push(...isoline(marchingSquares(grid, step, (i += delta))));
    }

    res.forEach((path) => {
      const graphics = new PIXI.Graphics();
      graphics.lineStyle(1, 0x000000);

      graphics.moveTo(path[0].x, path[0].y);
      path.forEach((p) => graphics.lineTo(p.x, p.y));
      appRef.current?.stage.addChild(graphics);
    });
  }, [grid, min, max]);

  return <canvas ref={canvasRef} />;
}

export default WebGL;
