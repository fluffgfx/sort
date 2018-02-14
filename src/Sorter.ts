import * as delayer from 'timeout-as-promise'

type MightBeAPromise = Promise<any> | null;

export abstract class Sorter {
  public static realName: string = 'Unnamed Sorter'

  protected size: number
  protected data: number[] = []

  private delay: number = 0.05;
  private auxData: string = ''
  // private queue: MightBeAPromise = null;
  private onUpdateCallback: (n: number[]) => any
  private onAuxDataCallback: (s) => any

  constructor(delay: number, size: number) {
    this.delay = delay;
    this.size = size;
    this.data = [];
    for (let i = 0; i < size; i++) {
      this.data.push(Math.random())
    }
  }

  public getData() { return this.data }

  public onUpdate(f: (n: number[]) => any) { this.onUpdateCallback = f }

  public onAuxDataUpdate(f: (s: string) => any) { this.onAuxDataCallback = f }

  public shuffleData() {
    for (let i = this.data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = this.data[i];
        this.data[i] = this.data[j];
        this.data[j] = temp;
    }
  }

  public abstract sort()

  protected async execSwap(indexA: number, indexB: number) {
    return delayer(this.delay * 2).then(() => {
      const a = this.data[indexA];
      const b = this.data[indexB];
      this.data[indexA] = b;
      this.data[indexB] = a;
      this.onUpdateCallback(this.data)
    })
  }

  protected async execReplace(index: number, newValue: number) {
    return delayer(this.delay).then(() => {
      this.data[index] = newValue;
      this.onUpdateCallback(this.data)
    })
  }

  protected setAuxData(s: string) {
    this.auxData = s
    this.onAuxDataCallback(s)
  }
}
