import { inject } from "@angular/core";
import { Apollo } from "apollo-angular";
import { BehaviorSubject, map } from "rxjs";
import * as generated from "../../graphql/generated";
import { filterComplete } from "../../graphql/util/filter-complete";

export type DhtStatsResult = {
  nodesCountIPv4: number;
  nodesCountIPv6: number;
  hashesCountIPv4: number;
  hashesCountIPv6: number;
  serverStartTime: string | null;
  serverLastSuccess: string | null;
  serverLastResponse: string | null;
  crawlerActive: boolean;
  error: Error | null;
};

const initialResult: DhtStatsResult = {
  nodesCountIPv4: 0,
  nodesCountIPv6: 0,
  hashesCountIPv4: 0,
  hashesCountIPv6: 0,
  serverStartTime: null,
  serverLastSuccess: null,
  serverLastResponse: null,
  crawlerActive: false,
  error: null,
};

const pollInterval = 10000;

export class DhtStatsService {
  private apollo = inject(Apollo);

  private resultSubject = new BehaviorSubject<DhtStatsResult>(initialResult);

  result$ = this.resultSubject.asObservable();

  result = initialResult;

  constructor() {
    this.watchQuery();
    this.result$.subscribe((result) => {
      this.result = result;
    });
  }

  private watchQuery() {
    this.apollo
      .watchQuery<generated.DhtStatsQuery, generated.DhtStatsQueryVariables>({
        query: generated.DhtStatsDocument,
        fetchPolicy: "no-cache",
        returnPartialData: false,
        pollInterval,
      })
      .valueChanges.pipe(
        filterComplete(),
        map(
          (r): DhtStatsResult => ({
            nodesCountIPv4: r.data.dht.stats.nodesCountIPv4,
            nodesCountIPv6: r.data.dht.stats.nodesCountIPv6,
            hashesCountIPv4: r.data.dht.stats.hashesCountIPv4,
            hashesCountIPv6: r.data.dht.stats.hashesCountIPv6,
            serverStartTime: r.data.dht.stats.serverStartTime ?? null,
            serverLastSuccess: r.data.dht.stats.serverLastSuccess ?? null,
            serverLastResponse: r.data.dht.stats.serverLastResponse ?? null,
            crawlerActive: r.data.dht.stats.crawlerActive,
            error: null,
          }),
        ),
      )
      .subscribe({
        next: (result) => this.resultSubject.next(result),
        error: (error: Error) => {
          this.resultSubject.next({
            ...initialResult,
            error,
          });
          setTimeout(this.watchQuery.bind(this), pollInterval);
        },
      });
  }
}
