import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignIn({onSignIn, loginForAuth, passForAuth}) {
  const [email, setEmail] = useState(loginForAuth);
  const [password, setPassword] = useState(passForAuth);

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    onSignIn(email, password)
      .then(() => resetForm())
      .catch((err) => console.log(err));
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form
        className="auth__form"
        name="loginForm"
        onSubmit={handleSignIn}
        noValidate
      >
        <input
          className="auth__input"
          id="sign-in-email"
          name="signInEmail"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          minLength="2"
          maxLength="40"
        />
        <input
          className="auth__input"
          id="sign-in-password"
          name="signInPassword"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          minLength="6"
        />
        <button className="auth__button" type="submit">
          Войти
        </button>
        <p className="auth__question">
          Ещё не зарегистрированы?
          <Link className="auth__link" to="/sign-up">
            Регистрация
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
