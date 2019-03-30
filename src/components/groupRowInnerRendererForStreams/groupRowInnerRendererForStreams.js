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
        <span className="groupTitle"> Հոսք: {this.state.nodeKey}</span>
        <span className="medal gold"> Խմբերի քանակը: {this.state.groupCount}</span>
        <span className="medal silver"> Հոսքում ուսանողների քանակը: {this.state.numberOfStudents}</span>
      </div>
    )
  }
};
