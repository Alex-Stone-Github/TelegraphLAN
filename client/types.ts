export interface vec2 {
    x: number;
    y: number;
}
export const v = (x: number, y: number): vec2 => {return {x, y};}
export type Color = string;