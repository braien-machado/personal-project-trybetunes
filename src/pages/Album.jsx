import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor(props) {
    super(props);
    const { match: { params: { id } } } = this.props;
    this.state = {
      id,
      musics: [],
      header: false,
      collectionName: '',
      artistName: '',
      loading: false,
    };
  }

  componentDidMount() {
    const { id } = this.state;
    getMusics(id)
      .then((result) => this.setState({ musics: result },
        () => {
          this.setState((prevState) => ({
            artistName: prevState.musics[0].artistName,
            collectionName: prevState.musics[0].collectionName,
          }));
        }));
  }

  headerOn = () => this.setState({ header: true })

  playlist = (collection, artist) => {
    const { loading, header } = this.state;
    if (loading && header) {
      return <Loading />;
    }
    if (!loading && header) {
      return (
        <main className="playlist">
          <h1 data-testid="artist-name">{ artist }</h1>
          <h2 data-testid="album-name">{ collection }</h2>
        </main>
      );
    }
  }

  render() {
    const { collectionName, artistName } = this.state;
    return (
      <div data-testid="page-album">
        <Header headerIsReady={ this.headerOn } />
        {this.playlist(collectionName, artistName)}
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired }).isRequired,
};
