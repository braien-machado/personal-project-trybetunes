import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isButtonDisabled: true,
      name: '',
      loading: true,
      header: false,
      data: [],
    };
  }

  componentDidMount() {
    this.toggleLoading(false);
  }

  toggleLoading = (bool) => {
    this.setState({ loading: bool });
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
        .then((data) => this.setState({ data }))
        .then(() => this.toggleLoading(false));
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
    const { isButtonDisabled, name, loading, header } = this.state;
    return (
      <div data-testid="page-search">
        <Header headerIsReady={ this.headerOn } />
        { (loading && header) ? <Loading /> : this.form(isButtonDisabled, name)}
      </div>
    );
  }
}

export default Search;
