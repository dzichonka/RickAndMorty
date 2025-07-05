import React from 'react';

type ThrowErrorButtonState = {
  shouldThrow: boolean;
};

class ThrowErrorButton extends React.Component<unknown, ThrowErrorButtonState> {
  state: ThrowErrorButtonState = {
    shouldThrow: false,
  };

  handleClick = () => {
    this.setState({ shouldThrow: true });
  };

  render() {
    if (this.state.shouldThrow) {
      throw new Error('Test error from button!');
    }

    return <button onClick={this.handleClick}>Throw Error</button>;
  }
}

export default ThrowErrorButton;
