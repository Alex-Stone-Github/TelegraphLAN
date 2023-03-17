import { canvas } from "./glob.js";
import Renderer from "./renderer.js";
import { Color, v, vec2 } from "./types.js";

export default class Player {
    private color: Color = "red";
    private size: vec2 = v(20,20);
    private position: vec2;
    private velocity: vec2 = v(0,0);
    private direction: number = 0;
    public constructor(position: vec2, direction: number) {
        this.position = position;
        this.direction = direction;
    }
    public show() {
        Renderer.rect(this.position, this.size, this.color);
        const direction_indicator = v(this.position.x+this.size.x/2, this.position.y+this.size.y/2);
        const direction_indicator_size = 5;
        direction_indicator.x += this.size.x*Math.cos(this.direction)-direction_indicator_size/2;
        direction_indicator.y += this.size.y*Math.sin(this.direction)-direction_indicator_size/2;
        Renderer.rect(direction_indicator, v(direction_indicator_size, direction_indicator_size), "yellow");
    }
    public update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
    public move_camera() {
        Renderer.camera_position = v(this.position.x-canvas.width/2, this.position.y-canvas.height/2)
    }
    public move(addvel: vec2) {
        this.velocity.x += addvel.x;
        this.velocity.y += addvel.y;
    }
}