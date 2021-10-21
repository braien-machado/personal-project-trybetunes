import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import './Album.css';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      header: false,
      loading: false,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.mounted = true;
    if (this.mounted) {
      getFavoriteSongs().then((songs) => this.setState({ favoriteSongs: songs }));
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  saveFavInState = () => {
    getFavoriteSongs().then((songs) => this.setState({ favoriteSongs: songs }));
  }

  toogleLoading = (bool) => this.setState({ loading: bool });

  headerOn = () => this.setState({ header: true })

  playlist = () => {
    const {
      loading,
      header,
      favoriteSongs } = this.state;
    if (loading && header) {
      return <Loading />;
    }
    if (!loading && header) {
      return (
        <main className="playlist">
          <h3>Músicas favoritas:</h3>
          <div className="music-list">
            {favoriteSongs.map((music, index) => (
              <MusicCard
                key={ index }
                music={ music }
                toogleLoading={ this.toogleLoading }
                checked
                saveFavInState={ this.saveFavInState }
              />
            ))}
          </div>
        </main>
      );
    }
  }

  render() {
    return (
      <div data-testid="page-favorites">
        <Header headerIsReady={ this.headerOn } />
        {this.playlist()}
      </div>
    );
  }
}

export default Favorites;
