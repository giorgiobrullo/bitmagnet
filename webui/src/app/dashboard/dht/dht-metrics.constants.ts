export const timeframeNames = [
  "hours_1",
  "hours_6",
  "hours_12",
  "days_1",
  "days_3",
  "weeks_1",
] as const;

export type TimeframeName = (typeof timeframeNames)[number];

export const timeframeLengths: Record<TimeframeName, number> = {
  hours_1: 60 * 60,
  hours_6: 60 * 60 * 6,
  hours_12: 60 * 60 * 12,
  days_1: 60 * 60 * 24,
  days_3: 60 * 60 * 24 * 3,
  weeks_1: 60 * 60 * 24 * 7,
};

export const timeframeBucketDuration: Record<TimeframeName, string> = {
  hours_1: "minute",
  hours_6: "minute",
  hours_12: "hour",
  days_1: "hour",
  days_3: "hour",
  weeks_1: "day",
};

export const autoRefreshIntervalNames = [
  "off",
  "seconds_30",
  "minutes_1",
  "minutes_5",
] as const;

export type AutoRefreshInterval = (typeof autoRefreshIntervalNames)[number];

export const autoRefreshIntervals: Record<AutoRefreshInterval, number | null> =
  {
    off: null,
    seconds_30: 30,
    minutes_1: 60,
    minutes_5: 60 * 5,
  };
