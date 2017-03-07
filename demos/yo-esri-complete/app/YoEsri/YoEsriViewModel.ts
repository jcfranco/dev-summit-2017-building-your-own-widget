import {
  aliasOf,
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

import Accessor = require("esri/core/Accessor");
import promiseUtils = require("esri/core/promiseUtils")
import MapView = require("esri/views/MapView");
import SceneView = require("esri/views/SceneView");

import { VoiceCommands } from "annyang";
import SpeechRecognizer = require("./support/SpeechRecognizer");
import { buildMapCommands } from "./support/mapCommands";

type State = "disabled" | "active" | "listening" | "processing";

@subclass("esri.demos.YoEsri.YoEsriViewModel")
class YoEsriViewModel extends declared(Accessor) {

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  destroy() {
    this.recognizer.destroy();
    this.recognizer = null;
    this.view = null;
    this.commands = null;
  }

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  commands
  //----------------------------------

  @aliasOf("recognizer.commands")
  commands: VoiceCommands;

  //----------------------------------
  //  hotword
  //----------------------------------

  @aliasOf("recognizer.hotword")
  hotword: string;

  //----------------------------------
  //  hotwordTimeoutInMs
  //----------------------------------

  @aliasOf("recognizer.hotword")
  hotwordTimeoutInMs: number;

  //----------------------------------
  //  recognizer
  //----------------------------------

  @property()
  recognizer = new SpeechRecognizer({
    commands: buildMapCommands.call(this, ["view:zooming", "view:basemap-change"])
  });

  //----------------------------------
  //  state
  //----------------------------------

  @property({
    dependsOn: [
      "view.ready",
      "recognizer.state"
    ],
    readOnly: true
  })
  get state(): State {
    return this.get("view.ready") ?
      this.recognizer.state :
      "disabled";
  }

  //----------------------------------
  //  view
  //----------------------------------

  @property()
  view: MapView | SceneView;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  wake(): void {
    this.recognizer.wake();
  }

  sleep(): void {
    this.recognizer.sleep();
  }

}

export = YoEsriViewModel;
