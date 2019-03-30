import React, { Component } from 'react'

export default class GroupRowInnerRendererForClassifiers extends Component {
  constructor (props) {
    super(props)

    props.reactContainer.style.display = 'inline-block'

    const node = props.node
    this.state = {
      nodeKey: node.key
    }
  }

  render () {
    return (
      <div style={{display: 'inline-block'}}>
        <span className="groupTitle"> Դասսիչ: {this.state.nodeKey}</span>
      </div>
    )
  }
};
