import React,{ Component } from 'react';
import BeautifyInput from './BeautifyInput.jsx';

export default class Inputs extends Component{
  constructor(props){
    super(props)
  }
  render() {
    let { id, flag } = this.props.data;
    return (
      <li key={id} data-id={id}>
        <BeautifyInput all={false} id={id} flag={flag} optClick={this.props.optCLick}>
          <input type="checkbox" checked={flag}/>
        </BeautifyInput>
        <span>测试</span>
      </li>
    )
  }
}
