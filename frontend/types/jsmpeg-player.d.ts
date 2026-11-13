declare module '@cycjimmy/jsmpeg-player' {
  interface JSMpegOptions {
    canvas?: HTMLCanvasElement;
    autoplay?: boolean;
    audio?: boolean;
    loop?: boolean;
    poster?: string;
    pauseWhenHidden?: boolean;
  }

  class JSMpeg {
    constructor(url: string, options?: JSMpegOptions);
  }

  export = JSMpeg;
}