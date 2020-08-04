import React from 'react';
import logo from '../images/header/logo.svg'

function Header(props) {
  return (
    <header className="header app__section">
      <img src={logo} alt="Слово Место латиницей и выше слово Russia. Логотип."
        className="header__logo"/>
    </header>
  )
}

export default Header
