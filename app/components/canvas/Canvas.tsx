import { redirect } from '@remix-run/server-runtime';
import * as React from 'react';

const CanvasContext = React.createContext<CanvasContext>({
  registerNode: () => {},
  removeNode: () => {},
  gridSize: 30,
  canvas: null,
  cols: 0,
  rows: 0
});

type NodeRegistry = {
  [id: string]: DrawFn
}

type CanvasProps = {
  width: number;
  height: number;
  gridSize: number;
  children: React.ReactNode;
  className?: string;
  id?: string;
  onMouseMove: (point: Point) => void;
  onMouseOut: () => void;
}

export const Canvas = ({gridSize, onMouseMove, ...props}: CanvasProps) => {
  const ref = React.useRef<HTMLCanvasElement>(null)
  const [ctx, setCtx] = React.useState<CanvasRenderingContext2D>();
  const nodes = React.useRef<NodeRegistry>({});

  const registerNode = (id: string, fn: (ctx: CanvasRenderingContext2D) => void ) => {
    nodes.current[id] = fn;
    drawFn();
  };

  const removeNode = (id: string) => {
    delete nodes.current[id];
    drawFn();
  };

  const drawFn = () => {
    if (ctx) {
      ctx.clearRect(0, 0, props.width, props.height);
      Object.keys(nodes.current).forEach((k) => {
        const draw = nodes.current[k];
        ctx.save();
        draw(ctx);
        ctx.restore();
      });
    }
  };

  React.useEffect(() => {
    const node = ref.current;
    if (node) {
      const renderCtx = node.getContext('2d');

      if (renderCtx && !ctx) {
        setCtx(renderCtx);
      }
    }
  }, [ctx, setCtx]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const {clientX, clientY} = e;
    onMouseMove([clientX, clientY])
  }
  
  return (
    <CanvasContext.Provider value={{ 
      registerNode,
      removeNode,
      gridSize: gridSize,
      canvas: ref.current, 
      cols: Number(ref?.current?.width) / gridSize | 0, 
      rows: Number(ref?.current?.height) / gridSize | 0 
    }}>
      <canvas ref={ref} {...props} onMouseMove={handleMouseMove}/>
    </CanvasContext.Provider>
  );
}

export const useCanvas = () => React.useContext(CanvasContext);
