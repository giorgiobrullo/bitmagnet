import { ChartConfiguration } from "chart.js";
import { inject, Injectable } from "@angular/core";
import { TranslocoService } from "@jsverse/transloco";
import { format as formatDate } from "date-fns/format";
import { ChartAdapter, FactoryParams } from "../../charting/types";
import { createThemeColor } from "../../themes/theme-utils";
import { ThemeInfoService } from "../../themes/theme-info.service";
import { resolveDateLocale } from "../../dates/dates.locales";
import { withAlpha } from "../../charting/color-utils";
import { TorrentLibrarySnapshot } from "./torrent-library-metrics.controller";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, i);
  return `${value.toFixed(i > 0 ? 1 : 0)} ${units[i]}`;
}

@Injectable({ providedIn: "root" })
export class TorrentChartAdapterStorageGrowth
  implements ChartAdapter<TorrentLibrarySnapshot[], "line">
{
  private themeInfo = inject(ThemeInfoService);
  private transloco = inject(TranslocoService);

  create(
    data: TorrentLibrarySnapshot[] | undefined,
    params: FactoryParams,
  ): ChartConfiguration<"line"> {
    const { colors } = this.themeInfo.info;
    const foreground = colors["foreground"];
    const gridColor = withAlpha(
      colors[createThemeColor("neutral-variant", 50)],
      0.2,
    );
    const labels: string[] = [];
    const sizeData: number[] = [];

    if (data) {
      for (const point of data) {
        labels.push(
          formatDate(new Date(point.bucket), "d LLL H:mm", {
            locale: resolveDateLocale(this.transloco.getActiveLang()),
          }),
        );
        sizeData.push(point.totalSize);
      }
    }

    const lineColor = colors[createThemeColor("secondary", 50)];

    return {
      type: "line",
      options: {
        animation: { duration: 400 },
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: { tension: 0.3, borderWidth: 2 },
          point: { radius: 0, hitRadius: 8, hoverRadius: 4 },
        },
        scales: {
          x: {
            ticks: { color: foreground, maxTicksLimit: 12 },
            grid: { color: gridColor },
          },
          y: {
            beginAtZero: false,
            ticks: {
              color: foreground,
              callback: (v) => formatBytes(Number(v)),
            },
            grid: { color: gridColor },
          },
        },
        plugins: {
          legend: {
            display: params.legend,
            labels: { color: foreground },
          },
          tooltip: {
            callbacks: {
              label: (context) => formatBytes(context.parsed.y ?? 0),
            },
          },
        },
      },
      data: {
        labels,
        datasets: [
          {
            label: "Storage",
            data: sizeData,
            borderColor: lineColor,
            backgroundColor: withAlpha(lineColor, 0.08),
            fill: true,
          },
        ],
      },
    };
  }
}
