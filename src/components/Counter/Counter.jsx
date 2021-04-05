import './Counter.css';
import React from 'react';
import Controls from './Controls';
import Value from './value';

class Counter extends React.Component {
  //   constructor() {
  //     super();
  //     this.state = {
  //       value: 0,
  //     };
  //   }

  static defaultProps = {
    initialValue: 0,
  };

  // eslint-disable-next-line react/no-typos
  static propTypes = {
    //
  };

  state = { value: this.props.initialValue };

  handleIncrement = () => {
    this.setState(prevstate => ({
      value: prevstate.value + 1,
    }));
  };

  handleDecrement = () => {
    this.setState(prevstate => ({
      value: prevstate.value - 1,
    }));
  };

  render() {
    const { value } = this.state;
    return (
      <div className="Counter">
        <Value value={value} />
        <Controls
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
        />
      </div>
    );
  }
}
export default Counter;
