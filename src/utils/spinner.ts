import { clearLine, cursorTo } from 'readline';

export default class Spinner {
  private _spinner: string;
  private _stream: NodeJS.WriteStream;
  private _intervalId: NodeJS.Timeout;
  private _delay: number;

  constructor() {
    this._spinner = '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏';
    this._stream = process.stdout;
    this.delay = 60;
  }

  set delay(ms: number) {
    this._delay = ms;
  }

  public clear() {
    clearLine(this._stream, 0);
    cursorTo(this._stream, 0);
  }

  public start(msg?: string) {
    let current = 0;
    this._intervalId = setInterval(() => {
      this.clear();
      this._stream.write(`${this._spinner[current]} ${msg}`);
      current = ++current % this._spinner.length;
    }, this._delay);
  }

  public stop() {
    clearInterval(this._intervalId);
    this.clear();
  }
}
