import React,{ Component } from 'react';
import { Router, Route, browserHistory,hashHistory,Link,IndexRoute} from 'react-router';
import {render} from 'react-dom'
import {createStore,applyMiddleware,compose} from 'redux'
import {Provider} from 'react-redux'
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import '../css/taskMain.css';
import IndexApp from './component/IndexApp.jsx';
import TaskPage from './component/task/TaskPage.jsx';
import Home from './component/Home.jsx';
import TaskClass from './component/task/TaskClass.jsx';
import InputList from './component/tools/InputList.jsx';
render(<Provider>
  <Router history={hashHistory}>
      <Route path="/" component={IndexApp}>
        <IndexRoute component={Home} />
        <Route path="task" component={TaskPage}>
          <Route path="taskClass/:id" component={TaskClass}></Route>
        </Route>
        <Route path="inputList" component={InputList}></Route>
      </Route>
    </Router>
</Provider>,document.getElementById('root'));
