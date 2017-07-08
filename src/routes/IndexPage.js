import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router'
import styles from './IndexPage.css';

function IndexPage({ dispatch }) {

  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <div><Link to="home">home</Link></div>
      <div><Link to="tetris">tetris</Link></div>
      <div><Link to="products">products</Link></div>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
