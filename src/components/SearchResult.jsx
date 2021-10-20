import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class SearchResult extends Component {
  render() {
    const { result, awaitedRender, name } = this.props;
    if (result.length > 0) {
      return (
        <div>
          <h3>{ `Resultado de álbuns de: ${name}`}</h3>
        </div>
      );
    }
    if (awaitedRender) {
      return (
        <h3>Nenhum álbum foi encontrado</h3>
      );
    }
    return null;
  }
}

SearchResult.propTypes = {
  name: PropTypes.string.isRequired,
  awaitedRender: PropTypes.bool.isRequired,
  result: PropTypes.arrayOf(PropTypes.object).isRequired,
};
