import { ChartConfiguration } from "chart.js";
import { inject, Injectable } from "@angular/core";
import { ChartAdapter, FactoryParams } from "../../charting/types";
import { createThemeColor } from "../../themes/theme-utils";
import { ThemeInfoService } from "../../themes/theme-info.service";
import { ThemeBaseColor } from "../../themes/theme-types";
import { TorrentContentCount } from "./torrent-library-metrics.controller";

const contentTypeColors: Record<string, ThemeBaseColor> = {
  movie: "primary",
  tv_show: "secondary",
  music: "tertiary",
  ebook: "caution",
  game: "success",
  software: "error",
  audiobook: "neutral-variant",
  comic: "neutral",
  xxx: "neutral-variant",
};

function contentTypeLabel(type: string): string {
  return type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

@Injectable({ providedIn: "root" })
export class TorrentChartAdapterContentBreakdown
  implements ChartAdapter<TorrentContentCount[], "doughnut">
{
  private themeInfo = inject(ThemeInfoService);

  create(
    data: TorrentContentCount[] | undefined,
    params: FactoryParams,
  ): ChartConfiguration<"doughnut"> {
    const { colors } = this.themeInfo.info;
    const foreground = colors["foreground"];

    const labels: string[] = [];
    const values: number[] = [];
    const bgColors: string[] = [];

    if (data) {
      for (const item of data) {
        labels.push(contentTypeLabel(item.contentType));
        values.push(item.count);
        const baseColor = contentTypeColors[item.contentType] ?? "neutral";
        bgColors.push(
          colors[createThemeColor(baseColor, 50)] ?? "rgb(128,128,128)",
        );
      }
    }

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
            position: "left",
            labels: { color: foreground, boxWidth: 12 },
          },
        },
      },
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: bgColors,
            borderWidth: 0,
          },
        ],
      },
    };
  }
}
