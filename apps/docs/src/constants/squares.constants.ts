const cases = [
  [0, 0, 0, 0], // Case 0: No contour line
  [1, 0, 0, 1], // Case 1: Contour between bottom-left and top-right
  [0, 1, 1, 0], // Case 2: Contour between top-left and bottom-right
  [1, 0, 1, 0], // Case 3: Contour between bottom-left and bottom-right
  [0, 1, 0, 1], // Case 4: Contour between top-left and top-right
  [1, 1, 0, 0], // Case 5: Contour between bottom-left, top-left, and top-right
  [0, 1, 0, 1], // Case 6: Contour between top-left and top-right
  [0, 0, 1, 1], // Case 7: Contour between bottom-left, bottom-right, and top-right
  [1, 0, 1, 1], // Case 8: Contour between bottom-left and bottom-right
  [1, 1, 0, 1], // Case 9: Contour between bottom-left, top-left, and bottom-right
  [0, 1, 1, 1], // Case 10: Contour between top-left and bottom-right
  [1, 1, 1, 0], // Case 11: Contour between bottom-left, top-right, and bottom-right
  [1, 1, 1, 1], // Case 12: Contour between bottom-left, top-left, bottom-right, and top-right
  [0, 0, 0, 0], // Case 13: No contour line
  [0, 0, 0, 0], // Case 14: No contour line
  [0, 0, 0, 0], // Case 15: No contour line
];
