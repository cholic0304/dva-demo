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
          // dispatch({
          //   type: 'tetris/moveShape',
          //   payload: {
          //     move: { x: 0, y: 1 },
          //   },
          // });
          dispatch({
            type: 'tetris/fixShape',
            payload: {},
          });
        };

        const buttonHandle = {
          start: () => {
            dispatch({
              type: 'tetris/startGame',
              payload: {},
            });
          },
          restart: () => {},
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

        return <div className={styles.tetris}>
          <Screen {...tetris} />
          <Controller {...buttonHandle} />
        </div>;
    }
}

Tetris.propTypes = {};

export default connect(({ tetris }) => ({ tetris }))(Tetris);
