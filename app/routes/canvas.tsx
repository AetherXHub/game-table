import * as React from 'react';
import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";

import {Canvas, Grid, Dot, SquareHighlight, Walls } from '~/components/canvas';
import { ClientOnly } from '~/components/ClientOnly';

import stylesUrl from "../styles/canvas.css";

export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export let loader: LoaderFunction = async () => {
  return { message: "this is awesome 😎" };
};

const useCanvasCtx = (canvasRef: React.MutableRefObject<HTMLCanvasElement |null>) => {
  let [ctx, setCtx] = React.useState<CanvasRenderingContext2D>();

  React.useEffect(() => {
    const node: HTMLCanvasElement | null = canvasRef.current;
    if (node) {
      const renderCtx = node.getContext('2d');

      if (renderCtx && !ctx) {
        setCtx(renderCtx);
      }
    }
  }, [ctx, setCtx]);


  return ctx
}

const walls: Walls = [
  [[90, 90], [450, 90]],
  [[90, 90],[90,315]],
  [[450, 90], [450, 405]],
  [[450, 225], [45, 225]],
  [[270, 315], [270, 180]],
  // [[405,225], [405, 495]]
];


let gridSize = 45;
let wallThickness = 3;

const getWidth = () => {
  if (typeof window !== "undefined") {
      return window.innerWidth 
    || document.documentElement.clientWidth 
    || document.body.clientWidth
  }

  return 1000;
};
const getHeight = () =>{ 
  if (typeof window !== "undefined") {
    return window.innerHeight
    || document.documentElement.clientHeight 
    || document.body.clientHeight
  }

  return 900;
};

function useCurrentWindowSize() {
  // save current window width in the state object
  let [dims, setDims] = React.useState({width: getWidth(), height: getHeight()});

  React.useLayoutEffect(() => {
    const resizeListener = () => {
      setDims({
        width: getWidth(),
        height: getHeight()
      })
    };
    // set resize listener
    window.addEventListener('resize', resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    }
  }, [])

  return dims;
}

export default function CanvasPage() {

  return (
    <ClientOnly>
      <CanvasScene/>
    </ClientOnly>
  )
}

function CanvasScene() {
  let {width, height} = useCurrentWindowSize();
  let [pointer, setPointer] = React.useState<Point>([0,0]);
  function draw() {
    console.log('clicked the draw button')
  }

  function handleMouseMove(point: Point) {
    setPointer(point)
  }

  const handleMouseOut = () => {
    setPointer([0,0]);
  };

  
  return (
    <main className="canvas-container">
      <div className="canvas-controls"><button onClick={draw}>draw</button></div>
      <Canvas 
        id="canvas" 
        className="canvas-canvas"
        width={width}
        height={height}
        gridSize={gridSize}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
      >
        <Grid />
        <SquareHighlight pointer={pointer}/>
        <Walls walls={walls} wallThickness={wallThickness}/>
      </Canvas>
    </main>
  );
}