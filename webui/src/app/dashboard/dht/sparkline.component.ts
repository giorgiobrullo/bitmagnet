import {
  Component,
  Input,
  OnChanges,
  ElementRef,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-sparkline",
  standalone: true,
  template: `<svg
    #svgEl
    [attr.viewBox]="'0 0 ' + width + ' ' + height"
    [style.width.px]="width"
    [style.height.px]="height"
    preserveAspectRatio="none"
  >
    <polyline
      [attr.points]="points"
      fill="none"
      [attr.stroke]="color"
      stroke-width="1.5"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
  </svg>`,
  styles: [
    `
      :host {
        display: block;
        line-height: 0;
      }
      svg {
        width: 100%;
        height: auto;
      }
    `,
  ],
})
export class SparklineComponent implements OnChanges {
  @Input() data: number[] = [];
  @Input() color = "currentColor";
  @Input() width = 80;
  @Input() height = 24;

  @ViewChild("svgEl") svgEl: ElementRef<SVGElement>;

  points = "";

  ngOnChanges() {
    this.points = this.computePoints();
  }

  private computePoints(): string {
    if (this.data.length < 2) return "";

    const min = Math.min(...this.data);
    const max = Math.max(...this.data);
    const range = max - min || 1;
    const padding = 2;
    const usableHeight = this.height - padding * 2;
    const step = this.width / (this.data.length - 1);

    return this.data
      .map((v, i) => {
        const x = i * step;
        const y = padding + usableHeight - ((v - min) / range) * usableHeight;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  }
}
