import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './IndexPage.less';

function IndexPage({ dispatch }) {
  return (
    <div className={styles.container}>
      <div className={styles.normal}>
        <h1 className={styles.title}>欢迎参观陈因为的玩具屋
          <span className={styles.rotate}>～</span>
        </h1>
        <div className={styles.welcome} />
        <div className={styles.list}><Link to="tetris">俄罗斯方块</Link></div>
      </div>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
