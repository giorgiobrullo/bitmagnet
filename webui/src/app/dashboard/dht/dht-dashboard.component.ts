import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { AppModule } from "../../app.module";
import { DocumentTitleComponent } from "../../layout/document-title.component";
import { ChartComponent } from "../../charting/chart.component";
import { DhtStatsService } from "./dht-stats.service";
import {
  DhtChartAdapterNodes,
  DhtChartAdapterHashes,
  DhtDataPoint,
} from "./dht-chart-adapter";
import { BehaviorSubject, Subscription } from "rxjs";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

const MAX_DATA_POINTS = 360;

@Component({
  selector: "app-dht-dashboard",
  standalone: true,
  imports: [AppModule, DocumentTitleComponent, ChartComponent],
  templateUrl: "./dht-dashboard.component.html",
  styleUrl: "./dht-dashboard.component.scss",
  providers: [DhtStatsService],
})
export class DhtDashboardComponent implements OnInit, OnDestroy {
  dhtStats = inject(DhtStatsService);
  nodesChartAdapter = inject(DhtChartAdapterNodes);
  hashesChartAdapter = inject(DhtChartAdapterHashes);

  private dataPoints: DhtDataPoint[] = [];
  private dataSubject = new BehaviorSubject<DhtDataPoint[]>([]);
  dataPoints$ = this.dataSubject.asObservable();

  private subscription: Subscription;

  serverUptime = "";
  lastSuccess = "";

  ngOnInit() {
    this.subscription = this.dhtStats.result$.subscribe((result) => {
      if (result.error) return;

      this.dataPoints.push({
        timestamp: new Date(),
        nodesCountIPv4: result.nodesCountIPv4,
        nodesCountIPv6: result.nodesCountIPv6,
        hashesCountIPv4: result.hashesCountIPv4,
        hashesCountIPv6: result.hashesCountIPv6,
      });

      if (this.dataPoints.length > MAX_DATA_POINTS) {
        this.dataPoints = this.dataPoints.slice(-MAX_DATA_POINTS);
      }

      this.dataSubject.next([...this.dataPoints]);

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
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
