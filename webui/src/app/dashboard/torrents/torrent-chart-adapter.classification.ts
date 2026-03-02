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
export class TorrentChartAdapterClassificationRate
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
    const rateData: number[] = [];

    if (data) {
      for (const point of data) {
        labels.push(
          formatDate(new Date(point.bucket), "d LLL H:mm", {
            locale: resolveDateLocale(this.transloco.getActiveLang()),
          }),
        );
        const rate =
          point.totalCount > 0
            ? (point.classifiedCount / point.totalCount) * 100
            : 0;
        rateData.push(Math.round(rate * 100) / 100);
      }
    }

    const lineColor = colors[createThemeColor("tertiary", 50)];

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
            min: 0,
            max: 100,
            ticks: {
              color: foreground,
              callback: (v) => `${v}%`,
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
              label: (context) => `${(context.parsed.y ?? 0).toFixed(2)}%`,
            },
          },
        },
      },
      data: {
        labels,
        datasets: [
          {
            label: "Classification Rate",
            data: rateData,
            borderColor: lineColor,
            backgroundColor: withAlpha(lineColor, 0.08),
            fill: true,
          },
        ],
      },
    };
  }
}
