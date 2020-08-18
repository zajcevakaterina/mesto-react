import React, { useState, useEffect } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(
      name,
      description);
    onClose()
  }

  useEffect(() => {
    setName(currentUser.userName);
    setDescription(currentUser.userDescription);
  }, [currentUser]);


  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      title='Редактировать профиль'
      name='edit-profile'
      onClose={onClose}
      buttonText={isLoading ? "Сохранение...": "Сохранить"}
      children={(
        <React.Fragment>
          <label className="form__field">
            <input
              type="text"
              name="name"
              id="profile-name"
              className="form__item form__item_el_name"
              placeholder="Имя и фамилия"
              minLength="2"
              maxLength="40"
              required
              value={name}
              onChange={handleChangeName} />
            <span className="form__item-error" id="profile-name-error"></span>
          </label>

          <label className="form__field">
            <input
              type="text"
              name="job"
              id="profile-job"
              placeholder="Род занятий"
              className="form__item form__item_el_job"
              minLength="2"
              maxLength="200"
              required
              value={description}
              onChange={handleChangeDescription}
            />
            <span className="form__item-error" id="profile-job-error"></span>
          </label>
        </React.Fragment>)
      } />
  )
}

export default EditProfilePopup
