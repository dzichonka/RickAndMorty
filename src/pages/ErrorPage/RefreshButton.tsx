import React from 'react';

class RefreshButton extends React.Component {
  handleClick = () => {
    window.location.reload(); // Перезагрузка страницы
  };

  render() {
    return (
      <button className="btn" onClick={this.handleClick}>
        Refresh
      </button>
    );
  }
}

export default RefreshButton;
