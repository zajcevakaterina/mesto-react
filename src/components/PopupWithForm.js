import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ` + (props.isOpen && 'popup_opened')}>
      <div className="popup__container popup__container_visibility_visible">
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        <form className={`form form_type_${props.name}`} name={props.name} noValidate>
          <h2 className="form__heading">{props.title}</h2>
          
          {props.children}

          <button type="submit" value="Сохранить форму"
          className={`form__button form__button_type_${props.name}`}>{props.buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
