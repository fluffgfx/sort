import * as React from 'react'
import { render } from 'react-dom'

import { SortVisualizer } from './SortVisualizer'
import { BogoSort } from './sorters/BogoSort'
import { MergeSort } from './sorters/MergeSort'
import { BubbleSort } from './sorters/BubbleSort'
import { HeapSort } from './sorters/HeapSort'

const Root = () => {
  return <SortVisualizer delay={0} rows={4} columns={100} sortAlgorithims={[HeapSort, BogoSort, BubbleSort, MergeSort]} />
}

render(
  <Root />,
  document.getElementById('root')
)
