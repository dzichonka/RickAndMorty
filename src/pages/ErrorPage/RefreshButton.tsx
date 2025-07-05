import React from 'react';

class RefreshButton extends React.Component {
  handleClick = () => {
    window.location.reload(); // Перезагрузка страницы
  };

  render() {
    return (
      <button
        className="bg-violet-500 text-black p-1 rounded"
        onClick={this.handleClick}
      >
        Refresh
      </button>
    );
  }
}

export default RefreshButton;
