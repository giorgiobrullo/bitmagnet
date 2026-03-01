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

@Injectable({ providedIn: "root" })
export class TorrentChartAdapterLibraryGrowth
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
    const countData: number[] = [];

    if (data) {
      for (const point of data) {
        labels.push(
          formatDate(new Date(point.bucket), "d LLL H:mm", {
            locale: resolveDateLocale(this.transloco.getActiveLang()),
          }),
        );
        countData.push(point.totalCount);
      }
    }

    const lineColor = colors[createThemeColor("primary", 50)];

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
              callback: (v) =>
                parseInt(v as string).toLocaleString(
                  this.transloco.getActiveLang(),
                ),
            },
            grid: { color: gridColor },
          },
        },
        plugins: {
          legend: {
            display: params.legend,
            labels: { color: foreground },
          },
        },
      },
      data: {
        labels,
        datasets: [
          {
            label: "Torrents",
            data: countData,
            borderColor: lineColor,
            backgroundColor: withAlpha(lineColor, 0.08),
            fill: true,
          },
        ],
      },
    };
  }
}
