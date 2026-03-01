import {
  filterComplete
} from "./chunk-RLOELPUV.js";
import {
  Apollo,
  DhtStatsDocument
} from "./chunk-G4Q67IMQ.js";
import {
  BehaviorSubject,
  __spreadProps,
  __spreadValues,
  inject,
  map
} from "./chunk-BQWGEQNI.js";

// src/app/dashboard/dht/dht-stats.service.ts
var initialResult = {
  nodesCountIPv4: 0,
  nodesCountIPv6: 0,
  hashesCountIPv4: 0,
  hashesCountIPv6: 0,
  serverStartTime: null,
  serverLastSuccess: null,
  serverLastResponse: null,
  crawlerActive: false,
  error: null
};
var pollInterval = 1e4;
var DhtStatsService = class {
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
      query: DhtStatsDocument,
      fetchPolicy: "no-cache",
      returnPartialData: false,
      pollInterval
    }).valueChanges.pipe(filterComplete(), map((r) => ({
      nodesCountIPv4: r.data.dht.stats.nodesCountIPv4,
      nodesCountIPv6: r.data.dht.stats.nodesCountIPv6,
      hashesCountIPv4: r.data.dht.stats.hashesCountIPv4,
      hashesCountIPv6: r.data.dht.stats.hashesCountIPv6,
      serverStartTime: r.data.dht.stats.serverStartTime ?? null,
      serverLastSuccess: r.data.dht.stats.serverLastSuccess ?? null,
      serverLastResponse: r.data.dht.stats.serverLastResponse ?? null,
      crawlerActive: r.data.dht.stats.crawlerActive,
      error: null
    }))).subscribe({
      next: (result) => this.resultSubject.next(result),
      error: (error) => {
        this.resultSubject.next(__spreadProps(__spreadValues({}, initialResult), {
          error
        }));
        setTimeout(this.watchQuery.bind(this), pollInterval);
      }
    });
  }
};

export {
  DhtStatsService
};
//# sourceMappingURL=chunk-5BCT6IOF.js.map
