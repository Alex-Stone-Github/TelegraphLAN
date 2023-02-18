import { Renderer } from "./renderer.js";
import { PointTransformer } from "./transform.js";
import { v3 } from "./types.js";
let angle = 0;
function vshader(point) {
    let current = point;
    current = PointTransformer.get_instance().rotateZ(current, angle);
    current = PointTransformer.get_instance().rotateY(current, angle);
    current = PointTransformer.get_instance().rotateZ(current, angle);
    current = PointTransformer.get_instance().translate(current, v3(.1, 0, 0));
    return PointTransformer.get_instance().project(current);
}
const tris = [
    {
        tri: {
            a: v3(-.5, -.5, 0.0),
            b: v3(.5, -.5, 0.0),
            c: v3(.5, .5, 0.0),
        },
        color: "yellow"
    },
    {
        tri: {
            a: v3(-.5, -.5, 0.5),
            b: v3(.5, .5, 0.0),
            c: v3(-.5, .5, 0.0),
        },
        color: "blue"
    }
];
function draw_mesh(mesh) {
    for (const frag of mesh) {
        const tri2 = {
            a: vshader(frag.tri.a),
            b: vshader(frag.tri.b),
            c: vshader(frag.tri.c),
        };
        Renderer.get_instance().draw_triangle(tri2, frag.color);
    }
}
setInterval(() => {
    Renderer.get_instance().background("red");
    draw_mesh(tris);
    angle += 0.02;
}, 30);
