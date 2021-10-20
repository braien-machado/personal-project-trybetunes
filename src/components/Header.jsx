import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
      <header data-testid="header-component" className="header">
        <p data-testid="header-user-name">
          {`Olá, ${name}`}
        </p>
      </header>
    );
  }
}

export default Header;
