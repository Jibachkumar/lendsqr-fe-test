import { Link } from "react-router-dom";
import "./Header.scss";

interface HeaderProps {
  onMenuToggle: () => void;
}

function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="header">
      {/* LEFT SECTION: Logo & Global Search */}
      <div className="header__left">
        <Link to="/dashboard" className="header__logo">
          <img
            className="header__logo__img"
            src="https://res.cloudinary.com/dhadohg2h/image/upload/v1779646509/Union_uagkkv.png"
            alt="Lendsqr"
          />
          <img
            className="header__logo__img-logo"
            src="https://res.cloudinary.com/dhadohg2h/image/upload/v1779699309/lendsqr_kqyl0k.png"
            alt="logo"
          />
        </Link>

        <div className="header__search">
          <div className="header__search-form">
            <input
              className="header__search-input"
              type="search"
              placeholder="Search for anything"
            />
            <button className="header__search-btn">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zm4.243-1.757L13 12.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION: Docs, Notifications, Profiles */}
      <div className="header__right">
        <Link to={"/dashboard"} className="header__docs-link">
          Docs
        </Link>

        <div className="header__notification">
          <img
            className="header__notification-img"
            src="https://res.cloudinary.com/dhadohg2h/image/upload/v1779721418/Vector_tvxsf2.png"
            alt="bell_icon"
          />
        </div>

        <div className="header__user">
          <div className="header__avatar">
            <img
              src="https://res.cloudinary.com/dhadohg2h/image/upload/v1779722183/image_4_1_dlzsit.png"
              alt="coverImg_icon"
            />
          </div>
          <span className="header__username">Adedeji</span>
          <img
            className="header__avatar-down_arrow"
            src="https://res.cloudinary.com/dhadohg2h/image/upload/v1779723423/Vector_1_ektcgf.png"
            alt="down_arrow"
          />
        </div>

        <button className="header__menu-btn" onClick={onMenuToggle}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M3 6h16M3 11h16M3 16h16"
              stroke="#213F7D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
export default Header;
