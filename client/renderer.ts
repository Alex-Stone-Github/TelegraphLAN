import { v, vec2 } from "./types.js";
import { canvas, context } from "./glob.js";
import { Color } from "./types.js";

export default class Renderer {
    public static camera_position: vec2 = v(0,0);
    public static rect(pos: vec2, size: vec2, color: Color) {
        context.fillStyle = color;
        context.fillRect(pos.x-this.camera_position.x, pos.y-this.camera_position.y, size.x, size.y);
    }
    public static circle(pos: vec2, radius: number, color: Color) {
        context.fillStyle = color;
        context.ellipse(pos.x-this.camera_position.x, pos.y-this.camera_position.y, radius, radius, 0, 0, 360);
    }
    public static background(color: Color) {
        context.fillStyle = color;
        context.fillRect(0,0,canvas.width,canvas.height);
    }
}