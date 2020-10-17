import React from "react";

function InfoTooltip({ isOpen, onClose, message, icon, name }) {
  return (
    <div
      className={`popup popup_type_${name} ` + (isOpen ? "popup_opened" : "")}
    >
      <div className="popup__container popup__container_visibility_visible">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <div className="popup__tooltip">
          <div
            className={`popup__tooltip-icon popup__tooltip-icon_${icon}`}
          ></div>
          <p className="popup__tooltip-text">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
