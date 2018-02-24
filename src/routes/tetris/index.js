import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import 'antd/dist/antd.css';
import styles from './index.less';
import Screen from './component/screen';
import Controller from './component/controller';

class Tetris extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastLevel: 1,
    };
  }

  render() {
    const { dispatch, tetris } = this.props;
    const { screen, interval, status, level } = tetris;

    const intervalFun = function (time, lastLevel) {
      return () => {
        dispatch({
          type: 'tetris/moveShape',
          payload: {
            move: { x: 0, y: 1 },
          },
        });
        setTimeout(() => {
          dispatch({
            type: 'tetris/fixShape',
            payload: {},
          });
        }, time / 5);
      };
    };
    const setRefresh = (level) => {
      clearInterval(interval);
      const time = 1000 / level;
      return setInterval(intervalFun(time, level), time);
    };
    tetris.setRefresh = setRefresh;

    const buttonHandle = {
      start: () => {
        if (status === 'init') {
          dispatch({
            type: 'tetris/createShape',
            payload: {},
          });
          dispatch({
            type: 'tetris/createShape',
            payload: {},
          });
          dispatch({
            type: 'tetris/setInterval',
            payload: setRefresh(level),
          });
          dispatch({
            type: 'tetris/changeStatus',
            payload: { status: 'start' },
          });
        } else if (status === 'start') {
          clearInterval(interval);
          dispatch({
            type: 'tetris/changeStatus',
            payload: { status: 'pause' },
          });
        } else if (status === 'pause') {
          dispatch({
            type: 'tetris/setInterval',
            payload: setRefresh(level),
          });
          dispatch({
            type: 'tetris/changeStatus',
            payload: { status: 'start' },
          });
        }
      },
      restart: () => {
        dispatch({
          type: 'tetris/initGame',
          payload: true,
        });
      },
      up: () => {
        dispatch({
          type: 'tetris/moveShape',
          payload: {
            rotate: 1,
          },
        });
      },
      down: () => {
        dispatch({
          type: 'tetris/moveShape',
          payload: {
            move: { x: 0, y: 1 },
          },
        });
      },
      left: () => {
        dispatch({
          type: 'tetris/moveShape',
          payload: {
            move: { x: -1, y: 0 },
          },
        });
      },
      right: () => {
        dispatch({
          type: 'tetris/moveShape',
          payload: {
            move: { x: 1, y: 0 },
          },
        });
      },
      actionA: () => {
        dispatch({
          type: 'tetris/moveShape',
          payload: {
            rotate: 1,
          },
        });
      },
      actionB: () => {
        dispatch({
          type: 'tetris/moveShape',
          payload: {
            rotate: -1,
          },
        });
      },
    };

    return (
      <div className={styles.tetris}>
        <Screen {...tetris} />
        <Controller {...buttonHandle} />
      </div>
    );
  }
}

Tetris.propTypes = {};

export default connect(({ tetris }) => ({ tetris }))(Tetris);
