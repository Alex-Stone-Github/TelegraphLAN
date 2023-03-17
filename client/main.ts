import Renderer from "./renderer.js"
import InputHandler from "./inputs.js";
import Communication from "./coms.js";
import { fps, canvas } from "./glob.js"
import { v } from "./types.js";
import Player from "./player.js";


Communication.bind("ws://localhost:8000");
InputHandler.on_click = () => {
    console.log(Communication.most_recent_data);
    Communication.send("Hi there server");
}

const player = new Player(v(30,30), 0);
setInterval(()=>{
    const moveamt = 1;
    if (InputHandler.is_down('w')) {
        player.move(v(0,-moveamt))
    }
    if (InputHandler.is_down('s')) {
        player.move(v(0,moveamt))
    }
    if (InputHandler.is_down('a')) {
        player.move(v(-moveamt, 0))
    }
    if (InputHandler.is_down('d')) {
        player.move(v(moveamt, 0))
    }
    player.update();
    player.move_camera();
    
    // graphics
    Renderer.background("gray"); // background
    Renderer.rect(v(0,0), v(6,6), "red"); // marker
    player.show();
}, 1000/fps)

