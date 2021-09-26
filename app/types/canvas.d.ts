type Point = [ number, number ]
type Wall = [ Point, Point ]
type Walls = Array<Wall>

type DrawFn = (ctx: CanvasRenderingContext2D) => void
type RegisterNodeFn = (id: string, fn: DrawFn) => void

type CanvasContext = {
  registerNode: RegisterNodeFn;
  removeNode: (id: string) => void;
  gridSize: number;
  canvas: HTMLCanvasElement | null
  cols: number;
  rows: number;
}