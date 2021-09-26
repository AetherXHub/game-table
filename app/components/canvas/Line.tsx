import * as React from 'react';
import { useCanvas } from './Canvas';
import { ID } from '../../util';
// import { Line as LineRenderer } from '../../util/line';

type LineProps = {
  points: Walls
}

export const Line = ({ points }: LineProps) => {
  const idRef = React.useRef(ID());
  const { registerNode, removeNode, gridSize } = useCanvas();

  React.useEffect(() => {
    let draw: DrawFn = (ctx) => {
      if (points.length) {
        // const line = new LineRenderer(
        //   [...points],
        //   bg ? '#FFFFFF' : '#07031a',
        //   '#f4f6ff',
        // );
        // line.draw(ctx, gridSize);
      }
    }

    if (registerNode) {
      registerNode(idRef.current, draw);
    }
    return () => removeNode(idRef.current);
  }, [points, gridSize]);

  return null;
};