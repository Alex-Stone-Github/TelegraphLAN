import { CameraRenderer } from "./camera.js"
import { InputHandler } from "./input.js"
import { GameBody } from "./obj.js"
import { rotate } from "./vecmath.js"
import { Vec2, v, Color } from "./types.js"

InputHandler.start();

var objs= [
    new GameBody([
        v(-40, -40),
        v(40, -40),
        v(40, 40),
        v(50, 50),
        v(-40, 40),
    ], v(300, 300), 1/3.1415),
    new GameBody([
        v(-40, -40),
        v(40, -40),
        v(40, 40),
        v(50, 50),
        v(-40, 40),
    ], v(400, 400), 0),
];

setInterval(() => {
    CameraRenderer.background("grey");
    for (const obj of objs) {
        obj.show();
        for (const vertex of obj.get_vertices()) {
            CameraRenderer.rect(vertex, v(5,5), "red");
            CameraRenderer.draw_line(InputHandler.mousepos, vertex, "blue");
        }
    }
    CameraRenderer.rect(InputHandler.mousepos, v(5,5), "yellow");
}, 1000/30);




