import { NavLink } from "react-router"

const Header = () => {
  return (
    <header className="app-header d-flex justify-content-between align-items-end">
      <div>
        <div className="app-header-brand">
          Sterboeken
        </div>
      </div>
      <div className="d-flex justify-content-end align-items-end gap-3">
        <div className="app-header-link-container">
          <NavLink to="/" className="app-nav-link">The Project</NavLink>
        </div>
        <div className="app-header-link-container">
          <NavLink to="/" className="app-nav-link">About us</NavLink>
        </div>
        <div className="app-header-link-container">
          <NavLink to="/" className="app-nav-link">Work with us</NavLink>
        </div>
      </div>
    </header>
  )
}

export default Header;