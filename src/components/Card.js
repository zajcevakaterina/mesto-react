import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onDeletePlace, onCardLike, onDeleteCardClick }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser.userId;

  const cardDeleteButtonClassName = (
    `places__delete-button ${isOwn ? 'places__delete-button_active' : ''}`
  );

  const isLiked = card.likes.some(i => i._id === currentUser.userId);
  const cardLikeButtonClassName = (
    `places__like ${isLiked ? 'places__like_active' : ''}`
  );

  const handleLikeClick = () => {
    onCardLike(card)
  }

  const handleDeleteClick = () => {
    onDeleteCardClick(card._id)
  }
  return (
    <div className="places__card">
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <img alt={`Фотография места под названием ${card.name}`} src={card.link} className="places__image" onClick={() => onCardClick(card)} />
      <div className="places__desc">
        <h2 className="places__title">{card.name}</h2>
        <div className="places__like-info">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <span className="places__like-amount">{card.likes.length}</span>
        </div>
      </div>
    </div>
  )
}

export default Card
