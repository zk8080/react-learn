import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'


@inject('appState')
@observer
export default class TopicList extends Component {
  constructor(props){
    super(props)
  }
  changeName = (e) => {
    this.props.appState.changeName( e.target.value )
  }
  render() {
    return (
      <div>
        <input type="text" onChange={this.changeName}/>
        <span>{this.props.appState.msg}</span>
      </div>
    )
  }
};
