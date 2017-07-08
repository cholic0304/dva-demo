import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import { Button, Icon } from 'antd';
import 'antd/dist/antd.css';
import styles from './index.less';

class Tetris extends React.Component {
    render() {
        const {dispatch, tetris} = this.props;
        debugger;

        return <div className={styles.tetris}>

        </div>;
    }
}

Tetris.propTypes = {};

export default connect(({tetris}) => ({tetris}))(Tetris);
