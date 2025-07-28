import { Component } from 'react';

type ErrorButtonState = {
  shouldThrow: boolean;
};
type ErrorButtonProps = unknown;

class ErrorButton extends Component<ErrorButtonProps> {
  state: ErrorButtonState = {
    shouldThrow: false,
  };

  render() {
    if (this.state.shouldThrow) {
      throw new Error('Test error from button!');
    }

    return (
      <button
        className="btn absolute top-5 right-5"
        onClick={() => {
          this.setState({ shouldThrow: true });
        }}
      >
        Error
      </button>
    );
  }
}

export default ErrorButton;
