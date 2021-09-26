import * as React from 'react';
import { useCanvas } from './Canvas';
import { ID } from '../../util';

export const Grid = () => {
  const idRef = React.useRef(ID());
  const { registerNode, removeNode, gridSize, canvas } = useCanvas();

  React.useEffect(() => {
    let draw: DrawFn = (ctx) => {
      let rows, cols;
      if (canvas) {
        rows = canvas.height / gridSize | 0;
        cols = canvas.width / gridSize | 0;
      }
      function drawLine(start: Point, end: Point) {
        const [x, y] = start;
        const [x1, y1] = end;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x1, y1);
        ctx.stroke();
      }
      rows = Number(rows);
      cols = Number(cols);
      ctx.strokeStyle = 'var(--border-grey)';
      // cols
      for (let i = 1; i < cols; i++) {
        drawLine(
          [gridSize * i, gridSize],
          [gridSize * i, (rows - 1) * gridSize],
        );
      }
      for (let j = 1; j < rows; j++) {
        drawLine(
          [gridSize, gridSize * j],
          [(cols - 1) * gridSize, gridSize * j],
        );
      }
    }
    if (registerNode) {
      registerNode(idRef.current, draw);
    }
    return () => removeNode(idRef.current);
  }, [gridSize, canvas, registerNode]);

  return null;
};