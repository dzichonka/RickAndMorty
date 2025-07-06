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
      <div className="section flex justify-end">
        <button className="btn" onClick={this.handleClick}>
          Error Button
        </button>
      </div>
    );
  }
}

export default ErrorButton;
