import {
  withAlpha
} from "./chunk-UZMZEN6D.js";
import {
  ChartComponent,
  createThemeColor,
  format
} from "./chunk-LL3XDJGZ.js";
import {
  ThemeInfoService
} from "./chunk-UQ3IWFEE.js";
import {
  resolveDateLocale
} from "./chunk-GPFHSAQX.js";
import {
  ErrorsService
} from "./chunk-BNLC4R4X.js";
import "./chunk-MKQWY5SO.js";
import {
  DocumentTitleComponent
} from "./chunk-MNRKI74J.js";
import {
  Apollo,
  AppModule,
  GraphQLModule,
  MatButtonToggle,
  MatButtonToggleGroup,
  MatCard,
  MatCardContent,
  MatDivider,
  MatIcon,
  MatIconButton,
  MatMenu,
  MatMenuItem,
  MatMenuTrigger,
  MatTooltip,
  TorrentLibraryMetricsDocument,
  TorrentMetricsDocument,
  TranslocoDirective,
  TranslocoService
} from "./chunk-EOZPNCBR.js";
import {
  DecimalPipe
} from "./chunk-7NLLN7HY.js";
import {
  BehaviorSubject,
  Component,
  EMPTY,
  Injectable,
  __spreadProps,
  __spreadValues,
  catchError,
  debounceTime,
  inject,
  map,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-BQWGEQNI.js";

// src/app/dashboard/torrents/torrent-library-metrics.constants.ts
var timeframeNames = [
  "hours_1",
  "hours_6",
  "hours_12",
  "days_1",
  "days_3",
  "weeks_1"
];
var timeframeLengths = {
  hours_1: 60 * 60,
  hours_6: 60 * 60 * 6,
  hours_12: 60 * 60 * 12,
  days_1: 60 * 60 * 24,
  days_3: 60 * 60 * 24 * 3,
  weeks_1: 60 * 60 * 24 * 7
};
var timeframeBucketDuration = {
  hours_1: "minute",
  hours_6: "minute",
  hours_12: "hour",
  days_1: "hour",
  days_3: "hour",
  weeks_1: "day"
};
var autoRefreshIntervalNames = [
  "off",
  "seconds_30",
  "minutes_1",
  "minutes_5"
];
var autoRefreshIntervals = {
  off: null,
  seconds_30: 30,
  minutes_1: 60,
  minutes_5: 60 * 5
};

// src/app/dashboard/torrents/torrent-library-metrics.controller.ts
var emptyResult = {
  params: { timeframe: "hours_6", autoRefresh: "minutes_1" },
  snapshots: [],
  contentBreakdown: []
};
var TorrentLibraryMetricsController = class {
  constructor(apollo, initParams, errorsService) {
    this.apollo = apollo;
    this.errorsService = errorsService;
    this.resultSubject = new BehaviorSubject(emptyResult);
    this.result$ = this.resultSubject.asObservable();
    this.loadingSubject = new BehaviorSubject(false);
    this.paramsSubject = new BehaviorSubject(initParams);
    this.params$ = this.paramsSubject.asObservable();
    this.paramsSubject.subscribe((params) => {
      this.request(params);
    });
  }
  get params() {
    return this.paramsSubject.getValue();
  }
  get loading() {
    return this.loadingSubject.getValue();
  }
  setTimeframe(timeframe) {
    this.paramsSubject.next(__spreadProps(__spreadValues({}, this.params), {
      timeframe
    }));
  }
  setAutoRefreshInterval(interval) {
    this.paramsSubject.next(__spreadProps(__spreadValues({}, this.params), {
      autoRefresh: interval
    }));
  }
  refresh() {
    this.request(this.params);
  }
  destroy() {
    clearTimeout(this.refreshTimeout);
  }
  scheduleRefresh() {
    clearTimeout(this.refreshTimeout);
    const delay = autoRefreshIntervals[this.params.autoRefresh];
    if (delay) {
      this.refreshTimeout = setTimeout(() => {
        this.refresh();
      }, delay * 1e3);
    }
  }
  request(params) {
    clearTimeout(this.refreshTimeout);
    this.loadingSubject.next(true);
    const bucketDuration = timeframeBucketDuration[params.timeframe];
    const startTime = new Date(Date.now() - 1e3 * timeframeLengths[params.timeframe]).toISOString();
    this.apollo.query({
      query: TorrentLibraryMetricsDocument,
      variables: {
        input: {
          bucketDuration,
          startTime
        }
      },
      fetchPolicy: "no-cache"
    }).pipe(map((r) => {
      this.loadingSubject.next(false);
      const data = r.data?.torrent;
      const result = {
        params,
        snapshots: (data?.libraryMetrics.snapshots ?? []).map((s) => ({
          bucket: s.bucket,
          totalCount: s.totalCount,
          totalSize: s.totalSize,
          classifiedCount: s.classifiedCount
        })),
        contentBreakdown: (data?.contentBreakdown ?? []).map((c) => ({
          contentType: c.contentType,
          count: c.count
        }))
      };
      this.resultSubject.next(result);
      this.scheduleRefresh();
    }), catchError((err) => {
      this.errorsService.addError(`Failed to load torrent library metrics: ${err.message}`);
      this.loadingSubject.next(false);
      this.scheduleRefresh();
      return EMPTY;
    })).subscribe();
  }
};

// src/app/dashboard/torrents/torrent-chart-adapter.library.ts
var TorrentChartAdapterLibraryGrowth = class _TorrentChartAdapterLibraryGrowth {
  constructor() {
    this.themeInfo = inject(ThemeInfoService);
    this.transloco = inject(TranslocoService);
  }
  create(data, params) {
    const { colors } = this.themeInfo.info;
    const foreground = colors["foreground"];
    const gridColor = withAlpha(colors[createThemeColor("neutral-variant", 50)], 0.2);
    const labels = [];
    const countData = [];
    if (data) {
      for (const point of data) {
        labels.push(format(new Date(point.bucket), "d LLL H:mm", {
          locale: resolveDateLocale(this.transloco.getActiveLang())
        }));
        countData.push(point.totalCount);
      }
    }
    const lineColor = colors[createThemeColor("primary", 50)];
    return {
      type: "line",
      options: {
        animation: { duration: 400 },
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: { tension: 0.3, borderWidth: 2 },
          point: { radius: 0, hitRadius: 8, hoverRadius: 4 }
        },
        scales: {
          x: {
            ticks: { color: foreground, maxTicksLimit: 12 },
            grid: { color: gridColor }
          },
          y: {
            beginAtZero: false,
            ticks: {
              color: foreground,
              callback: (v) => parseInt(v).toLocaleString(this.transloco.getActiveLang())
            },
            grid: { color: gridColor }
          }
        },
        plugins: {
          legend: {
            display: params.legend,
            labels: { color: foreground }
          }
        }
      },
      data: {
        labels,
        datasets: [
          {
            label: "Torrents",
            data: countData,
            borderColor: lineColor,
            backgroundColor: withAlpha(lineColor, 0.08),
            fill: true
          }
        ]
      }
    };
  }
  static {
    this.\u0275fac = function TorrentChartAdapterLibraryGrowth_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TorrentChartAdapterLibraryGrowth)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TorrentChartAdapterLibraryGrowth, factory: _TorrentChartAdapterLibraryGrowth.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TorrentChartAdapterLibraryGrowth, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/dashboard/torrents/torrent-chart-adapter.storage.ts
function formatBytes(bytes) {
  if (bytes === 0)
    return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, i);
  return `${value.toFixed(i > 0 ? 1 : 0)} ${units[i]}`;
}
var TorrentChartAdapterStorageGrowth = class _TorrentChartAdapterStorageGrowth {
  constructor() {
    this.themeInfo = inject(ThemeInfoService);
    this.transloco = inject(TranslocoService);
  }
  create(data, params) {
    const { colors } = this.themeInfo.info;
    const foreground = colors["foreground"];
    const gridColor = withAlpha(colors[createThemeColor("neutral-variant", 50)], 0.2);
    const labels = [];
    const sizeData = [];
    if (data) {
      for (const point of data) {
        labels.push(format(new Date(point.bucket), "d LLL H:mm", {
          locale: resolveDateLocale(this.transloco.getActiveLang())
        }));
        sizeData.push(point.totalSize);
      }
    }
    const lineColor = colors[createThemeColor("secondary", 50)];
    return {
      type: "line",
      options: {
        animation: { duration: 400 },
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: { tension: 0.3, borderWidth: 2 },
          point: { radius: 0, hitRadius: 8, hoverRadius: 4 }
        },
        scales: {
          x: {
            ticks: { color: foreground, maxTicksLimit: 12 },
            grid: { color: gridColor }
          },
          y: {
            beginAtZero: false,
            ticks: {
              color: foreground,
              callback: (v) => formatBytes(Number(v))
            },
            grid: { color: gridColor }
          }
        },
        plugins: {
          legend: {
            display: params.legend,
            labels: { color: foreground }
          },
          tooltip: {
            callbacks: {
              label: (context) => formatBytes(context.parsed.y ?? 0)
            }
          }
        }
      },
      data: {
        labels,
        datasets: [
          {
            label: "Storage",
            data: sizeData,
            borderColor: lineColor,
            backgroundColor: withAlpha(lineColor, 0.08),
            fill: true
          }
        ]
      }
    };
  }
  static {
    this.\u0275fac = function TorrentChartAdapterStorageGrowth_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TorrentChartAdapterStorageGrowth)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TorrentChartAdapterStorageGrowth, factory: _TorrentChartAdapterStorageGrowth.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TorrentChartAdapterStorageGrowth, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/dashboard/torrents/torrent-chart-adapter.content.ts
var contentTypeColors = {
  movie: "primary",
  tv_show: "secondary",
  music: "tertiary",
  ebook: "caution",
  game: "success",
  software: "error",
  audiobook: "neutral-variant",
  comic: "neutral",
  xxx: "neutral-variant"
};
function contentTypeLabel(type) {
  return type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
var TorrentChartAdapterContentBreakdown = class _TorrentChartAdapterContentBreakdown {
  constructor() {
    this.themeInfo = inject(ThemeInfoService);
  }
  create(data, params) {
    const { colors } = this.themeInfo.info;
    const foreground = colors["foreground"];
    const labels = [];
    const values = [];
    const bgColors = [];
    if (data) {
      for (const item of data) {
        labels.push(contentTypeLabel(item.contentType));
        values.push(item.count);
        const baseColor = contentTypeColors[item.contentType] ?? "neutral";
        bgColors.push(colors[createThemeColor(baseColor, 50)] ?? "rgb(128,128,128)");
      }
    }
    return {
      type: "doughnut",
      options: {
        animation: { animateRotate: true, duration: 600 },
        responsive: true,
        maintainAspectRatio: true,
        cutout: "65%",
        plugins: {
          legend: {
            display: params.legend,
            position: "left",
            labels: { color: foreground, boxWidth: 12 }
          }
        }
      },
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: bgColors,
            borderWidth: 0
          }
        ]
      }
    };
  }
  static {
    this.\u0275fac = function TorrentChartAdapterContentBreakdown_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TorrentChartAdapterContentBreakdown)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TorrentChartAdapterContentBreakdown, factory: _TorrentChartAdapterContentBreakdown.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TorrentChartAdapterContentBreakdown, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/dashboard/torrents/torrent-chart-adapter.classification.ts
var TorrentChartAdapterClassificationRate = class _TorrentChartAdapterClassificationRate {
  constructor() {
    this.themeInfo = inject(ThemeInfoService);
    this.transloco = inject(TranslocoService);
  }
  create(data, params) {
    const { colors } = this.themeInfo.info;
    const foreground = colors["foreground"];
    const gridColor = withAlpha(colors[createThemeColor("neutral-variant", 50)], 0.2);
    const labels = [];
    const rateData = [];
    if (data) {
      for (const point of data) {
        labels.push(format(new Date(point.bucket), "d LLL H:mm", {
          locale: resolveDateLocale(this.transloco.getActiveLang())
        }));
        const rate = point.totalCount > 0 ? point.classifiedCount / point.totalCount * 100 : 0;
        rateData.push(Math.round(rate * 100) / 100);
      }
    }
    const lineColor = colors[createThemeColor("tertiary", 50)];
    return {
      type: "line",
      options: {
        animation: { duration: 400 },
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: { tension: 0.3, borderWidth: 2 },
          point: { radius: 0, hitRadius: 8, hoverRadius: 4 }
        },
        scales: {
          x: {
            ticks: { color: foreground, maxTicksLimit: 12 },
            grid: { color: gridColor }
          },
          y: {
            min: 0,
            max: 100,
            ticks: {
              color: foreground,
              callback: (v) => `${v}%`
            },
            grid: { color: gridColor }
          }
        },
        plugins: {
          legend: {
            display: params.legend,
            labels: { color: foreground }
          },
          tooltip: {
            callbacks: {
              label: (context) => `${(context.parsed.y ?? 0).toFixed(2)}%`
            }
          }
        }
      },
      data: {
        labels,
        datasets: [
          {
            label: "Classification Rate",
            data: rateData,
            borderColor: lineColor,
            backgroundColor: withAlpha(lineColor, 0.08),
            fill: true
          }
        ]
      }
    };
  }
  static {
    this.\u0275fac = function TorrentChartAdapterClassificationRate_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TorrentChartAdapterClassificationRate)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TorrentChartAdapterClassificationRate, factory: _TorrentChartAdapterClassificationRate.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TorrentChartAdapterClassificationRate, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/dashboard/torrents/torrent-metrics.utils.ts
var createResult = (params, rawResult) => {
  const { bucketParams, earliestBucket } = createBucketParams(params, rawResult);
  const sources = Object.entries(rawResult.torrent.metrics.buckets.reduce((acc, next) => {
    if (next.source !== (params.source ?? next.source)) {
      return acc;
    }
    let bucket = normalizeBucket(next.bucket, bucketParams);
    if (earliestBucket && earliestBucket.index > bucket.index) {
      bucket = void 0;
    }
    if (!bucket) {
      return acc;
    }
    const currentEventBuckets = acc[next.source] ?? [];
    return __spreadProps(__spreadValues({}, acc), {
      [next.source]: {
        created: !next.updated ? __spreadProps(__spreadValues({}, currentEventBuckets.created), {
          [bucket.key]: {
            count: next.count + (currentEventBuckets.created?.[bucket.key]?.count ?? 0),
            startTime: bucket.start
          }
        }) : currentEventBuckets.created,
        updated: next.updated ? __spreadProps(__spreadValues({}, currentEventBuckets.updated), {
          [bucket.key]: {
            count: next.count + (currentEventBuckets.updated?.[bucket.key]?.count ?? 0),
            startTime: bucket.start
          }
        }) : currentEventBuckets.updated
      }
    });
  }, {})).map(([source, eventBuckets]) => {
    let events;
    if (Object.keys(eventBuckets).length) {
      const bucketDates = Array();
      const buckets = fromEntries(Array("created", "updated").flatMap((event) => {
        const entries = fromEntries(Object.entries(eventBuckets[event] ?? {}).filter(([, v]) => v?.count).sort(([a], [b]) => parseInt(a) < parseInt(b) ? 1 : -1));
        const keys = Object.keys(entries);
        if (!keys.length) {
          return [];
        }
        const earliestBucket2 = parseInt(keys[0]);
        const latestBucket = parseInt(keys[keys.length - 1]);
        bucketDates.push(earliestBucket2, latestBucket);
        return [
          [
            event,
            {
              earliestBucket: earliestBucket2,
              latestBucket,
              entries
            }
          ]
        ];
      }));
      bucketDates.sort();
      events = {
        bucketDuration: bucketParams.duration,
        earliestBucket: bucketDates[0],
        latestBucket: bucketDates[bucketDates.length - 1],
        eventBuckets: buckets
      };
    }
    return {
      source,
      events,
      isEmpty: !events?.eventBuckets
    };
  });
  let bucketSpan;
  const earliestFoundBucket = sources.flatMap((q) => q.events ? [q.events.earliestBucket] : []).sort()[0];
  const latestFoundBucket = sources.flatMap((q) => q.events ? [q.events.latestBucket] : []).sort().reverse()[0];
  if (earliestFoundBucket && latestFoundBucket) {
    bucketSpan = {
      earliestBucket: earliestFoundBucket,
      latestBucket: latestFoundBucket
    };
  }
  return {
    params: __spreadProps(__spreadValues({}, params), {
      buckets: bucketParams
    }),
    sourceSummaries: sources,
    bucketSpan,
    availableSources: rawResult.torrent.listSources.sources.map((s) => ({
      key: s.key,
      name: s.name
    }))
  };
};
var fromEntries = (entries) => Object.fromEntries(entries);
var createBucketParams = (params, rawResult) => {
  const duration = params.buckets.duration === "AUTO" ? "hour" : params.buckets.duration;
  let multiplier = params.buckets.multiplier === "AUTO" ? 1 : params.buckets.multiplier;
  const timeframe = params.buckets.timeframe;
  const now = /* @__PURE__ */ new Date();
  const nowBucket = normalizeBucket(now, { duration, multiplier });
  const startBucket = normalizeBucket(now.getTime() - 1e3 * timeframeLengths2[timeframe], {
    duration,
    multiplier
  });
  const allBuckets = [
    startBucket,
    ...rawResult.torrent.metrics.buckets.flatMap((b) => [
      normalizeBucket(b.bucket, { duration, multiplier })
    ]),
    nowBucket
  ].filter((b) => b.index >= startBucket.index).sort((a, b) => a.index - b.index);
  const minBucket = allBuckets[0];
  const maxBucket = allBuckets[allBuckets.length - 1];
  if (params.buckets.multiplier === "AUTO") {
    const targetSpan = 20;
    const span = maxBucket.index - minBucket.index;
    multiplier = Math.min(60, Math.max(Math.floor(span / (targetSpan * 5)) * 5, 1));
  }
  return {
    bucketParams: {
      duration,
      multiplier,
      timeframe
    },
    earliestBucket: normalizeBucket(now.getTime() - 1e3 * timeframeLengths2[timeframe], {
      duration,
      multiplier
    }),
    latestBucket: normalizeBucket(Math.max(now.getTime(), maxBucket.start.getTime()), { duration, multiplier })
  };
};
var normalizeBucket = (rawDate, params) => {
  const date = new Date(rawDate);
  const msMultiplier = 1e3 * durationSeconds[params.duration] * params.multiplier;
  const baseNumber = Math.floor(date.getTime() / msMultiplier);
  return {
    key: `${baseNumber}`,
    index: baseNumber,
    start: new Date(baseNumber * msMultiplier)
  };
};

// src/app/dashboard/torrents/torrent-metrics.constants.ts
var defaultBucketParams = {
  duration: "minute",
  multiplier: 1,
  timeframe: "hours_1"
};
var durationSeconds = {
  minute: 60,
  hour: 60 * 60,
  day: 60 * 60 * 24
};
var emptyParams = {
  buckets: defaultBucketParams,
  autoRefresh: "off"
};
var emptyRawResult = {
  torrent: {
    metrics: {
      buckets: []
    },
    listSources: {
      sources: [
        {
          key: "dht",
          name: "DHT"
        }
      ]
    }
  }
};
var eventNames = ["created", "updated"];
var timeframeNames2 = [
  "minutes_15",
  "minutes_30",
  "hours_1",
  "hours_6",
  "hours_12",
  "days_1",
  "weeks_1"
];
var timeframeLengths2 = {
  minutes_15: 60 * 15,
  minutes_30: 60 * 30,
  hours_1: 60 * 60,
  hours_6: 60 * 60 * 6,
  hours_12: 60 * 60 * 12,
  days_1: 60 * 60 * 24,
  weeks_1: 60 * 60 * 24 * 7
};
var autoRefreshIntervals2 = {
  off: null,
  seconds_10: 10,
  seconds_30: 30,
  minutes_1: 60,
  minutes_5: 60 * 5
};
var emptyResult2 = createResult(emptyParams, emptyRawResult);

// src/app/dashboard/torrents/torrent-chart-adapter.timeline.ts
var eventColors = {
  created: "primary",
  updated: "secondary"
};
var TorrentChartAdapterTimeline = class _TorrentChartAdapterTimeline {
  constructor() {
    this.themeInfo = inject(ThemeInfoService);
    this.transloco = inject(TranslocoService);
  }
  create(result, params) {
    const { colors } = this.themeInfo.info;
    const foreground = colors["foreground"];
    const gridColor = colors[createThemeColor("neutral-variant", 50)] + "33";
    const labels = Array();
    const datasets = [];
    if (result) {
      const nonEmptySources = result.sourceSummaries.filter((q) => !q.isEmpty);
      const nonEmptyBuckets = Array.from(new Set(nonEmptySources.flatMap((q) => q.events ? [q.events.earliestBucket, q.events.latestBucket] : []))).sort();
      const now = /* @__PURE__ */ new Date();
      const minBucket = Math.min(nonEmptyBuckets[0], normalizeBucket(now.getTime() - 1e3 * timeframeLengths2[result.params.buckets.timeframe], result.params.buckets).index);
      const maxBucket = Math.max(nonEmptyBuckets[nonEmptyBuckets.length - 1], normalizeBucket(now, result.params.buckets).index);
      if (nonEmptyBuckets.length) {
        for (let i = minBucket; i <= maxBucket; i++) {
          labels.push(this.formatBucketKey(result.params.buckets, i));
        }
        const relevantEvents = eventNames.filter((n) => (result.params.event ?? n) === n);
        for (const source of nonEmptySources) {
          for (const event of relevantEvents) {
            const series = Array();
            for (let i = minBucket; i <= maxBucket; i++) {
              series.push(source.events?.eventBuckets?.[event]?.entries?.[`${i}`]?.count ?? 0);
            }
            const label = [source.source, event].join("/");
            datasets.push({
              yAxisID: "yCount",
              label,
              data: series,
              hidden: params.hiddenDatasets.has(label) ? params.hiddenDatasets.get(label) : false,
              borderColor: colors[createThemeColor(eventColors[event], 50)],
              pointBackgroundColor: colors[createThemeColor(eventColors[event], 20)],
              pointBorderColor: colors[createThemeColor(eventColors[event], 80)],
              pointHoverBackgroundColor: colors[createThemeColor(eventColors[event], 40)],
              pointHoverBorderColor: colors[createThemeColor(eventColors[event], 60)]
            });
          }
        }
      }
    }
    return {
      type: "line",
      options: {
        animation: false,
        responsive: true,
        elements: {
          line: {
            tension: 0.5
          }
        },
        scales: {
          x: {
            ticks: { color: foreground },
            grid: { color: gridColor }
          },
          yCount: {
            position: "left",
            ticks: {
              color: foreground,
              callback: (v) => parseInt(v).toLocaleString(this.transloco.getActiveLang())
            },
            grid: { color: gridColor }
          }
        },
        plugins: {
          legend: {
            display: params.legend,
            onClick: params.legendOnClick,
            labels: { color: foreground }
          },
          decimation: {
            enabled: true
          }
        }
      },
      data: {
        labels,
        datasets
      }
    };
  }
  formatBucketKey(params, key) {
    let formatStr;
    switch (params.duration) {
      case "day":
        formatStr = "d LLL";
        break;
      case "hour":
        formatStr = "d LLL H:00";
        break;
      case "minute":
        formatStr = "H:mm";
        break;
    }
    return format(1e3 * durationSeconds[params.duration] * params.multiplier * key, formatStr, {
      locale: resolveDateLocale(this.transloco.getActiveLang())
    });
  }
  static {
    this.\u0275fac = function TorrentChartAdapterTimeline_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TorrentChartAdapterTimeline)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TorrentChartAdapterTimeline, factory: _TorrentChartAdapterTimeline.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TorrentChartAdapterTimeline, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/dashboard/torrents/torrent-metrics.controller.ts
var TorrentMetricsController = class {
  constructor(apollo, initParams = emptyParams, errorsService) {
    this.apollo = apollo;
    this.errorsService = errorsService;
    this.rawResultSubject = new BehaviorSubject(emptyRawResult);
    this.resultSubject = new BehaviorSubject(emptyResult2);
    this.result$ = this.resultSubject.asObservable();
    this.loadingSubject = new BehaviorSubject(false);
    this.paramsSubject = new BehaviorSubject(initParams);
    this.params$ = this.paramsSubject.asObservable();
    this.variablesSubject = new BehaviorSubject(createVariables(initParams));
    this.paramsSubject.pipe(debounceTime(50)).subscribe((params) => {
      const variables = this.variablesSubject.getValue();
      const nextVariables = createVariables(params);
      if (JSON.stringify(variables) !== JSON.stringify(nextVariables)) {
        this.variablesSubject.next(nextVariables);
      } else {
        this.resultSubject.next(createResult(params, this.rawResultSubject.getValue()));
      }
    });
    this.variablesSubject.pipe(debounceTime(50)).subscribe((variables) => this.request(variables));
    this.rawResultSubject.subscribe((rawResult) => {
      const params = this.paramsSubject.getValue();
      this.resultSubject.next(createResult(params, rawResult));
      this.setInterval(params.autoRefresh);
    });
  }
  setInterval(interval) {
    clearTimeout(this.refreshTimeout);
    const delay = autoRefreshIntervals2[interval ?? this.params.autoRefresh];
    if (delay) {
      this.refreshTimeout = setTimeout(() => {
        this.refresh();
      }, delay * 1e3);
    }
  }
  get params() {
    return this.paramsSubject.getValue();
  }
  get bucketDuration() {
    const d = this.params.buckets.duration;
    if (d === "AUTO") {
      return "hour";
    }
    return d;
  }
  get bucketMultiplier() {
    return this.resultSubject.getValue().params.buckets.multiplier ?? this.params.buckets.multiplier;
  }
  get loading() {
    return this.loadingSubject.getValue();
  }
  setTimeframe(timeframe) {
    this.updateParams((p) => __spreadProps(__spreadValues({}, p), {
      buckets: __spreadProps(__spreadValues({}, p.buckets), {
        timeframe
      })
    }));
  }
  setSource(source) {
    this.updateParams((p) => __spreadProps(__spreadValues({}, p), {
      source: source ?? void 0
    }));
  }
  setBucketDuration(duration, multiplier) {
    this.updateParams((p) => __spreadProps(__spreadValues({}, p), {
      buckets: __spreadProps(__spreadValues({}, p.buckets), {
        duration,
        multiplier: multiplier ?? "AUTO"
      })
    }));
  }
  setBucketMultiplier(multiplier) {
    this.updateParams((p) => __spreadProps(__spreadValues({}, p), {
      buckets: __spreadProps(__spreadValues({}, p.buckets), {
        multiplier
      })
    }));
  }
  setEvent(event) {
    this.updateParams((p) => __spreadProps(__spreadValues({}, p), {
      event: event ?? void 0
    }));
  }
  setAutoRefreshInterval(autoRefreshInterval) {
    this.updateParams((p) => __spreadProps(__spreadValues({}, p), {
      autoRefresh: autoRefreshInterval
    }));
  }
  updateParams(fn) {
    this.paramsSubject.next(fn(this.params));
  }
  refresh() {
    this.variablesSubject.next(this.variablesSubject.getValue());
  }
  request(variables) {
    clearTimeout(this.refreshTimeout);
    this.loadingSubject.next(true);
    return this.apollo.query({
      query: TorrentMetricsDocument,
      variables,
      fetchPolicy: "no-cache"
    }).pipe(map((r) => {
      if (r) {
        this.loadingSubject.next(false);
        this.rawResultSubject.next(r.data);
      }
    })).pipe(catchError((err) => {
      this.errorsService.addError(`Failed to load torrent metrics: ${err.message}`);
      this.loadingSubject.next(false);
      this.setInterval();
      return EMPTY;
    })).subscribe();
  }
};
var createVariables = (params) => ({
  input: {
    bucketDuration: params.buckets.duration === "AUTO" ? "hour" : params.buckets.duration,
    sources: params.source ? [params.source] : void 0,
    startTime: new Date((/* @__PURE__ */ new Date()).getTime() - 1e3 * timeframeLengths2[params.buckets.timeframe]).toISOString()
  }
});

// src/app/dashboard/torrents/torrents-dashboard.component.ts
var _c0 = (a0, a1) => [a0, a1];
function TorrentsDashboardComponent_ng_container_0_For_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-button-toggle", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const name_r3 = ctx.$implicit;
    const t_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("value", name_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", t_r4("dashboard.interval." + name_r3), " ");
  }
}
function TorrentsDashboardComponent_ng_container_0_For_32_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function TorrentsDashboardComponent_ng_container_0_For_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 15);
    \u0275\u0275listener("click", function TorrentsDashboardComponent_ng_container_0_For_32_Template_button_click_0_listener() {
      const name_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.metricsController.setAutoRefreshInterval(name_r6));
    });
    \u0275\u0275conditionalCreate(1, TorrentsDashboardComponent_ng_container_0_For_32_Conditional_1_Template, 2, 0, "mat-icon");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const name_r6 = ctx.$implicit;
    const t_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.metricsController.params.autoRefresh === name_r6 ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", t_r4("dashboard.interval." + name_r6), " ");
  }
}
function TorrentsDashboardComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "app-document-title", 2);
    \u0275\u0275elementStart(2, "div", 3)(3, "div", 4)(4, "mat-card", 5)(5, "mat-card-content")(6, "div", 6);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 7);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "mat-card", 5)(12, "mat-card-content")(13, "div", 8);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 7);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(17, "div", 9);
    \u0275\u0275element(18, "app-chart", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 11)(20, "mat-button-toggle-group", 12);
    \u0275\u0275listener("change", function TorrentsDashboardComponent_ng_container_0_Template_mat_button_toggle_group_change_20_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.metricsController.setTimeframe($event.value));
    });
    \u0275\u0275repeaterCreate(21, TorrentsDashboardComponent_ng_container_0_For_22_Template, 2, 2, "mat-button-toggle", 13, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "button", 14)(24, "mat-icon");
    \u0275\u0275text(25, "sync");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "mat-menu", null, 0)(28, "button", 15);
    \u0275\u0275listener("click", function TorrentsDashboardComponent_ng_container_0_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.metricsController.refresh());
    });
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275element(30, "mat-divider");
    \u0275\u0275repeaterCreate(31, TorrentsDashboardComponent_ng_container_0_For_32_Template, 3, 2, "button", 16, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 17);
    \u0275\u0275element(34, "app-chart", 10)(35, "app-chart", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 18);
    \u0275\u0275element(37, "app-chart", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 18);
    \u0275\u0275element(39, "app-chart", 10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const t_r4 = ctx.$implicit;
    const refreshMenu_r7 = \u0275\u0275reference(27);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("parts", \u0275\u0275pureFunction2(31, _c0, t_r4("routes.torrents"), t_r4("routes.dashboard")));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 29, ctx_r1.totalTorrents));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r4("dashboard.torrents.total_torrents"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.totalSize || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r4("dashboard.torrents.total_size"));
    \u0275\u0275advance(2);
    \u0275\u0275property("title", "")("$data", ctx_r1.contentBreakdown$)("adapter", ctx_r1.contentAdapter)("height", 80);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", ctx_r1.metricsController.params.timeframe);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.timeframeNames);
    \u0275\u0275advance(2);
    \u0275\u0275property("matMenuTriggerFor", refreshMenu_r7)("matTooltip", t_r4("dashboard.dht.auto_refresh") + ": " + t_r4("dashboard.interval." + ctx_r1.metricsController.params.autoRefresh));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", t_r4("dashboard.dht.refresh_now"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.autoRefreshIntervalNames);
    \u0275\u0275advance(3);
    \u0275\u0275property("title", t_r4("dashboard.torrents.library_growth"))("$data", ctx_r1.snapshots$)("adapter", ctx_r1.libraryGrowthAdapter)("height", 250);
    \u0275\u0275advance();
    \u0275\u0275property("title", t_r4("dashboard.torrents.storage_growth"))("$data", ctx_r1.snapshots$)("adapter", ctx_r1.storageGrowthAdapter)("height", 250);
    \u0275\u0275advance(2);
    \u0275\u0275property("title", t_r4("dashboard.torrents.classification_rate"))("$data", ctx_r1.snapshots$)("adapter", ctx_r1.classificationRateAdapter)("height", 250);
    \u0275\u0275advance(2);
    \u0275\u0275property("title", t_r4("dashboard.torrents.throughput"))("$data", ctx_r1.throughputController.result$)("adapter", ctx_r1.throughputAdapter)("height", 250);
  }
}
function formatBytes2(bytes) {
  if (bytes === 0)
    return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, i);
  return `${value.toFixed(i > 0 ? 1 : 0)} ${units[i]}`;
}
var TorrentsDashboardComponent = class _TorrentsDashboardComponent {
  constructor() {
    this.apollo = inject(Apollo);
    this.errorsService = inject(ErrorsService);
    this.metricsController = new TorrentLibraryMetricsController(this.apollo, { timeframe: "hours_6", autoRefresh: "minutes_1" }, this.errorsService);
    this.throughputController = new TorrentMetricsController(this.apollo, {
      buckets: defaultBucketParams,
      autoRefresh: "off"
    }, this.errorsService);
    this.libraryGrowthAdapter = inject(TorrentChartAdapterLibraryGrowth);
    this.storageGrowthAdapter = inject(TorrentChartAdapterStorageGrowth);
    this.contentAdapter = inject(TorrentChartAdapterContentBreakdown);
    this.classificationRateAdapter = inject(TorrentChartAdapterClassificationRate);
    this.throughputAdapter = inject(TorrentChartAdapterTimeline);
    this.timeframeNames = timeframeNames;
    this.autoRefreshIntervalNames = autoRefreshIntervalNames;
    this.totalTorrents = 0;
    this.totalSize = "";
  }
  ngOnInit() {
    this.snapshots$ = this.metricsController.result$.pipe(map((r) => r.snapshots));
    this.contentBreakdown$ = this.metricsController.result$.pipe(map((r) => r.contentBreakdown));
    this.sub = this.metricsController.result$.subscribe((r) => {
      if (r.snapshots.length > 0) {
        const latest = r.snapshots[r.snapshots.length - 1];
        this.totalTorrents = latest.totalCount;
        this.totalSize = formatBytes2(latest.totalSize);
      }
    });
    this.metricsController.params$.subscribe((params) => {
      const tfIndex = timeframeNames.indexOf(params.timeframe);
      if (tfIndex >= 0 && tfIndex < timeframeNames2.length) {
        this.throughputController.setTimeframe(timeframeNames2[tfIndex]);
      }
    });
  }
  ngOnDestroy() {
    this.metricsController.destroy();
    this.throughputController.setAutoRefreshInterval("off");
    this.sub?.unsubscribe();
  }
  static {
    this.\u0275fac = function TorrentsDashboardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TorrentsDashboardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TorrentsDashboardComponent, selectors: [["app-torrents"]], decls: 1, vars: 0, consts: [["refreshMenu", "matMenu"], [4, "transloco"], [3, "parts"], [1, "torrent-dashboard"], [1, "torrent-stats-grid"], [1, "torrent-stat-card"], [1, "torrent-stat-number"], [1, "torrent-stat-label"], [1, "torrent-stat-number", "torrent-stat-number-sm"], [1, "torrent-composition"], [3, "title", "$data", "adapter", "height"], [1, "torrent-controls"], [3, "change", "value"], [3, "value"], ["mat-icon-button", "", 3, "matMenuTriggerFor", "matTooltip"], ["mat-menu-item", "", 3, "click"], ["mat-menu-item", ""], [1, "torrent-charts"], [1, "torrent-charts-full"]], template: function TorrentsDashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, TorrentsDashboardComponent_ng_container_0_Template, 40, 34, "ng-container", 1);
      }
    }, dependencies: [AppModule, MatIconButton, MatButtonToggleGroup, MatButtonToggle, MatCard, MatCardContent, MatDivider, MatIcon, MatMenu, MatMenuItem, MatMenuTrigger, MatTooltip, TranslocoDirective, ChartComponent, GraphQLModule, DocumentTitleComponent, DecimalPipe], styles: ["\n\n.torrent-dashboard[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n.torrent-stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n  margin-bottom: 20px;\n}\n.torrent-stat-card[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.torrent-stat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  padding: 14px 12px 8px;\n}\n.torrent-stat-number[_ngcontent-%COMP%] {\n  font-size: 26px;\n  font-weight: 600;\n  font-variant-numeric: tabular-nums;\n  line-height: 1.2;\n}\n.torrent-stat-number-sm[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.torrent-stat-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  opacity: 0.5;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-top: 4px;\n}\n.torrent-composition[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  max-width: 280px;\n}\n.torrent-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.torrent-controls[_ngcontent-%COMP%]   mat-button-toggle-group[_ngcontent-%COMP%] {\n  --mat-standard-button-toggle-height: 32px;\n}\n.torrent-charts[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 16px;\n  grid-template-columns: 1fr 1fr;\n}\n.torrent-charts-full[_ngcontent-%COMP%] {\n  margin-top: 16px;\n}\n@media (max-width: 900px) {\n  .torrent-charts[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=torrents-dashboard.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TorrentsDashboardComponent, [{
    type: Component,
    args: [{ selector: "app-torrents", standalone: true, imports: [AppModule, ChartComponent, GraphQLModule, DocumentTitleComponent], template: `<ng-container *transloco="let t">
  <app-document-title [parts]="[t('routes.torrents'), t('routes.dashboard')]" />
  <div class="torrent-dashboard">
    <!-- Stat Cards -->
    <div class="torrent-stats-grid">
      <mat-card class="torrent-stat-card">
        <mat-card-content>
          <div class="torrent-stat-number">{{ totalTorrents | number }}</div>
          <div class="torrent-stat-label">{{ t("dashboard.torrents.total_torrents") }}</div>
        </mat-card-content>
      </mat-card>
      <mat-card class="torrent-stat-card">
        <mat-card-content>
          <div class="torrent-stat-number torrent-stat-number-sm">{{ totalSize || "\u2014" }}</div>
          <div class="torrent-stat-label">{{ t("dashboard.torrents.total_size") }}</div>
        </mat-card-content>
      </mat-card>
    </div>

    <!-- Content Breakdown -->
    <div class="torrent-composition">
      <app-chart
        [title]="''"
        [$data]="contentBreakdown$"
        [adapter]="contentAdapter"
        [height]="80"
      />
    </div>

    <!-- Controls -->
    <div class="torrent-controls">
      <mat-button-toggle-group
        [value]="metricsController.params.timeframe"
        (change)="metricsController.setTimeframe($event.value)"
      >
        @for (name of timeframeNames; track name) {
          <mat-button-toggle [value]="name">
            {{ t("dashboard.interval." + name) }}
          </mat-button-toggle>
        }
      </mat-button-toggle-group>

      <button
        mat-icon-button
        [matMenuTriggerFor]="refreshMenu"
        [matTooltip]="t('dashboard.dht.auto_refresh') + ': ' + t('dashboard.interval.' + metricsController.params.autoRefresh)"
      >
        <mat-icon>sync</mat-icon>
      </button>
      <mat-menu #refreshMenu="matMenu">
        <button mat-menu-item (click)="metricsController.refresh()">
          {{ t("dashboard.dht.refresh_now") }}
        </button>
        <mat-divider />
        @for (name of autoRefreshIntervalNames; track name) {
          <button
            mat-menu-item
            (click)="metricsController.setAutoRefreshInterval(name)"
          >
            @if (metricsController.params.autoRefresh === name) {
              <mat-icon>check</mat-icon>
            }
            {{ t("dashboard.interval." + name) }}
          </button>
        }
      </mat-menu>
    </div>

    <!-- Charts -->
    <div class="torrent-charts">
      <app-chart
        [title]="t('dashboard.torrents.library_growth')"
        [$data]="snapshots$"
        [adapter]="libraryGrowthAdapter"
        [height]="250"
      />
      <app-chart
        [title]="t('dashboard.torrents.storage_growth')"
        [$data]="snapshots$"
        [adapter]="storageGrowthAdapter"
        [height]="250"
      />
    </div>
    <div class="torrent-charts-full">
      <app-chart
        [title]="t('dashboard.torrents.classification_rate')"
        [$data]="snapshots$"
        [adapter]="classificationRateAdapter"
        [height]="250"
      />
    </div>
    <div class="torrent-charts-full">
      <app-chart
        [title]="t('dashboard.torrents.throughput')"
        [$data]="throughputController.result$"
        [adapter]="throughputAdapter"
        [height]="250"
      />
    </div>
  </div>
</ng-container>
`, styles: ["/* src/app/dashboard/torrents/torrents-dashboard.component.scss */\n.torrent-dashboard {\n  padding: 16px;\n}\n.torrent-stats-grid {\n  display: grid;\n  gap: 12px;\n  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n  margin-bottom: 20px;\n}\n.torrent-stat-card {\n  text-align: center;\n}\n.torrent-stat-card mat-card-content {\n  padding: 14px 12px 8px;\n}\n.torrent-stat-number {\n  font-size: 26px;\n  font-weight: 600;\n  font-variant-numeric: tabular-nums;\n  line-height: 1.2;\n}\n.torrent-stat-number-sm {\n  font-size: 16px;\n}\n.torrent-stat-label {\n  font-size: 11px;\n  opacity: 0.5;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-top: 4px;\n}\n.torrent-composition {\n  margin-bottom: 16px;\n  max-width: 280px;\n}\n.torrent-controls {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.torrent-controls mat-button-toggle-group {\n  --mat-standard-button-toggle-height: 32px;\n}\n.torrent-charts {\n  display: grid;\n  gap: 16px;\n  grid-template-columns: 1fr 1fr;\n}\n.torrent-charts-full {\n  margin-top: 16px;\n}\n@media (max-width: 900px) {\n  .torrent-charts {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=torrents-dashboard.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TorrentsDashboardComponent, { className: "TorrentsDashboardComponent", filePath: "src/app/dashboard/torrents/torrents-dashboard.component.ts", lineNumber: 44 });
})();
export {
  TorrentsDashboardComponent
};
//# sourceMappingURL=chunk-2OTUUZ2H.js.map
