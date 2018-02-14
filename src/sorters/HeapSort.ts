import { Sorter } from '../Sorter'

export class HeapSort extends Sorter {
  public static realName = 'HeapSort'

  public async sort() {
    await this.buildMaxHeap()

    let s = this.size
    for (let i = this.size - 1; i > 0; i--) {
      await this.execSwap(0, i)
      s--
      this.setAuxData(`Building heap of size ${s}`)
      await this.heapify(0, s)
    }

    this.setAuxData('Done!')
  }

  private async buildMaxHeap() {
    for (let i = Math.floor(this.size / 2); i >= 0; i--) {
       this.setAuxData(`Building Max Heap at index ${i}`)
       await this.heapify(i, this.size)
    }
  }

  private async heapify(index: number, size: number) {
    const left = (index * 2) + 1
    const right = (index * 2) + 2
    let largest = index

    if (left < size && this.data[left] > this.data[index]) largest = left
    if (right < size && this.data[right] > this.data[largest]) largest = right

    if (largest !== index) {
      await this.execSwap(index, largest)
      await this.heapify(largest, size)
    }
  }
}
