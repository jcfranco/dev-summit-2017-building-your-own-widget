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

    commands["hipster"] = (): void => {
      const { head, body } = document;
      const style = document.createElement("style");

      style.type = "text/css";
      style.innerHTML = `
      .hipster {
        margin: 0;
        padding: 0;
        position: fixed;
        bottom: -60px;
        right: 0;
        width: 340px;
        height: 640px;
        transition: all 0.25s ease-in-out;
        transform: rotate(-30deg);
      }
      .hidden {
        right: -340px;
        bottom: -640px;
      }
      `;
      head.appendChild(style);

      setTimeout(() => {
        const image = document.createElement("img");

        image.src = "https://pbs.twimg.com/profile_images/806946771536490497/5izwtbyK.jpg";
        image.className = "hipster hidden";

        body.appendChild(image);

        image.onload = () => {
          setTimeout(() => {
            image.classList.remove("hidden");
          }, 100);

          setTimeout(() => {
            image.classList.add("hidden");
          }, 1000);

          setTimeout(() => {
            body.removeChild(image);
            head.removeChild(style);
          }, 1500);
        };

      }, 0);

    };

  });

  return commands;
}

