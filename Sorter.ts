import delayer from 'timeout-as-promise'

type MightBeAPromise = Promise<any> | null;

export abstract class Sorter {
  private delay: number = 0.05;
  private queue: MightBeAPromise = null;
  private onUpdateCallback: (n: number[]) => any;
  protected data: number[] = [];

  constructor(delay: number) {
    this.delay = delay;
  }

  protected async execSwap(indexA: number, indexB: number) {
    let p: Promise<any> = delayer(this.delay).then(() => {
      let a = this.data[indexA];
      let b = this.data[indexB];
      this.data[indexA] = b;
      this.data[indexB] = a;
      this.onUpdateCallback(this.data)
    })
    if (this.queue) {
      this.queue.then(() => p)
    } else {
      this.queue = p
    }
    return p
  }

  public setData(d: number[]) { this.data = d }

  public getData() { return this.data }

  public onUpdate(f: (n: number[]) => any) { this.onUpdateCallback = f }

  public shuffleData() {
    for (var i = this.data.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = this.data[i];
        this.data[i] = this.data[j];
        this.data[j] = temp;
    }
  }

  public abstract sort()
}