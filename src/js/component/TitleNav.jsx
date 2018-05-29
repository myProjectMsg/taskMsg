import React,{ Component } from 'react';
import { Link, IndexLink } from 'react-router';
//颜色配置文件
import Config from '../Config.jsx';

export default class TitleNav extends Component{
  render() {
    return(
      <div className={`catalogArea ${Config}-bgColor`}>
        <div className="userMsg">多梳发乱卡计算的发阿斯顿</div>
        <nav className="catalog">
          <ul>
            <li><IndexLink to="/" activeClassName="active">欢迎</IndexLink></li>
            <li><Link to="task" activeClassName="active">任务</Link></li>
            <li><Link to="inputList" activeClassName="active">选择</Link></li>
          </ul>
        </nav>
      </div>
    )
  }
}
