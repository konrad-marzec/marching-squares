import React, { ChangeEvent, useCallback } from 'react';
import { MeshType } from '../constants/mesh.constants';

type SettingsProps = {
  onChange: (fnId: MeshType) => void;
  fnId: MeshType;
};

function Settings({ onChange, fnId }: SettingsProps) {
  const _onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value as MeshType);
  }, []);

  return (
    <div className="absolute top-0 left-0 shadow-md p-2 m-2 bg-zinc-200 rounded-md">
      <div>
        <input
          onChange={_onChange}
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
          onChange={_onChange}
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
          onChange={_onChange}
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
          onChange={_onChange}
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
