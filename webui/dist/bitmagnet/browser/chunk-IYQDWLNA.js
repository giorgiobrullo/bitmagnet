import {
  TorrentChipsComponent,
  TorrentContentComponent
} from "./chunk-XVOBCOHL.js";
import "./chunk-7HU4DZDM.js";
import "./chunk-YTGJFPX5.js";
import {
  contentTypeInfo
} from "./chunk-PGFIUX4D.js";
import "./chunk-SPPBVMMP.js";
import "./chunk-GPFHSAQX.js";
import "./chunk-5K6VXQU2.js";
import "./chunk-4IHHGFOU.js";
import {
  DocumentTitleComponent
} from "./chunk-MNRKI74J.js";
import {
  Apollo,
  AppModule,
  GraphQLModule,
  MatCard,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatIcon,
  MatProgressBar,
  MatTooltip,
  TorrentContentSearchDocument,
  TranslocoDirective
} from "./chunk-G4Q67IMQ.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-7NLLN7HY.js";
import {
  Component,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinterpolate,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-BQWGEQNI.js";

// src/app/torrents/torrent-permalink.component.ts
var _c0 = (a0, a1) => [a0, a1];
function TorrentPermalinkComponent_ng_container_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-bar", 2);
  }
}
function TorrentPermalinkComponent_ng_container_0_Conditional_3_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 8)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "code");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", t_r1("torrents.v2_hash"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.torrentContent.torrent.infoHashV2);
  }
}
function TorrentPermalinkComponent_ng_container_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 3)(1, "mat-card-header")(2, "mat-icon", 4);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-card-title")(5, "h2");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 5);
    \u0275\u0275element(8, "mat-icon", 6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "mat-card-subtitle");
    \u0275\u0275element(10, "app-torrent-chips", 7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "mat-card-content");
    \u0275\u0275conditionalCreate(12, TorrentPermalinkComponent_ng_container_0_Conditional_3_Conditional_12_Template, 5, 2, "p", 8);
    \u0275\u0275element(13, "app-torrent-content", 9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const t_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("matTooltip", t_r1("content_types.singular." + (ctx_r1.torrentContent.contentType ?? "null")));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(((tmp_4_0 = ctx_r1.contentTypeInfo(ctx_r1.torrentContent.contentType)) == null ? null : tmp_4_0.icon) ?? "question_mark");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.torrentContent.torrent.name);
    \u0275\u0275advance();
    \u0275\u0275property("href", \u0275\u0275interpolate(ctx_r1.torrentContent.torrent.magnetUri), \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275property("torrentContent", ctx_r1.torrentContent);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.torrentContent.torrent.infoHashV2 ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("torrentContent", ctx_r1.torrentContent)("heading", false);
  }
}
function TorrentPermalinkComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "app-document-title", 1);
    \u0275\u0275conditionalCreate(2, TorrentPermalinkComponent_ng_container_0_Conditional_2_Template, 1, 0, "mat-progress-bar", 2)(3, TorrentPermalinkComponent_ng_container_0_Conditional_3_Template, 14, 9, "mat-card", 3);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const t_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("parts", \u0275\u0275pureFunction2(2, _c0, ctx_r1.torrentContent == null ? null : ctx_r1.torrentContent.title, t_r1("torrents.permalink")));
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.torrentContent ? 2 : 3);
  }
}
var TorrentPermalinkComponent = class _TorrentPermalinkComponent {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.apollo = inject(Apollo);
    this.contentTypeInfo = contentTypeInfo;
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const infoHash = params.get("infoHash");
      if (typeof infoHash !== "string" || !/^[0-9a-f]{40}$/.test(infoHash)) {
        return this.notFound();
      }
      this.apollo.query({
        query: TorrentContentSearchDocument,
        variables: {
          input: {
            infoHashes: [infoHash]
          }
        },
        fetchPolicy: "no-cache"
      }).subscribe((result) => {
        const items = result.data.torrentContent.search.items;
        if (items.length === 0) {
          return this.notFound();
        }
        this.torrentContent = items[0];
      });
    });
  }
  notFound() {
    void this.router.navigate(["/not-found"], {
      skipLocationChange: true
    });
  }
  static {
    this.\u0275fac = function TorrentPermalinkComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TorrentPermalinkComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TorrentPermalinkComponent, selectors: [["app-torrent-permalink"]], decls: 1, vars: 0, consts: [[4, "transloco"], [3, "parts"], ["mode", "indeterminate"], [1, "torrent-permalink"], ["matCardAvatar", "", 3, "matTooltip"], [1, "magnet-link", 3, "href"], ["svgIcon", "magnet"], [3, "torrentContent"], [1, "info-hash-v2"], [3, "torrentContent", "heading"]], template: function TorrentPermalinkComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, TorrentPermalinkComponent_ng_container_0_Template, 4, 5, "ng-container", 0);
      }
    }, dependencies: [
      AppModule,
      MatCard,
      MatCardAvatar,
      MatCardContent,
      MatCardHeader,
      MatCardSubtitle,
      MatCardTitle,
      MatIcon,
      MatProgressBar,
      MatTooltip,
      TranslocoDirective,
      GraphQLModule,
      TorrentContentComponent,
      TorrentChipsComponent,
      DocumentTitleComponent
    ], styles: ["\n\n.torrent-permalink[_ngcontent-%COMP%] {\n  max-width: 900px;\n  margin: 20px auto;\n}\n.torrent-permalink[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 24px;\n  word-break: break-word;\n  overflow-wrap: break-word;\n  padding-right: 80px;\n}\n.torrent-permalink[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   .magnet-link[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 20px;\n  top: 20px;\n}\n.torrent-permalink[_ngcontent-%COMP%]   .mat-mdc-card-avatar[_ngcontent-%COMP%] {\n  font-size: 44px;\n  margin-top: -10px;\n  border-radius: 0;\n  overflow: visible;\n}\n.torrent-permalink[_ngcontent-%COMP%]   mat-card-subtitle[_ngcontent-%COMP%] {\n  margin: 16px 0 14px -56px;\n  font-size: 6px;\n}\n/*# sourceMappingURL=torrent-permalink.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TorrentPermalinkComponent, [{
    type: Component,
    args: [{ selector: "app-torrent-permalink", standalone: true, imports: [
      AppModule,
      GraphQLModule,
      TorrentContentComponent,
      TorrentChipsComponent,
      DocumentTitleComponent
    ], template: `<ng-container *transloco="let t">
  <app-document-title
    [parts]="[torrentContent?.title, t('torrents.permalink')]"
  />
  @if (!torrentContent) {
    <mat-progress-bar mode="indeterminate"></mat-progress-bar>
  } @else {
    <mat-card class="torrent-permalink">
      <mat-card-header>
        <mat-icon
          matCardAvatar
          [matTooltip]="
            t(
              'content_types.singular.' + (torrentContent.contentType ?? 'null')
            )
          "
          >{{
            contentTypeInfo(torrentContent.contentType)?.icon ?? "question_mark"
          }}</mat-icon
        >
        <mat-card-title>
          <h2>{{ torrentContent.torrent.name }}</h2>
          <a class="magnet-link" href="{{ torrentContent.torrent.magnetUri }}"
            ><mat-icon svgIcon="magnet"></mat-icon
          ></a>
        </mat-card-title>
        <mat-card-subtitle>
          <app-torrent-chips [torrentContent]="torrentContent" />
        </mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        @if (torrentContent.torrent.infoHashV2) {
          <p class="info-hash-v2">
            <strong>{{ t("torrents.v2_hash") }}:</strong>
            <code>{{ torrentContent.torrent.infoHashV2 }}</code>
          </p>
        }
        <app-torrent-content
          [torrentContent]="torrentContent"
          [heading]="false"
        />
      </mat-card-content>
    </mat-card>
  }
</ng-container>
`, styles: ["/* src/app/torrents/torrent-permalink.component.scss */\n.torrent-permalink {\n  max-width: 900px;\n  margin: 20px auto;\n}\n.torrent-permalink mat-card-title h2 {\n  margin: 0;\n  font-size: 24px;\n  word-break: break-word;\n  overflow-wrap: break-word;\n  padding-right: 80px;\n}\n.torrent-permalink mat-card-title .magnet-link {\n  position: absolute;\n  right: 20px;\n  top: 20px;\n}\n.torrent-permalink .mat-mdc-card-avatar {\n  font-size: 44px;\n  margin-top: -10px;\n  border-radius: 0;\n  overflow: visible;\n}\n.torrent-permalink mat-card-subtitle {\n  margin: 16px 0 14px -56px;\n  font-size: 6px;\n}\n/*# sourceMappingURL=torrent-permalink.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TorrentPermalinkComponent, { className: "TorrentPermalinkComponent", filePath: "src/app/torrents/torrent-permalink.component.ts", lineNumber: 25 });
})();
export {
  TorrentPermalinkComponent
};
//# sourceMappingURL=chunk-IYQDWLNA.js.map
