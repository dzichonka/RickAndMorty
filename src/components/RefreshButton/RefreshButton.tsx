import React from 'react';

type RefreshButtonProps = {
  onClick?: () => void;
};
class RefreshButton extends React.Component<RefreshButtonProps> {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  render() {
    return (
      <button className="btn" onClick={this.handleClick}>
        Fix it!
      </button>
    );
  }
}

export default RefreshButton;
