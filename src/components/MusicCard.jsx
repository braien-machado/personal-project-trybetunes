import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
    };
  }

  toogleFavorite = ({ target: { checked } }) => (checked
    ? this.setState({ checked: true }, this.addFavorite())
    : console.log('unchecked'));

  addFavorite = () => {
    const { music, toogleLoading } = this.props;
    toogleLoading(true);
    addSong(music).then(() => toogleLoading(false));
  }

  render() {
    const { music: { trackName, previewUrl, trackId } } = this.props;
    const { checked } = this.state;
    return (
      <div className="music-card">
        <h4>{ trackName }</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ `checkbox-music-${trackId}` }>
          <input
            type="checkbox"
            id={ `checkbox-music-${trackId}` }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.toogleFavorite }
            checked={ checked }
          />
          <p>Favorita</p>
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  toogleLoading: PropTypes.func.isRequired,
};
