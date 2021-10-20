import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SearchResult extends Component {
  render() {
    const { result, awaitedRender, name } = this.props;
    if (result.length > 0) {
      return (
        <div>
          <h3>{ `Resultado de álbuns de: ${name}`}</h3>
          <div>
            {result.map((album) => {
              const { artistName, collectionId, collectionName, artworkUrl100 } = album;
              return (
                <div key={ collectionId } className="album-container">
                  <img src={ artworkUrl100 } alt={ `${collectionName} cover` } />
                  <Link
                    to={ `/album/${collectionId}` }
                    data-testid={ `link-to-album-${collectionId}` }
                  >
                    <h3>{ collectionName }</h3>
                  </Link>
                  <h4>{ artistName }</h4>
                </div>
              );
            })}
          </div>
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
