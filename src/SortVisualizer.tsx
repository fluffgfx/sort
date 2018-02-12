import * as React from 'react'
import { forEach as asyncForeach } from 'async-foreach'

import { Sorter } from './Sorter'

type VisualizerProps = {
  sortAlgorithims: Array<{
    new(a: number, b: number): Sorter
  }>
  rows: number
  delay: number
  columns: number
}

type VisualizerRowProps = {
  data: number[],
  index: number,
  auxData: string
}

type VisualizerState = {
  sorters: Sorter[],
  data: number[][],
  selectedSorter: number,
  nya: number,
  auxData: string
}

export class SortVisualizer extends React.Component<VisualizerProps, VisualizerState> {
  constructor(props: VisualizerProps) {
    super(props)
    this.populateSorters = this.populateSorters.bind(this)
    this.swapSort = this.swapSort.bind(this)
    this.startSorting = this.startSorting.bind(this)
    const { sorters, data, nya } = this.populateSorters(0)
    this.state = { sorters, data, selectedSorter: 0, nya, auxData: '' };
    setTimeout(this.startSorting, 1000)
  }

  populateSorters(n: number) {
    let sorters: Sorter[] = []
    let data: number[][] = []
    let nya: number = Math.random()
    for (let i = 0; i < this.props.rows; i++) {
      let s: Sorter = new this.props.sortAlgorithims[n](this.props.delay, this.props.columns)
      data[i] = s.getData()
      s.onUpdate((n) => { if(this.state.nya === nya) this.setState(() => ({
        data: this.state.data.map((x, j) => i !== j ? x : n)
      }))})
      s.onAuxDataUpdate((s) => { if(this.state.nya === nya) this.setState(() => ({
        auxData: s
      }))})
      sorters.push(s)
    }
    return { sorters, data, nya }
  }

  startSorting() {
    asyncForeach(this.state.sorters, (s) => s.sort())
  }

  swapSort(e) {
    const v = e.target.value
    this.setState({ selectedSorter: v }, () => {
      this.setState(this.populateSorters(v), () => {
        this.startSorting()
      })
    })
  }

  render() {
    return (
      <span>
        {this.state.data.map((d, i) => (<SortVisualizerRow data={d} index={i} key={`svro_${i}`} auxData={this.state.auxData}/>))}
        <select value={this.state.selectedSorter} onChange={this.swapSort}>
          {this.props.sortAlgorithims.map((a, i) => (
            <option value={i}>{a.prototype.constructor.realName}</option>
          ))}
        </select>
      </span>
    )
  }
}

function SortVisualizerRow(props: VisualizerRowProps) {
  let d = props.data.map(n => (n*6))
  let bgc = d.map(n => {
    let red = 0, blue = 0, green = 0
    switch (Math.floor(n)) {
      case 0:
        red = 255
        green = 0
        blue = n * 255
        break
      case 1:
        blue = 255
        green = 0
        red = (0 - (n - 2)) * 255
        break
      case 2:
        red = 0
        blue = 255
        green = (n - 2) * 255
        break
      case 3:
        red = 0
        green = 255
        blue = (0 - (n - 4)) * 255
        break
      case 4:
        blue = 0
        green = 255
        red = (n - 4) * 255
        break
      case 5:
        red = 255
        blue = 0
        green = (0 - (n - 6)) * 255
        break
      default:
        console.log("how did i get here")
    }
    return `rgb(${red}, ${blue}, ${green})`
  })
  return (<div
    style={{
      height: '200px'
    }}>
    {d.map((n, i) => (
      <div
        style={{
          width: '5px',
          height: '200px',
          backgroundColor: bgc[i],
          display: 'inline-block'
        }}
        key={`svr_${props.index}_${i}`}>
      </div>
    ))}
    <span>{props.auxData}</span>
  </div>)
}