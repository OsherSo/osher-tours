import React, { Component } from "react";
import axios from "axios";

class SignupPage extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onPasswordConfirmChange = (event) => {
    this.setState({ passwordConfirm: event.target.value });
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

  onSubmit = async () => {
    const { name, email, password, passwordConfirm } = this.state;

    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:8000/api/v1/users/signup",
        data: {
          name,
          email,
          password,
          passwordConfirm,
        },
      });

      if (res.data.status === "success") {
        this.showAlert("success", "Signup successfully!");
      }
    } catch (err) {
      this.showAlert("error", err.response.data.message);
    }
  };

  render() {
    return (
      <main className="main">
        <div className="login-form">
          <h2 className="heading-secondary ma-bt-lg">Sign up</h2>
          <div className="form form__signup">
            <div className="form__group">
              <label htmlFor="name" className="form__label">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="form__input"
                placeholder="Your name..."
                required
                onChange={this.onNameChange}
              />
            </div>
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
            <div className="form__group ma-bt-md">
              <label htmlFor="passwordConfirm" className="form__label">
                Password Confirm
              </label>
              <input
                id="passwordConfirm"
                type="password"
                className="form__input"
                placeholder="••••••••"
                required
                minLength="8"
                onChange={this.onPasswordConfirmChange}
              />
            </div>
            <div className="form__group">
              <input
                onClick={this.onSubmit}
                className="btn btn--green"
                type="submit"
                value="Sign up"
              />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default SignupPage;
