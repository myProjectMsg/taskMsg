import React,{ Component } from 'react';

export default class BeautifyInput extends Component{
  constructor(props) {
    super(props)
  }

  state = {
    type:'',
    isCheck:''
  }

  componentWillMount() {
    let check;
    if(this.props.all){
      //这里是全选
      switch(this.props.flag){
        case 0:
        check = false;
        break;
        case 1:
        check = false;
        break;
        case 2:
        check = true;
        break;
      }
      this.setState({type:'all',isCheck:this.props.isCheck});
    }else{
      //这里不是全选
      this.setState({type:'only'})
    }
  }

  //判断需要美化的input类型
  selectInputType = (type) => {
    let newEle;
    if(this.state.type=='all'){
      // newEle = <span className={this.props.isCheck?'simulation checkArea active':'simulation checkArea'} onClick={this.handleAllChange}></span>
      newEle = <span className={this.props.flag==1?'simulation checkArea markEle':this.props.isCheck?'simulation checkArea active':'simulation checkArea'} onClick={this.handleAllChange}></span>
    }else{
      switch(type){
        case 'checkbox':
        newEle = <span className={this.props.flag?'simulation checkArea active':'simulation checkArea'} onClick={this.handleChange}></span>
        break;
        case 'radio':
        newEle = <span className={this.props.flag?'simulation checkArea active':'simulation checkArea'} onClick={this.handleChange}></span>
        break;
      }
    }
    return newEle;
  }
  //单选
  handleChange = () => {
    let id = this.props.id;
    this.props.optClick(id);
  }
  //全选
  handleAllChange = () => {
    this.props.allCLick();
  }
  render() {
    let { type } = this.props.children.props;
    let Element = this.selectInputType(type);
    return(
      <span className="packing">
        {this.props.children}
        {Element}
      </span>
    )
  }
}
