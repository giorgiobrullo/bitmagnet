import {
  autoRefreshIntervalNames,
  autoRefreshIntervals,
  availableQueueNames,
  durationSeconds,
  emptyParams,
  emptyResult,
  emptyStatusCounts,
  eventNames,
  resolutionNames,
  statusNames,
  timeframeLengths,
  timeframeNames
} from "./chunk-GSQBVGUV.js";
import {
  formatDuration
} from "./chunk-YTGJFPX5.js";
import {
  ChartComponent,
  createThemeColor,
  format
} from "./chunk-XTQK5OXZ.js";
import {
  ThemeInfoService
} from "./chunk-UQ3IWFEE.js";
import "./chunk-SPPBVMMP.js";
import {
  resolveDateLocale
} from "./chunk-GPFHSAQX.js";
import {
  ErrorsService
} from "./chunk-5K6VXQU2.js";
import {
  BreakpointsService
} from "./chunk-4IHHGFOU.js";
import {
  DocumentTitleComponent
} from "./chunk-MNRKI74J.js";
import {
  Apollo,
  AppModule,
  GraphQLModule,
  MatButton,
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
  MatDialogClose,
  MatDialogModule,
  MatFormField,
  MatGridList,
  MatGridTile,
  MatIcon,
  MatIconButton,
  MatInput,
  MatMenu,
  MatMenuItem,
  MatOption,
  MatProgressBar,
  MatSelect,
  MatTooltip,
  QueueMetricsDocument,
  TranslocoDirective,
  TranslocoService
} from "./chunk-G4Q67IMQ.js";
import {
  AsyncPipe
} from "./chunk-7NLLN7HY.js";
import {
  BehaviorSubject,
  Component,
  EMPTY,
  Injectable,
  NgModule,
  __spreadProps,
  __spreadValues,
  catchError,
  debounceTime,
  inject,
  map,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
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
  ɵɵpureFunction3,
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

// src/app/dashboard/queue/queue.module.ts
var QueueModule = class _QueueModule {
  static {
    this.\u0275fac = function QueueModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _QueueModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _QueueModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      GraphQLModule,
      MatIcon,
      MatDialogModule,
      MatButton,
      MatIconButton,
      MatCard,
      MatCardHeader,
      MatGridTile,
      MatMenu,
      MatMenuItem,
      ChartComponent
    ] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QueueModule, [{
    type: NgModule,
    args: [{
      imports: [
        GraphQLModule,
        TranslocoDirective,
        MatIcon,
        MatTooltip,
        AsyncPipe,
        MatDialogModule,
        MatButton,
        MatDialogClose,
        MatIconButton,
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatCardTitle,
        MatGridTile,
        MatMenu,
        MatMenuItem,
        ChartComponent
      ]
    }]
  }], null, null);
})();

// src/app/dashboard/queue/queue-chart-adapter.totals.ts
var statusColors = {
  pending: "primary",
  processed: "success",
  failed: "error",
  retry: "caution"
};
var QueueChartAdapterTotals = class _QueueChartAdapterTotals {
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
      const bucketKeys = Array.from(new Set(result.queues.flatMap((q) => q.events ? [q.events.earliestBucket, q.events.latestBucket] : []))).sort();
      if (bucketKeys.length) {
        const nonEmptyQueues = result.queues.filter((q) => !q.isEmpty);
        labels.push(...nonEmptyQueues.map((q) => q.queue));
        const statuses = Array();
        switch (result.params.event) {
          case "created":
            statuses.push("pending");
            break;
          case "processed":
            statuses.push("processed");
            break;
          case "failed":
            statuses.push("retry", "failed");
            break;
          default:
            statuses.push(...statusNames);
            break;
        }
        datasets.push(...statuses.map((status) => ({
          label: this.transloco.translate("dashboard.queues." + status),
          data: nonEmptyQueues.map((q) => q.statusCounts[status]),
          backgroundColor: colors[createThemeColor(statusColors[status], 50)]
        })));
      }
    }
    return {
      type: "bar",
      options: {
        animation: false,
        responsive: true,
        scales: {
          x: {
            ticks: {
              color: foreground,
              callback: (v) => parseInt(v).toLocaleString(this.transloco.getActiveLang())
            },
            grid: { color: gridColor }
          },
          y: {
            ticks: { color: foreground },
            grid: { color: gridColor }
          }
        },
        indexAxis: "y",
        plugins: {
          legend: {
            display: params.legend,
            labels: { color: foreground }
          }
        }
      },
      data: {
        labels,
        datasets
      }
    };
  }
  static {
    this.\u0275fac = function QueueChartAdapterTotals_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _QueueChartAdapterTotals)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _QueueChartAdapterTotals, factory: _QueueChartAdapterTotals.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QueueChartAdapterTotals, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/dates/parse-duration.ts
var numbers = "\\d+";
var fractionalNumbers = "".concat(numbers, "(?:[\\.,]").concat(numbers, ")?");
var datePattern = "(".concat(numbers, "Y)?(").concat(numbers, "M)?(").concat(numbers, "W)?(").concat(numbers, "D)?");
var timePattern = "T(".concat(fractionalNumbers, "H)?(").concat(fractionalNumbers, "M)?(").concat(fractionalNumbers, "S)?");
var iso8601 = "P(?:".concat(datePattern, "(?:").concat(timePattern, ")?)");
var objMap = [
  "years",
  "months",
  "weeks",
  "days",
  "hours",
  "minutes",
  "seconds"
];
var defaultDuration = {
  years: 0,
  months: 0,
  weeks: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
};
var durationPattern = new RegExp(iso8601);
var parseDuration = function(durationString) {
  const matches = durationString.replace(/,/g, ".").match(durationPattern);
  if (!matches) {
    throw new RangeError("invalid duration: ".concat(durationString));
  }
  const slicedMatches = matches.slice(1);
  if (slicedMatches.filter(function(v) {
    return v != null;
  }).length === 0) {
    throw new RangeError("invalid duration: ".concat(durationString));
  }
  if (slicedMatches.filter(function(v) {
    return /\./.test(v || "");
  }).length > 1) {
    throw new RangeError("only the smallest unit can be fractional");
  }
  return slicedMatches.reduce(function(prev, next, idx) {
    Object.assign(prev, { [objMap[idx]]: parseFloat(next || "0") || 0 });
    return prev;
  }, {});
};
var end = function(durationInput, startDate) {
  if (!startDate) {
    startDate = /* @__PURE__ */ new Date();
  }
  const duration = Object.assign({}, defaultDuration, durationInput);
  const timestamp = startDate.getTime();
  const then = new Date(timestamp);
  then.setFullYear(then.getFullYear() + duration.years);
  then.setMonth(then.getMonth() + duration.months);
  then.setDate(then.getDate() + duration.days);
  const hoursInMs = duration.hours * 3600 * 1e3;
  const minutesInMs = duration.minutes * 60 * 1e3;
  then.setMilliseconds(then.getMilliseconds() + duration.seconds * 1e3 + hoursInMs + minutesInMs);
  then.setDate(then.getDate() + duration.weeks * 7);
  return then;
};
var durationToSeconds = function(durationInput, startDate) {
  if (!startDate) {
    startDate = /* @__PURE__ */ new Date();
  }
  const duration = Object.assign({}, defaultDuration, durationInput);
  const timestamp = startDate.getTime();
  const now = new Date(timestamp);
  const then = end(duration, now);
  const tzStart = startDate.getTimezoneOffset();
  const tzEnd = then.getTimezoneOffset();
  const tzOffsetSeconds = (tzStart - tzEnd) * 60;
  const seconds = (then.getTime() - now.getTime()) / 1e3;
  return seconds + tzOffsetSeconds;
};

// src/app/dashboard/queue/queue-metrics.controller.ts
var QueueMetricsController = class {
  constructor(apollo, initParams = emptyParams, errorsService) {
    this.apollo = apollo;
    this.errorsService = errorsService;
    this.rawResultSubject = new BehaviorSubject({
      queue: {
        metrics: {
          buckets: []
        }
      }
    });
    this.resultSubject = new BehaviorSubject(emptyResult);
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
    const delay = autoRefreshIntervals[interval ?? this.params.autoRefresh];
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
  setQueue(queue) {
    this.updateParams((p) => __spreadProps(__spreadValues({}, p), {
      queue: queue ?? void 0
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
      query: QueueMetricsDocument,
      variables,
      fetchPolicy: "no-cache"
    }).pipe(map((r) => {
      if (r) {
        this.loadingSubject.next(false);
        this.rawResultSubject.next(r.data);
      }
    })).pipe(catchError((err) => {
      this.errorsService.addError(`Failed to load queue metrics: ${err.message}`);
      this.loadingSubject.next(false);
      this.setInterval();
      return EMPTY;
    })).subscribe();
  }
};
var createVariables = (params) => ({
  input: {
    bucketDuration: params.buckets.duration === "AUTO" ? "hour" : params.buckets.duration,
    queues: params.queue ? [params.queue] : void 0,
    startTime: params.buckets.timeframe === "all" ? void 0 : new Date((/* @__PURE__ */ new Date()).getTime() - 1e3 * timeframeLengths[params.buckets.timeframe]).toISOString()
  }
});
var fromEntries = (entries) => Object.fromEntries(entries);
var createResult = (params, rawResult) => {
  const { bucketParams, earliestBucket, latestBucket } = createBucketParams(params, rawResult);
  const queues = Object.entries(rawResult.queue.metrics.buckets.reduce((acc, next) => {
    if (next.queue !== (params.queue ?? next.queue)) {
      return acc;
    }
    let createdAt;
    let ranAt;
    if (params.event ?? true) {
      createdAt = normalizeBucket(next.createdAtBucket, bucketParams);
      if (earliestBucket && earliestBucket.index > createdAt.index) {
        createdAt = void 0;
      }
    }
    if (next.ranAtBucket && params.event !== "created") {
      ranAt = normalizeBucket(next.ranAtBucket, bucketParams);
      if (ranAt && (latestBucket.index < ranAt.index || earliestBucket && earliestBucket.index > ranAt.index)) {
        ranAt = void 0;
      }
    }
    if (next.queue !== params.queue && !createdAt && (!ranAt || next.status === "pending")) {
      return acc;
    }
    const [currentStatusCounts, currentEventBuckets] = acc[next.queue] ?? [
      emptyStatusCounts,
      []
    ];
    const currentLatency = next.latency ? durationToSeconds(parseDuration(next.latency)) : void 0;
    return __spreadProps(__spreadValues({}, acc), {
      [next.queue]: [
        (next.status === "pending" ? createdAt : ranAt) ? __spreadProps(__spreadValues({}, currentStatusCounts), {
          [next.status]: next.count + currentStatusCounts[next.status]
        }) : currentStatusCounts,
        {
          created: createdAt ? __spreadProps(__spreadValues({}, currentEventBuckets.created), {
            [createdAt.key]: {
              count: next.count + (currentEventBuckets.created?.[createdAt.key]?.count ?? 0),
              latency: 0,
              startTime: createdAt.start
            }
          }) : currentEventBuckets.created,
          processed: ranAt && next.status === "processed" && (params.event ?? true) ? __spreadProps(__spreadValues({}, currentEventBuckets.processed), {
            [ranAt.key]: {
              count: next.count + (currentEventBuckets.processed?.[ranAt.key]?.count ?? 0),
              latency: (currentEventBuckets.processed?.[ranAt.key]?.latency ?? 0) + (currentLatency ?? 0),
              startTime: ranAt.start
            }
          }) : currentEventBuckets.processed,
          failed: ranAt && next.status === "failed" && (params.event ?? true) ? __spreadProps(__spreadValues({}, currentEventBuckets.failed), {
            [ranAt.key]: {
              count: next.count + (currentEventBuckets.failed?.[ranAt.key]?.count ?? 0),
              latency: (currentEventBuckets.failed?.[ranAt.key]?.latency ?? 0) + (currentLatency ?? 0),
              startTime: ranAt.start
            }
          }) : currentEventBuckets.failed
        }
      ]
    });
  }, {})).map(([queue, [statusCounts, eventBuckets]]) => {
    let events;
    if (Object.keys(eventBuckets).length) {
      const bucketDates = Array();
      const buckets = fromEntries(Array("created", "processed", "failed").flatMap((event) => {
        const entries = fromEntries(Object.entries(eventBuckets[event] ?? {}).filter(([, v]) => v?.count).sort(([a], [b]) => parseInt(a) < parseInt(b) ? 1 : -1));
        const keys = Object.keys(entries);
        if (!keys.length) {
          return [];
        }
        const earliestBucket2 = parseInt(keys[0]);
        const latestBucket2 = parseInt(keys[keys.length - 1]);
        bucketDates.push(earliestBucket2, latestBucket2);
        return [
          [
            event,
            {
              earliestBucket: earliestBucket2,
              latestBucket: latestBucket2,
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
      queue,
      statusCounts,
      events,
      isEmpty: !events?.eventBuckets
    };
  });
  let bucketSpan;
  const earliestFoundBucket = queues.flatMap((q) => q.events ? [q.events.earliestBucket] : []).sort()[0];
  const latestFoundBucket = queues.flatMap((q) => q.events ? [q.events.latestBucket] : []).sort().reverse()[0];
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
    queues,
    bucketSpan
  };
};
var createBucketParams = (params, rawResult) => {
  const duration = params.buckets.duration === "AUTO" ? "hour" : params.buckets.duration;
  let multiplier = params.buckets.multiplier === "AUTO" ? 1 : params.buckets.multiplier;
  const timeframe = params.buckets.timeframe;
  const now = /* @__PURE__ */ new Date();
  const nowBucket = normalizeBucket(now, { duration, multiplier });
  const startBucket = timeframe === "all" ? void 0 : normalizeBucket(now.getTime() - 1e3 * timeframeLengths[timeframe], {
    duration,
    multiplier
  });
  const allBuckets = [
    ...startBucket ? [startBucket] : [],
    ...rawResult.queue.metrics.buckets.flatMap((b) => [
      normalizeBucket(b.createdAtBucket, { duration, multiplier }),
      ...b.ranAtBucket ? [normalizeBucket(b.ranAtBucket, { duration, multiplier })] : []
    ]),
    nowBucket
  ].filter((b) => !startBucket || b.index >= startBucket.index).sort((a, b) => a.index - b.index);
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
    earliestBucket: timeframe === "all" ? void 0 : normalizeBucket(now.getTime() - 1e3 * timeframeLengths[timeframe], {
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

// src/app/dashboard/queue/queue-chart-adapter.timeline.ts
var eventColors = {
  created: "primary",
  processed: "success",
  failed: "error"
};
var QueueChartAdapterTimeline = class _QueueChartAdapterTimeline {
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
      const nonEmptyQueues = result.queues.filter((q) => !q.isEmpty);
      const nonEmptyBuckets = Array.from(new Set(nonEmptyQueues.flatMap((q) => q.events ? [q.events.earliestBucket, q.events.latestBucket] : []))).sort();
      const now = /* @__PURE__ */ new Date();
      const minBucket = result.params.buckets.timeframe === "all" ? nonEmptyBuckets[0] : Math.min(nonEmptyBuckets[0], normalizeBucket(now.getTime() - 1e3 * timeframeLengths[result.params.buckets.timeframe], result.params.buckets).index);
      const maxBucket = Math.max(nonEmptyBuckets[nonEmptyBuckets.length - 1], normalizeBucket(now, result.params.buckets).index);
      if (nonEmptyBuckets.length) {
        for (let i = minBucket; i <= maxBucket; i++) {
          labels.push(this.formatBucketKey(result.params.buckets, i));
        }
        const relevantEvents = eventNames.filter((n) => (result.params.event ?? n) === n);
        for (const queue of nonEmptyQueues) {
          for (const event of relevantEvents) {
            const series = Array();
            for (let i = minBucket; i <= maxBucket; i++) {
              series.push(queue.events?.eventBuckets?.[event]?.entries?.[`${i}`]?.count ?? 0);
            }
            const label = queue.queue + ": " + this.transloco.translate("dashboard.queues." + event);
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
          const latencyEvents = ["processed", "failed"].filter((e) => relevantEvents.includes(e));
          if (latencyEvents.length) {
            const latencySeries = Array();
            for (let i = minBucket; i <= maxBucket; i++) {
              const result2 = ["processed", "failed"].filter((e) => relevantEvents.includes(e)).reduce((acc, next) => {
                const entry = queue.events?.eventBuckets?.[next]?.entries?.[`${i}`];
                if (!entry?.count) {
                  return acc;
                }
                return [
                  (acc?.[0] ?? 0) + entry.latency,
                  (acc?.[1] ?? 0) + entry.count
                ];
              }, null);
              latencySeries.push(result2 ? result2[0] / result2[1] : null);
            }
            const label = queue.queue + ": " + this.transloco.translate("dashboard.queues.latency");
            datasets.push({
              yAxisID: "yLatency",
              label,
              hidden: params.hiddenDatasets.has(label) ? params.hiddenDatasets.get(label) : false,
              data: latencySeries,
              // fill: 'origin',
              // backgroundColor: 'rgba(148,159,177,0.2)',
              borderColor: colors["tertiary-50"],
              // pointBackgroundColor: 'rgba(148,159,177,1)',
              // pointBorderColor: '#fff',
              pointHoverBackgroundColor: colors["tertiary-80"],
              pointHoverBorderColor: colors["tertiary-20"]
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
          },
          yLatency: {
            position: "right",
            ticks: {
              color: foreground,
              callback: this.formatDuration.bind(this)
            },
            grid: { drawOnChartArea: false }
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
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return context.dataset.yAxisID === "yCount" ? context.formattedValue : this.formatDuration(context.parsed.y);
              }
            }
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
  formatDuration(d) {
    if (typeof d === "string") {
      d = parseInt(d);
    }
    if (d === 0) {
      return "0";
    }
    let seconds = d;
    let minutes = 0;
    let hours = 0;
    let days = 0;
    if (seconds >= 60) {
      minutes = Math.floor(seconds / 60);
      seconds = seconds % 60;
      if (minutes >= 5) {
        seconds = 0;
        if (minutes >= 60) {
          hours = Math.floor(minutes / 60);
          minutes = minutes % 60;
          if (hours >= 5) {
            minutes = 0;
            if (hours >= 24) {
              days = Math.floor(hours / 24);
              hours = hours % 24;
            }
          }
        }
      }
    }
    return formatDuration({ days, hours, minutes, seconds }, this.transloco.getActiveLang());
  }
  static {
    this.\u0275fac = function QueueChartAdapterTimeline_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _QueueChartAdapterTimeline)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _QueueChartAdapterTimeline, factory: _QueueChartAdapterTimeline.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QueueChartAdapterTimeline, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/dashboard/queue/queue-visualize.component.ts
var _c0 = (a0, a1, a2) => [a0, a1, a2];
function QueueVisualizeComponent_ng_container_0_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const name_r3 = ctx.$implicit;
    const t_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("value", name_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r4("dashboard.interval." + name_r3));
  }
}
function QueueVisualizeComponent_ng_container_0_For_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const name_r5 = ctx.$implicit;
    const t_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("value", name_r5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r4("dashboard.interval." + name_r5 + "s"));
  }
}
function QueueVisualizeComponent_ng_container_0_For_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const queue_r6 = ctx.$implicit;
    \u0275\u0275property("value", queue_r6);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(queue_r6);
  }
}
function QueueVisualizeComponent_ng_container_0_For_80_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function QueueVisualizeComponent_ng_container_0_For_80_Template_button_click_0_listener() {
      const queue_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.queueMetricsController.params.queue === queue_r8 || ctx_r1.queueMetricsController.setQueue(queue_r8));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const queue_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r1.queueMetricsController.params.queue === queue_r8 ? "selected" : "deselected");
    \u0275\u0275property("matTooltip", queue_r8);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.queueMetricsController.params.queue === queue_r8 ? "radio_button_checked" : "radio_button_unchecked");
  }
}
function QueueVisualizeComponent_ng_container_0_For_93_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const event_r9 = ctx.$implicit;
    const t_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("value", event_r9);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r4("dashboard.event." + event_r9));
  }
}
function QueueVisualizeComponent_ng_container_0_For_117_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const name_r10 = ctx.$implicit;
    const t_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("value", name_r10);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r4("dashboard.interval." + name_r10));
  }
}
function QueueVisualizeComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "app-document-title", 1);
    \u0275\u0275elementStart(2, "mat-card")(3, "mat-card-content")(4, "mat-grid-list", 2)(5, "mat-grid-tile", 3)(6, "mat-card", 4)(7, "mat-card-header")(8, "mat-card-title")(9, "h4");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "mat-card-content")(12, "mat-form-field", 5)(13, "mat-select", 6);
    \u0275\u0275listener("valueChange", function QueueVisualizeComponent_ng_container_0_Template_mat_select_valueChange_13_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.queueMetricsController.setTimeframe($event));
    });
    \u0275\u0275repeaterCreate(14, QueueVisualizeComponent_ng_container_0_For_15_Template, 2, 2, "mat-option", 7, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 8)(17, "button", 9);
    \u0275\u0275listener("click", function QueueVisualizeComponent_ng_container_0_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.queueMetricsController.setTimeframe(ctx_r1.timeframeNames[0]));
    });
    \u0275\u0275elementStart(18, "mat-icon");
    \u0275\u0275text(19, "first_page");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "button", 9);
    \u0275\u0275listener("click", function QueueVisualizeComponent_ng_container_0_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.queueMetricsController.setTimeframe(ctx_r1.timeframeNames[ctx_r1.timeframeNames.indexOf(ctx_r1.queueMetricsController.params.buckets.timeframe) - 1]));
    });
    \u0275\u0275elementStart(21, "mat-icon");
    \u0275\u0275text(22, "navigate_before");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "button", 9);
    \u0275\u0275listener("click", function QueueVisualizeComponent_ng_container_0_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.queueMetricsController.setTimeframe(ctx_r1.timeframeNames[ctx_r1.timeframeNames.indexOf(ctx_r1.queueMetricsController.params.buckets.timeframe) + 1]));
    });
    \u0275\u0275elementStart(24, "mat-icon");
    \u0275\u0275text(25, "navigate_next");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "button", 9);
    \u0275\u0275listener("click", function QueueVisualizeComponent_ng_container_0_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.queueMetricsController.setTimeframe(ctx_r1.timeframeNames[ctx_r1.timeframeNames.length - 1]));
    });
    \u0275\u0275elementStart(27, "mat-icon");
    \u0275\u0275text(28, "last_page");
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(29, "mat-grid-tile", 3)(30, "mat-card", 10)(31, "mat-card-header")(32, "mat-card-title")(33, "h4");
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(35, "mat-card-content")(36, "mat-form-field", 11)(37, "input", 12);
    \u0275\u0275pipe(38, "async");
    \u0275\u0275listener("change", function QueueVisualizeComponent_ng_container_0_Template_input_change_37_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleMultiplierEvent($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "mat-form-field", 13)(40, "mat-select", 6);
    \u0275\u0275listener("valueChange", function QueueVisualizeComponent_ng_container_0_Template_mat_select_valueChange_40_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.queueMetricsController.setBucketDuration($event));
    });
    \u0275\u0275repeaterCreate(41, QueueVisualizeComponent_ng_container_0_For_42_Template, 2, 2, "mat-option", 7, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 8)(44, "button", 9);
    \u0275\u0275listener("click", function QueueVisualizeComponent_ng_container_0_Template_button_click_44_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.queueMetricsController.setBucketMultiplier(ctx_r1.queueMetricsController.bucketMultiplier - 1));
    });
    \u0275\u0275elementStart(45, "mat-icon");
    \u0275\u0275text(46, "remove");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "button", 14);
    \u0275\u0275listener("click", function QueueVisualizeComponent_ng_container_0_Template_button_click_47_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.queueMetricsController.setBucketMultiplier(ctx_r1.queueMetricsController.bucketMultiplier + 1));
    });
    \u0275\u0275elementStart(48, "mat-icon");
    \u0275\u0275text(49, "add");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "button", 9);
    \u0275\u0275listener("click", function QueueVisualizeComponent_ng_container_0_Template_button_click_50_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.queueMetricsController.setBucketDuration(ctx_r1.resolutionNames[0]));
    });
    \u0275\u0275elementStart(51, "mat-icon");
    \u0275\u0275text(52, "first_page");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "button", 9);
    \u0275\u0275listener("click", function QueueVisualizeComponent_ng_container_0_Template_button_click_53_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.queueMetricsController.setBucketDuration(ctx_r1.resolutionNames[ctx_r1.resolutionNames.indexOf(ctx_r1.queueMetricsController.bucketDuration) - 1]));
    });
    \u0275\u0275elementStart(54, "mat-icon");
    \u0275\u0275text(55, "navigate_before");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(56, "button", 9);
    \u0275\u0275listener("click", function QueueVisualizeComponent_ng_container_0_Template_button_click_56_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.queueMetricsController.setBucketDuration(ctx_r1.resolutionNames[ctx_r1.resolutionNames.indexOf(ctx_r1.queueMetricsController.bucketDuration) + 1]));
    });
    \u0275\u0275elementStart(57, "mat-icon");
    \u0275\u0275text(58, "navigate_next");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(59, "button", 9);
    \u0275\u0275listener("click", function QueueVisualizeComponent_ng_container_0_Template_button_click_59_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.queueMetricsController.setBucketDuration(ctx_r1.resolutionNames[ctx_r1.resolutionNames.length - 1]));
    });
    \u0275\u0275elementStart(60, "mat-icon");
    \u0275\u0275text(61, "last_page");
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(62, "mat-grid-tile", 3)(63, "mat-card")(64, "mat-card-header")(65, "mat-card-title")(66, "h4");
    \u0275\u0275text(67);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(68, "mat-card-content")(69, "mat-form-field", 5)(70, "mat-select", 6);
    \u0275\u0275listener("valueChange", function QueueVisualizeComponent_ng_container_0_Template_mat_select_valueChange_70_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.queueMetricsController.setQueue($event === "_all" ? null : $event));
    });
    \u0275\u0275elementStart(71, "mat-option", 15);
    \u0275\u0275text(72);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(73, QueueVisualizeComponent_ng_container_0_For_74_Template, 2, 2, "mat-option", 7, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(75, "div", 16)(76, "button", 17);
    \u0275\u0275listener("click", function QueueVisualizeComponent_ng_container_0_Template_button_click_76_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.queueMetricsController.setQueue(null));
    });
    \u0275\u0275elementStart(77, "mat-icon", 18);
    \u0275\u0275text(78, "workspaces");
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(79, QueueVisualizeComponent_ng_container_0_For_80_Template, 3, 4, "button", 19, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(81, "mat-grid-tile", 3)(82, "mat-card")(83, "mat-card-header")(84, "mat-card-title")(85, "h4");
    \u0275\u0275text(86);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(87, "mat-card-content")(88, "mat-form-field", 5)(89, "mat-select", 6);
    \u0275\u0275listener("valueChange", function QueueVisualizeComponent_ng_container_0_Template_mat_select_valueChange_89_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.queueMetricsController.setEvent($event === "_all" ? null : $event));
    });
    \u0275\u0275elementStart(90, "mat-option", 15);
    \u0275\u0275text(91, "All");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(92, QueueVisualizeComponent_ng_container_0_For_93_Template, 2, 2, "mat-option", 7, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(94, "div", 16)(95, "button", 17);
    \u0275\u0275listener("click", function QueueVisualizeComponent_ng_container_0_Template_button_click_95_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.queueMetricsController.setEvent(null));
    });
    \u0275\u0275elementStart(96, "mat-icon", 18);
    \u0275\u0275text(97, "radio_button_checked");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(98, "button", 17);
    \u0275\u0275listener("click", function QueueVisualizeComponent_ng_container_0_Template_button_click_98_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.queueMetricsController.params.event === "created" || ctx_r1.queueMetricsController.setEvent("created"));
    });
    \u0275\u0275elementStart(99, "mat-icon");
    \u0275\u0275text(100, "add_circle");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(101, "button", 17);
    \u0275\u0275listener("click", function QueueVisualizeComponent_ng_container_0_Template_button_click_101_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.queueMetricsController.params.event === "processed" || ctx_r1.queueMetricsController.setEvent("processed"));
    });
    \u0275\u0275elementStart(102, "mat-icon");
    \u0275\u0275text(103, "check_circle");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(104, "button", 17);
    \u0275\u0275listener("click", function QueueVisualizeComponent_ng_container_0_Template_button_click_104_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.queueMetricsController.params.event === "failed" || ctx_r1.queueMetricsController.setEvent("failed"));
    });
    \u0275\u0275elementStart(105, "mat-icon");
    \u0275\u0275text(106, "error");
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(107, "mat-grid-tile", 3)(108, "mat-card", 20)(109, "mat-card-header")(110, "mat-card-title")(111, "h4");
    \u0275\u0275text(112);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(113, "mat-card-content")(114, "mat-form-field", 5)(115, "mat-select", 6);
    \u0275\u0275listener("valueChange", function QueueVisualizeComponent_ng_container_0_Template_mat_select_valueChange_115_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.queueMetricsController.setAutoRefreshInterval($event));
    });
    \u0275\u0275repeaterCreate(116, QueueVisualizeComponent_ng_container_0_For_117_Template, 2, 2, "mat-option", 7, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(118, "div", 16)(119, "button", 17);
    \u0275\u0275listener("click", function QueueVisualizeComponent_ng_container_0_Template_button_click_119_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.queueMetricsController.refresh());
    });
    \u0275\u0275elementStart(120, "mat-icon");
    \u0275\u0275text(121, "sync");
    \u0275\u0275elementEnd()()()()()()();
    \u0275\u0275elementStart(122, "div", 21);
    \u0275\u0275element(123, "mat-progress-bar", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(124, "mat-grid-list", 2)(125, "mat-grid-tile", 3);
    \u0275\u0275element(126, "app-chart", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(127, "mat-grid-tile", 3);
    \u0275\u0275element(128, "app-chart", 23);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    let tmp_16_0;
    const t_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("parts", \u0275\u0275pureFunction3(69, _c0, t_r4("routes.visualize"), t_r4("routes.queues"), t_r4("routes.dashboard")));
    \u0275\u0275advance(3);
    \u0275\u0275property("cols", ctx_r1.breakpoints.sizeAtLeast("Large") ? 5 : ctx_r1.breakpoints.sizeAtLeast("Medium") ? 3 : ctx_r1.breakpoints.sizeAtLeast("Small") ? 2 : 1);
    \u0275\u0275advance();
    \u0275\u0275property("colspan", 1)("rowspan", 2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(t_r4("dashboard.metrics.timeframe"));
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r1.queueMetricsController.params.buckets.timeframe);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.timeframeNames);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.timeframeNames.indexOf(ctx_r1.queueMetricsController.params.buckets.timeframe) <= 0);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.timeframeNames.indexOf(ctx_r1.queueMetricsController.params.buckets.timeframe) <= 0);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.timeframeNames.indexOf(ctx_r1.queueMetricsController.params.buckets.timeframe) >= ctx_r1.timeframeNames.length - 1);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.timeframeNames.indexOf(ctx_r1.queueMetricsController.params.buckets.timeframe) >= ctx_r1.timeframeNames.length - 1);
    \u0275\u0275advance(3);
    \u0275\u0275property("colspan", 1)("rowspan", 2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", t_r4("dashboard.metrics.resolution"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("placeholder", ((tmp_16_0 = \u0275\u0275pipeBind1(38, 67, ctx_r1.queueMetricsController.result$)) == null ? null : tmp_16_0.params == null ? null : tmp_16_0.params.buckets == null ? null : tmp_16_0.params.buckets.multiplier == null ? null : tmp_16_0.params.buckets.multiplier.toString()) ?? "")("value", ctx_r1.queueMetricsController.params.buckets.multiplier);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r1.queueMetricsController.bucketDuration);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.resolutionNames);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.queueMetricsController.bucketMultiplier === 1);
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", ctx_r1.resolutionNames.indexOf(ctx_r1.queueMetricsController.bucketDuration) <= 0);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.resolutionNames.indexOf(ctx_r1.queueMetricsController.bucketDuration) <= 0);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.resolutionNames.indexOf(ctx_r1.queueMetricsController.bucketDuration) >= ctx_r1.resolutionNames.length - 1);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.resolutionNames.indexOf(ctx_r1.queueMetricsController.bucketDuration) >= ctx_r1.resolutionNames.length - 1);
    \u0275\u0275advance(3);
    \u0275\u0275property("colspan", 1)("rowspan", 2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(t_r4("dashboard.queues.queue"));
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r1.queueMetricsController.params.queue ?? "_all");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r4("general.all"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.availableQueueNames);
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r1.queueMetricsController.params.queue ? "deselected" : "selected");
    \u0275\u0275property("matTooltip", t_r4("general.all"));
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.availableQueueNames);
    \u0275\u0275advance(2);
    \u0275\u0275property("colspan", 1)("rowspan", 2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(t_r4("dashboard.metrics.event"));
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r1.queueMetricsController.params.event ?? "_all");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.eventNames);
    \u0275\u0275advance(3);
    \u0275\u0275classMap(!ctx_r1.queueMetricsController.params.event ? "selected" : "deselected");
    \u0275\u0275property("matTooltip", t_r4("general.all"));
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r1.queueMetricsController.params.event === "created" ? "selected" : "deselected");
    \u0275\u0275property("matTooltip", t_r4("dashboard.queues.created"));
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r1.queueMetricsController.params.event === "processed" ? "selected" : "deselected");
    \u0275\u0275property("matTooltip", t_r4("dashboard.queues.processed"));
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r1.queueMetricsController.params.event === "failed" ? "selected" : "deselected");
    \u0275\u0275property("matTooltip", t_r4("dashboard.queues.failed"));
    \u0275\u0275advance(3);
    \u0275\u0275property("colspan", 1)("rowspan", 2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(t_r4("general.refresh"));
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r1.queueMetricsController.params.autoRefresh);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.autoRefreshIntervalNames);
    \u0275\u0275advance(3);
    \u0275\u0275property("matTooltip", t_r4("general.refresh"));
    \u0275\u0275advance(4);
    \u0275\u0275property("mode", ctx_r1.queueMetricsController.loading ? "indeterminate" : "determinate")("value", 0);
    \u0275\u0275advance();
    \u0275\u0275property("cols", ctx_r1.breakpoints.sizeAtLeast("Large") ? 2 : 1);
    \u0275\u0275advance();
    \u0275\u0275property("colspan", 1)("rowspan", 5);
    \u0275\u0275advance();
    \u0275\u0275property("title", t_r4("dashboard.queues.total_counts_by_status"))("adapter", ctx_r1.totals)("$data", ctx_r1.queueMetricsController.result$)("height", 400)("width", 550);
    \u0275\u0275advance();
    \u0275\u0275property("colspan", 1)("rowspan", 5);
    \u0275\u0275advance();
    \u0275\u0275property("title", t_r4("dashboard.metrics.throughput"))("adapter", ctx_r1.timeline)("$data", ctx_r1.queueMetricsController.result$)("height", 400)("width", 550);
  }
}
var QueueVisualizeComponent = class _QueueVisualizeComponent {
  constructor() {
    this.breakpoints = inject(BreakpointsService);
    this.apollo = inject(Apollo);
    this.queueMetricsController = new QueueMetricsController(this.apollo, {
      buckets: {
        duration: "AUTO",
        multiplier: "AUTO",
        timeframe: "all"
      },
      autoRefresh: "seconds_30"
    }, inject(ErrorsService));
    this.timeline = inject(QueueChartAdapterTimeline);
    this.totals = inject(QueueChartAdapterTotals);
    this.resolutionNames = resolutionNames;
    this.timeframeNames = timeframeNames;
    this.availableQueueNames = availableQueueNames;
    this.autoRefreshIntervalNames = autoRefreshIntervalNames;
    this.eventNames = eventNames;
  }
  ngOnInit() {
    this.queueMetricsController.result$.subscribe((result) => {
      if (this.queueMetricsController.params.buckets.timeframe === "all" && this.queueMetricsController.params.buckets.duration === "AUTO" && result.params.buckets.duration === "hour") {
        const span = result.bucketSpan;
        if (span && span.latestBucket - span.earliestBucket < 12) {
          this.queueMetricsController.setBucketDuration("minute");
        }
      }
    });
  }
  ngOnDestroy() {
    this.queueMetricsController.setAutoRefreshInterval("off");
  }
  handleMultiplierEvent(event) {
    const value = event.currentTarget.value;
    this.queueMetricsController.setBucketMultiplier(/^\d+$/.test(value) ? parseInt(value) : "AUTO");
  }
  static {
    this.\u0275fac = function QueueVisualizeComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _QueueVisualizeComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _QueueVisualizeComponent, selectors: [["app-queue-visualize"]], decls: 1, vars: 0, consts: [[4, "transloco"], [3, "parts"], ["rowHeight", "100px", 3, "cols"], [3, "colspan", "rowspan"], [1, "form-timeframe"], ["subscriptSizing", "dynamic"], [3, "valueChange", "value"], [3, "value"], [1, "paginator", "actions"], ["mat-icon-button", "", 3, "click", "disabled"], [1, "form-resolution"], ["subscriptSizing", "dynamic", 1, "form-input-multiplier"], ["type", "number", "matInput", "", "min", "1", "step", "1", 3, "change", "placeholder", "value"], ["subscriptSizing", "dynamic", 1, "form-select-duration"], ["mat-icon-button", "", 3, "click"], ["value", "_all"], [1, "actions"], ["mat-icon-button", "", 3, "click", "matTooltip"], ["fontSet", "material-icons"], ["mat-icon-button", "", 3, "class", "matTooltip"], [1, "form-refresh"], [1, "progress-bar-container"], [3, "mode", "value"], [3, "title", "adapter", "$data", "height", "width"]], template: function QueueVisualizeComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, QueueVisualizeComponent_ng_container_0_Template, 129, 73, "ng-container", 0);
      }
    }, dependencies: [
      AppModule,
      MatOption,
      MatIconButton,
      MatCard,
      MatCardContent,
      MatCardHeader,
      MatCardTitle,
      MatFormField,
      MatGridList,
      MatGridTile,
      MatIcon,
      MatInput,
      MatProgressBar,
      MatSelect,
      MatTooltip,
      TranslocoDirective,
      ChartComponent,
      GraphQLModule,
      QueueModule,
      DocumentTitleComponent,
      AsyncPipe
    ], styles: ["\n\n.actions[_ngcontent-%COMP%] {\n  width: 210px;\n  padding-top: 12px;\n  --mdc-icon-button-state-layer-size: 32px;\n}\n.actions[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-right: 0;\n}\n.progress-bar-container[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 10px;\n}\nmat-grid-tile[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%] {\n  width: 100%;\n}\nmat-grid-tile[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  min-width: 190px;\n}\nmat-grid-tile[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  font-size: 18px;\n}\nmat-form-field[_ngcontent-%COMP%] {\n  width: 186px;\n}\n.form-resolution[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%] {\n  margin-left: -2px;\n}\n.form-resolution[_ngcontent-%COMP%]   .form-input-multiplier[_ngcontent-%COMP%] {\n  width: 60px;\n  margin-right: 10px;\n}\n.form-resolution[_ngcontent-%COMP%]   .form-input-multiplier[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-webkit-outer-spin-button, \n.form-resolution[_ngcontent-%COMP%]   .form-input-multiplier[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n.form-resolution[_ngcontent-%COMP%]   .form-input-multiplier[_ngcontent-%COMP%]   input[type=number][_ngcontent-%COMP%] {\n  -moz-appearance: textfield;\n}\n.form-resolution[_ngcontent-%COMP%]   .form-select-duration[_ngcontent-%COMP%] {\n  width: 116px;\n}\n/*# sourceMappingURL=queue-visualize.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QueueVisualizeComponent, [{
    type: Component,
    args: [{ selector: "app-queue-visualize", standalone: true, imports: [
      AppModule,
      ChartComponent,
      GraphQLModule,
      QueueModule,
      DocumentTitleComponent
    ], template: `<ng-container *transloco="let t">
  <app-document-title
    [parts]="[t('routes.visualize'), t('routes.queues'), t('routes.dashboard')]"
  />
  <mat-card>
    <mat-card-content>
      <mat-grid-list
        [cols]="
          breakpoints.sizeAtLeast('Large')
            ? 5
            : breakpoints.sizeAtLeast('Medium')
              ? 3
              : breakpoints.sizeAtLeast('Small')
                ? 2
                : 1
        "
        rowHeight="100px"
      >
        <mat-grid-tile [colspan]="1" [rowspan]="2">
          <mat-card class="form-timeframe">
            <mat-card-header>
              <mat-card-title
                ><h4>{{ t("dashboard.metrics.timeframe") }}</h4></mat-card-title
              >
            </mat-card-header>
            <mat-card-content>
              <mat-form-field subscriptSizing="dynamic">
                <mat-select
                  [value]="queueMetricsController.params.buckets.timeframe"
                  (valueChange)="queueMetricsController.setTimeframe($event)"
                >
                  @for (name of timeframeNames; track name) {
                    <mat-option [value]="name">{{
                      t("dashboard.interval." + name)
                    }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>
              <div class="paginator actions">
                <button
                  mat-icon-button
                  [disabled]="
                    timeframeNames.indexOf(
                      queueMetricsController.params.buckets.timeframe
                    ) <= 0
                  "
                  (click)="
                    queueMetricsController.setTimeframe(timeframeNames[0])
                  "
                >
                  <mat-icon>first_page</mat-icon>
                </button>
                <button
                  mat-icon-button
                  [disabled]="
                    timeframeNames.indexOf(
                      queueMetricsController.params.buckets.timeframe
                    ) <= 0
                  "
                  (click)="
                    queueMetricsController.setTimeframe(
                      timeframeNames[
                        timeframeNames.indexOf(
                          queueMetricsController.params.buckets.timeframe
                        ) - 1
                      ]
                    )
                  "
                >
                  <mat-icon>navigate_before</mat-icon>
                </button>
                <button
                  mat-icon-button
                  [disabled]="
                    timeframeNames.indexOf(
                      queueMetricsController.params.buckets.timeframe
                    ) >=
                    timeframeNames.length - 1
                  "
                  (click)="
                    queueMetricsController.setTimeframe(
                      timeframeNames[
                        timeframeNames.indexOf(
                          queueMetricsController.params.buckets.timeframe
                        ) + 1
                      ]
                    )
                  "
                >
                  <mat-icon>navigate_next</mat-icon>
                </button>
                <button
                  mat-icon-button
                  [disabled]="
                    timeframeNames.indexOf(
                      queueMetricsController.params.buckets.timeframe
                    ) >=
                    timeframeNames.length - 1
                  "
                  (click)="
                    queueMetricsController.setTimeframe(
                      timeframeNames[timeframeNames.length - 1]
                    )
                  "
                >
                  <mat-icon>last_page</mat-icon>
                </button>
              </div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
        <mat-grid-tile [colspan]="1" [rowspan]="2">
          <mat-card class="form-resolution">
            <mat-card-header>
              <mat-card-title
                ><h4>
                  {{ t("dashboard.metrics.resolution") }}
                </h4></mat-card-title
              >
            </mat-card-header>
            <mat-card-content>
              <mat-form-field
                subscriptSizing="dynamic"
                class="form-input-multiplier"
              >
                <input
                  type="number"
                  matInput
                  min="1"
                  step="1"
                  [placeholder]="
                    (
                      queueMetricsController.result$ | async
                    )?.params?.buckets?.multiplier?.toString() ?? ''
                  "
                  [value]="queueMetricsController.params.buckets.multiplier"
                  (change)="handleMultiplierEvent($event)"
                />
              </mat-form-field>
              <mat-form-field
                subscriptSizing="dynamic"
                class="form-select-duration"
              >
                <mat-select
                  [value]="queueMetricsController.bucketDuration"
                  (valueChange)="
                    queueMetricsController.setBucketDuration($event)
                  "
                >
                  @for (name of resolutionNames; track name) {
                    <mat-option [value]="name">{{
                      t("dashboard.interval." + name + "s")
                    }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>
              <div class="paginator actions">
                <button
                  mat-icon-button
                  [disabled]="queueMetricsController.bucketMultiplier === 1"
                  (click)="
                    queueMetricsController.setBucketMultiplier(
                      queueMetricsController.bucketMultiplier - 1
                    )
                  "
                >
                  <mat-icon>remove</mat-icon>
                </button>
                <button
                  mat-icon-button
                  (click)="
                    queueMetricsController.setBucketMultiplier(
                      queueMetricsController.bucketMultiplier + 1
                    )
                  "
                >
                  <mat-icon>add</mat-icon>
                </button>
                <button
                  mat-icon-button
                  [disabled]="
                    resolutionNames.indexOf(
                      queueMetricsController.bucketDuration
                    ) <= 0
                  "
                  (click)="
                    queueMetricsController.setBucketDuration(resolutionNames[0])
                  "
                >
                  <mat-icon>first_page</mat-icon>
                </button>
                <button
                  mat-icon-button
                  [disabled]="
                    resolutionNames.indexOf(
                      queueMetricsController.bucketDuration
                    ) <= 0
                  "
                  (click)="
                    queueMetricsController.setBucketDuration(
                      resolutionNames[
                        resolutionNames.indexOf(
                          queueMetricsController.bucketDuration
                        ) - 1
                      ]
                    )
                  "
                >
                  <mat-icon>navigate_before</mat-icon>
                </button>
                <button
                  mat-icon-button
                  [disabled]="
                    resolutionNames.indexOf(
                      queueMetricsController.bucketDuration
                    ) >=
                    resolutionNames.length - 1
                  "
                  (click)="
                    queueMetricsController.setBucketDuration(
                      resolutionNames[
                        resolutionNames.indexOf(
                          queueMetricsController.bucketDuration
                        ) + 1
                      ]
                    )
                  "
                >
                  <mat-icon>navigate_next</mat-icon>
                </button>
                <button
                  mat-icon-button
                  [disabled]="
                    resolutionNames.indexOf(
                      queueMetricsController.bucketDuration
                    ) >=
                    resolutionNames.length - 1
                  "
                  (click)="
                    queueMetricsController.setBucketDuration(
                      resolutionNames[resolutionNames.length - 1]
                    )
                  "
                >
                  <mat-icon>last_page</mat-icon>
                </button>
              </div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
        <mat-grid-tile [colspan]="1" [rowspan]="2">
          <mat-card>
            <mat-card-header>
              <mat-card-title>
                <h4>{{ t("dashboard.queues.queue") }}</h4>
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <mat-form-field subscriptSizing="dynamic">
                <mat-select
                  [value]="queueMetricsController.params.queue ?? '_all'"
                  (valueChange)="
                    queueMetricsController.setQueue(
                      $event === '_all' ? null : $event
                    )
                  "
                >
                  <mat-option value="_all">{{ t("general.all") }}</mat-option>
                  @for (queue of availableQueueNames; track queue) {
                    <mat-option [value]="queue">{{ queue }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>
              <div class="actions">
                <button
                  mat-icon-button
                  [matTooltip]="t('general.all')"
                  [class]="
                    queueMetricsController.params.queue
                      ? 'deselected'
                      : 'selected'
                  "
                  (click)="queueMetricsController.setQueue(null)"
                >
                  <mat-icon fontSet="material-icons">workspaces</mat-icon>
                </button>
                @for (queue of availableQueueNames; track queue) {
                  <button
                    mat-icon-button
                    [class]="
                      queueMetricsController.params.queue === queue
                        ? 'selected'
                        : 'deselected'
                    "
                    [matTooltip]="queue"
                    (click)="
                      queueMetricsController.params.queue === queue ||
                        queueMetricsController.setQueue(queue)
                    "
                  >
                    <mat-icon>{{
                      queueMetricsController.params.queue === queue
                        ? "radio_button_checked"
                        : "radio_button_unchecked"
                    }}</mat-icon>
                  </button>
                }
              </div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
        <mat-grid-tile [colspan]="1" [rowspan]="2">
          <mat-card>
            <mat-card-header>
              <mat-card-title>
                <h4>{{ t("dashboard.metrics.event") }}</h4>
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <mat-form-field subscriptSizing="dynamic">
                <mat-select
                  [value]="queueMetricsController.params.event ?? '_all'"
                  (valueChange)="
                    queueMetricsController.setEvent(
                      $event === '_all' ? null : $event
                    )
                  "
                >
                  <mat-option value="_all">All</mat-option>
                  @for (event of eventNames; track event) {
                    <mat-option [value]="event">{{
                      t("dashboard.event." + event)
                    }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>
              <div class="actions">
                <button
                  mat-icon-button
                  [matTooltip]="t('general.all')"
                  [class]="
                    !queueMetricsController.params.event
                      ? 'selected'
                      : 'deselected'
                  "
                  (click)="queueMetricsController.setEvent(null)"
                >
                  <mat-icon fontSet="material-icons"
                    >radio_button_checked</mat-icon
                  >
                </button>
                <button
                  mat-icon-button
                  [matTooltip]="t('dashboard.queues.created')"
                  [class]="
                    queueMetricsController.params.event === 'created'
                      ? 'selected'
                      : 'deselected'
                  "
                  (click)="
                    queueMetricsController.params.event === 'created' ||
                      queueMetricsController.setEvent('created')
                  "
                >
                  <mat-icon>add_circle</mat-icon>
                </button>
                <button
                  mat-icon-button
                  [matTooltip]="t('dashboard.queues.processed')"
                  [class]="
                    queueMetricsController.params.event === 'processed'
                      ? 'selected'
                      : 'deselected'
                  "
                  (click)="
                    queueMetricsController.params.event === 'processed' ||
                      queueMetricsController.setEvent('processed')
                  "
                >
                  <mat-icon>check_circle</mat-icon>
                </button>
                <button
                  mat-icon-button
                  [matTooltip]="t('dashboard.queues.failed')"
                  [class]="
                    queueMetricsController.params.event === 'failed'
                      ? 'selected'
                      : 'deselected'
                  "
                  (click)="
                    queueMetricsController.params.event === 'failed' ||
                      queueMetricsController.setEvent('failed')
                  "
                >
                  <mat-icon>error</mat-icon>
                </button>
              </div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
        <mat-grid-tile [colspan]="1" [rowspan]="2">
          <mat-card class="form-refresh">
            <mat-card-header>
              <mat-card-title>
                <h4>{{ t("general.refresh") }}</h4>
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <mat-form-field subscriptSizing="dynamic">
                <mat-select
                  [value]="queueMetricsController.params.autoRefresh"
                  (valueChange)="
                    queueMetricsController.setAutoRefreshInterval($event)
                  "
                >
                  @for (name of autoRefreshIntervalNames; track name) {
                    <mat-option [value]="name">{{
                      t("dashboard.interval." + name)
                    }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>
              <div class="actions">
                <button
                  mat-icon-button
                  [matTooltip]="t('general.refresh')"
                  (click)="queueMetricsController.refresh()"
                >
                  <mat-icon>sync</mat-icon>
                </button>
              </div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>
      <div class="progress-bar-container">
        <mat-progress-bar
          [mode]="
            queueMetricsController.loading ? 'indeterminate' : 'determinate'
          "
          [value]="0"
        ></mat-progress-bar>
      </div>
      <mat-grid-list
        [cols]="breakpoints.sizeAtLeast('Large') ? 2 : 1"
        rowHeight="100px"
      >
        <mat-grid-tile [colspan]="1" [rowspan]="5">
          <app-chart
            [title]="t('dashboard.queues.total_counts_by_status')"
            [adapter]="totals"
            [$data]="queueMetricsController.result$"
            [height]="400"
            [width]="550"
          />
        </mat-grid-tile>
        <mat-grid-tile [colspan]="1" [rowspan]="5">
          <app-chart
            [title]="t('dashboard.metrics.throughput')"
            [adapter]="timeline"
            [$data]="queueMetricsController.result$"
            [height]="400"
            [width]="550"
          />
        </mat-grid-tile>
      </mat-grid-list>
    </mat-card-content>
  </mat-card>
</ng-container>
`, styles: ["/* src/app/dashboard/queue/queue-visualize.component.scss */\n.actions {\n  width: 210px;\n  padding-top: 12px;\n  --mdc-icon-button-state-layer-size: 32px;\n}\n.actions mat-icon {\n  font-size: 22px;\n}\n.actions button {\n  margin-right: 0;\n}\n.progress-bar-container {\n  width: 100%;\n  height: 10px;\n}\nmat-grid-tile mat-card {\n  width: 100%;\n}\nmat-grid-tile mat-card mat-card-content {\n  min-width: 190px;\n}\nmat-grid-tile mat-card h4 {\n  margin-bottom: 16px;\n  font-size: 18px;\n}\nmat-form-field {\n  width: 186px;\n}\n.form-resolution .actions {\n  margin-left: -2px;\n}\n.form-resolution .form-input-multiplier {\n  width: 60px;\n  margin-right: 10px;\n}\n.form-resolution .form-input-multiplier input::-webkit-outer-spin-button,\n.form-resolution .form-input-multiplier input::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n.form-resolution .form-input-multiplier input[type=number] {\n  -moz-appearance: textfield;\n}\n.form-resolution .form-select-duration {\n  width: 116px;\n}\n/*# sourceMappingURL=queue-visualize.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(QueueVisualizeComponent, { className: "QueueVisualizeComponent", filePath: "src/app/dashboard/queue/queue-visualize.component.ts", lineNumber: 34 });
})();
export {
  QueueVisualizeComponent
};
//# sourceMappingURL=chunk-YLMLOYCR.js.map
