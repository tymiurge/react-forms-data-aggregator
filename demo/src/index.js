import React, {Component} from 'react'
import {render} from 'react-dom'
import formHoc, {Field, Submitter } from './../src'



class Demo extends Component {
  render() {
    return <div>
      <h1>react-forms-data-aggregator Demo</h1>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
