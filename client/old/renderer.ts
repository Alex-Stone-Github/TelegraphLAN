import { Color, Triangle, Vector3, v3 } from "./types.js"

export class Renderer {
    private static instance = new Renderer();
    public static get_instance(): Renderer {return this.instance;}
    private width = 800;
    private height = 600;
    private canvas = document.getElementById("Main") as HTMLCanvasElement;
    private ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    public background(color: Color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    public draw_triangle(tri: Triangle, color: Color) {
        const a = this.to_scrn_cords(tri.a);
        const b = this.to_scrn_cords(tri.b);
        const c = this.to_scrn_cords(tri.c);
        this.ctx.fillStyle = color;
        this.ctx.moveTo(a.x, a.y);
        this.ctx.beginPath();
        this.ctx.lineTo(b.x, b.y);
        this.ctx.lineTo(c.x, c.y);
        this.ctx.lineTo(a.x, a.y);
        this.ctx.fill();
    }
    private to_scrn_cords(point: Vector3): Vector3 {
        return v3(
            (point.x+1)/2*this.width,
            (point.y+1)/2*this.height,
            0,
        );
    }
}


