import { gl } from "./glob.js"

export class ShaderProgram {
    private program: WebGLProgram;
    private v_shader: WebGLShader;
    private f_shader: WebGLShader;
    public constructor(vtext: string, ftext: string) {
        this.v_shader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;
        gl.shaderSource(this.v_shader, vtext);
        gl.compileShader(this.v_shader);
        {
            const errmsg = gl.getShaderInfoLog(this.v_shader) as string;
            if (errmsg.length > 0)
                throw "vshader: " + errmsg;
        }

        this.f_shader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;
        gl.shaderSource(this.f_shader, ftext);
        gl.compileShader(this.f_shader);
        {
            const errmsg = gl.getShaderInfoLog(this.f_shader) as string;
            if (errmsg.length > 0)
                throw "fshader: " + errmsg;
        }

        this.program = gl.createProgram() as WebGLProgram;
        gl.attachShader(this.program, this.v_shader)
        gl.attachShader(this.program, this.f_shader);
        gl.linkProgram(this.program);
        {
            const errmsg = gl.getProgramInfoLog(this.program) as string;
            if (errmsg.length > 0)
                throw "program: " + errmsg;
        }
    }
    public use() {
        gl.useProgram(this.program);
    }
    public get_attribute_location(name: string) {
        return gl.getAttribLocation(this.program, name);
    }
}
