import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  hideAlert = () => {
    const el = document.querySelector(".alert");
    if (el) el.parentElement.removeChild(el);
  };

  showAlert = (type, msg) => {
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
    window.setTimeout(this.hideAlert, 3000);
  };

  onSubmitSignIn = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:8000/api/v1/users/login",
        data: {
          email: this.state.signInEmail,
          password: this.state.signInPassword,
        },
      });
      if (res.data.status === "success") {
        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
          ),
        };
        cookies.set("jwt", res.data.token, cookieOptions);
        this.showAlert("success", "Logged in successfully!");
      }
    } catch (err) {
      this.showAlert("error", err.response.data.message);
    }
  };

  render() {
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
                onChange={this.onEmailChange}
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
                onChange={this.onPasswordChange}
              />
            </div>
            <div className="form__group">
              <input
                onClick={this.onSubmitSignIn}
                className="btn btn--green"
                type="submit"
                value="Sign in"
              />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default LoginPage;
