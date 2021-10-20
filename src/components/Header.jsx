import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: true,
    };
  }

  componentDidMount() {
    // getUser()
    //   .then((response) => response.name)
    //   .then((name) => this.setState({ name }));
    this.getUserName();
  }

  getUserName = () => {
    this.setState({ loading: true }, () => {
      getUser()
        .then((response) => response.name)
        .then((name) => this.setState({ name }, this.setState({ loading: false })));
    });
  }
  // Criar função para mudar a cor do link que corresponde a url atual
  // setActive = ({ target }) => {
  //   const { className } = target;

  // }

  render() {
    const { name, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <header data-testid="header-component" className="header-component">
        <div className="header-container">
          <div className="logo-container">
            <i className="fas fa-headphones" />
            <p>TrybeTunes</p>
          </div>
          <div className="user-name-container">
            <i className="far fa-user user-icon" />
            <p data-testid="header-user-name" className="header-user-name">
              {`Olá, ${name}`}
            </p>
          </div>
        </div>
        <nav className="nav">
          <Link
            to="/search"
            data-testid="link-to-search"
            className="link-search"
          >
            <h3>Pesquisa</h3>
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="link-favorites"
          >
            <h3>Favoritos</h3>
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
            className="link-profile"
          >
            <h3>Perfil</h3>
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
