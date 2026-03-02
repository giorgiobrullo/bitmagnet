// src/app/charting/color-utils.ts
function withAlpha(rgb, alpha) {
  if (!rgb)
    return `rgba(128,128,128,${alpha})`;
  const match = rgb.match(/\d+/g);
  if (!match || match.length < 3)
    return `rgba(128,128,128,${alpha})`;
  return `rgba(${match[0]},${match[1]},${match[2]},${alpha})`;
}

export {
  withAlpha
};
//# sourceMappingURL=chunk-UZMZEN6D.js.map
