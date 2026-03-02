import {
  filterComplete
} from "./chunk-RLOELPUV.js";
import {
  Apollo,
  HealthCheckDocument
} from "./chunk-EOZPNCBR.js";
import {
  BehaviorSubject,
  Injectable,
  __spreadProps,
  __spreadValues,
  inject,
  map,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-BQWGEQNI.js";

// src/app/health/health.service.ts
var icons = {
  error: "error",
  degraded: "warning",
  down: "warning",
  unknown: "pending",
  inactive: "circle",
  up: "check_circle",
  started: "play_circle"
};
var initialResult = {
  status: "unknown",
  checks: [],
  icon: icons.unknown,
  workers: [],
  error: null
};
var pollInterval = 1e4;
var HealthService = class _HealthService {
  constructor() {
    this.apollo = inject(Apollo);
    this.resultSubject = new BehaviorSubject(initialResult);
    this.result$ = this.resultSubject.asObservable();
    this.result = initialResult;
    this.watchQuery();
    this.result$.subscribe((result) => {
      this.result = result;
    });
  }
  watchQuery() {
    this.apollo.watchQuery({
      query: HealthCheckDocument,
      fetchPolicy: "no-cache",
      returnPartialData: false,
      pollInterval
    }).valueChanges.pipe(filterComplete(), map((r) => ({
      status: r.data.health.status === "down" ? "degraded" : r.data.health.status,
      checks: r.data.health.checks.map((c) => __spreadProps(__spreadValues({}, c), {
        icon: icons[c.status]
      })),
      workers: r.data.workers.listAll.workers.map((w) => __spreadProps(__spreadValues({}, w), {
        icon: icons[w.started ? "started" : "inactive"]
      })),
      icon: icons[r.data.health.status],
      error: null
    }))).subscribe({
      next: (result) => this.resultSubject.next(result),
      error: (error) => {
        this.resultSubject.next({
          status: "error",
          checks: [],
          workers: [],
          error,
          icon: icons.error
        });
        setTimeout(this.watchQuery.bind(this), pollInterval);
      }
    });
  }
  static {
    this.\u0275fac = function HealthService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HealthService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _HealthService, factory: _HealthService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HealthService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [], null);
})();

export {
  HealthService
};
//# sourceMappingURL=chunk-3A4EVJUQ.js.map
