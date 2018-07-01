import React from 'react';
import Routes from '../config/router.jsx'
import {
  Link,
} from 'react-router-dom'

class App extends React.Component{

  componentDidMount(){

  }

  render(){
      return [
        <div key="banner">
          <Link to="/">首页</Link>
          <br />
          <Link to="/detail">详情页</Link>
        </div>,
        <Routes key="route" />,
      ]
  }
}

export default App
