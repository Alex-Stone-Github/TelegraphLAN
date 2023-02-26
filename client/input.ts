import { Vec2, v } from "./types.js"

export class InputHandler {
    public static mousepos: Vec2 = v(0, 0);
    private static _move_event_handler(e: MouseEvent) {
        InputHandler.mousepos = v(e.clientX, e.clientY);
    }
    public static start() {
        document.addEventListener("mousemove", this._move_event_handler);
    }
}
