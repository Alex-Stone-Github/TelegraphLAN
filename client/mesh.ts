import { gl } from "./glob.js";
import { ShaderProgram } from "./sprogram.js";

export class IBOMesh {
    private vbo: WebGLBuffer;
    private ibo: WebGLBuffer;
    constructor(vertices: Array<number>, indices: Array<number>) {
        this.vbo = gl.createBuffer() as WebGLBuffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        this.ibo = gl.createBuffer() as WebGLBuffer;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    }
    bind() {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    }
    setup(sprogram: ShaderProgram) {
        this.bind();
        const position_id = sprogram.get_attribute_location("position");
        gl.vertexAttribPointer(position_id, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(position_id);
    }
}