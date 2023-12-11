export function func1(x0: number, y0: number) {
  const w = 0.06;

  const x = x0 * w;
  const y = y0 * w;

  const r = Math.sqrt(x ** 2 + y ** 2) + Number.EPSILON;
  return Math.sin(r) / r;
}

export function func2(x0: number, y0: number) {
  const w = 0.12;

  const x = x0 * w;
  const y = y0 * w;

  return y * Math.sin(x) - x * Math.cos(y);
}

export function func3(x0: number, y0: number) {
  const w = 0.1;

  const x = x0 * w;
  const y = y0 * w;

  return Math.sin(x) + Math.cos(y);
}

export function func4(x0: number, y0: number) {
  const w = 0.06;

  const x = x0 * w;
  const y = y0 * w;

  return (
    3 * Math.pow(1 - x, 2) * Math.exp(-Math.pow(x, 2) - Math.pow(y + 1, 2)) -
    10 * (x / 5 - Math.pow(x, 3) - Math.pow(y, 5)) * Math.exp(-Math.pow(x, 2) - Math.pow(y, 2)) -
    (1 / 3) * Math.exp(-Math.pow(x + 1, 2) - Math.pow(y, 2))
  );
}

export function mesh(
  fn: (x0: number, y0: number) => number,
  width: number,
  height: number,
  step: number,
): [number[][], number, number] {
  let y = 0;

  let min = Infinity;
  let max = -Infinity;
  const values: number[][] = [];

  const xShift = Math.floor(width / step / 2);
  const yShift = Math.floor(height / step / 2);

  while (y * step < height) {
    values[y] ||= [];
    const row = values[y];

    let x = 0;
    while (x * step < width) {
      const val = fn(x - xShift, y - yShift);

      max = Math.max(max, val);
      min = Math.min(min, val);
      row.push(val);

      x += 1;
    }

    y += 1;
  }

  return [values, min, max];
}
