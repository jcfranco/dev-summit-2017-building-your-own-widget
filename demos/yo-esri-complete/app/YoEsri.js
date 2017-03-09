var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "./YoEsri/YoEsriViewModel", "esri/widgets/Widget"], function (require, exports, decorators_1, widget_1, YoEsriViewModel, Widget) {
    "use strict";
    var CSS = {
        base: "demo-yo-esri esri-widget",
        icon: "demo-yo-esri__icon",
        listening: "demo-yo-esri--listening",
        disabled: "demo-yo-esri--disabled",
        processing: "demo-yo-esri--processing"
    };
    var YoEsri = (function (_super) {
        __extends(YoEsri, _super);
        function YoEsri() {
            //--------------------------------------------------------------------------
            //
            //  Lifecycle
            //
            //--------------------------------------------------------------------------
            var _this = _super.apply(this, arguments) || this;
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  viewModel
            //----------------------------------
            _this.view = null;
            //----------------------------------
            //  viewModel
            //----------------------------------
            _this.viewModel = new YoEsriViewModel();
            return _this;
        }
        YoEsri.prototype.destroy = function () {
            this.viewModel.destroy();
            this.viewModel = null;
        };
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        YoEsri.prototype.render = function () {
            var state = this.get("viewModel.state");
            var rootClasses = (_a = {},
                _a[CSS.listening] = state === "listening",
                _a[CSS.disabled] = state === "disabled",
                _a[CSS.processing] = state === "processing",
                _a);
            var pathType = state === "processing" ? "processing" : "microphone";
            return (widget_1.jsxFactory.createElement("div", { bind: this, class: CSS.base, classes: rootClasses, onclick: this._wake, onkeydown: this._wake, tabIndex: 0 }, this._getIcon(pathType)));
            var _a;
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        YoEsri.prototype._getIcon = function (type) {
            if (type === "microphone") {
                return (widget_1.jsxFactory.createElement("svg", { key: "microphone_icon", class: CSS.icon, xmlns: "http://www.w3.org/2000/svg", version: "1.1", viewBox: "0 0 24 24" },
                    widget_1.jsxFactory.createElement("path", { d: "M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,\n            3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,\n            17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" })));
            }
            return (widget_1.jsxFactory.createElement("svg", { key: "processing_icon", class: CSS.icon, xmlns: "http://www.w3.org/2000/svg", version: "1.1", viewBox: "0 0 50 50" },
                widget_1.jsxFactory.createElement("path", { fill: "#000", d: "M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,\n                0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,\n                14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" },
                    widget_1.jsxFactory.createElement("animateTransform", { attributeType: "xml", attributeName: "transform", type: "rotate", from: "0 25 25", to: "360 25 25", dur: "0.6s", repeatCount: "indefinite" }))));
        };
        YoEsri.prototype._wake = function () {
            var vm = this.viewModel;
            if (vm.state === "listening") {
                vm.sleep();
            }
            else {
                vm.wake();
            }
        };
        return YoEsri;
    }(decorators_1.declared(Widget)));
    __decorate([
        decorators_1.aliasOf("viewModel.view")
    ], YoEsri.prototype, "view", void 0);
    __decorate([
        decorators_1.property(),
        widget_1.renderable([
            "viewModel.state"
        ])
    ], YoEsri.prototype, "viewModel", void 0);
    __decorate([
        widget_1.accessibleHandler()
    ], YoEsri.prototype, "_wake", null);
    YoEsri = __decorate([
        decorators_1.subclass("esri.demos.YoEsri")
    ], YoEsri);
    return YoEsri;
});
//# sourceMappingURL=YoEsri.js.map