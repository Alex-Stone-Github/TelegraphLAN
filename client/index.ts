const canvas = document.getElementById("Main") as HTMLCanvasElement;
const gl = canvas.getContext("webgl2") as WebGL2RenderingContext;

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
const fshadertext = `
void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.3, 1.0);
}

`;

// deal with buffers
const vbo = gl.createBuffer() as WebGLBuffer;
gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

const ibo = gl.createBuffer() as WebGLBuffer;
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

// deal with shaders
const v_shader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;
gl.shaderSource(v_shader, vshadertext);
gl.compileShader(v_shader);
{
    const errmsg = gl.getShaderInfoLog(v_shader) as string;
    if (errmsg.length > 0)
        throw "vshader: " + errmsg;
}

const f_shader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;
gl.shaderSource(f_shader, fshadertext);
gl.compileShader(f_shader);
{
    const errmsg = gl.getShaderInfoLog(f_shader) as string;
    if (errmsg.length > 0)
        throw "fshader: " + errmsg;
}

const program = gl.createProgram() as WebGLProgram;
gl.attachShader(program, v_shader)
gl.attachShader(program, f_shader);
gl.linkProgram(program);
{
    const errmsg = gl.getProgramInfoLog(program) as string;
    if (errmsg.length > 0)
        throw "program: " + errmsg;
}
gl.useProgram(program);

// weird mixing stuff
gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);

const position_id = gl.getAttribLocation(program, "position");
gl.vertexAttribPointer(position_id, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(position_id);

// drawing once twice maybe thrice

gl.clearColor(0.5, 0.5, 0.5, 1.0);
gl.enable(gl.DEPTH_TEST); // no clue literal magic // TODO: Check for bugs
gl.clear(gl.COLOR_BUFFER_BIT);
gl.viewport(0, 0, canvas.width, canvas.height); // TODO: Adjust for the lols
gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

