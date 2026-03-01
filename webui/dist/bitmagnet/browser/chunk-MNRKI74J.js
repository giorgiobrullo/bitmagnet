import {
  Title
} from "./chunk-7NLLN7HY.js";
import {
  Component,
  Input,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵdefineComponent,
  ɵɵdomElementContainer
} from "./chunk-BQWGEQNI.js";

// src/app/layout/document-title.component.ts
var DocumentTitleComponent = class _DocumentTitleComponent {
  constructor() {
    this.title = inject(Title);
    this.parts = [];
  }
  ngOnInit() {
    this.updateTitle();
  }
  ngOnChanges() {
    this.updateTitle();
  }
  updateTitle() {
    this.title.setTitle([...this.parts.filter(Boolean), "bitmagnet"].join(" - "));
  }
  static {
    this.\u0275fac = function DocumentTitleComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DocumentTitleComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DocumentTitleComponent, selectors: [["app-document-title"]], inputs: { parts: "parts" }, features: [\u0275\u0275NgOnChangesFeature], decls: 1, vars: 0, template: function DocumentTitleComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275domElementContainer(0);
      }
    }, encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DocumentTitleComponent, [{
    type: Component,
    args: [{
      selector: "app-document-title",
      standalone: true,
      template: "<ng-container></ng-container>"
    }]
  }], null, { parts: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DocumentTitleComponent, { className: "DocumentTitleComponent", filePath: "src/app/layout/document-title.component.ts", lineNumber: 9 });
})();

export {
  DocumentTitleComponent
};
//# sourceMappingURL=chunk-MNRKI74J.js.map
