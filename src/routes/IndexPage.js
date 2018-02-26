import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './IndexPage.less';
import Clock from '../components/Timer';

function IndexPage({ dispatch }) {
  return (
    <div className={styles.container}>
      <div className={styles.normal}>
        <h1 className={styles.title}>欢迎参观陈因为的玩具屋
          <span className={styles.rotate}>～</span>
        </h1>
        <Clock />
        <div className={styles.welcome} />
        <div className={styles.list}>
          <div className={styles.item}><Link to="tetris">俄罗斯<br></br>方块</Link></div>
          <div className={styles.item}><Link to="tetris">俄罗斯<br></br>方块</Link></div>
          <div className={styles.item}><Link to="tetris">俄罗斯<br></br>方块</Link></div>
        </div>
      </div>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
