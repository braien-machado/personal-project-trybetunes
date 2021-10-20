import React from 'react';
import './Login.css';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  // Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
  // Para resolver esse erro, encontrei a solução nos seguitnes links:
  // 'https://github.com/material-components/material-components-web-react/issues/434'
  // https://stackoverflow.com/questions/53414723/typescript-react-avoid-setstate-on-unmounted-components
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isButtonDisabled: true,
      loading: false,
      userCreated: false,
    };
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ name: value }, () => this.validateButton());
  }

  handleClick = () => {
    const { name } = this.state;
    this.setState({ loading: true }, async () => {
      await createUser({ name });
      if (this.mounted) this.setState({ userCreated: true, loading: false });
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
    const { name, isButtonDisabled, loading, userCreated } = this.state;
    if (userCreated) return <Redirect to="/search" />;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-login" className="login-page">
        <header>
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
