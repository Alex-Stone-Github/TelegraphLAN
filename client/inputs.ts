import { v, vec2 } from "./types.js";

export default class InputHandler {
    public static mouse = v(0,0);
    public static keys_down = new Set<string>([]);
    public static mouse_is_down = false;
    public static on_click = ()=>{};
    public static is_down(key: string) {
        return this.keys_down.has(key);
    }
}
document.addEventListener("mousemove", (e) => {
    InputHandler.mouse = v(e.clientX, e.clientY);
});
document.addEventListener("mousedown", () => {
    InputHandler.mouse_is_down = true;
    InputHandler.on_click();
})
document.addEventListener("mouseup", () => {
    InputHandler.mouse_is_down = false;
})
document.addEventListener("keydown", (e)=> {
    InputHandler.keys_down.add(e.key)
})
document.addEventListener("keyup", (e)=> {
    InputHandler.keys_down.delete(e.key)
})