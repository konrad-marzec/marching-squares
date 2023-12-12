import { ScaleLinear, scaleLinear } from 'd3-scale';

import { MeshType } from '../constants/mesh.constants';

export function useScale(
  fnId: MeshType,
  width: number,
  height: number,
): [ScaleLinear<number, number>, ScaleLinear<number, number>, number] {
  switch (fnId) {
    case MeshType.ONE:
      return [scaleLinear().domain([0, width]).range([-1, 1]), scaleLinear().domain([0, height]).range([-1, 1]), 30];
    case MeshType.TWO:
      return [
        scaleLinear().domain([0, width]).range([-100, 100]),
        scaleLinear().domain([0, height]).range([-100, 100]),
        2,
      ];
    case MeshType.THREE:
      return [scaleLinear().domain([0, width]).range([0, 200]), scaleLinear().domain([0, height]).range([0, 200]), 2];
    case MeshType.FOUR:
      return [scaleLinear().domain([0, width]).range([-60, 60]), scaleLinear().domain([0, height]).range([-60, 60]), 2];
    default:
      return [scaleLinear().domain([0, width]).range([-50, 50]), scaleLinear().domain([0, height]).range([-50, 50]), 2];
  }
}
