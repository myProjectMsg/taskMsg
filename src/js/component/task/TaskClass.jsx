import React,{ Component } from 'react';

export default class TaskClass extends Component{
  constructor(props) {
    super(props);
  }
  componentWillMount() {

  }
  render() {
    return(<div style={{backgroundColor:'red'}}>测试{this.props.params.id}</div>);
  }
}
