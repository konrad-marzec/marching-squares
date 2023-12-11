import { func1, func2, func3, func4 } from '../utils/mesh.utils';

export type Point = { x: number; y: number };

export enum MeshType {
  ONE = '1',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
}

export const FN_MAP: Record<MeshType, (x: number, y: number) => number> = {
  [MeshType.ONE]: func1,
  [MeshType.TWO]: func2,
  [MeshType.THREE]: func3,
  [MeshType.FOUR]: func4,
};

export const DENSITY_MAP: Record<MeshType, number> = {
  [MeshType.ONE]: 22,
  [MeshType.TWO]: 16,
  [MeshType.THREE]: 14,
  [MeshType.FOUR]: 20,
};
