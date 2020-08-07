import React from 'react';

function Card({card, onCardClick, onDeletePlace}) {
  return (
    <div className="places__card">
      <button type="button" className="places__delete-button" onClick={onDeletePlace}></button>
      <img alt={`Фотография места под названием ${card.name}`} src={card.link} className="places__image" onClick={() => onCardClick(card)} />
      <div className="places__desc">
        <h2 className="places__title">{card.name}</h2>
        <div className="places__like-info">
          <button type="button" className="places__like"></button>
          <span className="places__like-amount">{card.likes.length}</span>
        </div>
      </div>
    </div>
  )
}

export default Card
