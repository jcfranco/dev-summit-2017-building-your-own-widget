import { VoiceCommands } from "annyang";

export function buildMapCommands(featureNames: string | string[]): VoiceCommands {
  const commands: VoiceCommands = {};

  if (typeof featureNames === "string") {
    featureNames = [featureNames];
  }

  featureNames.forEach(name => {

    if (name === "view:zooming") {
      commands["zoom *direction"] = (direction: string): void => {
        if (direction !== "in" && direction !== "out") {
          return;
        }

        const view = this.view;
        const scaleFactor = direction === "in" ? 0.5 : 2;

        return view.goTo({
          scale: view.scale * scaleFactor
        });
      };
    }

    if (name=== "view:basemap-change") {
      commands["base map *basemap"] = (basemap: string): void => {

        // format as close to existing basemaps
        basemap = basemap
          .toLowerCase()
          .replace("grey", "gray")
          .replace(/\s/g, "-");

        this.get("view.map").basemap = basemap;
      };

    }

  });

  return commands;
}

