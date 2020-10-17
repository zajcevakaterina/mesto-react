import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignUp({onSignUp}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    onSignUp(email, password)
      .then(() => resetForm())
      .catch((err) => console.log(err));
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form
        className="auth__form"
        name="loginForm"
        onSubmit={handleSignUp}
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
          Зарегистрироваться
        </button>
        <p className="auth__question">
          Уже зарегистрированы?
          <Link className="auth__link" to="/sign-in">
            Войти
          </Link>
        </p>
      </form>
      </div>
    // <div className="auth">
    //   <h2 className="auth__title">Регистрация</h2>
    //   <form
    //     className="auth__form"
    //     name="loginForm"
    //     // onSubmit={handleSubmit}
    //     action="#"
    //     noValidate
    //   >
    //     <input
    //       className="auth__input"
    //       id="sign-in-email"
    //       name="signInEmail"
    //       placeholder="Email"
    //       value={email}
    //       // onChange={(e) => setEmail(e.target.value)}
    //       type="email"
    //       required
    //       minLength="2"
    //       maxLength="40"
    //     />
    //     <input
    //       className="auth__input"
    //       id="sign-in-password"
    //       name="signInPassword"
    //       placeholder="Пароль"
    //       value={password}
    //       // onChange={(e) => setPassword(e.target.value)}
    //       type="password"
    //       required
    //       minLength="6"
    //     />
    //     <button className="auth__button" type="submit">
    //       Зарегистрироваться
    //     </button>
    //     <p className="auth__question">
    //       Уже зарегистрированы?
    //       <Link className="auth__link" to="/sign-in">
    //         Войти
    //       </Link>
    //     </p>
    //   </form>
    // </div>
  );
}

export default SignUp;
