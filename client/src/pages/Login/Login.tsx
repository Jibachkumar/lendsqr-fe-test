import { useState } from "react";
import "./Login.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page">
      {/* Left panel */}
      <div className="login-page__left">
        <div className="login-page__logo">
          <img
            className="login-page__logo__img"
            src="https://res.cloudinary.com/dhadohg2h/image/upload/v1779646509/Union_uagkkv.png"
            alt="Lendsqr"
          />
          <img
            className="login-page__logo__img-logo"
            src="https://res.cloudinary.com/dhadohg2h/image/upload/v1779699309/lendsqr_kqyl0k.png"
            alt="logo"
          />
        </div>
        <div className="login-page__illustration">
          <img
            src="https://res.cloudinary.com/dhadohg2h/image/upload/v1779655130/hd_restoration_result_image_xlgcjw.png"
            alt="img"
          />
        </div>
      </div>

      {/* Right panel */}
      <div className="login-page__right">
        <div className="login-page__form-container">
          <h1 className="login-page__welcome">Welcome!</h1>
          <p className="login-page__subtitle">Enter details to login.</p>

          <form className="login-form">
            <div className="login-form__group">
              <div className="login-form__input-wrapper">
                <input
                  className="login-form__input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="login-form__group">
              <div className="login-form__input-wrapper">
                <input
                  className="login-form__input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="login-form__toggle-password"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <a className="login-form__forgot" role="button" tabIndex={0}>
              Forgot Password?
            </a>

            <button type="submit" className="login-form__submit">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
