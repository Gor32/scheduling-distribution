import React, { Component } from 'react'
import { PARAMS, VALUES, INPUT_PRAMS } from './norms.constants.js'
import Fetcher from '../../lib/api'

class InputNorms extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inputKey: props.inputKey,
      defaultValue: props.defaultValue,
      title: props.title,
      onSelect: props.onSelect,
      placeholder: props.placeholder,
      paramValue: props.paramValue
    }
  }

  render () {
    return (
      <tr key={this.state.inputKey.toString() + 'tr'}>
        <th>
          <span>{this.state.paramValue}</span>
        </th>

        <th>
          <input key={this.state.inputKey}
                 defaultValue={this.state.defaultValue}
                 onSelect={this.state.onSelect}
                 title={this.state.title}
                 placeholder={this.state.placeholder}/>
        </th>
      </tr>
    )
  }
}

class Norms extends Component {
  constructor (props) {
    super(props)
    const inputValues = Object.keys(INPUT_PRAMS).map(function (key) {
      return INPUT_PRAMS[key]
    })
    this.state = {
      values: {...VALUES},
      inputValues: inputValues
    }
    this.getParams()
  }

  getParams = () => {
//    Fetcher.params.initParamsRow()
    Fetcher.params.getParamsRow()
      .then(res => res.json())
      .then(res => {
        const values = this.state.values
        res.forEach(r => {
          values[r.code] = r.value
        })
        this.setState({values})
        console.log(values)
      })
  }

  handledTextChange = param => {
    return (e) => {
      const values = this.state.values
      values[param] = e.target.value
      this.setState({values})
      console.log(values)
    }
  }

  saveParams = () => {
    console.log('save me clicked', this.state.values)
    Fetcher.params.setParamsRow(this.state.values)
  }

  render () {
    return (
      <div style={{textAlign: 'rigth'}}>
        <button onClick={this.saveParams}
                style={{
                  position: 'fixed',
                  bottom: '0px',
                  right: '0px'
                }}
        >Պահպանել փոփոխությունը
        </button>
        <table style={{
          textAlign: 'left',
          width: '100%',
          marginLeft: 100,
          overflow: 'scroll',

        }}>
          <thead>
          <tr>
            <th>Պարամետր</th>
            <th>Պարամետրի արժեք</th>
          </tr>
          </thead>
          <tbody>
          {
            this.state.inputValues.map(r => (
              new InputNorms({
                inputKey: r.inputKey,
                defaultValue: this.state.values[r.inputKey],
                onSelect: this.handledTextChange(r.inputKey),
                title: r.title,
                placeholder: r.placeholder,
                paramValue: r.paramValue
              }).render()
            ))
          }
          </tbody>
        </table>
      </div>
    )
  }
}

export default Norms
