import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Tetris from './routes/tetris/index';
import Products from './routes/Products';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} >
      </Route>
      <Route path="tetris" component={Tetris} />
      <Route path="products" component={Products} />
    </Router>
  );
}

export default RouterConfig;
