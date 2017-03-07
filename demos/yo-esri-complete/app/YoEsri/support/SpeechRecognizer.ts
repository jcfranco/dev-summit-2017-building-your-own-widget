import {
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

import Accessor = require("esri/core/Accessor");
import promiseUtils = require("esri/core/promiseUtils");
import watchUtils = require("esri/core/watchUtils");

import annyang = require("annyang");
import { VoiceCommands } from "annyang";

type State = "active" | "listening" | "processing";

interface WrappedVoiceCommands extends VoiceCommands {
  [key: string]: WrappedVoiceCommand
}

interface WrappedVoiceCommand {
  (...rest: any[]): void;

  after?(result: any): void;
}

const noop = Function.prototype;

function wrapCommands(commands: VoiceCommands): WrappedVoiceCommands {
  const wrapped: WrappedVoiceCommands = {};

  Object.keys(commands).forEach(commandName => {
    const command = commands[commandName];

    const wrappedCommand: WrappedVoiceCommand = (...rest: any[]) => {
      const result = command.apply(this, rest);
      if (wrappedCommand.after) {
        wrappedCommand.after(result);
      }
    };

    wrapped[commandName] = wrappedCommand;
  });

  return wrapped;
}

const _coldword = "cancel";

@subclass("esri.demo.YoEsri.support.SpeechRecognizer")
class SpeechRecognizer extends declared(Accessor) {

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor(params?: any) {
    super();
  }

  initialize() {
    annyang.start();

    this._handles.push(
      watchUtils.init(this, "hotword", (newValue: string, oldValue: string) => {
        if (oldValue) {
          annyang.removeCommands(oldValue);
        }

        if (newValue) {
          const hotwordCommand = {
            [newValue]: noop
          };

          annyang.addCommands(hotwordCommand);
          this._hotwordCommand = hotwordCommand;
        }
      }),

      watchUtils.init(this, "commands", (newValue: VoiceCommands, oldValue: VoiceCommands) => {
        const wrapped = this._wrappedCommands;

        if (oldValue && wrapped) {
          Object.keys(wrapped).forEach(commandName => {
            wrapped[commandName].after = null;
            wrapped[commandName] = null;
          });
        }

        if (newValue) {
          this._wrappedCommands = wrapCommands.call(this, newValue);
        }
      })
    );

    annyang.addCallback("resultMatch", (userSaid, commandText) => {
      if (commandText === this.hotword) {
        this._wake();
        this._set("state", "listening");

        this._startActivationTimeout(this.sleep);

        return;
      }

      if (commandText === _coldword) {
        this.sleep();

        return;
      }

      this._set("state", "processing");
      this._stopActivationTimeout();
      this._sleep();

      const command = this._wrappedCommands[commandText];

      command.after = result => {
        command.after = null;

        if (result && typeof result.then === "function") {
          result.then((val: any) => {
            this._set("state", "active");
          });

          return;
        }

        this._set("state", "active");
      };
    });
  }

  destroy() {
    annyang.abort();

    this._handles.forEach(handle => handle.remove());
    this._handles = null;
  }

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  private _activationTimeoutId: number = null;

  private _handles: IHandle[] = [];

  private _hotwordCommand: VoiceCommands;

  private _wrappedCommands: WrappedVoiceCommands;

  private _coldwordCommand: VoiceCommands = {
    [_coldword]: noop
  };

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  commands
  //----------------------------------

  @property()
  commands: VoiceCommands = {};

  //----------------------------------
  //  hotword
  //----------------------------------

  @property()
  hotword = "listen";

  //----------------------------------
  //  hotwordTimeoutInMs
  //----------------------------------

  @property()
  hotwordTimeoutInMs = 7500;

  //----------------------------------
  //  state
  //----------------------------------

  @property({
    readOnly: true
  })
  state: State = "active";

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  wake(): void {
    const hotwordSansSpecialChars = this.hotword.replace(/\W/g, "");
    annyang.trigger(hotwordSansSpecialChars);
  }

  sleep(): void {
    this._set("state", "active");
    this._sleep();
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private _wake(): void {
    annyang.removeCommands(this.hotword);

    annyang.addCommands(this._wrappedCommands);
    annyang.addCommands(this._coldwordCommand);
  }

  private _sleep(): void {
    annyang.removeCommands(Object.keys(this._wrappedCommands));
    annyang.removeCommands(Object.keys(_coldword));

    annyang.addCommands(this._hotwordCommand);
  }

  private _startActivationTimeout(timeoutCallback: Function): void {
    this._activationTimeoutId = setTimeout(() => {
      timeoutCallback.call(this);
      this._stopActivationTimeout();
    }, this.hotwordTimeoutInMs);
  }

  private _stopActivationTimeout(): void {
    clearTimeout(this._activationTimeoutId);
    this._activationTimeoutId = null;
  }

}

export = SpeechRecognizer;
