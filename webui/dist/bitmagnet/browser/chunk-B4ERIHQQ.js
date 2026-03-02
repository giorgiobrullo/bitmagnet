import {
  DocumentTitleComponent
} from "./chunk-MNRKI74J.js";
import {
  AppModule,
  MatCard,
  MatCardHeader,
  MatCardTitle,
  TranslocoDirective
} from "./chunk-EOZPNCBR.js";
import "./chunk-7NLLN7HY.js";
import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-BQWGEQNI.js";

// src/app/not-found/not-found.component.ts
var _c0 = (a0) => [a0];
function NotFoundComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "app-document-title", 1);
    \u0275\u0275elementStart(2, "mat-card", 2)(3, "mat-card-header")(4, "mat-card-title")(5, "h2");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const t_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("parts", \u0275\u0275pureFunction1(2, _c0, t_r1("general.page_not_found")));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(t_r1("general.page_not_found"));
  }
}
var NotFoundComponent = class _NotFoundComponent {
  static {
    this.\u0275fac = function NotFoundComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NotFoundComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotFoundComponent, selectors: [["app-not-found"]], decls: 1, vars: 0, consts: [[4, "transloco"], [3, "parts"], [1, "card-not-found"]], template: function NotFoundComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, NotFoundComponent_ng_container_0_Template, 7, 4, "ng-container", 0);
      }
    }, dependencies: [AppModule, MatCard, MatCardHeader, MatCardTitle, TranslocoDirective, DocumentTitleComponent], styles: ["\n\n.card-not-found[_ngcontent-%COMP%] {\n  max-width: 960px;\n  margin: 20px auto;\n}\n.card-not-found[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-top: 10px;\n}\n/*# sourceMappingURL=not-found.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotFoundComponent, [{
    type: Component,
    args: [{ selector: "app-not-found", standalone: true, imports: [AppModule, DocumentTitleComponent], template: `<ng-container *transloco="let t">
  <app-document-title [parts]="[t('general.page_not_found')]" />
  <mat-card class="card-not-found">
    <mat-card-header>
      <mat-card-title>
        <h2>{{ t("general.page_not_found") }}</h2>
      </mat-card-title>
    </mat-card-header>
  </mat-card>
</ng-container>
`, styles: ["/* src/app/not-found/not-found.component.scss */\n.card-not-found {\n  max-width: 960px;\n  margin: 20px auto;\n}\n.card-not-found h2 {\n  margin-top: 10px;\n}\n/*# sourceMappingURL=not-found.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotFoundComponent, { className: "NotFoundComponent", filePath: "src/app/not-found/not-found.component.ts", lineNumber: 12 });
})();
export {
  NotFoundComponent
};
//# sourceMappingURL=chunk-B4ERIHQQ.js.map
