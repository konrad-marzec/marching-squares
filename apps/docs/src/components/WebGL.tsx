import * as PIXI from 'pixi.js';
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { FN_MAP, MeshType } from '../constants/mesh.constants';
import { mesh } from '../utils/mesh.utils';
import { useScreenSize } from '../common-hooks';

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

  useEffect(() => {
    if (!appRef.current) {
      return;
    }

    console.log('useEffect');
  }, []);

  const [grid, min, max] = useMemo(() => mesh(FN_MAP[fnId], width, height, step), [fnId, width, height]);

  return <canvas ref={canvasRef} />;
}

export default WebGL;
