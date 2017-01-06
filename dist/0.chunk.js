webpackJsonpac__name_([0],{

/***/ 804:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var common_1 = __webpack_require__(16);
var forms_1 = __webpack_require__(20);
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(45);
var detail_component_1 = __webpack_require__(806);
console.log('`Detail` bundle loaded asynchronously');
// async components must be named routes for WebpackAsyncRoute
exports.routes = [
    { path: '', component: detail_component_1.DetailComponent, pathMatch: 'full' }
];
var AboutModule = (function () {
    function AboutModule() {
    }
    return AboutModule;
}());
AboutModule.routes = exports.routes;
AboutModule = __decorate([
    core_1.NgModule({
        declarations: [
            // Components / Directives/ Pipes
            detail_component_1.DetailComponent
        ],
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            router_1.RouterModule.forChild(exports.routes),
        ]
    }),
    __metadata("design:paramtypes", [])
], AboutModule);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AboutModule;


/***/ },

/***/ 806:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */
console.log('`Detail` component loaded asynchronously');
var DetailComponent = (function () {
    function DetailComponent() {
    }
    DetailComponent.prototype.ngOnInit = function () {
        console.log('hello `Detail` component');
    };
    return DetailComponent;
}());
DetailComponent = __decorate([
    core_1.Component({
        selector: 'detail',
        template: "\n    <h1>Hello from Detail</h1>\n    <router-outlet></router-outlet>\n  "
    }),
    __metadata("design:paramtypes", [])
], DetailComponent);
exports.DetailComponent = DetailComponent;


/***/ }

});
//# sourceMappingURL=0.map