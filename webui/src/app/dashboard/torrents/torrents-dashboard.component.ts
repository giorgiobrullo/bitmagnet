import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map, Observable, Subscription } from "rxjs";
import { AppModule } from "../../app.module";
import { GraphQLModule } from "../../graphql/graphql.module";
import { ChartComponent } from "../../charting/chart.component";
import { ErrorsService } from "../../errors/errors.service";
import { DocumentTitleComponent } from "../../layout/document-title.component";
import {
  timeframeNames,
  autoRefreshIntervalNames,
} from "./torrent-library-metrics.constants";
import {
  TorrentLibraryMetricsController,
  TorrentLibrarySnapshot,
  TorrentContentCount,
} from "./torrent-library-metrics.controller";
import { TorrentChartAdapterLibraryGrowth } from "./torrent-chart-adapter.library";
import { TorrentChartAdapterStorageGrowth } from "./torrent-chart-adapter.storage";
import { TorrentChartAdapterContentBreakdown } from "./torrent-chart-adapter.content";
import { TorrentChartAdapterClassificationRate } from "./torrent-chart-adapter.classification";
import { TorrentChartAdapterTimeline } from "./torrent-chart-adapter.timeline";
import { TorrentMetricsController } from "./torrent-metrics.controller";
import {
  defaultBucketParams,
  timeframeNames as throughputTimeframeNames,
} from "./torrent-metrics.constants";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, i);
  return `${value.toFixed(i > 0 ? 1 : 0)} ${units[i]}`;
}

@Component({
  selector: "app-torrents",
  standalone: true,
  imports: [AppModule, ChartComponent, GraphQLModule, DocumentTitleComponent],
  templateUrl: "./torrents-dashboard.component.html",
  styleUrl: "./torrents-dashboard.component.scss",
})
export class TorrentsDashboardComponent implements OnInit, OnDestroy {
  private apollo = inject(Apollo);
  private errorsService = inject(ErrorsService);

  metricsController = new TorrentLibraryMetricsController(
    this.apollo,
    { timeframe: "hours_6", autoRefresh: "minutes_1" },
    this.errorsService,
  );

  throughputController = new TorrentMetricsController(
    this.apollo,
    {
      buckets: defaultBucketParams,
      autoRefresh: "off",
    },
    this.errorsService,
  );

  protected readonly libraryGrowthAdapter = inject(
    TorrentChartAdapterLibraryGrowth,
  );
  protected readonly storageGrowthAdapter = inject(
    TorrentChartAdapterStorageGrowth,
  );
  protected readonly contentAdapter = inject(
    TorrentChartAdapterContentBreakdown,
  );
  protected readonly classificationRateAdapter = inject(
    TorrentChartAdapterClassificationRate,
  );
  protected readonly throughputAdapter = inject(TorrentChartAdapterTimeline);

  protected readonly timeframeNames = timeframeNames;
  protected readonly autoRefreshIntervalNames = autoRefreshIntervalNames;

  snapshots$!: Observable<TorrentLibrarySnapshot[]>;
  contentBreakdown$!: Observable<TorrentContentCount[]>;

  totalTorrents = 0;
  totalSize = "";
  private sub?: Subscription;

  ngOnInit() {
    this.snapshots$ = this.metricsController.result$.pipe(
      map((r) => r.snapshots),
    );
    this.contentBreakdown$ = this.metricsController.result$.pipe(
      map((r) => r.contentBreakdown),
    );

    this.sub = this.metricsController.result$.subscribe((r) => {
      if (r.snapshots.length > 0) {
        const latest = r.snapshots[r.snapshots.length - 1];
        this.totalTorrents = latest.totalCount;
        this.totalSize = formatBytes(latest.totalSize);
      }
    });

    // Sync throughput timeframe with library timeframe
    this.metricsController.params$.subscribe((params) => {
      const tfIndex = timeframeNames.indexOf(params.timeframe);
      if (tfIndex >= 0 && tfIndex < throughputTimeframeNames.length) {
        this.throughputController.setTimeframe(
          throughputTimeframeNames[tfIndex],
        );
      }
    });
  }

  ngOnDestroy() {
    this.metricsController.destroy();
    this.throughputController.setAutoRefreshInterval("off");
    this.sub?.unsubscribe();
  }
}
