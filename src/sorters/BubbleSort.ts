import { Sorter } from '../sorter'

export class BubbleSort extends Sorter {
  public name = 'Bubble Sort'
  
  public async sort() {
    let numPasses = 0
    let oldData = this.data
    for(let i = 0; i < this.size - 1; i++) {
      if (this.data[i] > this.data[i + 1]) {
        await this.execSwap(i, i+1)
        numPasses++
      }
    }
    if (numPasses === 0) return
    return this.sort()
  }
}