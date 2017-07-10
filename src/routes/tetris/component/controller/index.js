import React, { Component, PropTypes } from 'react';
import { Button, Icon } from 'antd';
import styles from './index.less';

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    const { start, restart, up, down, left, right, actionA, actionB } = this.props;

    return <div className={styles.controller}>
      <div className={styles.leftArea}>
        <div className={styles.buttons}>
          <div className={styles.up}><Button icon="caret-up" /></div>
          <div className={styles.left}><Button icon="caret-left" /></div>
          <div className={styles.right}><Button icon="caret-right" /></div>
          <div className={styles.down}><Button icon="caret-down" /></div>
        </div>
      </div>
      <div className={styles.rightArea}>
        <div className={styles.extraArea}>
          <div className={styles.start}>
            <div>开始/暂停</div>
            <Button onClick={start} />
          </div>
          <div className={styles.restart}>
            <div>重置</div>
            <Button />
          </div>
        </div>
        <div className={styles.buttons}>
          <div className={styles.actionA}><Button >A</Button></div>
          <div className={styles.actionB}><Button >B</Button></div>
        </div>
      </div>
    </div>
  }
}

export default Controller;
