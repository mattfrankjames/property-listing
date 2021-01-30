<header class="placed">
  <a class="logo" href="/">
    <img
      class="logo__img"
      src="https://static.triplemint.com/jupiter/e19fee5db9836d45fe1882033e4ba5881c8530c1/static/images/triplemint.svg"
      alt="Triplemint"
    /></a
  >
  <div class="nav__nested">
    <div id="headerLocalitySelector">
      <select
        data-bind="options: localities, optionsText: 'text', optionsValue: 'id', value: selectedLocality"
        ><option value="ny:nyc">New York</option><option value="nj:hudson">New Jersey</option
        ></select
      >
    </div>
    <ul class="main-menu">
      <li><a href="#">Buy</a></li>
      <li><a href="/sell">Sell</a></li>
      <li><a href="/listings?listing_type=rental">Rent</a></li>
      <li><a href="/agents">Agents</a></li>
      <li><a href="/press">Press</a></li>
      <li><a href="/how-it-works">How It Works</a></li>
    </ul>
  </div>
  <div class="nav__nested nav__secondary">
    <div class="phone"><a href="tel:2122351123">212-235-1123</a></div>
    <div class="sessionInfo">
      <a class="login" href="/tmapi/login">Sign in</a>
    </div>
  </div>
</header>

<style>
  @media (min-width: 975px) {
    header {
      display: flex;
    }
  }
  header {
    font-size: 14px;
    padding: 14px 24px;
  }
  a {
    color: #404040;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: transparent;
    transition: border-color 0.2s;
  }
  a:hover {
    border-bottom-color: var(--brand-primary);
  }
  .logo {
    display: flex;
    align-items: center;
    margin-right: 16px;
  }
  .logo__img {
    width: 140px;
  }
  .main-menu {
    list-style-type: none;
    padding: 0;
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: space-between;
  }
  .nav__nested {
    display: flex;
    align-items: center;
    flex: 1;
  }
  .nav__secondary {
    margin-left: auto;
    justify-content: flex-end;
  }

  .login {
    margin-left: 20px;
    padding: 6px 36px;
    font-family: 'OpenSans-regular', sans-serif;
    font-size: 14px;
    line-height: 14px;
    border: none;
    cursor: pointer;
    color: #404040;
    background-color: #fff;
    border: 1px solid var(--brand-primary);
  }
</style>
