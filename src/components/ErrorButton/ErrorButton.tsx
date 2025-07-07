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
        className="btn absolute bottom-15 right-10"
        onClick={this.handleClick}
      >
        Error Button
      </button>
    );
  }
}

export default ErrorButton;
