import React, { Component } from 'react';
import Inputs from './Inputs.jsx';
import BeautifyInput from './BeautifyInput.jsx';


export default class InputList extends Component{

  constructor(props) {
    super(props);
  }
  // allType:{0:全不选,1:有选中项，2：全选}
  state = {
    allType:0,
    isCheck:false,
    listData:[
      {id:'001',flag:false},
      {id:'002',flag:false},
      {id:'003',flag:false},
      {id:'004',flag:false},
      {id:'005',flag:false},
      {id:'006',flag:false},
      {id:'007',flag:false},
      {id:'008',flag:false},
      {id:'009',flag:false},
      {id:'010',flag:false},
      {id:'011',flag:false},
      {id:'012',flag:false},
      {id:'013',flag:false},
      {id:'014',flag:false},
      {id:'015',flag:false},
      {id:'016',flag:false}
    ]
  }
  //测试数组的操作
  selectAllChack = (arr) => {
    let oldArr = arr.length;
    let noChackArr = _.filter(arr,{flag:false});
    if(noChackArr.length == 0){
      this.setState({allType:2,isCheck:true});
    }else{
      if(noChackArr.length<oldArr){
        this.setState({allType:1,isCheck:false});
      }else if(noChackArr.length<oldArr){
        this.setState({allType:0,isCheck:false});
      }
    }

  }

  //普通input操作
  optionInput = (id) => {
    // let newArr = _.assign({},this.state.listData);

    let newArr = this.state.listData.slice(0);
    let obj = _.find(newArr,{id:id});
    obj.flag = !obj.flag;

    this.selectAllChack(newArr);

    this.setState({listData:newArr});

  }
  //全选的操作
  setAllInput = () => {
    this.setState({isCheck:!this.state.isCheck});
    let newObj;
    if(this.state.isCheck){
      //这里是取消操作
      newObj = this.setInputListObj(false);
    }else{
      //这里是全选操作
      newObj = this.setInputListObj(true);
    }
    this.setState({listData:newObj});

  }
  //对象操作
  setInputListObj = (bool) => {
    // let newArr = _.assign({},this.state.listData);
    let newArr = this.state.listData.slice(0);
    _.forEach(newArr,(p,k) => {
      p.flag = bool;
    })
    return newArr;
  }

  createInputList = () => {
    let listArr = [];
    _.forEach(this.state.listData,(p,k)=>{
      listArr.push(<Inputs key={k} data={p} optCLick={this.optionInput}/>);
    })
    return listArr;
  }

  render() {
    let datas = this.createInputList();
    return(<div className="twoColumnContainer">
      <div>
        <ul className="AddInputList">{datas}</ul>
        <div><BeautifyInput all={true} isCheck={this.state.isCheck} flag={this.state.allType} allCLick={this.setAllInput}><input type="checkbox" checked={this.state.isCheck}/></BeautifyInput></div>
      </div>
    </div>)
  }
}
