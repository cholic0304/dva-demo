import React, {Component, PropTypes} from 'react';
import { Icon } from 'antd';
import styles from './index.less';

class Screen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    const { screen, score, level, lines } = this.props;
    const pixels = screen.map((line, rowIndex) => {
      return <div className={styles.line} key={rowIndex}>
        {
          line.map((item, index) => {
            return <div className={styles.cell} key={index}>
              <div></div>
            </div>;
          })
        }
      </div>
    });
    return <div className={styles.screen}>
      <div className={styles.mainArea}>{pixels}</div>
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <div className={styles.tag}>得分：</div>
          <div className={styles.value}>{score}</div>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.tag}>消除行：</div>
          <div className={styles.value}>{lines}</div>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.tag}>级别：</div>
          <div className={styles.value}>{level}</div>
        </div>
      </div>
    </div>
  }
}

export default Screen;
