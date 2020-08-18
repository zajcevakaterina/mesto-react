import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

  const avatarRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
    onClose();
    avatarRef.current.value = ''
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      title='Обновить аватар'
      name='edit-avatar'
      onClose={onClose}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      children={(
        <React.Fragment>
          <label className="form__field">
            <input
              type="url"
              name="link"
              id="avatar-link"
              placeholder="Ссылка на аватар"
              className="form__item form__item_el_avatar-link"
              required
              value={avatarRef.value}
              ref={avatarRef} />
            <span className="form__item-error" id="avatar-link-error"></span>
          </label>
        </React.Fragment>
      )} />
  )
}

export default EditAvatarPopup
