import { ShaderProgram } from "./sprogram.js";
import { Mesh } from "./mesh.js";
import { gl, canvas } from "./glob.js"

// preconstants
const vertices = [
    -.5, -.5, 0,
    .5, -.5, 0,
    .5, .5, 0,
    -.5, .5, 0,
];
const indices = [0,1,2, 0,2,3];
const indices2 = [0,1,2];
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
const mesh1 = new Mesh(vertices, indices);
const mesh2 = new Mesh(vertices, indices2);
// deal with shaders
const sprogramred = new ShaderProgram(vshadertext, fshadertext_red);
const sprogramblue = new ShaderProgram(vshadertext, fshadertext_blue);
// mix
mesh1.setup(sprogramred);
mesh2.setup(sprogramblue);

// drawing once twice maybe thrice
gl.viewport(0, 0, canvas.width, canvas.height); // TODO: Adjust for the lols
gl.enable(gl.DEPTH_TEST); // no clue literal magic // TODO: Check for bugs
gl.clearColor(0.5, 0.5, 0.5, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
// 1
sprogramred.use();
mesh1.bind();
gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
// 2
//sprogramblue.use();
//mesh2.bind();
//gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

