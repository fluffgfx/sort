import { Sorter } from '../Sorter'

export class BubbleSort extends Sorter {
  public static realName = 'BubbleSort'
  
  public async sort() {
    return this.sortHelper(0)
  }

  public async sortHelper(pn: number) {
    this.setAuxData(`Executing pass ${pn}`)
    let numPasses = 0
    let oldData = this.data
    for(let i = 0; i < this.size - 1; i++) {
      if (this.data[i] > this.data[i + 1]) {
        await this.execSwap(i, i+1)
        numPasses++
      }
    }
    if (numPasses === 0) return
    return this.sortHelper(pn + 1)
  } 
}