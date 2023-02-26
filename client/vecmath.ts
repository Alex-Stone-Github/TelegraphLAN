import { Vec2, v } from "./types.js"

export function rotate(original: Vec2, radians: number): Vec2 {
    return {
        x: Math.cos(radians)*original.x - Math.sin(radians)*original.y,
        y: Math.sin(radians)*original.x + Math.cos(radians)*original.y
    };
}

