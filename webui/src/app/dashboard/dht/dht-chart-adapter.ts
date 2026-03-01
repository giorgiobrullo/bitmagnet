import { ChartConfiguration } from "chart.js";
import { inject, Injectable } from "@angular/core";
import { TranslocoService } from "@jsverse/transloco";
import { format as formatDate } from "date-fns/format";
import { ChartAdapter, FactoryParams } from "../../charting/types";
import { createThemeColor } from "../../themes/theme-utils";
import { ThemeInfoService } from "../../themes/theme-info.service";
import { resolveDateLocale } from "../../dates/dates.locales";

export type DhtDataPoint = {
  timestamp: Date;
  nodesCountIPv4: number;
  nodesCountIPv6: number;
  hashesCountIPv4: number;
  hashesCountIPv6: number;
};

@Injectable({ providedIn: "root" })
export class DhtChartAdapterNodes
  implements ChartAdapter<DhtDataPoint[], "line">
{
  private themeInfo = inject(ThemeInfoService);
  private transloco = inject(TranslocoService);

  create(
    data: DhtDataPoint[] | undefined,
    params: FactoryParams,
  ): ChartConfiguration<"line"> {
    const { colors } = this.themeInfo.info;
    const foreground = colors["foreground"];
    const gridColor =
      colors[createThemeColor("neutral-variant", 50)] + "33";
    const labels: string[] = [];
    const ipv4Data: number[] = [];
    const ipv6Data: number[] = [];

    if (data) {
      for (const point of data) {
        labels.push(
          formatDate(point.timestamp, "H:mm:ss", {
            locale: resolveDateLocale(this.transloco.getActiveLang()),
          }),
        );
        ipv4Data.push(point.nodesCountIPv4);
        ipv6Data.push(point.nodesCountIPv6);
      }
    }

    return {
      type: "line",
      options: {
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: { tension: 0.3 },
          point: { radius: 0 },
        },
        scales: {
          x: {
            ticks: { color: foreground },
            grid: { color: gridColor },
          },
          y: {
            position: "left",
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
          decimation: { enabled: true },
        },
      },
      data: {
        labels,
        datasets: [
          {
            label: "IPv4 Nodes",
            data: ipv4Data,
            hidden: params.hiddenDatasets.get("IPv4 Nodes") ?? false,
            borderColor: colors[createThemeColor("primary", 50)],
            backgroundColor: colors[createThemeColor("primary", 80)] + "33",
            fill: true,
          },
          {
            label: "IPv6 Nodes",
            data: ipv6Data,
            hidden: params.hiddenDatasets.get("IPv6 Nodes") ?? false,
            borderColor: colors[createThemeColor("secondary", 50)],
            backgroundColor:
              colors[createThemeColor("secondary", 80)] + "33",
            fill: true,
          },
        ],
      },
    };
  }
}

@Injectable({ providedIn: "root" })
export class DhtChartAdapterHashes
  implements ChartAdapter<DhtDataPoint[], "line">
{
  private themeInfo = inject(ThemeInfoService);
  private transloco = inject(TranslocoService);

  create(
    data: DhtDataPoint[] | undefined,
    params: FactoryParams,
  ): ChartConfiguration<"line"> {
    const { colors } = this.themeInfo.info;
    const foreground = colors["foreground"];
    const gridColor =
      colors[createThemeColor("neutral-variant", 50)] + "33";
    const labels: string[] = [];
    const ipv4Data: number[] = [];
    const ipv6Data: number[] = [];

    if (data) {
      for (const point of data) {
        labels.push(
          formatDate(point.timestamp, "H:mm:ss", {
            locale: resolveDateLocale(this.transloco.getActiveLang()),
          }),
        );
        ipv4Data.push(point.hashesCountIPv4);
        ipv6Data.push(point.hashesCountIPv6);
      }
    }

    return {
      type: "line",
      options: {
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: { tension: 0.3 },
          point: { radius: 0 },
        },
        scales: {
          x: {
            ticks: { color: foreground },
            grid: { color: gridColor },
          },
          y: {
            position: "left",
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
          decimation: { enabled: true },
        },
      },
      data: {
        labels,
        datasets: [
          {
            label: "IPv4 Hashes",
            data: ipv4Data,
            hidden: params.hiddenDatasets.get("IPv4 Hashes") ?? false,
            borderColor: colors[createThemeColor("tertiary", 50)],
            backgroundColor:
              colors[createThemeColor("tertiary", 80)] + "33",
            fill: true,
          },
          {
            label: "IPv6 Hashes",
            data: ipv6Data,
            hidden: params.hiddenDatasets.get("IPv6 Hashes") ?? false,
            borderColor: colors[createThemeColor("caution", 50)],
            backgroundColor:
              colors[createThemeColor("caution", 80)] + "33",
            fill: true,
          },
        ],
      },
    };
  }
}
