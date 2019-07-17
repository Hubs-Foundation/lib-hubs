import * as _EasingFunctions from "./EasingFunctions";

export const EasingFunctions = _EasingFunctions as { [name: string]: _EasingFunctions.EasingFunction };

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