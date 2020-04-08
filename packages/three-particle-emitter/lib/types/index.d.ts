import { Mesh, Vector3, Color, Texture } from "three";
export declare function lerp(start: number, end: number, value: number): number;
export declare function clamp(min: number, max: number, value: number): number;
export declare class ParticleEmitter extends Mesh {
    initialPositions: number[];
    initialAges: number[];
    startSize: number;
    endSize: number;
    sizeRandomness: number;
    startVelocity: Vector3;
    endVelocity: Vector3;
    angularVelocity: number;
    particleCount: number;
    lifetime: number;
    lifetimes: number[];
    lifetimeRandomness: number;
    particleSizeRandomness: number[];
    ageRandomness: number;
    ages: number[];
    colors: number[];
    endColor: Color;
    middleColor: Color;
    startColor: Color;
    startOpacity: number;
    middleOpacity: number;
    endOpacity: number;
    colorCurve: string;
    velocityCurve: string;
    sizeCurve: string;
    worldScale: Vector3;
    inverseWorldScale: Vector3;
    constructor(texture: Texture);
    updateParticles(): void;
    update(dt: number): void;
    copy(source: this, recursive?: boolean): this;
}
//# sourceMappingURL=index.d.ts.map