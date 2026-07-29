import { darken, getLuminance, mix } from "polished";

export type SwitchColors = {
  onColor: string;
  offColor: string;
  onHandleColor: string;
  offHandleColor: string;
  boxShadow: string;
  activeBoxShadow: string;
};

const OFF_TRACK_BASE = "#dcdde1";

function isLightColor(color: string): boolean {
  try {
    return getLuminance(color) > 0.55;
  } catch {
    return false;
  }
}

export function getSwitchColors(currentColor: string): SwitchColors {
  const isLight = isLightColor(currentColor);

  const onColor = isLight
    ? mix(0.55, currentColor, OFF_TRACK_BASE)
    : mix(0.42, currentColor, "#ffffff");

  const offColor = mix(0.18, currentColor, OFF_TRACK_BASE);

  const onHandleColor = isLight
    ? darken(0.3, currentColor)
    : mix(0.08, currentColor, "#ffffff");

  const offHandleColor = isLight
    ? darken(0.22, currentColor)
    : currentColor;

  const boxShadow = "0 1px 3px rgba(0, 0, 0, 0.28), 0 0 0 2px #ffffff";
  const activeBoxShadow =
    "0 2px 6px rgba(0, 0, 0, 0.24), 0 0 0 2px #ffffff";

  return {
    onColor,
    offColor,
    onHandleColor,
    offHandleColor,
    boxShadow,
    activeBoxShadow,
  };
}
