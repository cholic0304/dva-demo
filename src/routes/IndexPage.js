import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router'
import styles from './IndexPage.css';

function IndexPage({ dispatch }) {

  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>欢迎参观陈因为的玩具屋～</h1>
      <div className={styles.welcome} />
      <div><Link to="tetris">俄罗斯方块</Link></div>
      {/*<div><Link to="products">products</Link></div>*/}
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
