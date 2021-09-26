import * as React from "react";
import { useCanvas } from "./Canvas";
import { ID, getNearestPoint } from "../../util";

type DotProps = {
  pointer: Point;
};
export const SquareHighlight = ({ pointer: [_x, _y] }: DotProps) => {
  const idRef = React.useRef(ID());
  const { registerNode, removeNode, gridSize, cols, rows } = useCanvas();

  React.useEffect(() => {
    let draw: DrawFn = (ctx) => {
      [_x, _y] = getNearestPoint(_x, _y, gridSize); // /zoom
      const x = _x / gridSize; // /zoom
      const y = _y / gridSize; // /zoom
      if (x > 0 && x <= Number(cols - 2) && y > 0 && y <= Number(rows - 2)) {
        ctx.beginPath();
        ctx.strokeStyle = "#ff7f50";
        ctx.lineWidth = 3;
        ctx.strokeRect(x * gridSize, y * gridSize, gridSize, gridSize);
        ctx.fillStyle = "#000";
        ctx.closePath();
        console.log("gridPoint", [x * gridSize, y * gridSize]);
      }
    };
    if (registerNode) {
      registerNode(idRef.current, draw);
    }

    return () => removeNode(idRef.current);
  }, [_x, _y, gridSize]);

  return null;
};
