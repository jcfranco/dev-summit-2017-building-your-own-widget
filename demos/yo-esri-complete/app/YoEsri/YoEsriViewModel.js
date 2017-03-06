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
define(["require", "exports", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "./support/SpeechRecognizer", "./support/mapCommands"], function (require, exports, decorators_1, Accessor, SpeechRecognizer, mapCommands_1) {
    "use strict";
    var YoEsriViewModel = (function (_super) {
        __extends(YoEsriViewModel, _super);
        function YoEsriViewModel() {
            //--------------------------------------------------------------------------
            //
            //  Lifecycle
            //
            //--------------------------------------------------------------------------
            var _this = _super.apply(this, arguments) || this;
            //----------------------------------
            //  recognizer
            //----------------------------------
            _this.recognizer = new SpeechRecognizer({
                commands: mapCommands_1.buildMapCommands.call(_this, ["view:zooming", "view:basemap-change"])
            });
            return _this;
        }
        YoEsriViewModel.prototype.destroy = function () {
            this.recognizer.destroy();
            this.recognizer = null;
            this.view = null;
            this.commands = null;
        };
        Object.defineProperty(YoEsriViewModel.prototype, "state", {
            //----------------------------------
            //  state
            //----------------------------------
            get: function () {
                return this.get("view.ready") ?
                    this.recognizer.state :
                    "disabled";
            },
            enumerable: true,
            configurable: true
        });
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        YoEsriViewModel.prototype.wake = function () {
            this.recognizer.wake();
        };
        return YoEsriViewModel;
    }(decorators_1.declared(Accessor)));
    __decorate([
        decorators_1.aliasOf("recognizer.commands")
    ], YoEsriViewModel.prototype, "commands", void 0);
    __decorate([
        decorators_1.aliasOf("recognizer.hotword")
    ], YoEsriViewModel.prototype, "hotword", void 0);
    __decorate([
        decorators_1.aliasOf("recognizer.hotword")
    ], YoEsriViewModel.prototype, "hotwordTimeoutInMs", void 0);
    __decorate([
        decorators_1.property()
    ], YoEsriViewModel.prototype, "recognizer", void 0);
    __decorate([
        decorators_1.property({
            dependsOn: [
                "view.ready",
                "recognizer.state"
            ],
            readOnly: true
        })
    ], YoEsriViewModel.prototype, "state", null);
    __decorate([
        decorators_1.property()
    ], YoEsriViewModel.prototype, "view", void 0);
    YoEsriViewModel = __decorate([
        decorators_1.subclass("esri.demos.YoEsri.YoEsriViewModel")
    ], YoEsriViewModel);
    return YoEsriViewModel;
});
//# sourceMappingURL=YoEsriViewModel.js.map