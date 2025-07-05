import React from 'react';

type ErrorButtonState = {
  shouldThrow: boolean;
};

class ErrorButton extends React.Component<unknown, ErrorButtonState> {
  state: ErrorButtonState = {
    shouldThrow: false,
  };

  handleClick = () => {
    this.setState({ shouldThrow: true });
  };

  render() {
    if (this.state.shouldThrow) {
      throw new Error('Test error from button!');
    }

    return (
      <button
        className="bg-violet-500 text-black p-1 rounded"
        onClick={this.handleClick}
      >
        Error Button
      </button>
    );
  }
}

export default ErrorButton;
