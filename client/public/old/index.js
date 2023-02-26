"use strict";
const canvas = document.getElementById("Main");
const ctx = canvas.getContext("webgl2");
const vshadertext = `
#version 300 es

in vec3 vertexPosition;

void main() {
    gl_Position = vec4(vertexPosition, 1.0);
}

`;
const fshadertext = `
#version 300 es

precision mediump float;

out vec4 fragcolor;

void main() {
    fragcolor = vec4(1.0, 0.0, 0.0, 1.0);
}

`;
const vbo_data = new Float32Array([
    -.5, -.5, 0,
    .5, -.5, 0,
    .5, .5, 0,
    -.5, .5, 0,
]);
// shaders
const vertex_shader = ctx.createShader(ctx.VERTEX_SHADER);
const fragment_shader = ctx.createShader(ctx.FRAGMENT_SHADER);
const program = ctx.createProgram();
ctx.shaderSource(vertex_shader, vshadertext.trim());
ctx.shaderSource(fragment_shader, fshadertext.trim());
ctx.compileShader(vertex_shader);
if (!ctx.getShaderParameter(vertex_shader, ctx.COMPILE_STATUS)) {
    console.log("vertex: ");
    throw ctx.getShaderInfoLog(vertex_shader);
}
ctx.compileShader(fragment_shader);
if (!ctx.getShaderParameter(fragment_shader, ctx.COMPILE_STATUS)) {
    console.log("fragment: ");
    throw ctx.getShaderInfoLog(fragment_shader);
}
ctx.attachShader(program, vertex_shader);
ctx.attachShader(program, fragment_shader);
ctx.linkProgram(program);
if (!ctx.getProgramParameter(program, ctx.LINK_STATUS)) {
    console.log("program: ");
    throw ctx.getProgramInfoLog(program);
}
// buffers
const vbo = ctx.createBuffer();
ctx.bindBuffer(ctx.ARRAY_BUFFER, vbo);
ctx.bufferData(ctx.ARRAY_BUFFER, vbo_data, ctx.STATIC_DRAW);
// vbo stuff
const vertexPosition = ctx.getAttribLocation(program, "vertexPosition");
ctx.vertexAttribPointer(vertexPosition, 4, ctx.FLOAT, false, 0, 0);
ctx.enableVertexAttribArray(vertexPosition);
// drawing
ctx.viewport(0, 0, canvas.width, canvas.height);
ctx.clearColor(1.0, 0.0, 0.0, 1.0);
ctx.clear(ctx.COLOR_BUFFER_BIT);
ctx.useProgram(program);
ctx.drawArrays(ctx.LINES, 0, 3);
