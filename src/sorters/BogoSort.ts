import { Sorter } from '../Sorter'

// been using this one to test performance
export class BogoSort extends Sorter {
  private index: number
  private timeAtLastSort: number

  public name = 'BogoSort'

  public async sort() {
    const ia = Math.floor(Math.random() * this.size);
    const ib = Math.floor(Math.random() * this.size);
    return this.execSwap(ia, ib).then(() => {
      console.log(`row number ${this.index} took ${Date.now() - this.timeAtLastSort}ms to execute swap`)
      this.timeAtLastSort = Date.now();
      const sorted = this.data.reduce((p, n) => (p.n < n && p.v ? { v: true, n } : { v: false, n }), { v: true, n: 0 }).v
      if (sorted) { return } else { return this.sort() }
    })
  }

  public async sorty(n: number) {
    this.index = n
    this.timeAtLastSort = Date.now()
    console.log(`sort number ${n} at ${Date.now()}`)
    return this.sort()
  }
}
