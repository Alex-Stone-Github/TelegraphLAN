import { CameraRenderer } from "./camera.js"
import { Vec2, v } from "./types.js"
import { rotate } from "./vecmath.js"

export class GameBody {
    private vertices: Vec2[];
    private position: Vec2;
    private rotation: number;
    constructor(vertices: Vec2[], position: Vec2, rotation: number) {
        this.position = position;
        this.rotation = rotation;
        this.vertices = vertices;
    }
    private vertex_mapper(original: Vec2[]): Vec2[] {
        const output = [];
        for (const ver of original) {
            const rotated = rotate(ver, this.rotation);
            output.push(v(rotated.x+this.position.x,rotated.y+this.position.y));
        }
        return output;
    }
    public show() {
        CameraRenderer.draw_poly(this.get_vertices(), "green");
    }
    public get_vertices() {
        return this.vertex_mapper(this.vertices);
    }
}
