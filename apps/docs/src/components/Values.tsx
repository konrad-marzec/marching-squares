import React, { useMemo } from 'react';

interface ValuesProps {
  grid: number[][];
  step: number;
  min: number;
  max: number;
}

const COLORS = [
  '#00008B',
  '#0000CD',
  '#0000FF',
  '#4169E1',
  '#6495ED',
  '#87CEEB',
  '#ADD8E6',
  '#B0E0E6',
  '#BFEFFF',
  '#FFA07A',
  '#FF8C00',
  '#FF7F50',
  '#FF6347',
  '#FF4500',
  '#FF0000',
  '#CD0000',
  '#8B0000',
  '#800000',
];

const fitToScale = (value: number, min: number, max: number) => {
  if (!COLORS?.length) {
    return 'transparent';
  }

  const top = max - min;

  if (top === 0 || value === undefined || value === null) {
    return COLORS[0];
  }

  if (value < min) {
    return COLORS[0];
  }

  const size = COLORS.length;
  const n = ((value - min) / top) * 100;

  return COLORS[Math.min(Math.floor((n * size) / 100), size - 1)];
};

function Values({ grid, step, min, max }: ValuesProps) {
  return useMemo(() => {
    let dots = [];

    for (let i = 0; i < grid.length; i++) {
      const row = [];

      for (let j = 0; j < grid[i].length; j++) {
        const value = grid[i][j];

        if (value > 0.99) {
          row.push(
            <g key={`${i}-${j}`}>
              <text fontSize={7} x={j * step} y={i * step + step / 2}>
                {j * step}
                {i * step}
              </text>
            </g>,
          );
        }
      }

      dots.push(<g key={i}>{row}</g>);
    }

    return dots;
  }, [grid, min, max]);
}

export default Values;
