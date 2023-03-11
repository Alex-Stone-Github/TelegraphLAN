import { ShaderProgram } from "./sprogram.js";
import { IBOMesh } from "./mesh.js";
import { gl, canvas } from "./glob.js"

// preconstants
const vertices = [
    -.5, -.5, 0,
    .5, -.5, 0,
    .5, .5, 0,
    -.5, .5, 0,
];
const indices = [0,1,2, 0,2,3];
const vshadertext = `
attribute vec3 position;
void main() {
    gl_Position = vec4(position, 1.0);
}

`;
const fshadertext_red = `
void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.3, 1.0);
}

`;
const fshadertext_blue = `
void main() {
    gl_FragColor = vec4(0.0, 0.0, 0.9, 1.0);
}

`;

// deal with buffers
const ibomesh = new IBOMesh(vertices, indices);
// deal with shaders
const sprogram = new ShaderProgram(vshadertext, fshadertext_red);
// mix
ibomesh.setup(sprogram);

// drawing once twice maybe thrice
sprogram.use();
ibomesh.bind();
gl.clearColor(0.5, 0.5, 0.5, 1.0);
gl.enable(gl.DEPTH_TEST); // no clue literal magic // TODO: Check for bugs
gl.clear(gl.COLOR_BUFFER_BIT);
gl.viewport(0, 0, canvas.width, canvas.height); // TODO: Adjust for the lols
gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

