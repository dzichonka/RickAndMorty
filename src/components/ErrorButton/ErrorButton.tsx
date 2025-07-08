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
      <button className="btn absolute top-5 right-5" onClick={this.handleClick}>
        Error
      </button>
    );
  }
}

export default ErrorButton;
