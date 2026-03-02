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
} from "./torrent-library-metrics.constants";

export type TorrentLibrarySnapshot = {
  bucket: string;
  totalCount: number;
  totalSize: number;
  classifiedCount: number;
};

export type TorrentContentCount = {
  contentType: string;
  count: number;
};

export type TorrentLibraryMetricsParams = {
  timeframe: TimeframeName;
  autoRefresh: AutoRefreshInterval;
};

export type TorrentLibraryMetricsResult = {
  params: TorrentLibraryMetricsParams;
  snapshots: TorrentLibrarySnapshot[];
  contentBreakdown: TorrentContentCount[];
};

const emptyResult: TorrentLibraryMetricsResult = {
  params: { timeframe: "hours_6", autoRefresh: "minutes_1" },
  snapshots: [],
  contentBreakdown: [],
};

export class TorrentLibraryMetricsController {
  private paramsSubject: BehaviorSubject<TorrentLibraryMetricsParams>;
  params$: Observable<TorrentLibraryMetricsParams>;
  private resultSubject =
    new BehaviorSubject<TorrentLibraryMetricsResult>(emptyResult);
  result$ = this.resultSubject.asObservable();
  private loadingSubject = new BehaviorSubject(false);

  private refreshTimeout?: number;

  constructor(
    private apollo: Apollo,
    initParams: TorrentLibraryMetricsParams,
    private errorsService: ErrorsService,
  ) {
    this.paramsSubject = new BehaviorSubject(initParams);
    this.params$ = this.paramsSubject.asObservable();
    this.paramsSubject.subscribe((params) => {
      this.request(params);
    });
  }

  get params(): TorrentLibraryMetricsParams {
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

  private request(params: TorrentLibraryMetricsParams) {
    clearTimeout(this.refreshTimeout);
    this.loadingSubject.next(true);

    const bucketDuration =
      timeframeBucketDuration[
        params.timeframe
      ] as generated.MetricsBucketDuration;
    const startTime = new Date(
      Date.now() - 1000 * timeframeLengths[params.timeframe],
    ).toISOString();

    this.apollo
      .query<
        generated.TorrentLibraryMetricsQuery,
        generated.TorrentLibraryMetricsQueryVariables
      >({
        query: generated.TorrentLibraryMetricsDocument,
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
          const data = r.data?.torrent;
          const result: TorrentLibraryMetricsResult = {
            params,
            snapshots: (data?.libraryMetrics.snapshots ?? []).map((s) => ({
              bucket: s.bucket,
              totalCount: s.totalCount,
              totalSize: s.totalSize,
              classifiedCount: s.classifiedCount,
            })),
            contentBreakdown: (data?.contentBreakdown ?? []).map((c) => ({
              contentType: c.contentType,
              count: c.count,
            })),
          };
          this.resultSubject.next(result);
          this.scheduleRefresh();
        }),
        catchError((err: Error) => {
          this.errorsService.addError(
            `Failed to load torrent library metrics: ${err.message}`,
          );
          this.loadingSubject.next(false);
          this.scheduleRefresh();
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
