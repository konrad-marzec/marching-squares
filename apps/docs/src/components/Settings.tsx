import React, { ChangeEvent, useCallback } from 'react';
import { MeshType, RenderEngine } from '../constants/mesh.constants';

type SettingsProps = {
  onEngineChange: (engine: RenderEngine) => void;
  onFnChange: (fnId: MeshType) => void;
  renderEngine: RenderEngine;
  fnId: MeshType;
};

function Settings({ onFnChange, fnId, renderEngine, onEngineChange }: SettingsProps) {
  const _onFnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onFnChange(e.target.value as MeshType);
  }, []);

  const _onEngineChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onEngineChange(e.target.value as RenderEngine);
  }, []);

  return (
    <div className="absolute top-0 left-0 shadow-md p-2 m-2 bg-zinc-200 rounded-md">
      <div className="mb-4">
        <div>
          <input
            onChange={_onEngineChange}
            type="radio"
            name="render-engine"
            id={RenderEngine.SVG}
            value={RenderEngine.SVG}
            checked={renderEngine === RenderEngine.SVG}
          />
          <label htmlFor={RenderEngine.SVG}>SVG</label>
        </div>
        <div>
          <input
            onChange={_onEngineChange}
            type="radio"
            name="render-engine"
            id={RenderEngine.WEBGL}
            value={RenderEngine.WEBGL}
            checked={renderEngine === RenderEngine.WEBGL}
          />
          <label htmlFor={RenderEngine.WEBGL}>WEB GL</label>
        </div>
      </div>
      <div>
        <input
          onChange={_onFnChange}
          type="radio"
          name="grid-fn"
          id={MeshType.ONE}
          value={MeshType.ONE}
          checked={fnId === MeshType.ONE}
        />
        <label htmlFor={MeshType.ONE}>func1</label>
      </div>
      <div>
        <input
          onChange={_onFnChange}
          type="radio"
          name="grid-fn"
          id={MeshType.TWO}
          value={MeshType.TWO}
          checked={fnId === MeshType.TWO}
        />
        <label htmlFor={MeshType.TWO}>func2</label>
      </div>
      <div>
        <input
          onChange={_onFnChange}
          type="radio"
          name="grid-fn"
          id={MeshType.THREE}
          value={MeshType.THREE}
          checked={fnId === MeshType.THREE}
        />
        <label htmlFor={MeshType.THREE}>func3</label>
      </div>
      <div>
        <input
          onChange={_onFnChange}
          type="radio"
          name="grid-fn"
          id={MeshType.FOUR}
          value={MeshType.FOUR}
          checked={fnId === MeshType.FOUR}
        />
        <label htmlFor={MeshType.FOUR}>func4</label>
      </div>
    </div>
  );
}

export default Settings;
