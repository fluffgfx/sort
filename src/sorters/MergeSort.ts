import { Sorter } from '../Sorter'

export class MergeSort extends Sorter {
  public static realName = 'MergeSort'

  public async sort() {
    return this.sortInner(0, this.size).then(() => { this.setAuxData('Done!') })
  }

  private async sortInner(l: number, h: number): Promise<void> {
    if (Math.floor(h - l) <= 1) return
    const m = Math.floor(((h - l) / 2) + l)
    const r1 = await this.sortInner(l, m)
    const r2 = await this.sortInner(m, h)
    return this.merge(l, m, h)
  }

  private async merge(l: number, m: number, h: number): Promise<void> {
    this.setAuxData(`Merging sorted data from ${l} to ${m - 1} and ${m} to ${h}`)
    const i = this.data.slice(l, m)
    const j = this.data.slice(m, h)
    let result = []
    for (let k = 0; k < h - l; k++) {
      if (i.length === 0 || j.length === 0) break
      if (i[0] <= j[0]) {
        result.push(i.shift())
      } else {
        result.push(j.shift())
      }
    }
    if (i.length !== 0) result = result.concat(i)
    if (j.length !== 0) result = result.concat(j)
    return result.reduce((p, n, x) => p.then(() => this.execReplace(x + l, n)), Promise.resolve())
  }
}
