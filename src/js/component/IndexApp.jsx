import React,{ Component } from 'react';
import { Router, Route, browserHistory,hashHistory,Link,IndexRoute} from 'react-router';
import TitleNav from './TitleNav.jsx';

export default class IndexApp extends Component{
  render() {
    return(
      <div className="globalPage">
        <TitleNav/>
        <div className="contentArea">{this.props.children}</div>
      </div>
    )
  }
}
