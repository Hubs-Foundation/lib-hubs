import {
  Mesh,
  InstancedBufferGeometry,
  PlaneBufferGeometry,
  ShaderMaterial,
  Vector3,
  Color,
  InstancedBufferAttribute,
  Math as _Math,
  AddEquation,
  Texture,
  BufferAttribute,
  RawShaderMaterial
} from "three";
import * as EasingFunctions from "@mozillareality/easing-functions";

export function lerp(start: number, end: number, value: number) {
  return (end - start) * value + start;
}

export function clamp(min: number, max: number, value: number) {
  if (value < min) {
    value = min;
  }

  if (value > max) {
    value = max;
  }

  return value;
}

const vertexShader = `
  attribute vec4 particlePosition;
  attribute vec4 particleColor;
  attribute float particleAngle;

  varying vec4 vColor;
  varying vec2 vUV;

  void main() {
    vUV = uv;
    vColor = particleColor;

    float particleScale = particlePosition.w;
    vec4 transformedPosition = modelViewMatrix * vec4(particlePosition.xyz, 1.0);
    
    vec3 rotatedPosition = position;
    rotatedPosition.x = cos( particleAngle ) * position.x - sin( particleAngle ) * position.y;
    rotatedPosition.y = sin( particleAngle ) * position.x + cos( particleAngle ) * position.y;

    transformedPosition.xyz += rotatedPosition * particleScale;

    gl_Position = projectionMatrix * transformedPosition;
  }
`;

const fragmentShader = `
  uniform sampler2D map;

  varying vec2 vUV;
  varying vec4 vColor;

  void main() {
    gl_FragColor = texture2D(map,  vUV) * vColor;
  }
`;

interface ParticleEmitterGeometry extends InstancedBufferGeometry {
  attributes: {
    position: BufferAttribute;
    uv: BufferAttribute;
    particlePosition: InstancedBufferAttribute;
    particleColor: InstancedBufferAttribute;
    particleAngle: InstancedBufferAttribute;
  }
}

export class ParticleEmitter extends Mesh {

  emitterHeight: number;
  emitterWidth: number;
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

  constructor(texture: Texture) {
    const planeGeometry = new PlaneBufferGeometry();
    const geometry = new InstancedBufferGeometry();
    geometry.index = planeGeometry.index;
    geometry.attributes = planeGeometry.attributes;
    const material = new ShaderMaterial({
      uniforms: {
        map: { value: texture }
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blendEquation: AddEquation
    });

    super(geometry, material);

    this.frustumCulled = false;

    this.emitterHeight = 1;
    this.emitterWidth = 1;
    this.initialPositions = [];
    this.startSize = 0.25;
    this.endSize = 0.25;
    this.sizeRandomness = 0;
    this.startVelocity = new Vector3(0, 0, 0.5);
    this.endVelocity = new Vector3(0, 0, 0.5);
    this.angularVelocity = 0;
    this.particleCount = 100;
    this.lifetime = 5;
    this.lifetimes = [];
    this.lifetimeRandomness = 5;
    this.particleSizeRandomness = [];
    this.ageRandomness = 10;
    this.initialAges = [];
    this.ages = [];
    this.colors = [];
    this.endColor = new Color();
    this.middleColor = new Color();
    this.startColor = new Color();
    this.startOpacity = 1;
    this.middleOpacity = 1;
    this.endOpacity = 1;
    this.colorCurve = "linear";
    this.velocityCurve = "linear";
    this.sizeCurve = "linear";
    this.updateParticles();
  }

  updateParticles() {
    const planeGeometry = new PlaneBufferGeometry();
    const tempGeo = new InstancedBufferGeometry();
    tempGeo.index = planeGeometry.index;
    tempGeo.attributes = planeGeometry.attributes;

    const positions = [];
    const colors = [];
    const lifetimes = [];
    const ages = [];
    const initialAges = [];
    const initialPositions = [];
    const particleSizeRandomness = [];
    const angles = [];

    for (let i = 0; i < this.particleCount; i++) {
      initialAges[i] = Math.random() * this.ageRandomness - this.ageRandomness;
      lifetimes[i] = this.lifetime + Math.random() * 2 * this.lifetimeRandomness;
      ages[i] = initialAges[i];
      initialPositions[i * 3] = this.emitterWidth * (Math.random() * 2 - 1); // X
      initialPositions[i * 3 + 1] = this.emitterHeight * (Math.random() * 2 - 1); // Y
      initialPositions[i * 3 + 2] = 0; // Z
      particleSizeRandomness[i] = Math.random() * this.sizeRandomness;

      positions.push(initialPositions[i * 3]);
      positions.push(initialPositions[i * 3 + 1]);
      positions.push(initialPositions[i * 3 + 2]);
      positions.push(this.startSize + particleSizeRandomness[i]);

      angles.push(0);
      colors.push(this.startColor.r, this.startColor.g, this.startColor.b, 0);
    }
    tempGeo.addAttribute(
      "particlePosition",
      new InstancedBufferAttribute(new Float32Array(positions), 4).setDynamic(true)
    );
    tempGeo.addAttribute("particleColor", new InstancedBufferAttribute(new Float32Array(colors), 4).setDynamic(true));
    tempGeo.addAttribute("particleAngle", new InstancedBufferAttribute(new Float32Array(angles), 1).setDynamic(true));

    this.geometry = tempGeo as ParticleEmitterGeometry;
    this.initialPositions = initialPositions;
    this.particleSizeRandomness = particleSizeRandomness;
    this.ages = ages;
    this.initialAges = initialAges;
    this.lifetimes = lifetimes;
    this.colors = colors;
  }

  update(dt: number) {
    const geometry = this.geometry as ParticleEmitterGeometry;
    const position = geometry.attributes.particlePosition.array as Float32Array;
    const color = geometry.attributes.particleColor.array as Float32Array;
    const particleAngle = geometry.attributes.particleAngle.array as Float32Array;

    for (let i = 0; i < this.particleCount; i++) {
      const prevAge = this.ages[i];
      const curAge = (this.ages[i] += dt);

      // Particle is dead
      if (curAge < 0) {
        continue;
      }

      // // Particle became alive
      if (curAge > 0 && prevAge <= 0) {
        color[i * 4 + 3] = this.startOpacity;
        continue;
      }

      // Particle died
      if (curAge > this.lifetimes[i]) {
        this.ages[i] = this.initialAges[i];
        position[i * 4] = this.initialPositions[i * 3];
        position[i * 4 + 1] = this.initialPositions[i * 3 + 1];
        position[i * 4 + 2] = this.initialPositions[i * 3 + 2];
        position[i * 4 + 3] = this.startSize + this.particleSizeRandomness[i];
        color[i * 4] = this.startColor.r;
        color[i * 4 + 1] = this.startColor.g;
        color[i * 4 + 2] = this.startColor.b;
        color[i * 4 + 3] = 0; // Set opacity to zero
        continue;
      }

      const normalizedAge = clamp(0, 1, this.ages[i] / this.lifetimes[i]);

      const _EasingFunctions = EasingFunctions as { [name: string]: (k: number) => number };

      const velFactor = _EasingFunctions[this.velocityCurve](normalizedAge);
      const sizeFactor = _EasingFunctions[this.sizeCurve](normalizedAge);
      const colorFactor = _EasingFunctions[this.colorCurve](normalizedAge);

      position[i * 4] += lerp(this.startVelocity.x, this.endVelocity.x, velFactor) * dt;
      position[i * 4 + 1] += lerp(this.startVelocity.y, this.endVelocity.y, velFactor) * dt;
      position[i * 4 + 2] += lerp(this.startVelocity.z, this.endVelocity.z, velFactor) * dt;
      position[i * 4 + 3] = lerp(
        this.startSize + this.particleSizeRandomness[i],
        this.endSize + this.particleSizeRandomness[i],
        sizeFactor
      );
      particleAngle[i] += this.angularVelocity * _Math.DEG2RAD * dt;

      if (colorFactor <= 0.5) {
        const colorFactor1 = colorFactor / 0.5;
        color[i * 4] = lerp(this.startColor.r, this.middleColor.r, colorFactor1);
        color[i * 4 + 1] = lerp(this.startColor.g, this.middleColor.g, colorFactor1);
        color[i * 4 + 2] = lerp(this.startColor.b, this.middleColor.b, colorFactor1);
        color[i * 4 + 3] = lerp(this.startOpacity, this.middleOpacity, colorFactor1);
      } else if (colorFactor > 0.5) {
        const colorFactor2 = (colorFactor - 0.5) / 0.5;
        color[i * 4] = lerp(this.middleColor.r, this.endColor.r, colorFactor2);
        color[i * 4 + 1] = lerp(this.middleColor.g, this.endColor.g, colorFactor2);
        color[i * 4 + 2] = lerp(this.middleColor.b, this.endColor.b, colorFactor2);
        color[i * 4 + 3] = lerp(this.middleOpacity, this.endOpacity, colorFactor2);
      }
    }

    geometry.attributes.particlePosition.needsUpdate = true;
    geometry.attributes.particleColor.needsUpdate = true;
    geometry.attributes.particleAngle.needsUpdate = true;
  }

  copy(source: this, recursive = true) {
    super.copy(source, recursive);

    const material = this.material as RawShaderMaterial;
    const sourceMaterial = source.material as RawShaderMaterial;

    material.uniforms.map.value = sourceMaterial.uniforms.map.value;
    this.startColor = source.startColor;
    this.middleColor = source.middleColor;
    this.endColor = source.endColor;
    this.startOpacity = source.startOpacity;
    this.middleOpacity = source.middleOpacity;
    this.endOpacity = source.endOpacity;
    this.colorCurve = source.colorCurve;
    this.emitterHeight = source.emitterHeight;
    this.emitterWidth = source.emitterWidth;
    this.sizeCurve = source.sizeCurve;
    this.startSize = source.startSize;
    this.endSize = source.endSize;
    this.sizeRandomness = source.sizeRandomness;
    this.ageRandomness = source.ageRandomness;
    this.lifetime = source.lifetime;
    this.lifetimeRandomness = source.lifetimeRandomness;
    this.particleCount = source.particleCount;
    this.startVelocity = source.startVelocity;
    this.endVelocity = source.endVelocity;
    this.velocityCurve = source.velocityCurve;
    this.angularVelocity = source.angularVelocity;

    return this;
  }
}
