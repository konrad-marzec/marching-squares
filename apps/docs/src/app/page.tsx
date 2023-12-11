'use client';
import { useState } from 'react';
import SVG from '../components/SVG';
import Settings from '../components/Settings';
import WebGL from '../components/WebGL';
import { MeshType } from '../constants/mesh.constants';

export default function Home() {
  const [fnId, setFnId] = useState(MeshType.ONE);

  return (
    <>
      <Settings fnId={fnId} onChange={setFnId} />
      {/* <SVG fnId={fnId} /> */}
      <WebGL fnId={fnId} />
    </>
  );
}
