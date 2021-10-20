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

  render() {
    const { name, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <header data-testid="header-component" className="header-component">
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
        <nav className="links">
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
