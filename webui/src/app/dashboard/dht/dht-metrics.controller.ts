import { BehaviorSubject, catchError, EMPTY, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Apollo } from "apollo-angular";
import * as generated from "../../graphql/generated";
import { ErrorsService } from "../../errors/errors.service";
import {
  autoRefreshIntervals,
  AutoRefreshInterval,
  TimeframeName,
  timeframeBucketDuration,
  timeframeLengths,
} from "./dht-metrics.constants";

export type DhtMetricsParams = {
  timeframe: TimeframeName;
  autoRefresh: AutoRefreshInterval;
};

export type DhtMetricsSnapshot = {
  bucket: string;
  nodesIPv4: number;
  nodesIPv6: number;
  hashesIPv4: number;
  hashesIPv6: number;
};

export type DhtMetricsResult = {
  params: DhtMetricsParams;
  snapshots: DhtMetricsSnapshot[];
};

const emptyResult: DhtMetricsResult = {
  params: { timeframe: "hours_6", autoRefresh: "minutes_1" },
  snapshots: [],
};

export class DhtMetricsController {
  private paramsSubject: BehaviorSubject<DhtMetricsParams>;
  params$: Observable<DhtMetricsParams>;
  private resultSubject = new BehaviorSubject<DhtMetricsResult>(emptyResult);
  result$ = this.resultSubject.asObservable();
  private loadingSubject = new BehaviorSubject(false);

  private refreshTimeout?: number;

  constructor(
    private apollo: Apollo,
    initParams: DhtMetricsParams,
    private errorsService: ErrorsService,
  ) {
    this.paramsSubject = new BehaviorSubject(initParams);
    this.params$ = this.paramsSubject.asObservable();
    this.paramsSubject.subscribe((params) => {
      this.request(params);
    });
  }

  get params(): DhtMetricsParams {
    return this.paramsSubject.getValue();
  }

  get loading(): boolean {
    return this.loadingSubject.getValue();
  }

  setTimeframe(timeframe: TimeframeName) {
    this.paramsSubject.next({
      ...this.params,
      timeframe,
    });
  }

  setAutoRefreshInterval(interval: AutoRefreshInterval) {
    this.paramsSubject.next({
      ...this.params,
      autoRefresh: interval,
    });
  }

  refresh() {
    this.request(this.params);
  }

  destroy() {
    clearTimeout(this.refreshTimeout);
  }

  private scheduleRefresh() {
    clearTimeout(this.refreshTimeout);
    const delay = autoRefreshIntervals[this.params.autoRefresh];
    if (delay) {
      this.refreshTimeout = setTimeout(() => {
        this.refresh();
      }, delay * 1000);
    }
  }

  private request(params: DhtMetricsParams) {
    clearTimeout(this.refreshTimeout);
    this.loadingSubject.next(true);

    const bucketDuration =
      timeframeBucketDuration[params.timeframe] as generated.MetricsBucketDuration;
    const startTime = new Date(
      Date.now() - 1000 * timeframeLengths[params.timeframe],
    ).toISOString();

    this.apollo
      .query<generated.DhtMetricsQuery, generated.DhtMetricsQueryVariables>({
        query: generated.DhtMetricsDocument,
        variables: {
          input: {
            bucketDuration,
            startTime,
          },
        },
        fetchPolicy: "no-cache",
      })
      .pipe(
        map((r) => {
          this.loadingSubject.next(false);
          const result: DhtMetricsResult = {
            params,
            snapshots: (r.data?.dht.metrics.snapshots ?? []).map((s) => ({
              bucket: s.bucket,
              nodesIPv4: s.nodesIPv4,
              nodesIPv6: s.nodesIPv6,
              hashesIPv4: s.hashesIPv4,
              hashesIPv6: s.hashesIPv6,
            })),
          };
          this.resultSubject.next(result);
          this.scheduleRefresh();
        }),
        catchError((err: Error) => {
          this.errorsService.addError(
            `Failed to load DHT metrics: ${err.message}`,
          );
          this.loadingSubject.next(false);
          this.scheduleRefresh();
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
