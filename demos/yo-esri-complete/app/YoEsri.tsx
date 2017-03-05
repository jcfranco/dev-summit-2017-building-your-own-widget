import {
  aliasOf,
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

import {
  accessibleHandler,
  jsxFactory,
  renderable
} from "esri/widgets/support/widget";

type PathType = "microphone" | "processing";

import YoEsriViewModel = require("./YoEsri/YoEsriViewModel");

import MapView = require("esri/views/MapView");
import SceneView= require("esri/views/SceneView");
import Widget = require("esri/widgets/Widget");

const CSS = {
  base: "demo-yo-esri esri-widget",
  icon: "demo-yo-esri__icon",
  listening: "demo-yo-esri--listening",
  disabled: "demo-yo-esri--disabled",
  processing: "demo-yo-esri--processing"
};

@subclass("esri.demos.YoEsri")
class YoEsri extends declared(Widget) {

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  destroy() {
    this.viewModel.destroy();
    this.viewModel = null;
  }

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  viewModel
  //----------------------------------

  @aliasOf("viewModel.view")
  view: MapView | SceneView = null;

  //----------------------------------
  //  viewModel
  //----------------------------------

  @property()
  @renderable([
    "viewModel.state"
  ])
  viewModel = new YoEsriViewModel();

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  render() {
    const state = this.get("viewModel.state");
    const rootClasses = {
      [CSS.listening]: state === "listening",
      [CSS.disabled]: state === "disabled",
      [CSS.processing]: state === "processing"
    };
    const pathType: PathType = state === "processing" ? "processing" : "microphone";

    return (
      <div bind={this} class={CSS.base} classes={rootClasses}
           onclick={this._wake} onkeydown={this._wake} tabIndex={0}>
        {this._getIcon(pathType)}
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private _getIcon(type: PathType): any {
    if (type === "microphone") {
      return (
        <svg key="microphone_icon"
             class={CSS.icon}
             xmlns="http://www.w3.org/2000/svg"
             version="1.1"
             viewBox="0 0 24 24">
          <path d={`M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,
            3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,
            17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z`} />
        </svg>
      );
    }

    return (
      <svg key="processing_icon"
           class={CSS.icon}
           xmlns="http://www.w3.org/2000/svg"
           version="1.1"
           viewBox="0 0 50 50">
        <path fill="#000"
              d={`M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,
                0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,
                14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z`}>
          <animateTransform attributeType="xml"
                            attributeName="transform"
                            type="rotate"
                            from="0 25 25"
                            to="360 25 25"
                            dur="0.6s"
                            repeatCount="indefinite" />
        </path>
      </svg>
    );
  }

  @accessibleHandler()
  private _wake(): void {
    this.viewModel.wake();
  }

}

export = YoEsri;
