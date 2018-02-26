import React from 'react';
import styles from './index.less';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div className={styles.clock}>
        <p>现在是 <span className={styles.time}>{this.state.date.toLocaleTimeString()}</span></p>
      </div>
    );
  }
}

Clock.propTypes = {};

export default Clock;
