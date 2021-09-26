import * as React from "react";
import { useCanvas } from "./Canvas";
import { ID } from "../../util";

type DotProps = {
  pointer: Point;
};
export const Dot = ({ pointer: [x, y] }: DotProps) => {
  const idRef = React.useRef(ID());
  const { registerNode, removeNode, gridSize } = useCanvas();

  React.useEffect(() => {
    let draw: DrawFn = (ctx) => {
      ctx.beginPath();
      ctx.fillStyle = "#ff7f50";
      ctx.arc(x, y, 4, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.fillStyle = "#000";
      ctx.closePath();
    };
    if (registerNode) {
      registerNode(idRef.current, draw);
    }

    return () => removeNode(idRef.current);
  }, [x, y, gridSize]);

  return null;
};
