declare module "annyang" {
  export interface SpeechRecognition {
  }

  export interface StartOptions {
    autoRestart: boolean;
    continous: boolean;
    paused: boolean;
  }

  export interface VoiceCommands {
    [key: string]: Function
  }

  export interface AnnyangCallback {
    (userSaid: string, commandText: string, phrases: string[]): void;
  }

  export function addCommands(commands: VoiceCommands): void;
  export function removeCommands(commandNames?: string | string[]): void;
  export function start(startOptions?: StartOptions): void;
  export function abort(): void;
  export function pause(): void;
  export function resume(): void;
  export function debug(newState: boolean): void;
  export function setLanguage(language: string): void;
  export function isListening(): boolean;

  export function addCallback(type: "start", callback: AnnyangCallback, context?: any): void;
  export function addCallback(type: "soundstart", callback: AnnyangCallback, context?: any): void;
  export function addCallback(type: "error", callback: AnnyangCallback, context?: any): void;
  export function addCallback(type: "errorNetwork", callback: AnnyangCallback, context?: any): void;
  export function addCallback(type: "errorPermissionBlocked", callback: AnnyangCallback, context?: any): void;
  export function addCallback(type: "errorPermissionDenied", callback: AnnyangCallback, context?: any): void;
  export function addCallback(type: "end", callback: AnnyangCallback, context?: any): void;
  export function addCallback(type: "result", callback: AnnyangCallback, context?: any): void;
  export function addCallback(type: "resultMatch", callback: AnnyangCallback, context?: any): void;
  export function addCallback(type: "resultNoMatch", callback: AnnyangCallback, context?: any): void;
  export function addCallback(type: string, callback: AnnyangCallback, context?: any): void;

  export function addCallback(): void;
  export function removeCallback(type: "start", callback?: AnnyangCallback): void;
  export function removeCallback(type: "soundstart", callback?: AnnyangCallback): void;
  export function removeCallback(type: "error", callback?: AnnyangCallback): void;
  export function removeCallback(type: "errorNetwork", callback?: AnnyangCallback): void;
  export function removeCallback(type: "errorPermissionBlocked", callback?: AnnyangCallback): void;
  export function removeCallback(type: "errorPermissionDenied", callback?: AnnyangCallback): void;
  export function removeCallback(type: "end", callback?: AnnyangCallback): void;
  export function removeCallback(type: "result", callback?: AnnyangCallback): void;
  export function removeCallback(type: "resultMatch", callback?: AnnyangCallback): void;
  export function removeCallback(type: "resultNoMatch", callback?: AnnyangCallback): void;
  export function removeCallback(type: string | undefined, callback?: AnnyangCallback): void;

  export function getSpeechRecognizer(): SpeechRecognition;
  export function trigger(commandNames: string | string[]): void;
}
