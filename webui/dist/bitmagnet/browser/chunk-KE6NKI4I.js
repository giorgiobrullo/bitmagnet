import {
  HealthService
} from "./chunk-3A4EVJUQ.js";
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
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
  MatIcon,
  QueueMetricsDocument,
  TorrentMetricsDocument,
  TranslocoDirective
} from "./chunk-EOZPNCBR.js";
import {
  DecimalPipe,
  NgClass,
  RouterLink
} from "./chunk-7NLLN7HY.js";
import {
  Component,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-BQWGEQNI.js";

// src/app/dashboard/dashboard-home.component.ts
var _c0 = (a0) => [a0];
var _c1 = (a0) => ({ fallback: a0 });
var _forTrack0 = ($index, $item) => $item.key;
function DashboardHomeComponent_ng_container_0_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "mat-icon", 18);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 19);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const check_r1 = ctx.$implicit;
    const t_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMap("health-status-" + check_r1.status);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(check_r1.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r2("health.components." + check_r1.key, \u0275\u0275pureFunction1(4, _c1, check_r1.key)));
  }
}
function DashboardHomeComponent_ng_container_0_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "mat-icon", 18);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 19);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const worker_r3 = ctx.$implicit;
    const t_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMap(worker_r3.started ? "health-status-up" : "health-status-inactive");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(worker_r3.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r2("health.workers." + worker_r3.key, \u0275\u0275pureFunction1(4, _c1, worker_r3.key)));
  }
}
function DashboardHomeComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "app-document-title", 1);
    \u0275\u0275elementStart(2, "div", 2)(3, "div", 3)(4, "mat-card", 4)(5, "mat-card-header")(6, "mat-icon", 5);
    \u0275\u0275text(7, "monitor_heart");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "mat-card-title");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "mat-card-content")(11, "div", 6)(12, "span", 7);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 8);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 9);
    \u0275\u0275repeaterCreate(17, DashboardHomeComponent_ng_container_0_For_18_Template, 5, 6, "div", 10, _forTrack0);
    \u0275\u0275repeaterCreate(19, DashboardHomeComponent_ng_container_0_For_20_Template, 5, 6, "div", 10, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "mat-card", 11)(22, "mat-card-header")(23, "mat-icon", 5);
    \u0275\u0275text(24, "hub");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "mat-card-title");
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "mat-card-content")(28, "div", 6)(29, "span", 7);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "span", 12);
    \u0275\u0275text(32);
    \u0275\u0275pipe(33, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 13)(35, "span", 7);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "span", 8);
    \u0275\u0275text(38);
    \u0275\u0275pipe(39, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div", 13)(41, "span", 7);
    \u0275\u0275text(42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "span", 8);
    \u0275\u0275text(44);
    \u0275\u0275pipe(45, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 13)(47, "span", 7);
    \u0275\u0275text(48);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "span", 8);
    \u0275\u0275text(50);
    \u0275\u0275pipe(51, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "div", 13)(53, "span", 7);
    \u0275\u0275text(54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "span", 8);
    \u0275\u0275text(56);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(57, "mat-card", 14)(58, "mat-card-header");
    \u0275\u0275element(59, "mat-icon", 15);
    \u0275\u0275elementStart(60, "mat-card-title");
    \u0275\u0275text(61);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(62, "mat-card-content")(63, "div", 6)(64, "span", 7);
    \u0275\u0275text(65);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "span", 12);
    \u0275\u0275text(67);
    \u0275\u0275pipe(68, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(69, "div", 13)(70, "span", 7);
    \u0275\u0275text(71);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "span", 8);
    \u0275\u0275text(73);
    \u0275\u0275pipe(74, "number");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(75, "mat-card", 16)(76, "mat-card-header");
    \u0275\u0275element(77, "mat-icon", 17);
    \u0275\u0275elementStart(78, "mat-card-title");
    \u0275\u0275text(79);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(80, "mat-card-content")(81, "div", 6)(82, "span", 7);
    \u0275\u0275text(83);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "span", 12);
    \u0275\u0275text(85);
    \u0275\u0275pipe(86, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(87, "div", 13)(88, "span", 7);
    \u0275\u0275text(89);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(90, "span", 8);
    \u0275\u0275text(91);
    \u0275\u0275pipe(92, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(93, "div", 13)(94, "span", 7);
    \u0275\u0275text(95);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(96, "span", 8);
    \u0275\u0275text(97);
    \u0275\u0275pipe(98, "number");
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const t_r2 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("parts", \u0275\u0275pureFunction1(52, _c0, t_r2("routes.dashboard")));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", ctx_r3.healthAccent);
    \u0275\u0275advance(2);
    \u0275\u0275classMap("health-status-" + ctx_r3.health.result.status);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r2("health.summary"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r2("general.status"));
    \u0275\u0275advance();
    \u0275\u0275classMap("health-status-" + ctx_r3.health.result.status);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", t_r2("health.statuses." + ctx_r3.health.result.status), " ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r3.health.result.checks);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r3.health.result.workers);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(t_r2("routes.dht"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r2("dashboard.dht.nodes"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(33, 34, ctx_r3.dhtStats.result.nodesCountIPv4 + ctx_r3.dhtStats.result.nodesCountIPv6));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r2("dashboard.dht.nodes_ipv4"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(39, 36, ctx_r3.dhtStats.result.nodesCountIPv4));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r2("dashboard.dht.nodes_ipv6"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(45, 38, ctx_r3.dhtStats.result.nodesCountIPv6));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r2("dashboard.dht.hashes"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(51, 40, ctx_r3.dhtStats.result.hashesCountIPv4 + ctx_r3.dhtStats.result.hashesCountIPv6));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r2("dashboard.dht.crawler_status"));
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r3.dhtStats.result.crawlerActive ? "health-status-up" : "health-status-inactive");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", t_r2(ctx_r3.dhtStats.result.crawlerActive ? "dashboard.dht.active" : "dashboard.dht.inactive"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(t_r2("routes.torrents"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", t_r2("dashboard.event.created"), " (24h)");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(68, 42, ctx_r3.torrentCount24h));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", t_r2("dashboard.event.updated"), " (24h)");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(74, 44, ctx_r3.torrentUpdated24h));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(t_r2("routes.queues"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", t_r2("dashboard.queues.processed"), " (24h)");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(86, 46, ctx_r3.queueProcessed24h));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r2("dashboard.queues.pending"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(92, 48, ctx_r3.queuePending));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", t_r2("dashboard.queues.failed"), " (24h)");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(98, 50, ctx_r3.queueFailed24h));
  }
}
var DashboardHomeComponent = class _DashboardHomeComponent {
  constructor() {
    this.health = inject(HealthService);
    this.dhtStats = inject(DhtStatsService);
    this.apollo = inject(Apollo);
    this.subscriptions = [];
    this.torrentCount24h = 0;
    this.torrentUpdated24h = 0;
    this.queueProcessed24h = 0;
    this.queuePending = 0;
    this.queueFailed24h = 0;
  }
  get healthAccent() {
    const s = this.health.result.status;
    if (s === "up")
      return "accent-health";
    if (s === "down" || s === "error" || s === "degraded")
      return "accent-error";
    if (s === "unknown")
      return "accent-warn";
    return "";
  }
  ngOnInit() {
    this.loadTorrentStats();
    this.loadQueueStats();
  }
  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
  loadTorrentStats() {
    const startTime = new Date(Date.now() - 24 * 60 * 60 * 1e3).toISOString();
    const sub = this.apollo.query({
      query: TorrentMetricsDocument,
      variables: {
        input: {
          bucketDuration: "hour",
          startTime
        }
      },
      fetchPolicy: "no-cache"
    }).subscribe({
      next: (result) => {
        const buckets = result.data?.torrent?.metrics?.buckets ?? [];
        this.torrentCount24h = 0;
        this.torrentUpdated24h = 0;
        for (const b of buckets) {
          if (b.updated) {
            this.torrentUpdated24h += b.count;
          } else {
            this.torrentCount24h += b.count;
          }
        }
      }
    });
    this.subscriptions.push(sub);
  }
  loadQueueStats() {
    const startTime = new Date(Date.now() - 24 * 60 * 60 * 1e3).toISOString();
    const sub = this.apollo.query({
      query: QueueMetricsDocument,
      variables: {
        input: {
          bucketDuration: "hour",
          startTime
        }
      },
      fetchPolicy: "no-cache"
    }).subscribe({
      next: (result) => {
        const buckets = result.data?.queue?.metrics?.buckets ?? [];
        this.queueProcessed24h = 0;
        this.queuePending = 0;
        this.queueFailed24h = 0;
        for (const b of buckets) {
          if (b.status === "processed") {
            this.queueProcessed24h += b.count;
          } else if (b.status === "pending") {
            this.queuePending += b.count;
          } else if (b.status === "failed") {
            this.queueFailed24h += b.count;
          }
        }
      }
    });
    this.subscriptions.push(sub);
  }
  static {
    this.\u0275fac = function DashboardHomeComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DashboardHomeComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardHomeComponent, selectors: [["app-dashboard"]], features: [\u0275\u0275ProvidersFeature([DhtStatsService])], decls: 1, vars: 0, consts: [[4, "transloco"], [3, "parts"], [1, "dashboard-overview"], [1, "stats-grid"], [1, "stat-card", 3, "ngClass"], [1, "stat-card-icon"], [1, "stat-row", "stat-row-primary"], [1, "stat-label"], [1, "stat-value"], [1, "stat-checks"], [1, "stat-check"], ["routerLink", "dht", 1, "stat-card", "stat-card-link", "accent-dht"], [1, "stat-value", "stat-value-large"], [1, "stat-row"], ["routerLink", "torrents", 1, "stat-card", "stat-card-link", "accent-torrents"], ["svgIcon", "magnet", 1, "stat-card-icon"], ["routerLink", "queues", 1, "stat-card", "stat-card-link", "accent-queues"], ["svgIcon", "queue", 1, "stat-card-icon"], [1, "stat-check-icon"], [1, "stat-check-label"]], template: function DashboardHomeComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, DashboardHomeComponent_ng_container_0_Template, 99, 54, "ng-container", 0);
      }
    }, dependencies: [AppModule, NgClass, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatIcon, RouterLink, TranslocoDirective, DocumentTitleComponent, DecimalPipe], styles: ["\n\n.dashboard-overview[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 16px;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n}\n.stat-card[_ngcontent-%COMP%] {\n  cursor: default;\n  border-top: 3px solid var(--card-accent, transparent);\n}\n.stat-card.accent-health[_ngcontent-%COMP%] {\n  --card-accent: var(--dashboard-status-up);\n}\n.stat-card.accent-error[_ngcontent-%COMP%] {\n  --card-accent: var(--dashboard-accent-error);\n}\n.stat-card.accent-warn[_ngcontent-%COMP%] {\n  --card-accent: var(--dashboard-accent-warn);\n}\n.stat-card.accent-dht[_ngcontent-%COMP%] {\n  --card-accent: var(--dashboard-accent-dht);\n}\n.stat-card.accent-torrents[_ngcontent-%COMP%] {\n  --card-accent: var(--dashboard-accent-torrents);\n}\n.stat-card.accent-queues[_ngcontent-%COMP%] {\n  --card-accent: var(--dashboard-accent-queues);\n}\n.stat-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding-bottom: 12px;\n}\n.stat-card[_ngcontent-%COMP%]   .stat-card-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n  color: var(--card-accent, inherit);\n  opacity: 0.85;\n}\n.stat-card[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  opacity: 0.6;\n}\n.stat-card-link[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: box-shadow 0.2s ease;\n}\n.stat-card-link[_ngcontent-%COMP%]:hover {\n  box-shadow:\n    0 3px 5px -1px rgba(0, 0, 0, 0.2),\n    0 6px 10px 0 rgba(0, 0, 0, 0.14),\n    0 1px 18px 0 rgba(0, 0, 0, 0.12);\n}\n.stat-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 4px 0;\n}\n.stat-row-primary[_ngcontent-%COMP%] {\n  padding: 8px 0 12px;\n  border-bottom: 1px solid var(--dashboard-divider, rgba(128, 128, 128, 0.15));\n  margin-bottom: 8px;\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  opacity: 0.6;\n}\n.stat-value[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 500;\n  font-variant-numeric: tabular-nums;\n}\n.stat-value-large[_ngcontent-%COMP%] {\n  font-size: 26px;\n  font-weight: 600;\n  font-variant-numeric: tabular-nums;\n  line-height: 1;\n}\n.stat-checks[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-top: 8px;\n}\n.stat-check[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.stat-check-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n}\n.stat-check-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  opacity: 0.6;\n}\n.health-status-up[_ngcontent-%COMP%], \n.health-status-started[_ngcontent-%COMP%] {\n  color: var(--dashboard-status-up, #4caf50);\n}\n.health-status-down[_ngcontent-%COMP%], \n.health-status-error[_ngcontent-%COMP%], \n.health-status-degraded[_ngcontent-%COMP%] {\n  color: var(--dashboard-status-down, #f44336);\n}\n.health-status-unknown[_ngcontent-%COMP%] {\n  color: var(--dashboard-status-unknown, #ff9800);\n}\n.health-status-inactive[_ngcontent-%COMP%] {\n  opacity: 0.4;\n}\n/*# sourceMappingURL=dashboard-home.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardHomeComponent, [{
    type: Component,
    args: [{ selector: "app-dashboard", standalone: true, imports: [AppModule, DocumentTitleComponent], providers: [DhtStatsService], template: `<ng-container *transloco="let t">
  <app-document-title [parts]="[t('routes.dashboard')]" />
  <div class="dashboard-overview">
    <div class="stats-grid">
      <!-- System Health Card -->
      <mat-card class="stat-card" [ngClass]="healthAccent">
        <mat-card-header>
          <mat-icon class="stat-card-icon" [class]="'health-status-' + health.result.status">monitor_heart</mat-icon>
          <mat-card-title>{{ t("health.summary") }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="stat-row stat-row-primary">
            <span class="stat-label">{{ t("general.status") }}</span>
            <span class="stat-value" [class]="'health-status-' + health.result.status">
              {{ t("health.statuses." + health.result.status) }}
            </span>
          </div>
          <div class="stat-checks">
            @for (check of health.result.checks; track check.key) {
              <div class="stat-check">
                <mat-icon [class]="'health-status-' + check.status" class="stat-check-icon">{{ check.icon }}</mat-icon>
                <span class="stat-check-label">{{ t("health.components." + check.key, { fallback: check.key }) }}</span>
              </div>
            }
            @for (worker of health.result.workers; track worker.key) {
              <div class="stat-check">
                <mat-icon [class]="worker.started ? 'health-status-up' : 'health-status-inactive'" class="stat-check-icon">{{ worker.icon }}</mat-icon>
                <span class="stat-check-label">{{ t("health.workers." + worker.key, { fallback: worker.key }) }}</span>
              </div>
            }
          </div>
        </mat-card-content>
      </mat-card>

      <!-- DHT Network Card -->
      <mat-card class="stat-card stat-card-link accent-dht" routerLink="dht">
        <mat-card-header>
          <mat-icon class="stat-card-icon">hub</mat-icon>
          <mat-card-title>{{ t("routes.dht") }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="stat-row stat-row-primary">
            <span class="stat-label">{{ t("dashboard.dht.nodes") }}</span>
            <span class="stat-value stat-value-large">{{ dhtStats.result.nodesCountIPv4 + dhtStats.result.nodesCountIPv6 | number }}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">{{ t("dashboard.dht.nodes_ipv4") }}</span>
            <span class="stat-value">{{ dhtStats.result.nodesCountIPv4 | number }}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">{{ t("dashboard.dht.nodes_ipv6") }}</span>
            <span class="stat-value">{{ dhtStats.result.nodesCountIPv6 | number }}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">{{ t("dashboard.dht.hashes") }}</span>
            <span class="stat-value">{{ dhtStats.result.hashesCountIPv4 + dhtStats.result.hashesCountIPv6 | number }}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">{{ t("dashboard.dht.crawler_status") }}</span>
            <span class="stat-value" [class]="dhtStats.result.crawlerActive ? 'health-status-up' : 'health-status-inactive'">
              {{ t(dhtStats.result.crawlerActive ? "dashboard.dht.active" : "dashboard.dht.inactive") }}
            </span>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Torrents Card -->
      <mat-card class="stat-card stat-card-link accent-torrents" routerLink="torrents">
        <mat-card-header>
          <mat-icon class="stat-card-icon" svgIcon="magnet"></mat-icon>
          <mat-card-title>{{ t("routes.torrents") }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="stat-row stat-row-primary">
            <span class="stat-label">{{ t("dashboard.event.created") }} (24h)</span>
            <span class="stat-value stat-value-large">{{ torrentCount24h | number }}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">{{ t("dashboard.event.updated") }} (24h)</span>
            <span class="stat-value">{{ torrentUpdated24h | number }}</span>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Queue Card -->
      <mat-card class="stat-card stat-card-link accent-queues" routerLink="queues">
        <mat-card-header>
          <mat-icon class="stat-card-icon" svgIcon="queue"></mat-icon>
          <mat-card-title>{{ t("routes.queues") }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="stat-row stat-row-primary">
            <span class="stat-label">{{ t("dashboard.queues.processed") }} (24h)</span>
            <span class="stat-value stat-value-large">{{ queueProcessed24h | number }}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">{{ t("dashboard.queues.pending") }}</span>
            <span class="stat-value">{{ queuePending | number }}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">{{ t("dashboard.queues.failed") }} (24h)</span>
            <span class="stat-value">{{ queueFailed24h | number }}</span>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  </div>
</ng-container>
`, styles: ["/* src/app/dashboard/dashboard-home.component.scss */\n.dashboard-overview {\n  padding: 16px;\n}\n.stats-grid {\n  display: grid;\n  gap: 16px;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n}\n.stat-card {\n  cursor: default;\n  border-top: 3px solid var(--card-accent, transparent);\n}\n.stat-card.accent-health {\n  --card-accent: var(--dashboard-status-up);\n}\n.stat-card.accent-error {\n  --card-accent: var(--dashboard-accent-error);\n}\n.stat-card.accent-warn {\n  --card-accent: var(--dashboard-accent-warn);\n}\n.stat-card.accent-dht {\n  --card-accent: var(--dashboard-accent-dht);\n}\n.stat-card.accent-torrents {\n  --card-accent: var(--dashboard-accent-torrents);\n}\n.stat-card.accent-queues {\n  --card-accent: var(--dashboard-accent-queues);\n}\n.stat-card mat-card-header {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding-bottom: 12px;\n}\n.stat-card .stat-card-icon {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n  color: var(--card-accent, inherit);\n  opacity: 0.85;\n}\n.stat-card mat-card-title {\n  font-size: 13px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  opacity: 0.6;\n}\n.stat-card-link {\n  cursor: pointer;\n  transition: box-shadow 0.2s ease;\n}\n.stat-card-link:hover {\n  box-shadow:\n    0 3px 5px -1px rgba(0, 0, 0, 0.2),\n    0 6px 10px 0 rgba(0, 0, 0, 0.14),\n    0 1px 18px 0 rgba(0, 0, 0, 0.12);\n}\n.stat-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 4px 0;\n}\n.stat-row-primary {\n  padding: 8px 0 12px;\n  border-bottom: 1px solid var(--dashboard-divider, rgba(128, 128, 128, 0.15));\n  margin-bottom: 8px;\n}\n.stat-label {\n  font-size: 13px;\n  opacity: 0.6;\n}\n.stat-value {\n  font-size: 14px;\n  font-weight: 500;\n  font-variant-numeric: tabular-nums;\n}\n.stat-value-large {\n  font-size: 26px;\n  font-weight: 600;\n  font-variant-numeric: tabular-nums;\n  line-height: 1;\n}\n.stat-checks {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-top: 8px;\n}\n.stat-check {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.stat-check-icon {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n}\n.stat-check-label {\n  font-size: 12px;\n  opacity: 0.6;\n}\n.health-status-up,\n.health-status-started {\n  color: var(--dashboard-status-up, #4caf50);\n}\n.health-status-down,\n.health-status-error,\n.health-status-degraded {\n  color: var(--dashboard-status-down, #f44336);\n}\n.health-status-unknown {\n  color: var(--dashboard-status-unknown, #ff9800);\n}\n.health-status-inactive {\n  opacity: 0.4;\n}\n/*# sourceMappingURL=dashboard-home.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardHomeComponent, { className: "DashboardHomeComponent", filePath: "src/app/dashboard/dashboard-home.component.ts", lineNumber: 18 });
})();
export {
  DashboardHomeComponent
};
//# sourceMappingURL=chunk-KE6NKI4I.js.map
