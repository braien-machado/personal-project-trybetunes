import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

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
    };
  }

  componentDidMount() {
    this.toogleLoading(true);
    getUser().then((data) => this.setState({ profile: data, loading: false }));
  }

  toogleLoading = (bool) => this.setState({ loading: bool });

  headerOn = () => this.setState({ header: true })

  handleChange = ({ target: { name, value } }) => {
    this.setState((prevState) => ({ profile: { ...prevState.profile, [name]: value } }),
      () => this.validateButton());
  }

  validateButton = () => {
    const { profile } = this.state;
    const values = Object.values(profile);
    if (values.every((value) => value.length > 0)) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
    console.log(values);
    return null;
  }

  render() {
    const {
      loading,
      header,
      profile: { name, email, image, description },
      isButtonDisabled,
    } = this.state;
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
