import * as delayer from 'timeout-as-promise'

type MightBeAPromise = Promise<any> | null;

export abstract class Sorter {
  private delay: number = 0.05;
  protected size: number;
  // private queue: MightBeAPromise = null;
  private onUpdateCallback: (n: number[]) => any;
  protected data: number[] = [];

  public abstract name: string;

  constructor(delay: number, size: number) {
    this.delay = delay;
    this.size = size;
    this.data = [];
    for (let i = 0; i < size; i++) {
      this.data.push(Math.random())
    }
  }

  protected async execSwap(indexA: number, indexB: number) {
    let p: Promise<any> = delayer(this.delay * 2).then(() => {
      let a = this.data[indexA];
      let b = this.data[indexB];
      this.data[indexA] = b;
      this.data[indexB] = a;
      this.onUpdateCallback(this.data)
    })
    return p
  }

  protected async execReplace(index: number, newValue: number) {
    let p: Promise<any> = delayer(this.delay).then(() => {
      this.data[index] = newValue;
      this.onUpdateCallback(this.data)
    })
    return p
  }

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