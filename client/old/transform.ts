import { Vector3, v3, } from "./types.js"

// RADIANS
export class PointTransformer {
    public static instance = new PointTransformer();
    public static get_instance() {return this.instance;};
    public rotateX(point: Vector3, angle: number): Vector3 {
        return v3(
            point.x,
            Math.cos(angle)*point.y-Math.sin(angle)*point.z,
            Math.sin(angle)*point.y+Math.cos(angle)*point.z
        );
    }
    public rotateY(point: Vector3, angle: number): Vector3 {
        return v3(
            Math.cos(angle)*point.x+Math.sin(angle)*point.z,
            point.y,
            -Math.sin(angle)*point.x+Math.cos(angle)*point.z
        );
    }
    public rotateZ(point: Vector3, angle: number): Vector3 {
        return v3(
            Math.cos(angle)*point.x-Math.sin(angle)*point.y,
            Math.sin(angle)*point.x+Math.cos(angle)*point.y,
            point.z
        );
    }
    public translate(point: Vector3, translation: Vector3): Vector3 {
        return v3(
            point.x + translation.x,
            point.y + translation.y,
            point.z + translation.z,
        );
    }
    public project(point: Vector3): Vector3 {
        return v3(point.x, point.y, 0);
    }
}
