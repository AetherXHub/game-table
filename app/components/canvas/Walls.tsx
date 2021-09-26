import * as React from 'react';
import { useCanvas } from './Canvas';
import { ID } from '../../util';

type WallsProps = {
  walls: Walls;
  wallThickness: number;
}
export const Walls = ({ walls, wallThickness }: WallsProps) => {
  const idRef = React.useRef(ID());
  const { registerNode, removeNode, gridSize } = useCanvas();

  React.useEffect(() => {
    let draw: DrawFn = (ctx) => {
      drawWalls(ctx, walls, gridSize, wallThickness)
    }
    if (registerNode) {
      registerNode(idRef.current, draw);
    }

    return () => removeNode(idRef.current);
  }, [walls, gridSize]);

  return null;
};

function drawWall(ctx: CanvasRenderingContext2D, wall: Wall, gridSize: number) {
  let [ [startX, startY], [endX, endY] ] = wall;
  let { x, y, width, height } = calculateRect(wall, gridSize)

  ctx.fillStyle = "#000";
  ctx.fillRect(x, y, width, height); // black floor
}

function drawFloor(ctx: CanvasRenderingContext2D, wall: Wall, gridSize: number, wallThickness: number) {
  let adjustForWall = (n: number) => n - 2 * wallThickness;
  let direction = getDirection(wall[0], wall[1])
  let { x, y, width, height } = calculateRect(wall, gridSize)

  if (direction === "left") {
    x =  x - 2 * wallThickness;
    width = width + 4 * wallThickness
  }

  if (direction === "up") {
    y = y - 2 * wallThickness;
    height = height + 4 * wallThickness;
  }
  
  ctx.fillStyle = "tomato";
  ctx.fillRect(x + wallThickness, y + wallThickness, adjustForWall(width), adjustForWall(height)); // black floor
}

function drawWalls(ctx: CanvasRenderingContext2D, walls: Walls, gridSize: number, wallThickness: number) {
  ctx.beginPath();
  
  // pass 1 draw the "walls rects"
  for (let wall of walls) {
    drawWall(ctx, wall, gridSize)
  }

  ctx.clip()
  // pass 2 draw the "floor rects on top"
  for (let wall of walls) {
    drawFloor(ctx, wall, gridSize, wallThickness)
  }
}

type Direction = "left" | "right" | "up" | "down"

function getDirection(start: Point, end: Point): Direction {
  let [startX, startY] = start;
  let [endX, endY] = end;

  switch (true) {
    case startX < endX:
      return "right";
    case startY < endY:
      return "down";
    case endX < startX:
      return "left";
    case endY < startY:
      return "up"
  }

  return 'left'
}

function calculateRect(wall: Wall, gridSize: number) {
  let [start, end] = wall;
  let [startX, startY] = start;
  let [endX, endY] = end; 
  let width, height;
  let direction = getDirection(start, end);

  switch (direction) {
    case "right":
    case "down": {
      // left and down
      width = startX != endX ? endX : gridSize;
      height = startY != endY ? endY : gridSize;

      return {x: startX, y: startY, width, height}
    }
    case "up":
    case "left": {
      // left and down
      width = startX != endX ? getDiff(startX, endX) - gridSize : gridSize;
      height = startY != endY ? getDiff(startY, endY) - gridSize : gridSize;
      let x = direction === "left" ? startX + gridSize : startX
      let y = direction === "up" ? startY + gridSize : startY

      return {x, y, width, height}
    }
  }
}

function getDiff(n1: number, n2: number): number {
  return n1 > n2 ? n2 - n1 : n2 > n1 ? n1 - n2 : 0;
}