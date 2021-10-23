import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
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
    };
    this.profileInfo = this.profileInfo.bind(this);
  }

  componentDidMount() {
    this.toogleLoading(true);
    getUser().then((data) => this.setState({ profile: data, loading: false }));
  }

  toogleLoading = (bool) => this.setState({ loading: bool });

  headerOn = () => this.setState({ header: true })

  profileInfo() {
    const { loading, header, profile: { name, email, image, description } } = this.state;
    const profileImg = image.length > 0 ? image : 'https://static.vecteezy.com/ti/vetor-gratis/p1/550731-de-icone-de-usuario-gr%C3%A1tis-vetor.jpg';
    if (loading && header) { return <Loading />; }
    if (!loading && header) {
      return (
        <div className="profileInfo">
          <img
            data-testid="profile-image"
            src={ profileImg }
            width="100px"
            alt={ name }
          />
          <Link to="profile/edit">
            <button type="button">
              <i className="fas fa-user-edit" />
              Editar perfil
            </button>
          </Link>
          <h3>Nome</h3>
          <p>{ name }</p>
          <h3>E-mail</h3>
          <p>{ email }</p>
          <h3>Descrição</h3>
          <p>{ description }</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div data-testid="page-profile">
        <Header headerIsReady={ this.headerOn } />
        {this.profileInfo()}
      </div>
    );
  }
}

export default Profile;
