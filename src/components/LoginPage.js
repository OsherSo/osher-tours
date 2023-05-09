import { useState } from "react";
import axios from "axios";

const LoginPage = (props) => {
  const { setIsLoggedIn, setUser } = props;

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const onEmailChange = (event) => {
    setSignInEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setSignInPassword(event.target.value);
  };

  const hideAlert = () => {
    const el = document.querySelector(".alert");
    if (el) el.parentElement.removeChild(el);
  };

  const showAlert = (type, msg) => {
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
    window.setTimeout(hideAlert, 3000);
  };

  const onSubmitSignIn = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:8000/api/v1/users/login",
        data: {
          email: signInEmail,
          password: signInPassword,
        },
      });
      if (res.data.status === "success") {
        showAlert("success", "Logged in successfully!");
        setIsLoggedIn(true);
        setUser(res.data.data);
      }
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
  };

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
        <div className="form form__login">
          <div className="form__group">
            <label htmlFor="email" className="form__label">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="form__input"
              placeholder="you@example.com"
              required
              onChange={onEmailChange}
            />
          </div>
          <div className="form__group ma-bt-md">
            <label htmlFor="password" className="form__label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form__input"
              placeholder="••••••••"
              required
              minLength="8"
              onChange={onPasswordChange}
            />
          </div>
          <div className="form__group">
            <input
              onClick={onSubmitSignIn}
              className="btn btn--green"
              type="submit"
              value="Sign in"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
