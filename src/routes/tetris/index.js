import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import 'antd/dist/antd.css';
import styles from './index.less';
import Screen from './component/screen';
import Controller from './component/controller';

class Tetris extends React.Component {
    render() {
        const {dispatch, tetris} = this.props;
        const { screen } = tetris;
        let interval = () => {
          dispatch({
            type: 'tetris/moveShape',
            payload: {
              move: { x: 0, y: 1 },
            },
          });
          dispatch({
            type: 'tetris/fixShape',
            payload: {},
          });
        };

        const buttonHandle = {
          start: () => {
            dispatch({
              type: 'tetris/createShape',
              payload: {},
            });
            dispatch({
              type: 'tetris/createShape',
              payload: {},
            });
            dispatch({
              type: 'tetris/startGame',
              payload: {},
            });
            setInterval(interval, 1000);
          },
          restart: () => {},
          up: () => {},
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
          actionA: () => {},
          actionB: () => {},
        };

        return <div className={styles.tetris}>
          <Screen {...tetris} />
          <Controller {...buttonHandle} />
        </div>;
    }
}

Tetris.propTypes = {};

export default connect(({ tetris }) => ({ tetris }))(Tetris);
