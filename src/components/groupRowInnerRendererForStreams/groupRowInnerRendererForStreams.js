import React, { Component } from 'react'

export default class GroupRowInnerRendererForStreams extends Component {
  constructor (props) {
    super(props)

    props.reactContainer.style.display = 'inline-block'

    const node = props.node
    const aggData = node.aggData
    this.state = {
      nodeKey: node.key,
      groupCount: aggData.group,
      numberOfStudents: aggData.numberOfStudents,
    }
  }

  render () {
    return (
      <div style={{display: 'inline-block'}}>
        <span className="groupTitle"> Flow: {this.state.nodeKey}</span>
        <span className="medal gold"> Groups count: {this.state.groupCount}</span>
        <span className="medal silver"> Number of students in flow: {this.state.numberOfStudents}</span>
      </div>
    )
  }
};
