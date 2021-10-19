import React from 'react';
import './Login.css';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isButtonDisabled: true,
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ name: value }, () => this.validateButton());
  }

  handleClick = () => {
    const { name } = this.state;
    this.setState({ loading: true }, async () => {
      await createUser({ name });
      this.setState({ loading: false }, () => console.log('oi'));
    });
  }

  validateButton = () => {
    const { name } = this.state;
    const minLength = 3;
    if (name.length >= minLength) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  }

  render() {
    const { name, isButtonDisabled, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-login" className="login-page">
        <header className="login-header">
          <i className="fas fa-headphones fa-5x" />
          <h1>TrybeTunes</h1>
        </header>
        <div className="login-container">
          <label htmlFor="login-name-input">
            <input
              data-testid="login-name-input"
              id="login-name-input"
              onChange={ this.handleChange }
              placeholder="Nome"
              type="text"
              value={ name }
            />
          </label>
          <button
            data-testid="login-submit-button"
            disabled={ isButtonDisabled }
            onClick={ this.handleClick }
            type="button"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
