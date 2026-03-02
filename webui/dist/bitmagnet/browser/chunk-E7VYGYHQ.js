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
  formatDistanceToNow
} from "./chunk-SPPBVMMP.js";
import {
  resolveDateLocale
} from "./chunk-GPFHSAQX.js";
import {
  ErrorsService
} from "./chunk-BNLC4R4X.js";
import "./chunk-MKQWY5SO.js";
import {
  DhtStatsService
} from "./chunk-BQCE4VPD.js";
import "./chunk-RLOELPUV.js";
import {
  DocumentTitleComponent
} from "./chunk-MNRKI74J.js";
import {
  Apollo,
  AppModule,
  DhtMetricsDocument,
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
  Input,
  ViewChild,
  __spreadProps,
  __spreadValues,
  catchError,
  inject,
  map,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-BQWGEQNI.js";

// src/app/dashboard/dht/dht-chart-adapter.ts
var DhtChartAdapterNodes = class _DhtChartAdapterNodes {
  constructor() {
    this.themeInfo = inject(ThemeInfoService);
    this.transloco = inject(TranslocoService);
  }
  create(data, params) {
    const { colors } = this.themeInfo.info;
    const foreground = colors["foreground"];
    const gridColor = withAlpha(colors[createThemeColor("neutral-variant", 50)], 0.2);
    const labels = [];
    const ipv4Data = [];
    const ipv6Data = [];
    if (data) {
      for (const point of data) {
        labels.push(format(new Date(point.bucket), "d LLL H:mm", {
          locale: resolveDateLocale(this.transloco.getActiveLang())
        }));
        ipv4Data.push(point.nodesIPv4);
        ipv6Data.push(point.nodesIPv6);
      }
    }
    const ipv4Label = "IPv4";
    const ipv6Label = "IPv6";
    const ipv4Color = colors[createThemeColor("primary", 50)];
    const ipv6Color = colors[createThemeColor("secondary", 50)];
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
            onClick: params.legendOnClick,
            labels: { color: foreground }
          }
        }
      },
      data: {
        labels,
        datasets: [
          {
            label: ipv4Label,
            data: ipv4Data,
            hidden: params.hiddenDatasets.get(ipv4Label) ?? false,
            borderColor: ipv4Color,
            backgroundColor: withAlpha(ipv4Color, 0.08),
            fill: true
          },
          {
            label: ipv6Label,
            data: ipv6Data,
            hidden: params.hiddenDatasets.get(ipv6Label) ?? false,
            borderColor: ipv6Color,
            backgroundColor: withAlpha(ipv6Color, 0.08),
            fill: true
          }
        ]
      }
    };
  }
  static {
    this.\u0275fac = function DhtChartAdapterNodes_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DhtChartAdapterNodes)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DhtChartAdapterNodes, factory: _DhtChartAdapterNodes.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DhtChartAdapterNodes, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();
var DhtChartAdapterHashes = class _DhtChartAdapterHashes {
  constructor() {
    this.themeInfo = inject(ThemeInfoService);
    this.transloco = inject(TranslocoService);
  }
  create(data, params) {
    const { colors } = this.themeInfo.info;
    const foreground = colors["foreground"];
    const gridColor = withAlpha(colors[createThemeColor("neutral-variant", 50)], 0.2);
    const labels = [];
    const totalData = [];
    if (data) {
      for (const point of data) {
        labels.push(format(new Date(point.bucket), "d LLL H:mm", {
          locale: resolveDateLocale(this.transloco.getActiveLang())
        }));
        totalData.push(point.hashesIPv4 + point.hashesIPv6);
      }
    }
    const totalLabel = "Hashes";
    const totalColor = colors[createThemeColor("tertiary", 50)];
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
            display: false
          }
        }
      },
      data: {
        labels,
        datasets: [
          {
            label: totalLabel,
            data: totalData,
            borderColor: totalColor,
            backgroundColor: withAlpha(totalColor, 0.08),
            fill: true
          }
        ]
      }
    };
  }
  static {
    this.\u0275fac = function DhtChartAdapterHashes_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DhtChartAdapterHashes)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DhtChartAdapterHashes, factory: _DhtChartAdapterHashes.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DhtChartAdapterHashes, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();
var DhtChartAdapterComposition = class _DhtChartAdapterComposition {
  constructor() {
    this.themeInfo = inject(ThemeInfoService);
  }
  create(data, params) {
    const { colors } = this.themeInfo.info;
    const foreground = colors["foreground"];
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
        labels: ["IPv4", "IPv6"],
        datasets: [
          {
            data: [data?.ipv4 ?? 0, data?.ipv6 ?? 0],
            backgroundColor: [
              colors[createThemeColor("primary", 50)],
              colors[createThemeColor("secondary", 50)]
            ],
            borderWidth: 0
          }
        ]
      }
    };
  }
  static {
    this.\u0275fac = function DhtChartAdapterComposition_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DhtChartAdapterComposition)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DhtChartAdapterComposition, factory: _DhtChartAdapterComposition.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DhtChartAdapterComposition, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/dashboard/dht/sparkline.component.ts
var _c0 = ["svgEl"];
var SparklineComponent = class _SparklineComponent {
  constructor() {
    this.data = [];
    this.color = "currentColor";
    this.width = 80;
    this.height = 24;
    this.points = "";
  }
  ngOnChanges() {
    this.points = this.computePoints();
  }
  computePoints() {
    if (this.data.length < 2)
      return "";
    const min = Math.min(...this.data);
    const max = Math.max(...this.data);
    const range = max - min || 1;
    const padding = 2;
    const usableHeight = this.height - padding * 2;
    const step = this.width / (this.data.length - 1);
    return this.data.map((v, i) => {
      const x = i * step;
      const y = padding + usableHeight - (v - min) / range * usableHeight;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
  }
  static {
    this.\u0275fac = function SparklineComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SparklineComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SparklineComponent, selectors: [["app-sparkline"]], viewQuery: function SparklineComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.svgEl = _t.first);
      }
    }, inputs: { data: "data", color: "color", width: "width", height: "height" }, features: [\u0275\u0275NgOnChangesFeature], decls: 3, vars: 7, consts: [["svgEl", ""], ["preserveAspectRatio", "none"], ["fill", "none", "stroke-width", "1.5", "stroke-linejoin", "round", "stroke-linecap", "round"]], template: function SparklineComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElementStart(0, "svg", 1, 0);
        \u0275\u0275domElement(2, "polyline", 2);
        \u0275\u0275domElementEnd();
      }
      if (rf & 2) {
        \u0275\u0275styleProp("width", ctx.width, "px")("height", ctx.height, "px");
        \u0275\u0275attribute("viewBox", "0 0 " + ctx.width + " " + ctx.height);
        \u0275\u0275advance(2);
        \u0275\u0275attribute("points", ctx.points)("stroke", ctx.color);
      }
    }, styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  line-height: 0;\n}\nsvg[_ngcontent-%COMP%] {\n  width: 100%;\n  height: auto;\n}\n/*# sourceMappingURL=sparkline.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SparklineComponent, [{
    type: Component,
    args: [{ selector: "app-sparkline", standalone: true, template: `<svg
    #svgEl
    [attr.viewBox]="'0 0 ' + width + ' ' + height"
    [style.width.px]="width"
    [style.height.px]="height"
    preserveAspectRatio="none"
  >
    <polyline
      [attr.points]="points"
      fill="none"
      [attr.stroke]="color"
      stroke-width="1.5"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
  </svg>`, styles: ["/* angular:styles/component:scss;098978e369b76b670721916d1e2346e2ea4b894de35e95c8daee8cb2f79dee28;/Users/giorgiobrullo/Documents/bitmagnet/webui/src/app/dashboard/dht/sparkline.component.ts */\n:host {\n  display: block;\n  line-height: 0;\n}\nsvg {\n  width: 100%;\n  height: auto;\n}\n/*# sourceMappingURL=sparkline.component.css.map */\n"] }]
  }], null, { data: [{
    type: Input
  }], color: [{
    type: Input
  }], width: [{
    type: Input
  }], height: [{
    type: Input
  }], svgEl: [{
    type: ViewChild,
    args: ["svgEl"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SparklineComponent, { className: "SparklineComponent", filePath: "src/app/dashboard/dht/sparkline.component.ts", lineNumber: 41 });
})();

// src/app/dashboard/dht/dht-metrics.constants.ts
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

// src/app/dashboard/dht/dht-metrics.controller.ts
var emptyResult = {
  params: { timeframe: "hours_6", autoRefresh: "minutes_1" },
  snapshots: []
};
var DhtMetricsController = class {
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
      query: DhtMetricsDocument,
      variables: {
        input: {
          bucketDuration,
          startTime
        }
      },
      fetchPolicy: "no-cache"
    }).pipe(map((r) => {
      this.loadingSubject.next(false);
      const result = {
        params,
        snapshots: (r.data?.dht.metrics.snapshots ?? []).map((s) => ({
          bucket: s.bucket,
          nodesIPv4: s.nodesIPv4,
          nodesIPv6: s.nodesIPv6,
          hashesIPv4: s.hashesIPv4,
          hashesIPv6: s.hashesIPv6
        }))
      };
      this.resultSubject.next(result);
      this.scheduleRefresh();
    }), catchError((err) => {
      this.errorsService.addError(`Failed to load DHT metrics: ${err.message}`);
      this.loadingSubject.next(false);
      this.scheduleRefresh();
      return EMPTY;
    })).subscribe();
  }
};

// src/app/dashboard/dht/dht-dashboard.component.ts
var _c02 = (a0, a1) => [a0, a1];
function DhtDashboardComponent_ng_container_0_For_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-button-toggle", 12);
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
function DhtDashboardComponent_ng_container_0_For_61_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function DhtDashboardComponent_ng_container_0_For_61_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 14);
    \u0275\u0275listener("click", function DhtDashboardComponent_ng_container_0_For_61_Template_button_click_0_listener() {
      const name_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.metricsController.setAutoRefreshInterval(name_r6));
    });
    \u0275\u0275conditionalCreate(1, DhtDashboardComponent_ng_container_0_For_61_Conditional_1_Template, 2, 0, "mat-icon");
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
function DhtDashboardComponent_ng_container_0_Template(rf, ctx) {
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
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "app-sparkline", 8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "mat-card", 5)(13, "mat-card-content")(14, "div", 6);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 7);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275element(19, "app-sparkline", 8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "mat-card", 5)(21, "mat-card-content")(22, "div", 6);
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 7);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275element(27, "app-sparkline", 8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "mat-card", 5)(29, "mat-card-content")(30, "div", 6);
    \u0275\u0275text(31);
    \u0275\u0275pipe(32, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 7);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd();
    \u0275\u0275element(35, "app-sparkline", 8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "mat-card", 5)(37, "mat-card-content")(38, "div", 6);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 7);
    \u0275\u0275text(41);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(42, "mat-card", 5)(43, "mat-card-content")(44, "div", 9);
    \u0275\u0275text(45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "div", 7);
    \u0275\u0275text(47);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(48, "div", 10)(49, "mat-button-toggle-group", 11);
    \u0275\u0275listener("change", function DhtDashboardComponent_ng_container_0_Template_mat_button_toggle_group_change_49_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.metricsController.setTimeframe($event.value));
    });
    \u0275\u0275repeaterCreate(50, DhtDashboardComponent_ng_container_0_For_51_Template, 2, 2, "mat-button-toggle", 12, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "button", 13)(53, "mat-icon");
    \u0275\u0275text(54, "sync");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "mat-menu", null, 0)(57, "button", 14);
    \u0275\u0275listener("click", function DhtDashboardComponent_ng_container_0_Template_button_click_57_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.metricsController.refresh());
    });
    \u0275\u0275text(58);
    \u0275\u0275elementEnd();
    \u0275\u0275element(59, "mat-divider");
    \u0275\u0275repeaterCreate(60, DhtDashboardComponent_ng_container_0_For_61_Template, 3, 2, "button", 15, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(62, "div", 16)(63, "div", 17);
    \u0275\u0275element(64, "app-chart", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "div", 19)(66, "div", 20)(67, "div", 21);
    \u0275\u0275text(68);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "div", 7);
    \u0275\u0275text(70, "IPv4");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(71, "div", 20)(72, "div", 21);
    \u0275\u0275text(73);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "div", 7);
    \u0275\u0275text(75, "IPv6");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(76, "div", 20)(77, "div", 21);
    \u0275\u0275text(78);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "div", 7);
    \u0275\u0275text(80);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(81, "div", 20)(82, "div", 21);
    \u0275\u0275text(83);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "div", 7);
    \u0275\u0275text(85);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(86, "div", 22);
    \u0275\u0275element(87, "app-chart", 18)(88, "app-chart", 18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const t_r4 = ctx.$implicit;
    const refreshMenu_r7 = \u0275\u0275reference(56);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("parts", \u0275\u0275pureFunction2(49, _c02, t_r4("routes.dashboard"), t_r4("routes.dht")));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 41, ctx_r1.dhtStats.result.nodesCountIPv4 + ctx_r1.dhtStats.result.nodesCountIPv6));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r4("dashboard.dht.total_nodes"));
    \u0275\u0275advance();
    \u0275\u0275property("data", ctx_r1.sparkTotalNodes);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(16, 43, ctx_r1.dhtStats.result.nodesCountIPv4));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r4("dashboard.dht.nodes_ipv4"));
    \u0275\u0275advance();
    \u0275\u0275property("data", ctx_r1.sparkIPv4Nodes);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(24, 45, ctx_r1.dhtStats.result.nodesCountIPv6));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r4("dashboard.dht.nodes_ipv6"));
    \u0275\u0275advance();
    \u0275\u0275property("data", ctx_r1.sparkIPv6Nodes);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(32, 47, ctx_r1.dhtStats.result.hashesCountIPv4 + ctx_r1.dhtStats.result.hashesCountIPv6));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r4("dashboard.dht.total_hashes"));
    \u0275\u0275advance();
    \u0275\u0275property("data", ctx_r1.sparkTotalHashes);
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r1.dhtStats.result.crawlerActive ? "status-active" : "status-inactive");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", t_r4(ctx_r1.dhtStats.result.crawlerActive ? "dashboard.dht.active" : "dashboard.dht.inactive"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r4("dashboard.dht.crawler_status"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.serverUptime || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r4("dashboard.dht.server_uptime"));
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
    \u0275\u0275advance(4);
    \u0275\u0275property("title", "")("$data", ctx_r1.composition$)("adapter", ctx_r1.compositionAdapter)("height", 80);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r1.ipv4Pct, "%");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.ipv6Pct, "%");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.hashRate || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r4("dashboard.dht.hash_rate"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.lastSuccess || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r4("dashboard.dht.last_success"));
    \u0275\u0275advance(2);
    \u0275\u0275property("title", t_r4("dashboard.dht.nodes_over_time"))("$data", ctx_r1.snapshots$)("adapter", ctx_r1.nodesChartAdapter)("height", 250);
    \u0275\u0275advance();
    \u0275\u0275property("title", t_r4("dashboard.dht.hash_discovery"))("$data", ctx_r1.snapshots$)("adapter", ctx_r1.hashesChartAdapter)("height", 250);
  }
}
var SPARKLINE_POINTS = 18;
var DhtDashboardComponent = class _DhtDashboardComponent {
  constructor() {
    this.dhtStats = inject(DhtStatsService);
    this.nodesChartAdapter = inject(DhtChartAdapterNodes);
    this.hashesChartAdapter = inject(DhtChartAdapterHashes);
    this.compositionAdapter = inject(DhtChartAdapterComposition);
    this.metricsController = new DhtMetricsController(inject(Apollo), { timeframe: "hours_6", autoRefresh: "minutes_1" }, inject(ErrorsService));
    this.timeframeNames = timeframeNames;
    this.autoRefreshIntervalNames = autoRefreshIntervalNames;
    this.snapshotsSubject = new BehaviorSubject([]);
    this.snapshots$ = this.snapshotsSubject.asObservable();
    this.compositionSubject = new BehaviorSubject({ ipv4: 0, ipv6: 0 });
    this.composition$ = this.compositionSubject.asObservable();
    this.sparkTotalNodes = [];
    this.sparkIPv4Nodes = [];
    this.sparkIPv6Nodes = [];
    this.sparkTotalHashes = [];
    this.serverUptime = "";
    this.lastSuccess = "";
    this.hashRate = "";
    this.subscriptions = [];
  }
  ngOnInit() {
    this.subscriptions.push(this.dhtStats.result$.subscribe((result) => {
      if (result.error)
        return;
      this.pushSparkline(this.sparkTotalNodes, result.nodesCountIPv4 + result.nodesCountIPv6);
      this.pushSparkline(this.sparkIPv4Nodes, result.nodesCountIPv4);
      this.pushSparkline(this.sparkIPv6Nodes, result.nodesCountIPv6);
      this.pushSparkline(this.sparkTotalHashes, result.hashesCountIPv4 + result.hashesCountIPv6);
      this.compositionSubject.next({
        ipv4: result.nodesCountIPv4,
        ipv6: result.nodesCountIPv6
      });
      if (result.serverStartTime) {
        this.serverUptime = formatDistanceToNow(new Date(result.serverStartTime));
      }
      if (result.serverLastSuccess) {
        this.lastSuccess = formatDistanceToNow(new Date(result.serverLastSuccess), { addSuffix: true });
      }
    }));
    this.subscriptions.push(this.metricsController.result$.subscribe((result) => {
      this.snapshotsSubject.next(result.snapshots);
      this.computeHashRate(result.snapshots);
    }));
  }
  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
    this.metricsController.destroy();
  }
  get ipv4Pct() {
    const total = this.dhtStats.result.nodesCountIPv4 + this.dhtStats.result.nodesCountIPv6;
    return total > 0 ? Math.round(this.dhtStats.result.nodesCountIPv4 / total * 100) : 0;
  }
  get ipv6Pct() {
    const total = this.dhtStats.result.nodesCountIPv4 + this.dhtStats.result.nodesCountIPv6;
    return total > 0 ? 100 - this.ipv4Pct : 0;
  }
  computeHashRate(snapshots) {
    if (snapshots.length < 2) {
      this.hashRate = "";
      return;
    }
    const first = snapshots[0];
    const last = snapshots[snapshots.length - 1];
    const totalFirst = first.hashesIPv4 + first.hashesIPv6;
    const totalLast = last.hashesIPv4 + last.hashesIPv6;
    const diff = totalLast - totalFirst;
    const timeDiffHrs = (new Date(last.bucket).getTime() - new Date(first.bucket).getTime()) / (1e3 * 60 * 60);
    if (timeDiffHrs <= 0 || diff <= 0) {
      this.hashRate = "\u2014";
      return;
    }
    this.hashRate = Math.round(diff / timeDiffHrs).toLocaleString();
  }
  pushSparkline(buffer, value) {
    buffer.push(value);
    if (buffer.length > SPARKLINE_POINTS) {
      buffer.splice(0, buffer.length - SPARKLINE_POINTS);
    }
  }
  static {
    this.\u0275fac = function DhtDashboardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DhtDashboardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DhtDashboardComponent, selectors: [["app-dht-dashboard"]], features: [\u0275\u0275ProvidersFeature([DhtStatsService])], decls: 1, vars: 0, consts: [["refreshMenu", "matMenu"], [4, "transloco"], [3, "parts"], [1, "dht-dashboard"], [1, "dht-stats-grid"], [1, "dht-stat-card"], [1, "dht-stat-number"], [1, "dht-stat-label"], [3, "data"], [1, "dht-stat-number", "dht-stat-number-sm"], [1, "dht-controls"], [3, "change", "value"], [3, "value"], ["mat-icon-button", "", 3, "matMenuTriggerFor", "matTooltip"], ["mat-menu-item", "", 3, "click"], ["mat-menu-item", ""], [1, "dht-summary-row"], [1, "dht-composition"], [3, "title", "$data", "adapter", "height"], [1, "dht-summary-stats"], [1, "dht-summary-stat"], [1, "dht-summary-value"], [1, "dht-charts"]], template: function DhtDashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, DhtDashboardComponent_ng_container_0_Template, 89, 52, "ng-container", 1);
      }
    }, dependencies: [AppModule, MatIconButton, MatButtonToggleGroup, MatButtonToggle, MatCard, MatCardContent, MatDivider, MatIcon, MatMenu, MatMenuItem, MatMenuTrigger, MatTooltip, TranslocoDirective, DocumentTitleComponent, ChartComponent, SparklineComponent, DecimalPipe], styles: ["\n\n.dht-dashboard[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n.dht-stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n  margin-bottom: 20px;\n}\n.dht-stat-card[_ngcontent-%COMP%] {\n  text-align: center;\n  border-top: 2px solid var(--dht-accent, transparent);\n}\n.dht-stat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  padding: 14px 12px 8px;\n}\n.dht-stat-card[_ngcontent-%COMP%]   app-sparkline[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  opacity: 0.6;\n}\n.dht-stat-number[_ngcontent-%COMP%] {\n  font-size: 26px;\n  font-weight: 600;\n  font-variant-numeric: tabular-nums;\n  line-height: 1.2;\n}\n.dht-stat-number-sm[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.dht-stat-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  opacity: 0.5;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-top: 4px;\n}\n.status-active[_ngcontent-%COMP%] {\n  color: var(--dht-status-active, #4caf50);\n}\n.status-inactive[_ngcontent-%COMP%] {\n  opacity: 0.4;\n}\n.dht-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.dht-controls[_ngcontent-%COMP%]   mat-button-toggle-group[_ngcontent-%COMP%] {\n  --mat-standard-button-toggle-height: 32px;\n}\n.dht-summary-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 24px;\n  margin-bottom: 16px;\n}\n.dht-composition[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  width: 200px;\n}\n.dht-summary-stats[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 24px;\n}\n.dht-summary-stat[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.dht-summary-value[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  font-variant-numeric: tabular-nums;\n  line-height: 1.2;\n}\n.dht-charts[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 16px;\n  grid-template-columns: 1fr 1fr;\n}\n@media (max-width: 900px) {\n  .dht-charts[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .dht-summary-row[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n}\n/*# sourceMappingURL=dht-dashboard.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DhtDashboardComponent, [{
    type: Component,
    args: [{ selector: "app-dht-dashboard", standalone: true, imports: [AppModule, DocumentTitleComponent, ChartComponent, SparklineComponent], providers: [DhtStatsService], template: `<ng-container *transloco="let t">
  <app-document-title [parts]="[t('routes.dashboard'), t('routes.dht')]" />
  <div class="dht-dashboard">
    <!-- Live Stats -->
    <div class="dht-stats-grid">
      <mat-card class="dht-stat-card">
        <mat-card-content>
          <div class="dht-stat-number">{{ dhtStats.result.nodesCountIPv4 + dhtStats.result.nodesCountIPv6 | number }}</div>
          <div class="dht-stat-label">{{ t("dashboard.dht.total_nodes") }}</div>
          <app-sparkline [data]="sparkTotalNodes" />
        </mat-card-content>
      </mat-card>
      <mat-card class="dht-stat-card">
        <mat-card-content>
          <div class="dht-stat-number">{{ dhtStats.result.nodesCountIPv4 | number }}</div>
          <div class="dht-stat-label">{{ t("dashboard.dht.nodes_ipv4") }}</div>
          <app-sparkline [data]="sparkIPv4Nodes" />
        </mat-card-content>
      </mat-card>
      <mat-card class="dht-stat-card">
        <mat-card-content>
          <div class="dht-stat-number">{{ dhtStats.result.nodesCountIPv6 | number }}</div>
          <div class="dht-stat-label">{{ t("dashboard.dht.nodes_ipv6") }}</div>
          <app-sparkline [data]="sparkIPv6Nodes" />
        </mat-card-content>
      </mat-card>
      <mat-card class="dht-stat-card">
        <mat-card-content>
          <div class="dht-stat-number">{{ dhtStats.result.hashesCountIPv4 + dhtStats.result.hashesCountIPv6 | number }}</div>
          <div class="dht-stat-label">{{ t("dashboard.dht.total_hashes") }}</div>
          <app-sparkline [data]="sparkTotalHashes" />
        </mat-card-content>
      </mat-card>
      <mat-card class="dht-stat-card">
        <mat-card-content>
          <div class="dht-stat-number" [class]="dhtStats.result.crawlerActive ? 'status-active' : 'status-inactive'">
            {{ t(dhtStats.result.crawlerActive ? "dashboard.dht.active" : "dashboard.dht.inactive") }}
          </div>
          <div class="dht-stat-label">{{ t("dashboard.dht.crawler_status") }}</div>
        </mat-card-content>
      </mat-card>
      <mat-card class="dht-stat-card">
        <mat-card-content>
          <div class="dht-stat-number dht-stat-number-sm">{{ serverUptime || "\u2014" }}</div>
          <div class="dht-stat-label">{{ t("dashboard.dht.server_uptime") }}</div>
        </mat-card-content>
      </mat-card>
    </div>

    <!-- Controls -->
    <div class="dht-controls">
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

    <!-- Summary Row: Composition donut + quick stats -->
    <div class="dht-summary-row">
      <div class="dht-composition">
        <app-chart
          [title]="''"
          [$data]="composition$"
          [adapter]="compositionAdapter"
          [height]="80"
        />
      </div>
      <div class="dht-summary-stats">
        <div class="dht-summary-stat">
          <div class="dht-summary-value">{{ ipv4Pct }}%</div>
          <div class="dht-stat-label">IPv4</div>
        </div>
        <div class="dht-summary-stat">
          <div class="dht-summary-value">{{ ipv6Pct }}%</div>
          <div class="dht-stat-label">IPv6</div>
        </div>
        <div class="dht-summary-stat">
          <div class="dht-summary-value">{{ hashRate || "\u2014" }}</div>
          <div class="dht-stat-label">{{ t("dashboard.dht.hash_rate") }}</div>
        </div>
        <div class="dht-summary-stat">
          <div class="dht-summary-value">{{ lastSuccess || "\u2014" }}</div>
          <div class="dht-stat-label">{{ t("dashboard.dht.last_success") }}</div>
        </div>
      </div>
    </div>

    <!-- Charts - side by side -->
    <div class="dht-charts">
      <app-chart
        [title]="t('dashboard.dht.nodes_over_time')"
        [$data]="snapshots$"
        [adapter]="nodesChartAdapter"
        [height]="250"
      />
      <app-chart
        [title]="t('dashboard.dht.hash_discovery')"
        [$data]="snapshots$"
        [adapter]="hashesChartAdapter"
        [height]="250"
      />
    </div>
  </div>
</ng-container>
`, styles: ["/* src/app/dashboard/dht/dht-dashboard.component.scss */\n.dht-dashboard {\n  padding: 16px;\n}\n.dht-stats-grid {\n  display: grid;\n  gap: 12px;\n  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n  margin-bottom: 20px;\n}\n.dht-stat-card {\n  text-align: center;\n  border-top: 2px solid var(--dht-accent, transparent);\n}\n.dht-stat-card mat-card-content {\n  padding: 14px 12px 8px;\n}\n.dht-stat-card app-sparkline {\n  margin-top: 8px;\n  opacity: 0.6;\n}\n.dht-stat-number {\n  font-size: 26px;\n  font-weight: 600;\n  font-variant-numeric: tabular-nums;\n  line-height: 1.2;\n}\n.dht-stat-number-sm {\n  font-size: 16px;\n}\n.dht-stat-label {\n  font-size: 11px;\n  opacity: 0.5;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-top: 4px;\n}\n.status-active {\n  color: var(--dht-status-active, #4caf50);\n}\n.status-inactive {\n  opacity: 0.4;\n}\n.dht-controls {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.dht-controls mat-button-toggle-group {\n  --mat-standard-button-toggle-height: 32px;\n}\n.dht-summary-row {\n  display: flex;\n  align-items: center;\n  gap: 24px;\n  margin-bottom: 16px;\n}\n.dht-composition {\n  flex: 0 0 auto;\n  width: 200px;\n}\n.dht-summary-stats {\n  display: flex;\n  align-items: center;\n  gap: 24px;\n}\n.dht-summary-stat {\n  text-align: center;\n}\n.dht-summary-value {\n  font-size: 18px;\n  font-weight: 600;\n  font-variant-numeric: tabular-nums;\n  line-height: 1.2;\n}\n.dht-charts {\n  display: grid;\n  gap: 16px;\n  grid-template-columns: 1fr 1fr;\n}\n@media (max-width: 900px) {\n  .dht-charts {\n    grid-template-columns: 1fr;\n  }\n  .dht-summary-row {\n    flex-wrap: wrap;\n  }\n}\n/*# sourceMappingURL=dht-dashboard.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DhtDashboardComponent, { className: "DhtDashboardComponent", filePath: "src/app/dashboard/dht/dht-dashboard.component.ts", lineNumber: 35 });
})();
export {
  DhtDashboardComponent
};
//# sourceMappingURL=chunk-E7VYGYHQ.js.map
