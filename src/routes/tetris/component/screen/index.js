import React, {Component, PropTypes} from 'react';
import { Icon } from 'antd';
import styles from './index.less';

class Screen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    // 当有新的查询结果时刷新并提醒
    if (this.props.level !== nextProps.level) {
      this.props.setRefresh(nextProps.level);
    }
  }

  render() {
    const { screen, score, level, lines, nextShape, next } = this.props;

    const initScreen = (screen) => {
      const pixels = screen.map((line, rowIndex) => {
        return <div className={styles.line} key={rowIndex}>
          {
            line.map((item, index) => {
              return <div className={(item.filled ? (styles.cell + ' ' + styles.cellFilled) : styles.cell)} key={index}>
                <div></div>
              </div>;
            })
          }
        </div>
      });
      return pixels;
    };
    const pixels = initScreen(screen);
    const nextPixels = initScreen(next);

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
        <div className={styles.infoItem}>
          <div className={styles.tag}>下一个：</div>
          <div className={styles.value}>{nextPixels}</div>
        </div>
      </div>
    </div>
  }
}

export default Screen;
