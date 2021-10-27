import React from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      header: false,
      profile: {
        name: '',
        email: '',
        image: '',
        description: '',
      },
      isButtonDisabled: true,
      profileUpdated: false,
    };
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
    this.toogleLoading(true);
    getUser().then((data) => this.setState({ profile: data, loading: false },
      () => this.validateButton()));
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  toogleLoading = (bool) => this.setState({ loading: bool });

  headerOn = () => this.setState({ header: true })

  handleChange = ({ target: { name, value } }) => {
    this.setState((prevState) => ({ profile: { ...prevState.profile, [name]: value } }),
      () => this.validateButton());
  }

  handleClick = () => {
    const { profile: { name, email, description, image } } = this.state;
    this.toogleLoading(true);
    updateUser({ name, email, description, image })
      .then(() => {
        if (this.mounted) {
          this.setState({ profileUpdated: true, loading: false });
        }
      });
  }

  // Para validar e-mail via regex: "https://www.wired.com/2008/08/four-regular-expressions-to-check-email-addresses/"

  validateButton = () => {
    const regex = /([a-z0-9][-a-z0-9_+.]*[a-z0-9])@([a-z0-9][-a-z0-9.]*[a-z0-9]\.(com))/g;
    const { profile } = this.state;
    const values = Object.values(profile);
    if (values.every((value) => value.length > 0) && profile.email.match(regex)) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
    return null;
  }

  render() {
    const {
      loading,
      header,
      profile: { name, email, image, description },
      isButtonDisabled,
      profileUpdated,
    } = this.state;
    if (profileUpdated) { return <Redirect to="/profile" />; }
    return (
      <div data-testid="page-profile-edit">
        <Header headerIsReady={ this.headerOn } />
        {loading && header && <Loading />}
        {!loading && header && (
          <form>
            <label htmlFor="edit-input-name">
              <h3>Nome</h3>
              <input
                type="text"
                id="edit-input-name"
                data-testid="edit-input-name"
                name="name"
                onChange={ this.handleChange }
                value={ name }
              />
            </label>
            <label htmlFor="edit-input-email">
              <h3>E-mail</h3>
              <input
                type="text"
                id="edit-input-email"
                data-testid="edit-input-email"
                name="email"
                onChange={ this.handleChange }
                value={ email }
              />
            </label>
            <label htmlFor="edit-input-description">
              <h3>Descrição</h3>
              <input
                type="text"
                id="edit-input-description"
                data-testid="edit-input-description"
                name="description"
                onChange={ this.handleChange }
                value={ description }
              />
            </label>
            <label htmlFor="edit-input-image">
              <h3>Foto de perfil</h3>
              <input
                type="text"
                id="edit-input-image"
                data-testid="edit-input-image"
                name="image"
                onChange={ this.handleChange }
                value={ image }
              />
            </label>
            <button
              disabled={ isButtonDisabled }
              type="button"
              data-testid="edit-button-save"
              onClick={ this.handleClick }
            >
              Salvar
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
