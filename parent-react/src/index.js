import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import { registerMicroApps, start } from 'qiankun';
import './index.css';
import App from './App';

const app = [
  {
    name: 'childApp',
    // 默认会加载这个html，解析里面的js动态地执行脚本（子应用必须支持跨域）
    entry: '//localhost:3001', // 指定子应用的html地址（后自动分析html的script标签）
    container: '#childApp', // 指定容器id，将子应用插入其中
    activeRule: '/childApp', // 激活路径
  },
];

registerMicroApps(app); // 注册应用
start({
  prefetch: false, // 取消预加载
}); // 开启

ReactDOM.render(
  <React.StrictMode>
    <Router>
      {/* 基座中可以放自己的路由 */}
      <Link to='/'>基座应用App</Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      {/* 应用其他子路由 */}
      <Link to='/childApp'>childApp</Link>
      <Routes>
        <Route exact path='/' element={<App />}></Route>
        <Route
          exact
          path='/childApp'
          element={<div id='childApp'></div>}
        ></Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
