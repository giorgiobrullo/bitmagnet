import {
  formatDistanceToNow
} from "./chunk-SPPBVMMP.js";
import {
  enUS,
  getDefaultOptions,
  resolveDateLocale
} from "./chunk-GPFHSAQX.js";

// node_modules/date-fns/formatDuration.js
var defaultFormat = [
  "years",
  "months",
  "weeks",
  "days",
  "hours",
  "minutes",
  "seconds"
];
function formatDuration(duration, options) {
  const defaultOptions = getDefaultOptions();
  const locale = options?.locale ?? defaultOptions.locale ?? enUS;
  const format = options?.format ?? defaultFormat;
  const zero = options?.zero ?? false;
  const delimiter = options?.delimiter ?? " ";
  if (!locale.formatDistance) {
    return "";
  }
  const result = format.reduce((acc, unit) => {
    const token = `x${unit.replace(/(^.)/, (m) => m.toUpperCase())}`;
    const value = duration[unit];
    if (value !== void 0 && (zero || duration[unit])) {
      return acc.concat(locale.formatDistance(token, value));
    }
    return acc;
  }, []).join(delimiter);
  return result;
}

// src/app/dates/dates.utils.ts
var formatTimeAgo = (date, locale) => formatDistanceToNow(date, {
  addSuffix: true,
  locale: resolveDateLocale(locale)
});
var formatDuration2 = (duration, locale) => formatDuration(duration, {
  locale: resolveDateLocale(locale)
});

export {
  formatTimeAgo,
  formatDuration2 as formatDuration
};
//# sourceMappingURL=chunk-YTGJFPX5.js.map
