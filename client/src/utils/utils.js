// taken from http://stackoverflow.com/a/17527156
export function defaultPercentageToHsl(percentage, hue0, hue1) {
  const hue = (percentage * (hue1 - hue0)) + hue0;
  return `hsl(${hue}, 100%, 50%)`;
}

export function percentageToHsl(options = {}) {
  const {
    percentage,
    hue0,
    hue1,
    transparency,
    saturation = 70,
    lightness = 50
  } = options;

  const hue = (percentage * (hue1 - hue0)) + hue0;
  return transparency
    ? `hsla(${hue}, ${saturation}%, ${lightness}%, ${transparency})`
    : `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
