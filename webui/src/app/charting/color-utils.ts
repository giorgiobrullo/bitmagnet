/** Convert an rgb(...) string to rgba(..., alpha). */
export function withAlpha(rgb: string | undefined, alpha: number): string {
  if (!rgb) return `rgba(128,128,128,${alpha})`;
  const match = rgb.match(/\d+/g);
  if (!match || match.length < 3) return `rgba(128,128,128,${alpha})`;
  return `rgba(${match[0]},${match[1]},${match[2]},${alpha})`;
}
