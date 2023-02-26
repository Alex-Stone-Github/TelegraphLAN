import { Color, Vec2, v } from "./types.js"

export class CameraRenderer {
    private static canvas = document.getElementById("Main") as HTMLCanvasElement;
    private static ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    public static readonly width = 800;
    public static readonly height = 600;
    public static camera_position = {x:0,y:0};
    public static rect(pos: Vec2, size: Vec2, color: Color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(pos.x - this.camera_position.x, 
                          pos.y - this.camera_position.y, size.x, size.y);
    }
    public static draw_poly(shape: Vec2[], color: Color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(shape[shape.length-1].x - this.camera_position.x,
                        shape[shape.length-1].y - this.camera_position.y);
        for (const v of shape) {
            this.ctx.lineTo(v.x - this.camera_position.x,
                            v.y - this.camera_position.y);
        }
        this.ctx.fill();
    }
    public static background(color: Color) {
        this.rect(v(this.camera_position.x, this.camera_position.y),
                  v(this.width, this.height), color);
    }
    public static draw_line(a: Vec2, b: Vec2, color: Color) {
        this.ctx.beginPath();
        this.ctx.moveTo(a.x-this.camera_position.x, a.y-this.camera_position.y);
        this.ctx.lineTo(b.x-this.camera_position.x, b.y-this.camera_position.y);
        this.ctx.stroke();
    }
}
