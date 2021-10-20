import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SearchResult.css';

export default class SearchResult extends Component {
  render() {
    const { result, awaitedRender, name } = this.props;
    if (result.length > 0) {
      return (
        <div>
          <h3>{ `Resultado de álbuns de: ${name}`}</h3>
          <div className="album-cards">
            {result.map((album) => {
              const { artistName, collectionId, collectionName, artworkUrl100 } = album;
              return (
                <div key={ collectionId } className="album-card">
                  <img src={ artworkUrl100 } alt={ `${collectionName} cover` } />
                  <Link
                    to={ `/album/${collectionId}` }
                    data-testid={ `link-to-album-${collectionId}` }
                    className="link"
                  >
                    <p className="collection-name">{ collectionName }</p>
                  </Link>
                  <p>{ artistName }</p>
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
