define(["require", "exports"], function (require, exports) {
    "use strict";
    function buildMapCommands(featureNames) {
        var _this = this;
        var commands = {};
        if (typeof featureNames === "string") {
            featureNames = [featureNames];
        }
        featureNames.forEach(function (name) {
            if (name === "view:zooming") {
                commands["zoom *direction"] = function (direction) {
                    if (direction !== "in" && direction !== "out") {
                        return;
                    }
                    var view = _this.view;
                    var scaleFactor = direction === "in" ? 0.5 : 2;
                    return view.goTo({
                        scale: view.scale * scaleFactor
                    });
                };
            }
            if (name === "view:basemap-change") {
                commands["base map *basemap"] = function (basemap) {
                    // format as close to existing basemaps
                    basemap = basemap
                        .toLowerCase()
                        .replace("grey", "gray")
                        .replace(/\s/g, "-");
                    _this.get("view.map").basemap = basemap;
                };
            }
        });
        return commands;
    }
    exports.buildMapCommands = buildMapCommands;
});
//# sourceMappingURL=mapCommands.js.map