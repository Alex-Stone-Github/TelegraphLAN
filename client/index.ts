import { ShaderProgram } from "./sprogram.js";
import { Mesh } from "./mesh.js";
import { Model } from "./model.js";
import { gl, canvas } from "./glob.js"
const vertices = [
    -.5, -.5, .5,     
    .5, -.5, .5,
    .5, .5, .5,
    -.5, .5, .5,
    -.5, -.5, -.5,
    .5, -.5, -.5,
    .5, .5, -.5,
    -.5, .5, -.5,
];
const indices = [0,1,2, 0,2,3, 4,5,6, 4,6,7, 0, 1, 4];

const vshadertext = `
attribute vec3 position;
uniform vec3 translationvec;
uniform mat3 rotationmat;
void main() {
    vec3 rotated = rotationmat * position;
    gl_Position = vec4(rotated + translationvec, 1.0);
}

`;
const fshadertext = `
void main() {
    gl_FragColor = vec4(0.9, 0.0, 0.9, 1.0);
}

`;
// setup
const mesh = new Mesh(vertices, indices);
const shaderp = new ShaderProgram(vshadertext, fshadertext);
const model = new Model(mesh, shaderp);

// settings
gl.viewport(0, 0, canvas.width, canvas.height); // TODO: Adjust for the lols
gl.enable(gl.DEPTH_TEST); // no clue literal magic // TODO: Check for bugs
gl.depthFunc(gl.LESS);


var amt = 0.0;

function genrotx(radians: number) {
    return [
        1, 0, 0,
        0, Math.cos(radians), -Math.sin(radians),
        0, Math.sin(radians), Math.cos(radians),
    ];
}
function genroty(radians: number) {
    return [
        Math.cos(radians), 0, Math.sin(radians),
        0, 1, 0,
        -Math.sin(radians), 0, Math.cos(radians),
    ];
}
function genrotz(radians: number) {
    return [
        Math.cos(radians), -Math.sin(radians), 0,
        Math.sin(radians), Math.cos(radians), 0,
        0, 0, 1,
    ];
}
function matmul(a: Array<number>, b: Array<number>) {
    const output = new Array(9);
    for (let ri = 0; ri < 3; ri ++) {
        for (let ci = 0; ci < 3; ci ++) {
            const index = ri*3+ci;
            let dot_total = 0;
            for (let j = 0; j < 3; j ++) {
                const ain = ri*3+j;
                const bin = j*3+ci;
                dot_total += a[ain] * b[bin];
            }
            output[index] = dot_total;
        }
    }
    return output;
}


setInterval(() => {
    amt += 0.007;
    // uniforms
    shaderp.use();
    const tranlation_id_loc = shaderp.get_uniform_location("translationvec");
    gl.uniform3f(tranlation_id_loc, 0.0, 0.0, 0.0);
    const rotation_id_loc = shaderp.get_uniform_location("rotationmat");
    const mat1 = genroty(amt);
    const mat2 = genrotx(amt);
    const mat = matmul(mat1, mat2);
    gl.uniformMatrix3fv(rotation_id_loc, false, mat);
    // drawing
    gl.clearColor(0.5, 0.5, 0.5, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    model.show();
}, 1000/60);
