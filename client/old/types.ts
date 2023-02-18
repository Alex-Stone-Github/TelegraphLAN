export interface Vector3 {
    x: number,
    y: number
    z: number
};
export interface Triangle {
    a: Vector3,
    b: Vector3,
    c: Vector3
};
export interface Fragment {
    tri: Triangle
    color: Color
};
export type Mesh = Fragment[];
export type Color = string;
export function v3(x: number, y: number, z: number) {return {x,y,z};}


