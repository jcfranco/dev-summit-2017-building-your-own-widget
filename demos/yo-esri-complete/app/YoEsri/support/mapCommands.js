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
            commands["hipster"] = function () {
                var head = document.head, body = document.body, createElement = document.createElement;
                var style = createElement('style');
                style.type = 'text/css';
                style.innerHTML = "\n      .hipster {\n        margin: 0;\n        padding: 0;\n        position: fixed;\n        bottom: -60px;\n        right: 0;\n        width: 340px;\n        height: 640px;\n        transition: all 0.25s ease-in-out;\n        transform: rotate(-30deg);\n      }\n      .hidden {\n        right: -340px;\n        bottom: -640px;\n      }\n      ";
                head.appendChild(style);
                var image = createElement("img");
                image.src = "https://pbs.twimg.com/profile_images/806946771536490497/5izwtbyK.jpg";
                image.className = "hipster hidden";
                body.appendChild(image);
                setTimeout(function () {
                    image.classList.remove("hidden");
                }, 0);
                setTimeout(function () {
                    image.classList.add("hidden");
                }, 1000);
                setTimeout(function () {
                    body.removeChild(image);
                }, 1500);
            };
        });
        return commands;
    }
    exports.buildMapCommands = buildMapCommands;
});
//# sourceMappingURL=mapCommands.js.map