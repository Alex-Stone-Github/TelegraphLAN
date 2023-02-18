import { v3, } from "./types.js";
// RADIANS
export class PointTransformer {
    static get_instance() { return this.instance; }
    ;
    rotateX(point, angle) {
        return v3(point.x, Math.cos(angle) * point.y - Math.sin(angle) * point.z, Math.sin(angle) * point.y + Math.cos(angle) * point.z);
    }
    rotateY(point, angle) {
        return v3(Math.cos(angle) * point.x + Math.sin(angle) * point.z, point.y, -Math.sin(angle) * point.x + Math.cos(angle) * point.z);
    }
    rotateZ(point, angle) {
        return v3(Math.cos(angle) * point.x - Math.sin(angle) * point.y, Math.sin(angle) * point.x + Math.cos(angle) * point.y, point.z);
    }
    translate(point, translation) {
        return v3(point.x + translation.x, point.y + translation.y, point.z + translation.z);
    }
    project(point) {
        return v3(point.x, point.y, 0);
    }
}
PointTransformer.instance = new PointTransformer();
