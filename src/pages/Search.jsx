import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import SearchResult from '../components/SearchResult';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      header: false,
      isButtonDisabled: true,
      loading: false,
      name: '',
      nameSearched: '',
      searchDone: false,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ name: value }, () => this.validateButton());
  }

  validateButton = () => {
    const { name } = this.state;
    const minLength = 2;
    if (name.length >= minLength) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  }

  handleClick = () => {
    const { name } = this.state;
    this.setState({ loading: true }, () => {
      searchAlbumsAPI(name)
        .then((data) => this.setState({ data, nameSearched: name, name: '' }))
        .then(() => this.setState({ loading: false, searchDone: true }));
    });
  }

  headerOn = () => this.setState({ header: true })

  form = (bool, string) => {
    const { loading, header } = this.state;
    if (loading && header) {
      return <Loading />;
    }
    if (!loading && header) {
      return (
        <form>
          <label htmlFor="search-artist-input">
            <input
              data-testid="search-artist-input"
              id="search-artist-input"
              onChange={ this.handleChange }
              placeholder="Nome do Artista"
              type="text"
              value={ string }
            />
          </label>
          <button
            data-testid="search-artist-button"
            disabled={ bool }
            onClick={ this.handleClick }
            type="button"
          >
            Pesquisar
          </button>
        </form>
      );
    }
  }

  render() {
    const { isButtonDisabled, name, data, searchDone, nameSearched } = this.state;
    return (
      <div data-testid="page-search">
        <Header headerIsReady={ this.headerOn } />
        {this.form(isButtonDisabled, name)}
        <SearchResult
          result={ data }
          awaitedRender={ searchDone }
          name={ nameSearched }
        />
      </div>
    );
  }
}

export default Search;
