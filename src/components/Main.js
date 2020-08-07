import React from 'react';
import api from '../utils/api';
import Card from './Card'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userDescription: '',
      userAvatar: '',
      cards: []
    }
  }

  componentDidMount() {
    api.getUserInfo().
    then(info => this.setState({
      userName: info.name,
      userDescription: info.about,
      userAvatar: info.avatar,
    }))
    .catch(err => console.error(err));
    
    api.getInitialCards()
    .then(cards => this.setState({
      cards
    }))
    .catch(err => console.error(err))
  }

  render() {
    return (
      <main className="main app__section">
        <section className="profile">
          <img alt="Фотография пользователя." className="profile__avatar" src={this.state.userAvatar} />
          <div className="profile__edit-avatar-button" onClick={this.props.onEditAvatar}></div>
          <div className="profile__title">
            <h1 className="profile__name">{this.state.userName}</h1>
            <button type="button" className="profile__edit-button" onClick={this.props.onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{this.state.userDescription}</p>
          <button type="button" className="profile__add-button" onClick={this.props.onAddPlace}></button>
        </section>

        <section className="places">
          {this.state.cards.map((card, index) => {
            return (
              <Card
                onCardClick={this.props.onCardClick}
                onDeletePlace={this.props.onDeletePlace}
                card={card}
                key={index}/>
            )
          })}
        </section>
      </main>
    )
  }
}

export default Main
