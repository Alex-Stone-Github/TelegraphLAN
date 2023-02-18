import { v3 } from "./types.js";
export class Renderer {
    constructor() {
        this.width = 800;
        this.height = 600;
        this.canvas = document.getElementById("Main");
        this.ctx = this.canvas.getContext("2d");
    }
    static get_instance() { return this.instance; }
    background(color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    draw_triangle(tri, color) {
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
    to_scrn_cords(point) {
        return v3((point.x + 1) / 2 * this.width, (point.y + 1) / 2 * this.height, 0);
    }
}
Renderer.instance = new Renderer();
