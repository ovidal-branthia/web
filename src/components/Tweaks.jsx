// Stub del panel de Tweaks de Claude Design: fuera del editor no renderiza nada.
// Alimenta a App.jsx con los TWEAK_DEFAULTS fijos y anula cada control.
import { useState } from "react";

export function useTweaks(defaults) {
  const [values] = useState(defaults);
  return [values, function noop() {}];
}

const __null = () => null;
export const TweaksPanel = __null;
export const TweakSection = __null;
export const TweakRow = __null;
export const TweakSlider = __null;
export const TweakToggle = __null;
export const TweakRadio = __null;
export const TweakSelect = __null;
export const TweakText = __null;
export const TweakNumber = __null;
export const TweakColor = __null;
export const TweakButton = __null;
