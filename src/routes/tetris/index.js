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

        return <div className={styles.tetris}>
          <Screen {...tetris} />
          <Controller />
        </div>;
    }
}

Tetris.propTypes = {};

export default connect(({ tetris }) => ({ tetris }))(Tetris);
