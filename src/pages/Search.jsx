import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isButtonDisabled: true,
      name: '',
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

  render() {
    const { isButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-artist-input">
            <input
              type="text"
              placeholder="Nome do Artista"
              id="search-artist-input"
              data-testid="search-artist-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ isButtonDisabled }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
