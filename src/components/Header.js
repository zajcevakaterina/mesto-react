import React from "react";
import { Route, Link } from "react-router-dom";
import logo from "../images/header/logo.svg";

function Header({ email, onLogout }) {
  return (
    <header className="header app__section">
      <img
        src={logo}
        alt="Слово Место латиницей и выше слово Russia. Логотип."
        className="header__logo"
      />

      <Route path="/sign-up">
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      </Route>
      <Route path="/sign-in">
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      </Route>
      <Route exact path="/">
        <div className="header__info">
          <p className="header__email">{email}</p>
          <Link
            to="./sign-in"
            onClick={onLogout}
            className="header__link header__link_dark"
          >
            Выйти
          </Link>
        </div>
      </Route>
    </header>
  );
}

export default Header;
