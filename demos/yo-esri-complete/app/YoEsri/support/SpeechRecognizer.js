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
define(["require", "exports", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/core/watchUtils", "annyang"], function (require, exports, decorators_1, Accessor, watchUtils, annyang) {
    "use strict";
    var noop = Function.prototype;
    function wrapCommands(commands) {
        var _this = this;
        var wrapped = {};
        Object.keys(commands).forEach(function (commandName) {
            var command = commands[commandName];
            var wrappedCommand = function () {
                var rest = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    rest[_i] = arguments[_i];
                }
                var result = command.apply(_this, rest);
                if (wrappedCommand.after) {
                    wrappedCommand.after(result);
                }
            };
            wrapped[commandName] = wrappedCommand;
        });
        return wrapped;
    }
    var SpeechRecognizer = (function (_super) {
        __extends(SpeechRecognizer, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        function SpeechRecognizer(params) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Variables
            //
            //--------------------------------------------------------------------------
            _this._activationTimeoutId = null;
            _this._handles = [];
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  commands
            //----------------------------------
            _this.commands = {};
            //----------------------------------
            //  hotword
            //----------------------------------
            _this.hotword = "listen";
            //----------------------------------
            //  hotwordTimeoutInMs
            //----------------------------------
            _this.hotwordTimeoutInMs = 7500;
            //----------------------------------
            //  state
            //----------------------------------
            _this.state = "active";
            return _this;
        }
        SpeechRecognizer.prototype.initialize = function () {
            var _this = this;
            annyang.start();
            this._handles.push(watchUtils.init(this, "hotword", function (newValue, oldValue) {
                if (oldValue) {
                    annyang.removeCommands(oldValue);
                }
                if (newValue) {
                    var hotwordCommand = (_a = {},
                        _a[newValue] = noop,
                        _a);
                    annyang.addCommands(hotwordCommand);
                    _this._hotwordCommand = hotwordCommand;
                }
                var _a;
            }), watchUtils.init(this, "commands", function (newValue, oldValue) {
                var wrapped = _this._wrappedCommands;
                if (oldValue && wrapped) {
                    Object.keys(wrapped).forEach(function (commandName) {
                        wrapped[commandName].after = null;
                        wrapped[commandName] = null;
                    });
                }
                if (newValue) {
                    _this._wrappedCommands = wrapCommands.call(_this, newValue);
                }
            }));
            annyang.addCallback("resultMatch", function (userSaid, commandText) {
                if (commandText === _this.hotword) {
                    _this._wake();
                    _this._set("state", "listening");
                    _this._startActivationTimeout(function () {
                        _this._set("state", "active");
                        _this._sleep();
                    });
                    return;
                }
                _this._set("state", "processing");
                _this._stopActivationTimeout();
                _this._sleep();
                var command = _this._wrappedCommands[commandText];
                command.after = function (result) {
                    command.after = null;
                    if (result && typeof result.then === "function") {
                        result.then(function (val) {
                            _this._set("state", "active");
                        });
                        return;
                    }
                    _this._set("state", "active");
                };
            });
        };
        SpeechRecognizer.prototype.destroy = function () {
            annyang.abort();
            this._handles.forEach(function (handle) { return handle.remove(); });
            this._handles = null;
        };
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        SpeechRecognizer.prototype.wake = function () {
            var hotwordSansSpecialChars = this.hotword.replace(/\W/g, "");
            annyang.trigger(hotwordSansSpecialChars);
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        SpeechRecognizer.prototype._wake = function () {
            annyang.removeCommands(this.hotword);
            annyang.addCommands(this._wrappedCommands);
        };
        SpeechRecognizer.prototype._sleep = function () {
            annyang.removeCommands(Object.keys(this._wrappedCommands));
            annyang.addCommands(this._hotwordCommand);
        };
        SpeechRecognizer.prototype._startActivationTimeout = function (timeoutCallback) {
            var _this = this;
            this._activationTimeoutId = setTimeout(function () {
                timeoutCallback.call(_this);
                _this._stopActivationTimeout();
            }, this.hotwordTimeoutInMs);
        };
        SpeechRecognizer.prototype._stopActivationTimeout = function () {
            clearTimeout(this._activationTimeoutId);
            this._activationTimeoutId = null;
        };
        return SpeechRecognizer;
    }(decorators_1.declared(Accessor)));
    __decorate([
        decorators_1.property()
    ], SpeechRecognizer.prototype, "commands", void 0);
    __decorate([
        decorators_1.property()
    ], SpeechRecognizer.prototype, "hotword", void 0);
    __decorate([
        decorators_1.property()
    ], SpeechRecognizer.prototype, "hotwordTimeoutInMs", void 0);
    __decorate([
        decorators_1.property({
            readOnly: true
        })
    ], SpeechRecognizer.prototype, "state", void 0);
    SpeechRecognizer = __decorate([
        decorators_1.subclass("esri.demo.YoEsri.support.SpeechRecognizer")
    ], SpeechRecognizer);
    return SpeechRecognizer;
});
//# sourceMappingURL=SpeechRecognizer.js.map