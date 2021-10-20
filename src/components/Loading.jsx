import React from 'react';
import './Loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading-container">
        <div className="loading">
          Carregando...
        </div>
      </div>
    );
  }
}

export default Loading;
