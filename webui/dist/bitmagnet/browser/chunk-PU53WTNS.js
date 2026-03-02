import {
  PaginatorComponent,
  TimeAgoPipe
} from "./chunk-UB7K2VAJ.js";
import {
  ErrorsService
} from "./chunk-BNLC4R4X.js";
import {
  BreakpointsService
} from "./chunk-MKQWY5SO.js";
import {
  Apollo,
  AppModule,
  COMMA,
  CdkCopyToClipboard,
  DefaultValueAccessor,
  ENTER,
  FormControl,
  FormControlDirective,
  GraphQLService,
  MatAutocomplete,
  MatAutocompleteTrigger,
  MatButton,
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCell,
  MatCellDef,
  MatCheckbox,
  MatChip,
  MatChipAvatar,
  MatChipGrid,
  MatChipInput,
  MatChipRemove,
  MatChipRow,
  MatChipSet,
  MatColumnDef,
  MatDivider,
  MatFormField,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatIcon,
  MatOption,
  MatProgressBar,
  MatRow,
  MatRowDef,
  MatTab,
  MatTabContent,
  MatTabGroup,
  MatTabLabel,
  MatTable,
  MatTooltip,
  NgControlStatus,
  TorrentFilesDocument,
  TorrentReprocessDocument,
  TranslocoDirective,
  TranslocoService
} from "./chunk-EOZPNCBR.js";
import {
  AsyncPipe,
  DecimalPipe,
  NgOptimizedImage,
  RouterLink
} from "./chunk-7NLLN7HY.js";
import {
  BehaviorSubject,
  Component,
  EMPTY,
  EventEmitter,
  Input,
  Output,
  Pipe,
  __spreadProps,
  __spreadValues,
  catchError,
  debounceTime,
  inject,
  map,
  setClassMetadata,
  tap,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefinePipe,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-BQWGEQNI.js";

// src/app/torrents/torrent-chips.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function TorrentChipsComponent_ng_container_0_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 1)(1, "mat-icon", 2);
    \u0275\u0275text(2, "sell");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tagName_r1 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", tagName_r1, " ");
  }
}
function TorrentChipsComponent_ng_container_0_Conditional_4_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const l_r2 = ctx.$implicit;
    const \u0275$index_20_r3 = ctx.$index;
    const languages_r4 = \u0275\u0275nextContext();
    const t_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", t_r5("languages." + l_r2.id) + (\u0275$index_20_r3 < languages_r4.length - 1 ? ", " : ""), " ");
  }
}
function TorrentChipsComponent_ng_container_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip")(1, "mat-icon", 2);
    \u0275\u0275text(2, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, TorrentChipsComponent_ng_container_0_Conditional_4_For_4_Template, 1, 1, null, null, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx);
  }
}
function TorrentChipsComponent_ng_container_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function TorrentChipsComponent_ng_container_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip")(1, "mat-icon", 2);
    \u0275\u0275text(2, "aspect_ratio");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx);
  }
}
function TorrentChipsComponent_ng_container_0_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip")(1, "mat-icon", 2);
    \u0275\u0275text(2, "album");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx);
  }
}
function TorrentChipsComponent_ng_container_0_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip");
    \u0275\u0275element(1, "mat-icon", 3);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx);
  }
}
function TorrentChipsComponent_ng_container_0_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function TorrentChipsComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "mat-chip-set");
    \u0275\u0275repeaterCreate(2, TorrentChipsComponent_ng_container_0_For_3_Template, 4, 1, "mat-chip", 1, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275conditionalCreate(4, TorrentChipsComponent_ng_container_0_Conditional_4_Template, 5, 0, "mat-chip");
    \u0275\u0275conditionalCreate(5, TorrentChipsComponent_ng_container_0_Conditional_5_Template, 2, 1, "mat-chip");
    \u0275\u0275conditionalCreate(6, TorrentChipsComponent_ng_container_0_Conditional_6_Template, 4, 1, "mat-chip");
    \u0275\u0275conditionalCreate(7, TorrentChipsComponent_ng_container_0_Conditional_7_Template, 4, 1, "mat-chip");
    \u0275\u0275conditionalCreate(8, TorrentChipsComponent_ng_container_0_Conditional_8_Template, 3, 1, "mat-chip");
    \u0275\u0275conditionalCreate(9, TorrentChipsComponent_ng_container_0_Conditional_9_Template, 2, 1, "mat-chip");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r5.torrentContent.torrent.tagNames);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_3_0 = ctx_r5.torrentContent.languages) ? 4 : -1, tmp_3_0);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_4_0 = ctx_r5.torrentContent.video3d == null ? null : ctx_r5.torrentContent.video3d.slice(1)) ? 5 : -1, tmp_4_0);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_5_0 = ctx_r5.torrentContent.videoResolution == null ? null : ctx_r5.torrentContent.videoResolution.slice(1)) ? 6 : -1, tmp_5_0);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_6_0 = ctx_r5.torrentContent.videoSource) ? 7 : -1, tmp_6_0);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_7_0 = ctx_r5.torrentContent.videoCodec) ? 8 : -1, tmp_7_0);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_8_0 = ctx_r5.torrentContent.videoModifier) ? 9 : -1, tmp_8_0);
  }
}
var TorrentChipsComponent = class _TorrentChipsComponent {
  static {
    this.\u0275fac = function TorrentChipsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TorrentChipsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TorrentChipsComponent, selectors: [["app-torrent-chips"]], inputs: { torrentContent: "torrentContent" }, decls: 1, vars: 0, consts: [[4, "transloco"], [1, "chip-primary"], ["matChipAvatar", ""], ["matChipAvatar", "", "svgIcon", "binary"]], template: function TorrentChipsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, TorrentChipsComponent_ng_container_0_Template, 10, 6, "ng-container", 0);
      }
    }, dependencies: [AppModule, MatChip, MatChipAvatar, MatChipSet, MatIcon, TranslocoDirective], styles: ["\n\nmat-chip-set[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  position: relative;\n  left: 4px;\n}\n/*# sourceMappingURL=torrent-chips.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TorrentChipsComponent, [{
    type: Component,
    args: [{ selector: "app-torrent-chips", standalone: true, imports: [AppModule], template: '<ng-container *transloco="let t">\n  <mat-chip-set>\n    @for (tagName of torrentContent.torrent.tagNames; track tagName) {\n      <mat-chip class="chip-primary">\n        <mat-icon matChipAvatar>sell</mat-icon>\n        {{ tagName }}\n      </mat-chip>\n    }\n    @if (torrentContent.languages; as languages) {\n      <mat-chip>\n        <mat-icon matChipAvatar>translate</mat-icon>\n        @for (l of languages; let j = $index; track l.id) {\n          {{ t("languages." + l.id) + (j < languages!.length - 1 ? ", " : "") }}\n        }\n      </mat-chip>\n    }\n    @if (torrentContent.video3d?.slice(1); as video3d) {\n      <mat-chip>{{ video3d }}</mat-chip>\n    }\n    @if (torrentContent.videoResolution?.slice(1); as videoResolution) {\n      <mat-chip\n        ><mat-icon matChipAvatar>aspect_ratio</mat-icon\n        >{{ videoResolution }}</mat-chip\n      >\n    }\n    @if (torrentContent.videoSource; as videoSource) {\n      <mat-chip\n        ><mat-icon matChipAvatar>album</mat-icon>{{ videoSource }}</mat-chip\n      >\n    }\n    @if (torrentContent.videoCodec; as videoCodec) {\n      <mat-chip\n        ><mat-icon matChipAvatar svgIcon="binary" />{{ videoCodec }}</mat-chip\n      >\n    }\n    @if (torrentContent.videoModifier; as videoModifier) {\n      <mat-chip>{{ videoModifier }}</mat-chip>\n    }\n  </mat-chip-set>\n</ng-container>\n', styles: ["/* src/app/torrents/torrent-chips.component.scss */\nmat-chip-set mat-icon {\n  position: relative;\n  left: 4px;\n}\n/*# sourceMappingURL=torrent-chips.component.css.map */\n"] }]
  }], null, { torrentContent: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TorrentChipsComponent, { className: "TorrentChipsComponent", filePath: "src/app/torrents/torrent-chips.component.ts", lineNumber: 12 });
})();

// src/app/torrents/torrents-search.controller.ts
var torrentTabNames = [
  "files",
  "tags",
  "reprocess",
  "delete"
];
var compareTorrentSelection = (a, b) => {
  if (a && b) {
    return a.infoHash === b.infoHash && a.tab === b.tab;
  }
  return a === b;
};
var controlsToQueryVariables = (ctrl) => ({
  input: {
    queryString: ctrl.queryString,
    limit: ctrl.limit,
    page: ctrl.page,
    totalCount: true,
    hasNextPage: true,
    orderBy: [ctrl.orderBy],
    facets: {
      contentType: {
        aggregate: true,
        filter: ctrl.contentType ? [ctrl.contentType === "null" ? null : ctrl.contentType] : void 0
      },
      genre: ctrl.facets.genre.active ? {
        aggregate: true,
        filter: ctrl.facets.genre.filter
      } : void 0,
      language: ctrl.facets.language.active ? {
        aggregate: ctrl.facets.language.active,
        filter: ctrl.facets.language.filter
      } : void 0,
      torrentFileType: ctrl.facets.fileType.active ? {
        aggregate: true,
        filter: ctrl.facets.fileType.filter
      } : void 0,
      torrentSource: ctrl.facets.torrentSource.active ? {
        aggregate: true,
        filter: ctrl.facets.torrentSource.filter
      } : void 0,
      torrentTag: ctrl.facets.torrentTag.active ? {
        aggregate: true,
        filter: ctrl.facets.torrentTag.filter
      } : void 0,
      videoResolution: ctrl.facets.videoResolution.active ? {
        aggregate: true,
        filter: ctrl.facets.videoResolution.filter
      } : void 0,
      videoSource: ctrl.facets.videoSource.active ? {
        aggregate: true,
        filter: ctrl.facets.videoSource.filter
      } : void 0,
      sizeRange: ctrl.sizeRange ? {
        min: ctrl.sizeRange.min ? Number(ctrl.sizeRange.min) : void 0,
        max: ctrl.sizeRange.max ? Number(ctrl.sizeRange.max) : void 0
      } : void 0,
      publishedAt: ctrl.publishedAt || void 0
    }
  }
});
var inactiveFacet = {
  active: false
};
var TorrentsSearchController = class {
  constructor(initialControls) {
    this.controlsSubject = new BehaviorSubject(initialControls);
    this.controls$ = this.controlsSubject.asObservable();
    this.paramsSubject = new BehaviorSubject(controlsToQueryVariables(initialControls));
    this.params$ = this.paramsSubject.asObservable();
    this.selectionSubject = new BehaviorSubject(initialControls.selectedTorrent);
    this.selection$ = this.selectionSubject.asObservable();
    this.controls$.pipe(debounceTime(100)).subscribe((ctrl) => {
      const nextParams = controlsToQueryVariables(ctrl);
      if (JSON.stringify(this.paramsSubject.getValue()) !== JSON.stringify(nextParams)) {
        this.paramsSubject.next(nextParams);
      }
      if (!compareTorrentSelection(this.selectionSubject.getValue(), ctrl.selectedTorrent)) {
        this.selectionSubject.next(ctrl.selectedTorrent);
      }
    });
  }
  update(fn) {
    const ctrl = this.controlsSubject.getValue();
    const next = fn(ctrl);
    if (JSON.stringify(ctrl) !== JSON.stringify(next)) {
      this.controlsSubject.next(next);
    }
  }
  selectTorrent(infoHash, tab) {
    this.update((ctrl) => {
      if (tab === void 0) {
        tab = ctrl.selectedTorrent?.tab;
      } else if (tab === null) {
        tab = void 0;
      }
      return __spreadProps(__spreadValues({}, ctrl), {
        selectedTorrent: {
          infoHash,
          tab
        }
      });
    });
  }
  selectContentType(ct) {
    this.update((ctrl) => __spreadProps(__spreadValues({}, ctrl), {
      contentType: ct,
      page: 1,
      facets: __spreadProps(__spreadValues({}, ctrl.facets), {
        genre: matchesContentType(ct, genreFacet.contentTypes) ? ctrl.facets.genre : inactiveFacet,
        videoResolution: matchesContentType(ct, videoResolutionFacet.contentTypes) ? ctrl.facets.videoResolution : inactiveFacet,
        videoSource: matchesContentType(ct, videoSourceFacet.contentTypes) ? ctrl.facets.videoSource : inactiveFacet
      })
    }));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  activateFacet(def) {
    this.update((ctrl) => __spreadProps(__spreadValues({}, ctrl), {
      facets: def.patchInput(ctrl.facets, __spreadProps(__spreadValues({}, def.extractInput(ctrl.facets)), {
        active: true
      }))
    }));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deactivateFacet(def) {
    this.update((ctrl) => {
      const input = def.extractInput(ctrl.facets);
      return __spreadProps(__spreadValues({}, ctrl), {
        page: input.filter ? 1 : ctrl.page,
        facets: def.patchInput(ctrl.facets, __spreadProps(__spreadValues({}, input), {
          active: false,
          filter: void 0
        }))
      });
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  activateFilter(def, filter) {
    this.update((ctrl) => {
      const input = def.extractInput(ctrl.facets);
      return __spreadProps(__spreadValues({}, ctrl), {
        page: 1,
        facets: def.patchInput(ctrl.facets, __spreadProps(__spreadValues({}, input), {
          filter: Array.from(/* @__PURE__ */ new Set([...input.filter ?? [], filter])).sort()
        }))
      });
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deactivateFilter(def, filter) {
    this.update((ctrl) => {
      const input = def.extractInput(ctrl.facets);
      const nextFilter = input.filter?.filter((value) => value !== filter);
      return __spreadProps(__spreadValues({}, ctrl), {
        page: 1,
        facets: def.patchInput(ctrl.facets, __spreadProps(__spreadValues({}, input), {
          filter: nextFilter?.length ? nextFilter : void 0
        }))
      });
    });
  }
  setQueryString(str) {
    str = str || void 0;
    this.update((ctrl) => {
      let orderBy = ctrl.orderBy;
      if (str) {
        if (str !== ctrl.queryString) {
          orderBy = defaultQueryOrderBy;
        }
      } else if (orderBy.field === "relevance") {
        orderBy = defaultOrderBy;
      }
      return __spreadProps(__spreadValues({}, ctrl), {
        queryString: str,
        orderBy,
        page: str === ctrl.queryString ? ctrl.page : 1
      });
    });
  }
  selectOrderBy(field) {
    const orderBy = {
      field,
      descending: orderByOptions.find((option) => option.field === field)?.descending ?? false
    };
    this.update((ctrl) => __spreadProps(__spreadValues({}, ctrl), {
      orderBy: orderBy.field !== "relevance" || ctrl.queryString ? orderBy : defaultOrderBy,
      page: 1
    }));
  }
  toggleOrderByDirection() {
    this.update((ctrl) => __spreadProps(__spreadValues({}, ctrl), {
      orderBy: __spreadProps(__spreadValues({}, ctrl.orderBy), {
        descending: !ctrl.orderBy.descending
      }),
      page: 1
    }));
  }
  handlePageEvent(event) {
    this.update((ctrl) => __spreadProps(__spreadValues({}, ctrl), {
      limit: event.pageSize,
      page: event.page
    }));
  }
  setPublishedAt(timeFrame) {
    this.update((ctrl) => __spreadProps(__spreadValues({}, ctrl), {
      page: 1,
      publishedAt: timeFrame || void 0
    }));
  }
  setSizeRange(min, max) {
    this.update((ctrl) => __spreadProps(__spreadValues({}, ctrl), {
      page: 1,
      sizeRange: min || max ? { min, max } : void 0
    }));
  }
};
var torrentSourceFacet = {
  key: "torrent_source",
  icon: "mediation",
  allowNull: false,
  extractInput: (f) => f.torrentSource,
  patchInput: (f, i) => __spreadProps(__spreadValues({}, f), {
    torrentSource: i
  }),
  extractAggregations: (aggs) => aggs.torrentSource ?? [],
  resolveLabel: (agg) => agg.label
};
var torrentTagFacet = {
  key: "torrent_tag",
  icon: "sell",
  allowNull: false,
  extractInput: (f) => f.torrentTag,
  patchInput: (f, i) => __spreadProps(__spreadValues({}, f), {
    torrentTag: i
  }),
  extractAggregations: (aggs) => aggs.torrentTag ?? [],
  resolveLabel: (agg) => agg.value
};
var fileTypeFacet = {
  key: "file_type",
  icon: "file_present",
  allowNull: false,
  extractInput: (f) => f.fileType,
  patchInput: (f, i) => __spreadProps(__spreadValues({}, f), {
    fileType: i
  }),
  extractAggregations: (aggs) => aggs.torrentFileType ?? [],
  resolveLabel: (agg, t) => t.translate(`file_types.${agg.value}`)
};
var languageFacet = {
  key: "language",
  icon: "translate",
  allowNull: false,
  extractInput: (f) => f.language,
  patchInput: (f, i) => __spreadProps(__spreadValues({}, f), {
    language: i
  }),
  extractAggregations: (aggs) => aggs.language ?? [],
  resolveLabel: (agg, t) => t.translate(`languages.${agg.value}`)
};
var genreFacet = {
  key: "genre",
  icon: "theater_comedy",
  allowNull: false,
  contentTypes: ["movie", "tv_show"],
  extractInput: (f) => f.genre,
  patchInput: (f, i) => __spreadProps(__spreadValues({}, f), {
    genre: i
  }),
  extractAggregations: (aggs) => aggs.genre ?? [],
  resolveLabel: (agg) => agg.label
};
var videoResolutionFacet = {
  key: "video_resolution",
  icon: "aspect_ratio",
  allowNull: true,
  contentTypes: ["movie", "tv_show", "xxx"],
  extractInput: (f) => f.videoResolution,
  patchInput: (f, i) => __spreadProps(__spreadValues({}, f), {
    videoResolution: i
  }),
  extractAggregations: (aggs) => (aggs.videoResolution ?? []).map((agg) => __spreadProps(__spreadValues({}, agg), {
    value: agg.value ?? null
  })),
  resolveLabel: (agg) => agg.value?.slice(1) ?? "?"
};
var videoSourceFacet = {
  key: "video_source",
  icon: "album",
  allowNull: true,
  contentTypes: ["movie", "tv_show", "xxx"],
  extractInput: (f) => f.videoSource,
  patchInput: (f, i) => __spreadProps(__spreadValues({}, f), {
    videoSource: i
  }),
  extractAggregations: (aggs) => (aggs.videoSource ?? []).map((agg) => __spreadProps(__spreadValues({}, agg), {
    value: agg.value ?? null
  })),
  resolveLabel: (agg) => agg.value ?? "?"
};
var facets = [
  torrentSourceFacet,
  torrentTagFacet,
  fileTypeFacet,
  languageFacet,
  genreFacet,
  videoResolutionFacet,
  videoSourceFacet
];
var orderByOptions = [
  {
    field: "relevance",
    descending: true
  },
  {
    field: "published_at",
    descending: true
  },
  {
    field: "updated_at",
    descending: true
  },
  {
    field: "size",
    descending: true
  },
  {
    field: "files_count",
    descending: true
  },
  {
    field: "seeders",
    descending: true
  },
  {
    field: "leechers",
    descending: true
  },
  {
    field: "name",
    descending: false
  }
];
var defaultOrderBy = {
  field: "published_at",
  descending: true
};
var defaultQueryOrderBy = {
  field: "relevance",
  descending: true
};
var matchesContentType = (selection, cts) => !cts || selection && cts.includes(selection);
var isDefaultOrdering = (ctrl) => {
  if (!ctrl.orderBy.descending) {
    return false;
  }
  return ctrl.orderBy.field === (ctrl.queryString ? "relevance" : "published_at");
};

// node_modules/filesize/dist/filesize.js
var INVALID_NUMBER = "Invalid number";
var INVALID_ROUND = "Invalid rounding method";
var IEC = "iec";
var JEDEC = "jedec";
var SI = "si";
var BIT = "bit";
var BITS = "bits";
var BYTE = "byte";
var BYTES = "bytes";
var SI_KBIT = "kbit";
var SI_KBYTE = "kB";
var ARRAY = "array";
var FUNCTION = "function";
var OBJECT = "object";
var STRING = "string";
var EXPONENT = "exponent";
var ROUND = "round";
var E = "e";
var EMPTY2 = "";
var PERIOD = ".";
var S = "s";
var SPACE = " ";
var ZERO = "0";
var STRINGS = {
  symbol: {
    iec: {
      bits: ["bit", "Kibit", "Mibit", "Gibit", "Tibit", "Pibit", "Eibit", "Zibit", "Yibit"],
      bytes: ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"]
    },
    jedec: {
      bits: ["bit", "Kbit", "Mbit", "Gbit", "Tbit", "Pbit", "Ebit", "Zbit", "Ybit"],
      bytes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    }
  },
  fullform: {
    iec: ["", "kibi", "mebi", "gibi", "tebi", "pebi", "exbi", "zebi", "yobi"],
    jedec: ["", "kilo", "mega", "giga", "tera", "peta", "exa", "zetta", "yotta"]
  }
};
var BINARY_POWERS = [
  1,
  // 2^0
  1024,
  // 2^10
  1048576,
  // 2^20
  1073741824,
  // 2^30
  1099511627776,
  // 2^40
  1125899906842624,
  // 2^50
  1152921504606847e3,
  // 2^60
  11805916207174113e5,
  // 2^70
  12089258196146292e8
  // 2^80
];
var DECIMAL_POWERS = [
  1,
  // 10^0
  1e3,
  // 10^3
  1e6,
  // 10^6
  1e9,
  // 10^9
  1e12,
  // 10^12
  1e15,
  // 10^15
  1e18,
  // 10^18
  1e21,
  // 10^21
  1e24
  // 10^24
];
var LOG_2_1024 = Math.log(1024);
var LOG_10_1000 = Math.log(1e3);
var STANDARD_CONFIGS = {
  [SI]: { isDecimal: true, ceil: 1e3, actualStandard: JEDEC },
  [IEC]: { isDecimal: false, ceil: 1024, actualStandard: IEC },
  [JEDEC]: { isDecimal: false, ceil: 1024, actualStandard: JEDEC }
};
function getBaseConfiguration(standard, base) {
  if (STANDARD_CONFIGS[standard]) {
    return STANDARD_CONFIGS[standard];
  }
  if (base === 2) {
    return { isDecimal: false, ceil: 1024, actualStandard: IEC };
  }
  return { isDecimal: true, ceil: 1e3, actualStandard: JEDEC };
}
function handleZeroValue(precision, actualStandard, bits, symbols, full, fullforms, output, spacer) {
  const result = [];
  result[0] = precision > 0 ? 0 .toPrecision(precision) : 0;
  const u = result[1] = STRINGS.symbol[actualStandard][bits ? BITS : BYTES][0];
  if (output === EXPONENT) {
    return 0;
  }
  if (symbols[result[1]]) {
    result[1] = symbols[result[1]];
  }
  if (full) {
    result[1] = fullforms[0] || STRINGS.fullform[actualStandard][0] + (bits ? BIT : BYTE);
  }
  return output === ARRAY ? result : output === OBJECT ? {
    value: result[0],
    symbol: result[1],
    exponent: 0,
    unit: u
  } : result.join(spacer);
}
function calculateOptimizedValue(num, e, isDecimal, bits, ceil) {
  const d = isDecimal ? DECIMAL_POWERS[e] : BINARY_POWERS[e];
  let result = num / d;
  if (bits) {
    result *= 8;
    if (result >= ceil && e < 8) {
      result /= ceil;
      e++;
    }
  }
  return { result, e };
}
function applyPrecisionHandling(value, precision, e, num, isDecimal, bits, ceil, roundingFunc, round) {
  let result = value.toPrecision(precision);
  if (result.includes(E) && e < 8) {
    e++;
    const { result: valueResult } = calculateOptimizedValue(num, e, isDecimal, bits, ceil);
    const p = round > 0 ? Math.pow(10, round) : 1;
    result = (p === 1 ? roundingFunc(valueResult) : roundingFunc(valueResult * p) / p).toPrecision(precision);
  }
  return { value: result, e };
}
function applyNumberFormatting(value, locale, localeOptions, separator, pad, round) {
  let result = value;
  if (locale === true) {
    result = result.toLocaleString();
  } else if (locale.length > 0) {
    result = result.toLocaleString(locale, localeOptions);
  } else if (separator.length > 0) {
    result = result.toString().replace(PERIOD, separator);
  }
  if (pad && round > 0) {
    const resultStr = result.toString();
    const x = separator || ((resultStr.match(/(\D)/g) || []).pop() || PERIOD);
    const tmp = resultStr.split(x);
    const s = tmp[1] || EMPTY2;
    const l = s.length;
    const n = round - l;
    result = `${tmp[0]}${x}${s.padEnd(l + n, ZERO)}`;
  }
  return result;
}
function filesize(arg, {
  bits = false,
  pad = false,
  base = -1,
  round = 2,
  locale = EMPTY2,
  localeOptions = {},
  separator = EMPTY2,
  spacer = SPACE,
  symbols = {},
  standard = EMPTY2,
  output = STRING,
  fullform = false,
  fullforms = [],
  exponent = -1,
  roundingMethod = ROUND,
  precision = 0
} = {}) {
  let e = exponent, num = Number(arg), result = [], val = 0, u = EMPTY2;
  const { isDecimal, ceil, actualStandard } = getBaseConfiguration(standard, base);
  const full = fullform === true, neg = num < 0, roundingFunc = Math[roundingMethod];
  if (typeof arg !== "bigint" && isNaN(arg)) {
    throw new TypeError(INVALID_NUMBER);
  }
  if (typeof roundingFunc !== FUNCTION) {
    throw new TypeError(INVALID_ROUND);
  }
  if (neg) {
    num = -num;
  }
  if (num === 0) {
    return handleZeroValue(precision, actualStandard, bits, symbols, full, fullforms, output, spacer);
  }
  if (e === -1 || isNaN(e)) {
    e = isDecimal ? Math.floor(Math.log(num) / LOG_10_1000) : Math.floor(Math.log(num) / LOG_2_1024);
    if (e < 0) {
      e = 0;
    }
  }
  if (e > 8) {
    if (precision > 0) {
      precision += 8 - e;
    }
    e = 8;
  }
  if (output === EXPONENT) {
    return e;
  }
  const { result: valueResult, e: valueExponent } = calculateOptimizedValue(num, e, isDecimal, bits, ceil);
  val = valueResult;
  e = valueExponent;
  const p = e > 0 && round > 0 ? Math.pow(10, round) : 1;
  result[0] = p === 1 ? roundingFunc(val) : roundingFunc(val * p) / p;
  if (result[0] === ceil && e < 8 && exponent === -1) {
    result[0] = 1;
    e++;
  }
  if (precision > 0) {
    const precisionResult = applyPrecisionHandling(result[0], precision, e, num, isDecimal, bits, ceil, roundingFunc, round);
    result[0] = precisionResult.value;
    e = precisionResult.e;
  }
  const symbolTable = STRINGS.symbol[actualStandard][bits ? BITS : BYTES];
  u = result[1] = isDecimal && e === 1 ? bits ? SI_KBIT : SI_KBYTE : symbolTable[e];
  if (neg) {
    result[0] = -result[0];
  }
  if (symbols[result[1]]) {
    result[1] = symbols[result[1]];
  }
  result[0] = applyNumberFormatting(result[0], locale, localeOptions, separator, pad, round);
  if (full) {
    result[1] = fullforms[e] || STRINGS.fullform[actualStandard][e] + (bits ? BIT : BYTE) + (result[0] === 1 ? EMPTY2 : S);
  }
  if (output === ARRAY) {
    return result;
  }
  if (output === OBJECT) {
    return {
      value: result[0],
      symbol: result[1],
      exponent: e,
      unit: u
    };
  }
  return spacer === SPACE ? `${result[0]} ${result[1]}` : result.join(spacer);
}

// src/app/pipes/filesize.pipe.ts
var FilesizePipe = class _FilesizePipe {
  constructor() {
    this.transloco = inject(TranslocoService);
  }
  transform(value, base = 2) {
    return filesize(value, { locale: this.transloco.getActiveLang(), base });
  }
  static {
    this.\u0275fac = function FilesizePipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FilesizePipe)();
    };
  }
  static {
    this.\u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "filesize", type: _FilesizePipe, pure: false });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FilesizePipe, [{
    type: Pipe,
    args: [{
      name: "filesize",
      standalone: true,
      pure: false
    }]
  }], null, null);
})();

// src/app/torrents/torrent-files.datasource.ts
var emptyResult = {
  items: [],
  hasNextPage: false,
  totalCount: 0,
  aggregations: {
    queue: [],
    status: []
  }
};
var TorrentFilesDatasource = class {
  constructor(apollo, errorsService, queryVariables) {
    this.apollo = apollo;
    this.errorsService = errorsService;
    this.currentRequest = new BehaviorSubject(0);
    this.loadingSubject = new BehaviorSubject(false);
    this.loading$ = this.loadingSubject.asObservable();
    this.result = emptyResult;
    this.resultSubject = new BehaviorSubject(this.result);
    this.result$ = this.resultSubject.asObservable();
    this.items$ = this.resultSubject.pipe(map((result) => result.items));
    queryVariables.subscribe((variables) => {
      this.loadResult(variables);
    });
    this.resultSubject.subscribe((result) => {
      this.result = result;
    });
  }
  connect({}) {
    return this.items$;
  }
  disconnect() {
    this.resultSubject.complete();
  }
  loadResult(variables) {
    if (this.currentSubscription) {
      this.currentSubscription.unsubscribe();
      this.currentSubscription = void 0;
    }
    this.loadingSubject.next(true);
    const currentRequest = this.currentRequest.getValue() + 1;
    this.currentRequest.next(currentRequest);
    const result = this.apollo.query({
      query: TorrentFilesDocument,
      variables,
      fetchPolicy: "no-cache"
    }).pipe(map((r) => r.data.torrent.files)).pipe(catchError((err) => {
      this.errorsService.addError(`Error loading item results: ${err.message}`);
      return EMPTY;
    }));
    this.currentSubscription = result.subscribe((r) => {
      if (currentRequest === this.currentRequest.getValue()) {
        this.loadingSubject.next(false);
        this.resultSubject.next(r);
      }
    });
  }
};
var TorrentFilesSingleDatasource = class {
  constructor(torrent) {
    this.torrent = torrent;
    this.loading$ = new BehaviorSubject(false).asObservable();
    this.file = {
      infoHash: torrent.infoHash,
      index: 0,
      path: torrent.name,
      size: torrent.size,
      fileType: torrent.fileType,
      extension: torrent.extension,
      createdAt: torrent.createdAt,
      updatedAt: torrent.updatedAt
    };
    this.result = {
      hasNextPage: false,
      items: [this.file],
      totalCount: 1
    };
    this.result$ = new BehaviorSubject(this.result).asObservable();
    this.items$ = new BehaviorSubject([this.file]).asObservable();
  }
  connect({}) {
    return this.items$;
  }
  disconnect() {
  }
};

// src/app/torrents/torrent-files.controller.ts
var TorrentFilesController = class {
  constructor(infoHash) {
    const ctrl = {
      infoHash,
      limit: 10,
      page: 1
    };
    this.controlsSubject = new BehaviorSubject(ctrl);
    this.controls$ = this.controlsSubject.asObservable();
    this.controls$.pipe(debounceTime(100)).subscribe((ctrl2) => {
      const currentParams = this.variablesSubject.getValue();
      const nextParams = controlsToQueryVariables2(ctrl2);
      if (JSON.stringify(currentParams) !== JSON.stringify(nextParams)) {
        this.variablesSubject.next(nextParams);
      }
    });
    this.variablesSubject = new BehaviorSubject(controlsToQueryVariables2(ctrl));
    this.variables$ = this.variablesSubject.asObservable();
  }
  update(fn) {
    const ctrl = this.controlsSubject.getValue();
    const next = fn(ctrl);
    if (JSON.stringify(ctrl) !== JSON.stringify(next)) {
      this.controlsSubject.next(next);
    }
  }
  handlePageEvent(event) {
    this.update((ctrl) => __spreadProps(__spreadValues({}, ctrl), {
      limit: event.pageSize,
      page: event.page
    }));
  }
};
var controlsToQueryVariables2 = (ctrl) => ({
  input: {
    infoHashes: [ctrl.infoHash],
    limit: ctrl.limit,
    page: ctrl.page,
    totalCount: true,
    hasNextPage: false
  }
});

// src/app/torrents/torrent-files-table.component.ts
var _c0 = (a0, a1) => ({ x: a0, y: a1 });
function TorrentFilesTableComponent_ng_container_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", t_r1("torrents.showing_x_of_y_files", \u0275\u0275pureFunction2(5, _c0, \u0275\u0275pipeBind1(2, 1, ctx_r1.dataSource.result.totalCount), ctx_r1.torrent.filesCount == null ? "?" : \u0275\u0275pipeBind1(3, 3, ctx_r1.torrent.filesCount))), " ");
  }
}
function TorrentFilesTableComponent_ng_container_0_th_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r1("torrents.file_index"));
  }
}
function TorrentFilesTableComponent_ng_container_0_td_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.item(i_r3).index, " ");
  }
}
function TorrentFilesTableComponent_ng_container_0_th_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r1("torrents.file_path"));
  }
}
function TorrentFilesTableComponent_ng_container_0_td_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.item(i_r4).path, " ");
  }
}
function TorrentFilesTableComponent_ng_container_0_th_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r1("torrents.file_type"));
  }
}
function TorrentFilesTableComponent_ng_container_0_td_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r5 = ctx.$implicit;
    const t_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", t_r1("file_types." + (ctx_r1.item(i_r5).fileType ?? "unknown")), " ");
  }
}
function TorrentFilesTableComponent_ng_container_0_th_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r1("torrents.file_size"));
  }
}
function TorrentFilesTableComponent_ng_container_0_td_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 14)(1, "span", 15);
    \u0275\u0275pipe(2, "filesize");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "filesize");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const i_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("matTooltip", \u0275\u0275pipeBind2(2, 2, ctx_r1.item(i_r6).size, 10));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 5, ctx_r1.item(i_r6).size));
  }
}
function TorrentFilesTableComponent_ng_container_0_tr_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 16);
  }
}
function TorrentFilesTableComponent_ng_container_0_tr_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 17);
  }
}
function TorrentFilesTableComponent_ng_container_0_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-paginator", 18);
    \u0275\u0275listener("paging", function TorrentFilesTableComponent_ng_container_0_Conditional_20_Template_app_paginator_paging_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.controller.handlePageEvent($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("page", ctx_r1.controls.page)("pageSize", ctx_r1.controls.limit)("pageLength", ctx_r1.dataSource.result.items.length)("totalLength", ctx_r1.dataSource.result.totalCount)("totalIsEstimate", false)("showLastPage", true);
  }
}
function TorrentFilesTableComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 1);
    \u0275\u0275element(2, "mat-progress-bar", 2);
    \u0275\u0275pipe(3, "async");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, TorrentFilesTableComponent_ng_container_0_Conditional_4_Template, 4, 8, "p");
    \u0275\u0275elementStart(5, "table", 3);
    \u0275\u0275elementContainerStart(6, 4);
    \u0275\u0275template(7, TorrentFilesTableComponent_ng_container_0_th_7_Template, 2, 1, "th", 5)(8, TorrentFilesTableComponent_ng_container_0_td_8_Template, 2, 1, "td", 6);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(9, 7);
    \u0275\u0275template(10, TorrentFilesTableComponent_ng_container_0_th_10_Template, 2, 1, "th", 5)(11, TorrentFilesTableComponent_ng_container_0_td_11_Template, 2, 1, "td", 6);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(12, 8);
    \u0275\u0275template(13, TorrentFilesTableComponent_ng_container_0_th_13_Template, 2, 1, "th", 5)(14, TorrentFilesTableComponent_ng_container_0_td_14_Template, 2, 1, "td", 6);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(15, 9);
    \u0275\u0275template(16, TorrentFilesTableComponent_ng_container_0_th_16_Template, 2, 1, "th", 5)(17, TorrentFilesTableComponent_ng_container_0_td_17_Template, 5, 7, "td", 6);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(18, TorrentFilesTableComponent_ng_container_0_tr_18_Template, 1, 0, "tr", 10)(19, TorrentFilesTableComponent_ng_container_0_tr_19_Template, 1, 0, "tr", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(20, TorrentFilesTableComponent_ng_container_0_Conditional_20_Template, 1, 6, "app-paginator", 12);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("mode", \u0275\u0275pipeBind1(3, 8, ctx_r1.dataSource.loading$) ? "indeterminate" : "determinate")("value", 0);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.torrent.filesStatus === "over_threshold" ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r1.dataSource)("multiTemplateDataRows", true);
    \u0275\u0275advance(13);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.dataSource.result.totalCount > 10 ? 20 : -1);
  }
}
var TorrentFilesTableComponent = class _TorrentFilesTableComponent {
  constructor() {
    this.apollo = inject(Apollo);
    this.errorsService = inject(ErrorsService);
    this.transloco = inject(TranslocoService);
    this.displayedColumns = ["index", "path", "type", "size"];
  }
  ngOnInit() {
    this.controller = new TorrentFilesController(this.torrent.infoHash);
    this.dataSource = this.torrent.filesStatus === "single" ? new TorrentFilesSingleDatasource(this.torrent) : new TorrentFilesDatasource(this.apollo, this.errorsService, this.controller.variables$);
    this.controller.controls$.subscribe((ctrl) => {
      this.controls = ctrl;
    });
  }
  /**
   * Workaround for untyped table cell definitions
   */
  item(item) {
    return item;
  }
  static {
    this.\u0275fac = function TorrentFilesTableComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TorrentFilesTableComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TorrentFilesTableComponent, selectors: [["app-torrent-files-table"]], inputs: { torrent: "torrent" }, decls: 1, vars: 0, consts: [[4, "transloco"], [1, "progress-bar-container"], [3, "mode", "value"], ["mat-table", "", 1, "table-results", 3, "dataSource", "multiTemplateDataRows"], ["matColumnDef", "index"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "path"], ["matColumnDef", "type"], ["matColumnDef", "size"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], [3, "page", "pageSize", "pageLength", "totalLength", "totalIsEstimate", "showLastPage"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "filesize", 3, "matTooltip"], ["mat-header-row", ""], ["mat-row", ""], [3, "paging", "page", "pageSize", "pageLength", "totalLength", "totalIsEstimate", "showLastPage"]], template: function TorrentFilesTableComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, TorrentFilesTableComponent_ng_container_0_Template, 21, 10, "ng-container", 0);
      }
    }, dependencies: [AppModule, MatProgressBar, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatTooltip, TranslocoDirective, PaginatorComponent, AsyncPipe, DecimalPipe, FilesizePipe], styles: ["\n\nspan.filesize[_ngcontent-%COMP%] {\n  text-decoration: underline;\n  text-decoration-style: dotted;\n}\n/*# sourceMappingURL=torrent-files-table.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TorrentFilesTableComponent, [{
    type: Component,
    args: [{ selector: "app-torrent-files-table", standalone: true, imports: [AppModule, FilesizePipe, PaginatorComponent, TimeAgoPipe], template: `<ng-container *transloco="let t">
  <div class="progress-bar-container">
    <mat-progress-bar
      [mode]="(dataSource.loading$ | async) ? 'indeterminate' : 'determinate'"
      [value]="0"
    ></mat-progress-bar>
  </div>
  @if (torrent.filesStatus === "over_threshold") {
    <p>
      {{
        t("torrents.showing_x_of_y_files", {
          x: dataSource.result.totalCount | number,
          y: torrent.filesCount == null ? "?" : (torrent.filesCount | number),
        })
      }}
    </p>
  }
  <table
    mat-table
    [dataSource]="dataSource"
    [multiTemplateDataRows]="true"
    class="table-results"
  >
    <ng-container matColumnDef="index">
      <th mat-header-cell *matHeaderCellDef>{{ t("torrents.file_index") }}</th>
      <td mat-cell *matCellDef="let i">
        {{ item(i).index }}
      </td>
    </ng-container>

    <ng-container matColumnDef="path">
      <th mat-header-cell *matHeaderCellDef>{{ t("torrents.file_path") }}</th>
      <td mat-cell *matCellDef="let i">
        {{ item(i).path }}
      </td>
    </ng-container>

    <ng-container matColumnDef="type">
      <th mat-header-cell *matHeaderCellDef>{{ t("torrents.file_type") }}</th>
      <td mat-cell *matCellDef="let i">
        {{ t("file_types." + (item(i).fileType ?? "unknown")) }}
      </td>
    </ng-container>

    <ng-container matColumnDef="size">
      <th mat-header-cell *matHeaderCellDef>{{ t("torrents.file_size") }}</th>
      <td mat-cell *matCellDef="let i">
        <span class="filesize" [matTooltip]="item(i).size | filesize: 10">{{
          item(i).size | filesize
        }}</span>
      </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let i; columns: displayedColumns"></tr>
  </table>
  @if (dataSource.result.totalCount > 10) {
    <app-paginator
      (paging)="controller.handlePageEvent($event)"
      [page]="controls.page"
      [pageSize]="controls.limit"
      [pageLength]="dataSource.result.items.length"
      [totalLength]="dataSource.result.totalCount"
      [totalIsEstimate]="false"
      [showLastPage]="true"
    />
  }
</ng-container>
`, styles: ["/* src/app/torrents/torrent-files-table.component.scss */\nspan.filesize {\n  text-decoration: underline;\n  text-decoration-style: dotted;\n}\n/*# sourceMappingURL=torrent-files-table.component.css.map */\n"] }]
  }], null, { torrent: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TorrentFilesTableComponent, { className: "TorrentFilesTableComponent", filePath: "src/app/torrents/torrent-files-table.component.ts", lineNumber: 27 });
})();

// src/app/util/normalizeTagInput.ts
var normalizeTagInput = (value) => value.toLowerCase().replaceAll(/[^a-z0-9\-]/g, "-").replace(/^-+/, "").replaceAll(/-+/g, "-");
var normalizeTagInput_default = normalizeTagInput;

// src/app/torrents/torrent-edit-tags.component.ts
function TorrentEditTagsComponent_ng_container_0_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-chip-row", 8);
    \u0275\u0275listener("edited", function TorrentEditTagsComponent_ng_container_0_For_6_Template_mat_chip_row_edited_0_listener($event) {
      const tagName_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.renameTag(tagName_r3, $event.value));
    })("removed", function TorrentEditTagsComponent_ng_container_0_For_6_Template_mat_chip_row_removed_0_listener() {
      const tagName_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.deleteTag(tagName_r3));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "mat-icon", 9);
    \u0275\u0275text(3, "cancel");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const tagName_r3 = ctx.$implicit;
    \u0275\u0275property("editable", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tagName_r3, " ");
  }
}
function TorrentEditTagsComponent_ng_container_0_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tagName_r5 = ctx.$implicit;
    \u0275\u0275property("value", tagName_r5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tagName_r5);
  }
}
function TorrentEditTagsComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "mat-card")(2, "mat-form-field", 3)(3, "mat-chip-grid", null, 0);
    \u0275\u0275repeaterCreate(5, TorrentEditTagsComponent_ng_container_0_For_6_Template, 4, 2, "mat-chip-row", 4, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 5);
    \u0275\u0275listener("matChipInputTokenEnd", function TorrentEditTagsComponent_ng_container_0_Template_input_matChipInputTokenEnd_7_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView($event.value && ctx_r3.addTag($event.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "mat-autocomplete", 6, 1);
    \u0275\u0275listener("optionSelected", function TorrentEditTagsComponent_ng_container_0_Template_mat_autocomplete_optionSelected_8_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.addTag($event.option.viewValue));
    });
    \u0275\u0275repeaterCreate(10, TorrentEditTagsComponent_ng_container_0_For_11_Template, 2, 2, "mat-option", 7, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const t_r6 = ctx.$implicit;
    const chipGrid_r7 = \u0275\u0275reference(4);
    const auto_r8 = \u0275\u0275reference(9);
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r3.editedTags);
    \u0275\u0275advance(2);
    \u0275\u0275property("placeholder", t_r6("torrents.new_tag"))("formControl", ctx_r3.newTagCtrl)("matAutocomplete", auto_r8)("matChipInputFor", chipGrid_r7)("matChipInputSeparatorKeyCodes", ctx_r3.separatorKeysCodes)("value", ctx_r3.newTagCtrl.value);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r3.suggestedTags);
  }
}
var TorrentEditTagsComponent = class _TorrentEditTagsComponent {
  constructor() {
    this.newTagCtrl = new FormControl("");
    this.editedTags = Array();
    this.suggestedTags = Array();
    this.transloco = inject(TranslocoService);
    this.grapql = inject(GraphQLService);
    this.errors = inject(ErrorsService);
    this.separatorKeysCodes = [ENTER, COMMA];
    this.updated = new EventEmitter();
  }
  ngOnInit() {
    this.newTagCtrl.valueChanges.subscribe((value) => {
      if (value) {
        value = normalizeTagInput_default(value);
        this.newTagCtrl.setValue(value, { emitEvent: false });
      }
      return this.grapql.torrentSuggestTags({
        input: {
          prefix: value,
          exclusions: this.torrentContent.torrent.tagNames
        }
      }).pipe(tap((result) => {
        this.suggestedTags.splice(0, this.suggestedTags.length, ...result.suggestions.map((t) => t.name));
      })).subscribe();
    });
    this.editedTags = this.torrentContent.torrent.tagNames;
    this.newTagCtrl.reset();
  }
  addTag(tagName) {
    this.editTags((tags) => [...tags, tagName]);
    this.saveTags();
  }
  renameTag(oldTagName, newTagName) {
    this.editTags((tags) => tags.map((t) => t === oldTagName ? newTagName : t));
    this.saveTags();
  }
  deleteTag(tagName) {
    this.editTags((tags) => tags.filter((t) => t !== tagName));
    this.saveTags();
  }
  editTags(fn) {
    this.editedTags = fn(this.editedTags);
    this.newTagCtrl.reset();
  }
  saveTags() {
    this.grapql.torrentSetTags({
      infoHashes: [this.torrentContent.infoHash],
      tagNames: this.editedTags
    }).pipe(catchError((err) => {
      this.errors.addError(`Error saving tags: ${err.message}`);
      return EMPTY;
    })).pipe(tap(() => {
      this.updated.emit(null);
    })).subscribe();
  }
  static {
    this.\u0275fac = function TorrentEditTagsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TorrentEditTagsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TorrentEditTagsComponent, selectors: [["app-torrent-edit-tags"]], inputs: { torrentContent: "torrentContent" }, outputs: { updated: "updated" }, decls: 1, vars: 0, consts: [["chipGrid", ""], ["auto", "matAutocomplete"], [4, "transloco"], ["subscriptSizing", "dynamic", 1, "form-edit-tags"], [3, "editable"], ["autocapitalize", "none", 3, "matChipInputTokenEnd", "placeholder", "formControl", "matAutocomplete", "matChipInputFor", "matChipInputSeparatorKeyCodes", "value"], [3, "optionSelected"], [3, "value"], [3, "edited", "removed", "editable"], ["matChipRemove", ""]], template: function TorrentEditTagsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, TorrentEditTagsComponent_ng_container_0_Template, 12, 6, "ng-container", 2);
      }
    }, dependencies: [AppModule, MatAutocomplete, MatOption, MatAutocompleteTrigger, MatCard, MatChipGrid, MatChipInput, MatChipRemove, MatChipRow, MatFormField, MatIcon, DefaultValueAccessor, NgControlStatus, FormControlDirective, TranslocoDirective], styles: ["\n\n.form-edit-tags[_ngcontent-%COMP%]     .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n/*# sourceMappingURL=torrent-edit-tags.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TorrentEditTagsComponent, [{
    type: Component,
    args: [{ selector: "app-torrent-edit-tags", standalone: true, imports: [AppModule], template: `<ng-container *transloco="let t">
  <mat-card>
    <mat-form-field class="form-edit-tags" subscriptSizing="dynamic">
      <mat-chip-grid #chipGrid>
        @for (tagName of editedTags; let j = $index; track tagName) {
          <mat-chip-row
            [editable]="true"
            (edited)="renameTag(tagName, $event.value)"
            (removed)="deleteTag(tagName)"
          >
            {{ tagName }}
            <mat-icon matChipRemove>cancel</mat-icon>
          </mat-chip-row>
        }
      </mat-chip-grid>
      <input
        [placeholder]="t('torrents.new_tag')"
        [formControl]="newTagCtrl"
        [matAutocomplete]="auto"
        [matChipInputFor]="chipGrid"
        [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
        (matChipInputTokenEnd)="$event.value && addTag($event.value)"
        [value]="newTagCtrl.value"
        autocapitalize="none"
      />
      <mat-autocomplete
        #auto="matAutocomplete"
        (optionSelected)="addTag($event.option.viewValue)"
      >
        @for (tagName of suggestedTags; track tagName) {
          <mat-option [value]="tagName">{{ tagName }}</mat-option>
        }
      </mat-autocomplete>
    </mat-form-field>
  </mat-card>
</ng-container>
`, styles: ["/* src/app/torrents/torrent-edit-tags.component.scss */\n.form-edit-tags ::ng-deep .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n/*# sourceMappingURL=torrent-edit-tags.component.css.map */\n"] }]
  }], null, { torrentContent: [{
    type: Input
  }], updated: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TorrentEditTagsComponent, { className: "TorrentEditTagsComponent", filePath: "src/app/torrents/torrent-edit-tags.component.ts", lineNumber: 26 });
})();

// src/app/torrents/torrent-reprocess.component.ts
function TorrentReprocessComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "mat-card")(2, "mat-card-content")(3, "mat-checkbox", 1);
    \u0275\u0275listener("change", function TorrentReprocessComponent_ng_container_0_Template_mat_checkbox_change_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.localSearchDisabled = !$event.checked;
      return \u0275\u0275resetView(ctx_r1.apisDisabled = !$event.checked ? true : ctx_r1.apisDisabled);
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "mat-checkbox", 1);
    \u0275\u0275listener("change", function TorrentReprocessComponent_ng_container_0_Template_mat_checkbox_change_5_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.apisDisabled = !$event.checked;
      return \u0275\u0275resetView(ctx_r1.localSearchDisabled = $event.checked ? false : ctx_r1.localSearchDisabled);
    });
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "mat-checkbox", 1);
    \u0275\u0275listener("change", function TorrentReprocessComponent_ng_container_0_Template_mat_checkbox_change_7_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.classifierRematch = $event.checked);
    });
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "mat-card-actions", 2)(10, "button", 3);
    \u0275\u0275listener("click", function TorrentReprocessComponent_ng_container_0_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.reprocess());
    });
    \u0275\u0275elementStart(11, "mat-icon");
    \u0275\u0275text(12, "cycle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const t_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("checked", !ctx_r1.localSearchDisabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r3("torrents.reprocess.match_content_by_local_search"));
    \u0275\u0275advance();
    \u0275\u0275property("checked", !ctx_r1.apisDisabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r3("torrents.reprocess.match_content_by_external_api_search"));
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r1.classifierRematch);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r3("torrents.reprocess.force_rematch"));
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.infoHashes.length);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", t_r3("torrents.reprocess.reprocess"), " ");
  }
}
var TorrentReprocessComponent = class _TorrentReprocessComponent {
  constructor() {
    this.apollo = inject(Apollo);
    this.errors = inject(ErrorsService);
    this.classifierRematch = false;
    this.apisDisabled = true;
    this.localSearchDisabled = true;
    this.updated = new EventEmitter();
  }
  reprocess() {
    this.apollo.mutate({
      mutation: TorrentReprocessDocument,
      variables: {
        input: {
          infoHashes: this.infoHashes,
          classifierRematch: this.classifierRematch,
          apisDisabled: this.apisDisabled,
          localSearchDisabled: this.localSearchDisabled
        }
      }
    }).pipe(map(() => {
      this.updated.emit(null);
    })).subscribe();
  }
  static {
    this.\u0275fac = function TorrentReprocessComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TorrentReprocessComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TorrentReprocessComponent, selectors: [["app-torrent-reprocess"]], inputs: { infoHashes: "infoHashes" }, outputs: { updated: "updated" }, decls: 1, vars: 0, consts: [[4, "transloco"], [3, "change", "checked"], [1, "button-row"], ["mat-stroked-button", "", 3, "click", "disabled"]], template: function TorrentReprocessComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, TorrentReprocessComponent_ng_container_0_Template, 14, 8, "ng-container", 0);
      }
    }, dependencies: [AppModule, MatButton, MatCard, MatCardActions, MatCardContent, MatCheckbox, MatIcon, TranslocoDirective], styles: ["\n\n.mat-mdc-card[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\nmat-checkbox[_ngcontent-%COMP%] {\n  margin-right: 20px;\n}\n/*# sourceMappingURL=torrent-reprocess.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TorrentReprocessComponent, [{
    type: Component,
    args: [{ selector: "app-torrent-reprocess", standalone: true, imports: [AppModule], template: '<ng-container *transloco="let t">\n  <mat-card>\n    <mat-card-content>\n      <mat-checkbox\n        [checked]="!localSearchDisabled"\n        (change)="\n          localSearchDisabled = !$event.checked;\n          apisDisabled = !$event.checked ? true : apisDisabled\n        "\n        >{{\n          t("torrents.reprocess.match_content_by_local_search")\n        }}</mat-checkbox\n      >\n      <mat-checkbox\n        [checked]="!apisDisabled"\n        (change)="\n          apisDisabled = !$event.checked;\n          localSearchDisabled = $event.checked ? false : localSearchDisabled\n        "\n        >{{\n          t("torrents.reprocess.match_content_by_external_api_search")\n        }}</mat-checkbox\n      >\n      <mat-checkbox\n        [checked]="classifierRematch"\n        (change)="classifierRematch = $event.checked"\n        >{{ t("torrents.reprocess.force_rematch") }}</mat-checkbox\n      >\n    </mat-card-content>\n    <mat-card-actions class="button-row">\n      <button\n        mat-stroked-button\n        [disabled]="!infoHashes.length"\n        (click)="reprocess()"\n      >\n        <mat-icon>cycle</mat-icon>{{ t("torrents.reprocess.reprocess") }}\n      </button>\n    </mat-card-actions>\n  </mat-card>\n</ng-container>\n', styles: ["/* src/app/torrents/torrent-reprocess.component.scss */\n.mat-mdc-card {\n  margin-bottom: 10px;\n}\nmat-checkbox {\n  margin-right: 20px;\n}\n/*# sourceMappingURL=torrent-reprocess.component.css.map */\n"] }]
  }], null, { infoHashes: [{
    type: Input
  }], updated: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TorrentReprocessComponent, { className: "TorrentReprocessComponent", filePath: "src/app/torrents/torrent-reprocess.component.ts", lineNumber: 15 });
})();

// src/app/torrents/torrent-content.component.ts
var _c02 = (a0) => ({ count: a0 });
var _c1 = (a0) => [a0];
var _forTrack02 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.id;
var _forTrack2 = ($index, $item) => $item.metadataSource.key;
function TorrentContentComponent_ng_container_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 1);
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngSrc", "https://image.tmdb.org/t/p/w300/" + ctx)("alt", t_r2("torrents.poster"))("width", ctx_r2.breakpoints.sizeAtLeast("Medium") ? 300 : 150)("height", ctx_r2.breakpoints.sizeAtLeast("Medium") ? 450 : 225);
  }
}
function TorrentContentComponent_ng_container_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2")(1, "a", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", "permalink/" + ctx_r2.torrentContent.infoHash)("matTooltip", t_r2("torrents.permalink"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.torrentContent.torrent.name);
  }
}
function TorrentContentComponent_ng_container_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, "\xA0 ");
    \u0275\u0275elementStart(4, "span", 13);
    \u0275\u0275pipe(5, "filesize");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "filesize");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", t_r2("torrents.size"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275property("matTooltip", \u0275\u0275pipeBind2(5, 3, ctx_r2.torrentContent.torrent.size, 10));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 6, ctx_r2.torrentContent.torrent.size));
  }
}
function TorrentContentComponent_ng_container_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "timeAgo");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r2("torrents.published"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 2, ctx_r2.torrentContent.publishedAt), " ");
  }
}
function TorrentContentComponent_ng_container_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", t_r2("torrents.s_l"), ":");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r2.torrentContent.seeders ?? "?", " / ", ctx_r2.torrentContent.leechers ?? "?", " ");
  }
}
function TorrentContentComponent_ng_container_0_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r4 = ctx.$implicit;
    const \u0275$index_55_r5 = ctx.$index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((\u0275$index_55_r5 > 0 ? ", " : "") + s_r4.name);
  }
}
function TorrentContentComponent_ng_container_0_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", t_r2("torrents.title"), ":");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.torrentContent.content.title, " ");
  }
}
function TorrentContentComponent_ng_container_0_Conditional_18_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const l_r6 = ctx.$implicit;
    const \u0275$index_73_r7 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate1(" ", (\u0275$index_73_r7 > 0 ? ", " : "") + l_r6.name + (l_r6.id === (ctx_r2.torrentContent.content == null ? null : ctx_r2.torrentContent.content.originalLanguage == null ? null : ctx_r2.torrentContent.content.originalLanguage.id) ? " (original)" : ""), " ");
  }
}
function TorrentContentComponent_ng_container_0_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, "\xA0 ");
    \u0275\u0275repeaterCreate(4, TorrentContentComponent_ng_container_0_Conditional_18_For_5_Template, 1, 1, null, null, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", t_r2("torrents.languages"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.torrentContent.languages);
  }
}
function TorrentContentComponent_ng_container_0_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", t_r2("torrents.original_release_date"), ":");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (ctx_r2.torrentContent.content == null ? null : ctx_r2.torrentContent.content.releaseDate) ?? (ctx_r2.torrentContent.content == null ? null : ctx_r2.torrentContent.content.releaseYear), " ");
  }
}
function TorrentContentComponent_ng_container_0_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", t_r2("torrents.episodes"), ":");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.torrentContent.episodes.label, " ");
  }
}
function TorrentContentComponent_ng_container_0_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.torrentContent.content.overview, " ");
  }
}
function TorrentContentComponent_ng_container_0_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "p")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", t_r2("torrents.genres"), ":");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.join(", "), " ");
  }
}
function TorrentContentComponent_ng_container_0_Conditional_23_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("(", t_r2("torrents.votes_count_n", \u0275\u0275pureFunction1(3, _c02, \u0275\u0275pipeBind1(2, 1, ctx_r2.torrentContent.content == null ? null : ctx_r2.torrentContent.content.voteCount))), ")");
  }
}
function TorrentContentComponent_ng_container_0_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275conditionalCreate(4, TorrentContentComponent_ng_container_0_Conditional_23_Conditional_4_Template, 3, 5, "ng-container");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", t_r2("torrents.rating"), ":");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.torrentContent.content == null ? null : ctx_r2.torrentContent.content.voteAverage, " / 10 ");
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r2.torrentContent.content == null ? null : ctx_r2.torrentContent.content.voteCount) != null ? 4 : -1);
  }
}
function TorrentContentComponent_ng_container_0_Conditional_24_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275elementStart(1, "a", 14);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const l_r8 = ctx.$implicit;
    const \u0275$index_121_r9 = ctx.$index;
    \u0275\u0275textInterpolate1(" ", \u0275$index_121_r9 > 0 ? ", " : "");
    \u0275\u0275advance();
    \u0275\u0275property("href", l_r8.url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(l_r8.metadataSource.name);
  }
}
function TorrentContentComponent_ng_container_0_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, "\xA0 ");
    \u0275\u0275repeaterCreate(4, TorrentContentComponent_ng_container_0_Conditional_24_For_5_Template, 3, 3, null, null, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", t_r2("torrents.external_links"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx);
  }
}
function TorrentContentComponent_ng_container_0_ng_template_29_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r2("torrents.files"));
  }
}
function TorrentContentComponent_ng_container_0_ng_template_29_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("(", \u0275\u0275pipeBind1(2, 1, ctx), ")");
  }
}
function TorrentContentComponent_ng_container_0_ng_template_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "file_present");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, TorrentContentComponent_ng_container_0_ng_template_29_Conditional_2_Template, 2, 1, "span", 15);
    \u0275\u0275conditionalCreate(3, TorrentContentComponent_ng_container_0_ng_template_29_Conditional_3_Template, 3, 3, "span", 16);
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.breakpoints.sizeAtLeast("Medium") ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_4_0 = ctx_r2.filesCount()) ? 3 : -1, tmp_4_0);
  }
}
function TorrentContentComponent_ng_container_0_ng_template_30_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r2("torrents.files_no_info"));
  }
}
function TorrentContentComponent_ng_container_0_ng_template_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 17);
    \u0275\u0275conditionalCreate(1, TorrentContentComponent_ng_container_0_ng_template_30_Conditional_1_Template, 2, 1, "p");
    \u0275\u0275element(2, "app-torrent-files-table", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.torrentContent.torrent.filesStatus === "no_info" ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("torrent", ctx_r2.torrentContent.torrent);
  }
}
function TorrentContentComponent_ng_container_0_ng_template_32_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r2("torrents.edit_tags"));
  }
}
function TorrentContentComponent_ng_container_0_ng_template_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "sell");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, TorrentContentComponent_ng_container_0_ng_template_32_Conditional_2_Template, 2, 1, "span", 15);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.breakpoints.sizeAtLeast("Medium") ? 2 : -1);
  }
}
function TorrentContentComponent_ng_container_0_ng_template_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-torrent-edit-tags", 19);
    \u0275\u0275listener("updated", function TorrentContentComponent_ng_container_0_ng_template_33_Template_app_torrent_edit_tags_updated_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updated.emit(null));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("torrentContent", ctx_r2.torrentContent);
  }
}
function TorrentContentComponent_ng_container_0_ng_template_35_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r2("torrents.classification"));
  }
}
function TorrentContentComponent_ng_container_0_ng_template_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "category");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, TorrentContentComponent_ng_container_0_ng_template_35_Conditional_2_Template, 2, 1, "span", 15);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.breakpoints.sizeAtLeast("Medium") ? 2 : -1);
  }
}
function TorrentContentComponent_ng_container_0_ng_template_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-torrent-reprocess", 20);
    \u0275\u0275listener("updated", function TorrentContentComponent_ng_container_0_ng_template_36_Template_app_torrent_reprocess_updated_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updated.emit(null));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("infoHashes", \u0275\u0275pureFunction1(1, _c1, ctx_r2.torrentContent.infoHash));
  }
}
function TorrentContentComponent_ng_container_0_ng_template_38_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r2("torrents.delete"));
  }
}
function TorrentContentComponent_ng_container_0_ng_template_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "delete_forever");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, TorrentContentComponent_ng_container_0_ng_template_38_Conditional_2_Template, 2, 1, "span", 15);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.breakpoints.sizeAtLeast("Medium") ? 2 : -1);
  }
}
function TorrentContentComponent_ng_container_0_ng_template_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card")(1, "mat-card-content", 21)(2, "p")(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "br");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "mat-card-actions", 22)(8, "button", 23);
    \u0275\u0275listener("click", function TorrentContentComponent_ng_container_0_ng_template_39_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.delete());
    });
    \u0275\u0275elementStart(9, "mat-icon");
    \u0275\u0275text(10, "delete_forever");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r2("torrents.delete_are_you_sure"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", t_r2("torrents.delete_action_cannot_be_undone"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", t_r2("torrents.delete"), " ");
  }
}
function TorrentContentComponent_ng_container_0_Conditional_40_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 24);
    \u0275\u0275text(1, "close");
    \u0275\u0275elementEnd();
  }
}
function TorrentContentComponent_ng_container_0_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-tab");
    \u0275\u0275template(1, TorrentContentComponent_ng_container_0_Conditional_40_ng_template_1_Template, 2, 0, "ng-template", 10);
    \u0275\u0275elementEnd();
  }
}
function TorrentContentComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275conditionalCreate(1, TorrentContentComponent_ng_container_0_Conditional_1_Template, 1, 4, "img", 1);
    \u0275\u0275conditionalCreate(2, TorrentContentComponent_ng_container_0_Conditional_2_Template, 3, 3, "h2");
    \u0275\u0275conditionalCreate(3, TorrentContentComponent_ng_container_0_Conditional_3_Template, 8, 8, "p", 2);
    \u0275\u0275conditionalCreate(4, TorrentContentComponent_ng_container_0_Conditional_4_Template, 5, 4, "p", 3);
    \u0275\u0275conditionalCreate(5, TorrentContentComponent_ng_container_0_Conditional_5_Template, 4, 3, "p", 4);
    \u0275\u0275elementStart(6, "p", 5)(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 6);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "p")(12, "strong");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275text(14, "\xA0 ");
    \u0275\u0275repeaterCreate(15, TorrentContentComponent_ng_container_0_For_16_Template, 2, 1, "span", null, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(17, TorrentContentComponent_ng_container_0_Conditional_17_Template, 4, 2, "p");
    \u0275\u0275conditionalCreate(18, TorrentContentComponent_ng_container_0_Conditional_18_Template, 6, 1, "p");
    \u0275\u0275conditionalCreate(19, TorrentContentComponent_ng_container_0_Conditional_19_Template, 4, 2, "p");
    \u0275\u0275conditionalCreate(20, TorrentContentComponent_ng_container_0_Conditional_20_Template, 4, 2, "p");
    \u0275\u0275conditionalCreate(21, TorrentContentComponent_ng_container_0_Conditional_21_Template, 2, 1, "p");
    \u0275\u0275conditionalCreate(22, TorrentContentComponent_ng_container_0_Conditional_22_Template, 5, 2, "ng-container");
    \u0275\u0275conditionalCreate(23, TorrentContentComponent_ng_container_0_Conditional_23_Template, 5, 3, "p");
    \u0275\u0275conditionalCreate(24, TorrentContentComponent_ng_container_0_Conditional_24_Template, 6, 1, "p");
    \u0275\u0275element(25, "mat-divider", 7);
    \u0275\u0275elementStart(26, "mat-tab-group", 8);
    \u0275\u0275listener("focusChange", function TorrentContentComponent_ng_container_0_Template_mat_tab_group_focusChange_26_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectTabIndex($event.index));
    });
    \u0275\u0275element(27, "mat-tab", 9);
    \u0275\u0275elementStart(28, "mat-tab");
    \u0275\u0275template(29, TorrentContentComponent_ng_container_0_ng_template_29_Template, 4, 2, "ng-template", 10)(30, TorrentContentComponent_ng_container_0_ng_template_30_Template, 3, 2, "ng-template", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "mat-tab");
    \u0275\u0275template(32, TorrentContentComponent_ng_container_0_ng_template_32_Template, 3, 1, "ng-template", 10)(33, TorrentContentComponent_ng_container_0_ng_template_33_Template, 1, 1, "ng-template", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "mat-tab");
    \u0275\u0275template(35, TorrentContentComponent_ng_container_0_ng_template_35_Template, 3, 1, "ng-template", 10)(36, TorrentContentComponent_ng_container_0_ng_template_36_Template, 1, 3, "ng-template", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "mat-tab");
    \u0275\u0275template(38, TorrentContentComponent_ng_container_0_ng_template_38_Template, 3, 1, "ng-template", 10)(39, TorrentContentComponent_ng_container_0_ng_template_39_Template, 12, 3, "ng-template", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(40, TorrentContentComponent_ng_container_0_Conditional_40_Template, 2, 0, "mat-tab");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_18_0;
    let tmp_20_0;
    const t_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_2_0 = ctx_r2.getAttribute("poster_path", "tmdb")) ? 1 : -1, tmp_2_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.heading ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.size ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.published ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.peers ? 5 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", t_r2("torrents.info_hash"), ":");
    \u0275\u0275advance();
    \u0275\u0275property("matTooltip", t_r2("torrents.copy_to_clipboard"))("cdkCopyToClipboard", ctx_r2.torrentContent.infoHash);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.torrentContent.infoHash);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", t_r2("torrents.source"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.torrentContent.torrent.sources);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.torrentContent.content ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r2.torrentContent.languages == null ? null : ctx_r2.torrentContent.languages.length) ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r2.torrentContent.content == null ? null : ctx_r2.torrentContent.content.releaseYear) ? 19 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.torrentContent.episodes ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r2.torrentContent.content == null ? null : ctx_r2.torrentContent.content.overview) ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_18_0 = ctx_r2.getCollections("genre")) ? 22 : -1, tmp_18_0);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r2.torrentContent.content == null ? null : ctx_r2.torrentContent.content.voteAverage) != null ? 23 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_20_0 = ctx_r2.torrentContent.content == null ? null : ctx_r2.torrentContent.content.externalLinks) ? 24 : -1, tmp_20_0);
    \u0275\u0275advance(2);
    \u0275\u0275property("selectedIndex", ctx_r2.selectedTabIndex)("mat-stretch-tabs", false);
    \u0275\u0275advance(14);
    \u0275\u0275conditional(ctx_r2.selectedTabIndex > 0 ? 40 : -1);
  }
}
var TorrentContentComponent = class _TorrentContentComponent {
  constructor() {
    this.breakpoints = inject(BreakpointsService);
    this.heading = true;
    this.size = true;
    this.peers = true;
    this.published = true;
    this.updated = new EventEmitter();
    this.tabSelected = new EventEmitter();
    this.selectedTab = void 0;
    this.transloco = inject(TranslocoService);
    this.grapql = inject(GraphQLService);
    this.errors = inject(ErrorsService);
  }
  get selectedTabIndex() {
    return torrentTabNames.indexOf(this.selectedTab) + 1;
  }
  selectTabIndex(index) {
    this.selectedTab = torrentTabNames[index - 1];
    this.tabSelected.emit(this.selectedTab);
  }
  delete() {
    this.grapql.torrentDelete({ infoHashes: [this.torrentContent.infoHash] }).pipe(catchError((err) => {
      this.errors.addError(`Error deleting torrent: ${err.message}`);
      return EMPTY;
    })).pipe(tap(() => {
      this.updated.emit(null);
    })).subscribe();
  }
  getAttribute(key, source) {
    return this.torrentContent.content?.attributes?.find((a) => a.key === key && (source === void 0 || a.source === source))?.value;
  }
  getCollections(type) {
    const collections = this.torrentContent.content?.collections?.filter((a) => a.type === type).map((a) => a.name);
    return collections?.length ? collections.sort() : void 0;
  }
  filesCount() {
    if (this.torrentContent.torrent.filesStatus === "single") {
      return 1;
    }
    return this.torrentContent.torrent.filesCount ?? void 0;
  }
  static {
    this.\u0275fac = function TorrentContentComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TorrentContentComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TorrentContentComponent, selectors: [["app-torrent-content"]], inputs: { torrentContent: "torrentContent", heading: "heading", size: "size", peers: "peers", published: "published", selectedTab: "selectedTab" }, outputs: { updated: "updated", tabSelected: "tabSelected" }, decls: 1, vars: 0, consts: [[4, "transloco"], [1, "poster", 3, "ngSrc", "alt", "width", "height"], [1, "size"], [1, "published"], [1, "peers"], [1, "info-hash"], [3, "matTooltip", "cdkCopyToClipboard"], [2, "clear", "both"], ["animationDuration", "0", 3, "focusChange", "selectedIndex", "mat-stretch-tabs"], ["aria-labelledby", "hidden"], ["mat-tab-label", ""], ["matTabContent", ""], [3, "routerLink", "matTooltip"], [1, "filesize", 3, "matTooltip"], ["target", "_blank", 3, "href"], [1, "label"], [1, "files-count"], [1, "torrent-files"], [3, "torrent"], [3, "updated", "torrentContent"], [3, "updated", "infoHashes"], [2, "margin-top", "10px"], [1, "button-row"], ["mat-stroked-button", "", "color", "warning", 3, "click"], [2, "margin-right", "0"]], template: function TorrentContentComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, TorrentContentComponent_ng_container_0_Template, 41, 21, "ng-container", 0);
      }
    }, dependencies: [
      AppModule,
      CdkCopyToClipboard,
      MatButton,
      MatCard,
      MatCardActions,
      MatCardContent,
      MatDivider,
      MatIcon,
      MatTabContent,
      MatTabLabel,
      MatTab,
      MatTabGroup,
      MatTooltip,
      RouterLink,
      TranslocoDirective,
      NgOptimizedImage,
      TorrentEditTagsComponent,
      TorrentFilesTableComponent,
      TorrentReprocessComponent,
      DecimalPipe,
      FilesizePipe,
      TimeAgoPipe
    ], styles: ["\n\nh2[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  max-width: 900px;\n  white-space: pre-wrap;\n  word-break: break-all;\n  overflow-wrap: break-word;\n}\n.poster[_ngcontent-%COMP%] {\n  float: right;\n  margin: 10px;\n  border: 1px solid currentColor;\n}\n.info-hash[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n  word-break: break-all;\n  overflow-wrap: break-word;\n}\n.info-hash[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  padding-left: 5px;\n  cursor: crosshair;\n  text-decoration: underline;\n  text-decoration-style: dotted;\n}\n.torrent-files[_ngcontent-%COMP%] {\n  padding-top: 10px;\n  max-height: 800px;\n  overflow: scroll;\n}\n.torrent-files[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n  width: 800px;\n}\n.torrent-files[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding-right: 20px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12);\n}\n.torrent-files[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background-color: whitesmoke;\n}\n.torrent-files[_ngcontent-%COMP%] {\n  scrollbar-width: none;\n}\n.torrent-files[_ngcontent-%COMP%]   [_ngcontent-%COMP%]::-webkit-scrollbar {\n  display: none;\n}\n.files-count[_ngcontent-%COMP%] {\n  margin-left: 4px;\n}\n.mat-mdc-card-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\nspan.filesize[_ngcontent-%COMP%] {\n  text-decoration: underline;\n  text-decoration-style: dotted;\n  cursor: default;\n}\n  .mdc-tab[aria-labelledby=hidden] {\n  display: none;\n}\n  .mdc-tab[role=tab] {\n  padding-left: 15px;\n  padding-right: 15px;\n}\n  .mdc-tab .label, \n  .mdc-tab .files-count {\n  margin-left: 8px;\n}\n/*# sourceMappingURL=torrent-content.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TorrentContentComponent, [{
    type: Component,
    args: [{ selector: "app-torrent-content", standalone: true, imports: [
      AppModule,
      FilesizePipe,
      NgOptimizedImage,
      TimeAgoPipe,
      TorrentEditTagsComponent,
      TorrentFilesTableComponent,
      TorrentReprocessComponent
    ], template: `<ng-container *transloco="let t">
  @if (getAttribute("poster_path", "tmdb"); as posterPath) {
    <img
      [ngSrc]="'https://image.tmdb.org/t/p/w300/' + posterPath"
      [alt]="t('torrents.poster')"
      class="poster"
      [width]="breakpoints.sizeAtLeast('Medium') ? 300 : 150"
      [height]="breakpoints.sizeAtLeast('Medium') ? 450 : 225"
    />
  }
  @if (heading) {
    <h2>
      <a
        [routerLink]="'permalink/' + torrentContent.infoHash"
        [matTooltip]="t('torrents.permalink')"
        >{{ torrentContent.torrent.name }}</a
      >
    </h2>
  }
  @if (size) {
    <p class="size">
      <strong>{{ t("torrents.size") }}:</strong>&nbsp;
      <span
        class="filesize"
        [matTooltip]="torrentContent.torrent.size | filesize: 10"
        >{{ torrentContent.torrent.size | filesize }}</span
      >
    </p>
  }
  @if (published) {
    <p class="published">
      <strong>{{ t("torrents.published") }}</strong>
      {{ torrentContent.publishedAt | timeAgo }}
    </p>
  }
  @if (peers) {
    <p class="peers">
      <strong>{{ t("torrents.s_l") }}:</strong>
      {{ torrentContent.seeders ?? "?" }} / {{ torrentContent.leechers ?? "?" }}
    </p>
  }
  <p class="info-hash">
    <strong>{{ t("torrents.info_hash") }}:</strong>
    <span
      [matTooltip]="t('torrents.copy_to_clipboard')"
      [cdkCopyToClipboard]="torrentContent.infoHash"
      >{{ torrentContent.infoHash }}</span
    >
  </p>
  <p>
    <strong>{{ t("torrents.source") }}:</strong>&nbsp;
    @for (s of torrentContent.torrent.sources; let j = $index; track s.key) {
      <span>{{ (j > 0 ? ", " : "") + s.name }}</span>
    }
  </p>
  @if (torrentContent.content) {
    <p>
      <strong>{{ t("torrents.title") }}:</strong>
      {{ torrentContent.content.title }}
    </p>
  }
  @if (torrentContent.languages?.length) {
    <p>
      <strong>{{ t("torrents.languages") }}:</strong>&nbsp;
      @for (l of torrentContent.languages; let j = $index; track l.id) {
        {{
          (j > 0 ? ", " : "") +
            l.name +
            (l.id === torrentContent.content?.originalLanguage?.id
              ? " (original)"
              : "")
        }}
      }
    </p>
  }
  @if (torrentContent.content?.releaseYear) {
    <p>
      <strong>{{ t("torrents.original_release_date") }}:</strong>
      {{
        torrentContent.content?.releaseDate ??
          torrentContent.content?.releaseYear
      }}
    </p>
  }
  @if (torrentContent.episodes) {
    <p>
      <strong>{{ t("torrents.episodes") }}:</strong>
      {{ torrentContent.episodes!.label }}
    </p>
  }
  @if (torrentContent.content?.overview) {
    <p>
      {{ torrentContent.content!.overview }}
    </p>
  }
  @if (getCollections("genre"); as genres) {
    <ng-container>
      <p>
        <strong>{{ t("torrents.genres") }}:</strong> {{ genres.join(", ") }}
      </p>
    </ng-container>
  }
  @if (torrentContent.content?.voteAverage != null) {
    <p>
      <strong>{{ t("torrents.rating") }}:</strong>
      {{ torrentContent.content?.voteAverage }} / 10
      @if (torrentContent.content?.voteCount != null) {
        <ng-container
          >({{
            t("torrents.votes_count_n", {
              count: torrentContent.content?.voteCount | number,
            })
          }})</ng-container
        >
      }
    </p>
  }
  @if (torrentContent.content?.externalLinks; as externalLinks) {
    <p>
      <strong>{{ t("torrents.external_links") }}:</strong>&nbsp;
      @for (l of externalLinks; let j = $index; track l.metadataSource.key) {
        {{ j > 0 ? ", " : ""
        }}<a [href]="l.url" target="_blank">{{ l.metadataSource.name }}</a>
      }
    </p>
  }

  <mat-divider style="clear: both"></mat-divider>

  <mat-tab-group
    animationDuration="0"
    [selectedIndex]="selectedTabIndex"
    (focusChange)="selectTabIndex($event.index)"
    [mat-stretch-tabs]="false"
  >
    <mat-tab aria-labelledby="hidden"></mat-tab>

    <mat-tab>
      <ng-template mat-tab-label>
        <mat-icon>file_present</mat-icon>
        @if (breakpoints.sizeAtLeast("Medium")) {
          <span class="label">{{ t("torrents.files") }}</span>
        }
        @if (filesCount(); as filesCount) {
          <span class="files-count">({{ filesCount | number }})</span>
        }
      </ng-template>

      <ng-template matTabContent>
        <mat-card class="torrent-files">
          @if (torrentContent.torrent.filesStatus === "no_info") {
            <p>{{ t("torrents.files_no_info") }}</p>
          }
          <app-torrent-files-table [torrent]="torrentContent.torrent" />
        </mat-card>
      </ng-template>
    </mat-tab>

    <mat-tab>
      <ng-template mat-tab-label>
        <mat-icon>sell</mat-icon>
        @if (breakpoints.sizeAtLeast("Medium")) {
          <span class="label">{{ t("torrents.edit_tags") }}</span>
        }
      </ng-template>
      <ng-template matTabContent>
        <app-torrent-edit-tags
          [torrentContent]="torrentContent"
          (updated)="updated.emit(null)"
        ></app-torrent-edit-tags>
      </ng-template>
    </mat-tab>

    <mat-tab>
      <ng-template mat-tab-label>
        <mat-icon>category</mat-icon>
        @if (breakpoints.sizeAtLeast("Medium")) {
          <span class="label">{{ t("torrents.classification") }}</span>
        }
      </ng-template>
      <ng-template matTabContent>
        <app-torrent-reprocess
          [infoHashes]="[torrentContent.infoHash]"
          (updated)="updated.emit(null)"
        ></app-torrent-reprocess>
      </ng-template>
    </mat-tab>

    <mat-tab>
      <ng-template mat-tab-label>
        <mat-icon>delete_forever</mat-icon>
        @if (breakpoints.sizeAtLeast("Medium")) {
          <span class="label">{{ t("torrents.delete") }}</span>
        }
      </ng-template>

      <ng-template matTabContent>
        <mat-card>
          <mat-card-content style="margin-top: 10px">
            <p>
              <strong>{{ t("torrents.delete_are_you_sure") }}</strong>
              <br />{{ t("torrents.delete_action_cannot_be_undone") }}
            </p>
          </mat-card-content>
          <mat-card-actions class="button-row">
            <button mat-stroked-button color="warning" (click)="delete()">
              <mat-icon>delete_forever</mat-icon>{{ t("torrents.delete") }}
            </button>
          </mat-card-actions>
        </mat-card>
      </ng-template>
    </mat-tab>
    @if (selectedTabIndex > 0) {
      <mat-tab>
        <ng-template mat-tab-label>
          <mat-icon style="margin-right: 0">close</mat-icon>
        </ng-template>
      </mat-tab>
    }
  </mat-tab-group>
</ng-container>
`, styles: ["/* src/app/torrents/torrent-content.component.scss */\nh2 {\n  margin-top: 10px;\n  max-width: 900px;\n  white-space: pre-wrap;\n  word-break: break-all;\n  overflow-wrap: break-word;\n}\n.poster {\n  float: right;\n  margin: 10px;\n  border: 1px solid currentColor;\n}\n.info-hash {\n  white-space: pre-wrap;\n  word-break: break-all;\n  overflow-wrap: break-word;\n}\n.info-hash span {\n  padding-left: 5px;\n  cursor: crosshair;\n  text-decoration: underline;\n  text-decoration-style: dotted;\n}\n.torrent-files {\n  padding-top: 10px;\n  max-height: 800px;\n  overflow: scroll;\n}\n.torrent-files table {\n  margin-bottom: 10px;\n  width: 800px;\n}\n.torrent-files td {\n  padding-right: 20px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12);\n}\n.torrent-files tr:hover td {\n  background-color: whitesmoke;\n}\n.torrent-files {\n  scrollbar-width: none;\n}\n.torrent-files ::-webkit-scrollbar {\n  display: none;\n}\n.files-count {\n  margin-left: 4px;\n}\n.mat-mdc-card-content p {\n  margin-top: 0;\n}\nspan.filesize {\n  text-decoration: underline;\n  text-decoration-style: dotted;\n  cursor: default;\n}\n::ng-deep .mdc-tab[aria-labelledby=hidden] {\n  display: none;\n}\n::ng-deep .mdc-tab[role=tab] {\n  padding-left: 15px;\n  padding-right: 15px;\n}\n::ng-deep .mdc-tab .label,\n::ng-deep .mdc-tab .files-count {\n  margin-left: 8px;\n}\n/*# sourceMappingURL=torrent-content.component.css.map */\n"] }]
  }], null, { torrentContent: [{
    type: Input
  }], heading: [{
    type: Input
  }], size: [{
    type: Input
  }], peers: [{
    type: Input
  }], published: [{
    type: Input
  }], updated: [{
    type: Output
  }], tabSelected: [{
    type: Output
  }], selectedTab: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TorrentContentComponent, { className: "TorrentContentComponent", filePath: "src/app/torrents/torrent-content.component.ts", lineNumber: 36 });
})();

export {
  TorrentReprocessComponent,
  FilesizePipe,
  TorrentChipsComponent,
  torrentTabNames,
  inactiveFacet,
  TorrentsSearchController,
  facets,
  orderByOptions,
  defaultOrderBy,
  isDefaultOrdering,
  TorrentContentComponent
};
/*! Bundled license information:

filesize/dist/filesize.js:
  (**
   * filesize
   *
   * @copyright 2025 Jason Mulligan <jason.mulligan@avoidwork.com>
   * @license BSD-3-Clause
   * @version 11.0.13
   *)
*/
//# sourceMappingURL=chunk-PU53WTNS.js.map
