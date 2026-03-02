import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { AppModule } from "../../app.module";
import { DocumentTitleComponent } from "../../layout/document-title.component";
import { ChartComponent } from "../../charting/chart.component";
import { DhtStatsService } from "./dht-stats.service";
import {
  DhtChartAdapterNodes,
  DhtChartAdapterHashes,
  DhtChartAdapterComposition,
} from "./dht-chart-adapter";
import { SparklineComponent } from "./sparkline.component";
import {
  DhtMetricsController,
  DhtMetricsSnapshot,
} from "./dht-metrics.controller";
import {
  timeframeNames,
  autoRefreshIntervalNames,
} from "./dht-metrics.constants";
import { BehaviorSubject, Subscription } from "rxjs";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { Apollo } from "apollo-angular";
import { ErrorsService } from "../../errors/errors.service";

const SPARKLINE_POINTS = 18;

@Component({
  selector: "app-dht-dashboard",
  standalone: true,
  imports: [AppModule, DocumentTitleComponent, ChartComponent, SparklineComponent],
  templateUrl: "./dht-dashboard.component.html",
  styleUrl: "./dht-dashboard.component.scss",
  providers: [DhtStatsService],
})
export class DhtDashboardComponent implements OnInit, OnDestroy {
  dhtStats = inject(DhtStatsService);
  nodesChartAdapter = inject(DhtChartAdapterNodes);
  hashesChartAdapter = inject(DhtChartAdapterHashes);
  compositionAdapter = inject(DhtChartAdapterComposition);

  metricsController = new DhtMetricsController(
    inject(Apollo),
    { timeframe: "hours_6", autoRefresh: "minutes_1" },
    inject(ErrorsService),
  );

  protected readonly timeframeNames = timeframeNames;
  protected readonly autoRefreshIntervalNames = autoRefreshIntervalNames;

  // Historical chart data from controller
  private snapshotsSubject = new BehaviorSubject<DhtMetricsSnapshot[]>([]);
  snapshots$ = this.snapshotsSubject.asObservable();

  // Composition doughnut data
  private compositionSubject = new BehaviorSubject<{
    ipv4: number;
    ipv6: number;
  }>({ ipv4: 0, ipv6: 0 });
  composition$ = this.compositionSubject.asObservable();

  // Sparkline data buffers
  sparkTotalNodes: number[] = [];
  sparkIPv4Nodes: number[] = [];
  sparkIPv6Nodes: number[] = [];
  sparkTotalHashes: number[] = [];

  serverUptime = "";
  lastSuccess = "";
  hashRate = "";

  private subscriptions: Subscription[] = [];

  ngOnInit() {
    // Live stats → sparklines + composition + uptime
    this.subscriptions.push(
      this.dhtStats.result$.subscribe((result) => {
        if (result.error) return;

        this.pushSparkline(
          this.sparkTotalNodes,
          result.nodesCountIPv4 + result.nodesCountIPv6,
        );
        this.pushSparkline(this.sparkIPv4Nodes, result.nodesCountIPv4);
        this.pushSparkline(this.sparkIPv6Nodes, result.nodesCountIPv6);
        this.pushSparkline(
          this.sparkTotalHashes,
          result.hashesCountIPv4 + result.hashesCountIPv6,
        );

        this.compositionSubject.next({
          ipv4: result.nodesCountIPv4,
          ipv6: result.nodesCountIPv6,
        });

        if (result.serverStartTime) {
          this.serverUptime = formatDistanceToNow(
            new Date(result.serverStartTime),
          );
        }
        if (result.serverLastSuccess) {
          this.lastSuccess = formatDistanceToNow(
            new Date(result.serverLastSuccess),
            { addSuffix: true },
          );
        }
      }),
    );

    // Historical metrics → charts + hash rate
    this.subscriptions.push(
      this.metricsController.result$.subscribe((result) => {
        this.snapshotsSubject.next(result.snapshots);
        this.computeHashRate(result.snapshots);
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
    this.metricsController.destroy();
  }

  get ipv4Pct(): number {
    const total =
      this.dhtStats.result.nodesCountIPv4 +
      this.dhtStats.result.nodesCountIPv6;
    return total > 0
      ? Math.round(
          (this.dhtStats.result.nodesCountIPv4 / total) * 100,
        )
      : 0;
  }

  get ipv6Pct(): number {
    const total =
      this.dhtStats.result.nodesCountIPv4 +
      this.dhtStats.result.nodesCountIPv6;
    return total > 0 ? 100 - this.ipv4Pct : 0;
  }

  private computeHashRate(snapshots: DhtMetricsSnapshot[]) {
    if (snapshots.length < 2) {
      this.hashRate = "";
      return;
    }
    const first = snapshots[0];
    const last = snapshots[snapshots.length - 1];
    const totalFirst = first.hashesIPv4 + first.hashesIPv6;
    const totalLast = last.hashesIPv4 + last.hashesIPv6;
    const diff = totalLast - totalFirst;
    const timeDiffHrs =
      (new Date(last.bucket).getTime() -
        new Date(first.bucket).getTime()) /
      (1000 * 60 * 60);
    if (timeDiffHrs <= 0 || diff <= 0) {
      this.hashRate = "—";
      return;
    }
    this.hashRate = Math.round(diff / timeDiffHrs).toLocaleString();
  }

  private pushSparkline(buffer: number[], value: number) {
    buffer.push(value);
    if (buffer.length > SPARKLINE_POINTS) {
      buffer.splice(0, buffer.length - SPARKLINE_POINTS);
    }
  }
}
