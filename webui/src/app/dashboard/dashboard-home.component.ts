import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { AppModule } from "../app.module";
import { DocumentTitleComponent } from "../layout/document-title.component";
import { HealthService } from "../health/health.service";
import { DhtStatsService } from "./dht/dht-stats.service";
import { Apollo } from "apollo-angular";
import * as generated from "../graphql/generated";
import { Subscription } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard-home.component.html",
  styleUrl: "./dashboard-home.component.scss",
  standalone: true,
  imports: [AppModule, DocumentTitleComponent],
  providers: [DhtStatsService],
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  health = inject(HealthService);
  dhtStats = inject(DhtStatsService);
  private apollo = inject(Apollo);
  private subscriptions: Subscription[] = [];

  get healthAccent(): string {
    const s = this.health.result.status;
    if (s === "up") return "accent-health";
    if (s === "down" || s === "error" || s === "degraded") return "accent-error";
    if (s === "unknown") return "accent-warn";
    return "";
  }

  torrentCount24h = 0;
  torrentUpdated24h = 0;
  queueProcessed24h = 0;
  queuePending = 0;
  queueFailed24h = 0;

  ngOnInit() {
    this.loadTorrentStats();
    this.loadQueueStats();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  private loadTorrentStats() {
    const startTime = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const sub = this.apollo
      .query<generated.TorrentMetricsQuery, generated.TorrentMetricsQueryVariables>({
        query: generated.TorrentMetricsDocument,
        variables: {
          input: {
            bucketDuration: "hour",
            startTime,
          },
        },
        fetchPolicy: "no-cache",
      })
      .subscribe({
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
        },
      });
    this.subscriptions.push(sub);
  }

  private loadQueueStats() {
    const startTime = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const sub = this.apollo
      .query<generated.QueueMetricsQuery, generated.QueueMetricsQueryVariables>({
        query: generated.QueueMetricsDocument,
        variables: {
          input: {
            bucketDuration: "hour",
            startTime,
          },
        },
        fetchPolicy: "no-cache",
      })
      .subscribe({
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
        },
      });
    this.subscriptions.push(sub);
  }
}
