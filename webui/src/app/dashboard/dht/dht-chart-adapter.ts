import { ChartConfiguration } from "chart.js";
import { inject, Injectable } from "@angular/core";
import { TranslocoService } from "@jsverse/transloco";
import { format as formatDate } from "date-fns/format";
import { ChartAdapter, FactoryParams } from "../../charting/types";
import { createThemeColor } from "../../themes/theme-utils";
import { ThemeInfoService } from "../../themes/theme-info.service";
import { resolveDateLocale } from "../../dates/dates.locales";
import { DhtMetricsSnapshot } from "./dht-metrics.controller";

/** Convert an rgb(...) string to rgba(..., alpha). */
function withAlpha(rgb: string | undefined, alpha: number): string {
  if (!rgb) return `rgba(128,128,128,${alpha})`;
  const match = rgb.match(/\d+/g);
  if (!match || match.length < 3) return `rgba(128,128,128,${alpha})`;
  return `rgba(${match[0]},${match[1]},${match[2]},${alpha})`;
}

@Injectable({ providedIn: "root" })
export class DhtChartAdapterNodes
  implements ChartAdapter<DhtMetricsSnapshot[], "line">
{
  private themeInfo = inject(ThemeInfoService);
  private transloco = inject(TranslocoService);

  create(
    data: DhtMetricsSnapshot[] | undefined,
    params: FactoryParams,
  ): ChartConfiguration<"line"> {
    const { colors } = this.themeInfo.info;
    const foreground = colors["foreground"];
    const gridColor = withAlpha(
      colors[createThemeColor("neutral-variant", 50)],
      0.2,
    );
    const labels: string[] = [];
    const ipv4Data: number[] = [];
    const ipv6Data: number[] = [];

    if (data) {
      for (const point of data) {
        labels.push(
          formatDate(new Date(point.bucket), "d LLL H:mm", {
            locale: resolveDateLocale(this.transloco.getActiveLang()),
          }),
        );
        ipv4Data.push(point.nodesIPv4);
        ipv6Data.push(point.nodesIPv6);
      }
    }

    const ipv4Label = "IPv4";
    const ipv6Label = "IPv6";
    const ipv4Color = colors[createThemeColor("primary", 50)];
    const ipv6Color = colors[createThemeColor("secondary", 50)];

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
            stacked: true,
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
            onClick: params.legendOnClick,
            labels: { color: foreground },
          },
        },
      },
      data: {
        labels,
        datasets: [
          {
            label: ipv4Label,
            data: ipv4Data,
            hidden: params.hiddenDatasets.get(ipv4Label) ?? false,
            borderColor: ipv4Color,
            backgroundColor: withAlpha(ipv4Color, 0.15),
            fill: "origin",
          },
          {
            label: ipv6Label,
            data: ipv6Data,
            hidden: params.hiddenDatasets.get(ipv6Label) ?? false,
            borderColor: ipv6Color,
            backgroundColor: withAlpha(ipv6Color, 0.15),
            fill: "-1",
          },
        ],
      },
    };
  }
}

@Injectable({ providedIn: "root" })
export class DhtChartAdapterHashes
  implements ChartAdapter<DhtMetricsSnapshot[], "line">
{
  private themeInfo = inject(ThemeInfoService);
  private transloco = inject(TranslocoService);

  create(
    data: DhtMetricsSnapshot[] | undefined,
    params: FactoryParams,
  ): ChartConfiguration<"line"> {
    const { colors } = this.themeInfo.info;
    const foreground = colors["foreground"];
    const gridColor = withAlpha(
      colors[createThemeColor("neutral-variant", 50)],
      0.2,
    );
    const labels: string[] = [];
    const ipv4Data: number[] = [];
    const ipv6Data: number[] = [];

    if (data) {
      for (const point of data) {
        labels.push(
          formatDate(new Date(point.bucket), "d LLL H:mm", {
            locale: resolveDateLocale(this.transloco.getActiveLang()),
          }),
        );
        ipv4Data.push(point.hashesIPv4);
        ipv6Data.push(point.hashesIPv6);
      }
    }

    const ipv4Label = "IPv4";
    const ipv6Label = "IPv6";
    const ipv4Color = colors[createThemeColor("tertiary", 50)];
    const ipv6Color = colors[createThemeColor("caution", 50)];

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
            onClick: params.legendOnClick,
            labels: { color: foreground },
          },
        },
      },
      data: {
        labels,
        datasets: [
          {
            label: ipv4Label,
            data: ipv4Data,
            hidden: params.hiddenDatasets.get(ipv4Label) ?? false,
            borderColor: ipv4Color,
            backgroundColor: withAlpha(ipv4Color, 0.1),
            fill: true,
          },
          {
            label: ipv6Label,
            data: ipv6Data,
            hidden: params.hiddenDatasets.get(ipv6Label) ?? false,
            borderColor: ipv6Color,
            backgroundColor: withAlpha(ipv6Color, 0.1),
            fill: true,
          },
        ],
      },
    };
  }
}

@Injectable({ providedIn: "root" })
export class DhtChartAdapterComposition
  implements ChartAdapter<{ ipv4: number; ipv6: number }, "doughnut">
{
  private themeInfo = inject(ThemeInfoService);

  create(
    data: { ipv4: number; ipv6: number } | undefined,
    params: FactoryParams,
  ): ChartConfiguration<"doughnut"> {
    const { colors } = this.themeInfo.info;
    const foreground = colors["foreground"];

    return {
      type: "doughnut",
      options: {
        animation: { animateRotate: true, duration: 600 },
        responsive: true,
        maintainAspectRatio: true,
        cutout: "65%",
        plugins: {
          legend: {
            display: params.legend,
            position: "bottom",
            labels: { color: foreground, boxWidth: 12 },
          },
        },
      },
      data: {
        labels: ["IPv4", "IPv6"],
        datasets: [
          {
            data: [data?.ipv4 ?? 0, data?.ipv6 ?? 0],
            backgroundColor: [
              colors[createThemeColor("primary", 50)],
              colors[createThemeColor("secondary", 50)],
            ],
            borderWidth: 0,
          },
        ],
      },
    };
  }
}
