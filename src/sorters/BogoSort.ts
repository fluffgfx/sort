import { Sorter } from '../Sorter'

// been using this one to test performance
export class BogoSort extends Sorter {
  private index: number

  public static realName = 'BogoSort'

  public async sort() {
    this.setAuxData('Randomizing')
    const ia = Math.floor(Math.random() * this.size);
    const ib = Math.floor(Math.random() * this.size);
    return this.execSwap(ia, ib).then(() => {
      const sorted = this.data.reduce((p, n) => (p.n < n && p.v ? { v: true, n } : { v: false, n }), { v: true, n: 0 }).v
      if (sorted) { return } else { return this.sort() }
    })
  }
}
