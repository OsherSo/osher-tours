const Header = (props) => {
  const { isLoggedIn, user } = props;
  return (
    <header className="header">
      <nav className="nav nav--tours">
        <a className="nav__el" href="/">
          All tours
        </a>
      </nav>
      <div className="header__logo">
        <img src="/img/logo-white.png" alt="Natours logo" />
      </div>
      <nav className="nav nav--user">
        {isLoggedIn ? (
          <>
            <p className="nav__el nav__el--logout">Sign Out</p>
            <a className="nav__el" href="/me">
              <img
                className="nav__user-img"
                src={`/img/users/${user.photo}`}
                alt={`${user.name}`}
              />
              <span>{user.name.split(" ")[0]}</span>
            </a>
          </>
        ) : (
          <>
            <a className="nav__el" href="/login">
              Login
            </a>
            <a className="nav__el nav__el--cta" href="/register">
              Register
            </a>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
