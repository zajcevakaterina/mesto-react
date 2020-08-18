import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [cardName, setCardName] = useState('');
  const [cardLink, setCardLink] = useState('');

  const handleCardName = (e) => {
    setCardName(e.target.value);
  }

  const handleCardLink = (e) => {
    setCardLink(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace(cardName, cardLink);
    onClose()
    setCardName('');
    setCardLink('');
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      title='Новое место'
      name='add-place'
      onClose={onClose}
      buttonText={isLoading ? "Сохранение..." : "Создать"}
      children={(
        <React.Fragment>
          <label className="form__field">
            <input
              type="text"
              name="name"
              id="place-name"
              className="form__item form__item_el_place-name"
              minLength="1"
              maxLength="30"
              placeholder="Название"
              required
              value={cardName}
              onChange={handleCardName} />
            <span className="form__item-error" id="place-name-error"></span>
          </label>

          <label className="form__field">
            <input
              type="url"
              name="link"
              id="place-link"
              placeholder="Ссылка на картинку"
              className="form__item form__item_el_place-link"
              required
              value={cardLink}
              onChange={handleCardLink} />
            <span className="form__item-error" id="place-link-error"></span>
          </label>
        </React.Fragment>
      )} />
  )
}

export default AddPlacePopup
