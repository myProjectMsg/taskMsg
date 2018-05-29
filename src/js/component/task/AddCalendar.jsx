import React, { Component } from 'react';

export default class AddCalendar extends Component{
  constructor(props) {
    super(props);
  }
  static propTypes = {
    //操作日期（初始化时传递空字符串）
    today:React.PropTypes.string.isRequired,
    //具体操作的天（初始化时传递空字符串）
    active:React.PropTypes.string.isRequired,
    //将具体操作日期传递给父组件
    getDate:React.PropTypes.func.isRequired,
    //将具体操作天传递给父组件用于判断当月是否有这一天
    activeOpt:React.PropTypes.func.isRequired,
  }

  state = {
    today:'',
    optDay:'',
    startYear:'',
    openYear:false,
    startMonth:'',
    openMonth:false
  }

  componentWillMount() {
    let that = this;
    this.setState({today:this.props.today,optDay:this.props.active});
  }

  componentWillReceiveProps(nextProps){
    if(nextProps){
      this.setState({today:nextProps.today,optDay:nextProps.active});
    }
  }

  //判断是否是闰年
  leapYear = (year) =>{
    if(year%400 === 0 || (year%4 === 0 && year%100 !== 0) ) {
        return true;
    }else {
      return false;
    }
  }
  //获取总天数
  getAllDayCount = (year,month,allDay) => {
    for(let i=1;i<month;i++){
      switch (i) {
          case 1: allDay += 31; break;
          case 2:
              if(this.leapYear(year)) {
                allDay += 29;
              }else{
                allDay += 28;
              }
              break;
          case 3: allDay += 31; break;
          case 4: allDay += 30; break;
          case 5: allDay += 31; break;
          case 6: allDay += 30; break;
          case 7: allDay += 31; break;
          case 8: allDay += 31; break;
          case 9: allDay += 30; break;
          case 10: allDay += 31; break;
          case 11: allDay += 30; break;
          case 12: allDay += 31; break;
      }
    }
    return allDay;
  }
  //获取每月的天数
  getMonthDay = (year,month) => {
    let monthDay=0;
    switch(month) {
        case 1: monthDay = 31; break;
        case 2:
            if(this.leapYear(year)){
               monthDay = 29;
             }else{
               monthDay = 28;
             }
            break;
        case 3: monthDay = 31; break;
        case 4: monthDay = 30; break;
        case 5: monthDay = 31; break;
        case 6: monthDay = 30; break;
        case 7: monthDay = 31; break;
        case 8: monthDay = 31; break;
        case 9: monthDay = 30; break;
        case 10: monthDay = 31; break;
        case 11: monthDay = 30; break;
        case 12: monthDay = 31; break;
    }
    return monthDay;
  }
  //判断1号是星期几
  getFirstDay = (year,month) => {
    let allDay = 0;
    let y = year-1;
    allDay = y + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400) + 1;
    let dayCount = this.getAllDayCount(year,month,allDay)
    return dayCount%7;
  }
  //生成星期列表
  setWeekList = () => {
    let weekArr = [];
    let restDay;
    let week;
    for(var i=1;i<=7;i++){
      switch(i){
        case 1:
        week = '一';
        restDay = <span key={i}>{week}</span>
        break;
        case 2:
        week = '二';
        restDay = <span key={i}>{week}</span>
        break;
        case 3:
        week = '三';
        restDay = <span key={i}>{week}</span>
        break;
        case 4:
        week = '四';
        restDay = <span key={i}>{week}</span>
        break;
        case 5:
        week = '五';
        restDay = <span key={i}>{week}</span>
        break;
        case 6:
        week = '六';
        restDay = <span key={i} className="restDay">{week}</span>
        break;
        case 7:
        week = '日';
        restDay = <span key={i} className="restDay">{week}</span>
        break;
      }
      weekArr.push(restDay);
    }
    return weekArr;
  }

  //创建日历节点
  ceaterElement = (year,month,firstDay,monthArr,day) => {
    let myCalendar = <div className="calendarOuter">
      <div className="title">
        <a href="javascript:;" className="prev" onClick={this.prevOrNextMonth.bind(this,year,month,day,'prev')}>前</a>
        <a href="javascript:;" className="next" onClick={this.prevOrNextMonth.bind(this,year,month,day,'next')}>后</a>
        <div className="yearMonth" data-day={day}>
          <a href="javascript:;" onClick={this.openYearArea}>{year}年</a>
          <a href="javascript:;" onClick={this.openMonthArea}>{month}月</a>
        </div>
      </div>
      <div className="calendarData">
        <div className="weekList">{this.setWeekList()}</div>
        <ul className="dayList">
          {monthArr}
        </ul>
      </div>
    </div>
    return myCalendar;
  }
  //生成日历
  ceaterCalendar = (date) => {
    let today = date==''? new Date():new Date(date);
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    let monthArr=[];
    //第一天是周几
    let firstDay = this.getFirstDay(year,month);
    //获取当月的天数
    let monthDay = this.getMonthDay(year,month);
    if(firstDay==0){
      firstDay=7
    }
    for(let i=1;i<firstDay;i++){
      monthArr.push(<li key={`before-${i}`}></li>);
    }
    for(let i=1;i<=monthDay;i++){
      let todayWeek = new Date(year+'-'+month+'-'+i).getDay();
      let flagWeek;
      if(todayWeek==0){
        flagWeek = '日'
      }else{
        flagWeek = todayWeek;
      }
      if(year === today.getFullYear() && month === today.getMonth()+1 && i === today.getDate()) {
        //当日的日期  this.state.optDay?'active sameDay':'sameDay'
        monthArr.push(<li key={`month-${i}`} className={(todayWeek==6||todayWeek==0)?'restDay':''} data-day={flagWeek}><a href="javascript:;" className={this.state.optDay?'active sameDay':'sameDay'} onClick={this.selectDate.bind(this,year,month,i)}>{i}</a></li>);
      }else if(year < today.getFullYear() || (year === today.getFullYear() && month <= today.getMonth()) || (year === today.getFullYear() && month === today.getMonth()+1 && i < today.getDate()) ) {
        //当天之前的日期
        monthArr.push(<li key={`month-${i}`} className={(todayWeek==6||todayWeek==0)?'restDay':''} data-day={flagWeek}><a href="javascript:;" className="beforeDay" onClick={this.selectDate.bind(this,year,month,i)}>{i}</a></li>);
      }else{
        //普通日期
        monthArr.push(<li key={`month-${i}`} className={(todayWeek==6||todayWeek==0)?'restDay':''} data-day={flagWeek}><a href="javascript:;" className="ordinaryDay" onClick={this.selectDate.bind(this,year,month,i)}>{i}</a></li>);
      }
    }
    let myCalendar = this.ceaterElement(year,month,firstDay,monthArr,day);
    return myCalendar;
  }

  //选择日期
  selectDate(year,month,day) {
    this.props.getDate(year+'-'+month+'-'+day);
    this.props.activeOpt(day+'');
  }
  //选择前一个月or选择后一个月
  prevOrNextMonth(year,month,day,direction) {
    switch(direction){
      case 'prev':
      //前一个月
      month = month-1;
      if(month>=1){
        this.props.getDate(year+'-'+(month)+'-'+day);
      }else{
        month = 12;
        this.props.getDate((year-1)+'-'+(month)+'-'+day);
      }
      break;
      case 'next':
      month = month+1;
      //后一个月
      if(month>12){
        month = 1;
        this.props.getDate((year+1)+'-'+(month)+'-'+day);
      }else{
        this.props.getDate(year+'-'+(month)+'-'+day);
      }
      break;
    }
  }

  //关闭年或者月选择
  closeYearDiv = () => {
    this.setState({openYear:false})
  }
  closeMonthDiv = () => {
    this.setState({openMonth:false})
  }
  //打开年月选择
  openYearArea = () =>{
    this.setState({openYear:true})
  }
  openMonthArea = () =>{
    this.setState({openMonth:true})
  }
  //设置开始年
  setStartYear = (start) => {
    this.setState({startYear:start})
  }

  render() {
    return(
      <div className="myCalendar">
        {this.ceaterCalendar(this.state.today)}
        {this.state.openYear?<SelectYear date={this.state.today} getDate={this.props.getDate} start={this.state.startYear} setStart={this.setStartYear} close={this.closeYearDiv}/>:''}
        {this.state.openMonth?<SelectMonth date={this.state.today}  getDate={this.props.getDate} close={this.closeMonthDiv}/>:''}
      </div>
    )
  }
}

class SelectYear extends Component{
  constructor(props){
    super(props);
  }
  state = {
    year:'',
    endYear:'',
    month:'',
    day:''
  }
  componentWillMount() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    this.setState({year:year,endYear:year+11,month:month,day:day})
    this.props.setStart(year);
  }
  componentWillUnmount() {
    this.props.setStart('');
  }
  //这是年选择列表
  setYearSelectList = () => {
    let yearArr=[];
    let start = this.props.start?this.props.start:this.state.year;
    let end = this.props.start?(this.props.start+11):this.state.endYear;
    for( let i = start;i<=end;i++){
      yearArr.push(<li key={i}><a href="javascript:;" onClick={this.goSetYear.bind(this,i)}>{i}</a></li>);
    }
    return yearArr;
  }
  //选择年
  goSetYear(year) {
    this.props.getDate(year+'-'+this.state.month+'-'+this.state.day);
    this.props.close();
  }
  //向前向后12年
  goPrevYear = () => {
    this.props.setStart(this.props.start-11);
  }
  goNextYear = () => {
    this.props.setStart(this.props.start+11);
  }
  //这是年选择
  render() {
    return(
      <div className="calendarOuter goYear">
        <div className="title">
          <a href="javascript:;" className="prev" onClick={this.goPrevYear}>前</a>
          <a href="javascript:;" className="next" onClick={this.goNextYear}>后</a>
          <div className="yearMonth">
            <a href="javascript:;">{this.props.start?this.props.start:this.state.year}--{this.props.start?this.props.start+11:this.state.endYear}年</a>
          </div>
        </div>
        <div className="calendarData">
          <ul className="yearList">
            {this.setYearSelectList()}
          </ul>
        </div>
      </div>
    )
  }
}

class SelectMonth extends Component{
  constructor(props){
    super(props);
  }
  render() {
    return(
      <div className="calendarOuter goMonth">
        <div className="title">
          <a href="javascript:;" className="prev">前</a>
          <a href="javascript:;" className="next">后</a>
          <div className="yearMonth" data-day={day}>
            <a href="javascript:;">{year}年</a>
          </div>
        </div>
        <div className="calendarData">
          <ul className="dayList">
            <li>2222</li>
          </ul>
        </div>
      </div>
    )
  }
}
