import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

class Main extends React.Component {

  static contextType = CurrentUserContext;

  render() {
    return (
      <main className="main app__section">
        <section className="profile">
          <img alt="Фотография пользователя." className="profile__avatar" src={this.context.avatar} />
          <div className="profile__edit-avatar-button" onClick={this.props.onEditAvatar}></div>
          <div className="profile__title">
            <h1 className="profile__name">{this.context.name}</h1>
            <button type="button" className="profile__edit-button" onClick={this.props.onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{this.context.about}</p>
          <button type="button" className="profile__add-button" onClick={this.props.onAddPlace}></button>
        </section>

        <section className="places">
          {this.props.cards && this.props.cards.map((card, index) => {
            return (
              <Card
                onCardLike={this.props.onCardLike}
                onCardClick={this.props.onCardClick}
                onDeletePlace={this.props.onDeletePlace}
                onDeleteCardClick={this.props.onCardDelete}
                card={card}
                key={index} />
            )
          })}
        </section>
      </main>
    )
  }
}

export default Main
