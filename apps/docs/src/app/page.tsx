'use client';
import { useState } from 'react';
import SVG from '../components/SVG';
import Settings from '../components/Settings';
import WebGL from '../components/WebGL';
import { MeshType, RenderEngine } from '../constants/mesh.constants';

export default function Home() {
  const [renderEngine, setRenderEngine] = useState(RenderEngine.SVG);
  const [fnId, setFnId] = useState(MeshType.ONE);

  return (
    <>
      <Settings fnId={fnId} onFnChange={setFnId} renderEngine={renderEngine} onEngineChange={setRenderEngine} />
      {renderEngine === RenderEngine.SVG ? <SVG fnId={fnId} /> : <WebGL fnId={fnId} />}
    </>
  );
}
