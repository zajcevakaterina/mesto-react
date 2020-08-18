import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div className={"popup popup_type_see-image " + (card ? 'popup_opened' : '')}>
      {card
      && <figure className="popup__container popup__container_visibility_transparent">
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <img alt={`Фотография места под названием ${card.name}`} className="popup__image" src={card.link} />
        <figcaption className="popup__image-caption">{card.name}</figcaption>
      </figure>}
    </div>
  )
}

export default ImagePopup
