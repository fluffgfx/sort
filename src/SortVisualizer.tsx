import * as React from 'react'
import { forEach as asyncForeach } from 'async-foreach'

import { Sorter } from './Sorter'

declare const require
const font = require('../DeterminationSansWeb.woff')

declare var document

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
  auxData: string[]
}

export class SortVisualizer extends React.Component<VisualizerProps, VisualizerState> {
  constructor(props: VisualizerProps) {
    super(props)
    this.populateSorters = this.populateSorters.bind(this)
    this.swapSort = this.swapSort.bind(this)
    this.startSorting = this.startSorting.bind(this)
    this.shuffle = this.shuffle.bind(this)
    const { sorters, data, nya, auxData } = this.populateSorters(0)
    console.log(auxData)
    this.state = { sorters, data, selectedSorter: 0, nya, auxData };
    setTimeout(this.startSorting, 1000)

    // ultimate lazy
    const cssn = document.createElement('style')
    document.body.appendChild(cssn)
    cssn.innerHTML = `@font-face { font-family: 'Determination'; src: url(${font}) format('woff') }`
  }

  populateSorters(n: number) {
    let sorters: Sorter[] = []
    let data: number[][] = []
    let auxData: string[] = []
    let nya: number = Math.random()
    for (let i = 0; i < this.props.rows; i++) {
      let s: Sorter = new this.props.sortAlgorithims[n](this.props.delay, this.props.columns)
      data.push(s.getData())
      auxData.push('')
      s.onUpdate((n) => { if(this.state.nya === nya) this.setState(() => ({
        data: this.state.data.map((x, j) => i !== j ? x : n)
      }))})
      s.onAuxDataUpdate((s) => { if(this.state.nya === nya) this.setState(() => ({
        auxData: this.state.auxData.map((x, j) => i !== j ? x : s)
      }))})
      sorters.push(s)
    }
    return { sorters, auxData, data, nya }
  }

  startSorting() {
    asyncForeach(this.state.sorters, (s) => s.sort())
  }

  shuffle(e) {
    asyncForeach(this.state.sorters, (s) => { s.shuffle(); s.sort() });
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
      <div style={{ position: 'absolute', top: '0', left: '0', width: '100vw', height: '100vh', fontFamily: 'Determination', fontSize: '24px' }}>
        {this.state.data.map((d, i) => (
          <SortVisualizerRow
            data={d}
            index={i}
            key={`svro_${i}`}
            auxData={this.state.auxData[i]}/>))}
        <select value={this.state.selectedSorter} onChange={this.swapSort}>
          {this.props.sortAlgorithims.map((a, i) => (
            <option key={`svopt_${i}`} value={i}>{a.prototype.constructor.realName}</option>
          ))}
        </select>
        <button onClick={this.shuffle}>Shuffle</button>
        <span style={{ position: 'absolute', top: '0', left: '0', padding: '5px 20px', background: 'white' }}>kyle's sort thing</span>
      </div>
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
      height: '200px',
      width: '100%',
      position: 'relative'
    }}>
    {d.map((n, i) => (
      <div
        style={{
          width: `${100/props.data.length}%`,
          height: '200px',
          backgroundColor: bgc[i],
          display: 'inline-block'
        }}
        key={`svr_${props.index}_${i}`}>
      </div>
    ))}
    <span
      style={{
        position: 'absolute',
        right: '0',
        bottom: '0',
        textAlign: 'right',
        backgroundColor: 'white',
        padding: '5px 20px'
      }}>{props.auxData}</span>
  </div>)
}