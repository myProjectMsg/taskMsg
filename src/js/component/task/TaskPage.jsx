import React,{ Component } from 'react';
import { Link, IndexLink } from 'react-router';
//日历组件
import AddCalendar from './AddCalendar.jsx';
import _ from 'lodash';

const taskData = [
  {id:1,name:'所有任务'},
  {id:2,name:'录入任务'},
  {id:3,name:'SDV任务'},
  {id:4,name:'核查任务'},
  {id:5,name:'签名任务'},
  {id:6,name:'锁定任务'},
  {id:7,name:'双录任务'},
]

export default class TaskPage extends Component{
  constructor(props) {
    super(props)
  }

  state = {
    optDate:'',
    activeDay:''
  }

  //获取点击日期
  getTodayDate = (date) => {
    this.setState({optDate:date})
  }
  //获取操作日期（天）用于判断是否有获取天的操作，及本月是否有这一天
  getOptDay = (day) => {
    this.setState({activeDay:day})
  }

  render(){
    console.log(this.state.optDate);
    console.log(this.state.activeDay);
    return(<div className="taskCore">
      <div className="dateNav">
        <div className="pageName">
          <Link to="/">返回</Link>
          <span>任务中心</span>
        </div>
        {/* <AddCalendar today={this.state.optDate?new Date(this.state.optDate):''} getDate={this.getTodayDate}/> */}
        <AddCalendar today={this.state.optDate} active={this.state.activeDay} getDate={this.getTodayDate} activeOpt={this.getOptDay}/>
        <div className="taskTypeNav">
          <TaskList listData={taskData}/>
          <div className="divisionLine"></div>
          <div className="questionTask">
            <Link to="/taskClass" params={{id: 8}} activeClassName="active">质疑任务</Link>
          </div>
        </div>
      </div>
      <div className="taskShowArea">
        {this.props.children}
      </div>
    </div>)
  }
}
//二级导航组件
class TaskList extends Component{
  constructor(props) {
    super(props);
    this.list = [];
  }
  static propTypes = {
        listData:React.PropTypes.array
  };
  componentWillMount() {
    _.forEach(this.props.listData,(p,k)=>{
      this.list.push(<li key={k}><Link to={`task/taskClass/${p.id}`} activeClassName="active">{p.name}</Link></li>)
    })
  }
  render() {
    return(
      <ul className="taskClassList">
        {this.list}
      </ul>
    )
  }
}
