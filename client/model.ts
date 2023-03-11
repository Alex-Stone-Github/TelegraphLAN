import { ShaderProgram } from "./sprogram.js";
import { Mesh } from "./mesh.js";
import { gl } from "./glob.js";

export class Model {
    private mesh: Mesh;
    private shaderp: ShaderProgram;
    public constructor(mesh: Mesh, shaderp: ShaderProgram) {
        this.mesh = mesh;
        this.shaderp = shaderp;
    }
    public show() {
        this.mesh.bind();
        this.shaderp.use();
        gl.drawElements(gl.TRIANGLES, this.mesh.index_count, gl.UNSIGNED_SHORT, 0);
    }
}